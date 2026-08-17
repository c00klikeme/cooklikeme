const CACHE_NAME = "cooklikeme-v2-2026-08-17-images";

const APP_SHELL = [
  "./",
  "./index.html",
  "./meals.html",
  "./builder.html",
  "./saved.html",
  "./grocery.html",
  "./cook.html",
  "./style.css",
  "./meals.css",
  "./builder.css",
  "./saved.css",
  "./grocery.css",
  "./cook.css",
  "./recipe-images.css",
  "./pwa.js",
  "./recipe-images.js",
  "./meals.js",
  "./builder.js",
  "./saved.js",
  "./grocery.js",
  "./cook.js",
  "./data/ingredients.js",
  "./data/recipes.js",
  "./data/recipe-upgrades.js",
  "./data/app-cleanup.js",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response && response.status === 200) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        }
        return response;
      })
      .catch(async () => {
        const cached = await caches.match(event.request);
        if (cached) return cached;
        if (event.request.mode === "navigate") return caches.match("./index.html");
        return Response.error();
      })
  );
});