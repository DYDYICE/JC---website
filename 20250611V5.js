function openModal(id, name, details) {
  document.getElementById('modal-title').textContent = name;
  
  // Retirer les emojis du texte de détails pour la modal
  const cleanDetails = details
    .replace(/👨‍👧/g, '')
    .replace(/🧍/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  document.getElementById('modal-text').textContent = cleanDetails;
  document.getElementById('modal-img').src = `https://www.jungle-city.be/site/files/images/attracties/attractie${id}.jpg`;
  const modal = document.getElementById('modal');
  modal.style.display = 'flex';
  setTimeout(() => {
    modal.style.opacity = 1;
    modal.style.pointerEvents = 'auto';
  }, 10);
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.opacity = 0;
  modal.style.pointerEvents = 'none';
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300);
}

function insertHeightIcons() {
  const cards = document.querySelectorAll('.attraction-card');

  cards.forEach(card => {
    const textDiv = card.querySelector('.attraction-content > div');
    if (!textDiv) return;

    const text = textDiv.textContent.toLowerCase();
    const wrapper = document.createElement('div');
    wrapper.className = 'accessibility-wrapper';
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

    // Badge NEW
    const contentText = textDiv.textContent.toLowerCase();
    if (contentText.includes('new')) {
      const badge = document.createElement('div');
      badge.className = 'badge-new';
      badge.textContent = 'NEW';
      card.appendChild(badge);
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  insertHeightIcons();

  document.getElementById("scrollToTopBtn").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", () => {
    document.getElementById("scrollToTopBtn").style.display =
      window.scrollY > 200 ? "block" : "none";

    const menu = document.getElementById("stickyMenu");
    if (menu) {
      menu.classList.toggle("sticky", window.scrollY > 200);
    }
  });

  // Handle ESC key to close modal
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });

  // Click outside modal to close
  document.getElementById('modal').addEventListener('click', function (e) {
    if (e.target.id === 'modal') closeModal();
  });

  // Set language-specific animal links
  const lang = window.location.pathname.includes('/nl/') ? 'NL' : 'FR';
  document.getElementById('animalsLinkFR').style.display = lang === 'FR' ? 'block' : 'none';
  document.getElementById('animalsLinkNL').style.display = lang === 'NL' ? 'block' : 'none';
});
