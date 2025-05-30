document.addEventListener("DOMContentLoaded", function () {
  // 🔍 Language detection
  let taal = location.pathname.match(/^\/(nl|fr)/);
  taal = taal ? taal[1] : "fr";

  // 🖼️ Icon paths by language
  const icons = {
    fr: {
      accompanied: "https://www.jungle-city.be/site/files/images/attracties/accfr2.jpg",
      solo: "https://www.jungle-city.be/site/files/images/attracties/solofr2.jpg"
    },
    nl: {
      accompanied: "https://www.jungle-city.be/site/files/images/attracties/accnl2.jpg",
      solo: "https://www.jungle-city.be/site/files/images/attracties/solonl2.jpg"
    }
  };

  // 🧩 Type sections
  const typeTitles = {
    attractie: taal === "fr" ? "Attractions" : "Attracties",
    "aire de jeux": taal === "fr" ? "Aires de jeux" : "Speelzones",
    "jeux payants": taal === "fr" ? "Jeux payants" : "Betaalde spellen",
    animation: taal === "fr" ? "Animations" : "Animaties",
    horeca: taal === "fr" ? "Restauration" : "Eten & drinken",
    retail: taal === "fr" ? "Boutiques" : "Shops"
  };

  const typeOrder = ["attractie", "aire de jeux", "jeux payants", "animation", "horeca", "retail"];

  // 📦 Attracties
  const attracties = [
    ["001", "Bunga Banga", "attractie", { accompanied: "90-120cm", solo: "+120cm", zone: "buiten" }],
    ["002", "Tam Tam twist", "attractie", { accompanied: "0-105cm", solo: "+105cm", zone: "buiten" }],
    ["003", "Savana fall", "attractie", { accompanied: "90-105cm", solo: "+105cm", note: "Max 195cm / 85kg", zone: "buiten" }],
    ["004", "Flying Treehouse", "attractie", { solo: "+90cm", zone: "buiten" }],
    ["005", "Pirates of the Jungle", "attractie", { accompanied: "90-120cm", solo: "+120cm", zone: "buiten" }],
    ["006", "Jungle Party Carrousel", "attractie", { accompanied: "80-100cm", solo: "+100cm", zone: "buiten" }],
    ["007", "Jungle Express", "attractie", { accompanied: "0-105cm", solo: "+105cm", zone: "buiten" }],
    ["008", "Monkey River", "attractie", { accompanied: "0-110cm", solo: "+110cm", zone: "buiten" }],
    ["009", "Trampoline", "attractie", { note: "Tout public - Max 100kg", zone: "buiten" }],
    ["010", "Mini Trampolines", "attractie", { note: "3-13 ans", zone: "buiten" }],
    ["011", "Alligator Battle", "attractie", { accompanied: "90-120cm", solo: "+120cm", zone: "buiten" }],
    ["012", "Crazy Buggies", "attractie", { accompanied: "0-105cm", solo: "+105cm", zone: "buiten" }],
    ["013", "Go Kart", "attractie", { solo: "+90cm", zone: "buiten" }],
    ["014", "Mini-Jeep", "attractie", { accompanied: "90-105cm", solo: "+105cm", note: "NEW this SUMMER", zone: "binnen" }],
    ["015", "Baby Zone", "attractie", { note: "0-3 ans", zone: "binnen" }],
    ["016", "Big Fun Zone", "aire de jeux", { note: "3-13 ans", zone: "binnen" }],
    ["017", "Aire de jeux intérieur", "aire de jeux", { accompanied: "0-105cm", solo: "+105cm", zone: "binnen" }],
    ["018", "Tribal Village", "aire de jeux", { accompanied: "0-105cm", solo: "+105cm", zone: "buiten" }],
    ["019", "Jungle Goolfy", "jeux payants", { note: "Tous publics", zone: "binnen" }],
    ["020", "Jungle Arcades", "jeux payants", { note: "Tous publics", zone: "binnen" }],
    ["021", "Jungle Games", "jeux payants", { note: "Pêche aux canards + Chamboule tout ||NEW this SUMMER||", zone: "binnen" }],
    ["022", "Jungle Restaurant", "horeca", { note: "Friterie - Bar - Glaces - Sucré - Tea-room", zone: "eten" }],
    ["023", "Jungle Bar", "horeca", { note: "|Ouvert si affluence| Bar - Glaces - Sucré", zone: "eten" }],
    ["024", "Jungle Dinner", "horeca", { note: "|Ouvert si affluence| Bar - Glaces - Snack - Sandwichs", zone: "eten" }],
    ["025", "Relais des aventuriers", "horeca", { note: "|Jungle Expedition| Bar - Glaces - Sucré - Tea-room", zone: "eten" }],
    ["026", "Dinosaur Discovery", "animation", { note: "Animation", zone: "buiten" }],
    ["027", "Tropical Stage", "animation", { note: "Spectacle (vacances scolaires)", zone: "buiten" }],
    ["028", "Espace Polyvalent 1", "animation", { note: "Halloween & en hiver", zone: "buiten" }],
    ["029", "Espace Polyvalent 2", "animation", { note: "Halloween & en hiver", zone: "buiten" }],
    ["030", "Photo Point Jungle City", "animation", { note: "", zone: "buiten" }],
    ["031", "Photo Point Jungle Expedition", "animation", { note: "", zone: "buiten" }],
    ["032", "Jungle Bazar", "retail", { note: "Ouvert", zone: "binnen" }],
    ["033", "Jungle Market", "retail", { note: "|Ouvert si affluence| Boutique centre parc", zone: "binnen" }],
    ["034", "Expédition Market", "retail", { note: "Boutique Jungle Expedition", zone: "binnen" }]
  ];

  const container = document.getElementById("attracties-container");
  if (!container) return;

  typeOrder.forEach(type => {
    const items = attracties.filter(a => a[2] === type);
    if (items.length > 0) {
      const idName = type.replace(/\s+/g, "-");
      container.innerHTML += `<h2 class="title-groep" id="${idName}">${typeTitles[type]}</h2>`;
      items.forEach(a => {
        let html = `
          <a class="a-item" href="https://www.jungle-city.be/${taal}/attractie${a[0]}">
            <div class="attractie-item">
              <div class="attractie-image" style="background-image: url(https://www.jungle-city.be/site/files/images/attracties/attractie${a[0]}.jpg);"></div>
              <h1 class="attractie-title">${a[1]}</h1>`;

        const conditions = a[3];
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

        if (conditions.note || conditions.zone) {
          heightInfo += `<div class="note">`;
          if (conditions.note) heightInfo += `${conditions.note}<br>`;
          if (conditions.zone) heightInfo += `<em>${taal === "fr" ? "Zone" : "Zone"}: ${conditions.zone}</em>`;
          heightInfo += `</div>`;
        }

        html += `${heightInfo}</div></a>`;
        container.innerHTML += html;
      });
    }
  });

  // Smooth scroll with JS offset
  const OFFSET = document.querySelector('.snelmenu')?.offsetHeight || 100;

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
