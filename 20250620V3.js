<script>
function openModal(id, name, details) {
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalText = document.getElementById('modal-text');

  closeModal(); // reset

  modalTitle.textContent = name;
  modalText.textContent = details;

  const extension = id === "013" ? "jpeg" : "jpg";
  modalImg.src = `https://www.jungle-city.be/site/files/images/attracties/attractie${id}.${extension}`;
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
  const LANG = window.location.pathname.includes('/nl/') ? 'nl' : 'fr';

  const TRANSLATIONS = {
    fr: {
      acc: "Accompagné = enfant sous surveillance",
      solo: "Seul = accès autonome"
    },
    nl: {
      acc: "Begeleid = onder toezicht van een volwassene",
      solo: "Alleen = zelfstandig toegang"
    }
  };

  cards.forEach(card => {
    const id = card.dataset.id;
    const name = card.dataset.name;
    const details = (card.dataset.details || '').toLowerCase();

    if (card.dataset.visible === 'false') {
      card.style.display = 'none';
      return;
    }

    const textDiv = card.querySelector('.attraction-content > div');
    if (!textDiv) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'accessibility-wrapper';

    let added = false;

    const accMatch = details.match(/accompagné[: ]*([0-9+–\\-to ]+cm)/i);
    if (accMatch) {
      const acc = document.createElement('div');
      acc.className = 'access-icon';
      acc.innerHTML = `<span class="emoji">👨‍👧</span><span style="color:#f57c00; font-weight:bold;">${accMatch[1]}</span>`;
      acc.title = TRANSLATIONS[LANG].acc;
      wrapper.appendChild(acc);
      added = true;
    }

    const soloMatch = details.match(/seul[: ]*([0-9+–\\-to ]+cm)/i);
    if (soloMatch) {
      const solo = document.createElement('div');
      solo.className = 'access-icon';
      solo.innerHTML = `<span class="emoji">🧍</span><span style="color:#388e3c; font-weight:bold;">${soloMatch[1]}</span>`;
      solo.title = TRANSLATIONS[LANG].solo;
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

function setupAnimalCTA() {
  const animalWrapper = document.getElementById("animalButtonWrapper");
  if (!animalWrapper) return;

  const isNL = window.location.pathname.includes("/nl/");
  const link = isNL ? "/nl/dieren" : "/fr/decouvrez-le-parc/animaux";
  const text = isNL
    ? "🐾 Klik hier om onze dieren te ontdekken 🐒"
    : "🐾 Cliquez ici pour découvrir nos animaux 🐒";

  const btn = document.createElement("a");
  btn.className = "Button--primary animal-btn";
  btn.href = link;
  btn.textContent = text;

  animalWrapper.appendChild(btn);
}

function setupScrollToTop() {
  const btn = document.getElementById("scrollToTopBtn");
  if (!btn) return;

  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", () => {
    btn.style.display = window.scrollY > 200 ? "block" : "none";
  });
}

function localizeStickyMenu() {
  const isNL = window.location.pathname.includes("/nl/");
  const texts = {
    fr: ["ATTRACTIONS", "ANIMAUX", "AIRES DE JEUX", "RESTAURATION", "ANIMATIONS", "BOUTIQUE"],
    nl: ["ATTRACTIES", "DIEREN", "SPEELZONES", "RESTAURATIE", "ANIMATIES", "WINKEL"]
  };
  const ids = ["btn-attractions", "btn-animals", "btn-aires", "btn-restauration", "btn-animations", "btn-boutiques"];

  ids.forEach((id, index) => {
    const el = document.getElementById(id);
    if (el) el.textContent = isNL ? texts.nl[index] : texts.fr[index];
    if (id === "btn-animals") el.href = isNL ? "/nl/dieren" : "/fr/decouvrez-le-parc/animaux";
  });
}

// 🧠 MAIN INIT
window.addEventListener('DOMContentLoaded', () => {
  insertHeightIcons();
  setupAnimalCTA();
  setupScrollToTop();
  localizeStickyMenu();

  // 🏁 Prioritize Go Kart visually
  const grid = document.querySelector('.attraction-grid');
  const goKart = document.querySelector('[data-id="013"]');
  if (grid && goKart) grid.prepend(goKart);
});

// 🔐 Modal Close Shortcuts
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});
document.addEventListener('click', e => {
  const modal = document.getElementById('modal');
  if (e.target === modal) closeModal();
});
</script>
