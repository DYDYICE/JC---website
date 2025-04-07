document.addEventListener("DOMContentLoaded", function () {
  // Kolomtitels
  document.querySelector(".col-dates").innerHTML = "🎟️ " + document.querySelector(".col-dates").innerHTML;
  document.querySelector(".col-flex").innerHTML = "🎟️ " + document.querySelector(".col-flex").innerHTML;

  // Rij labels (in <td class="label ...">)
  document.querySelector(".row-90 .label").innerHTML = "👶 " + document.querySelector(".row-90 .label").innerHTML;
  document.querySelector(".row-child .label").innerHTML = "👦👧 " + document.querySelector(".row-child .label").innerHTML;
  document.querySelector(".row-adult .label").innerHTML = "👨‍🦰👩‍🦰 " + document.querySelector(".row-adult .label").innerHTML;
  document.querySelector(".row-goolfy .label").innerHTML = "⛳️ " + document.querySelector(".row-goolfy .label").innerHTML;
  document.querySelector(".row-abo-child .label").innerHTML = "🟢 " + document.querySelector(".row-abo-child .label").innerHTML;
  document.querySelector(".row-abo-adult .label").innerHTML = "🟢 " + document.querySelector(".row-abo-adult .label").innerHTML;
  document.querySelector(".row-anniv .label").innerHTML = "🎂 " + document.querySelector(".row-anniv .label").innerHTML;

  // COMBI → geen emoji
});
