/* menu de navegação */
/* Expressão de função chamada imediatamente. Usando a função de seta. */

(() => {
  const hamburgerBtn = document.querySelector(".hamburger-btn"),
    navMenu = document.querySelector(".nav-menu"),
    closeNavBtn = navMenu.querySelector(".close-nav-menu");

  hamburgerBtn.addEventListener("click", showNavMenu);
  closeNavBtn.addEventListener("click", hideNavMenu);

  function showNavMenu() {
    navMenu.classList.add("open");
    bodyScrollingToggle();
  }

  function hideNavMenu() {
    navMenu.classList.remove("open");
    fadeOutEffect();
    bodyScrollingToggle();
  }

  function fadeOutEffect() {
    document.querySelector(".fade-out-effect").classList.add("active");
    setTimeout(() => {
      document.querySelector(".fade-out-effect").classList.remove("active");
    }, 300);
  }

  // anexar um manipulador de eventos ao documento
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("link-item")) {
      /* certifique-se de que event.target.hash tenha um valor antes de substituir o comportamento padrão */
      if (event.target.hash !== "") {
        // evita o comportamento padrão do clique de âncora
        event.preventDefault();
        const hash = event.target.hash;
        // desativar 'section' ativa existente
        document.querySelector(".section.active").classList.add("hide");
        document.querySelector(".section.active").classList.remove("active");
        // ativar nova 'section'
        document.querySelector(hash).classList.add("active");
        document.querySelector(hash).classList.remove("hide");
        /* desativar o menu de navegação ativo existente 'link-item' */
        navMenu
          .querySelector(".active")
          .classList.add("outer-shadow", "hover-in-shadow");
        navMenu
          .querySelector(".active")
          .classList.remove("active", "inner-shadow");
        /* se clicado, o 'link-item' está contido no menu de navegação */
        if (navMenu.classList.contains("open")) {
          // ativar novo menu de navegação 'link-item'
          event.target.classList.add("active", "inner-shadow");
          event.target.classList.remove("outer-shadow", "hover-in-shadow");
          // ocultar menu de navegação
          hideNavMenu();
        } else {
          let navItems = navMenu.querySelectorAll(".link-item");
          navItems.forEach((item) => {
            if (hash === item.hash) {
              // ativar novo menu de navegação 'link-item'
              item.classList.add("active", "inner-shadow");
              item.classList.remove("outer-shadow", "hover-in-shadow");
            }
          });
          fadeOutEffect();
        }
        // adicionar hash (#) ao url
        window.location.hash = hash;
      }
    }
  });
})();

/* Sobre as guias da section */
/* Expressão de função chamada imediatamente. Usando a função de seta. */

(() => {
  const aboutSection = document.querySelector(".about-section"),
    tabsContainer = document.querySelector(".about-tabs");

  tabsContainer.addEventListener("click", (event) => {
    // se event.target contém a classe 'item de tabulação' e não contém a classe 'active'
    if (
      event.target.classList.contains("tab-item") &&
      !event.target.classList.contains("active")
    ) {
      const target = event.target.getAttribute("data-target");
      // desativar ativo existente 'tab-item'
      tabsContainer
        .querySelector(".active")
        .classList.remove("outer-shadow", "active");
      // ativar novo 'tab-item'
      event.target.classList.add("active", "outer-shadow");
      // desativar ativo existente 'tab-content'
      aboutSection
        .querySelector(".tab-content.active")
        .classList.remove("active");
      // ativar novo 'tab-content'
      aboutSection.querySelector(target).classList.add("active");
    }
  });
})();

function bodyScrollingToggle() {
  document.body.classList.toggle("hidden-scrolling");
}

/* Filtro de portfólio e popup */

(() => {
  const filterContainer = document.querySelector(".portfolio-filter"),
    portfolioItemsContainer = document.querySelector(".portfolio-items"),
    portfolioItems = document.querySelectorAll(".portfolio-item"),
    popup = document.querySelector(".portfolio-popup"),
    prevBtn = popup.querySelector(".pp-prev"),
    nextBtn = popup.querySelector(".pp-next"),
    closeBtn = popup.querySelector(".pp-close"),
    projectDetailsContainer = popup.querySelector(".pp-details"),
    projectDetailsBtn = popup.querySelector(".pp-project-details-btn");
  let itemIndex, slideIndex, screenshots;

  /* filtrar itens do portfólio */
  /* filterContainer.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("filter-item") &&
      !event.target.classList.contains("active")
    ) {
      // desativar ativo existente 'filter-item
      filterContainer
        .querySelector(".active")
        .classList.remove("outer-shadow", "active");
      // ativar novo 'filter item'
      event.target.classList.add("active", "outer-shadow");
      const target = event.target.getAttribute("data-target");
      portfolioItems.forEach((item) => {
        if (target === item.getAttribute("data-category") || target === "all") {
          item.classList.remove("hide");
          item.classList.add("show");
        } else {
          item.classList.remove("show");
          item.classList.add("hide");
        }
      });
    }
  }); */

  /* portfolioItemsContainer.addEventListener("click", (event) => {
    if (event.target.closest(".portfolio-item-inner")) {
      const portfolioItem = event.target.closest(".portfolio-item-inner")
        .parentElement;
      // obter o portfolioItem index
      itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(
        portfolioItem
      );
      screenshots = portfolioItems[itemIndex]
        .querySelector(".portfolio-item-img img")
        .getAttribute("data-screenshots");
      // converter capturas de tela em array
      screenshots = screenshots.split(",");
      if (screenshots.length === 1) {
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
      } else {
        prevBtn.style.display = "block";
        nextBtn.style.display = "block";
      }
      slideIndex = 0;
      popupToggle();
      popupSlideshow();
      popupDetails();
    }
  }); */

  closeBtn.addEventListener("click", () => {
    popupToggle();
    if (projectDetailsContainer.classList.contains("active")) {
      popupDetailsToggle();
    }
  });

  function popupToggle() {
    popup.classList.toggle("open");
    bodyScrollingToggle();
  }

  function popupSlideshow() {
    const imgSrc = screenshots[slideIndex];
    const popupImg = popup.querySelector(".pp-img");
    /* Ative o carregador até que o popupImg seja carregado */
    popup.querySelector(".pp-loader").classList.add("active");
    popupImg.src = imgSrc;
    popupImg.onload = () => {
      // desative o carregador após o popupImg ser carregado
      popup.querySelector(".pp-loader").classList.remove("active");
    };
    popup.querySelector(".pp-counter").innerHTML =
      slideIndex + 1 + " of " + screenshots.length;
  }

  // próximo slide
  nextBtn.addEventListener("click", () => {
    if (slideIndex === screenshots.length - 1) {
      slideIndex = 0;
    } else {
      slideIndex++;
    }
    popupSlideshow();
  });

  // slide anterior
  prevBtn.addEventListener("click", () => {
    if (slideIndex === 0) {
      slideIndex = screenshots.length - 1;
    } else {
      slideIndex--;
    }
    popupSlideshow();
  });

  function popupDetails() {
    // obter os detalhes do projeto
    const details = portfolioItems[itemIndex].querySelector(
      ".portfolio-item-details"
    ).innerHTML;
    // definir os detalhes do projeto
    popup.querySelector(".pp-project-details").innerHTML = details;
    // pegue o título do projeto
    const title = portfolioItems[itemIndex].querySelector(
      ".portfolio-item-title"
    ).innerHTML;
    // defina o título do projeto
    popup.querySelector(".pp-title h2").innerHTML = title;
    // pegue a categoria do projeto
    const category = portfolioItems[itemIndex].getAttribute("data-category");
    // definir a categoria do projeto
    popup.querySelector(".pp-project-category").innerHTML = category
      .split("-")
      .join(" ");
  }

  projectDetailsBtn.addEventListener("click", () => {
    popupDetailsToggle();
  });

  function popupDetailsToggle() {
    if (projectDetailsContainer.classList.contains("active")) {
      projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
      projectDetailsBtn.querySelector("i").classList.add("fa-plus");
      projectDetailsContainer.classList.remove("active");
      projectDetailsContainer.style.maxHeight = 0 + "px";
    } else {
      projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
      projectDetailsBtn.querySelector("i").classList.add("fa-minus");
      projectDetailsContainer.classList.add("active");
      projectDetailsContainer.style.maxHeight =
        projectDetailsContainer.scrollHeight + "px";
      popup.scrollTo(0, projectDetailsContainer.offsetTop);
    }
  }
})();

/* Controle deslizante de depoimento */
/* Expressão de função imediatamente chamada - usando a função de seta */

/* (() => {
  const sliderContainer = document.querySelector(".testi-slider-container"),
    slides = sliderContainer.querySelectorAll(".testi-item"),
    slideWidth = sliderContainer.offsetWidth,
    prevBtn = document.querySelector(".testi-slider-nav .prev"),
    nextBtn = document.querySelector(".testi-slider-nav .next"),
    activeSlide = sliderContainer.querySelector(".testi-item.active");
  let slideIndex = Array.from(activeSlide.parentElement.children).indexOf(
    activeSlide
  );

  // definir a largura de todos os slides
  slides.forEach((slide) => {
    slide.style.width = slideWidth + "px";
  });
  // definir a largura do sliderContainer
  sliderContainer.style.width = slideWidth * slides.length + "px";

  nextBtn.addEventListener("click", () => {
    if (slideIndex === slides.length - 1) {
      slideIndex = 0;
    } else {
      slideIndex++;
    }
    slider();
  });

  prevBtn.addEventListener("click", () => {
    if (slideIndex === 0) {
      slideIndex = slides.length - 1;
    } else {
      slideIndex--;
    }
    slider();
  });

  function slider() {
    // desativar ativo existente slide
    sliderContainer
      .querySelector(".testi-item.active")
      .classList.remove("active");
    // ativar novo slide
    slides[slideIndex].classList.add("active");
    sliderContainer.style.marginLeft = -(slideWidth * slideIndex) + "px";
  }
  slider();
})(); */

/* Ocultar todas as seções, exceto as ativas */

/* Expressão de função imediatamente chamada - usando a função de seta */
// (() => {
//   const sections = document.querySelectorAll(".section");
//   sections.forEach((section) => {
//     if (!section.classList.contains("active")) {
//       section.classList.add("hide");
//     }
//   })

// })();

window.addEventListener("load", () => {
  // preloader
  document.querySelector(".preloader").classList.add("fade-out");
  setTimeout(() => {
    document.querySelector(".preloader").style.display = "none";
  }, 600)
})

/* Modal */

var modal = document.getElementById("modal");

var modal_content = document.getElementsByClassName("modal-content")[0];

var closeModalBtn = document.getElementsByClassName("close")[0];

closeModalBtn.onclick = function () {
  closeModal();
}

window.onclick = function (event) {
  if (event.target == modal) {
    closeModal();
  }
}

function openModal() {
  modal.classList.add("fade-out");
  modal.style.display = "block";
  modal.classList.remove("fade-out");
}

function closeModal() {
  modal_content.classList.add("slide-out");
  setTimeout(function () {
    modal.style.display = "none";
    modal_content.classList.remove("slide-out");
  }, 500);
}

function modalTitle(title) {
  document.getElementById('modal-title').innerHTML = title;
}

function modalText(text) {
  document.getElementById('modal-text').innerHTML = text;
}

/* Modal fim */