// Laden der aktuellen Like- und Dislike-Zahlen aus dem LocalStorage
let likeCount = parseInt(localStorage.getItem('likeCount')) || 0;
let dislikeCount = parseInt(localStorage.getItem('dislikeCount')) || 0;

document.getElementById('like-count').innerText = likeCount;
document.getElementById('dislike-count').innerText = dislikeCount;

// Event-Listener für den Like-Button
document.getElementById('like-btn').addEventListener('click', function() {
    if (localStorage.getItem('voted') === 'true') {
        alert("Du hast bereits abgestimmt!");
        return;
    }

    likeCount++;
    localStorage.setItem('likeCount', likeCount);
    localStorage.setItem('voted', 'true');
    document.getElementById('like-count').innerText = likeCount;

    alert("Danke für dein Like! 😊");
});

// Event-Listener für den Dislike-Button
document.getElementById('dislike-btn').addEventListener('click', function() {
    if (localStorage.getItem('voted') === 'true') {
        alert("Du hast bereits abgestimmt!");
        return;
    }

    let sicher = confirm("Bist du sicher, dass du disliken möchtest?");

    if (!sicher) return;

    let freundFrage = confirm("Bist du ein Freund des Webseiten-Erstellers?");

    if (freundFrage) {
        let name = prompt("Traust Du Dich auch, mir Deinen Namen zu verraten, lieber Freund?");
        if (name) {
            alert(`Anzeige ist raus, ${name}! 😈`);
        }
    } else {
        dislikeCount++;
        localStorage.setItem('dislikeCount', dislikeCount);
        localStorage.setItem('voted', 'true');
        document.getElementById('dislike-count').innerText = dislikeCount;

        alert("Schade, dass dir die Seite nicht gefällt! 😢");
    }
});
