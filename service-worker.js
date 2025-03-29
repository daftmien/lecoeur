importScripts('https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js');

if (workbox) {
  console.log("Workbox chargé.");

  // 🔴 REGLE UNIVERSELLE POUR TOUS LES AUDIOS PEU IMPORTE COMMENT CHARGÉS
  workbox.routing.registerRoute(
    ({url}) => url.pathname.endsWith('.mpga') || url.pathname.endsWith('.mp3'),
    new workbox.strategies.CacheFirst({
      cacheName: 'audio-cache',
      plugins: [
        new workbox.rangeRequests.RangeRequestsPlugin(),
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 100,
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
