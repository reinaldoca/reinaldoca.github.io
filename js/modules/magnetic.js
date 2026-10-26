/* =============================================
   MAGNETIC BUTTONS EFFECT
   Efecto imán en botones - Portfolio Reinaldo Cancino Allen
   ============================================= */

'use strict';

(function initMagneticButtons() {
  /* Selectores de elementos que tendrán efecto magnético */
  const buttons = document.querySelectorAll('.btn, .btn-primary, .btn-ghost, .nav-cta, .btn-gradient-border');

  /* Factor de magnetismo (0.4 = 40% del delta) */
  const MAGNETIC_STRENGTH = 0.4;
  const MAGNETIC_RADIUS = 100; // Radio de activación en píxeles

  buttons.forEach(btn => {
    let isHovering = false;

    btn.addEventListener('mouseenter', () => {
      isHovering = true;
      btn.style.transition = 'none';
    });

    btn.addEventListener('mousemove', (e) => {
      if (!isHovering) return;

      const rect = btn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      /* Calcular distancia del cursor al centro */
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDistance = MAGNETIC_RADIUS;

      /* Solo aplicar magnetismo si está dentro del radio */
      if (distance < maxDistance) {
        /* Factor de intensidad basado en distancia (más cerca = más fuerte) */
        const intensity = (1 - distance / maxDistance) * MAGNETIC_STRENGTH;

        const moveX = deltaX * intensity;
        const moveY = deltaY * intensity;

        btn.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
      } else {
        btn.style.transform = 'translate(0, 0) scale(1)';
      }
    });

    btn.addEventListener('mouseleave', () => {
      isHovering = false;

      /* Transición suave de vuelta a posición original */
      btn.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
      btn.style.transform = '';

      /* Limpiar transition después para no interferir con otras animaciones */
      setTimeout(() => {
        btn.style.transition = '';
      }, 500);
    });

    /* Opcional: efecto adicional en click */
    btn.addEventListener('mousedown', () => {
      btn.style.transform = btn.style.transform.replace('scale(1.02)', 'scale(0.98)');
    });

    btn.addEventListener('mouseup', () => {
      if (isHovering) {
        btn.style.transform = btn.style.transform.replace('scale(0.98)', 'scale(1.02)');
      }
    });
  });

  console.log(`[Magnetic] Initialized on ${buttons.length} elements`);
})();
