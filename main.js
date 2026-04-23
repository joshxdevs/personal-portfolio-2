/* =========================================================
   main.js — Portfolio micro-interactions & animations
   ========================================================= */

(() => {
  'use strict';

  // =========================================================
  // LOADER
  // =========================================================
  const loader    = document.getElementById('loader');
  const loaderBar = document.getElementById('loader-bar');

  if (loaderBar) {
    loaderBar.style.width = '72%';
    window.addEventListener('load', () => {
      loaderBar.style.width = '100%';
      setTimeout(() => {
        loader.classList.add('done');
        document.body.classList.add('ready');
        startHeroLines();
      }, 320);
    });
  } else {
    document.body.classList.add('ready');
  }


  // =========================================================
  // CUSTOM CURSOR
  // =========================================================
  const cursorRing = document.getElementById('cursor');
  const cursorDot  = document.getElementById('cursor-dot');

  let mx = 0, my = 0;
  let cx = 0, cy = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursorDot.style.left = mx + 'px';
    cursorDot.style.top  = my + 'px';
    cursorRing.classList.add('visible');
    cursorDot.classList.add('visible');
  });

  document.addEventListener('mouseleave', () => {
    cursorRing.classList.remove('visible');
    cursorDot.classList.remove('visible');
  });

  (function trackCursor() {
    cx += (mx - cx) * 0.09;
    cy += (my - cy) * 0.09;
    cursorRing.style.left = cx + 'px';
    cursorRing.style.top  = cy + 'px';
    requestAnimationFrame(trackCursor);
  })();

  const hoverEls = document.querySelectorAll('a, button, .work-item, .process-item');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
  });

  document.addEventListener('mousedown', () => cursorRing.classList.add('click'));
  document.addEventListener('mouseup',   () => cursorRing.classList.remove('click'));


  // =========================================================
  // NAV — SCROLL STATE + ACTIVE LINK
  // =========================================================
  const nav      = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  const sections = document.querySelectorAll('section[id]');
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(l => l.classList.remove('active'));
      const link = document.querySelector(`.nav-link[data-section="${entry.target.id}"]`);
      if (link) link.classList.add('active');
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

  sections.forEach(s => sectionObserver.observe(s));


  // =========================================================
  // HERO HEADING — LINE REVEAL
  // =========================================================
  function startHeroLines() {
    const lines = document.querySelectorAll('.hero-line');
    lines.forEach((line, i) => {
      const text = line.textContent.trim();
      line.innerHTML = `<span class="hero-line-inner">${text}</span>`;
      const inner = line.querySelector('.hero-line-inner');
      inner.style.transitionDelay = `${0.1 + i * 0.13}s`;
      requestAnimationFrame(() => requestAnimationFrame(() => {
        inner.classList.add('in');
      }));
    });
  }


  // =========================================================
  // SCROLL REVEAL — reveal-up elements
  // =========================================================
  const revealEls = document.querySelectorAll('.reveal-up');

  // Stagger siblings in shared parent
  const staggerParents = document.querySelectorAll(
    '.work-list, .process-list, .skills-grid, .about-numbers'
  );
  staggerParents.forEach(parent => {
    const children = parent.querySelectorAll('.reveal-up');
    children.forEach((child, i) => {
      child.style.transitionDelay = `${i * 65}ms`;
    });
  });

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -32px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));


  // =========================================================
  // HERO SCROLL HINT — fade on scroll
  // =========================================================
  const scrollHint = document.getElementById('hero-scroll-hint');
  if (scrollHint) {
    window.addEventListener('scroll', () => {
      scrollHint.style.opacity = Math.max(0, 1 - window.scrollY / 100).toString();
    }, { passive: true });
  }


  // =========================================================
  // NUMBER COUNTER
  // =========================================================
  const numEls = document.querySelectorAll('.about-num[data-target]');

  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      counterObserver.unobserve(entry.target);
      animateCounter(entry.target);
    });
  }, { threshold: 0.5 });

  numEls.forEach(el => counterObserver.observe(el));

  function animateCounter(el) {
    const target   = parseInt(el.dataset.target, 10);
    const duration = 1200;
    const start    = performance.now();

    function step(now) {
      const p  = Math.min((now - start) / duration, 1);
      const e  = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.round(e * target);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }


  // =========================================================
  // WORK ITEMS — SUBTLE PARALLAX TILT
  // =========================================================
  const workItems = document.querySelectorAll('.work-item');

  workItems.forEach(item => {
    item.addEventListener('mousemove', e => {
      const rect = item.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      item.style.transform = `perspective(1000px) rotateX(${-y * 0.7}deg) rotateY(${x * 0.7}deg)`;
    });
    item.addEventListener('mouseleave', () => {
      item.style.transition = 'transform 0.7s cubic-bezier(0.16,1,0.3,1)';
      item.style.transform  = 'perspective(1000px) rotateX(0) rotateY(0)';
      setTimeout(() => { item.style.transition = ''; }, 700);
    });
  });


  // =========================================================
  // CONTACT EMAIL — CHAR SCRAMBLE
  // =========================================================
  const emailEl = document.getElementById('contact-email');
  if (emailEl) {
    const original = emailEl.textContent.trim();
    const pool     = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const special  = new Set(['@', '.', '_', '-']);
    let running    = false;

    emailEl.addEventListener('mouseenter', () => {
      if (running) return;
      running = true;
      const t0 = performance.now();
      const dur = 640;

      (function tick(now) {
        const progress  = Math.min((now - t0) / dur, 1);
        const revealed  = Math.floor(progress * original.length);
        let out = '';
        for (let i = 0; i < original.length; i++) {
          if (i < revealed || special.has(original[i])) {
            out += original[i];
          } else {
            out += pool[Math.floor(Math.random() * pool.length)];
          }
        }
        emailEl.textContent = out;
        if (progress < 1) requestAnimationFrame(tick);
        else { emailEl.textContent = original; running = false; }
      })(performance.now());
    });
  }


  // =========================================================
  // FOOTER — LIVE CLOCK
  // =========================================================
  const footerTime = document.getElementById('footer-time');
  if (footerTime) {
    function updateTime() {
      const now = new Date();
      const hh  = now.toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false,
      });
      footerTime.textContent = `India · ${hh} IST`;
    }
    updateTime();
    setInterval(updateTime, 1000);
  }


  // =========================================================
  // NAV LOGO — GLITCH on hover
  // =========================================================
  const navLogo     = document.getElementById('nav-logo');
  const navLogoText = navLogo ? navLogo.querySelector('.nav-logo-text') : null;
  if (navLogo && navLogoText) {
    const original = navLogoText.textContent;
    const glyphPool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$%&*#@!';
    let glitchRaf;

    navLogo.addEventListener('mouseenter', () => {
      cancelAnimationFrame(glitchRaf);
      let frame = 0;
      const maxFrames = 12;
      (function glitch() {
        if (frame >= maxFrames) { navLogoText.textContent = original; return; }
        navLogoText.textContent = original
          .split('')
          .map((c, i) => (i < Math.floor(frame / maxFrames * original.length))
            ? c
            : glyphPool[Math.floor(Math.random() * glyphPool.length)])
          .join('');
        frame++;
        glitchRaf = requestAnimationFrame(glitch);
      })();
    });
    navLogo.addEventListener('mouseleave', () => {
      cancelAnimationFrame(glitchRaf);
      navLogoText.textContent = original;
    });
  }

})();
