const CACHE='redro-todo-v14';
const CORE=['./','./index.html','./manifest.webmanifest','./assets/icon.svg'];

self.addEventListener('install',event=>{
  event.waitUntil(
    caches.open(CACHE)
      .then(cache=>cache.addAll(CORE))
      .then(()=>self.skipWaiting())
  );
});

self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(key=>key.startsWith('redro-todo-')&&key!==CACHE).map(key=>caches.delete(key))))
      .then(()=>self.clients.claim())
  );
});

async function updateCache(request){
  try{
    const response=await fetch(request,{cache:'no-store'});
    if(response.ok){
      const cache=await caches.open(CACHE);
      await cache.put(request,response.clone());
    }
    return response;
  }catch(error){return null;}
}

self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET')return;
  const url=new URL(request.url);
  if(url.origin!==self.location.origin)return;

  const isShell=request.mode==='navigate'||url.pathname.endsWith('/index.html')||url.pathname.endsWith('/');
  if(isShell){
    event.respondWith((async()=>{
      const cached=await caches.match(request)||await caches.match('./index.html');
      if(cached){
        // Show the saved app immediately on weak internet, refresh it in the background.
        event.waitUntil(updateCache(request));
        return cached;
      }
      const controller=new AbortController();
      const timeout=setTimeout(()=>controller.abort(),5000);
      try{
        const response=await fetch(request,{signal:controller.signal});
        clearTimeout(timeout);
        if(response.ok)caches.open(CACHE).then(cache=>cache.put(request,response.clone()));
        return response;
      }catch(error){
        clearTimeout(timeout);
        return caches.match('./index.html')||new Response('Redro To-Do is offline. Open it once while connected to save the app.',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}});
      }
    })());
    return;
  }

  // Local static files are cache-first, so repeat visits avoid another network round trip.
  event.respondWith((async()=>{
    const cached=await caches.match(request);
    if(cached){
      event.waitUntil(updateCache(request));
      return cached;
    }
    const response=await updateCache(request);
    return response||new Response('',{status:504,statusText:'Offline'});
  })());
});
