// js/lang-toggle.js
document.addEventListener("DOMContentLoaded", function () {
    const langBtn = document.getElementById("lang-toggle");
  
    const translations = {
      en: {
        home: "Home",
        about: "About",
        room: "Our Room",
        gallery: "Gallery",
        blog: "Blog",
        contact: "Contact Us",
        readmore: "Read More",
      },
      fr: {
        home: "Accueil",
        about: "À propos",
        room: "Nos chambres",
        gallery: "Galerie",
        blog: "Blog",
        contact: "Contactez-nous",
        readmore: "Lire plus",
      },
    };
  
    let currentLang = "en";
  
    langBtn.addEventListener("click", function () {
      currentLang = currentLang === "en" ? "fr" : "en";
  
      document.querySelector(".nav-home").textContent = translations[currentLang].home;
      document.querySelector(".nav-about").textContent = translations[currentLang].about;
      document.querySelector(".nav-room").textContent = translations[currentLang].room;
      document.querySelector(".nav-gallery").textContent = translations[currentLang].gallery;
      document.querySelector(".nav-blog").textContent = translations[currentLang].blog;
      document.querySelector(".nav-contact").textContent = translations[currentLang].contact;
  
      const readMoreBtn = document.querySelector(".read-more-btn");
      if (readMoreBtn) {
        readMoreBtn.textContent = translations[currentLang].readmore;
      }
  
      // Optional: Change button text/icon
      langBtn.textContent = currentLang === "en" ? "FR" : "EN";
    });
  });
  