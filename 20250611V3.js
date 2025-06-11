let modalInitialized = false;

function openModal(id, name, details) {
  document.getElementById('modal-title').textContent = name;
  document.getElementById('modal-text').textContent = details;
  document.getElementById('modal-img').src = `https://www.jungle-city.be/site/files/images/attracties/attractie${id}.jpg`;
  document.getElementById('modal').style.display = 'flex';
  setTimeout(() => {
    document.getElementById('modal').style.opacity = 1;
    document.getElementById('modal').style.pointerEvents = 'auto';
  }, 10);
}


function closeModal() {
  document.getElementById('modal').style.display = 'none';
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
  });
}

window.addEventListener('DOMContentLoaded', function () {
  insertHeightIcons();
});

window.addEventListener('scroll', function () {
  var menu = document.getElementById('stickyMenu');
  var offset = 200;
  if (window.scrollY > offset) {
    menu.classList.add('sticky');
  } else {
    menu.classList.remove('sticky');
  }
});
