// Gestion du thème dark mode avec localstorage et écouteur d'évènement au bouton
function saveTheme(theme) {
  document.body.className = theme;
  localStorage.setItem("theme", theme);
}

function toggleTheme() {
  const current = document.body.className;
  const next = current === "dark" ? "light" : "dark";
  saveTheme(next);
}

window.onload = () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  saveTheme(savedTheme);

  document.getElementById("darkToggle")?.addEventListener("click", toggleTheme);
};

// Importation du module burger.js
import { createBurgerMenu } from "./burger.js";
createBurgerMenu();

// Liens navigation avec scroll
document.getElementById("profilLink")?.addEventListener("click", (e) => {
  e.preventDefault();
  document
    .getElementById("profilSection")
    ?.scrollIntoView({ behavior: "smooth" });
});
document.getElementById("parcoursLink")?.addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("parcours")?.scrollIntoView({ behavior: "smooth" });
});
document.getElementById("projetsLink")?.addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("projets")?.scrollIntoView({ behavior: "smooth" });
});
document.getElementById("contactLink")?.addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
});

// Toggle profil
//const openSound = new Audio("assets/sound/Pokemon out.mp3");
//const closeSound = new Audio("assets/sound/Pokemon return.mp3");

const buttonProfile = document.getElementById("showProfile");
const sectionProfile = document.getElementById("profilSection");
let isProfileVisible = false;

buttonProfile?.addEventListener("click", () => {
  if (!isProfileVisible) {
    sectionProfile.style.display = "block";
    buttonProfile.innerHTML = "Masquer mon profil";
    buttonProfile.classList.add("active");
    isProfileVisible = true;

    //openSound.play(); // Son à l'ouverture

    fetch("data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const e = data;
        const pv = Math.floor(Math.random() * 100) + 50;

        sectionProfile.innerHTML = `
          <div class="card-container" >
            <div class="card-flip" id="flipCard">
              <div class="card-face front custom-card" >                                              
                <p><strong>PV :</strong> ${pv}</p>
                <span class="badge bg-primary">Type : Front-End</span>
                <h4>Compétences</h4><br>
                <div class="d-flex flex-wrap justify-content-center gap-2">
                  ${e.competences
                    .map(
                      (skill) =>
                        `<span class="badge bg-success">${skill}</span>`
                    )
                    .join("")}
                </div>
                
              </div>
              <div class="card-face back custom-card">
                <h3>${e.nom}</h3>
                <p><strong>Âge :</strong> ${e.âge} ans</p>
                <p><strong>Adresse :</strong> ${e.adresse.ville}, ${
          e.adresse.rue
        }</p>
                <h4>Intérêts</h4>
                <div class="d-flex flex-wrap justify-content-center gap-2">
                  ${e.interets
                    .map(
                      (interet) =>
                        `<span class="badge bg-warning text-dark">${interet}</span>`
                    )
                    .join("")}
                </div>
                <h4 class="mt-3">Évolution</h4>
                <p class="italic-text">"Curieuse et passionnée, j'aime relever les défis. Mon parcours m'a permis de développer une vraie capacité d'adaptation et une grande persévérance."</p>                
                <img src="assets/image/mewblue.webp" class="evolution-img" alt="Mew">
                <p>Prochaine évolution : Mew</p>
                <button class="return-btn closeCardBtn" type="button" aria-label="Fermer la carte de profil">Retour</button>
              </div>
            </div>
          </div>
        `;

        const flipCard = document.getElementById("flipCard");
        flipCard?.addEventListener("click", (e) => {
          if (!e.target.classList.contains("return-btn")) {
            flipCard.classList.toggle("flipped");
          }
        });

        sectionProfile.addEventListener("click", (e) => {
          if (e.target.classList.contains("return-btn")) {
            const cardContainer = document.querySelector(".card-container");
            cardContainer.classList.add("ranged");

            // closeSound.play(); // Son à la fermeture

            setTimeout(() => {
              sectionProfile.innerHTML = "";
              sectionProfile.style.display = "none";
              isProfileVisible = false;
              buttonProfile.textContent = "Voir mon profil";
            }, 500);
          }
        });
      })
      .catch((error) => {
        console.error("Erreur de chargement du fichier JSON:", error);
        sectionProfile.innerHTML =
          "<p>Impossible de charger le profil pour le moment.</p>";
      });
  } else {
    // closeSound.play(); // Son à la fermeture
    sectionProfile.innerHTML = "";
    sectionProfile.style.display = "none";
    isProfileVisible = false;
    buttonProfile.innerHTML = "Voir mon profil";
    buttonProfile.classList.remove("active");
  }
});

// Toggle expériences
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
      .then((e) => {
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
              ${e.parcours
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
      .catch((error) => {
        console.error(
          "Erreur de chargement du fichier JSON pour les expériences:",
          error
        );
        expSection.innerHTML = "<p>Impossible de charger les expériences.</p>";
      });
  }
});
