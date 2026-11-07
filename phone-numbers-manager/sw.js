const CACHE='redro-phone-numbers-v6';
const CORE=['./','./index.html','./styles.css','./app.js','./manifest.webmanifest','./icons/icon.svg'];
self.addEventListener('install',event=>{
 event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting()));
});
self.addEventListener('message',event=>{
 if(event.data?.type==='SKIP_WAITING')self.skipWaiting();
});
self.addEventListener('activate',event=>{
 event.waitUntil(
  caches.keys()
   .then(keys=>Promise.all(keys.filter(key=>key.startsWith('redro-phone-numbers-')&&key!==CACHE).map(key=>caches.delete(key))))
   .then(()=>self.clients.claim())
 );
});
async function networkFirst(request){
 try{
  const response=await fetch(request,{cache:'no-store'});
  if(response.ok){
   const cache=await caches.open(CACHE);
   await cache.put(request,response.clone());
  }
  return response;
 }catch(error){
  const cached=await caches.match(request)||await caches.match('./index.html');
  if(cached)return cached;
  return new Response('Redro Phone Numbers is offline. Connect to the internet and reload.',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}});
 }
}
self.addEventListener('fetch',event=>{
 const request=event.request;
 if(request.method!=='GET')return;
 const url=new URL(request.url);
 if(url.origin!==self.location.origin)return;
 event.respondWith(networkFirst(request));
});
