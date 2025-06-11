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
    if (!textDiv || textDiv.dataset.processed) return;

    const text = textDiv.textContent.toLowerCase();
    const wrapper = document.createElement('div');
    wrapper.className = 'accessibility-wrapper';

    textDiv.style.display = 'none';
    textDiv.dataset.processed = "true";

    let acc = text.match(/accompagn[eé]:?\s*([^\s,/]+)/i);
    let seul = text.match(/seul:?\s*([^\s,/]+)/i);
    let max = text.match(/max[^0-9]*([0-9]{2,3}cm[^/]*\/[^0-9]*[0-9]{2,3}kg)/i);

    if (acc || seul) {
      const accessIcons = document.createElement('div');
      accessIcons.className = 'access-icons';
      
      if (acc) {
        const accDiv = document.createElement('div');
        accDiv.className = 'access-icon';
        accDiv.innerHTML = `<span class="emoji">👨‍👧</span><span>${acc[1]}</span>`;
        accDiv.title = "Accompagné = enfant sous surveillance";
        accessIcons.appendChild(accDiv);
      }

      if (seul) {
        const soloDiv = document.createElement('div');
        soloDiv.className = 'access-icon';
        soloDiv.innerHTML = `<span class="emoji">🧍</span><span>${seul[1]}</span>`;
        soloDiv.title = "Seul = accès autonome";
        accessIcons.appendChild(soloDiv);
      }

      wrapper.appendChild(accessIcons);
    }

    if (max) {
      const maxDiv = document.createElement('div');
      maxDiv.className = 'max-limits';
      maxDiv.textContent = `Max: ${max[1]}`;
      wrapper.appendChild(maxDiv);
    }

    textDiv.parentNode.appendChild(wrapper);
  });
}

window.addEventListener('DOMContentLoaded', insertHeightIcons);

window.addEventListener('scroll', function () {
  var menu = document.getElementById('stickyMenu');
  menu.classList.toggle('sticky', window.scrollY > 200);
});
