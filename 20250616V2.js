function openModal(id, name, details) {
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalText = document.getElementById('modal-text');

  closeModal(); // ensures clean state

  modalTitle.textContent = name;
  modalText.textContent = details;
  modalImg.src = `https://www.jungle-city.be/site/files/images/attracties/attractie${id}.jpg`;
  modalImg.onerror = () => {
    modalImg.src = 'https://www.jungle-city.be/site/layout/img/junglecity-logo.png';
  };

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
    const details = (card.dataset.details || '').toLowerCase();

    const textDiv = card.querySelector('.attraction-content > div');
    if (!textDiv) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'accessibility-wrapper';

    let added = false;

    const accMatch = details.match(/accompagné[: ]*([0-9+–\-to ]+cm)/i);
    if (accMatch) {
      const acc = document.createElement('div');
      acc.className = 'access-icon';
      acc.innerHTML = `<span class="emoji">👨‍👧</span><span style="color:#f57c00; font-weight:bold;">${accMatch[1]}</span>`;
      acc.title = "Accompagné = enfant sous surveillance";
      wrapper.appendChild(acc);
      added = true;
    }

    const soloMatch = details.match(/seul[: ]*([0-9+–\-to ]+cm)/i);
    if (soloMatch) {
      const solo = document.createElement('div');
      solo.className = 'access-icon';
      solo.innerHTML = `<span class="emoji">🧍</span><span style="color:#388e3c; font-weight:bold;">${soloMatch[1]}</span>`;
      solo.title = "Seul = accès autonome";
      wrapper.appendChild(solo);
      added = true;
    }

    const maxMatch = details.match(/max[^0-9]*([0-9]{2,3}cm[^/]*\/[^0-9]*[0-9]{2,3}kg)/);
    if (maxMatch) {
      const maxDiv = document.createElement('div');
      maxDiv.className = 'max-limits';
      maxDiv.textContent = `Max: ${maxMatch[1]}`;
      wrapper.appendChild(maxDiv);
      added = true;
    }

    if (added && !textDiv.classList.contains('hidden-access')) {
      textDiv.style.opacity = '0';
      textDiv.style.height = '0';
      textDiv.style.overflow = 'hidden';
      textDiv.style.margin = '0';
      textDiv.style.padding = '0';
      textDiv.classList.add('hidden-access');
      textDiv.parentNode.appendChild(wrapper);
    }

    if (details.includes('new') && !card.querySelector('.badge-new')) {
      const badge = document.createElement('div');
      badge.className = 'badge-new';
      badge.textContent = 'NEW';
      card.appendChild(badge);
    }

    card.addEventListener('click', () => openModal(id, name, details));
  });
}

function setupHeightFilter() {
  const selector = document.getElementById('childHeight');
  if (!selector) return;

  selector.addEventListener('change', () => {
    const height = parseInt(selector.value);

    document.querySelectorAll('.attraction-card').forEach(card => {
      const details = (card.dataset.details || '').toLowerCase();

      // Always visible if not height-restricted
      if (!details.includes('cm')) {
        card.style.display = '';
        return;
      }

      const accMatch = details.match(/accompagné[: ]*\+?([0-9]{2,3})/i);
      const soloMatch = details.match(/seul[: ]*\+?([0-9]{2,3})/i);

      const accOk = accMatch ? height >= parseInt(accMatch[1]) : false;
      const soloOk = soloMatch ? height >= parseInt(soloMatch[1]) : false;

      card.style.display = (accOk || soloOk) ? '' : 'none';
    });
  });
}

window.addEventListener('DOMContentLoaded', () => {
  insertHeightIcons();
  setupHeightFilter();

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
