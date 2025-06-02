document.addEventListener("DOMContentLoaded", function () {
  const taal = location.pathname.includes("/fr") ? "fr" : "nl";
  const container = document.getElementById("jc-attractions");
  const filterbar = document.getElementById("jc-filters");
  const modal = document.getElementById("jc-modal");
  const modalBody = document.getElementById("modal-body");
  const closeBtn = modal.querySelector(".close-modal");

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

  const heightOptions = ["+90cm", "+105cm", "+120cm", "0-3"];

  // 🧭 Render filter bar
  const dierenLink = taal === "fr" ? "/fr/decouvrez-le-parc/animaux" : "/nl/dieren";
  const horecaAnchor = "#jc-jungle-restaurant";

  filterbar.innerHTML = `
    <div class="main-filters">
      <button data-cat="all">${taal === "fr" ? "Attractions" : "Attracties"}</button>
      <a href="${dierenLink}" target="_blank">${taal === "fr" ? "Animaux" : "Dieren"}</a>
      <a href="${horecaAnchor}">${taal === "fr" ? "Restauration & Boutique" : "Horeca & Retail"}</a>
    </div>
    <div class="height-filter">
      <span>${taal === "fr" ? "Taille" : "Lengte"}:</span>
      ${heightOptions.map(h => `
        <label><input type="checkbox" value="${h}"> ${h}</label>
      `).join("")}
    </div>
  `;

  // 🧱 Render attraction cards
  function renderCards() {
    const activeHeights = [...filterbar.querySelectorAll('input[type="checkbox"]:checked')].map(cb => cb.value);
    container.innerHTML = "";

    attracties.forEach(([id, name, height, zone]) => {
      if (activeHeights.length && !activeHeights.includes(height)) return;

      const isRestaurant = name.toLowerCase().includes("restaurant");
      const card = document.createElement("div");
      card.className = "attractie-card";
      if (isRestaurant) card.id = "jc-jungle-restaurant";
      card.innerHTML = `
        <div class="card-img" style="background-image:url(https://www.jungle-city.be/site/files/images/attracties/attractie${id}.jpg)"></div>
        <div class="card-title">${name}</div>
        <div class="hover-info">${height ? `${taal === "fr" ? 'Min. taille' : 'Min. lengte'}: ${height}` : ""}</div>
      `;
      card.addEventListener("click", () => openModal(id, name, height));
      container.appendChild(card);
    });
  }

  function openModal(id, name, height) {
    modalBody.innerHTML = `
      <h2>${name}</h2>
      ${height ? `<p><strong>${taal === "fr" ? 'Taille minimale' : 'Minimale lengte'}:</strong> ${height}</p>` : ""}
      <img src="https://www.jungle-city.be/site/files/images/attracties/attractie${id}.jpg" style="max-width:100%;border-radius:12px;margin-top:10px;" />
    `;
    modal.classList.remove("hidden");
  }

  closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
  modal.addEventListener("click", e => {
    if (e.target === modal) modal.classList.add("hidden");
  });

  // 📦 Listen to filter changes
  filterbar.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    cb.addEventListener("change", renderCards);
  });

  renderCards();
});
