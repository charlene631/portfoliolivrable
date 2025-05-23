// Gestion du thème dark mode avec localstorage et écouteur d'évènement au bouton
function saveTheme(theme) { //Cette fonction prend un thème en argument, applique ce thème au corps du document, et stocke le thème dans localStorage
  document.body.className = theme;
  localStorage.setItem('theme', theme);
}

function toggleTheme() { // Cette fonction récupère le thème actuel du corps du document, bascule vers le thème opposé, et utilise saveTheme pour appliquer et stocker le nouveau thème
  const current = document.body.className;
  const next = current === "dark" ? "light" : "dark";
  saveTheme(next);
}

window.onload = () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  saveTheme(savedTheme);

  // Ajouter un écouteur d'événement au bouton
  document.getElementById('darkToggle').addEventListener('click', toggleTheme);
}; // Un écouteur d'événement est ajouté au bouton pour appeler toggleTheme lorsque le bouton est cliqué

// Importation du module burger.js
import { createBurgerMenu } from './burger.js';
createBurgerMenu();

// Liens du menu navigation pour accéder facilement à une section avec écouteur d'évènement sur les liens et les boutons avec un scroll
document.getElementById('profilLink')?.addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('profilSection')?.scrollIntoView({ behavior: 'smooth' }); // Récupération de l'id, écouteur d'évènement et défilement progressif
});

document.getElementById('parcoursLink')?.addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('parcours')?.scrollIntoView({ behavior: 'smooth' }); // Récupération de l'id, écouteur d'évènement et défilement progressif
});

document.getElementById('projetsLink')?.addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('projets')?.scrollIntoView({ behavior: 'smooth' }); // Récupération de l'id, écouteur d'évènement et défilement progressif
});

document.getElementById('contactLink')?.addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); // Récupération de l'id, écouteur d'évènement et défilement progressif
});

// Toggle profil, bouton de basculement 
const buttonProfile = document.getElementById('showProfile');
const sectionProfile = document.getElementById('profilSection');
let isProfileVisible = false;

const expButton = document.getElementById('showExperiences');
const expSection = document.getElementById('experiencesSection');
let expVisible = false;

buttonProfile?.addEventListener('click', () => {
  isProfileVisible = !isProfileVisible;
  sectionProfile.style.display = isProfileVisible ? 'block' : 'none';
  buttonProfile.textContent = isProfileVisible ? 'Masquer mon profil' : 'Voir mon profil';
});

// Chargement des données JSON
fetch('data.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const e = data;
    const pv = Math.floor(Math.random() * 100) + 50;

    const sectionProfile = document.getElementById('profilSection');

    if (sectionProfile) { // Une condition pour  exécuter un bloc d'instructions vraies pour la carte profil style Pokémon
      sectionProfile.innerHTML = `
        <div class="card-container">
          <div class="card-flip" id="flipCard">
            <!-- Face avant -->
            <div class="card-face front custom-card">
              <span class="rare-badge">Légendaire 👑</span>
              <img src="/assets/image/20241113_153021.jpg" class="character-img" alt="Photo de profil">
              <h3>${e.nom}</h3>
              <p><strong>PV :</strong> ${pv}</p>
              <span class="badge bg-primary">Type : Front-End</span>
              <br>
              <h4>Compétences</h4>
              <br>
              <div class="d-flex flex-wrap justify-content-center gap-2">
                ${e.competences.map(skill => `
                  <span class="badge bg-success">${skill}</span>
                `).join('')}              
              </div>
              <br>
              <h4>Soft skills</h4>
              <p class="italic-text">"Curieuse et passionnée, j’aime relever les défis. Mon parcours m’a permis de développer une vraie capacité d’adaptation et une grande persévérance."</p>
            </div>

            <!-- Face arrière -->
            <div class="card-face back custom-card">
              <h3>Infos Pokédex</h3>
              <p><strong>Âge :</strong> ${e.âge} ans</p>
              <p><strong>Adresse :</strong> ${e.adresse.ville}, ${e.adresse.rue}</p>
              <h4>Intérêts</h4>
              <div class="d-flex flex-wrap justify-content-center gap-2">
                ${e.interets.map(interet => `
                  <span class="badge bg-warning text-dark">${interet}</span>
                `).join('')}
              </div>
              <h4 class="mt-3">Évolution</h4>
              <img src="/assets/image/lunala.png" class="evolution-img" alt="Lunala">
              <p>Prochaine évolution : Lunala</p>
              <p class="italic-text">"Curieuse et passionnée, j’aime relever les défis. Mon parcours m’a permis de développer une vraie capacité d’adaptation et une grande persévérance."</p>
              <button class="return-btn">Retour</button>
              </div>
          </div>
        </div>
      `;

      // Gestion du flip de la carte
      const flipCard = document.getElementById('flipCard');
      if (flipCard) {
        flipCard.addEventListener('click', (e) => {
          if (!e.target.classList.contains('return-btn')) {
            flipCard.classList.toggle('flipped');
          }
        });
      }

      // Bouton retour sur la carte (UX => pour faciliter la navigation visuelle de l'utilisateur)
      sectionProfile.addEventListener('click', (e) => {
        if (e.target.classList.contains('return-btn')) {
          flipCard.classList.remove('flipped');
        }
      });
    }

    // Section parcours
    expButton?.addEventListener('click', () => {
      expVisible = !expVisible;
      expSection.style.display = expVisible ? 'block' : 'none';
      expButton.textContent = expVisible ? 'Masquer mes expériences' : 'Mes expériences';

      if (expVisible) { // Condition pour éxecuter un bloc d'instructions pour le tableau d'éxpériences professionnelles
        expSection.innerHTML = `
          <h3>Parcours professionnel</h3>
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Poste</th>
                <th>Entreprise</th>
                <th>Période</th>
                <th>Détails</th>
              </tr>
            </thead>
            <tbody>
              ${e.parcours.map(exp => `
                <tr>
                  <td>${exp.poste}</td>
                  <td>${exp.entreprise || 'Non renseigné'}</td>
                  <td>${exp.periode || 'Non renseigné'}</td>
                  <td>${exp.details || 'Non renseigné'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        `;
      }
    });
  })
  .catch(error => {
    console.error("Erreur de chargement du fichier JSON:", error);
    sectionProfile.innerHTML = "<p>Impossible de charger le profil pour le moment.</p>";
  });







