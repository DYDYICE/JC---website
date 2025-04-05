document.addEventListener("DOMContentLoaded", function () {
  // Kolomtitels
  const colDates = document.querySelector(".col-dates");
  const colFlex = document.querySelector(".col-flex");
  if (colDates) colDates.innerHTML = "🎟️ " + colDates.innerHTML;
  if (colFlex) colFlex.innerHTML = "🎟️ " + colFlex.innerHTML;

  // Rijnamen
  const rowMap = {
    "row-90": "👶 ",
    "row-child": "😊 ",
    "row-adult": "🧍 ",
    "row-goolfy": "⛳ ",
    "row-combi": "⛳ ",
    "row-anniv": "🎉 "
  };

  Object.keys(rowMap).forEach(rowClass => {
    const row = document.querySelector("." + rowClass + " td:first-child");
    if (row) row.innerHTML = rowMap[rowClass] + row.innerHTML;
  });
});
