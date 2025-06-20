let openSoundFadingOut = false;
let startPlaySoundFadingOut = false;
let buddySoundFadingOut = false;
let drawingSoundFadingOut = false;
let powerSoundFadingOut = false;
let ftSoundFadingOut = false;
let badendSoundFadingOut = false;
let goodendSoundFadingOut = false;

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
  const facetimeScreens = new Set([
    "fTOver",       // if you want music on the “over” screen too
    "girlfriendFT"  // your actual FaceTime game screen
  ]);

  // const badendScreens = new Set([
  //   "badEnding1", "badEnding2,"lifeOverScenebg"
  // ]);

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
  /* ---------- Handle buddySound (pet screen) ---------- */
  if (currentScreen === "dogGame") {
    // 페이드아웃 중이라면 즉시 복귀
    console.log("should start playing");
    buddySoundFadingOut = false;
    if (!buddySound.isPlaying()) {
      console.log("사운드 시작")
      buddySound.setVolume(0.2); // 원하는 볼륨
      buddySound.loop();         // 반복 재생
    }
  } else if (buddySound.isPlaying() && !buddySoundFadingOut) {
    buddySoundFadingOut = true;
    buddySound.setVolume(0.0, 1.5); // 1.5초 동안 볼륨 0으로
    setTimeout(() => {
      if (buddySound.isPlaying())
        console.log("사운드 정지");
      buddySound.stop();
    }, 1600); // 실제 정지는 페이드 끝난 뒤
  }
  // 그림브금 
  if (currentScreen === "doodleGame") {
    // 페이드아웃 중이라면 즉시 복귀
    console.log("should start playing");
    drawingSoundFadingOut = false;
    if (!drawingSound.isPlaying()) {
      console.log("사운드 시작")
      drawingSound.setVolume(0.2); // 원하는 볼륨
      drawingSound.loop();         // 반복 재생
    }
  } else if (drawingSound.isPlaying() && !drawingSoundFadingOut) {
    drawingSoundFadingOut = true;
    drawingSound.setVolume(0.0, 1.5); // 1.5초 동안 볼륨 0으로
    setTimeout(() => {
      if (drawingSound.isPlaying())
        console.log("사운드 정지");
      drawingSound.stop();
    }, 1600); // 실제 정지는 페이드 끝난 뒤
  }

  // superpower브금
  if (currentScreen === "girlfriendGame") {
    // 페이드아웃 중이라면 즉시 복귀
    console.log("should start playing");
    powerSoundFadingOut = false;
    if (!powerSound.isPlaying()) {
      console.log("사운드 시작")
      powerSound.setVolume(0.2); // 원하는 볼륨
      powerSound.loop();         // 반복 재생
    }
  } else if (powerSound.isPlaying() && !powerSoundFadingOut) {
    powerSoundFadingOut = true;
    powerSound.setVolume(0.0, 1.5); // 1.5초 동안 볼륨 0으로
    setTimeout(() => {
      if (powerSound.isPlaying())
        console.log("사운드 정지");
      powerSound.stop();
    }, 1600); // 실제 정지는 페이드 끝난 뒤
  }
  // --- Handle ftsong (FaceTime background music) ---


  if (facetimeScreens.has(currentScreen)) {
    ftSoundFadingOut = false;
    if (!ftsong.isPlaying()) {
      ftsong.setVolume(0.4);
      ftsong.loop();
    }
  } else if (ftsong.isPlaying() && !ftSoundFadingOut) {
    ftSoundFadingOut = true;
    ftsong.setVolume(0.0, 1.5);
    setTimeout(() => {
      if (ftsong.isPlaying()) ftsong.stop();
    }, 1600);
  }

}
//

//   if (petScreen.has (currentScreen)) {
//     BuddySoundFadingout=false;
//     if (!buddySound.isPlaying()) {
//       buddySound.setVolume(0.2);
//       buddySound.loop();
//     }
//   } else if (buddySound.isPlaying() && !buddySoundFadingOut) {
//     buddySoundFadingOut = true;
//     buddySound.setVolume(0.0, 1.5);
//     setTimeout(() => {
//       if (buddySound.isPlaying()) buddySound.stop();
//     }, 1600);
//   }
// }
