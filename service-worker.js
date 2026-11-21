const CACHE_NAME = 'my-planner-pwa-v1';
const CORE = ['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install', event => { event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CORE)).then(()=>self.skipWaiting())); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME && k.startsWith('my-planner-pwa-')).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener('fetch', event => { const req=event.request; if(req.method!=='GET' || new URL(req.url).origin!==location.origin) return; event.respondWith(caches.match(req).then(cached=>cached || fetch(req).then(res=>{if(res.ok){const copy=res.clone();caches.open(CACHE_NAME).then(cache=>cache.put(req,copy));} return res;}).catch(()=>caches.match('./index.html')))); });
