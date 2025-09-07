const projects = [
  {
    title: "Portfolio Pokédex",
    description:
      "Mon portfolio personnel avec animations Pokémon, Dark Mode et carte de profil interactive.",
    tech: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    link: "https://charlene631.github.io/portfolio/",
    image: "https://via.placeholder.com/400x250/667eea/ffffff?text=Portfolio+Pokédex"
  },
  {
    title: "Site de rencontre +50",
    description:
      "Site dynamique et interactif de début de formation. Projet en cours d'évolution.",
    tech: ["HTML5", "CSS3", "JavaScript"],
    link: "https://charlene631.github.io/site-de-rencontre/",
    image: "https://via.placeholder.com/400x250/667eea/ffffff?text=Site+de+rencontre+50"
  },
  {
    title: "accessiWeb",
    description:
      "App React moderne avec composants réutilisables et interactions dynamiques.",
    tech: ["Node.js", "React", "CSS", "JavaScript", "framework", "MySql"],
    link: "https://accessi-web-khaki.vercel.app/",
    image: "https://via.placeholder.com/400x250/667eea/ffffff?text=accessiWeb"
  }
];

function displayProjects() {
  const container = document.getElementById("projects");
  if (!container) return console.error("Conteneur #projets introuvable");

  const cardsHTML = projects
    .map(proj => `
      <div class="project-card" data-category="frontend">
        <div class="project-image">
          <img src="${proj.image}" alt="${proj.title}">
          <div class="project-overlay">
            <div class="project-actions">
              <a href="${proj.link}" class="action-btn" target="_blank" aria-label="Voir le projet">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <h3>${proj.title}</h3>
        <p>${proj.description}</p>
        <div class="tech-stack">
          ${proj.tech.map(t => `<span class="badge tech-badge">${t}</span>`).join("")}
        </div>
      </div>
    `).join("");

  container.innerHTML = cardsHTML;
}

window.addEventListener("DOMContentLoaded", displayProjects);
