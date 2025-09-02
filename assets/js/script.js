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
    buttonProfile.classList.add("active");
    isProfileVisible = true;

    fetch("data.json")
      .then(response => {
        if (!response.ok) throw new Error("Impossible de charger le fichier JSON");
        return response.json();
      })
      .then(data => {
        const pv = Math.floor(Math.random() * 100) + 50;

        sectionProfile.innerHTML = `
          <div class="card-container">
            <div class="card-flip" id="flipCard">
              <!-- FRONT -->
              <div class="card-face front">
                <h3 class="card-front-name">${data.nom}</h3>
                <span class="card-front-type">Type : Front-End</span>
                <p><strong>PV :</strong> ${pv}</p>
                <div class="d-flex flex-wrap justify-content-center gap-2">
                  ${data.competences.map(skill => `<span class="skill-badge">${skill}</span>`).join("")}
                </div>
              </div>
              <!-- BACK -->
              <div class="card-face back">
                <h3>${data.nom}</h3>
                <p><strong>Âge :</strong> ${data.âge} ans</p>
                <p><strong>Adresse :</strong> ${data.adresse.ville}, ${data.adresse.rue}</p>
                <h4>Intérêts</h4>
                <div class="d-flex flex-wrap justify-content-center gap-2">
                  ${data.interets.map(i => `<span class="info-badge">${i}</span>`).join("")}
                </div>
                <h4 class="mt-3">Évolution</h4>
                <p class="italic-text">"Curieuse et passionnée, j'aime relever les défis. Mon parcours m'a permis de développer une vraie capacité d'adaptation et une grande persévérance."</p>
                <p>Prochaine évolution : Mewtwo</p>
                <button class="return-btn closeCardBtn" type="button" aria-label="Fermer la carte de profil">Retour</button>
              </div>
            </div>
          </div>
        `;

        const flipCard = document.getElementById("flipCard");

        // Flip au clic sauf si c'est le bouton retour
        flipCard?.addEventListener("click", e => {
          if (!e.target.classList.contains("return-btn")) flipCard.classList.toggle("flipped");
        });

        // Fermer la carte
        sectionProfile.addEventListener("click", e => {
          if (e.target.classList.contains("return-btn")) {
            const cardContainer = document.querySelector(".card-container");
            cardContainer.classList.add("ranged"); // effet visuel avant disparition
            setTimeout(() => {
              sectionProfile.innerHTML = "";
              sectionProfile.style.display = "none";
              isProfileVisible = false;
              buttonProfile.textContent = "Voir mon profil";
              buttonProfile.classList.remove("active");
            }, 500);
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
    buttonProfile.classList.remove("active");
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
