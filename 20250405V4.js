document.addEventListener("DOMContentLoaded", function () {
  // Kolomtitels
  document.querySelector(".col-dates").innerHTML = "🎟️ " + document.querySelector(".col-dates").innerHTML;
  document.querySelector(".col-flex").innerHTML = "🎟️ " + document.querySelector(".col-flex").innerHTML;

  // Rijtitels met emoji's
  document.querySelector(".row-90").innerHTML = "👶 " + document.querySelector(".row-90").innerHTML;
  document.querySelector(".row-child").innerHTML = "🙂 " + document.querySelector(".row-child").innerHTML;
  document.querySelector(".row-adult").innerHTML = "🧍 " + document.querySelector(".row-adult").innerHTML;
  document.querySelector(".row-goolfy").innerHTML = "⛳ " + document.querySelector(".row-goolfy").innerHTML;
  document.querySelector(".row-anniv").innerHTML = "🎉 " + document.querySelector(".row-anniv").innerHTML;

  // Goolfy prijzen ook emoji
  const goolfyTds = document.querySelectorAll("td");
  goolfyTds.forEach((td) => {
    if (td.innerText.trim() === "7 €") td.innerText = "⛳ 7 €";
    if (td.innerText.trim() === "8 €") td.innerText = "⛳ 8 €";
    if (td.innerText.trim() === "0 €") td.innerText = "Gratuit";
  });

  // Gratis vervangen (0 € → Gratuit)
  const allTds = document.querySelectorAll("td");
  allTds.forEach((td) => {
    if (td.innerText.trim() === "0 €") td.innerText = "Gratuit";
  });
});
