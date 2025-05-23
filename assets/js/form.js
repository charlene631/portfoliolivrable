// form.js
function handleFormSubmit(event) {
    event.preventDefault(); // Empêche le rechargement de la page

    const formData = new FormData();
    formData.append('email', document.getElementById('email').value);
    formData.append('message', document.getElementById('message').value);

    //const fileInput = document.getElementById('file'); // désactivé temporairement
    //if (fileInput.files.length > 0) {
        //formData.append('file', fileInput.files[0]);
    }

    // Valider les entrées
    if (!formData.get('email') || !formData.get('message')) {
        alert('Veuillez remplir tous les champs.');
        return;
    }

    // Envoyer les données du formulaire à Formspree
    fetch('https://formspree.io/f/mjkwdjye', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        // Afficher un message de confirmation dans la page
        const confirmationMessage = document.createElement('p');
        confirmationMessage.textContent = 'Merci pour votre message!';
        confirmationMessage.style.color = 'green';
        document.getElementById('contactForm').appendChild(confirmationMessage);
        document.getElementById('contactForm').reset(); // Réinitialiser le formulaire
    })
    .catch((error) => {
        console.error('Error:', error);
        // Afficher un message d'erreur dans la page
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Erreur lors de l\'envoi du message.';
        errorMessage.style.color = 'red';
        document.getElementById('contactForm').appendChild(errorMessage);
    });
//}

document.getElementById('contactForm').addEventListener('submit', handleFormSubmit);
