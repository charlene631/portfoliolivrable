const projects = [
  {
    title: "Écrire à la mer",
    description:
      "Application Web Node.js React MongoDB MySQL permettant aux utilisateurs d'écrire, conserver et partager des pensées sous forme de lettres ou messages. Projet en cours de développement. Réponse d'une phrase test sur le navigateur",
    tech: ["HTML", "CSS", "JavaScript", "Bootstrap", "Mongoose", "Node.js", "Express", "React", "MySQL"],
    link: "http://localhost:5000"
  },
  {
    title: "Site de rencontre +50",
    description:
      "Site dynamique et interactif de début de formation. Projet en cours d'évolution.",
    tech: ["HTML5", "CSS3", "JavaScript"],
    link: "https://charlene631.github.io/site-de-rencontre/"
  },
  {
    title: "accessiWeb",
    description:
      "App Node.js React moderne avec composants réutilisables et interactions dynamiques en cours de développement. Réponse JSON d'une API REST sur le navigateur.",
    tech: ["Node.js", "React", "CSS", "JavaScript", "MySql"],
    link: "https://accessiweb-1.onrender.com"
  }
];

function displayProjects() {
  const container = document.getElementById("projects");
  if (!container) return console.error("Conteneur #projets introuvable");

  const cardsHTML = projects
    .map(proj => `
      <div class="project-card" data-category="frontend">
        <div class="project-image">
          ${proj.title}
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
