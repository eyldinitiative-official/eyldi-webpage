// EYLDI: shared site behavior (nav, stat counters)

document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  initActiveNavLink();
  initStatCounters();
  initScrollReveal();
  initHeroParallax();
});

/* Mobile nav hamburger */
function initNavToggle() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* Highlight current page in nav */
function initActiveNavLink() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('is-active');
    }
  });
  // Highlight a dropdown's parent link when the current page is one of its children
  document.querySelectorAll('.nav-item--dropdown').forEach(item => {
    const childOnPage = [...item.querySelectorAll('.nav-dropdown a')]
      .some(a => (a.getAttribute('href') || '').split('#')[0] === path);
    if (childOnPage) item.querySelector(':scope > a').classList.add('is-active');
  });
}

/* Animated stat counters: triggers once elements enter viewport */
function initStatCounters() {
  const counters = document.querySelectorAll('[data-count-to]');
  if (!counters.length) return;

  const animate = (el) => {
    const target = parseFloat(el.getAttribute('data-count-to'));
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1400;
    const start = performance.now();

    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      el.textContent = value.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animate(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(el => observer.observe(el));
}


/* Scroll reveal: items fade up as they enter the viewport (CSS does the animating) */
function initScrollReveal() {
  const root = document.documentElement;
  if (!root.classList.contains('js')) return;
  const SEL = '.section-head, .card, .ripple-step, .explore-card, .report-band, .stat, .pull-quote, .team-card, .value-card, .fact, .glossary > div, .cop-panel, .era-card, .comp-tile, #accordion-list, .belief, .acc:not(.acc--level), .brand-divider, .method-step, .page-subnav';
  const els = [...document.querySelectorAll(SEL)].filter(el => !el.closest('.site-header, .hero, .hub-hero'));
  const seen = new Map();
  els.forEach(el => {
    const p = el.parentElement;
    const i = seen.get(p) || 0;
    seen.set(p, i + 1);
    el.style.setProperty('--rd', Math.min(i, 5) * 90 + 'ms');
  });

  const show = (el) => {
    if (el.classList.contains('is-in')) return;
    el.classList.add('is-in');
    setTimeout(() => el.classList.add('is-done'), 1200);
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  els.forEach(el => io.observe(el));

  // Anything the user jumped past (anchor links, fast scrolling) is shown rather than left hidden
  let ticking = false;
  const sweep = () => {
    ticking = false;
    els.forEach(el => { if (el.getBoundingClientRect().bottom < 0) show(el); });
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(sweep); } }, { passive: true });
  window.addEventListener('hashchange', () => setTimeout(sweep, 400));
  window.__revealReady = true;
}

/* Gentle parallax: the hero illustration drifts a little slower than the page */
function initHeroParallax() {
  const art = document.querySelector('.hero-art--illustration');
  if (!art || (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = Math.min(window.scrollY, 700);
      art.style.transform = 'translateY(' + (y * -0.07).toFixed(1) + 'px)';
      ticking = false;
    });
  }, { passive: true });
}
