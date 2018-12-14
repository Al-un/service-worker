function log(obj) {
  console.log(obj);
}

const CACHE_VERSION = 'sw-v1';
const CACHE_FILES = ['/', 'img/miku.png', 'index.js', 'main.css'];

/**
 * Installing SW
 */
self.addEventListener('install', event => {
  log('[SW] installing');
  log(event);
  event.waitUntil(
    caches.open(CACHE_VERSION).then(cache => {
      log(`Opening cache version ${CACHE_VERSION}`);
      return cache.addAll(CACHE_FILES);
    })
  );
});

/**
 * Activating SW
 */
self.addEventListener('activate', event => {
  log('[SW] activating');
  log(event);
});

/**
 * Intercept request
 */
self.addEventListener('fetch', event => {
  log('[SW] fetching');
  log(event);
});
