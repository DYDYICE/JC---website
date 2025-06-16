function openModal(id, name, details) {
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalText = document.getElementById('modal-text');

  modalTitle.textContent = name;
  modalText.textContent = details;
  modalImg.src = `https://www.jungle-city.be/site/files/images/attracties/attractie${id}.jpg`;

  modal.style.display = 'flex';
  modal.style.opacity = '1';
  modal.style.pointerEvents = 'auto';
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
  modal.style.opacity = '0';
  modal.style.pointerEvents = 'none';
}

function insertHeightIcons() {
  const cards = document.querySelectorAll('.attraction-card');

  cards.forEach(card => {
    const id = card.dataset.id;
    const name = card.dataset.name;
    const details = card.dataset.details;

    const textDiv = card.querySelector('.attraction-content > div');
    if (!textDiv) return;

    const text = details.toLowerCase();
    const wrapper = document.createElement('div');
    wrapper.className = 'accessibility-wrapper';

    let added = false;

    if (text.includes('accompagné')) {
      const acc = document.createElement('div');
      acc.className = 'access-icon';
      acc.innerHTML = `<span class="emoji">👨‍👧</span><span><strong style="color: #f57c00;">${accMatch}</strong></span>`;
      acc.setAttribute("title", "Accompagné = enfant sous surveillance");
      wrapper.appendChild(acc);
      added = true;
    }

    if (text.includes('seul')) {
      const solo = document.createElement('div');
      solo.className = 'access-icon';
      solo.innerHTML = `<span class="emoji">🧍</span><span><strong style="color: #388e3c;">${soloMatch}</strong></span>`;
      solo.setAttribute("title", "Seul = accès autonome");
      wrapper.appendChild(solo);
      added = true;
    }

    const maxMatch = text.match(/max[^0-9]*([0-9]{2,3}cm[^/]*\/[^0-9]*[0-9]{2,3}kg)/);
    if (maxMatch) {
      const maxDiv = document.createElement('div');
      maxDiv.className = 'max-limits';
      maxDiv.textContent = `Max: ${maxMatch[1]}`;
      wrapper.appendChild(maxDiv);
      added = true;
    }

    if (added) {
      textDiv.style.opacity = '0';
      textDiv.style.height = '0';
      textDiv.style.overflow = 'hidden';
      textDiv.style.margin = '0';
      textDiv.style.padding = '0';
      textDiv.parentNode.appendChild(wrapper);
    }

if (text.includes('new') && !card.querySelector('.badge-new')) {
  const badge = document.createElement('div');
  badge.className = 'badge-new';
  badge.textContent = 'NEW';
  card.appendChild(badge);
}

    card.addEventListener('click', () => openModal(id, name, details));
  });
}

function setupFilters() {
  const heightSelect = document.getElementById('height-filter');
  const accessSelect = document.getElementById('access-filter');

  function applyFilters() {
    const heightVal = heightSelect.value;
    const accessVal = accessSelect.value;

    document.querySelectorAll('.attraction-card').forEach(card => {
      const details = (card.dataset.details || '').toLowerCase();
      let show = true;

      // Hauteur
      if (heightVal === 'under90') {
        show = /[^0-9]([0-8][0-9])cm/.test(details);
      } else if (heightVal === '90to105') {
        show = /9[0-9]cm|10[0-5]cm/.test(details);
      } else if (heightVal === 'over105') {
        show = /\+?10[6-9]cm|\+?1[1-9][0-9]cm|\+?2[0-9]{2}cm/.test(details);
      }

      // Accès
      if (show && accessVal === 'accompagne') {
        show = details.includes('accompagné');
      } else if (show && accessVal === 'seul') {
        show = details.includes('seul');
      }

      card.style.display = show ? '' : 'none';
    });
  }

  heightSelect.addEventListener('change', applyFilters);
  accessSelect.addEventListener('change', applyFilters);
}

window.addEventListener('DOMContentLoaded', () => {
  insertHeightIcons();
  setupFilters();
setupHeightFilter();


function setupHeightFilter() {
  const heightSelect = document.getElementById('heightRange');

  heightSelect.addEventListener('change', () => {
    const height = parseInt(heightSelect.value);
    document.querySelectorAll('.attraction-card').forEach(card => {
      const details = (card.dataset.details || '').toLowerCase();

      // Always show non-height-based attractions (keywords like "boutique", "restaurant", "goolfy", etc.)
      if (!details.includes('cm')) {
        card.style.display = '';
        return;
      }

      // Extract heights
      const accMatch = details.match(/accompagné[: ]*([0-9+\-cm ]+)/);
      const soloMatch = details.match(/seul[: ]*([0-9+\-cm ]+)/);

      let accOk = false;
      let soloOk = false;

      if (accMatch) {
        const val = accMatch[1].replace(/[^\d]/g, '');
        if (val && height >= parseInt(val)) accOk = true;
      }

      if (soloMatch) {
        const val = soloMatch[1].replace(/[^\d]/g, '');
        if (val && height >= parseInt(val)) soloOk = true;
      }

      card.style.display = (accOk || soloOk) ? '' : 'none';
    });
  });
}


  window.addEventListener("scroll", () => {
    const btn = document.getElementById("scrollToTopBtn");
    if (btn) btn.style.display = window.scrollY > 200 ? "block" : "none";

    const menu = document.getElementById('stickyMenu');
    if (menu) menu.classList.toggle('sticky', window.scrollY > 200);
  });
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

document.addEventListener('click', e => {
  const modal = document.getElementById('modal');
  if (e.target === modal) closeModal();
});
