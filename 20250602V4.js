document.addEventListener("DOMContentLoaded", function () {
  const taal = location.pathname.includes("/fr") ? "fr" : "nl";
  const container = document.getElementById("jc-attractions");
  const modal = document.getElementById("jc-modal");
  const modalBody = document.getElementById("modal-body");
  const closeBtn = modal.querySelector(".close-modal");

  const attracties = [
    ["001", "Bunga Banga", "attractie", { accompanied: "90-120cm", solo: "+120cm" }],
    ["002", "Tam Tam twist", "attractie", { accompanied: "0-105cm", solo: "+105cm" }],
    ["003", "Savana fall", "attractie", { accompanied: "90-105cm", solo: "+105cm", note: "Max 195cm / 85kg" }],
    ["004", "Flying Treehouse", "attractie", { solo: "+90cm" }],
    ["005", "Pirates of the Jungle", "attractie", { accompanied: "90-120cm", solo: "+120cm" }],
    ["006", "Jungle Party Carrousel", "attractie", { accompanied: "80-100cm", solo: "+100cm" }],
    ["007", "Jungle Express", "attractie", { accompanied: "0-105cm", solo: "+105cm" }],
    ["008", "Monkey River", "attractie", { accompanied: "0-110cm", solo: "+110cm" }],
    ["009", "Trampoline", "attractie", { note: "Tout public - Max 100kg" }],
    ["010", "Mini Trampolines", "attractie", { note: "3-13 ans" }],
    ["011", "Alligator Battle", "attractie", { accompanied: "90-120cm", solo: "+120cm" }],
    ["012", "Crazy Buggies", "attractie", { accompanied: "0-105cm", solo: "+105cm" }],
    ["013", "Go Kart", "attractie", { solo: "+90cm" }],
    ["014", "Mini-Jeep", "attractie", { accompanied: "90-105cm", solo: "+105cm", note: "NEW this SUMMER" }],
    ["015", "Baby Zone", "attractie", { note: "0-3 ans" }],
    ["016", "Big Fun Zone", "aire de jeux", { note: "3-13 ans" }],
    ["017", "Aire de jeux intérieur", "aire de jeux", { accompanied: "0-105cm", solo: "+105cm" }],
    ["018", "Tribal Village", "aire de jeux", { accompanied: "0-105cm", solo: "+105cm" }],
    ["019", "Jungle Goolfy", "jeux payants", { note: "Tous publics" }],
    ["020", "Jungle Arcades", "jeux payants", { note: "Tous publics" }],
    ["021", "Jungle Games", "jeux payants", { note: "Pêche aux canards + Chamboule tout ||NEW this SUMMER||" }],
    ["022", "Jungle Restaurant", "horeca", { note: "Friterie - Bar - Glaces - Sucré - Tea-room" }],
    ["023", "Jungle Bar", "horeca", { note: "|Ouvert si affluence| Bar - Glaces - Sucré" }],
    ["024", "Jungle Dinner", "horeca", { note: "|Ouvert si affluence| Bar - Glaces - Snack - Sandwichs" }],
    ["025", "Relais des aventuriers", "horeca", { note: "|Jungle Expedition| Bar - Glaces - Sucré - Tea-room" }],
    ["026", "Dinosaur Discovery", "animation", { note: "Animation" }],
    ["027", "Tropical Stage", "animation", { note: "Spectacle (vacances scolaires)" }],
    ["028", "Espace Polyvalent 1", "animation", { note: "Halloween & en hiver" }],
    ["029", "Espace Polyvalent 2", "animation", { note: "Halloween & en hiver" }],
    ["030", "Photo Point Jungle City", "animation", {}],
    ["031", "Photo Point Jungle Expedition", "animation", {}],
    ["032", "Jungle Bazar", "retail", { note: "Ouvert" }],
    ["033", "Jungle Market", "retail", { note: "|Ouvert si affluence| Boutique centre parc" }],
    ["034", "Expédition Market", "retail", { note: "Boutique Jungle Expedition" }]
  ];

  const filterContainer = document.querySelector(".height-filter");

  function formatConditions(conditions) {
    let text = [];
    if (conditions.accompanied) text.push(`${taal === "fr" ? "accompagné" : "begeleid"}: ${conditions.accompanied}`);
    if (conditions.solo) text.push(`${taal === "fr" ? "seul" : "solo"}: ${conditions.solo}`);
    if (conditions.note) text.push(conditions.note);
    return text.join(", ");
  }

  function renderCards() {
    const activeHeights = [...(filterContainer?.querySelectorAll('input[type="checkbox"]:checked') || [])].map(cb => cb.value);
    container.innerHTML = "";

    attracties.forEach(([id, name, type, conditions]) => {
      const heightInfo = formatConditions(conditions);
      if (activeHeights.length && (!heightInfo || !activeHeights.some(h => heightInfo.includes(h)))) return;

      const imgUrl = `https://www.jungle-city.be/site/files/images/attracties/attractie${id}.jpg`;
      const fallback = "https://www.jungle-city.be/site/layout/img/junglecity-logo.png";

      const card = document.createElement("div");
      card.className = "attractie-card";
      if (name.toLowerCase().includes("restaurant")) card.id = "jc-jungle-restaurant";

      card.innerHTML = `
        <div class="card-img" style="background-image: url('${imgUrl}')"></div>
        <div class="card-title">${name}</div>
        <div class="hover-info">${heightInfo}</div>
      `;

      card.addEventListener("click", () => {
        modalBody.innerHTML = `
          <h2>${name}</h2>
          ${heightInfo ? `<p><strong>${taal === "fr" ? "Conditions" : "Voorwaarden"}:</strong> ${heightInfo}</p>` : ""}
          <img src="${imgUrl}" onerror="this.src='${fallback}'" style="max-width:100%;border-radius:12px;margin-top:10px;" />
        `;
        modal.classList.remove("hidden");
      });

      container.appendChild(card);
    });
  }

  if (filterContainer) {
    filterContainer.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      cb.addEventListener("change", renderCards);
    });
  }

  closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
  modal.addEventListener("click", e => {
    if (e.target === modal) modal.classList.add("hidden");
  });

  renderCards();
});
