document.addEventListener("DOMContentLoaded", () => {
  // ================= Dark Mode =================
  function saveTheme(theme) {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }

  function toggleTheme() {
    const current = document.body.className;
    const next = current === "dark" ? "light" : "dark";
    saveTheme(next);
  }

  const savedTheme = localStorage.getItem("theme") || "light";
  saveTheme(savedTheme);

  document.getElementById("darkToggle")?.addEventListener("click", toggleTheme);

  // ================= Scroll navigation =================
  const navLinks = [
    { id: "profilLink", target: "profilSection" },
    { id: "parcoursLink", target: "parcours" },
    { id: "projetsLink", target: "projets" },
    { id: "contactLink", target: "contact" },
  ];

  navLinks.forEach((link) => {
    document.getElementById(link.id)?.addEventListener("click", (e) => {
      e.preventDefault();
      document
        .getElementById(link.target)
        ?.scrollIntoView({ behavior: "smooth" });
    });
  });

// ================= Toggle Profil =================
const buttonProfile = document.getElementById("showProfile");
const sectionProfile = document.getElementById("profilSection");
let isProfileVisible = false;

buttonProfile?.addEventListener("click", () => {
  if (!isProfileVisible) {
    sectionProfile.style.display = "block";
    buttonProfile.textContent = "Masquer mon profil";
    isProfileVisible = true;

    fetch("data.json")
      .then(res => res.json())
      .then(data => {
        sectionProfile.innerHTML = `
        <div class="card-container">
          <div class="card-flip" id="flipCard">
            <div class="card-face front">
              <h3 class="card-front-name">${data.nom}</h3>
              <span class="card-front-type">Front-End</span>
              <div class="skills-container">
                ${data.competences.map(skill => `<span class="skill-badge">${skill}</span>`).join("")}
              </div>
            </div>
            <div class="card-face back">
              <p><strong>Âge :</strong> ${data.âge} ans</p>
              <p><strong>Ville :</strong> ${data.adresse.ville}</p>
              <p><strong>Rue :</strong> ${data.adresse.rue}</p>
              <h4>Intérêts</h4>
              <div>
                ${data.interets.map(i => `<span class="info-badge">${i}</span>`).join("")}
              </div>
              <p class="mt-2"><em>"Curieuse et passionnée, j'aime relever les défis et apprendre constamment."</em></p>
              <button class="return-btn" type="button">Retour</button>
            </div>
          </div>
        </div>
        `;

        const flipCard = document.getElementById("flipCard");
        flipCard?.addEventListener("click", e => {
          if (!e.target.classList.contains("return-btn")) flipCard.classList.toggle("flipped");
        });

        sectionProfile.addEventListener("click", e => {
          if (e.target.classList.contains("return-btn")) {
            sectionProfile.innerHTML = "";
            sectionProfile.style.display = "none";
            isProfileVisible = false;
            buttonProfile.textContent = "Voir mon profil";
          }
        });
      })
      .catch(err => {
        console.error(err);
        sectionProfile.innerHTML = "<p>Impossible de charger le profil pour le moment.</p>";
      });

  } else {
    sectionProfile.innerHTML = "";
    sectionProfile.style.display = "none";
    isProfileVisible = false;
    buttonProfile.textContent = "Voir mon profil";
  }
});

  // ================= Toggle expériences =================
  const expButton = document.getElementById("showExperiences");
  const expSection = document.getElementById("experiencesSection");
  let expVisible = false;

  expButton?.addEventListener("click", () => {
    expVisible = !expVisible;
    expSection.style.display = expVisible ? "block" : "none";
    expButton.textContent = expVisible
      ? "Masquer mes expériences"
      : "Mes expériences";

    if (expVisible) {
      fetch("data.json")
        .then((response) => response.json())
        .then((data) => {
          expSection.innerHTML = `
            <h3>Parcours professionnel</h3>
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Poste</th>
                  <th>Entreprise</th>
                  <th>Période</th>
                  <th>Détails</th>
                </tr>
              </thead>
              <tbody>
                ${data.parcours
                  .map(
                    (exp) => `
                  <tr>
                    <td>${exp.poste}</td>
                    <td>${exp.entreprise || "Non renseigné"}</td>
                    <td>${exp.periode || "Non renseigné"}</td>
                    <td>${exp.details || "Non renseigné"}</td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>
          `;
        })
        .catch((err) => {
          console.error(err);
          expSection.innerHTML =
            "<p>Impossible de charger les expériences.</p>";
        });
    }
  });
});
