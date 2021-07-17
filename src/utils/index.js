function getQueryStringValue(key) {
  if (!window.location.href.includes(`${process.env.APP_BASE}/article?`)) {
    return null;
  }
  return decodeURIComponent(
    window.location.search.replace(
      new RegExp(
        '^(?:.*[&\\?]' +
          encodeURIComponent(key).replace(/[\.\+\*]/g, '\\$&') +
          '(?:\\=([^&]*))?)?.*$',
        'i'
      ),
      '$1'
    )
  );
}

const createSubcription = async () => {
  const pushServerPublicKey =
    'BIN2Jc5Vmkmy-S3AUrcMlpKxJpLeVRAfu9WBqUbJ70SJOCWGCGXKY-Xzyh7HDr6KbRDGYHjqZ06OcS3BjD7uAm8';

  const serviceWorker = await navigator.serviceWorker.ready;
  // subscribe and return the subscription
  return await serviceWorker.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: pushServerPublicKey,
  });
};
const getUserSubscription = () => {
  //wait for service worker installation to be ready, and then
  return navigator.serviceWorker.ready
    .then(function (serviceWorker) {
      const r = serviceWorker.pushManager.getSubscription();
      return r;
    })
    .then(function (pushSubscription) {
      return pushSubscription;
    });
};

function initServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(function () {
      Notification.requestPermission()
        .then((consent) => {
          if (consent != 'granted') return;

          getUserSubscription()
            .then((sub) => {
              if (!sub) {
                createSubcription()
                  .then((subscrition) => {
                    saveSubscription(subscrition);
                  })
                  .catch(() => {});
              }
            })
            .catch(() => {});
        })
        .catch(() => {});
    });
  }
}


export { getQueryStringValue, createSubcription, getUserSubscription, initServiceWorker };
