// Récupérer le bouton
const backToTopButton = document.getElementById('backToTop');

// Fonction pour faire défiler vers le haut
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Ajouter l'événement click au bouton
backToTopButton.addEventListener('click', scrollToTop);

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleFab = document.getElementById('themeToggleFab');
    const lightIcon = document.querySelector('.theme-icon-light');
    const darkIcon = document.querySelector('.theme-icon-dark');
    const fabLightIcon = document.querySelector('.fab-icon.light');
    const fabDarkIcon = document.querySelector('.fab-icon.dark');
    
    // Vérifier qu'au moins un bouton existe
    if (themeToggle || themeToggleFab) {
        
        // Récupérer le thème sauvegardé ou définir par défaut
        const savedTheme = localStorage.getItem('theme') || 'light';
        
        // Appliquer le thème initial
        setTheme(savedTheme);
        
        // Ajouter l'événement click aux boutons disponibles
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }
        
        if (themeToggleFab) {
            themeToggleFab.addEventListener('click', toggleTheme);
        }
        
        // Fonction pour basculer le thème
        function toggleTheme() {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        }
        
        // Fonction pour définir le thème
        function setTheme(theme) {
            // Appliquer l'attribut data-theme sur l'élément html
            document.documentElement.setAttribute('data-theme', theme);
            
            // Sauvegarder dans localStorage
            localStorage.setItem('theme', theme);
            
            // Mettre à jour le bouton principal si il existe
            if (themeToggle) {
                themeToggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
                
                if (lightIcon && darkIcon) {
                    if (theme === 'dark') {
                        lightIcon.style.display = 'none';
                        darkIcon.style.display = 'inline';
                        themeToggle.setAttribute('title', 'Passer au thème clair');
                        themeToggle.setAttribute('aria-label', 'Passer au thème clair');
                    } else {
                        lightIcon.style.display = 'inline';
                        darkIcon.style.display = 'none';
                        themeToggle.setAttribute('title', 'Passer au thème sombre');
                        themeToggle.setAttribute('aria-label', 'Passer au thème sombre');
                    }
                }
            }
            
            // Mettre à jour le bouton FAB si il existe
            if (themeToggleFab) {
                themeToggleFab.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
                
                if (fabLightIcon && fabDarkIcon) {
                    if (theme === 'dark') {
                        fabLightIcon.style.display = 'none';
                        fabDarkIcon.style.display = 'inline';
                        themeToggleFab.setAttribute('title', 'Passer au thème clair');
                        themeToggleFab.setAttribute('aria-label', 'Passer au thème clair');
                    } else {
                        fabLightIcon.style.display = 'inline';
                        fabDarkIcon.style.display = 'none';
                        themeToggleFab.setAttribute('title', 'Passer au thème sombre');
                        themeToggleFab.setAttribute('aria-label', 'Passer au thème sombre');
                    }
                }
            }
        }
        
    } else {
        console.error('Aucun bouton de toggle de thème trouvé');
    }
});
