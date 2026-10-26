/* =============================================
   REINALDO CANCINO ALLEN — Portfolio JS
   ============================================= */

'use strict';

/* ---- Cursor personalizado ---- */
(function initCursor() {
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  if (!cursor || !follower) return;

  /* Verificar si es desktop (no móvil) */
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  if (isMobile) {
    cursor.style.display = 'none';
    follower.style.display = 'none';
    return;
  }

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  /* Mostrar cursores inmediatamente */
  cursor.style.opacity = '0.7';
  follower.style.opacity = '0.4';

  /* Usar transform en lugar de left/top — GPU accelerated, sin reflow */
  cursor.style.cssText   += '; will-change: transform;';
  follower.style.cssText += '; will-change: transform;';

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    /* Cursor principal: instantáneo, sin lag */
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    cursor.style.opacity = '1';
    follower.style.opacity = '0.5';
  }, { passive: true });

  /* Follower: suave pero responsivo — lerp 0.45 */
  function animateFollower() {
    followerX += (mouseX - followerX) * 0.45;
    followerY += (mouseY - followerY) * 0.45;
    follower.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  /* Ocultar cursores al salir de la ventana */
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity   = '0';
    follower.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity   = '1';
    follower.style.opacity = '0.5';
  });

  const hoverEls = document.querySelectorAll('a, button, .service-card, .contact-card, .stat-card, .extra-card, .stack-category');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.classList.add('active'); follower.classList.add('active'); });
    el.addEventListener('mouseleave', () => { cursor.classList.remove('active'); follower.classList.remove('active'); });
  });
})();

/* ---- Cursor Trail Effect ---- */
(function initCursorTrail() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const trail = [];
  const MAX_TRAIL = 15;
  let mouseX = 0, mouseY = 0;

  /* Colores según sección */
  const sectionColors = {
    'hero': '#63b3ed',
    'servicios': '#4fd1c5',
    'stack': '#a78bfa',
    'containers': '#f6ad55',
    'about': '#68d391',
    'contacto': '#fc8181'
  };

  function getCurrentSectionColor() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + window.innerHeight / 2;

    for (const section of sections) {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const sectionBottom = sectionTop + rect.height;

      if (scrollPos >= sectionTop && scrollPos <= sectionBottom) {
        return sectionColors[section.id] || '#63b3ed';
      }
    }
    return '#63b3ed';
  }

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    /* Agregar nueva partícula al trail */
    trail.push({
      x: mouseX,
      y: mouseY,
      life: 1.0,
      color: getCurrentSectionColor(),
      size: 4
    });

    if (trail.length > MAX_TRAIL) trail.shift();
  }, { passive: true });

  /* Render trail (integrado en el loop de particles) */
  window.renderCursorTrail = function() {
    trail.forEach((particle, index) => {
      particle.life -= 0.06;
      particle.size *= 0.96;

      if (particle.life > 0) {
        ctx.save();
        ctx.globalAlpha = particle.life * 0.6;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    });

    /* Remover partículas muertas */
    for (let i = trail.length - 1; i >= 0; i--) {
      if (trail[i].life <= 0) {
        trail.splice(i, 1);
      }
    }
  };
})();

/* ---- Canvas Particles ---- */
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles = [], mouse = { x: null, y: null };

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', () => { resize(); buildParticles(); });

  document.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  class Particle {
    constructor() { this.reset(true); }
    reset(init) {
      this.x  = Math.random() * W;
      this.y  = init ? Math.random() * H : H + 5;
      this.vx = (Math.random() - 0.5) * 0.25;
      this.vy = -(Math.random() * 0.4 + 0.1);
      this.size   = Math.random() * 1.8 + 0.4;
      this.alpha  = Math.random() * 0.5 + 0.1;

      /* 3 tipos de formas: circle, star, triangle */
      const rand = Math.random();
      this.type = rand < 0.6 ? 'circle' : rand < 0.85 ? 'star' : 'triangle';

      /* Modo dual: 70% repulsión, 30% atracción */
      this.attractMode = Math.random() > 0.7;

      /* Color index para transiciones suaves */
      this.colorIndex = Math.floor(Math.random() * 3);
      this.colorProgress = Math.random() * Math.PI * 2;
      this.colors = ['#63b3ed', '#4fd1c5', '#a78bfa'];
      this.color = this.colors[this.colorIndex];

      /* Z-index simulado para profundidad */
      this.z = Math.random() * 0.5 + 0.5; // 0.5 - 1.0

      this.life   = 0;
      this.maxLife= Math.random() * 400 + 200;
    }
    update() {
      /* Velocity decay orgánico */
      this.vx *= 0.99;
      this.vy *= 0.99;

      this.x += this.vx * this.z;
      this.y += this.vy * this.z;
      this.life++;

      /* Mouse interaction: repulsión O atracción */
      if (mouse.x !== null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = this.attractMode ? -0.05 : 0.06;
          this.vx += dx / dist * force;
          this.vy += dy / dist * force;
        }
      }

      /* Transición de color suave */
      this.colorProgress += 0.008;
      const colorBlend = (Math.sin(this.colorProgress) + 1) * 0.5;
      const nextIndex = (this.colorIndex + 1) % 3;
      this.color = this.lerpColor(this.colors[this.colorIndex], this.colors[nextIndex], colorBlend * 0.3);

      /* Fade in/out */
      const progress = this.life / this.maxLife;
      if (progress < 0.15)       this.alpha = (progress / 0.15) * 0.55 * this.z;
      else if (progress > 0.75)  this.alpha = ((1 - progress) / 0.25) * 0.55 * this.z;
      else                       this.alpha = 0.55 * this.z;

      if (this.life > this.maxLife || this.y < -5) this.reset(false);
    }

    lerpColor(color1, color2, t) {
      const r1 = parseInt(color1.slice(1, 3), 16);
      const g1 = parseInt(color1.slice(3, 5), 16);
      const b1 = parseInt(color1.slice(5, 7), 16);
      const r2 = parseInt(color2.slice(1, 3), 16);
      const g2 = parseInt(color2.slice(3, 5), 16);
      const b2 = parseInt(color2.slice(5, 7), 16);

      const r = Math.round(r1 + (r2 - r1) * t);
      const g = Math.round(g1 + (g2 - g1) * t);
      const b = Math.round(b1 + (b2 - b1) * t);

      return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;

      switch(this.type) {
        case 'star':
          this.drawStar();
          break;
        case 'triangle':
          this.drawTriangle();
          break;
        default:
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
      }

      ctx.restore();
    }

    drawStar() {
      const spikes = 5;
      const outerRadius = this.size * 1.2;
      const innerRadius = this.size * 0.5;

      ctx.beginPath();
      for (let i = 0; i < spikes * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = (Math.PI / spikes) * i;
        const x = this.x + Math.cos(angle) * radius;
        const y = this.y + Math.sin(angle) * radius;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
    }

    drawTriangle() {
      const size = this.size * 1.3;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y - size);
      ctx.lineTo(this.x + size, this.y + size);
      ctx.lineTo(this.x - size, this.y + size);
      ctx.closePath();
      ctx.fill();
    }
  }

  function buildParticles() {
    const count = Math.min(Math.floor(W * H / 10000), 120);
    particles = [];
    for (let i = 0; i < count; i++) particles.push(new Particle());
  }
  buildParticles();

  /* Draw lines between close particles */
  function drawConnections() {
    const maxDist = 130;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < maxDist) {
          ctx.save();
          ctx.globalAlpha = (1 - dist / maxDist) * 0.12;
          ctx.strokeStyle = '#63b3ed';
          ctx.lineWidth   = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);

    /* Render cursor trail first (behind particles) */
    if (typeof window.renderCursorTrail === 'function') {
      window.renderCursorTrail();
    }

    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    requestAnimationFrame(loop);
  }
  loop();
})();

/* ---- Navbar scroll effect ---- */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });
})();

/* ---- Mobile hamburger ---- */
(function initHamburger() {
  const btn   = document.getElementById('hamburger');
  const links = document.getElementById('nav-links');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
  });

  links.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      btn.classList.remove('open');
    });
  });
})();

/* ---- Terminal Multi-Command Typewriter ---- */
(function initTypewriter() {
  const cmdEl    = document.getElementById('typed-cmd');
  const outputEl = document.getElementById('t-output');
  const blinkEl  = document.querySelector('.t-blink');
  if (!cmdEl || !outputEl) return;

  let started = false;
  let currentCommandIndex = 0;

  /* Secuencia de comandos */
  const commands = [
    {
      text: 'whoami',
      delay: 600
    }
  ];

  function typeCommand(text, callback) {
    let index = 0;
    cmdEl.textContent = '';

    function type() {
      if (index < text.length) {
        cmdEl.textContent += text[index++];
        setTimeout(type, 80 + Math.random() * 60);
      } else {
        /* Comando completo, simular Enter */
        setTimeout(() => {
          if (callback) callback();
        }, 300);
      }
    }

    type();
  }

  function showOutput() {
    if (blinkEl) blinkEl.style.display = 'none';
    outputEl.style.display = 'block';
    outputEl.style.animation = 'fadeIn 0.4s ease-out';
    countUpAll();
  }

  function executeNextCommand() {
    if (currentCommandIndex >= commands.length) {
      /* Todos los comandos ejecutados, mostrar output final */
      showOutput();
      return;
    }

    const command = commands[currentCommandIndex];
    currentCommandIndex++;

    setTimeout(() => {
      typeCommand(command.text, () => {
        executeNextCommand();
      });
    }, command.delay);
  }

  /* Start when visible */
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !started) {
      started = true;
      executeNextCommand();
    }
  });
  observer.observe(cmdEl);
})();

/* ---- Counter animation ---- */
function countUpAll() {
  const nums = document.querySelectorAll('.stat-num');
  nums.forEach(el => {
    const target = parseFloat(el.dataset.count);
    const isDecimal = target % 1 !== 0;
    const duration = 1800;
    const start    = performance.now();

    function update(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      const current  = eased * target;
      el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}

/* ---- AOS (Animate on Scroll) — lightweight ---- */
(function initAOS() {
  const elements = document.querySelectorAll('[data-aos]');
  if (!elements.length) return;

  function check() {
    const windowBottom = window.scrollY + window.innerHeight;
    elements.forEach(el => {
      if (el.classList.contains('aos-animate')) return;
      const rect = el.getBoundingClientRect();
      const elTop = rect.top + window.scrollY;
      if (windowBottom > elTop + 80) {
        el.classList.add('aos-animate');
      }
    });
  }

  window.addEventListener('scroll', check, { passive: true });
  window.addEventListener('resize', check, { passive: true });
  check(); /* Initial check */
})();

/* ---- Active nav link on scroll ---- */
(function initActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link:not(.nav-cta)');

  function setActive() {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
      const top    = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id     = section.getAttribute('id');
      if (scrollY >= top && scrollY < bottom) {
        links.forEach(l => {
          l.classList.remove('active-link');
          if (l.getAttribute('href') === '#' + id) l.classList.add('active-link');
        });
      }
    });
  }

  /* Add active style */
  const style = document.createElement('style');
  style.textContent = `.active-link { color: var(--accent) !important; }`;
  document.head.appendChild(style);

  window.addEventListener('scroll', setActive, { passive: true });
  setActive();
})();

/* ---- Card tilt effect ---- */
(function initTilt() {
  const cards = document.querySelectorAll('.service-card, .contact-card');
  const MAX_TILT = 14;

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top  + rect.height / 2;
      const deltaX  = (e.clientX - centerX) / (rect.width / 2);
      const deltaY  = (e.clientY - centerY) / (rect.height / 2);

      /* Inner shadow dinámico que sigue al mouse */
      const shadowX = -deltaX * 10;
      const shadowY = -deltaY * 10;

      card.style.transform = `
        translateY(-8px)
        perspective(1000px)
        rotateY(${deltaX * MAX_TILT}deg)
        rotateX(${-deltaY * MAX_TILT}deg)
      `;
      card.style.boxShadow = `
        0 24px 64px rgba(0,0,0,0.5),
        0 0 0 1px rgba(99,179,237,0.1),
        0 0 80px rgba(99,179,237,0.25),
        inset ${shadowX}px ${shadowY}px 30px rgba(0,0,0,0.3),
        inset 0 1px 0 rgba(255,255,255,0.1)
      `;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1), border-color 0.3s, box-shadow 0.5s cubic-bezier(0.4,0,0.2,1)';
      card.style.transform = '';
      card.style.boxShadow = '';
      setTimeout(() => { card.style.transition = ''; }, 500);
    });
  });
})();

/* ---- Smooth scroll for anchor links ---- */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
})();

/* ---- Section reveal with color glow ---- */
(function initSectionGlow() {
  const sections = document.querySelectorAll('.section');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.setProperty('--section-visible', '1');
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(s => observer.observe(s));
})();

/* ---- Video Hero Handler ---- */
(function initVideoHero() {
  const video = document.querySelector('.hero-video');
  if (!video) return;

  /* Asegurar reproducción en dispositivos móviles */
  video.addEventListener('canplay', () => {
    video.play().catch(err => {
      console.warn('[Video] Autoplay blocked:', err);
    });
  });

  /* Re-intentar play si falla (usuario debe interactuar) */
  document.addEventListener('click', () => {
    if (video.paused) {
      video.play().catch(() => {});
    }
  }, { once: true });

  console.log('[Video] Hero video initialized');
})();
