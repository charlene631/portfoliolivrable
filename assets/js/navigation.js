document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('mobileMenuToggle');
  const menu = document.getElementById('mainNavMenu');

  // Ouvrir / fermer le menu
  toggle.addEventListener('click', () => {
    menu.classList.toggle('is-open');
    toggle.classList.toggle('active');
    toggle.setAttribute('aria-expanded', menu.classList.contains('is-open'));
  });

  // Scroll vers section et fermeture du menu
  menu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
      menu.classList.remove('is-open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
});
