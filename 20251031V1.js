/* ==========================================================
   JUNGLE EXPEDITION — Scoped JS (FR)
   Safe for WYSIWYG CMS (emoji-free, namespaced)
   ========================================================== */

(function () {
  // Prevent double init if the script is injected twice
  if (document.body.hasAttribute('data-je-init')) return;
  document.body.setAttribute('data-je-init', 'true');

  // -------------------------------
  // SMOOTH SCROLL FOR INTERNAL LINKS
  // -------------------------------
  document.addEventListener('click', function (e) {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;

    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // -------------------------------
  // AUTO TAB ACTIVATION BY DATE
  // -------------------------------
  function inRange(date, start, end) {
    // Handles ranges crossing years
    if (end < start) {
      return date >= start || date <= end;
    }
    return date >= start && date <= end;
  }

  const now = new Date();
  const year = now.getFullYear();

  // Date ranges (cross-year aware)
  const r1s = new Date(year, 10, 22); // 22/11
  const r1e = new Date(year, 11, 19); // 19/12

  const r2s = new Date(year, 11, 20); // 20/12
  const r2e = new Date(year + 1, 0, 4); // 04/01

  const r3s = new Date(year + 1, 0, 5); // 05/01
  const r3e = new Date(year + 1, 1, 13); // 13/02

  const r4s = new Date(year + 1, 1, 14); // 14/02
  const r4e = new Date(year + 1, 2, 1); // 01/03

  const tabs = Array.from(document.querySelectorAll('.je-tab'));
  const blocks = Array.from(document.querySelectorAll('.je-timeblock'));

  function activate(id) {
    tabs.forEach((t) => t.classList.remove('je-active'));
    blocks.forEach((b) => b.classList.remove('je-active'));
    const tab = document.querySelector('.je-tab[data-target="' + id + '"]');
    const block = document.getElementById(id);
    if (tab) tab.classList.add('je-active');
    if (block) block.classList.add('je-active');
  }

  if (inRange(now, r1s, r1e)) activate('je-block1');
  else if (inRange(now, r2s, r2e)) activate('je-block2');
  else if (inRange(now, r3s, r3e)) activate('je-block3');
  else if (inRange(now, r4s, r4e)) activate('je-block4');

  // -------------------------------
  // MANUAL TAB SWITCHING
  // -------------------------------
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      activate(tab.getAttribute('data-target'));
    });
  });
})();
