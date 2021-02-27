self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('js').then(function (cache) {
      return cache.addAll([
        '/index.bundle.js',
        '/favico.png',
        '/logo192.png',
        '/logo512.png',
        '/thumbnail.png',
      ]);
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

function receivePushNotification(event) {
  console.log('[Service Worker] Push Received.', event);
  // const { title, body } = event.data.json();
  // const { title, text, tag, url } = event.data.json();
  var data = JSON.parse(event.data.text());

  const options = {
    data: data['url'],
    body: data['text'],
    vibrate: [200, 100, 200],
    tag: data['tag'],
  };
  event.waitUntil(self.registration.showNotification(data['title'], options));
}

function openPushNotification(event) {
  console.log('[Service Worker] Notification click Received.', event.notification.data);

  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data));
}

self.addEventListener('push', receivePushNotification);
self.addEventListener('notificationclick', openPushNotification);
