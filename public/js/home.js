const currentYear = document.querySelector(".current__year__footer");

const date = new Date();

currentYear.textContent = date.getFullYear();


// ============= 
const hambergur = document.querySelector(".hambergur");

const sidebar_menu = document.querySelector(".menu__container");

hambergur.addEventListener("click", ()=>{
    sidebar_menu.classList.toggle("show_sidebar_menu");
});


var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 2,
      slideShadows: true,
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination",
    },
  });