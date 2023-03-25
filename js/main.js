let puzzlePieces = document.querySelectorAll(".puzzle-pieces img"),
    puzzleBoard = document.querySelector(".puzzle-board"),
    dropZones = document.querySelectorAll('.drop-zone'),
    mainBoard = document.querySelector('.puzzle-pieces'),

    draggedPiece;

let audioElements = {};

function loadAudio() {
    let currentSrc = `audio/${this.dataset.trackref}.mp3`;
    let audioEl = new Audio();
    audioEl.src = currentSrc;
    audioEl.load();
    audioElements[this.dataset.trackref] = audioEl;
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
    for (let key in audioElements) {
        playAudio(audioElements[key]);
    }
});

let pauseButton = document.querySelector('#pause-button');
pauseButton.addEventListener('click', function() {
    for (let key in audioElements) {
        audioElements[key].pause();
    }
});

let stopButton = document.querySelector('#stop-button');
stopButton.addEventListener('click', function() {
    for (let key in audioElements) {
        audioElements[key].pause();
        audioElements[key].currentTime = 0;
    }
});

let instrumentAudio = document.querySelectorAll(".puzzle-pieces img");

instrumentAudio.forEach(instrument => {
    instrument.addEventListener("click", function() {
        for (let key in audioElements) {
            if (key !== this.dataset.trackref) {
                audioElements[key].pause();
            }
        }

        if (this.parentNode !== mainBoard) {
            let parent = this.parentNode;
            parent.removeChild(this);
            mainBoard.appendChild(this);
            audioElements[this.dataset.trackref].pause();
            audioElements[this.dataset.trackref].currentTime = 0;
        }
    });
});
