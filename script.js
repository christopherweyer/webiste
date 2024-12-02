// scripts.js
let likeCount = localStorage.getItem('likeCount') || 0;
let dislikeCount = localStorage.getItem('dislikeCount') || 0;

document.getElementById('like-count').innerText = likeCount;
document.getElementById('dislike-count').innerText = dislikeCount;

document.getElementById('like-btn').addEventListener('click', function() {
    if (localStorage.getItem('liked') === 'true') {
        alert("Du hast schon gevotet!");
        return;
    }

    likeCount++;
    localStorage.setItem('likeCount', likeCount);
    localStorage.setItem('liked', 'true');
    document.getElementById('like-count').innerText = likeCount;
});

document.getElementById('dislike-btn').addEventListener('click', function() {
    if (localStorage.getItem('disliked') === 'true') {
        alert("Du hast schon gevotet!");
        return;
    }

    let sicher = confirm("Sicher, oder verklickt? :-)");

    if (!sicher) return;

    let freundFrage = confirm("Bist du ein guter (ehrenloser) Freund des Webseiten-Erstellers?");

    if (freundFrage) {
        let name = prompt("Wie heißt du denn, lieber Freund? :-)");
        if (name) {
            alert("F*** Dich, " + name + "! :-)");
        }
    } else {
        dislikeCount++;
        localStorage.setItem('dislikeCount', dislikeCount);
        localStorage.setItem('disliked', 'true');
        document.getElementById('dislike-count').innerText = dislikeCount;
    }
});
