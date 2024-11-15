const CACHE_NAME = "gps-locator-cache-v3";
const urlsToCache = [
    "/",
    "/index.html",
    "/gps.html",
    "/manifest.json",
    "/icon-192x192.png",
    "/icon-512x512.png",
    "/screenshot1.png",
    "/screenshot2.png"
];


self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache).then(() => {
                console.log("All resources cached successfully!");
            }).catch((err) => {
                console.error("Resource failed to cache:", err);
            });
        })
    );
});
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});