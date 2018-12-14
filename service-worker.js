/**
 * Installing SW
 */
self.addEventListener('install', event => {
  console.log(event);
});

/**
 * Activating SW
 */
self.addEventListener('activate', event => {
  console.log(event);
});

/**
 * Intercept request
 */
self.addEventListener('fetch', event => {
  console.log(event);
});
