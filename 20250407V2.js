document.addEventListener("DOMContentLoaded", function () {
  // Kolomtitels
  const colDates = document.querySelector(".col-date");
  const colFlex = document.querySelector(".col-flex");

  if (colDates) colDates.innerHTML = "🎟️ " + colDates.innerHTML;
  if (colFlex) colFlex.innerHTML = "🎟️ " + colFlex.innerHTML;

  // Rij-labels via classnamen van <tr>
  const emojis = {
    "row-90": "👶 ",
    "row-child": "👦👧 ",
    "row-adult": "👨‍🦰👩‍🦰 ",
    "row-goolfy": "⛳️ ",
    "row-abo-child": "🟢 ",
    "row-abo-adult": "🟢 ",
    "row-anniv": "🎂 "
    // Let op: géén emoji voor row-combi!
  };

  Object.entries(emojis).forEach(([rowClass, emoji]) => {
    const row = document.querySelector(`.${rowClass} .label`);
    if (row) row.innerHTML = emoji + row.innerHTML;
  });
});
