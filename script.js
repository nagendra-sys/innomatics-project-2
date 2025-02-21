const categories = {
    fruits: ['🍎', '🍌', '🍇', '🍉', '🍍', '🥭', '🍒', '🍓'],
    emojis: ['😀', '😂', '😍', '😎', '🤩', '😜', '😢', '😡'],
    animals: ['🐶', '🐱', '🦁', '🐸', '🐰', '🐼', '🐨', '🐷'],
    planets: ['🌍', '🪐', '🌕', '☀️', '🌟', '🌑', '🌖', '🌎']
};

let firstCard = null, secondCard = null, score = 0, timer, selectedCategory;
let timeLeft = 30;

function startGame(category) {
    selectedCategory = category;
    document.getElementById('landing-page').style.display = 'none';
    document.getElementById('game-container').style.display = 'flex';

    let items = [...categories[category], ...categories[category]];
    items.sort(() => Math.random() - 0.5);

    let gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';

    items.forEach(item => {
        let card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = item;
        card.onclick = handleCardClick;
        gameBoard.appendChild(card);
    });

    score = 0;
    document.getElementById('score').innerText = score;

    timeLeft = 30;
    clearInterval(timer);
    startTimer();
}

function handleCardClick() {
    if (this.classList.contains('flipped') || this.classList.contains('matched')) return;

    this.innerText = this.dataset.value;
    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        score += 10;
        document.getElementById('score').innerText = score;
        
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        firstCard.style.backgroundColor = 'lightgreen';
        secondCard.style.backgroundColor = 'lightgreen';
        
        firstCard.onclick = null;
        secondCard.onclick = null;
    } else {
        firstCard.innerText = '';
        secondCard.innerText = '';
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
    }
    firstCard = secondCard = null;
}

function startTimer() {
    document.getElementById('timer').innerText = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            showPopup(score);
        }
    }, 1000);
}

function showPopup(finalScore) {
    document.getElementById('final-score').innerText = finalScore;
    document.getElementById('popup').style.display = 'flex';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

function tryAgain() {
    closePopup();
    startGame(selectedCategory);
}

function quitGame() {
    closePopup();
    restartGame();
}

function restartGame() {
    clearInterval(timer);
    document.getElementById('game-container').style.display = 'none';
    document.getElementById('landing-page').style.display = 'flex';
}
