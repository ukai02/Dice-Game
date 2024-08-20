'use strict';

//Important Elements from HTML stored

const newGame = document.querySelector('.btn--new');

const dice = document.querySelector('.btn--roll');

const hold = document.querySelector('.btn--hold');

const score = document.querySelectorAll('.score');

const currentScore = document.querySelectorAll('.current-score');

const player = document.querySelectorAll('.player');

const diceImg = document.querySelector('.dice');

//Important varables

diceImg.classList.add('hidden');

let diceRoll = Math.floor(Math.random() * 6) + 1;

let activePlayer = 0;

let playing = true;

// Important functions defined

const resetScore = () => {
  for (let i = 0; i < score.length; i++) {
    score[i].textContent = 0;
  }
};

const resetDice = () => {
  for (let i = 0; i < currentScore.length; i++) {
    currentScore[i].textContent = 0;
  }
};

const changePlayer = () => {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else activePlayer = 0;
  for (let i = 0; i < player.length; i++) {
    if (player[i].classList.contains('player--active')) {
      player[i].classList.remove('player--active');
    } else {
      player[i].classList.add('player--active');
    }
  }
};

// Button action code

newGame.addEventListener('click', function () {
  player[1].classList.remove('player--active');
  player[0].classList.add('player--active');
  activePlayer = 0;
  resetScore();
  resetDice();

  for (let i = 0; i < player.length; i++) {
    if (player[i].classList.contains('player--winner')) {
      player[i].classList.remove('player--winner');
    }
  }
  playing = true;
});

dice.addEventListener('click', function () {
  if (playing) {
    diceRoll = Math.floor(Math.random() * 6) + 1;

    diceImg.classList.remove('hidden');

    diceImg.src = `dice-${diceRoll}.png`;

    if (diceRoll != 1) {
      currentScore[activePlayer].textContent =
        Number(currentScore[activePlayer].textContent) + diceRoll;
    } else {
      currentScore[activePlayer].textContent = 0;
      changePlayer();
    }

    // console.log(currentScore[activePlayer].textContent);

    // console.log(diceRoll);
  }
});

hold.addEventListener('click', function () {
  if (playing) {
    score[activePlayer].textContent =
      Number(score[activePlayer].textContent) +
      Number(currentScore[activePlayer].textContent);

    currentScore[activePlayer].textContent = 0;

    if (Number(score[activePlayer].textContent) >= 20) {
      player[activePlayer].classList.add('player--winner');
      diceImg.classList.add('hidden');
      changePlayer();
      playing = false;
    }

    changePlayer();
    resetDice();
  }
});
