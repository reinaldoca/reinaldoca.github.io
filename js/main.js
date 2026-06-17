/* =============================================
   REINALDO CANCINO ALLEN — Portfolio JS
   ============================================= */

'use strict';

/* ---- Cursor personalizado ---- */
(function initCursor() {
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  if (!cursor || !follower) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;
  let visible = false;

  /* Usar transform en lugar de left/top — GPU accelerated, sin reflow */
  cursor.style.cssText   += '; will-change: transform;';
  follower.style.cssText += '; will-change: transform;';

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    /* Cursor principal: instantáneo, sin lag */
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    if (!visible) {
      visible = true;
      cursor.style.opacity   = '1';
      follower.style.opacity = '0.5';
    }
  }, { passive: true });

  /* Follower: suave pero responsivo — lerp 0.28 en lugar de 0.12 */
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
    visible = false;
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
      this.color  = Math.random() > 0.6 ? '#63b3ed' : Math.random() > 0.5 ? '#4fd1c5' : '#a78bfa';
      this.life   = 0;
      this.maxLife= Math.random() * 400 + 200;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life++;

      /* Mouse repulsion */
      if (mouse.x !== null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          this.vx += dx / dist * 0.06;
          this.vy += dy / dist * 0.06;
        }
      }

      /* Fade in/out */
      const progress = this.life / this.maxLife;
      if (progress < 0.15)       this.alpha = (progress / 0.15) * 0.55;
      else if (progress > 0.75)  this.alpha = ((1 - progress) / 0.25) * 0.55;
      else                       this.alpha = 0.55;

      if (this.life > this.maxLife || this.y < -5) this.reset(false);
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.restore();
    }
  }

  function buildParticles() {
    const count = Math.min(Math.floor(W * H / 14000), 100);
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

/* ---- Terminal typewriter ---- */
(function initTypewriter() {
  const cmdEl    = document.getElementById('typed-cmd');
  const outputEl = document.getElementById('t-output');
  const blinkEl  = document.querySelector('.t-blink');
  if (!cmdEl || !outputEl) return;

  const text    = 'whoami';
  let index     = 0;
  let started   = false;

  function type() {
    if (index < text.length) {
      cmdEl.textContent += text[index++];
      setTimeout(type, 80 + Math.random() * 60);
    } else {
      /* Simulate Enter */
      setTimeout(() => {
        if (blinkEl) blinkEl.style.display = 'none';
        outputEl.style.display = 'block';
        countUpAll();
      }, 350);
    }
  }

  /* Start when visible */
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !started) {
      started = true;
      setTimeout(type, 600);
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
  const MAX_TILT = 8;

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top  + rect.height / 2;
      const deltaX  = (e.clientX - centerX) / (rect.width / 2);
      const deltaY  = (e.clientY - centerY) / (rect.height / 2);
      card.style.transform = `
        translateY(-6px)
        perspective(800px)
        rotateY(${deltaX * MAX_TILT}deg)
        rotateX(${-deltaY * MAX_TILT}deg)
      `;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.45s cubic-bezier(0.4,0,0.2,1), border-color 0.3s, box-shadow 0.3s';
      card.style.transform = '';
      setTimeout(() => { card.style.transition = ''; }, 450);
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
