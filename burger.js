// BURGER-MENU

const burgerButtons = document.querySelectorAll(".navbar-burger");
const mobileMenus = document.querySelectorAll(".nav");
const mobileLinks = document.querySelectorAll(".nav-link");

function closeMenu() {
  burgerButtons.forEach((button) => {
    button.classList.remove("open");
    button.setAttribute("aria-expanded", "false");
  });

  mobileMenus.forEach((menu) => {
    menu.classList.remove("open");
  });

  document.body.classList.remove("menu-open");
}

function openMenu() {
  burgerButtons.forEach((button) => {
    button.classList.add("open");
    button.setAttribute("aria-expanded", "true");
  });

  mobileMenus.forEach((menu) => {
    menu.classList.add("open");
  });

  document.body.classList.add("menu-open");
}

burgerButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = button.classList.contains("open");

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });
});

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeMenu();
  });
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    closeMenu();
  }
});