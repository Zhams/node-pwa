// public/service-worker.js
const CACHE_NAME = "node-pwa-cache-v2";
const urlsToCache = [
  "/", 
  "/index.html", 
  "/manifest.json", 
  "/icons/icon-192.png", 
  "/icons/icon-512.png"
];

// Install event: cache files individually with error handling
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.all(
        urlsToCache.map(url =>
          fetch(url).then(response => {
            if (!response.ok) {
              console.error(`❌ Failed to fetch ${url}: ${response.status}`);
              return;
            }
            return cache.put(url, response);
          }).catch(err => {
            console.error(`❌ Error caching ${url}:`, err);
          })
        )
      );
    })
  );
});

// Fetch event: serve from cache, fallback to network
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});


/*
const CACHE_NAME = "node-app-cache-v1";
const urlsToCache = ["/", "/index.html", "/manifest.json", "/icons/icon-192.png", "/icons/icon-512.png"];
//const urlsToCache = ["/", "/index.html", "/styles.css", "/script.js"];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => response || fetch(event.request))
    );
});
*/
