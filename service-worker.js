
importScripts('https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js');

if (workbox) {
  console.log("Workbox chargé.");

  workbox.routing.registerRoute(
    ({request}) => request.destination === 'audio' || request.url.match(/\.(mp3|mpga)$/),
    new workbox.strategies.CacheFirst({
      cacheName: 'audio-cache',
      plugins: [
        new workbox.rangeRequests.RangeRequestsPlugin(),
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        }),
      ],
    })
  );

  workbox.routing.registerRoute(
    ({request}) => request.destination === 'style' || request.destination === 'script' || request.destination === 'image',
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'general-cache',
    })
  );

  workbox.routing.setDefaultHandler(
    new workbox.strategies.NetworkFirst()
  );
  
} else {
  console.log("Workbox n'a pas pu être chargé.");
}
