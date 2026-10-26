import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.getRegistrations().then(async (registrations) => {
      const oldRegistrations = registrations.filter((registration) => {
        const worker = registration.active ?? registration.waiting ?? registration.installing;
        if (!worker) return true;
        return new URL(worker.scriptURL).pathname !== '/sw.js';
      });

      await Promise.all(oldRegistrations.map((registration) => registration.unregister()));
      await navigator.serviceWorker.register('/sw.js');
    }).catch(() => {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    });
  });
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
