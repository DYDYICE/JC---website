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
      acc.innerHTML = `<span class="emoji">👨‍👧</span><span>${text.match(/accompagné[: ]*([^\s,/]+)/)?.[1] ?? ''}</span>`;
      acc.setAttribute("title", "Accompagné = enfant sous surveillance");
      wrapper.appendChild(acc);
      added = true;
    }

    if (text.includes('seul')) {
      const solo = document.createElement('div');
      solo.className = 'access-icon';
      solo.innerHTML = `<span class="emoji">🧍</span><span>${text.match(/seul[: ]*([^\s,/]+)/)?.[1] ?? ''}</span>`;
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

    // NEW badge
    if (text.includes('new')) {
      const badge = document.createElement('div');
      badge.className = 'badge-new';
      badge.textContent = 'NEW';
      card.appendChild(badge);
    }

    // Trigger modal on click
    card.addEventListener('click', () => openModal(id, name, details));
  });
}

// ✅ DOM Ready
window.addEventListener('DOMContentLoaded', () => {
  insertHeightIcons();

  window.addEventListener("scroll", () => {
    const btn = document.getElementById("scrollToTopBtn");
    if (btn) btn.style.display = window.scrollY > 200 ? "block" : "none";

    const menu = document.getElementById('stickyMenu');
    if (menu) menu.classList.toggle('sticky', window.scrollY > 200);
  });
});

// Close modal on ESC
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// Close modal on click outside
document.addEventListener('click', e => {
  const modal = document.getElementById('modal');
  if (e.target === modal) closeModal();
});
