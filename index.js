// Output stuff
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
 * Register the service worker.
 *
 * MDN documentation: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register
 */
const registerServiceWorker = () => {
  if (navigator.serviceWorker) {
    log('Service Worker is trying to register');
    navigator.serviceWorker
      .register('./service-worker.js', { scope: './' })
      .then(registration => log(JSON.stringify(registration), 'Success'))
      .catch(err => log(err, 'Error'));
  } else {
    log('Service Worker is not supported in this browser', 'Error');
  }
};

const clearCacheStorage = () => {
  log(`Cache clearing: start`);
  caches
    .keys()
    .then(keyList => {
      keyList.forEach(key => {
        log(`Cache clearing: deleting key ${key}`);
        caches.delete(key);
      });
    })
    .then(() => log(`Cache clearing: end`));
};

const getCacheContent = () => {
  log(`Cache getting: start`);
  let cacheContent = '';
  caches
    .keys()
    .then(keyList => {
      keyList.forEach(key => {
        cacheContent += `<p>Cache: ${key}</p>`;
        console.log('building: ' + cacheContent);
        caches.open(key).then(cache => {
          cache.keys().then(url => {
            cacheContent += `<p>url: ${url}</p>`;
            console.log('building: ' + cacheContent);
          });
        });
      });
    })
    .then(() => {
      log(`Cache getting: end`);
      document.getElementById('cacheContent').innerHTML += cacheContent;
      return cacheContent;
    });
};

// Run !!
window.onload = () => {
  log('index.js is running!');
  registerServiceWorker();
  getCacheContent();
};
