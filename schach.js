// Schach-Logik
const boardElement = document.getElementById('chessboard');
const game = new Chess(); // Initialisiert das Schachspiel mit chess.js

// Erstelle das Schachbrett mit Chessboard.js
const board = Chessboard('chessboard', {
    draggable: true,
    position: 'start',
    onDrop: handleMove,
});

// Funktion, um einen Zug zu verarbeiten
function handleMove(source, target) {
    const move = game.move({
        from: source,
        to: target,
        promotion: 'q' // Automatische Beförderung zur Dame
    });

    // Ungültigen Zug zurücksetzen
    if (move === null) return 'snapback';

    // KI-Zug machen
    setTimeout(makeAIMove, 250);
}

// KI macht einen Zug mit der Lichess API
function makeAIMove() {
    const possibleMoves = game.moves();
    if (possibleMoves.length === 0) return; // Kein Zug mehr möglich

    const url = "https://lichess.org/api/cloud-eval";
    const position = game.fen(); // Hole die aktuelle Brettposition im FEN-Format

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fen: position,
            moves: "true",
            eval: "true",
            level: 20  // Schwierigkeit einstellen
        })
    })
    .then(response => response.json())
    .then(data => {
        const bestMove = data.bestMove;
        game.uci(bestMove); // Führe den besten Zug aus
        board.position(game.fen()); // Aktualisiere das Schachbrett
    })
    .catch(error => console.error('Fehler:', error));
}

// Funktion, um das Spiel zu starten
document.getElementById('startBtn').addEventListener('click', function() {
    game.reset();
    board.position(game.fen());
});
