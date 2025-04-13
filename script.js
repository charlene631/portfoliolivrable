document.getElementById("darkToggle").addEventListener("click", function (e) {
  e.preventDefault(); // empêche le lien de remonter la page
  document.body.classList.toggle("dark");
});

// Optionnel : gestion du formulaire (sans envoi réel)
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Merci pour votre message !");
  this.reset(); // Vide le formulaire
});
