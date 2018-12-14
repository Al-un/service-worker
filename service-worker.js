/**
 * Bad bad!!! copy pasted from index.js
 * @param {*} msg
 * @param {*} lvl
 */
const log = (msg, lvl = 'Info') => {
  // Console logging
  console.log(msg);

  // Output logging
  const outputDiv = document.getElementById('output');
  const time = new Date().toLocaleTimeString('en', { hour12: false });
  msg = typeof msg === 'object' ? JSON.stringify(msg) : msg;
  const log = `${time} ${lvl ? '[' + lvl + '] ' : ''}${msg}\n`;
  outputDiv.innerHTML += log;
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
