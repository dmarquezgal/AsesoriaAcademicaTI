let staticCache = 'staticCache@v1';
let dynamicCache = 'dynamicCache@v1';
let immutableCache = 'immutableCache@v1';

self.addEventListener('install', event => {
    console.log("SW Install");

    const _appShellFiles = [
        "./",
        '/index.html', 
        '/css/styles.css', 
        '/js/app.js', 
        '/js/database.js', 
        '/manifest.json',
        '/assets/images/logo.png',  
        '/assets/images/favicon.ico',
        '/assets/icons/favico.ico',
        '/assets/icons/icon-144x144.png',
        '/assets/icons/apple-touch-icon.png',
    ];

    const _immutableFiles = ['/css/bootstrap.min.css', '/js/bootstrap.bundle.min.js', 'https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed:wght@300;500&display=swap'];

    const saveStaticCache = caches.open(staticCache)
        .then((cache) => cache.addAll(_appShellFiles));

    const saveImmutableCache = caches.open(immutableCache)
        .then((cache) => cache.addAll(_immutableFiles));

    event.waitUntil(Promise.all([saveStaticCache, saveImmutableCache]));
});

//Actualizar la caché
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then(cacheList => {
            return Promise.all(
                cacheList.map(cache => {
                    if (!staticCache.includes(cache) && !immutableCache.includes(cache)) {
                        return caches.delete(cache);
                    }
                }));
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cacheResponse) => {
            return cacheResponse || fetch(event.request);
        })
    );

    // const _result = caches.match(event.request).then((cacheResponse) => {
    //     return(cacheResponse || fetch(event.request).then(
    //         networkResponse => {
    //             caches.open(dynamicCache).then(cache => {
    //                 cache.put(event.request, networkResponse.clone())
    //                 return networkResponse
    //             })
    //         }
    //     ));
    // });
});

self.addEventListener('message', (msgClient) => {
    if (msgClient.data.action == 'skipWaiting') {
        self.skipWaiting();
    }
});