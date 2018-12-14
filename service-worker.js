function log(obj) {
  console.log(obj);
}

const CACHE_VERSION = 'sw-v2';
const CACHE_FILES = ['index.html', 'img/miku.png', 'index.js', 'main.css'];

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
  log(`[SW] fetching URL ${event.request.url}`);
  log(event);
  event.respondWith(
    caches.match(event.request).then(res => {
      if (res) {
        return res;
      }
      requestBackend(event);
    })
  );
});

const requestBackend = event => {
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
