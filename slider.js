// SLIDER

const petsData = [
  { "name": "Katrine", "img": "assets/img/pets-katrine.png" },
  { "name": "Jennifer", "img": "assets/img/pets-jennifer.png" },
  { "name": "Woody", "img": "assets/img/pets-woody.png" },
  { "name": "Sophia", "img": "assets/img/pets-sophia.png" },
  { "name": "Timmy", "img": "assets/img/pets-timmy.png" },
  { "name": "Charly", "img": "assets/img/pets-charly.png" },
  { "name": "Scarlet", "img": "assets/img/pets-scarlet.png" },
  { "name": "Freddie", "img": "assets/img/pets-freddie.png" }
];

const track = document.querySelector('.slider-track');
const btnLeft = document.querySelector('.left-arrow');
const btnRight = document.querySelector('.right-arrow');

let currentGroup = [];
let isAnimationRunning = false;

function getCardsCount() {
  const width = window.innerWidth;
  if (width >= 1280) return 3;
  if (width >= 768) return 2;
  return 1;
}

function generateNextGroup(current) {
  const count = getCardsCount();
  const availablePets = petsData.filter(pet => !current.includes(pet));

  for (let i = availablePets.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [availablePets[i], availablePets[j]] = [availablePets[j], availablePets[i]];
  }

  return availablePets.slice(0, count);
}

function createGroupHtml(group) {
  const groupDiv = document.createElement('div');
  groupDiv.classList.add('slider-group');

  groupDiv.innerHTML = group.map(pet => `
    <div class="card">
      <img src="${pet.img}" alt="${pet.name}">
      <h3 class="card-title">${pet.name}</h3>
      <button class="button-secondary">Learn more</button>
    </div>
  `).join('');

  return groupDiv;
}

function initSlider() {
  track.innerHTML = '';
  const shuffled = [...petsData].sort(() => Math.random());
  currentGroup = shuffled.slice(0, getCardsCount());

  const initialHtml = createGroupHtml(currentGroup);
  track.appendChild(initialHtml);
}

function moveSlider(direction) {
  if (isAnimationRunning) return;
  isAnimationRunning = true;

  const nextGroup = generateNextGroup(currentGroup);
  const nextHtml = createGroupHtml(nextGroup);

  if (direction === 'next') {
    track.appendChild(nextHtml);
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = 'translateX(-100%)';
  } else {
    track.insertBefore(nextHtml, track.firstChild);
    track.style.transition = 'none';
    track.style.transform = 'translateX(-100%)';

    track.offsetHeight;

    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = 'translateX(0)';
  }

  track.addEventListener('transitionend', function cleanup() {
    track.style.transition = 'none';
    track.style.transform = 'translateX(0)';

    if (direction === 'next') {
      track.removeChild(track.firstChild);
    } else {
      track.removeChild(track.lastChild);
    }

    currentGroup = nextGroup;
    isAnimationRunning = false;
    track.removeEventListener('transitionend', cleanup);
  });
}

btnRight.addEventListener('click', () => moveSlider('next'));
btnLeft.addEventListener('click', () => moveSlider('prev'));

let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    initSlider();
  }, 300);
});

initSlider();