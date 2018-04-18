self.addEventListener('install', () => {
  console.log('[sw web notification]', 'Your ServiceWorker is installed');
});

self.addEventListener('push', event => {
  console.log('[sw]', 'pushed!!', event.data.json());
  const { title, msg } = event.data.json();
  const notification = {
    title: title,
    message: msg,
    icon: '/assets/logo.png'
  };
  self.registration.showNotification(title, notification);
});
