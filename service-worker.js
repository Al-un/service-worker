/**
 * SW has not access to DOM
 * @param {*} msg 
 */
const log = (msg) => {
  console.log(msg);
};

/**
 * Installing SW
 */
self.addEventListener('install', event => {
  log(event);
});

/**
 * Activating SW
 */
self.addEventListener('activate', event => {
  log(event);
});

/**
 * Intercept request
 */
self.addEventListener('fetch', event => {
  log(event);
});
