
module.exports = {
  globDirectory: './',
  globPatterns: [
    '**/*.{html,json,js,css,mpga,mp3,jpeg,jpg,png,svg,gif}'
  ],maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10 Mo par exemple

  swDest: 'service-worker.js',
  clientsClaim: true,
  skipWaiting: true
};
