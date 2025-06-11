let modalInitialized = false;

function openModal(id, name, details) {
  const modal = document.getElementById('modal');
  document.getElementById('modal-title').textContent = name;
  document.getElementById('modal-text').textContent = details
    .replace('👨‍👧', 'Accompagné')
    .replace('🧍', 'Seul');
  document.getElementById('modal-img').src = `https://www.jungle-city.be/site/files/images/attracties/attractie${id}.jpg`;

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
    const textDiv = card.querySelector('.attraction-content > div');
    if (!textDiv) return;

    const text = textDiv.textContent.toLowerCase();
    const wrapper = document.createElement('div');
    wrapper.className = 'accessibility-wrapper';

    // Hide original text
    textDiv.style.display = 'none';

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
    }

    if (added) {
      textDiv.parentNode.appendChild(wrapper);
    }

    // Add NEW badge
    if (text.includes('new')) {
      const badge = document.createElement('div');
      badge.className = 'badge-new';
      badge.textContent = 'NEW';
      card.appendChild(badge);
    }

    // Modal click handler
    card.querySelector('.attraction-img').addEventListener('click', () => {
      openModal(card.dataset.id, card.querySelector('strong').textContent, textDiv.textContent);
    });

    card.querySelector('.attraction-content').addEventListener('click', () => {
      openModal(card.dataset.id, card.querySelector('strong').textContent, textDiv.textContent);
    });
  });
}

// Init on load
window.addEventListener('DOMContentLoaded', () => {
  insertHeightIcons();
});

// Sticky menu
window.addEventListener('scroll', () => {
  var menu = document.getElementById('stickyMenu');
  if (window.scrollY > 200) {
    menu.classList.add('sticky');
  } else {
    menu.classList.remove('sticky');
  }
});

// ESC close
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModal();
});

// Click outside close
document.addEventListener('click', function(e) {
  const modal = document.getElementById('modal');
  if (e.target === modal) closeModal();
});
