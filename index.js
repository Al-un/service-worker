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
  console.log(`Loaded ${cacheKeys.length} cache(s) `);
  cacheKeys.forEach(cacheKey => console.log(`Await cacheKey: ${cacheKey}`));

  const openedCaches = await cacheKeys.map(key => caches.open(key));
  console.log(`Loaded openedCaches: ${openedCaches.length}`);

  // https://stackoverflow.com/a/37576787/4906586
  // cannot use forEach
  for (const key of cacheKeys) {
    console.log(`Loading cacheKey: ${key}`);
    let openedCacheKeysTxt = `<p>${key}</p>`;

    const cache = await caches.open(key);
    console.log(`opened cache:`, cache);

    const cacheKeys = await cache.keys();
    openedCacheKeysTxt += cacheKeys
      .map(openedCacheKey => {
        console.log(`opened cache key:`, openedCacheKey);
        return `<li>${openedCacheKey.url}</li>`;
      })
      .reduce((a, b) => a + '' + b);
      openedCacheKeysTxt = `<ul>${openedCacheKeysTxt}</ul>`;
    document.getElementById('cacheContent').innerHTML += openedCacheKeysTxt;
  }
};

// Run !!
window.onload = () => {
  log('index.js is running!');
  registerServiceWorker();
  getCacheContent();
};
