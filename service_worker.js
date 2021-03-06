// workbox cdn読み込み
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js');

// オフラインページ指定
const OFFLINE_PAGE = '/pwa-azure/';
workbox.precaching.precacheAndRoute([
  { url: OFFLINE_PAGE, revision: '37' },
]);

// オフラインページへのキャッシュ適用
workbox.routing.setCatchHandler(({ event }) => {
  switch (event.request.destination) {
    case 'document':
      return caches.match(OFFLINE_PAGE);
    default:
      return Response.error();
  }
});

// 実行時キャッシュ登録
//workbox.routing.registerRoute(({ url, request }) => {
//  const hostnames = [
//    // キャッシュを許可するドメイン名のリスト
//    't-ikehata.github.io',
//  ];
//  const types = [
//    // キャッシュを許可するリソースの種別
//    'font',
//    'script',
//    'style',
//    'image',
//  ];
//  return (
//    hostnames.some(hostname => url.hostname === hostname) &&
//    types.some(type => request.destination === type)
//  );
//}, new workbox.strategies.StaleWhileRevalidate());
workbox.routing.registerRoute(
    new RegExp('.*\\.(html|css|js|json|jpe?g|png|gif|webp|svg)$'),
    new workbox.strategies.StaleWhileRevalidate()
);

// キャッシュ対象外のリソースには service worker は何もしない設定
workbox.routing.setDefaultHandler(new workbox.strategies.NetworkOnly());

//// キャッシュファイルの指定
////   ※何か更新がある度にキャッシュファイルの名前を変更すること
//var CACHE_NAME = 'pwa-azure-caches-v24';
//var urlsToCache = [
//    '/pwa-azure/',
//    '/pwa-azure/app.css',
//    '/pwa-azure/app.js',
//    '/pwa-azure/manifest.json',
//    '/pwa-azure/pwa.js',
//    '/pwa-azure/test.png',
//];
//
//// インストール処理
//self.addEventListener('install', function(event) {
//    event.waitUntil(
//        caches
//            .open(CACHE_NAME)
//            .then(function(cache) {
//                return cache.addAll(urlsToCache);
//            })
//    );
//});
//
//// キャッシュ削除処理
//self.addEventListener('activate', function(event) {
//    event.waitUntil(
//      caches.keys().then(keys => Promise.all(
//        keys.map(key => {
//          if (CACHE_NAME !== key) {
//            return caches.delete(key);
//          }
//        })
//      ))
//    );
//});
//
//// リソースフェッチ時のキャッシュロード処理
//self.addEventListener('fetch', function(event) {
//    event.respondWith(
//        caches
//            .match(event.request)
//            .then(function(response) {
//                return response ? response : fetch(event.request);
//            })
//    );
//});

// push 通知の待ち受け
self.addEventListener('push', function(event) {
  const title = 'Push されました！';
  const options = {
    body: event.data.text(),
    icon: 'icon-192x192.png',
    badge: 'icon-512x512.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
  
  console.log('Push通知を受け取りました！');
});
