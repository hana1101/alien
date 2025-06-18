let openSoundFadingOut = false;
let startPlaySoundFadingOut = false;
let buddySoundFadingOut=false;

function handleBackgroundMusic() {
  const introScreens = new Set([
    "start",
    "startscene/zib1", "startscene/zib2", "startscene/zib3",
    "startscene/zib4", "startscene/zib5", "startscene/zib6",
    "startscene/zib7", "startscene/zib8", "startscene/zib9",
    "startscene/zib10", "startscene/zib11", "startscene/zib12",
    "startscene/zib13", "startscene/zib14"
  ]);

  const playScreens = new Set([
    "play", "work", "readDiary", "checkMsg"
  ]);

  // --- Handle openSound (intro music) ---
  if (introScreens.has(currentScreen)) {
    openSoundFadingOut = false;
    if (!openSound.isPlaying()) {
      openSound.setVolume(0.2);
      openSound.loop();
    }
  } else if (openSound.isPlaying() && !openSoundFadingOut) {
    openSoundFadingOut = true;
    openSound.setVolume(0.0, 1.5);
    setTimeout(() => {
      if (openSound.isPlaying()) openSound.stop();
    }, 1600);
  }

  // --- Handle startPlaySound (play/work/diary/message) ---
  if (playScreens.has(currentScreen)) {
    startPlaySoundFadingOut = false;
    if (!startPlaySound.isPlaying()) {
      startPlaySound.setVolume(0.2);
      startPlaySound.loop();
    }
  } else if (startPlaySound.isPlaying() && !startPlaySoundFadingOut) {
    startPlaySoundFadingOut = true;
    startPlaySound.setVolume(0.0, 1.5);
    setTimeout(() => {
      if (startPlaySound.isPlaying()) startPlaySound.stop();
    }, 1600);
  }
    // --- Handle buddySound (pet screen) ---

  const petscreen = new Set([
    "pet"
  ]);

  if (petScreen.has (currentScreen)) {
    BuddySoundFadingout=false;
    if (!buddySound.isPlaying()) {
      buddySound.setVolume(0.2);
      buddySound.loop();
    }
  } else if (buddySound.isPlaying() && !buddySoundFadingOut) {
    buddySoundFadingOut = true;
    buddySound.setVolume(0.0, 1.5);
    setTimeout(() => {
      if (buddySound.isPlaying()) buddySound.stop();
    }, 1600);
  }
}