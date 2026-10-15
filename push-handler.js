// Potisna obvestila (Web Push) — vključi ga workbox generateSW (importScripts v vite.config.js). Spot Flow, 14.10.2026.
// Obvestilo ostane na zaslonu, dokler ga planer ne odpre ali zapre (requireInteraction); klik odpre pregled sponzorstev.
self.addEventListener('push', (event) => {
  let data = {}
  try { data = event.data ? event.data.json() : {} } catch (e) { data = { title: 'Spot Flow', body: event.data ? event.data.text() : '' } }
  const title = data.title || 'Spot Flow'
  const options = {
    body: data.body || '',
    icon: 'icons/icon-192.png',
    badge: 'icons/icon-192.png',
    requireInteraction: true,
    vibrate: [200, 100, 200, 100, 400],
    data: { url: data.url || '/' },
  }
  if (data.tag) { options.tag = data.tag; options.renotify = true }
  event.waitUntil(self.registration.showNotification(title, options))
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const rel = String((event.notification.data && event.notification.data.url) || '/').replace(/^\//, '')
  const target = new URL(rel, self.registration.scope).href
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const c of list) {
        if ('focus' in c) {
          if ('navigate' in c) { c.navigate(target).catch(function () {}) }
          return c.focus()
        }
      }
      return self.clients.openWindow(target)
    })
  )
})
