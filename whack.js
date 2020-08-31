const images = Array.from(document.querySelectorAll('img'));
const moles = Array.from(document.querySelectorAll('.mole'));
const play = document.querySelector('.play');
const scoreBoard = document.querySelector('.scoreboard');
const scoreContainer = document.querySelector('.score-container');
const Empty = document.querySelector('.empty');
const Welcome = document.querySelector('.welcome');
const gameContainer = document.querySelector('.game-container');
const Score = document.querySelector('.score');
const Timer = document.querySelector('.timer p');

let lastMole;
let isTimeOver = false;
let scoreValue = 0;


images.forEach(item => item.draggable = false);
moles.forEach(item => item.addEventListener('click', addPoint));
play.addEventListener('click', gameStart);

function gameStart() {
    Empty.style.transform = 'translate(100%, -100%)';
    scoreBoard.style.transform = 'translate(0%, 0%)';
    Welcome.style.transform = 'translate(-100%, 0)';
    gameContainer.style.transform = 'translate(0%, -100%)';
    scoreContainer.classList.add('custom')
    setTimeout(() => {
        Timer.innerText = 30;
        Score.innerText = 0;
        scoreValue = 0;
    }, 500)
    setTimeout(() => {
        scoreContainer.classList.remove('custom');
        startGame();
    }, 1500);
}

function addPoint(e) {
    scoreValue++;
    Score.innerText = scoreValue;
    e.target.classList.remove('rise');
}

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(param) {
    const idx = Math.floor(Math.random() * param.length);
    const mole = param[idx];
    if (mole == lastMole) {
        return randomHole(moles);
    }
    lastMole = mole;
    return mole;
}

function look() {
    const time = randomTime(600, 1000)
    const mole = randomHole(moles);
    mole.classList.add('rise');
    setTimeout(() => {
        mole.classList.remove('rise');
        if (!isTimeOver) {
            look();
        }
    }, time);
}

function startGame() {
    let countDownTimer;
    let remainingTime = 30;
    isTimeOver = false;
    countDownTimer = setInterval(() => {
        if (isTimeOver) {
            clearInterval(countDownTimer);
        }
        else {
            remainingTime--;
            Timer.innerText = remainingTime;
        }
    }, 1000)
    setTimeout(() => {
        isTimeOver = true;
        Welcome.style.transform = 'translate(0%, 0%)';
        gameContainer.style.transform = 'translate(100%, -100%)';
        Timer.innerText = '';
    }, 30000);
    look();
}