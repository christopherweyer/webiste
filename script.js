let likeCount = 0;
let dislikeCount = 0;

document.getElementById('like-btn').addEventListener('click', function() {
    likeCount++;
    document.getElementById('like-count').innerText = likeCount;
});

document.getElementById('dislike-btn').addEventListener('click', function() {
    let sicher = confirm("Sicher, oder verklickt? :-)");
    
    if (!sicher) return;  // Wenn "Nein" geklickt wird, passiert nichts
    
    let freundFrage = confirm("Bist du ein guter (ehrenloser) Freund des Webseiten-Erstellers?");
    
    if (freundFrage) {
        let name = prompt("Wie heißt du denn, lieber Freund? :-)");
        if (name) {
            alert("F*** Dich, " + name + "! :-)");
        }
    } else {
        dislikeCount++;
        document.getElementById('dislike-count').innerText = dislikeCount;
    }
});
