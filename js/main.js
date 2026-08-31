// EYLDI — shared site behavior (nav, stat counters, donate widget)

document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  initActiveNavLink();
  initStatCounters();
  initDonateWidget();
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
}

/* Animated stat counters — triggers once elements enter viewport */
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

/* Donate widget: one-time / monthly toggle + amount selection + impact framing */
function initDonateWidget() {
  const widget = document.querySelector('[data-donate-widget]');
  if (!widget) return;

  const toggleButtons = widget.querySelectorAll('[data-give-freq]');
  const amountButtons = widget.querySelectorAll('[data-amount]');
  const impactNote = widget.querySelector('[data-impact-note]');
  const hiddenFreqInput = widget.querySelector('[name="frequency"]');
  const hiddenAmountInput = widget.querySelector('[name="amount"]');
  const submitBtn = widget.querySelector('[data-donate-submit]');

  const impactCopy = {
    monthly: {
      25: '$25/month sustains a peer learning community for Leader-Developers all year.',
      50: '$50/month supports one Leader-Developer’s participation in a research interview each quarter.',
      100: '$100/month helps fund a full competency-building workshop for rising ECE leaders.',
      other: 'Your monthly gift helps EYLDI keep studying — and sharing — what makes ECE leaders effective.'
    },
    onetime: {
      25: '$25 supports the printing and distribution of one Leader-Developer competency guide.',
      50: '$50 supports one Leader-Developer’s participation in a research interview.',
      100: '$100 helps fund a full competency-building workshop for rising ECE leaders.',
      other: 'Every gift helps EYLDI keep studying — and sharing — what makes ECE leaders effective.'
    }
  };

  let currentFreq = 'monthly';
  let currentAmount = '50';

  function updateImpactNote() {
    if (!impactNote) return;
    const copy = impactCopy[currentFreq][currentAmount] || impactCopy[currentFreq].other;
    impactNote.textContent = copy;
  }

  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleButtons.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      currentFreq = btn.getAttribute('data-give-freq');
      if (hiddenFreqInput) hiddenFreqInput.value = currentFreq;
      updateImpactNote();
    });
  });

  amountButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      amountButtons.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      currentAmount = btn.getAttribute('data-amount');
      if (hiddenAmountInput) hiddenAmountInput.value = currentAmount;
      updateImpactNote();
    });
  });

  updateImpactNote();

  if (submitBtn) {
    submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // PLACEHOLDER: connect to donation processor here.
      // e.g. redirect to Give Lively / Stripe / Donorbox / fiscal sponsor's hosted donation page:
      // window.location.href = 'https://givelively.org/donate/YOUR-EYLDI-CAMPAIGN';
      alert('This is a demo build. Connect this button to your donation platform (Give Lively, Stripe, Donorbox, or your fiscal sponsor’s giving page) to accept real gifts.');
    });
  }
}
