// EYLDI: Research Hub interactivity
// Competency explorer, data viz animation, challenges accordion, quote bank

document.addEventListener('DOMContentLoaded', () => {
  initCompetencyExplorer();
  initVizAnimation();
  initChallengesAccordion();
});

/* ============================================================
   Drawn line icons (replace emoji)
   ============================================================ */
const ICONS = {
  scales: `<svg class="icon icon--scales" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 4v16M7 20h10M5 7h14"/><path d="M5 7l-2.5 6M5 7l2.5 6M2.5 13a2.5 2.5 0 0 0 5 0z"/><path d="M19 7l-2.5 6M19 7l2.5 6M16.5 13a2.5 2.5 0 0 0 5 0z"/></svg>`,
  brokenheart: `<svg class="icon icon--brokenheart" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 20C5 15 3 11.5 3 8.5a4.5 4.5 0 0 1 9-1.5 4.5 4.5 0 0 1 9 1.5c0 3-2 6.5-9 11.5z"/><path d="M12 7l-2 4 3.5 2.5L11.5 17"/></svg>`,
  speech: `<svg class="icon icon--speech" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 4.5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-8l-4.5 3.5V16.5H5a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2z"/><circle cx="8" cy="10.5" r=".5"/><circle cx="12" cy="10.5" r=".5"/><circle cx="16" cy="10.5" r=".5"/></svg>`,
  clipboard: `<svg class="icon icon--clipboard" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="5" y="4" width="14" height="17" rx="2"/><rect x="9" y="2" width="6" height="4" rx="1"/><path d="M9 11h6M9 15h4"/></svg>`,
  video: `<svg class="icon icon--video" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="3" y="6" width="12" height="12" rx="2"/><path d="M15 10.5L21 7v10l-6-3.5z"/></svg>`
};

/* ============================================================
   1. Competency Explorer
   ============================================================ */
const compData = {
  go: {
    name: 'Guiding Others',
    tag: 'Foundational competency',
    tagClass: '',
    definition: 'A genuine intent to teach others and help them be successful in current and future roles. Leader-Developers feel ownership over another person’s professional development, even when it isn’t part of their formal job.',
    practice: [
      'Expresses belief or positive expectations that others want to develop',
      'Gives focused, short-term instructions for how to get a task done',
      'Provides individualized support to help others be effective',
      'Supports development',
      'Supports career growth by providing counseling, resources, and advice',
      'Develops systemic capability'
    ],
    quote: '“You are a dancer. You know what to do on stage. So go out there and use your hands if you need to, but tell them what you want them to hear.”',
    cite: 'A Leader-Developer, coaching a rising leader through her first public presentation'
  },
  uo: {
    name: 'Understanding Others',
    tag: 'Relational competency',
    tagClass: 'tag--mauve',
    definition: 'The ability to accurately read, hear, and understand the partly expressed or unspoken thoughts, feelings, and concerns of others, and why people act as they do.',
    practice: [
      'Recognizes emotion in others',
      'Recognizes emotion AND understands verbal content',
      'Understands behavior',
      'Understands underlying meaning for behavior'
    ],
    quote: '“I had to take a step back and be like, it’s her way of processing. It’s her way of understanding how to take change, how to have someone appropriately bring ideas to her.”',
    cite: 'A Leader-Developer, on a rising leader’s communication style'
  },
  br: {
    name: 'Building Relationships',
    tag: 'Relational competency',
    tagClass: 'tag--mauve',
    definition: 'The actions leaders take to build and nurture authentic relationships, and the level of trust they create. Strong in this area, leaders believe in the people they support and actively encourage their growth.',
    practice: [
      'Builds or maintains rapport with others',
      'Builds personal connections as a basis for relationships',
      'Demonstrates empathy and creates space in developmental relationships',
      'Is deeply vested in developmental relationships'
    ],
    quote: '“Olivia had to travel in the middle of the pandemic. Both of us are women of color and things did not feel safe. I wanted to create safety between us.”',
    cite: 'Marie, describing her developmental relationship with Olivia'
  },
  hi: {
    name: 'Honoring Identities',
    tag: 'Relational competency',
    tagClass: 'tag--mauve',
    definition: 'The extent to which a leader can recognize and appreciate similarities and differences in identity (racial, gender, age, socioeconomic, or otherwise) and adjust their support accordingly.',
    practice: [
      'Recognizes and names identity similarity/difference',
      'Demonstrates deeper understanding of the nuance of identity',
      'Takes intentional action to specifically address identity',
      'Changes the trajectory of an identity-related issue'
    ],
    quote: '“I’m very conscientious of that with mentees of different races and ethnicities, trying to help them see role models similar to them, or at least not only white.”',
    cite: 'A Leader-Developer'
  },
  eo: {
    name: 'Enabling Others',
    tag: 'Most predictive of impact',
    tagClass: 'tag--gold',
    definition: 'A genuine intent to help others grow and achieve their goals, not by teaching or giving guidance, but by creating the conditions for them to learn and develop on their own.',
    practice: [
      'Sees/believes that others have the potential to be leaders',
      'Understands the value of empowering others to grow as leaders',
      'Uses coaching strategies that stimulate others to learn for themselves',
      'Takes risks and leverages one’s social capital to further someone’s development (sponsorship)',
      'Puts others’ development ahead of own interests'
    ],
    quote: '“I considered myself as holding space so she could hear herself... My role was basically noticing, naming, acknowledging and listening, and then sometimes just pausing and saying nothing.”',
    cite: 'Margaret, describing her work with Carol'
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
        <h4 style="margin-top:1rem;">The levels of this competency:</h4>
        <ul class="comp-practice-list">
          ${data.practice.map(p => `<li>${p}</li>`).join('')}
        </ul>
        <p><a href="competency-dictionary.html#${key}">See every level, with behaviors and quotes, in the Competency Dictionary →</a></p>
        <blockquote>${data.quote}<cite>${data.cite}</cite></blockquote>
        <div class="video-placeholder"><span class="vp-icon" aria-hidden="true">${ICONS.video}</span> Video placeholder: a short clip of ${data.name} in practice will go here.</div>
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
    icon: ICONS.scales,
    title: 'Figuring out the role of Leader-Developer',
    stat: '70% described uncertainty',
    related: ['GO', 'EO'],
    body: 'Many Leader-Developers wrestled with how directive to be, how much structure to offer, and when to listen versus guide, without a clear playbook, figuring out the role in real time.',
    quote: '“I struggled with, as a coach, that I’m not supposed to be giving her answers... It was challenging because of my own uncertainty about how to be helpful.”'
  },
  {
    icon: ICONS.brokenheart,
    title: 'Emotional and interpersonal strain',
    stat: 'More than half described this',
    related: ['BR', 'UO'],
    body: 'Supporting someone over time, especially when progress is slow or expectations don’t align, takes a toll. Leader-Developers described managing disappointment, tension, and the need to repair relationships.',
    quote: '“It was hard trying to juggle being a director, a coach, a trainer... All of those different roles with each site and each educator.”'
  },
  {
    icon: ICONS.speech,
    title: 'Bias, perceptions, and honest communication',
    stat: 'About half described this',
    related: ['HI', 'UO'],
    body: 'Differences in gender, age, and social expectations shaped how feedback was interpreted, how authority was perceived, and how open leaders could be.',
    quote: '“I think it had something to do with him being a man and me being a woman... He may have seen me as a mother figure trying to boss him around.”'
  },
  {
    icon: ICONS.clipboard,
    title: 'Managing performance issues',
    stat: 'Nearly 70% faced this tension',
    related: ['GO', 'EO'],
    body: 'Leaders often had to shift between coach, supporter, and evaluator: holding someone accountable while still trying to help them grow.',
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
