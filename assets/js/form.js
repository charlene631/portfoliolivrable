// form.js

// Fonction pour afficher un message (succès ou erreur)
function showMessage(msg, color = "green") {
  removeMessages();
  const messageEl = document.createElement("p");
  messageEl.textContent = msg;
  messageEl.style.color = color;
  const form = document.getElementById("contactForm");
  form.appendChild(messageEl);
}

// Supprime les anciens messages pour éviter les doublons
function removeMessages() {
  const form = document.getElementById("contactForm");
  if (!form) return;
  const existingMessages = form.querySelectorAll("p");
  existingMessages.forEach((msg) => msg.remove());
}

// Fonction de traitement de l'envoi du formulaire
function handleFormSubmit(event) {
  event.preventDefault();

  const form = document.getElementById("contactForm");
  if (!form) return;

  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!email || !message) {
    showMessage("Veuillez remplir tous les champs.", "red");
    return;
  }

  const formData = new FormData();
  formData.append("email", email);
  formData.append("message", message);

  const fileInput = document.getElementById("file");
  if (fileInput && fileInput.files.length > 0) {
    formData.append("file", fileInput.files[0]);
  }

  fetch("https://formsubmit.co/ajax/6a412ce97022e91ed1a11abe3c3631a5", {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) throw new Error("Erreur lors de l'envoi du formulaire");
      return response.json();
    })
    .then(() => {
      showMessage("Merci pour votre message !");
      form.reset();
    })
    .catch(() => {
      showMessage("Erreur lors de l'envoi du message.", "red");
    });
}

// Ajout de l'écouteur d'événement si le formulaire existe
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", handleFormSubmit);
}
