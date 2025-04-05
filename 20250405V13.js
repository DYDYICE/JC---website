document.addEventListener("DOMContentLoaded", function () {
  // Kolomtitels
  document.querySelector(".col-dates").innerHTML = "🎟️ " + document.querySelector(".col-dates").innerHTML;
  document.querySelector(".col-flex").innerHTML = "🎟️ " + document.querySelector(".col-flex").innerHTML;

  // Voeg emoji's toe aan de juiste labels (niet aan <tr>, maar aan de text)
  const emojiMap = {
    "label-90": "👶 ",
    "label-child": "😊 ",
    "label-adult": "🧍 ",
    "label-goolfy": "⛳ ",
    "label-combi": "⛳ ",
    "label-anniv": "🎉 "
  };

  for (const [cls, emoji] of Object.entries(emojiMap)) {
    const el = document.querySelector("." + cls);
    if (el) {
      el.innerHTML = emoji + el.innerHTML;
    }
  }
});
