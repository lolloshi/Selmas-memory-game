const images = [
    'image1.jpg', 'image1.jpg', 'image2.jpg', 'image2.jpg',
    'image3.jpg', 'image3.jpg', 'image4.jpg', 'image4.jpg',
    'image5.jpg', 'image5.jpg', 'image6.jpg', 'image6.jpg',
    'image7.jpg', 'image7.jpg', 'image8.jpg', 'image8.jpg',
    'image9.jpg', 'image9.jpg', 'image10.jpg', 'image10.jpg',
    'image11.jpg', 'image11.jpg', 'image12.jpg', 'image12.jpg',
    'image13.jpg', 'image13.jpg', 'image14.jpg', 'image14.jpg',
    'image15.jpg', 'image15.jpg'
];

const clickSound = new Audio('click.mp3');
const matchSound = new Audio('match.mp3');

let gameBoard = document.querySelector('.game-board');
let flippedCards = [];
let matchedCards = [];
let score = 0;
let firstClick = true;

function flipCard(card) {
    if (!card.classList.contains('flipped') && flippedCards.length < 2) {
        card.classList.add('flipped');
        flippedCards.push(card);

        clickSound.play(); // Replace playAudio(clickSound); with this line

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}



const highscoreList = document.getElementById("highscore-list");
const timeElement = document.getElementById("time");
let timer;
let time = 0;

function createCard(img) {
    let card = document.createElement('div');
    card.classList.add('card');

    let cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');

    let cardFront = document.createElement('div');
    cardFront.classList.add('card-back');

    let cardBack = document.createElement('div');
    cardBack.classList.add('card-front');
    cardBack.style.backgroundImage = `url(${img})`;

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);

    card.addEventListener('click', () => {
        flipCard(card);
    });

    return card;
}


function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.querySelector('.card-back').style.backgroundImage ===
        card2.querySelector('.card-back').style.backgroundImage) {
        matchedCards.push(card1, card2);
        matchSound.play();
        score += 2;
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        if (!firstClick) {
            score -= 1;
        }
    }

    flippedCards = [];
    firstClick = false;

    if (matchedCards.length === images.length) {
        clearInterval(timer);
        saveHighScore(prompt("Enter your name:"), score, time);
        displayHighScores();
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function getHighScores() {
    return JSON.parse(localStorage.getItem("highScores")) || [];
}

function saveHighScore(name, score, time) {
    const highScores = getHighScores();
    highScores.push({ name, score, time });
    highScores.sort((a, b) => b.score - a.score || a.time - b.time);
    highScores.splice(5);
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

function displayHighScores() {
    const highScores = getHighScores();
    highscoreList.innerHTML = "";

    highScores.forEach(({ name, score, time }, index) => {
        const li = document.createElement("li");
        li.textContent = `${index + 1}. ${name} - ${score} points - ${time} s`;
        highscoreList.appendChild(li);
    });
}

displayHighScores();

shuffleArray(images);

images.forEach(img => {
    const card = createCard(img);
    gameBoard.appendChild(card);
});

timer = setInterval(() => {
    time++;
    timeElement.textContent = time;
}, 1000);

// New code added below

const showPicturesBtn = document.getElementById("show-pictures-btn");

showPicturesBtn.addEventListener("click", () => {
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => card.classList.add("flipped"));

    setTimeout(() => {
        cards.forEach(card => {
            if (!matchedCards.includes(card)) {
                card.classList.remove("flipped");
            }
        });
    }, 500);

showPicturesBtn.disabled = true;

});
