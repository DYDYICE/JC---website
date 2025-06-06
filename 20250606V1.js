
function openModal(id, name, details) {
  document.getElementById('modal-title').textContent = name;
  document.getElementById('modal-text').textContent = details;
  document.getElementById('modal-img').src = `https://www.jungle-city.be/site/files/images/attracties/attractie${id}.jpg`;
  document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

window.addEventListener('scroll', function() {
  var menu = document.getElementById('stickyMenu');
  var offset = 200;
  if (window.scrollY > offset) {
    menu.classList.add('sticky');
  } else {
    menu.classList.remove('sticky');
  }
});
