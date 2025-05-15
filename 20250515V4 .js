// ✅ Jungle City - V4 JavaScript + fixes for sticky offset & icon sizes

// 🔍 Detect language from URL safely
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

// 📦 Attractiegegevens met zone
const attracties = [...]; // Same as before – no change to content

const container = document.getElementById("attracties-container");
const zoneTitles = {
  buiten: taal === "fr" ? "Parc extérieur" : "Buitenspeeltuin & attracties",
  binnen: taal === "fr" ? "Parc intérieur" : "Binnenspeeltuin",
  eten: taal === "fr" ? "Restauration" : "Eten & drinken",
  shop: taal === "fr" ? "Boutique" : "Shop"
};

const zoneOrder = ["buiten", "binnen", "eten", "shop"];

zoneOrder.forEach(zone => {
  const items = attracties.filter(a => a[4].zone === zone);
  if (items.length > 0) {
    container.innerHTML += `<h2 class="title-groep" id="${zone}">${zoneTitles[zone]}</h2>`;
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

// ✅ Add scroll offset for sticky menu
window.addEventListener("load", () => {
  const OFFSET_Y = document.querySelector('.snelmenu')?.offsetHeight || 80;
  const hash = window.location.hash;
  if (hash) {
    const target = document.querySelector(hash);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - OFFSET_Y - 10,
        behavior: "smooth"
      });
    }
  }

  // Smooth scroll for menu clicks
  document.querySelectorAll('.snelmenu a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - OFFSET_Y - 10,
          behavior: "smooth"
        });
      }
    });
  });
});

// ✅ Animaties pas na render
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
});
