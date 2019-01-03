function log(obj) {
  console.log(obj);
}

const CACHE_VERSION = 'sw-v5';
const CACHE_FILES = ['index.html', 'img/miku.png', 'index.js', 'main.css'];
const CACHE_PREFIX = 'service-workers/';

/**
 * Installing SW
 */
self.addEventListener('install', event => {
  log('[SW] installing');
  event.waitUntil(
    caches.open(CACHE_PREFIX + CACHE_VERSION).then(cache => {
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
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map((key, index) => {
          // Start with right prefix but wrong version: delete cache
          if (
            key !== CACHE_PREFIX + CACHE_VERSION &&
            key.startsWith(CACHE_PREFIX)
          ) {
            return caches.delete(keys[index]);
          }
        })
      );
    })
  );
});

/**
 * Intercept request
 */
self.addEventListener('fetch', event => {
  log(`[SW] fetching URL ${event.request.url}`);
  event.respondWith(
    caches.match(event.request).then(res => {
      // network first?
      if (res) {
        return res;
      }
      requestBackend(event);
    })
  );
});

const requestBackend = async event => {
  const url = event.request.clone();
  return fetch(url).then(res => {
    // if not a valid response, send the error
    if (!res || res.status !== 200 || res.type !== 'basic') {
      return res;
    }

    const response = res.clone();

    caches.open(CACHE_VERSION).then(cache => {
      cache.put(event.request, response);
    });

    return res;
  });
};
