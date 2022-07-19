const CacheStorageName = "txt-compressor-decompressor-v1"
const assets = [
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(CacheStorageName).then(cache => {
            cache.addAll(assets)
        })
        .then(() => self.skipWaiting())
    )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            if(res) return res;
            else{
                return fetch(fetchEvent.request)
                .then(res => {
                    return caches.open(CacheStorageName).then(cache => {
                        cache.put(fetchEvent.request.url, res.clone())
                        return res;
                    })
                })
                .catch((err) => {
                    console.log(err)
                }) // end of fetch
            }
        })
    )
})