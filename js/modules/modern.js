/* =============================================
   MODERN EFFECTS
   - Última palabra de cada título en gradiente
   - Luz que sigue al mouse dentro de las tarjetas
   - Tilt 3D suave en el video del hero
   - Barra de progreso de scroll
   - Reveal escalonado del hero
   ============================================= */

/* ---- Títulos: resalta la última palabra ---- */
function highlightTitles() {
  document.querySelectorAll('.section-title').forEach(el => {
    const text = el.textContent.trim();
    const idx  = text.lastIndexOf(' ');
    if (idx === -1) return;
    const span = document.createElement('span');
    span.className   = 'title-accent';
    span.textContent = text.slice(idx + 1);
    el.textContent = text.slice(0, idx + 1);
    el.appendChild(span);
  });
}

/* Re-aplicar cada vez que i18n reescribe los textos */
(function hookI18n() {
  if (typeof i18n === 'undefined') {
    document.addEventListener('DOMContentLoaded', highlightTitles);
    return;
  }
  const apply = i18n.apply.bind(i18n);
  i18n.apply = (lang) => {
    apply(lang);
    highlightTitles();
  };
})();

/* ---- Spotlight dentro de las tarjetas ---- */
(function initCardLight() {
  const cards = document.querySelectorAll(
    '.service-card, .stack-category, .container-block, .project-card, .contact-card'
  );
  cards.forEach(card => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });
})();

/* ---- Tilt 3D del video ---- */
(function initHeroTilt() {
  const box = document.querySelector('.hero .video-container');
  if (!box || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(hover: none)').matches) return;

  box.parentElement.style.perspective = '1200px';

  box.addEventListener('pointermove', (e) => {
    const r = box.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    box.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  });
  box.addEventListener('pointerleave', () => {
    box.style.transform = '';
  });
})();

/* ---- Barra de progreso de scroll ---- */
(function initScrollProgress() {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.appendChild(bar);

  let ticking = false;
  function update() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update();
})();

/* ---- Reveal escalonado del hero + contadores ---- */
(function initHeroReveal() {
  const items = document.querySelectorAll(
    '.hero-text > *, .hero-visual'
  );
  items.forEach((el, i) => {
    el.classList.add('reveal-up');
    el.style.transitionDelay = `${0.08 * i}s`;
  });

  /* Doble rAF: deja pintar el estado inicial para que la transición se vea */
  requestAnimationFrame(() => requestAnimationFrame(() => {
    items.forEach(el => el.classList.add('is-visible'));
    if (typeof countUpAll === 'function') countUpAll();
  }));
})();
