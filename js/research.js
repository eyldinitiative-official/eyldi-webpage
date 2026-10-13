// EYLDI — Research Hub interactivity
// Competency explorer, data viz animation, challenges accordion, quote bank

document.addEventListener('DOMContentLoaded', () => {
  initCompetencyExplorer();
  initVizAnimation();
  initChallengesAccordion();
  initQuoteBank();
});

/* ============================================================
   1. Competency Explorer
   ============================================================ */
const compData = {
  go: {
    name: 'Guiding Others',
    tag: 'Foundational competency',
    tagClass: '',
    definition: 'A genuine intent to teach others and help them be successful in current and future roles. Leader-Developers feel ownership over another person’s professional development — even when it isn’t part of their formal job.',
    practice: [
      'Expresses positive expectations of others’ potential',
      'Gives focused task or job instructions',
      'Provides individualized support to help others be effective',
      'Gives feedback and advice for growth in the current role',
      'Supports career growth through counseling and resources',
      'Helps leaders grow the capabilities of others'
    ],
    quote: '“You are a dancer. You know what to do on stage. So go out there and use your hands if you need to, but tell them what you want them to hear.”',
    cite: '— A Leader-Developer, coaching a rising leader through her first public presentation'
  },
  uo: {
    name: 'Understanding Others',
    tag: 'Relational competency',
    tagClass: 'tag--mauve',
    definition: 'The ability to accurately read, hear, and understand the partly expressed or unspoken thoughts, feelings, and concerns of others — and why people act as they do.',
    practice: [
      'Recognizes emotion in the moment',
      'Recognizes what people are saying explicitly and implicitly',
      'Understands the underlying reasons for someone’s behavior',
      'Demonstrates in-depth understanding of behavior’s deeper meaning'
    ],
    quote: '“I had to take a step back and be like, it’s her way of processing. It’s her way of understanding how to take change, how to have someone appropriately bring ideas to her.”',
    cite: '— A Leader-Developer, on a rising leader’s communication style'
  },
  br: {
    name: 'Building Relationships',
    tag: 'Relational competency',
    tagClass: 'tag--mauve',
    definition: 'The actions leaders take to build and nurture authentic relationships, and the level of trust they create. Strong in this area, leaders believe in the people they support and actively encourage their growth.',
    practice: [
      'Builds rapport with others',
      'Builds personal relationships with others',
      'Demonstrates empathy and creates space in the relationship',
      'Becomes deeply vested in the developmental relationship'
    ],
    quote: '“Olivia had to travel in the middle of the pandemic. Both of us are women of color and things did not feel safe. I wanted to create safety between us.”',
    cite: '— Marie, describing her developmental relationship with Olivia'
  },
  hi: {
    name: 'Honoring Identities',
    tag: 'Relational competency',
    tagClass: 'tag--mauve',
    definition: 'The extent to which a leader can recognize and appreciate similarities and differences in identity — racial, gender, age, socioeconomic, or otherwise — and adjust their support accordingly.',
    practice: [
      'Recognizes identity differences and similarities',
      'Understands the nuances of identity',
      'Takes intentional action to address identity directly',
      'Changes the trajectory of an identity-related issue'
    ],
    quote: '“I’m very conscientious of that with mentees of different races and ethnicities — trying to help them see role models similar to them, or at least not only white.”',
    cite: '— A Leader-Developer'
  },
  eo: {
    name: 'Enabling Others',
    tag: 'Most predictive of impact',
    tagClass: 'tag--gold',
    definition: 'A genuine intent to help others grow and achieve their goals — not by teaching or giving guidance, but by creating the conditions for them to learn and develop on their own.',
    practice: [
      'Believes others have the potential to be leaders',
      'Empowers others to grow as leaders',
      'Uses coaching strategies so others learn for themselves',
      'Uses their own social capital to advance someone’s development'
    ],
    quote: '“I considered myself as holding space so she could hear herself... My role was basically noticing, naming, acknowledging and listening, and then sometimes just pausing and saying nothing.”',
    cite: '— Margaret, describing her work with Carol'
  }
};

function initCompetencyExplorer() {
  const tiles = document.querySelectorAll('.comp-tile');
  const detail = document.getElementById('comp-detail');
  if (!tiles.length || !detail) return;

  tiles.forEach(tile => {
    tile.addEventListener('click', () => {
      const key = tile.getAttribute('data-comp');
      const data = compData[key];
      if (!data) return;

      tiles.forEach(t => { t.classList.remove('is-active'); t.setAttribute('aria-expanded', 'false'); });
      tile.classList.add('is-active');
      tile.setAttribute('aria-expanded', 'true');

      detail.innerHTML = `
        <div class="comp-detail-head">
          <h3>${data.name}</h3>
          <span class="tag ${data.tagClass}">${data.tag}</span>
        </div>
        <p>${data.definition}</p>
        <h4 style="margin-top:1rem;">In practice, this looks like:</h4>
        <ul class="comp-practice-list">
          ${data.practice.map(p => `<li>${p}</li>`).join('')}
        </ul>
        <blockquote>${data.quote}<cite>${data.cite}</cite></blockquote>
        <div class="video-placeholder"><span class="vp-icon" aria-hidden="true">🎥</span> Video placeholder — a short clip of ${data.name} in practice will go here.</div>
      `;
      detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });
}

/* ============================================================
   2. Data viz animation (donuts + bars), triggered on scroll
   ============================================================ */
function initVizAnimation() {
  const donuts = document.querySelectorAll('.donut-arc');
  const bars = document.querySelectorAll('.bar-fill');
  if (!donuts.length && !bars.length) return;

  const circumference = 2 * Math.PI * 65; // r=65

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      if (el.classList.contains('donut-arc')) {
        const pct = parseFloat(el.getAttribute('data-pct'));
        const offset = circumference * (pct / 100);
        el.style.strokeDasharray = `${offset} ${circumference}`;
      } else if (el.classList.contains('bar-fill')) {
        const width = el.getAttribute('data-width');
        el.style.width = width + '%';
      }
      observer.unobserve(el);
    });
  }, { threshold: 0.4 });

  donuts.forEach(d => observer.observe(d));
  bars.forEach(b => observer.observe(b));
}

/* ============================================================
   3. Challenges accordion
   ============================================================ */
const challengesData = [
  {
    icon: '⚖️',
    title: 'Figuring out the role of Leader-Developer',
    stat: '70% described uncertainty',
    related: ['GO', 'EO'],
    body: 'Many Leader-Developers wrestled with how directive to be, how much structure to offer, and when to listen versus guide — without a clear playbook, figuring out the role in real time.',
    quote: '“I struggled with, as a coach, that I’m not supposed to be giving her answers... It was challenging because of my own uncertainty about how to be helpful.”'
  },
  {
    icon: '💔',
    title: 'Emotional and interpersonal strain',
    stat: 'More than half described this',
    related: ['BR', 'UO'],
    body: 'Supporting someone over time — especially when progress is slow or expectations don’t align — takes a toll. Leader-Developers described managing disappointment, tension, and the need to repair relationships.',
    quote: '“It was hard trying to juggle being a director, a coach, a trainer... All of those different roles with each site and each educator.”'
  },
  {
    icon: '🗣️',
    title: 'Bias, perceptions, and honest communication',
    stat: 'About half described this',
    related: ['HI', 'UO'],
    body: 'Differences in gender, age, and social expectations shaped how feedback was interpreted, how authority was perceived, and how open leaders could be.',
    quote: '“I think it had something to do with him being a man and me being a woman... He may have seen me as a mother figure trying to boss him around.”'
  },
  {
    icon: '📋',
    title: 'Managing performance issues',
    stat: 'Nearly 70% faced this tension',
    related: ['GO', 'EO'],
    body: 'Leaders often had to shift between coach, supporter, and evaluator — holding someone accountable while still trying to help them grow.',
    quote: '“I was supporting a leader in her development but it became clear that her work wasn’t getting done. I had to involve HR as it was serious.”'
  }
];

function initChallengesAccordion() {
  const list = document.getElementById('accordion-list');
  if (!list) return;

  list.innerHTML = challengesData.map((c, i) => `
    <div class="accordion-item" data-index="${i}">
      <button class="accordion-trigger" aria-expanded="false">
        <span class="acc-icon" aria-hidden="true">${c.icon}</span>
        <span>${c.title}</span>
        <span class="acc-plus" aria-hidden="true">+</span>
      </button>
      <div class="accordion-panel">
        <div class="accordion-panel-inner">
          <span class="accordion-stat">${c.stat}</span>
          <p>${c.body}</p>
          <blockquote>${c.quote}</blockquote>
          <p style="margin-top:0.6rem;">${c.related.map(r => `<span class="tag">Relates to: ${r}</span>`).join('')}</p>
        </div>
      </div>
    </div>
  `).join('');

  list.querySelectorAll('.accordion-item').forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    const panel = item.querySelector('.accordion-panel');

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      list.querySelectorAll('.accordion-item').forEach(other => {
        other.classList.remove('is-open');
        other.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
        other.querySelector('.accordion-panel').style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });
}

/* ============================================================
   4. Quote Bank — a curated high-level sample, both studies
   ============================================================ */
const quoteBank = [
  { tag: 'Motivation', text: '“Developing better leaders isn’t a side project or a luxury; it’s the work that makes all the other work possible.”', cite: '— Pomerantz, 2025' },
  { tag: 'Guiding Others', text: '“You are a dancer. You know what to do on stage. So go out there and use your hands if you need to, but tell them what you want them to hear.”', cite: '— Joan, coaching Sarah before her first public presentation' },
  { tag: 'Enabling Others', text: '“I considered myself as holding space so she could hear herself... I strongly believe in the sound of silence, which allows people to share what’s coming up for them.”', cite: '— Margaret, describing her work with Carol' },
  { tag: 'Identity', text: '“As a Black woman leading an organization, I am always going to look for opportunities for other young Black women to be in similar roles as me... to have an opportunity to be at tables that we usually are not at.”', cite: '— A Leader-Developer, 2024 study' }
];

function initQuoteBank() {
  const grid = document.getElementById('quote-grid');
  if (!grid) return;

  grid.innerHTML = quoteBank.map(q => `
    <div class="quote-card">
      <span class="quote-tag">${q.tag}</span>
      <blockquote>${q.text}</blockquote>
      <cite style="font-size:0.85rem; color: var(--slate-purple-text);">${q.cite}</cite>
    </div>
  `).join('');
}
