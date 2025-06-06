function openModal(id, name, details) {
  document.getElementById('modal-title').textContent = name;
  document.getElementById('modal-text').textContent = details;
  document.getElementById('modal-img').src = `https://www.jungle-city.be/site/files/images/attracties/attractie${id}.jpg`;
  document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

window.addEventListener('scroll', function () {
  var menu = document.getElementById('stickyMenu');
  var offset = 200;
  if (window.scrollY > offset) {
    menu.classList.add('sticky');
  } else {
    menu.classList.remove('sticky');
  }
});

function insertHeightIcons() {
  const cards = document.querySelectorAll('.attraction-card');

  cards.forEach(card => {
    const textDiv = card.querySelector('.attraction-content > div');
    if (!textDiv) return;

    const text = textDiv.textContent.toLowerCase();
    const imgWrapper = document.createElement('div');
    imgWrapper.style.marginTop = '5px';

    let hasIcon = false;

    if (text.includes('accompagné') || text.includes('accompanied')) {
      const accImg = document.createElement('img');
      accImg.src = 'https://www.jungle-city.be/site/files/images/attracties/accfr2.jpg';
      accImg.alt = 'accompagné';
      accImg.style.height = '24px';
      accImg.style.marginRight = '5px';
      imgWrapper.appendChild(accImg);
      hasIcon = true;
    }

    if (text.includes('seul') || text.includes('solo')) {
      const soloImg = document.createElement('img');
      soloImg.src = 'https://www.jungle-city.be/site/files/images/attracties/solofr2.jpg';
      soloImg.alt = 'seul';
      soloImg.style.height = '24px';
      imgWrapper.appendChild(soloImg);
      hasIcon = true;
    }

    if (hasIcon) {
      textDiv.parentNode.appendChild(imgWrapper);
    }
  });
}

window.addEventListener('DOMContentLoaded', function () {
  insertHeightIcons();
});
