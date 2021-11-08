importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');
workbox.routing.registerRoute(
  new RegExp('.*\.js'),
  workbox.strategies.cacheFirst()
);

// push 通知の待ち受け
self.addEventListener('push', function(event) {
  const title = 'Push されました！';
  const options = {
    body: event.data.text(),
    icon: 'icon-192x192.png',
    badge: 'icon-512x512.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
