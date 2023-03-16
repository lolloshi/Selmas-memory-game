const gameBoard = document.getElementById('game-board');
const cardImages = [
    // Replace these with your own image URLs and sound files
    'image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image5.jpg',
    'image6.jpg', 'image7.jpg', 'image8.jpg'
];

const flipSound = new Audio('https://github.com/yourusername/yourrepo/raw/main/flipSound.mp3');
const matchSound = new Audio('https://github.com/yourusername/yourrepo/raw/main/matchSound.mp3');

const cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;

function createCard(imgUrl) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.image = imgUrl;

    const img = document.createElement('img');
    img.src = imgUrl;
    card.appendChild(img);

    card.addEventListener('click', flipCard);
    return card;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function setupGame() {
    const imagePairs = [...cardImages, ...cardImages];
    shuffle(imagePairs);

    imagePairs.forEach(imgUrl => {
        const card = createCard(imgUrl);
        cards.push(card);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard || this === firstCard) return;

    flipSound.play();
    this.classList.add('flipped');
    this.firstChild.style.display = 'block';

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    if (firstCard.dataset.image === secondCard.dataset.image) {
        matchSound.play();
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.firstChild.style.display = 'none';
        secondCard.firstChild.style.display = 'none';

        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

setupGame();
