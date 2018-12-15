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

const getCacheContent = async () => {
  log(`Cache getting: start`);
  let cacheContent = '';

  // Fetching all keys
  const cacheKeys = await caches.keys();

  cacheKeys.forEach(cacheKey => console.log(`Await cacheKey: ${cacheKey}`));

  const openedCaches = await cacheKeys.map(key => caches.open(key));

  openedCaches.forEach(openedCache => {
    console.log(`opened cache: ${openedCache}`);
    console.log(`${openedCache}`);
  });

  caches
    .keys()
    .then(keyList => {
      let cacheContent = keyList.forEach(key => {
        console.log('building key: ' + key);
        content = caches.open(key).then(cache => {
          return cache.keys().then(keys => {
            return keys.reduce((concat, key) => {
              console.log('reducing url: ' + key);
              return concat + `<p>url: ${key}</p>`;
            });
          });
        });

        return `<p>Cache: ${key}</p>` + content;
      });
      return cacheContent;
    })
    .then(cacheContent => {
      log(`Cache getting: end => ${cacheContent}`);
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
