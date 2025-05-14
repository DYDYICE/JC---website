var taal = "fr";

var attracties = [
  ["1", "Bunga Banga", "attractie", "3", { "accompanied": "90-120cm", "solo": "+120cm" }],
  ["2", "Tam Tam twist", "attractie", "3", { "accompanied": "0-105cm", "solo": "+105cm" }],
  ["3", "Savana fall", "attractie", "3", { "accompanied": "90-105cm", "solo": "+105cm", "note": "Max 195cm / 85kg" }],
  ["4", "Flying Treehouse", "attractie", "3", { "solo": "+90cm" }],
  ["5", "Bâteau pirate", "attractie", "3", { "accompanied": "90-120cm", "solo": "+120cm" }],
  ["6", "Jungle Carrousel", "attractie", "2", { "accompanied": "80-100cm", "solo": "+100cm" }],
  ["7", "Jungle Express", "attractie", "2", { "accompanied": "0-105cm", "solo": "+105cm" }],
  ["8", "Tiki River", "attractie", "2", { "accompanied": "0-110cm", "solo": "+110cm" }],
  ["9", "Tribal Village", "attractie", "3", { "accompanied": "0-105cm", "solo": "+105cm" }],
  ["12", "Trampoline", "attractie", "2", { "note": "Tout public - Max 100kg" }],
  ["13", "Dinosaur Discovery", "attractie", "1", { "note": "Tous publics" }],
  ["14", "Tropical Stage", "show", "2", { "note": "Tous publics" }],
  ["15", "Mini Trampolines", "attractie", "1", { "note": "3-13 ans" }],
  ["16", "Mini Camp", "attractie", "1", { "note": "0-3 ans" }],
  ["20", "Alligator Battle", "attractie", "3", { "accompanied": "90-120cm", "solo": "+120cm" }],
  ["37", "Crazy Buggies", "attractie", "3", { "accompanied": "0-105cm", "solo": "+105cm" }],
  ["32", "Jungle Goolfy", "attractie", "3", { "note": "Tous publics" }],
  ["22", "Big Fun Zone", "attractie", "1", { "note": "3-13 ans" }],
  ["23", "Zone Arcade", "attractie", "1", { "note": "Tous publics" }],
  ["25", "Tyroliennes", "attractie", "1", { "accompanied": "0-105cm", "solo": "+105cm" }],
  ["26", "Zone Lego", "attractie", "1", { "note": "3-13 ans" }],
  ["27", "Tour élastique", "attractie", "1", { "note": "3-13 ans" }],
  ["21", "Baby Zone", "attractie", "1", { "note": "0-3 ans" }],
  ["33", "Jungle Restaurant", "resto", "", { "note": "Ouvert été/hiver" }],
  ["36", "Jungle Bazar", "shop", "", { "note": "Ouvert été/hiver" }]
];

let container = document.getElementById("attracties-container");

attracties.forEach(function(a) {
  let html = `
    <a class="a-item" href="https://www.jungle-city.be/${taal}/attractie${a[0]}">
      <div class="attractie-item">
        <div class="attractie-image" style="background-image: url(https://www.jungle-city.be/site/files/images/attracties/attractie${a[0]}.jpg);"></div>
        <h1 class="attractie-title">${a[1]}</h1>
        <div class="info-wrapper">
          <div class="info-cat" style="background-image: url(https://www.jungle-city.be/site/files/images/attracties/${a[2]}-icon.png);"></div>
          <div class="info-level" style="background-image: url(https://www.jungle-city.be/site/files/images/attracties/ex${a[3]}.png);"></div>
        </div>`;

  let conditions = a[4];
  let heightInfo = "";

  if (typeof conditions === "object") {
    if (conditions.accompanied) {
      heightInfo += `
        <div class="info-height only-default">
          <img src="https://www.jungle-city.be/site/files/images/Icons/dydy%20-%20till%20x%2C%20with%20adult.jpg" class="icon-height" />
          ${conditions.accompanied}
        </div>`;
    }
    if (conditions.solo) {
      heightInfo += `
        <div class="info-height">
          <img src="https://www.jungle-city.be/site/files/images/Icons/dydy%20-%20children%20OK%20from%20x.jpg" class="icon-height" />
          ${conditions.solo}
        </div>`;
    }
    if (conditions.note) {
      heightInfo += `<div class="note">${conditions.note}</div>`;
    }
  }

  html += `
        <div class="info-height-wrapper">
          ${heightInfo}
        </div>
      </div>
    </a>`;

  container.innerHTML += html;
});

// Slide-in effect + tap-to-expand
document.addEventListener("DOMContentLoaded", function () {
  const titles = document.querySelectorAll(".attractie-title");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("slide-in");
      }
    });
  }, { threshold: 0.3 });

  titles.forEach(title => observer.observe(title));

  document.querySelectorAll('.attractie-item').forEach(item => {
    item.addEventListener('click', () => {
      if (window.innerWidth <= 600) {
        item.classList.toggle("expanded");
      }
    });
  });
});
