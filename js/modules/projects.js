/* =============================================
   PROJECTS FILTERS
   Sistema de filtrado de proyectos
   Portfolio Reinaldo Cancino Allen
   ============================================= */

'use strict';

(function initProjectFilters() {
  const filters = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  if (filters.length === 0 || cards.length === 0) {
    console.warn('[Projects] No filters or cards found');
    return;
  }

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      /* Update active state */
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      /* Filter cards with staggered animation */
      cards.forEach((card, index) => {
        const categories = card.dataset.category || '';
        const shouldShow = filter === 'all' || categories.includes(filter);

        if (shouldShow) {
          /* Remover clase hidden inmediatamente */
          card.classList.remove('filter-hidden');

          /* Aplicar stagger delay para entrada */
          card.style.transitionDelay = `${index * 50}ms`;
        } else {
          /* Ocultar sin delay */
          card.style.transitionDelay = '0ms';
          card.classList.add('filter-hidden');
        }
      });

      /* Limpiar transition delays después de la animación */
      setTimeout(() => {
        cards.forEach(card => {
          card.style.transitionDelay = '';
        });
      }, cards.length * 50 + 400);
    });
  });

  console.log(`[Projects] Filters initialized with ${cards.length} projects`);
})();
