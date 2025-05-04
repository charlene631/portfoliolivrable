document.getElementById("darkToggle").addEventListener("click", function (e) {
  e.preventDefault();
  document.body.classList.toggle("dark");
});

// Gestion du formulaire
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Merci pour votre message !");
  this.reset();
});

// Liens du menu
const profil = document.getElementById('profil');
const projets = document.getElementById('parcours');
const maquettes = document.getElementById('projets');
const contact = document.getElementById('contact');

profil.addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('aside').scrollIntoView({ behavior: 'smooth' });
});
projets.addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('projets').scrollIntoView({ behavior: 'smooth' });
});
maquettes.addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('maquettes').scrollIntoView({ behavior: 'smooth' });
});
contact.addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
});

// Toggle profil
const button = document.getElementById('showProfile');
const section = document.getElementById('profilSection');
let isVisible = false;

button.addEventListener('click', () => {
  isVisible = !isVisible;
  section.style.display = isVisible ? 'block' : 'none';
  button.textContent = isVisible ? 'Masquer mon profil' : 'Voir mon profil';
});

// Chargement des données JSON
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const e = data[0];

    const pv = Math.floor(Math.random() * 100) + 50;
    const niveau = Math.floor(Math.random() * 50) + 10;

    // On injecte le HTML propre
    section.innerHTML = `
      <div class="card-container">
        <div class="card-flip" id="flipCard">

          <!-- Face avant -->
          <div class="card-face front custom-card mx-auto">
            <span class="rare-badge">Légendaire 👑</span>
            <img src="/assets/poissirene.png" class="card-img-top character-img" alt="Poissirène">
            <div class="card-body text-center">
              <h3 class="card-title">${e.nom}</h3>
              <p><strong>PV :</strong> ${pv}</p>
              <span class="badge bg-primary mb-2">Type : Front-End</span>
              <h3>Compétences</h3>
              ${e.competences.map(skill => `
                <div class="mb-2">
                  <span class="badge bg-success">${skill}</span>
                  <div class="progress">
                    <div class="progress-bar bg-info" style="width: ${Math.floor(Math.random() * 50 + 50)}%"></div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Dos -->
          <div class="card-face back custom-card mx-auto">
            <h3>Infos Pokédex</h3>
            <p><strong>Âge :</strong> ${e.âge} ans</p>
            <p><strong>Adresse :</strong> ${e.adresse.ville}, ${e.adresse.rue}</p>
            <p><strong>Intérêts :</strong></p>
            <div class="d-flex flex-wrap gap-2 justify-content-center">
              ${e.interets.map(interet => `
                <span class="badge bg-warning text-dark">${interet}</span>
              `).join('')}
            </div>
            <br>
            <h3>Évolution 🌊</h3>
            <img src="/assets/hypocean.png" class="evolution-img" alt="Hypocéan">
            <p>Prochaine évolution : Hypocéan</p>
            <p style="font-style: italic;">"Toujours en quête de nouveaux défis..."</p>
          </div>
        </div>
      </div>
    `;

    // Gestion du flip
    const flipCard = document.getElementById('flipCard');
    flipCard.addEventListener('click', () => {
      flipCard.classList.toggle('flipped');
    });
  })
  .catch((error) => {
    console.error("Erreur de chargement du fichier JSON:", error);
  });

  