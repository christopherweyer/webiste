// Firebase-Datenbank-Referenz
const db = firebase.firestore();

// Content-ID für den Like-/Dislike-Zähler
const contentId = "content1";

// Initiale Anzeige der Likes/Dislikes
getVotes();

// Event-Listener für den Like-Button
document.getElementById('like-btn').addEventListener('click', function() {
    updateVote('like');
});

// Event-Listener für den Dislike-Button
document.getElementById('dislike-btn').addEventListener('click', function() {
    updateVote('dislike');
});

// Funktion zum Updaten der Votes
function updateVote(voteType) {
    db.collection("votes").doc(contentId).get().then((doc) => {
        if (!localStorage.getItem('voted')) {
            let newCount = (doc.exists ? doc.data()[voteType] : 0) + 1;
            db.collection("votes").doc(contentId).set({ [voteType]: newCount }, { merge: true });
            localStorage.setItem('voted', 'true');
            getVotes();
        } else {
            alert("Du hast bereits abgestimmt!");
        }
    });
}

// Funktion zum Abrufen der Votes
function getVotes() {
    db.collection("votes").doc(contentId).get().then((doc) => {
        if (doc.exists) {
            document.getElementById('like-count').innerText = doc.data().like || 0;
            document.getElementById('dislike-count').innerText = doc.data().dislike || 0;
        }
    });
}
