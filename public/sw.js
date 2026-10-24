// Replaces an older service worker that was left registered for this site.
self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    await self.registration.unregister();

    await Promise.all(clients.map((client) => client.navigate(client.url)));
  })());
});
