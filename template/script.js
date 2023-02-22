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
