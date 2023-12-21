// JavaScript for Sticky Navbar
window.addEventListener("scroll", function () {
  var nav = document.querySelector("nav");
  var header = document.querySelector(".header");

  if (window.scrollY > header.clientHeight) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
});

// Add an event listener to detect scrolling
window.addEventListener("scroll", function () {
  var nav = document.querySelector("nav");
  if (window.scrollY > nav.clientHeight) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});
