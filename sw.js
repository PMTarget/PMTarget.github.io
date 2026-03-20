const CACHE_NAME = 'resizer-v1';const ASSETS = [
  './',
  './index.html',
  'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap'];
// Установка: кешируем файлы
self.addEventListener('install', (event) => {
  event.waitUntil(    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});
// Активация: чистим старый кеш

self.addEventListener('activate', (event) => {
  event.waitUntil(    caches.keys().then((keys) => {
      return Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)));
    })
  );
});

// Стратегия: сначала кеш, потом сеть
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
 