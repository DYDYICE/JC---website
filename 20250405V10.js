document.addEventListener("DOMContentLoaded", function () {
  // Kolomtitels versieren (desktop only)
  const colDates = document.querySelector(".col-dates");
  const colFlex = document.querySelector(".col-flex");
  if (colDates) colDates.innerHTML = "🎟️ " + colDates.innerHTML;
  if (colFlex) colFlex.innerHTML = "🎟️ " + colFlex.innerHTML;

  // Emoji's per productrij toevoegen via data-attribuut
  const rows = [
    { selector: ".row-90", emoji: "👶" },
    { selector: ".row-child", emoji: "😊" },
    { selector: ".row-adult", emoji: "🧍" },
    { selector: ".row-goolfy", emoji: "⛳" },
    { selector: ".row-combi", emoji: "⛳" },
    { selector: ".row-anniv", emoji: "🎉" },
  ];

  rows.forEach(({ selector, emoji }) => {
    const labelCell = document.querySelector(`${selector} .label`);
    if (labelCell) {
      labelCell.setAttribute("data-emoji", emoji);
    }
  });
});
