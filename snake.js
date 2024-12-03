// Spielfeldgrößen
const boardSize = 15;
const cellSize = 20; // Pixel pro Zelle
const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('scoreValue');
let snake = [{ x: 5, y: 5 }];
let direction = 'RIGHT';
let food = { x: 10, y: 10 };
let score = 0;
let gameInterval;

// Erstelle das Spielfeld
function createBoard() {
    gameBoard.innerHTML = ''; // Leere das Spielfeld
    for (let y = 0; y < boardSize; y++) {
        for (let x = 0; x < boardSize; x++) {
            const cell = document.createElement('div');
            cell.style.width = `${cellSize}px`;
            cell.style.height = `${cellSize}px`;
            cell.style.position = 'absolute';
            cell.style.top = `${y * cellSize}px`;
            cell.style.left = `${x * cellSize}px`;
            gameBoard.appendChild(cell);
        }
    }
}

// Render das Spielfeld
function renderBoard() {
    const cells = gameBoard.children;
    
    // Alle Zellen zurücksetzen
    Array.from(cells).forEach(cell => {
        cell.style.backgroundColor = 'black';
    });

    // Snake rendern
    snake.forEach(segment => {
        const index = segment.y * boardSize + segment.x;
        cells[index].style.backgroundColor = 'green';
    });

    // Futter rendern
    const foodIndex = food.y * boardSize + food.x;
    cells[foodIndex].style.backgroundColor = 'red';
}

// Snake bewegen
function moveSnake() {
    let newHead = { ...snake[0] };

    // Bewegung basierend auf der aktuellen Richtung
    if (direction === 'UP') newHead.y -= 1;
    if (direction === 'DOWN') newHead.y += 1;
    if (direction === 'LEFT') newHead.x -= 1;
    if (direction === 'RIGHT') newHead.x += 1;

    // Überprüfe, ob die Schlange die Wand oder sich selbst beißt
    if (newHead.x < 0 || newHead.x >= boardSize || newHead.y < 0 || newHead.y >= boardSize || isCollidingWithSelf(newHead)) {
        gameOver();
        return;
    }

    // Snake wächst, wenn es Futter frisst
    snake.unshift(newHead);
    if (newHead.x === food.x && newHead.y === food.y) {
        score += 10;
        scoreDisplay.textContent = score;
        generateFood();
    } else {
        snake.pop();
    }

    renderBoard();
}

// Überprüfe, ob die Schlange sich selbst beißt
function isCollidingWithSelf(newHead) {
    return snake.some(segment => segment.x === newHead.x && segment.y === newHead.y);
}

// Futter generieren
function generateFood() {
    let newFood;
    do {
        newFood = { x: Math.floor(Math.random() * boardSize), y: Math.floor(Math.random() * boardSize) };
    } while (isCollidingWithSelf(newFood)); // Stelle sicher, dass das Futter nicht auf der Schlange erscheint
    food = newFood;
}

// Steuerung der Schlange
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
    if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
});

// Spiel beenden
function gameOver() {
    clearInterval(gameInterval);
    alert('Game Over!');
}

// Spiel starten
function startGame() {
    createBoard();
    generateFood();
    gameInterval = setInterval(moveSnake, 200); // Schlange alle 200 ms bewegen
}

startGame();
