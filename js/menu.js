let menuBtn = document.querySelector(".menuBtn");
let sideMenu = document.querySelector(".sideMenu-container");
menuBtn.addEventListener("click", () => {
    sideMenu.classList.toggle("open");
  });