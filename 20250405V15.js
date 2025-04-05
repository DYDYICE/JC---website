document.addEventListener("DOMContentLoaded", function () {
  // Emoji's toevoegen naast producten (desktop & mobile)
  const emojiMap = {
    "row-90": "👶 ",
    "row-child": "😊 ",
    "row-adult": "🧍 ",
    "row-goolfy": "⛳ ",
    "row-combi": "⛳ ",
    "row-anniv": "🎉 ",
  };

  Object.entries(emojiMap).forEach(([className, emoji]) => {
    const label = document.querySelector(`.${className} .label`);
    if (label && !label.innerHTML.startsWith(emoji)) {
      label.innerHTML = emoji + label.innerHTML;
    }
  });
});
