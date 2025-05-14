var taal = "fr";

var attracties = [
  ["1", "Bunga Banga", "attractie", "3", { "accompanied": "90-120cm", "solo": "+120cm", "zone": "buiten" }],
  ["2", "Tam Tam twist", "attractie", "3", { "accompanied": "0-105cm", "solo": "+105cm", "zone": "buiten" }],
  ["3", "Savana fall", "attractie", "3", { "accompanied": "90-105cm", "solo": "+105cm", "note": "Max 195cm / 85kg", "zone": "buiten" }],
  ["4", "Flying Treehouse", "attractie", "3", { "solo": "+90cm", "zone": "buiten" }],
  ["5", "Bâteau pirate", "attractie", "3", { "accompanied": "90-120cm", "solo": "+120cm", "zone": "buiten" }],
  ["6", "Jungle Carrousel", "attractie", "2", { "accompanied": "80-100cm", "solo": "+100cm", "zone": "buiten" }],
  ["7", "Jungle Express", "attractie", "2", { "accompanied": "0-105cm", "solo": "+105cm", "zone": "buiten" }],
  ["8", "Tiki River", "attractie", "2", { "accompanied": "0-110cm", "solo": "+110cm", "zone": "buiten" }],
  ["9", "Tribal Village", "attractie", "3", { "accompanied": "0-105cm", "solo": "+105cm", "zone": "buiten" }],
  ["12", "Trampoline", "attractie", "2", { "note": "Tout public - Max 100kg", "zone": "buiten" }],
  ["13", "Dinosaur Discovery", "attractie", "1", { "note": "Tous publics", "zone": "buiten" }],
  ["14", "Tropical Stage", "show", "2", { "note": "Tous publics", "zone": "buiten" }],
  ["15", "Mini Trampolines", "attractie", "1", { "note": "3-13 ans", "zone": "buiten" }],
  ["16", "Mini Camp", "attractie", "1", { "note": "0-3 ans", "zone": "buiten" }],
  ["20", "Alligator Battle", "attractie", "3", { "accompanied": "90-120cm", "solo": "+120cm", "zone": "buiten" }],
  ["37", "Crazy Buggies", "attractie", "3", { "accompanied": "0-105cm", "solo": "+105cm", "zone": "buiten" }],

  ["32", "Jungle Goolfy", "attractie", "3", { "note": "Tous publics", "zone": "binnen" }],
  ["22", "Big Fun Zone", "attractie", "1", { "note": "3-13 ans", "zone": "binnen" }],
  ["23", "Zone Arcade", "attractie", "1", { "note": "Tous publics", "zone": "binnen" }],
  ["25", "Tyroliennes", "attractie", "1", { "accompanied": "0-105cm", "solo": "+105cm", "zone": "binnen" }],
  ["26", "Zone Lego", "attractie", "1", { "note": "3-13 ans", "zone": "binnen" }],
  ["27", "Tour élastique", "attractie", "1", { "note": "3-13 ans", "zone": "binnen" }],
  ["21", "Baby Zone", "attractie", "1", { "note": "0-3 ans", "zone": "binnen" }],

  ["33", "Jungle Restaurant", "resto", "", { "note": "Ouvert été/hiver", "zone": "eten" }],
  ["36", "Jungle Bazar", "shop", "", { "note": "Ouvert été/hiver", "zone": "shop" }]
];

let container = document.getElementById("attracties-container");

const zoneTitles = {
  "buiten": "BUITENPRETPARK",
  "binnen": "BINNENSPEELTUIN",
  "eten": "ETEN EN DRINKEN",
  "shop": "SHOP"
};

const zoneOrder = ["buiten", "binnen", "eten", "shop"];

zoneOrder.forEach(zone => {
  const items = attracties.filter(a => a[4].zone === zone);
  if (items.length > 0) {
    container.innerHTML += `<h2 class="title-groep" id="${zone}">${zoneTitles[zone]}</h2>`;
    items.forEach(function(a) {
      let html = `
        <a class="a-item" href="https://www.jungle-city.be/${taal}/attractie${a[0]}">
          <div class="attractie-item">
            <div class="attractie-image" style="background-image: url(https://www.jungle-city.be/site/files/images/attracties/attractie${a[0]}.jpg);"></div>
            <h1 class="attractie-title">${a[1]}</h1>`;

      let conditions = a[4];
      let heightInfo = "";

      if (typeof conditions === "object") {
        if (conditions.accompanied || conditions.solo) {
          heightInfo += `<div class='height-icons'>`;
          if (conditions.accompanied) {
            heightInfo += `<div><img src='https://www.jungle-city.be/site/files/images/Icons/accompanied.png' style='height:24px;' alt='accompagné' /><br><span>${conditions.accompanied}</span></div>`;
          }
          if (conditions.solo) {
            heightInfo += `<div><img src='https://www.jungle-city.be/site/files/images/Icons/solo.png' style='height:24px;' alt='seul' /><br><span>${conditions.solo}</span></div>`;
          }
          heightInfo += `</div>`;
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
  }
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
