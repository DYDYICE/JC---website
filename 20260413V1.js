document.addEventListener("DOMContentLoaded", function () {
  var icons = {
    baby: "👶",
    child: "🧒",
    adult: "🧑",
    golf: "⛳",
    ticket: "🎫",
    pass: "🟢",
    birthday: "🎂"
  };

  var elements = document.querySelectorAll(".jc-icon[data-icon]");

  for (var i = 0; i < elements.length; i++) {
    var key = elements[i].getAttribute("data-icon");
    if (icons[key]) {
      elements[i].textContent = icons[key];
    }
  }
});
