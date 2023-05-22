const squares = document.querySelectorAll('.square');
const startButton = document.getElementById('startButton');
const scoreDisplay = document.getElementById('score');
const musicButton = document.getElementById('musicButton');
const music = new Audio('BGM.mp3');

let score = 0;
let sequence = [];
let flashSpeed = 1000;
let gameInProgress = false;
let currentIndex = 0;
let isMusicPlaying = false;

function flashSquare(index) {
    squares[index].classList.add('flash');
    setTimeout(() => {
        squares[index].classList.remove('flash');
    }, flashSpeed);
}

function playSequence() {
    let i = 0;
    const interval = setInterval(() => {
        flashSquare(sequence[i]);
        i++;
        if (i >= sequence.length) {
            clearInterval(interval);
            gameInProgress = true;
            currentIndex = 0;
        }
    }, flashSpeed + 500);
}

function generateRandomSquare() {
    return Math.floor(Math.random() * squares.length);
}

function addToSequence() {
    const newIndex = generateRandomSquare();
    sequence.push(newIndex);
}

function startGame() {
    sequence = [];
    score = 0;
    flashSpeed = 1000;
    scoreDisplay.textContent = score;
    gameInProgress = false;
    startButton.disabled = false;
}

function endGame() {
    gameInProgress = false;
    alert(`Game Over!\nYour score: ${score}`);
    location.reload();
}

function handleClick() {
    if (!gameInProgress) return;

    const clickedIndex = Array.from(squares).indexOf(this);

    if (clickedIndex === sequence[currentIndex]) {
        flashSquare(clickedIndex);
        currentIndex++;

        if (currentIndex === sequence.length) {
            score++;
            scoreDisplay.textContent = score;
            addToSequence();
            flashSpeed -= 100; // Decrease flash duration by 0.1 seconds
            setTimeout(() => {
                playSequence();
            }, 1000);
        }
    } else {
        endGame();
    }
}

function handleStart() {
    if (!gameInProgress) {
        startButton.disabled = true;
        addToSequence();
        playSequence();
    }
}

function toggleMusic() {
    if (!isMusicPlaying) {
        music.play();
        musicButton.textContent = 'Stop Music';
        isMusicPlaying = true;
    } else {
        music.pause();
        music.currentTime = 0;
        musicButton.textContent = 'Play Music';
        isMusicPlaying = false;
    }
}

squares.forEach((square) => square.addEventListener('click', handleClick));
startButton.addEventListener('click', handleStart);
musicButton.addEventListener('click', toggleMusic);

startGame();
