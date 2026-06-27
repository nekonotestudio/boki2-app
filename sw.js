const CACHE = 'boki2-v1';
const ASSETS = [
  '/boki2-app/',
  '/boki2-app/index.html',
  '/boki2-app/questions.js',
  '/boki2-app/questions2.js',
  '/boki2-app/manifest.json',
  '/boki2-app/icon-192.png',
  '/boki2-app/icon-512.png'
];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => { e.respondWith(caches.match(e.request).then(cached => cached || fetch(e.request))); });
