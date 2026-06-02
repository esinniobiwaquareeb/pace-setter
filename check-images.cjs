const https = require('https');

const urls = [
  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1603712725038-e9334ae8f39f?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1558384518-e390c58e578c?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1574359411659-15573a27fd0c?auto=format&fit=crop&w=1200&q=80"
];

urls.forEach(url => {
  https.get(url, (res) => {
    console.log(`Status ${res.statusCode} for ${url}`);
  }).on('error', (e) => {
    console.error(e);
  });
});
