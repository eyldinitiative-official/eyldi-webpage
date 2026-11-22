// EYLDI: accordion helpers for native <details> (Competency Dictionary, Methodology)
// - Expand all / Collapse all buttons:  <button data-acc="open|close" data-acc-target="#selector">
// - Deep links: opening page.html#go (or ?expand=all) opens the matching accordion(s)

document.addEventListener('DOMContentLoaded', () => {
  initAccordionButtons();
  openFromUrl();
  window.addEventListener('hashchange', openFromUrl);
});

function initAccordionButtons() {
  document.querySelectorAll('[data-acc]').forEach(btn => {
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('data-acc') === 'open';
      const scope = document.querySelector(btn.getAttribute('data-acc-target')) || document;
      scope.querySelectorAll('details.acc').forEach(d => { d.open = open; });
    });
  });
}

function openFromUrl() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('expand') === 'all') {
    document.querySelectorAll('details.acc').forEach(d => { d.open = true; });
  }
  const id = decodeURIComponent(window.location.hash.slice(1));
  if (!id) return;
  const el = document.getElementById(id);
  if (!el) return;
  // open the target and every accordion that contains it
  let node = el;
  while (node) {
    if (node.tagName === 'DETAILS') node.open = true;
    node = node.parentElement;
  }
  setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
}
