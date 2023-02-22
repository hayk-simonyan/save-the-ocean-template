const color = document.getElementById('color_palet');
const garbages = document.getElementsByClassName('garbage');
const fish = document.getElementsByClassName('fish');
let sum = 6;

for (let i = 0; i < garbages.length; i++) {
  garbages[i].addEventListener('click', function (e) {
    garbages[i].classList.add('clear');
    sum = sum - 1;
    if (sum == 0) {
      for (let j = 0; j < fish.length; j++) {
        fish[j].classList.add('fish-jump');
      }
    }
  });
}

const root = document.querySelector(':root');
function chnageColor() {
  const newColor = HexToHSL(color.value);
  root.style.setProperty('--h', newColor.h);
  root.style.setProperty('--s', newColor.s);
  root.style.setProperty('--a', newColor.l);
}

function HexToHSL(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  let r = parseInt(result[1], 16);
  let g = parseInt(result[2], 16);
  let b = parseInt(result[3], 16);

  (r /= 255), (g /= 255), (b /= 255);
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  s = s * 100;
  s = Math.round(s);
  l = l * 100;
  l = Math.round(l);
  h = Math.round(360 * h);

  return { h, s, l };
}

function showTitle() {
  const titleValue = document.getElementById('title-check');
  const title = document.getElementById('title');
  title.style.display = titleValue.checked ? 'block' : 'none';
}

function showDescription() {
  const descriptionValue = document.getElementById('description-check');
  const description = document.getElementById('description');
  description.style.display = descriptionValue.checked ? 'block' : 'none';
}

// SET THE LAUNCH DATE HERE
const countDownDate = new Date('March 15, 2023 15:37:25').getTime();

function getDistance(date) {
  return date - new Date().getTime();
}
function isCountDownFinished() {
  return getDistance(countDownDate) < 0;
}
function countDownTimer() {
  const distance = getDistance(countDownDate);
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
}
function innerCountDownHTML(days, hours, minutes, seconds) {
  document.getElementById('days').innerHTML = days;
  document.getElementById('hours').innerHTML = hours;
  document.getElementById('minutes').innerHTML = minutes;
  document.getElementById('seconds').innerHTML = seconds;
}
function initializeTimer() {
  const { days, hours, minutes, seconds } = countDownTimer();
  innerCountDownHTML(days, hours, minutes, seconds);
}
initializeTimer();

const timer = setInterval(function () {
  initializeTimer();

  if (isCountDownFinished(countDownDate)) {
    clearInterval(timer);
    document.getElementById('timer').innerHTML = 'WE ARE LIVE!';
  }
}, 1000);
