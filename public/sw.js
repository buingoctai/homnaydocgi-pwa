self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('js').then(function (cache) {
      return cache.addAll(['/index.bundle.js', './favicon.ico', '/logo192.png', '/logo512.png']);
    })
  );
});

self.addEventListener('fetch', function (event) {
  if (event.request.url.includes('image.shutterstock')) {
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
  }
  // if (event.request.url.includes('blog/allPost')) {
  //   event.respondWith(
  //     caches.open('all post').then(function (cache) {
  //       return cache.match(event.request).then(function (response) {
  //         return (
  //           response ||
  //           fetch(event.request).then(function (response) {
  //             cache.put(event.request, response.clone());
  //             return response;
  //           })
  //         );
  //       });
  //     })
  //   );
  // }
  console.log('url', event.request, event.request.url);

  if (event.request.url.includes('blog/getDetailPost')) {
    const id = event.request.url.substring(event.request.url.indexOf('id') + 3);

    event.respondWith(
      caches.open(`post - ${id}`).then(function (cache) {
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
  }
});
