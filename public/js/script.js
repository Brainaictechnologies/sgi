/*=======togglee icon media screen==========*/
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".nav-components");
let reveal = document.querySelector("#reveal");
let shown = document.querySelector("#shown");
let drop = document.querySelector("#drop");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-message-square-x");
  navbar.classList.toggle("active");
};

reveal.onclick = () => {
  reveal.classList.toggle("active");
};

shown.onclick = () => {
  shown.classList.toggle("active");
};

drop.onclick = () => {
  drop.classList.toggle("active");
};

window.addEventListener("load", function () {
  this.setTimeout(function open(event) {
    document.querySelector(".pop-up-card").style.display = "block";
  }, 1000);
});

let close = document
  .querySelector("#close")
  .addEventListener("click", function () {
    document.querySelector(".pop-up-card").style.display = "none";
  });

let quit = document
  .querySelector("#quit")
  .addEventListener("click", function () {
    document.querySelector(".pop-up-card").style.display = "none";
  });

window.addEventListener("load", function () {
  this.setTimeout(function open(event) {
    document.querySelector("#spiral").style.transform = "rotate(540deg)";
    document.querySelector("#spiral").style.transition = "2.9s ease";
    document.querySelector("#secspiral").style.transform = "rotate(540deg)";
    document.querySelector("#secspiral").style.transition = "2.9s ease";
  }, 1000);
});

let box = document
  .querySelector("#identifiers")
  .addEventListener("mouseenter", function () {
    document.querySelector("#spiral").style.transform =
      "rotate(270deg) scale(1.4)";
    document.querySelector("#spiral").style.transition = "1.9s ease";
    // console.log("entered")
  });

let fect = document
  .querySelector("#identifiers")
  .addEventListener("mouseleave", function () {
    document.querySelector("#spiral").style.transform =
      "rotate(-270deg) scale(1)";
    document.querySelector("#spiral").style.transition = "1.9s ease";
    // console.log("entered")
  });

let sec = document
  .querySelector("#unique")
  .addEventListener("mouseenter", function () {
    document.querySelector("#secspiral").style.transform =
      "rotate(270deg) scale(1.4)";
    document.querySelector("#secspiral").style.transition = "1.9s ease";
    // console.log("entered")
  });

let fectset = document
  .querySelector("#unique")
  .addEventListener("mouseleave", function () {
    document.querySelector("#secspiral").style.transform =
      "rotate(-270deg) scale(1)";
    document.querySelector("#secspiral").style.transition = "1.9s ease";
    // console.log("entered")
  });


