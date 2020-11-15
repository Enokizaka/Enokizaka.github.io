var CACHE_NAME = "my-site-cache-v1"
var urlsToCache = [
  "/",
  "/index.html",
  "/index.css",
  "/third-party-items/google-roboto.css",
  "/projects/fun-string/fun-string.html",
  // "/projects/pwa-base/pwa-test.html",
  // "/projects/pwa-base/icons/ic_create_new_folder_black_48dp.png",
  // "/projects/pwa-base/icons/ic_file_upload_black_48dp.png",
  // "/projects/pwa-base/icons/ic_folder_black_48dp.png",
  //   "",
  //   '/styles/main.css',
  //   '/script/main.js'
]

self.addEventListener("install", function (event) {
  console.log("install step")
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("Opened cache")
      return cache.addAll(urlsToCache)
    })
  )
})

// activate event
// When we change the name of our cache, we could have multiple caches stored, and that could create problems. To avoid that, we need to delete the old one. In this function we check the key (our cache name), if the same is different from the previous, we delete the previous. Doing that, we always have only the last cache.
self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    })
  )
})

self.addEventListener("fetch", function (event) {
  console.log("fetch step")
  // console.log(event)
  //   console.log(event.request.slice(-3))
  //   console.log(event.request.slice(-3)==='png')
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // Cache hit - return response
      if (response) {
        console.log("fetch step response chached value")
        return response
      }

      return fetch(event.request).then(function (response) {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== "basic") {
          console.log("fetch step response fetched value")
          return response
        }

        // IMPORTANT: Clone the response. A response is a stream
        // and because we want the browser to consume the response
        // as well as the cache consuming the response, we need
        // to clone it so we have two streams.
        var responseToCache = response.clone()

        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(event.request, responseToCache)
        })

        return response
      })
    })
  )
})
