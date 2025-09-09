document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('mainNavMenu');

  if (toggleButton && navMenu) {
    toggleButton.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open'); // ouvre/ferme le menu
      toggleButton.setAttribute('aria-expanded', isOpen);
      toggleButton.classList.toggle('active'); // animation burger
    });

    // Fermer le menu au clic sur un lien
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-open');
        toggleButton.classList.remove('active');
        toggleButton.setAttribute('aria-expanded', 'false');
      });
    });
  }
});
