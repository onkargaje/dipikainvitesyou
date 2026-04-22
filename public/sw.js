// Wedding invitation service worker — aggressive caching for fast repeat loads
const CACHE_VERSION = "wedding-v1";
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;
const MEDIA_CACHE = `${CACHE_VERSION}-media`;

const MEDIA_EXT = /\.(jpg|jpeg|png|webp|gif|svg|ico|mp4|mp3|wav|woff2?|ttf|otf)$/i;
const ASSET_PATH = /\/assets\/.+\.(js|css|jpg|jpeg|png|webp|svg|woff2?)$/i;

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((k) => !k.startsWith(CACHE_VERSION))
          .map((k) => caches.delete(k))
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  // Same-origin only
  if (url.origin !== self.location.origin) return;

  // Never cache Supabase API or HTML navigations
  if (url.pathname.endsWith(".html") || req.mode === "navigate") return;

  const isMedia = MEDIA_EXT.test(url.pathname);
  const isHashedAsset = ASSET_PATH.test(url.pathname);

  if (!isMedia && !isHashedAsset) return;

  const cacheName = isMedia ? MEDIA_CACHE : RUNTIME_CACHE;

  event.respondWith(
    (async () => {
      const cache = await caches.open(cacheName);
      const cached = await cache.match(req);
      if (cached) {
        // Refresh in background
        fetch(req)
          .then((res) => {
            if (res.ok) cache.put(req, res.clone());
          })
          .catch(() => {});
        return cached;
      }
      try {
        const res = await fetch(req);
        if (res.ok) cache.put(req, res.clone());
        return res;
      } catch (err) {
        return cached || Response.error();
      }
    })()
  );
});
