self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('js').then(function (cache) {
      return cache.addAll(['/index.bundle.js', './favicon.ico', '/logo192.png', '/logo512.png']);
    })
  );
});

self.addEventListener('fetch', function (event) {
  console.log('url', event.request.url);
  console.log('request', event.request);
  if (!event.request.url.includes('image.shutterstock')) {
    return;
  }
  event.respondWith(
    caches.open('avatar').then(function (cache) {
      return cache.match(event.request).then(function (response) {
        return (
          response ||
          fetch(event.request).then(function (response) {
            cache.put(event.request, response.clone());
            return response;
          })
        );
      });
    })
  );
});
