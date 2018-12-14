function log(obj) {
  console.log(obj);
}

/**
 * Installing SW
 */
self.addEventListener('install', event => {
  log('[SW] installing');
  log(event);
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
