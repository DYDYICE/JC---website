var taal = "fr";

var attracties = [
  ["1", "Bunga Banga", "attractie", "3", { "accompanied": "90-120cm", "solo": "+120cm", "zone": "extérieur" }],
  ["2", "Tam Tam twist", "attractie", "3", { "accompanied": "0-105cm", "solo": "+105cm", "zone": "extérieur" }],
  ["3", "Savana fall", "attractie", "3", { "accompanied": "90-105cm", "solo": "+105cm", "note": "Max 195cm / 85kg", "zone": "extérieur" }],
  ["4", "Flying Treehouse", "attractie", "3", { "solo": "+90cm", "zone": "extérieur" }],
  ["5", "Bâteau pirate", "attractie", "3", { "accompanied": "90-120cm", "solo": "+120cm", "zone": "extérieur" }],
  ["6", "Jungle Carrousel", "attractie", "2", { "accompanied": "80-100cm", "solo": "+100cm", "zone": "extérieur" }],
  ["7", "Jungle Express", "attractie", "2", { "accompanied": "0-105cm", "solo": "+105cm", "zone": "extérieur" }],
  ["8", "Tiki River", "attractie", "2", { "accompanied": "0-110cm", "solo": "+110cm", "zone": "extérieur" }],
  ["9", "Tribal Village", "attractie", "3", { "accompanied": "0-105cm", "solo": "+105cm", "zone": "extérieur" }],
  ["12", "Trampoline", "attractie", "2", { "note": "Tout public - Max 100kg", "zone": "extérieur" }],
  ["13", "Dinosaur Discovery", "attractie", "1", { "note": "Tous publics", "zone": "extérieur" }],
  ["14", "Tropical Stage", "show", "2", { "note": "Tous publics", "zone": "extérieur" }],
  ["15", "Mini Trampolines", "attractie", "1", { "note": "3-13 ans", "zone": "extérieur" }],
  ["16", "Mini Camp", "attractie", "1", { "note": "0-3 ans", "zone": "extérieur" }],
  ["20", "Alligator Battle", "attractie", "3", { "accompanied": "90-120cm", "solo": "+120cm", "zone": "extérieur" }],
  ["37", "Crazy Buggies", "attractie", "3", { "accompanied": "0-105cm", "solo": "+105cm", "zone": "extérieur" }],
  ["32", "Jungle Goolfy", "attractie", "3", { "note": "Tous publics", "zone": "intérieur" }],
  ["22", "Big Fun Zone", "attractie", "1", { "note": "3-13 ans", "zone": "intérieur" }],
  ["23", "Zone Arcade", "attractie", "1", { "note": "Tous publics", "zone": "intérieur" }],
  ["25", "Tyroliennes", "attractie", "1", { "accompanied": "0-105cm", "solo": "+105cm", "zone": "intérieur" }],
  ["26", "Zone Lego", "attractie", "1", { "note": "3-13 ans", "zone": "intérieur" }],
  ["27", "Tour élastique", "attractie", "1", { "note": "3-13 ans", "zone": "intérieur" }],
  ["21", "Baby Zone", "attractie", "1", { "note": "0-3 ans", "zone": "intérieur" }],
  ["33", "Jungle Restaurant", "resto", "", { "note": "Ouvert été/hiver", "zone": "horeca" }],
  ["36", "Jungle Bazar", "shop", "", { "note": "Ouvert été/hiver", "zone": "shop" }]
];

let container = document.getElementById("attracties-container");

attracties.forEach(function(a) {
  let html = `
    <a class="a-item" href="https://www.jungle-city.be/${taal}/attractie${a[0]}">
      <div class="attractie-item">
        <div class="zone-label">${a[4].zone || ""}</div>
        <div class="attractie-image" style="background-image: url(https://www.jungle-city.be/site/files/images/attracties/attractie${a[0]}.jpg);"></div>
        <h1 class="attractie-title">${a[1]}</h1>
        <div class="info-wrapper"></div>`;

  let conditions = a[4];
  let heightInfo = "";

  if (typeof conditions === "object") {
    if (conditions.accompanied) {
      heightInfo += `
        <div class="info-height only-default">
          ${conditions.accompanied}
        </div>`;
    }
    if (conditions.solo) {
      heightInfo += `
        <div class="info-height">
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
