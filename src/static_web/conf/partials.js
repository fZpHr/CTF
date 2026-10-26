/* Datalys, header & footer partagés, injectés sur chaque page.
   Chaque page déclare <body data-page="..."> pour l'onglet actif. */
(function () {
  var MARK =
    '<svg class="brand-mark" viewBox="0 0 32 32" fill="none" aria-hidden="true">' +
    '<rect width="32" height="32" rx="8" fill="#2563eb"/>' +
    '<rect x="8" y="16" width="4" height="8" rx="1" fill="#ffffff"/>' +
    '<rect x="14" y="11" width="4" height="13" rx="1" fill="#9ad5ff"/>' +
    '<rect x="20" y="7" width="4" height="17" rx="1" fill="#06b6d4"/></svg>';

  var NAV = [
    ["index", "Accueil"],
    ["about", "À propos"],
    ["services", "Services"],
    ["projects", "Projets"],
    ["team", "Équipe"],
    ["careers", "Carrières"],
    ["contact", "Contact"]
  ];

  var active = document.body.getAttribute("data-page") || "";

  var links = NAV.map(function (n) {
    var cur = n[0] === active ? ' aria-current="page" style="color:var(--ink);background:var(--surface-2)"' : "";
    return '<a href="' + n[0] + '"' + cur + ">" + n[1] + "</a>";
  }).join("");

  var header =
    '<header class="site-header"><div class="container nav-wrap">' +
    '<a class="brand" href="index">' + MARK + '<span class="brand-name">Datalys</span></a>' +
    '<nav class="nav" aria-label="Navigation principale">' + links + "</nav>" +
    '<button id="themeToggle" class="theme-toggle" type="button" aria-label="Basculer le thème" title="Thème clair / sombre"></button>' +
    '<a class="btn btn-sm btn-primary nav-cta" href="login">Espace client</a>' +
    "</div></header>";

  var footer =
    '<footer class="site-footer"><div class="container footer-grid">' +
    '<div class="footer-brand"><a class="brand" href="index">' + MARK +
    '<span class="brand-name">Datalys</span></a>' +
    "<p>Plateforme française d'analyse et de visualisation de données. La donnée, enfin lisible.</p>" +
    '<div class="social">' +
    '<a href="https://www.linkedin.com" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.5 8h4V24h-4zM8 8h3.8v2.2h.05c.53-1 1.8-2.2 3.7-2.2 4 0 4.75 2.6 4.75 6V24h-4v-6.3c0-1.5 0-3.4-2.1-3.4s-2.4 1.6-2.4 3.3V24H8z"/></svg></a>' +
    '<a href="https://www.twitter.com" aria-label="X"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2H22l-7.3 8.3L23 22h-6.5l-5-6.6L5.7 22H2.5l7.8-8.9L1.7 2h6.7l4.6 6.1zm-1.1 18h1.8L7.3 3.8H5.4z"/></svg></a>' +
    '<a href="https://www.facebook.com" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 22v-8h2.7l.4-3H13V9c0-.9.3-1.5 1.6-1.5H16V4.8c-.3 0-1.2-.1-2.2-.1-2.3 0-3.8 1.4-3.8 3.9V11H7.5v3H10v8z"/></svg></a>' +
    "</div></div>" +
    '<div><h4>Entreprise</h4><a href="about">À propos</a><a href="team">Équipe</a><a href="careers">Carrières</a><a href="projects">Projets</a></div>' +
    '<div><h4>Ressources</h4><a href="services">Services</a><a href="dev">Développeurs</a><a href="support">Support</a><a href="faq">FAQ</a></div>' +
    '<div><h4>Légal</h4><a href="privacy">Confidentialité</a><a href="term">Conditions d\'utilisation</a><a href="contact">Contact</a></div>' +
    "</div>" +
    '<div class="footer-bottom"><div class="container">' +
    "<span>&copy; 2026 Datalys SAS. Tous droits réservés.</span>" +
    "<span>Angoulême · Paris · contact@datalys.fr</span>" +
    "</div></div></footer>";

  document.body.insertAdjacentHTML("afterbegin", header);
  document.body.insertAdjacentHTML("beforeend", footer);

  var SUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"/></svg>';
  var MOON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
  var tt = document.getElementById("themeToggle");
  function paintTheme() { if (tt && window.DatalysTheme) tt.innerHTML = DatalysTheme.current() === "dark" ? SUN : MOON; }
  if (tt) {
    paintTheme();
    tt.addEventListener("click", function () { if (window.DatalysTheme) DatalysTheme.toggle(); paintTheme(); });
    document.addEventListener("datalys-theme-change", paintTheme);
  }
})();
