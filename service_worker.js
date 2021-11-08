importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');

const OFFLINE_PAGE = '/pwa-azure/index.html';
workbox.precaching.precacheAndRoute([
  OFFLINE_PAGE,
]);

workbox.routing.setCatchHandler(({ event }) => {
  switch (event.request.destination) {
    case 'document':
      return caches.match(OFFLINE_PAGE);
    default:
      return Response.error();
  }
});

workbox.routing.registerRoute(({ url, request }) => {
  const hostnames = [
    // キャッシュを許可するドメイン名のリスト
    't-ikehata.github.io',
  ];
  const types = [
    // キャッシュを許可するリソースの種別
    'font',
    'script',
    'style',
    'image',
  ];
  return (
    hostnames.some(hostname => url.hostname === hostname) &&
    types.some(type => request.destination === type)
  );
}, new workbox.strategies.StaleWhileRevalidate());

workbox.routing.setDefaultHandler(new workbox.strategies.NetworkOnly());

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
