let instruments = document.querySelectorAll('.instrument');
let characters = document.querySelectorAll('.character');
let activeAudios = [];

instruments.forEach(instrument => {
  instrument.addEventListener('dragstart', () => {
    instrument.classList.add('active');
  });

  instrument.addEventListener('dragend', () => {
    instrument.classList.remove('active');
  });

  instrument.addEventListener('click', () => {
    let activeCharacter = document.querySelector('.character.active');
    let instrumentName = instrument.dataset.instrument;

    // Remove instrument from character
    activeCharacter.classList.remove(instrumentName);

    // Stop audio
    activeAudios.forEach(audio => {
      if (audio.src.includes(instrumentName)) {
        audio.pause();
        audio.currentTime = 0;
      }
    });

    // Show instrument
    instrument.style.display = '';

    // Remove click listener from character
    activeCharacter.removeEventListener('click', resetInstrument);
  });
});

characters.forEach(character => {
  character.addEventListener('dragover', e => {
    e.preventDefault();
  });

  character.addEventListener('drop', e => {
    let activeInstrument = document.querySelector('.instrument.active');
    let characterName = e.target.dataset.character;
    let instrumentName = activeInstrument.dataset.instrument;

    // Set character to active
    characters.forEach(char => char.classList.remove('active'));
    character.classList.add('active');

    // Add instrument to character
    let characterElement = document.querySelector(`.character[data-character="${characterName}"]`);
    characterElement.classList.add(instrumentName);

    // Play audio
    let audio = new Audio(`audio/${instrumentName}.mp3`);
    activeAudios.push(audio);
    audio.play();

    // Hide instrument
    activeInstrument.style.display = 'none';

    // Add click listener to character to reset instrument
    characterElement.addEventListener('click', resetInstrument, { once: true });

    function resetInstrument() {
      characterElement.classList.remove(instrumentName);
      activeInstrument.style.display = '';
      activeAudios.forEach(audio => {
        if (audio.src.includes(instrumentName)) {
          audio.pause();
          audio.currentTime = 0;
        }
      });
      characterElement.removeEventListener('click', resetInstrument);
    }
  });
});

let playButton = document.getElementById('play-button');
let pauseButton = document.getElementById('pause-button');
let stopButton = document.getElementById('stop-button');
let volumeControl = document.getElementById('volumeControl');

playButton.addEventListener('click', () => {
  activeAudios.forEach(audio => {
    if (audio.paused) {
      audio.play();
    }
  });
});

pauseButton.addEventListener('click', () => {
  activeAudios.forEach(audio => {
    audio.pause();
  });
});

stopButton.addEventListener('click', () => {
  activeAudios.forEach(audio => {
    audio.pause();
    audio.currentTime = 0;
  });
});

volumeControl.addEventListener('input', () => {
  let volume = volumeControl.value / 100;
  activeAudios.forEach(audio => {
    audio.volume = volume;
  });
});





