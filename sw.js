// Field Cam service worker: keeps the app working with no signal.
// Bump VERSION whenever you upload changed files so phones pick up the update.
const VERSION = "fieldcam-v3.18.1";
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/apple-touch-icon.png"];
// Outside libraries kept for offline use (the S/N barcode scanner). Fetched best-effort at install,
// so a phone with no signal still installs the app; otherwise they're cached the first time they load.
const LIBS = ["https://cdn.jsdelivr.net/npm/@zxing/library@0.21.3/umd/index.min.js"];
const LIB_HOSTS = ["cdn.jsdelivr.net"];
// Fetch our own files past every cache (the phone's and GitHub Pages' ~10 min server cache):
// a unique address each time, so a new upload is picked up straight away.
const fresh = u => fetch(new Request(u + (u.includes("?") ? "&" : "?") + "fresh=" + Date.now(), { cache:"no-store" }));

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(async c => {
    await Promise.all(SHELL.map(async u => { const r = await fresh(u); if (!r.ok) throw new Error(u); await c.put(u, r); }));
    await Promise.all(LIBS.map(u => c.add(u).catch(() => {})));
  }).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

// Same-origin files: serve from cache instantly, refresh the cache in the background.
// Libraries (versioned URLs, never change): cache first.
// Everything else (address lookup, the app's version check) goes straight to the network.
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET") return;
  if (LIB_HOSTS.includes(url.hostname)) {
    e.respondWith(caches.open(VERSION).then(async cache => {
      const hit = await cache.match(e.request);
      if (hit) return hit;
      const r = await fetch(e.request);
      if (r.ok) cache.put(e.request, r.clone());
      return r;
    }));
    return;
  }
  if (url.origin !== location.origin) return;
  if (url.searchParams.has("check")) return;              // the app's version check: always live
  e.respondWith(caches.open(VERSION).then(async cache => {
    const nav = e.request.mode === "navigate", key = nav ? "./index.html" : e.request;
    const hit = await cache.match(key, { ignoreSearch: true });
    const net = (nav ? fresh("./index.html") : fetch(e.request)).then(r => { if (r.ok) cache.put(key, r.clone()); return r; }).catch(() => null);
    return hit || (await net) || new Response("Offline", { status: 503 });
  }));
});
