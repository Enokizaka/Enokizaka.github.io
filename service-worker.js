var CACHE_NAME = "enokiprojects-1.4.0"
var urlsToCache = [
  "/",
  "/index.html",
  "/index.css",
  "/index.js",
  "/vendor/fonts/google-roboto.css",
  "/projects/fun-string/fun-string.html",
]

self.addEventListener("install", function (event) {
  console.log("install step v3")
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
  console.log("activate step")
  evt.waitUntil(
    caches
      .keys()
      .then((keys) => {
        console.log(`keys--> ${keys}`)
        console.log(`CACHE_NAME--> ${CACHE_NAME}`)
        return Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      })
      .then(() => {
        console.log("V3 now ready to handle fetches!")
      })
  )
})

self.addEventListener("fetch", function (event) {
  // console.log("fetch step")
  // // Network-first
  // if (request.headers.get('Accept').includes('text/html')) {
  // event.respondWith(
  //   fetch(event.request)
  //     .then(function (response) {
  //       // Check if we received a valid response
  //       if (!response || response.status !== 200 || response.type !== "basic") {
  //         throw "cannot fetch"
  //       }

  //       var responseToCache = response.clone()
  //       caches.open(CACHE_NAME).then(function (cache) {
  //         cache.put(event.request, responseToCache)
  //       })

  //       return response
  //     })
  //     .catch(function (error) {
  //       caches.match(event.request).then(function (response) {
  //         // Cache hit - return response
  //         if (response) {
  //           console.log("C fetch step response chached value")
  //           return response
  //         }
  //         console.log('we cannot open chache and fetch')
  //       })
  //     })
  // )
  // }

  // Offline-first
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // Cache hit - return response
      if (response) {
        console.log("C fetch step response chached value")
        return response
      }

      return fetch(event.request).then(function (response) {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== "basic") {
          console.log("F fetch step response fetched value")
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
