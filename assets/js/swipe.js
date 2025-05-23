document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("swiperProjectContainer");
  console.log(container);
  

   if (!container) {
    console.error("Le conteneur swiperProjectContainer est introuvable !");
    return;
  }

  const slidesData = [ // variable de tableau d'objets des projets de développement web et web mobile pour la création du carousel
    {
      titre: "Projet Site de rencontre",
      description: "Un site dynamique en HTML/CSS/Javascript",
      image: "assets/image/accueil.png"
    },
    {
      titre: "Premier projet React",
      description: "Un petit projet interactif de compteur utilisant React et Vite",
      image: "assets/image/premierprojetreact.png"
    },
    {
      titre: "Projet Portfolio",
      description: "Un site statique incluant des animations et du dynamisme en HTML/CSS/Javascript. Le projet utilise également des bibliothèques externes telles que Bootstrap et Swipe, ainsi que des modules.",
      image: "assets/image/portfolio.png"
    }
  ];

  // Injection HTML Swiper pour créer un carousel
  container.innerHTML = `
    <div class="swiper mySwiper">
      <div class="swiper-wrapper" id="projectSlides"></div>
      <div class="swiper-pagination"></div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  `;

  const slidesWrapper = document.getElementById("projectSlides");

  slidesData.forEach(slide => {
    console.log("Chargement image :", slide.image);

    const slideElement = document.createElement("div"); // Création du carousel et importation des données de la variable
    slideElement.className = "swiper-slide";
    slideElement.innerHTML = `
      <div class="slide-content">
        <img src="${slide.image}" alt="${slide.titre}" style="max-width: 100%; border-radius: 8px;">
        <h3>${slide.titre}</h3>
        <p>${slide.description}</p>
      </div>
    `;
    slidesWrapper.appendChild(slideElement);
  });
  console.log("Slides ajoutés :", slidesWrapper.innerHTML);

  // Initialisation Swiper, du carousel avec dynamisme des slides
  new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    autoplay: {
      delay: 6000
    }
  });
  console.log("Swiper initialisé !");

});
