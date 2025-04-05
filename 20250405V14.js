document.addEventListener("DOMContentLoaded", function () {
  const emojis = {
    "row-90": "👶 ",
    "row-child": "😊 ",
    "row-adult": "🧍 ",
    "row-goolfy": "⛳ ",
    "row-combi": "⛳ ",
    "row-anniv": "🎉 "
  };

  Object.entries(emojis).forEach(([rowClass, emoji]) => {
    const labelCell = document.querySelector(`.${rowClass} .label`);
    if (labelCell && !labelCell.textContent.startsWith(emoji)) {
      labelCell.textContent = emoji + labelCell.textContent;
    }
  });

  // Extra: emoji's bij de kolomtitels
  const colDates = document.querySelector(".col-dates");
  const colFlex = document.querySelector(".col-flex");
  if (colDates && !colDates.textContent.includes("🎟️")) {
    colDates.textContent = "🎟️ " + colDates.textContent;
  }
  if (colFlex && !colFlex.textContent.includes("🎟️")) {
    colFlex.textContent = "🎟️ " + colFlex.textContent;
  }
});
