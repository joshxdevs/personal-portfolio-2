/* =========================================================
   main.js — Portfolio micro-interactions & animations
   ========================================================= */

(() => {
  'use strict';

  // =========================================================
  // DATA RENDERING (Run before observers)
  // =========================================================
  
  // 1. Render Projects
  const workList = document.getElementById('work-list');
  if (workList && window.PROJECTS) {
    workList.innerHTML = window.PROJECTS.map(p => `
      <article class="work-item reveal-up" role="listitem" id="project-${p.id}" data-screenshot="${p.screenshot || ''}">
        <div class="work-item-left">
          <span class="work-num mono">${p.num}</span>
          <span class="work-year mono dim">${p.year}</span>
        </div>
        <div class="work-item-right">
          <div class="work-tags">
            ${p.tags.map(t => `<span class="chip">${t}</span>`).join('')}
          </div>
          <h3 class="work-title">${p.title}</h3>
          <p class="work-desc">${p.description}</p>
          <div class="work-stack mono">
            ${p.stack.map(s => `<span>${s}</span>`).join('')}
          </div>
          <div class="work-links">
            ${p.github ? `
              <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="work-link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                GitHub
              </a>` : ''}
            ${p.live ? `
              <a href="${p.live}" target="_blank" rel="noopener noreferrer" class="work-link">
                Live
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M7 17L17 7M7 7h10v10"/></svg>
              </a>` : ''}
          </div>
        </div>
      </article>
    `).join('');
  }

  // 2. Render Experience
  const expList = document.getElementById('experience-list');
  if (expList && window.EXPERIENCE) {
    expList.innerHTML = `
      <span class="skill-group-label mono exp-label">Experience</span>
      <div class="exp-items">
        ${window.EXPERIENCE.map(e => `
          <div class="exp-item">
            <div class="exp-head">
              <span class="exp-role">${e.role}</span>
              <span class="exp-company mono">${e.company}</span>
            </div>
            <span class="exp-period mono dim">${e.period}</span>
            <p class="exp-desc">${e.description}</p>
          </div>
        `).join('')}
      </div>
    `;
  }

  // 3. Render Posts
  const postsList = document.getElementById('posts-list');
  if (postsList && window.POSTS) {
    postsList.innerHTML = window.POSTS.map(p => `
      <a href="writing/post.html?post=${p.slug}" class="post-card reveal-up">
        <div class="post-card-meta mono dim">
          <span>${p.date}</span>
          <span class="post-card-sep">·</span>
          <span>${p.readTime}</span>
        </div>
        <h3 class="post-card-title">${p.title}</h3>
        <p class="post-card-excerpt">${p.excerpt}</p>
      </a>
    `).join('');
  }

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
  // WORK ITEMS — PARALLAX TILT & HOVER PREVIEW
  // =========================================================
  const workItems = document.querySelectorAll('.work-item');
  const previewBox = document.getElementById('project-preview');
  const previewImg = document.getElementById('project-preview-img');
  
  let previewX = 0, previewY = 0;
  let targetX = 0, targetY = 0;
  let isPreviewVisible = false;

  (function animatePreview() {
    if (isPreviewVisible && previewBox) {
      previewX += (targetX - previewX) * 0.15;
      previewY += (targetY - previewY) * 0.15;
      previewBox.style.transform = `translate(${previewX}px, ${previewY}px) scale(1)`;
    }
    requestAnimationFrame(animatePreview);
  })();

  workItems.forEach(item => {
    item.addEventListener('mousemove', e => {
      const rect = item.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      item.style.transform = `perspective(1000px) rotateX(${-y * 0.7}deg) rotateY(${x * 0.7}deg)`;
      
      if (isPreviewVisible) {
        targetX = e.clientX + 20;
        targetY = e.clientY + 20;
      }
    });

    item.addEventListener('mouseenter', e => {
      const src = item.getAttribute('data-screenshot');
      if (src && src !== 'null' && previewBox && previewImg) {
        previewImg.src = src;
        previewBox.classList.add('visible');
        isPreviewVisible = true;
        previewX = targetX = e.clientX + 20;
        previewY = targetY = e.clientY + 20;
        previewBox.style.transform = `translate(${previewX}px, ${previewY}px) scale(0.95)`;
      }
    });

    item.addEventListener('mouseleave', () => {
      item.style.transition = 'transform 0.7s cubic-bezier(0.16,1,0.3,1)';
      item.style.transform  = 'perspective(1000px) rotateX(0) rotateY(0)';
      setTimeout(() => { item.style.transition = ''; }, 700);

      if (previewBox) {
        previewBox.classList.remove('visible');
        isPreviewVisible = false;
        previewBox.style.transform = `translate(${previewX}px, ${previewY}px) scale(0.95)`;
      }
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
