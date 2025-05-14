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
