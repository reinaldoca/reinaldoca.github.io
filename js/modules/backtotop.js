/* =============================================
   BACK TO TOP BUTTON
   Botón flotante para volver arriba
   Portfolio Reinaldo Cancino Allen
   ============================================= */

'use strict';

(function initBackToTop() {
  /* Crear botón si no existe */
  let btn = document.getElementById('back-to-top');

  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'back-to-top';
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', 'Scroll to top');
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 15l-6-6-6 6"/>
      </svg>
    `;
    document.body.appendChild(btn);
  }

  /* Mostrar/ocultar según scroll */
  function checkScroll() {
    if (window.scrollY > 600) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }

  /* Throttle para mejor performance */
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        checkScroll();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  /* Scroll to top on click */
  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  /* Check inicial */
  checkScroll();

  console.log('[BackToTop] Initialized');
})();
