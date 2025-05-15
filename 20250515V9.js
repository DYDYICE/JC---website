document.addEventListener("DOMContentLoaded", function () {
  // 🔍 Language detection
  let taal = location.pathname.match(/^\/(nl|fr)/);
  taal = taal ? taal[1] : "fr";

  // 🖼️ Icon paths by language
  const icons = {
    fr: {
      accompanied: "https://www.jungle-city.be/site/files/images/attracties/accfr.png",
      solo: "https://www.jungle-city.be/site/files/images/attracties/solofr.png"
    },
    nl: {
      accompanied: "https://www.jungle-city.be/site/files/images/attracties/accnl.png",
      solo: "https://www.jungle-city.be/site/files/images/attracties/solonl.png"
    }
  };

  // 📦 Attracties
  const attracties = [
  ["1", "Bunga Banga", "attractie", "3", { accompanied: "90-120cm", solo: "+120cm", zone: "buiten" }],
  ["2", "Tam Tam twist", "attractie", "3", { accompanied: "0-105cm", solo: "+105cm", zone: "buiten" }],
  ["3", "Savana fall", "attractie", "3", { accompanied: "90-105cm", solo: "+105cm", note: "Max 195cm / 85kg", zone: "buiten" }],
  ["4", "Flying Treehouse", "attractie", "3", { solo: "+90cm", zone: "buiten" }],
  ["5", "Bâteau pirate", "attractie", "3", { accompanied: "90-120cm", solo: "+120cm", zone: "buiten" }],
  ["6", "Jungle Carrousel", "attractie", "2", { accompanied: "80-100cm", solo: "+100cm", zone: "buiten" }],
  ["7", "Jungle Express", "attractie", "2", { accompanied: "0-105cm", solo: "+105cm", zone: "buiten" }],
  ["8", "Tiki River", "attractie", "2", { accompanied: "0-110cm", solo: "+110cm", zone: "buiten" }],
  ["9", "Tribal Village", "attractie", "3", { accompanied: "0-105cm", solo: "+105cm", zone: "buiten" }],
  ["12", "Trampoline", "attractie", "2", { note: "Tout public - Max 100kg", zone: "buiten" }],
  ["13", "Dinosaur Discovery", "attractie", "1", { note: "Tous publics", zone: "buiten" }],
  ["14", "Tropical Stage", "show", "2", { note: "Tous publics", zone: "buiten" }],
  ["15", "Mini Trampolines", "attractie", "1", { note: "3-13 ans", zone: "buiten" }],
  ["16", "Mini Camp", "attractie", "1", { note: "0-3 ans", zone: "buiten" }],
  ["20", "Alligator Battle", "attractie", "3", { accompanied: "90-120cm", solo: "+120cm", zone: "buiten" }],
  ["37", "Crazy Buggies", "attractie", "3", { accompanied: "0-105cm", solo: "+105cm", zone: "buiten" }],
  ["32", "Jungle Goolfy", "attractie", "3", { note: "Tous publics", zone: "binnen" }],
  ["22", "Big Fun Zone", "attractie", "1", { note: "3-13 ans", zone: "binnen" }],
  ["23", "Zone Arcade", "attractie", "1", { note: "Tous publics", zone: "binnen" }],
  ["25", "Tyroliennes", "attractie", "1", { accompanied: "0-105cm", solo: "+105cm", zone: "binnen" }],
  ["26", "Zone Lego", "attractie", "1", { note: "3-13 ans", zone: "binnen" }],
  ["27", "Tour élastique", "attractie", "1", { note: "3-13 ans", zone: "binnen" }],
  ["21", "Baby Zone", "attractie", "1", { note: "0-3 ans", zone: "binnen" }],
  ["33", "Jungle Restaurant", "resto", "", { note: "Ouvert été/hiver", zone: "eten" }],
  ["36", "Jungle Bazar", "shop", "", { note: "Ouvert été/hiver", zone: "shop" }]
];

  const zoneTitles = {
    buiten: taal === "fr" ? "Parc extérieur" : "Buitenpretpark",
    binnen: taal === "fr" ? "Parc intérieur" : "Binnenspeeltuin",
    eten:   taal === "fr" ? "Restauration" : "Eten en drinken",
    shop:   taal === "fr" ? "Boutique" : "Shop"
  };

  const zoneOrder = ["buiten", "binnen", "eten", "shop"];
  const container = document.getElementById("attracties-container");
  if (!container) return;

  zoneOrder.forEach(zone => {
    const items = attracties.filter(a => a[4].zone === zone);
    if (items.length > 0) {
      const idName = zone === "eten" ? "horeca" : zone;
  container.innerHTML += `<h2 class="title-groep" id="${idName}">${zoneTitles[zone]}</h2>`;
      items.forEach(a => {
        let html = `
          <a class="a-item" href="https://www.jungle-city.be/${taal}/attractie${a[0]}">
            <div class="attractie-item">
              <div class="attractie-image" style="background-image: url(https://www.jungle-city.be/site/files/images/attracties/attractie${a[0]}.jpg);"></div>
              <h1 class="attractie-title">${a[1]}</h1>`;

        const conditions = a[4];
        let heightInfo = "";

        if (conditions.accompanied || conditions.solo) {
          heightInfo += `<div class="info-height-wrapper">`;
          if (conditions.accompanied) {
            heightInfo += `<div class="icon-wrap"><img src="${icons[taal].accompanied}" class="icon-height" alt="accompanied"/><br><span>${conditions.accompanied}</span></div>`;
          }
          if (conditions.solo) {
            heightInfo += `<div class="icon-wrap"><img src="${icons[taal].solo}" class="icon-height" alt="solo"/><br><span>${conditions.solo}</span></div>`;
          }
          heightInfo += `</div>`;
        }

        if (conditions.note) {
          heightInfo += `<div class="note">${conditions.note}</div>`;
        }

        html += `${heightInfo}</div></a>`;
        container.innerHTML += html;
      });
    }
  });

  // Smooth scroll with JS offset
  const OFFSET = document.querySelector('.snelmenu')?.offsetHeight || 100;

  // If a hash is already present (on page load)
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      setTimeout(() => {
        window.scrollTo({
          top: target.offsetTop - OFFSET - 10,
          behavior: "smooth"
        });
      }, 100);
    }
  }

  // When clicking sticky menu links
  document.querySelectorAll('.snelmenu a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - OFFSET - 10,
          behavior: "smooth"
        });
      }
    });
  });

  // Animations
  const titles = document.querySelectorAll(".attractie-title");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("slide-in");
      }
    });
  }, { threshold: 0.3 });

  titles.forEach(title => observer.observe(title));
});
