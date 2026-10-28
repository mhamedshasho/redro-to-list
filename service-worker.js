const CACHE='redro-todo-v8';
const CORE=['./','./index.html','./manifest.webmanifest','./assets/icon.svg'];

self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting()));
});

self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(key=>key.startsWith('redro-todo-')&&key!==CACHE).map(key=>caches.delete(key))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET') return;
  const url=new URL(request.url);
  if(url.origin!==self.location.origin) return;

  // Always try the network first for the app shell so installed PWAs receive updates.
  if(request.mode==='navigate'||url.pathname.endsWith('/index.html')||url.pathname.endsWith('/')){
    event.respondWith(
      fetch(request,{cache:'no-store'})
        .then(response=>{
          if(response.ok) caches.open(CACHE).then(cache=>cache.put(request,response.clone()));
          return response;
        })
        .catch(()=>caches.match(request).then(cached=>cached||caches.match('./index.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached=>cached||fetch(request).then(response=>{
      if(response.ok) caches.open(CACHE).then(cache=>cache.put(request,response.clone()));
      return response;
    }))
  );
});
