// Liste de tes projets
const projects = [
  {
    title: "Portfolio Pokédex",
    description:
      "Mon portfolio personnel avec animations Pokémon, Dark Mode et carte de profil interactive.",
    tech: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    link: "https://charlene631.github.io/portfolio/",
    image: ""
  },
  {
    title: "Site de rencontre +50",
    description:
      "Application web back-end avec Node.js et Express, gestion de base MySQL et MongoDB.",
    tech: ["HTML5", "CSS3", "JavaScript"],
    link: "#",
    image: "assets/image/project-node.png"
  },
  {
    title: "Application React",
    description:
      "App React moderne avec composants réutilisables et interactions dynamiques.",
    tech: ["React", "CSS", "JavaScript"],
    link: "#",
    image: "assets/image/project-react.png"
  }
];

// Fonction pour générer les cartes projets
function displayProjects() {
  const container = document.getElementById("projets");
  if (!container) return;

  const cardsHTML = projects
    .map(
      (proj) => `
    <div class="project-card">
      <img src="${proj.image}" alt="${proj.title}" class="project-img" />
      <h3>${proj.title}</h3>
      <p>${proj.description}</p>
      <div class="tech-stack">
        ${proj.tech.map((t) => `<span class="badge tech-badge">${t}</span>`).join("")}
      </div>
      <a href="${proj.link}" target="_blank" class="project-link">Voir le projet</a>
    </div>
  `
    )
    .join("");

  container.innerHTML = `<div class="projects-grid">${cardsHTML}</div>`;
}

// Appel de la fonction à la fin du chargement de la page
window.addEventListener("DOMContentLoaded", displayProjects);
