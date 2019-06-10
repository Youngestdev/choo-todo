/* eslint-env serviceworker */

var VERSION = require('./package.json').version
var URLS = process.env.FILE_LIST

// Respond with cached resources
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return self.caches.match(event.request);
    })
  );
})


// Register worker
self.addEventListener('install', function (e) {
  e.waitUntil(self.caches.open(VERSION).then(function (cache) {
    return cache.addAll(URLS)
  }))
})

// Remove outdated resources
self.addEventListener('activate', function (e) {
  e.waitUntil(self.caches.keys().then(function (keyList) {
    return Promise.all(keyList.map(function (key, i) {
      if (keyList[i] !== VERSION) return self.caches.delete(keyList[i])
    }))
  }))
})
