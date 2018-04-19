self.addEventListener('install', () => {
  console.log('[sw web notification]', 'Your ServiceWorker is installed');
});

self.addEventListener('push', event => {
  console.log('[sw]', 'pushed!!', event.data.json());
  const { title, content } = event.data.json();
  const notification = {
    title: title,
    body: content,
    icon: '/assets/logo.png',
    badge: '/assets/badge.png',
    actions: [{ action: 'origin', title: 'Origin', icon: '/assets/ic_link.png' }],
    vibrate: [500, 110, 500, 110, 450, 110, 200, 110, 170, 40, 450, 110, 200, 110, 170, 40, 500]
  };
  self.registration.showNotification(title, notification);
});
