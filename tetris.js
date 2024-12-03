// Spielfeld und Spielzustand
const boardWidth = 10;
const boardHeight = 20;
let gameBoard = Array(boardHeight).fill().map(() => Array(boardWidth).fill(0)); // Initialisiere das Spielfeld
let score = 0;  // Spielstand
let isGameOver = false;  // Game Over Flag

const tetrisContainer = document.getElementById('game-board');
const scoreValue = document.getElementById('scoreValue');

// Erstelle das Spielfeld
function createBoard() {
    tetrisContainer.innerHTML = '';
    for (let y = 0; y < boardHeight; y++) {
        for (let x = 0; x < boardWidth; x++) {
            const cell = document.createElement('div');
            tetrisContainer.appendChild(cell);
        }
    }
}

function renderBoard() {
    const cells = tetrisContainer.children;
    for (let y = 0; y < boardHeight; y++) {
        for (let x = 0; x < boardWidth; x++) {
            const index = y * boardWidth + x;
            cells[index].style.backgroundColor = gameBoard[y][x] === 0 ? '#222' : 'cyan';
        }
    }
}

// Tetrominoe
const tetrominoes = [
    [[1, 1, 1, 1]], // I
    [[1, 1], [1, 1]], // O
    [[1, 1, 0], [0, 1, 1]], // S
    [[0, 1, 1], [1, 1, 0]], // Z
    [[1, 0, 0], [1, 1, 1]], // L
    [[0, 0, 1], [1, 1, 1]], // J
    [[0, 1, 0], [1, 1, 1]]  // T
];

let currentTetromino = getRandomTetromino();
let currentPosition = { x: 3, y: 0 };  // Startposition

function getRandomTetromino() {
    const index = Math.floor(Math.random() * tetrominoes.length);
    return tetrominoes[index];
}

// Funktion, um das Tetromino zu bewegen
function moveTetromino(dx, dy) {
    if (canMove(dx, dy)) {
        currentPosition.x += dx;
        currentPosition.y += dy;
    }
}

// Prüfe, ob das Tetromino an der neuen Position bewegt werden kann
function canMove(dx, dy) {
    for (let y = 0; y < currentTetromino.length; y++) {
        for (let x = 0; x < currentTetromino[y].length; x++) {
            if (currentTetromino[y][x]) {
                const newX = currentPosition.x + x + dx;
                const newY = currentPosition.y + y + dy;
                if (newX < 0 || newX >= boardWidth || newY >= boardHeight || newY < 0 || gameBoard[newY][newX] !== 0) {
                    return false;
                }
            }
        }
    }
    return true;
}

// Drehfunktion
function rotateTetromino() {
    const rotated = currentTetromino[0].map((_, i) => currentTetromino.map(row => row[i])).reverse();
    const backup = currentTetromino;
    currentTetromino = rotated;
    if (!canMove(0, 0)) {
        currentTetromino = backup;
    }
}

// Funktion zum Hinzufügen des Tetrominos zum Spielfeld
function placeTetromino() {
    for (let y = 0; y < currentTetromino.length; y++) {
        for (let x = 0; x < currentTetromino[y].length; x++) {
            if (currentTetromino[y][x]) {
                gameBoard[currentPosition.y + y][currentPosition.x + x] = 1;
            }
        }
    }
    clearFullRows();
    currentTetromino = getRandomTetromino();
    currentPosition = { x: 3, y: 0 };
    if (!canMove(0, 0)) {
        isGameOver = true;
        alert("Game Over");
    }
}

// Lösche vollständige Reihen
function clearFullRows() {
    for (let y = 0; y < boardHeight; y++) {
        if (gameBoard[y].every(cell => cell !== 0)) {
            gameBoard.splice(y, 1);
            gameBoard.unshift(Array(boardWidth).fill(0));
            score += 100;
            scoreValue.textContent = score;
        }
    }
}

// Haupt-Spiel Schleife
function gameLoop() {
    if (isGameOver) return;
    renderBoard();
    moveTetromino(0, 1); // Fällt das Tetromino nach unten
    if (currentPosition.y + currentTetromino.length >= boardHeight) {
        placeTetromino();
    }
}

// Tasteneingabe für Steuerung
document.addEventListener('keydown', (event) => {
    if (isGameOver) return;
    if (event.key === 'ArrowLeft') {
        moveTetromino(-1, 0);
    } else if (event.key === 'ArrowRight') {
        moveTetromino(1, 0);
    } else if (event.key === 'ArrowDown') {
        moveTetromino(0, 1);
    } else if (event.key === 'ArrowUp') {
        rotateTetromino();
    }
});

// Spiel starten
function startGame() {
    createBoard();
    setInterval(gameLoop, 500);
}

startGame();
