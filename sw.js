const CACHE_NAME = "itapeshopping-v8";
const assets = [
    "/",
    "/index.html",
    "/manifest.json",
    "/css/materialize.min.css",
    "/js/materialize.min.js",
    "/js/instalar.js",
    "/js/app.js",
    "/img/peca1.png",
    "/img/peca2.png",
    "/img/peca3.png",
    "/img/peca4.png"
];

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
            console.log('[Service Worker] Caching all: app shell and content');
        return cache.addAll(assets);
      })
    );
  });

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
})

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    return caches.delete(key);
                }
            }));
        })
    );
});