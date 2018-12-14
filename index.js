// Output stuff
const log = (msg, lvl = 'Info') => {
  const outputDiv = document.getElementById('output');
  const time = new Date().toLocaleTimeString('en', { hour12: false });
  const log = `${time} ${lvl ? '[' + lvl + '] ' : ''}${msg}\n`;
  console.log(log);
  outputDiv.innerHTML += log;
};

/**
 * Register the service worker.
 *
 * MDN documentation: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register
 */
const registerServiceWorker = () => {
  if (navigator.serviceWorker) {
    log('Service Worker is trying to register');
    navigator.serviceWorker
      .register('./service-worker.js')
      .then(registration => log(registration, 'Success'))
      .catch(err => log(err, 'Error'));
  } else {
    log('Service Worker is not supported in this browser', 'Error');
  }
};

// Run !!
window.onload = () => {
  log('index.js is running!');
  registerServiceWorker();
};
