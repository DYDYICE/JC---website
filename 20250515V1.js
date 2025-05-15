document.addEventListener("DOMContentLoaded", function () {
  // Dynamisch de taal afleiden op basis van de URL
  let taal = window.location.pathname.includes("/nl") ? "nl" : "fr";

  // Icon-bestanden per taal
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

  // Attractiegegevens laden
  const attracties = [
    ["1", "Bunga Banga", "buiten", "3", { accompanied: "90-120cm", solo: "+120cm" }],
    ["2", "Tam Tam twist", "buiten", "3", { accompanied: "0-105cm", solo: "+105cm" }],
    ["3", "Savana fall", "buiten", "3", { accompanied: "90-105cm", solo: "+105cm", note: "Max 195cm / 85kg" }],
    ["32", "Jungle Goolfy", "binnen", "3", { note: "Tous publics" }],
    ["33", "Jungle Restaurant", "horeca", "", { note: "Ouvert été/hiver" }],
    ["36", "Jungle Bazar", "shop", "", { note: "Ouvert été/hiver" }]
  ];

  // Container
  const container = document.getElementById("attracties-container");
  const groepen = ["buiten", "binnen", "horeca", "shop"];

  // Genereer titels + inhoud
  groepen.forEach(groep => {
    const section = document.createElement("div");
    section.classList.add("groep-wrapper");

    const title = document.createElement("div");
    title.classList.add("groep-title");
    title.textContent = (taal === "fr") ?
      (groep === "buiten" ? "Parc extérieur" : groep === "binnen" ? "Parc intérieur" : groep === "horeca" ? "Restauration" : "Boutique") :
      (groep === "buiten" ? "Buitenspeeltuin & attracties" : groep === "binnen" ? "Binnenspeeltuin" : groep === "horeca" ? "Eten & drinken" : "Shop");

    section.appendChild(title);

    const attractiesInGroep = attracties.filter(a => a[2] === groep);
    attractiesInGroep.forEach(a => {
      let html = `
        <a class="a-item" href="https://www.jungle-city.be/${taal}/attractie${a[0]}">
          <div class="attractie-item">
            <div class="attractie-image" style="background-image: url(https://www.jungle-city.be/site/files/images/attracties/attractie${a[0]}.jpg);"></div>
            <h1 class="attractie-title">${a[1]}</h1>`;

      const conditions = a[4];
      let heightInfo = "";

      if (conditions.accompanied) {
        heightInfo += `
          <div class="info-height">
            <img src="${icons[taal].accompanied}" class="icon-height" />
            ${conditions.accompanied}
          </div>`;
      }
      if (conditions.solo) {
        heightInfo += `
          <div class="info-height">
            <img src="${icons[taal].solo}" class="icon-height" />
            ${conditions.solo}
          </div>`;
      }
      if (conditions.note) {
        heightInfo += `<div class="note">${conditions.note}</div>`;
      }

      html += `
          <div class="info-height-wrapper">
            ${heightInfo}
          </div>
        </div>
      </a>`;

      section.innerHTML += html;
    });

    container.appendChild(section);
  });

  // Slide-in effect
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
