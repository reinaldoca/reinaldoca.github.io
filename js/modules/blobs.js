/* =============================================
   ANIMATED BLOB SHAPES
   Formas orgánicas SVG con morph animation
   Portfolio Reinaldo Cancino Allen
   ============================================= */

'use strict';

(function initBlobs() {
  const heroSection = document.querySelector('.hero');
  if (!heroSection) {
    console.warn('[Blobs] Hero section not found');
    return;
  }

  /* Crear SVG container */
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'hero-blob');
  svg.setAttribute('viewBox', '0 0 800 800');
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

  /* Estilos del SVG */
  svg.style.cssText = `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    max-width: 900px;
    height: auto;
    z-index: 0;
    opacity: 0.6;
    pointer-events: none;
  `;

  /* Definir gradientes y filtros */
  const defs = `
    <defs>
      <!-- Filtro goo para efecto líquido -->
      <filter id="goo">
        <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
        <feColorMatrix
          in="blur"
          mode="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -12"
          result="goo"
        />
        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
      </filter>

      <!-- Gradiente 1: Azul a Cyan -->
      <linearGradient id="blobGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="rgba(99, 179, 237, 0.15)" />
        <stop offset="100%" stop-color="rgba(79, 209, 197, 0.08)" />
      </linearGradient>

      <!-- Gradiente 2: Cyan a Púrpura -->
      <linearGradient id="blobGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="rgba(79, 209, 197, 0.12)" />
        <stop offset="100%" stop-color="rgba(167, 139, 250, 0.06)" />
      </linearGradient>

      <!-- Gradiente 3: Púrpura a Naranja -->
      <radialGradient id="blobGradient3">
        <stop offset="0%" stop-color="rgba(167, 139, 250, 0.15)" />
        <stop offset="100%" stop-color="rgba(246, 173, 85, 0.05)" />
      </radialGradient>
    </defs>
  `;

  svg.innerHTML = defs;

  /* Crear 3 blobs con diferentes gradientes */
  const blobs = [
    {
      id: 'blob1',
      gradient: 'url(#blobGradient1)',
      size: 1.0,
      paths: [
        'M400,200 Q500,150 550,250 Q600,350 550,450 Q500,550 400,500 Q300,450 250,350 Q200,250 300,200 Q350,150 400,200 Z',
        'M420,180 Q520,160 560,270 Q580,380 530,470 Q480,560 380,520 Q280,480 240,370 Q220,260 310,200 Q360,160 420,180 Z',
        'M390,210 Q490,170 540,260 Q590,350 540,440 Q490,530 390,490 Q290,440 250,340 Q210,240 300,210 Q340,180 390,210 Z'
      ],
      duration: 5000,
      offset: 0
    },
    {
      id: 'blob2',
      gradient: 'url(#blobGradient2)',
      size: 0.8,
      paths: [
        'M500,300 Q580,250 600,350 Q620,450 570,530 Q520,610 420,580 Q320,550 280,450 Q260,350 340,280 Q420,250 500,300 Z',
        'M520,280 Q600,260 610,360 Q630,460 580,540 Q530,620 430,590 Q330,560 290,460 Q270,360 350,290 Q430,260 520,280 Z',
        'M490,310 Q570,270 590,370 Q610,470 560,550 Q510,630 410,600 Q310,570 270,470 Q250,370 330,300 Q410,270 490,310 Z'
      ],
      duration: 6000,
      offset: 1500
    },
    {
      id: 'blob3',
      gradient: 'url(#blobGradient3)',
      size: 0.6,
      paths: [
        'M300,400 Q350,350 420,380 Q490,410 500,490 Q510,570 440,600 Q370,630 300,590 Q230,550 220,470 Q210,390 260,380 Q270,350 300,400 Z',
        'M320,380 Q370,340 440,370 Q510,400 520,480 Q530,560 460,590 Q390,620 320,580 Q250,540 240,460 Q230,380 280,370 Q290,340 320,380 Z',
        'M310,390 Q360,350 430,380 Q500,410 510,490 Q520,570 450,600 Q380,630 310,590 Q240,550 230,470 Q220,390 270,380 Q280,350 310,390 Z'
      ],
      duration: 7000,
      offset: 3000
    }
  ];

  /* Crear elementos blob */
  blobs.forEach((blobConfig, index) => {
    const blob = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    blob.setAttribute('id', blobConfig.id);
    blob.setAttribute('fill', blobConfig.gradient);
    blob.setAttribute('filter', 'url(#goo)');
    blob.setAttribute('d', blobConfig.paths[0]);
    blob.setAttribute('opacity', '0.8');

    /* Aplicar escala */
    const transform = `scale(${blobConfig.size})`;
    blob.setAttribute('transform', transform);
    blob.setAttribute('transform-origin', '400 400');

    svg.appendChild(blob);

    /* Animar morph de paths */
    animateBlobMorph(blob, blobConfig.paths, blobConfig.duration, blobConfig.offset);
  });

  /* Agregar SVG al hero */
  heroSection.appendChild(svg);

  /* Función para animar el morph entre paths */
  function animateBlobMorph(pathElement, paths, duration, startOffset) {
    let currentPathIndex = 0;
    let startTime = null;
    let animationFrameId = null;

    function animate(timestamp) {
      if (!startTime) startTime = timestamp - startOffset;

      const elapsed = timestamp - startTime;
      const progress = (elapsed % duration) / duration;

      /* Calcular índices de paths actual y siguiente */
      currentPathIndex = Math.floor(elapsed / duration) % paths.length;
      const nextPathIndex = (currentPathIndex + 1) % paths.length;

      /* Interpolar entre paths (simplificado - animación CSS sería más suave) */
      if (progress < 0.1 || progress > 0.9) {
        /* Transicionar entre paths */
        pathElement.style.transition = 'none';
      } else {
        pathElement.style.transition = 'd 0.3s ease-in-out';
      }

      /* Cambiar path cuando comience nueva iteración */
      if (progress < 0.1) {
        pathElement.setAttribute('d', paths[currentPathIndex]);
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    /* Iniciar animación */
    animationFrameId = requestAnimationFrame(animate);

    /* Limpiar al desmontar (opcional) */
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }

  /* Animación alternativa más simple con CSS */
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes blobFloat {
      0%, 100% { transform: translate(0, 0) scale(1); }
      25% { transform: translate(10px, -10px) scale(1.05); }
      50% { transform: translate(-5px, 5px) scale(0.95); }
      75% { transform: translate(-10px, 10px) scale(1.02); }
    }

    .hero-blob path {
      animation: blobFloat 20s ease-in-out infinite;
    }

    .hero-blob path:nth-child(2) {
      animation-delay: -7s;
    }

    .hero-blob path:nth-child(3) {
      animation-delay: -14s;
    }
  `;
  document.head.appendChild(styleSheet);

  console.log('[Blobs] Initialized with 3 animated blobs');

  /* Deshabilitar en móviles para mejor performance */
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  if (isMobile) {
    svg.style.display = 'none';
    console.log('[Blobs] Disabled on mobile');
  }
})();
