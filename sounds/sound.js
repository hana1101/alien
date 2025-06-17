function handleOpenSound() {
    const introScreens = new Set([
      "start",
      "startscene/zib1", "startscene/zib2", "startscene/zib3",
      "startscene/zib4", "startscene/zib5", "startscene/zib6",
      "startscene/zib7", "startscene/zib8", "startscene/zib9",
      "startscene/zib10", "startscene/zib11", "startscene/zib12",
      "startscene/zib13", "startscene/zib14"
    ]);
  
    if (introScreens.has(currentScreen)) {
      if (!openSound.isPlaying()) {
        openSound.loop();
      }
    } else {
      if (openSound.isPlaying()) {
        openSound.stop();
      }
    }
  }
  