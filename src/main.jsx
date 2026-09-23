import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/style.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ── BuyMeACoffee Widget (Lazy Loaded for Optimal Core Web Vitals) ──
(function () {
  function loadBMCWidget() {
    if (window.__bmcWidgetLoaded) return;
    window.__bmcWidgetLoaded = true;
    const bmc = document.createElement('script');
    bmc.setAttribute('data-name', 'BMC-Widget');
    bmc.setAttribute('data-cfasync', 'false');
    bmc.src = 'https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js';
    bmc.setAttribute('data-id', 'ishara.madu');
    bmc.setAttribute('data-description', 'Support me on Buy me a coffee!');
    bmc.setAttribute('data-message', '');
    bmc.setAttribute('data-color', '#FF502B');
    bmc.setAttribute('data-position', 'Right');
    bmc.setAttribute('data-x_margin', '18');
    bmc.setAttribute('data-y_margin', '18');
    document.body.appendChild(bmc);
  }
  if (document.readyState === 'complete') {
    setTimeout(loadBMCWidget, 2000);
  } else {
    window.addEventListener('load', () => setTimeout(loadBMCWidget, 2000));
  }
  ['scroll', 'touchstart', 'mousemove', 'keydown'].forEach((e) => {
    window.addEventListener(e, loadBMCWidget, { once: true, passive: true });
  });
})();
