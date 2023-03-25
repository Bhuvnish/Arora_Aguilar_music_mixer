let puzzlePieces = document.querySelectorAll(".puzzle-pieces img"),
    puzzleBoard = document.querySelector(".puzzle-board"),
    dropZones = document.querySelectorAll('.drop-zone'),
    mainBoard = document.querySelector('.puzzle-pieces'),

    draggedPiece;

function loadAudio() {
    let currentSrc = `audio/${this.dataset.trackref}.mp3`;
    let audioEl = new Audio();
    audioEl.src = currentSrc;
    audioEl.load();
    playAudio(audioEl);
}

function playAudio(audioEl) {
    audioEl.play();
}

function handleStartDrag() {
    console.log('started dragging this piece:', this);
    draggedPiece = this;
}

function handleDragOver(e) {
    e.preventDefault();
    console.log('dragged over me');
}

function handleDrop(e) {
    e.preventDefault();
    console.log('dropped something on me');

    console.log(('this.quieryselectorALL(img))'))
    if ((this.querySelectorAll('img').length)) {
        alert('denied to overlap')
    } else {
        this.appendChild(draggedPiece);
        loadAudio.call(draggedPiece);
    }
}

puzzlePieces.forEach(piece => piece.addEventListener("dragstart", handleStartDrag));

dropZones.forEach(zone => zone.addEventListener("dragover", handleDragOver));

dropZones.forEach(zone => zone.addEventListener("drop", handleDrop));

let playButton = document.querySelector('#play-button');
playButton.addEventListener('click', function() {
  playAudio(theAudioEl);
});

let pauseButton = document.querySelector('#pause-button');
pauseButton.addEventListener('click', function() {
  theAudioEl.pause();
});

let stopButton = document.querySelector('#stop-button');
stopButton.addEventListener('click', function() {
  theAudioEl.pause();
  theAudioEl.currentTime = 0;
});
