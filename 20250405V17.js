document.addEventListener("DOMContentLoaded", function () {
  // Kolomtitels
  document.querySelector(".col-dates").innerHTML = "🎟️ " + document.querySelector(".col-dates").innerHTML;
  document.querySelector(".col-flex").innerHTML = "🎟️ " + document.querySelector(".col-flex").innerHTML;

  // Emoji’s naast labels (desktop & mobiel)
  const emojiMap = {
    "row-90": "👶",
    "row-child": "😊",
    "row-adult": "🧍",
    "row-goolfy": "⛳",
    "row-combi": "⛳",
    "row-anniv": "🎉",
  };

  for (const [cls, emoji] of Object.entries(emojiMap)) {
    const cell = document.querySelector(`.${cls} td.label`);
    if (cell && !cell.innerHTML.includes(emoji)) {
      cell.innerHTML = `${emoji} ` + cell.innerHTML;
    }
  }
});
