/* =============================================
   SPOTLIGHT CURSOR GLOW
   Efecto de iluminación siguiendo el cursor
   Portfolio Reinaldo Cancino Allen
   ============================================= */

'use strict';

(function initSpotlight() {
  /* Crear elemento spotlight */
  const spotlight = document.createElement('div');
  spotlight.className = 'spotlight';
  spotlight.style.cssText = `
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 1;
    mix-blend-mode: screen;
    transition: opacity 0.3s;
    opacity: 0;
  `;
  document.body.appendChild(spotlight);

  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;
  let isVisible = false;

  /* Configuración del spotlight */
  const CONFIG = {
    radius: 800,
    color: 'rgba(99, 179, 237, 0.10)',
    colorEnd: 'rgba(79, 209, 197, 0.03)',
    smoothing: 0.15  // Factor de suavizado (0-1, menor = más suave)
  };

  /* Actualizar posición del mouse */
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isVisible) {
      isVisible = true;
      spotlight.style.opacity = '1';
      currentX = mouseX;
      currentY = mouseY;
    }
  }, { passive: true });

  /* Ocultar al salir de la ventana */
  document.addEventListener('mouseleave', () => {
    spotlight.style.opacity = '0';
    isVisible = false;
  });

  document.addEventListener('mouseenter', () => {
    if (isVisible) {
      spotlight.style.opacity = '1';
    }
  });

  /* Animar spotlight con smooth following */
  function animate() {
    /* Lerp (interpolación lineal) para movimiento suave */
    currentX += (mouseX - currentX) * CONFIG.smoothing;
    currentY += (mouseY - currentY) * CONFIG.smoothing;

    /* Actualizar gradient centrado en la posición actual */
    spotlight.style.background = `
      radial-gradient(
        circle ${CONFIG.radius}px at ${currentX}px ${currentY}px,
        ${CONFIG.color} 0%,
        ${CONFIG.colorEnd} 30%,
        transparent 70%
      )
    `;

    requestAnimationFrame(animate);
  }

  /* Iniciar animación */
  animate();

  console.log('[Spotlight] Initialized');

  /* Deshabilitar en móviles para mejor performance */
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  if (isMobile) {
    spotlight.style.display = 'none';
    console.log('[Spotlight] Disabled on mobile');
  }
})();
