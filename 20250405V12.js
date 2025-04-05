document.addEventListener("DOMContentLoaded", function () {
  // Kolomtitels (desktop only zichtbaar)
  document.querySelector(".col-dates").innerHTML = "🎟️ " + document.querySelector(".col-dates").innerHTML;
  document.querySelector(".col-flex").innerHTML = "🎟️ " + document.querySelector(".col-flex").innerHTML;

  // Emojis voor producten (vooraan productnaam)
  document.querySelector(".row-90").innerHTML = "👶 " + document.querySelector(".row-90").innerHTML;
  document.querySelector(".row-child").innerHTML = "😊 " + document.querySelector(".row-child").innerHTML;
  document.querySelector(".row-adult").innerHTML = "🧍 " + document.querySelector(".row-adult").innerHTML;
  document.querySelector(".row-goolfy").innerHTML = "⛳ " + document.querySelector(".row-goolfy").innerHTML;
  document.querySelector(".row-combi").innerHTML = "⛳ " + document.querySelector(".row-combi").innerHTML;
  document.querySelector(".row-anniv").innerHTML = "🎉 " + document.querySelector(".row-anniv").innerHTML;
});
