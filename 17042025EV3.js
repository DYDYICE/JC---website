document.addEventListener("DOMContentLoaded", function () {
  const path = window.location.pathname;

  if (path.includes("/fr/")) {
    const fr = document.getElementById("easter-marketing-fr");
    if (fr) {
      fr.innerHTML = `
        <h3>🥚 À la chasse à l’Œuf d’Or – Pâques à Jungle City ! 🌴</h3>
        <p>Du 26 avril au 11 mai, une grande chasse à l’œuf s’installe à Jungle City !</p>
        <p>Chaque jour, un œuf d’or est caché dans le parc… 🧐</p>
        <p>🎁 L’enfant qui le trouve remporte un abonnement annuel pour revenir s’amuser toute l’année !</p>
        <p>📸 N’oubliez pas de passer voir Pico la mascotte pour une photo souvenir magique à partager !</p>
        <p><em>Prêts pour l’aventure ? L’œuf d’or n’attend que vous…</em></p>
      `;
    }
  } else if (path.includes("/nl/")) {
    const nl = document.getElementById("easter-marketing-nl");
    if (nl) {
      nl.innerHTML = `
        <h3>🥚 Op zoek naar het Gouden Ei – Pasen bij Jungle City! 🌴</h3>
        <p>Van 26 april tot en met 11 mei wordt Jungle City omgetoverd tot een waar paasavontuur!</p>
        <p>Elke dag wordt er ergens in het park een gouden ei verstopt… 🧐</p>
        <p>🎁 Het kind dat het vindt, wint een jaarlijks abonnement om het hele jaar door plezier te maken!</p>
        <p>📸 Vergeet niet langs te gaan bij Pico, onze mascotte, voor een leuke foto als herinnering!</p>
        <p><em>Klaar voor het avontuur? Het gouden ei wacht op jou…</em></p>
      `;
    }
  }
});
