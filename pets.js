// Pagination on the Pets page

const petsBase = [
  { "name": "Jennifer", "img": "assets/img/pets-jennifer.png" },
  { "name": "Sophia", "img": "assets/img/pets-sophia.png" },
  { "name": "Woody", "img": "assets/img/pets-woody.png" },
  { "name": "Scarlett", "img": "assets/img/pets-scarlet.png" },
  { "name": "Katrine", "img": "assets/img/pets-katrine.png" },
  { "name": "Timmy", "img": "assets/img/pets-timmy.png" },
  { "name": "Freddie", "img": "assets/img/pets-freddie.png" },
  { "name": "Charly", "img": "assets/img/pets-charly.png" }
];

let fullPetsList = [];
let currentPage = 1;

function generate48Pets() {
  let masterList = [];

  for (let i = 0; i < 6; i++) {
    let chunk;
    let attempts = 0;

    do {
      chunk = [...petsBase].sort(() => Math.random() - 0.5);
      attempts++;
    } while (
      masterList.length > 0 &&
      chunk[0].name === masterList[masterList.length - 1].name &&
      attempts < 100
    );

    masterList.push(...chunk);
  }

  return masterList;
}

function getCardsPerPage() {
  const width = window.innerWidth;
  if (width >= 1280) return 8;
  if (width >= 768) return 6;
  return 3;
}

function getTotalPages() {
  return 48 / getCardsPerPage();
}

const cardsWrap = document.querySelector('.cards-wrap');

function renderPage(page) {
  const cardsPerPage = getCardsPerPage();
  const startIndex = (page - 1) * cardsPerPage;
  const pageItems = fullPetsList.slice(startIndex, startIndex + cardsPerPage);

  cardsWrap.classList.add('fade');

  setTimeout(() => {
    cardsWrap.innerHTML = pageItems.map(pet => `
      <div class="card">
        <img src="${pet.img}" alt="${pet.name}" class="card-img">
        <h3 class="card-title">${pet.name}</h3>
        <a href="#" class="button-secondary">Learn more</a>
      </div>
    `).join('');

    cardsWrap.classList.remove('fade');
    updateControls();
  }, 150);
}

const btnFirst = document.getElementById('btn-first');
const btnPrev = document.getElementById('btn-prev');
const pageNum = document.getElementById('page-num');
const btnNext = document.getElementById('btn-next');
const btnLast = document.getElementById('btn-last');

function updateControls() {
  const totalPages = getTotalPages();
  pageNum.innerText = currentPage;

  if (currentPage === 1) {
    btnFirst.disabled = true;
    btnPrev.disabled = true;
  } else {
    btnFirst.disabled = false;
    btnPrev.disabled = false;
  }

  if (currentPage === totalPages) {
    btnNext.disabled = true;
    btnLast.disabled = true;
  } else {
    btnNext.disabled = false;
    btnLast.disabled = false;
  }
}

btnNext.addEventListener('click', () => {
  if (currentPage < getTotalPages()) {
    currentPage++;
    renderPage(currentPage);
  }
});

btnPrev.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    renderPage(currentPage);
  }
});

btnFirst.addEventListener('click', () => {
  if (currentPage !== 1) {
    currentPage = 1;
    renderPage(currentPage);
  }
});

btnLast.addEventListener('click', () => {
  const totalPages = getTotalPages();
  if (currentPage !== totalPages) {
    currentPage = totalPages;
    renderPage(currentPage);
  }
});

let resizeId;
window.addEventListener('resize', () => {
  clearTimeout(resizeId);
  resizeId = setTimeout(() => {
    currentPage = 1;
    renderPage(currentPage);
  }, 200);
});

fullPetsList = generate48Pets();
renderPage(currentPage);