const currentYear = document.querySelector(".current__year__footer");

const date = new Date();

currentYear.textContent = date.getFullYear();


// ============= 
const hambergur = document.querySelector(".hambergur");

const sidebar_menu = document.querySelector(".menu__container");

hambergur.addEventListener("click", ()=>{
    sidebar_menu.classList.toggle("show_sidebar_menu");
});