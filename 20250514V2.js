let container = document.getElementById("attracties-container");

attracties.forEach(function(a) {
  let html = `
    <a class="a-item" href="https://www.jungle-city.be/${taal}/attractie${a[0]}">
      <div class="attractie-item">
        <div class="attractie-image" style="background-image: url(https://www.jungle-city.be/site/files/images/attracties/attractie${a[0]}.jpg);"></div>
        <h1 class="attractie-title">${a[1]}</h1>
        <div class="info-wrapper">
          <div class="info-cat" style="background-image: url(https://www.jungle-city.be/site/files/images/attracties/${a[2]}-icon.png);"></div>
          <div class="info-level" style="background-image: url(https://www.jungle-city.be/site/files/images/attracties/ex${a[3]}.png);"></div>
        </div>`;

  let conditions = a[4];
  let heightInfo = "";

  if (typeof conditions === "object") {
    if (conditions.accompanied) {
      heightInfo += `
        <div class="info-height only-default">
          <img src="https://www.jungle-city.be/site/files/images/Icons/dydy%20-%20till%20x%2C%20with%20adult.jpg" class="icon-height" />
          ${conditions.accompanied}
        </div>`;
    }
    if (conditions.solo) {
      heightInfo += `
        <div class="info-height">
          <img src="https://www.jungle-city.be/site/files/images/Icons/dydy%20-%20children%20OK%20from%20x.jpg" class="icon-height" />
          ${conditions.solo}
        </div>`;
    }
    if (conditions.note) {
      heightInfo += `<div class="note">${conditions.note}</div>`;
    }
  }

  html += `
        <div class="info-height-wrapper">
          ${heightInfo}
        </div>
      </div>
    </a>`;

  container.innerHTML += html;
});

// Slide-in effect + tap-to-expand
document.addEventListener("DOMContentLoaded", function () {
  const titles = document.querySelectorAll(".attractie-title");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("slide-in");
      }
    });
  }, { threshold: 0.3 });

  titles.forEach(title => observer.observe(title));

  document.querySelectorAll('.attractie-item').forEach(item => {
    item.addEventListener('click', () => {
      if (window.innerWidth <= 600) {
        item.classList.toggle("expanded");
      }
    });
  });
});
