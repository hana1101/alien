let mgr;
let assetname = ["roomnight", "background", "room", "workplace", 'relationend2', "wallet", "drawingrule", "roomblur", "zib1", "zib2", "zib3", "zib4", "zib5", "zib6", "zib7", "zib8", "zib9", "zib10", "zib11", "zib12", "zib13", "zib14", "diary"];
let startTime;
let walletItem, phoneItem, diaryItem;
let dialogue;
let currentScreen = "start";
let assets = [];
let btn = { x: 0, y: 0, w: 130, h: 60 };
let gfGameStarted;
let faceTimeStarted;
let dialoguezib = null;
let neoFont;
let startPlaySound;
let relationship_stats;
let career_stats;
let wellbeing_stats;
let life_stats;
let neoFontBold
let countGamePlayed = 0;
let total_stats = 0;
let endGame = false;
let totalSuccess = false;
let dogGame_initialized = false;
let pendingDialogueReset = null;
let roomnight
let happyEnding1, happyEnding2, happyEnding3, badEnding1, badEnding2, badEnding3;
let superPowerImg;
let isDialogueBlocking = false;
let openSound;
var showItemPopup = false;
let buddySound;
let drawingSound;
let unav;
let dialogueEnd_scene0 = null;
let dialogueEnd_scene1 = null;
let dialogueEnd_scene2 = null;
let dialogueEnd_scene3 = null;
let powerSound;
let lifeOverScenebg;
let happyending3;
let restartButton_badEnding;
let buttonClickSound;
let ftsong;
let badendSound;
let goodendSound;
let correctSFX
let wrongSFX
let gfwow
let relationend2;

function preload() {
  openSound = loadSound('assets/opening.mp3');
  startPlaySound = loadSound('assets/startplay.mp3');
  buddySound = loadSound('assets/buddybgm.mp3');
  drawingSound = loadSound('assets/drawingbgm.mp3');
  powerSound = loadSound('assets/superbgm.mp3');
  buttonClickSound = loadSound('assets/button2.mp3');//
  ftsong = loadSound('assets/ftsong.mp3');
  badendSound = loadSound('assets/badending2.mp3');
  goodendSound = loadSound('assets/happyendingbgm.mp3');
  correctSFX = loadSound('assets/correct.mp3');
  wrongSFX = loadSound('assets/gfhuh.mp3');
  gfwow = loadSound('assets/gfwow.mp3');
  relationend2 = loadImage('assets/relationend2.jpg');

  for (let name of assetname) {
    assets[name] = loadImage(`assets/${name}.jpg`);
  }
  assets["startbutton"] = loadImage(`assets/startbutton.png`);
  assets["phone"] = loadImage(`assets/phone.png`);
  relationend2 = loadImage('assets/relationend2.jpg')
  ufo = loadImage('assets/ufo.png')
  handPose = ml5.handPose();
  // glowCursor = loadImage('assets/cursorglow.png');


  bgImage_notlook = loadImage("assets/notlooking.jpg");
  bgImage_look = loadImage("assets/looking.jpg");
  hand_gameRules = loadImage("assets/powerrule!.jpg");
  success_gfbg = loadImage("assets/laughend.jpg");
  fail_gfbg = loadImage("assets/relationend.jpg");
  // superPowerImg = loadImage("assets/sup.png");
  superPowerImg = loadImage("assets/supPink.png");
  pressfont = loadFont('assets/PressStart2P-Regular.ttf')
  // neoFont = loadFont("assets/neodgm.ttf");
  neoFont = loadFont("assets/dgm.ttf");
  roomnight = loadImage("assets/roomnight.jpg")
  unav = loadImage("assets/unav.jpg");



  zib1 = loadImage("assets/zib1.jpg");
  zib2 = loadImage("assets/zib2.jpg");
  zib3 = loadImage("assets/zib3.jpg");
  zib4 = loadImage("assets/zib4.jpg");
  zib5 = loadImage("assets/zib5.jpg");
  zib6 = loadImage("assets/zib6.jpg");
  zib7 = loadImage("assets/zib7.jpg");
  zib8 = loadImage("assets/zib8.jpg");
  zib9 = loadImage("assets/zib9.jpg");
  zib10 = loadImage("assets/zib10.jpg");
  zib11 = loadImage("assets/zib11.jpg");
  zib12 = loadImage("assets/zib12.jpg");
  zib13 = loadImage("assets/zib13.jpg");
  zib14 = loadImage("assets/zib14.jpg");

  //endingScene preloads
  lifeOverScenebg = loadImage("assets/lifezero.jpg");
  calculateScenebg = loadImage("assets/calculate.jpg");
  happyEnding0 = loadImage("assets/calculate.jpg");
  happyEnding1 = loadImage("assets/happyending1.jpg");
  happyEnding2 = loadImage("assets/happyending2.jpg");
  happyEnding3 = loadImage("assets/happyending3.jpg");
  happyEnding4 = loadImage("assets/happyending3.jpg");
  lifeOverScenebg = loadImage("assets/lifezero.jpg");

  badEnding1 = loadImage("assets/badending1.jpg");
  badEnding2 = loadImage("assets/badending2.jpg");

  facetimebg = loadImage("assets/facetime.jpg");
  callgamerule = loadImage("assets/callgamerule.jpg");
  ftfail = loadImage("assets/ftfail.jpg");
  ftsuccess = loadImage("assets/ftsuccess.jpg");

  preloadDoodleAssets();
  preloadDogClickGame();

}

function setup() {
  createCanvas(1000, 625);
  // cursor(glowCursor, 8, 8);
  noCursor(); // Hide system cursor

  textFont(neoFont);
  textSize(25);
  btn.x = width / 2 - btn.w / 2 - 20;
  btn.y = height / 2 + 40;
  startTime = millis();

  walletItem = new item(
    width / 5 - 100,
    height / 3 + 70,
    drawWallet,
    "Wallet",
    0.8,
    250,
    180
  );

  wella = new item()
  phoneItem = new item(
    width / 5 + 270,
    height / 3 + 40,
    drawPhone,
    "Phone",
    0.8,
    130,
    250
  );
  diaryItem = new item(
    width / 5 + 550,
    height / 3 + 10,
    drawDiary,
    "Diary",
    0.8,
    200,
    280
  );


  //initialize stats
  initialSetStats();
  initDoodleGame();
  initDogClickGame();
  dogGame_initialized = false;
  initializeGirlfriendHand();


}
function draw() {
  // if (glowCursor) {
  //   // offset so the “tip” of the arrow lands where we click:
  //   let hotspotX = 0;
  //   let hotspotY = 0;
  //   image(glowCursor, mouseX - hotspotX, mouseY - hotspotY);
  // }
  // image(glowCursor, mouseX - 8, mouseY - 8); // Draw cursor at mouse position

  handleBackgroundMusic();
  if (pendingDialogueReset) {
    DialogueBox.maybeReset(pendingDialogueReset);
  }

  if (currentScreen === "start") {
    drawStartScreen();

  } else if (currentScreen === "startscene/zib1") {
    drawZib1();

  } else if (currentScreen === "startscene/zib2") {
    drawZib2();

  } else if (currentScreen === "startscene/zib3") {
    drawZib3();

  } else if (currentScreen === "startscene/zib4") {
    drawZib4();

  } else if (currentScreen === "startscene/zib5") {
    drawZib5();

  } else if (currentScreen === "startscene/zib6") {
    drawZib6();

  } else if (currentScreen === "startscene/zib7") {
    drawZib7();

  } else if (currentScreen === "startscene/zib8") {
    drawZib8();

  } else if (currentScreen === "startscene/zib9") {
    drawZib9();

  } else if (currentScreen === "startscene/zib10") {
    drawZib10();

  } else if (currentScreen === "startscene/zib11") {
    drawZib11();

  } else if (currentScreen === "startscene/zib12") {
    drawZib12();

  } else if (currentScreen === "startscene/zib13") {
    drawZib13();

  } else if (currentScreen === "startscene/zib14") {
    drawZib14();

  } else if (currentScreen === "play") {
    drawPlayScreen();
    if (currentScreen === 'itempopup') {
      drawPopup()
    }

  } else if (currentScreen === "work") {
    drawWorkscreen();

  } else if (currentScreen === "readDiary") {
    drawDiaryscreen();

  } else if (currentScreen === "checkMsg") {
    checkMsg();

  } else if (currentScreen === "girlfriendGame") {
    if (!gfGameStarted) {
      resetGame();
      gfGameStarted = true;
    }
    playGirlfriendHand();

  } else if (currentScreen === "fTOver") {
    endingSceneFT();

  } else if (currentScreen === "girlfriendFT") {
    if (!facetimeOver && !faceTimeStarted) {
      initializeFaceTime();
      faceTimeStarted = true;
    }
    playFaceTime();

  } else if (currentScreen === "doodleGame") {
    playDoodleGame();

  } else if (currentScreen === "dogGame") {
    if (!dogGame_initialized) {
      initDogClickGame();
      dogGame_initialized = true;
    }
    playDogClickGame();

  } else if (currentScreen === "lifeOver") {
    showEndingPage(false);

  } else if (currentScreen === "calculateGameResults") {
    calculatePointsPage();

  } else if (currentScreen === "gameSuccess0") {
    drawHappyEnding0();

  } else if (currentScreen === "gameSuccess1") {
    drawHappyEnding1();

  } else if (currentScreen === "gameSuccess2") {
    drawHappyEnding2();

  } else if (currentScreen === "gameSuccess3") {
    drawHappyEnding3();

  } else if (currentScreen === "gameFail1") {
    drawBadEnding1();
  } else if (currentScreen === "gameFail2") {
    drawBadEnding2();
  }
}


function mousePressed() {

  //change screen when click
  console.log("mouse pressed at screen:", currentScreen); // Debug line

  if (currentScreen === 'lifeOver') {
    window.location.reload();
    return;
  }

  if (currentScreen === 'happyEnding4') {
    window.location.reload();
    return;
  }

  if (currentScreen === 'gameSuccess4') {
    window.location.reload();
    return;
  }

  if (currentScreen === "gameFail2" && restartButton_badEnding) {
    window.location.reload();
    return;
  }

  if (currentScreen === "start" && startisHovering()) {
    console.log("START BUTTON CLICKED"); // Debug line
    previousScreen = currentScreen;

    currentScreen = "startscene/zib1";
  }

  if (currentScreen === "startscene/zib1") {
    if (dialogueZib_scene1 && dialogueZib_scene1.finished) {
      dialogueZib_scene1.reset();
    }
    if (dialogueZib_scene1 && !dialogueZib_scene1.finished) {
      dialogueZib_scene1.handleClick();
      console.log(dialogueZib_scene1.lines[dialogueZib_scene1.currentLine]);
      if (dialogueZib_scene1.finished) {
        previousScreen = currentScreen;
        currentScreen = "startscene/zib2";
        console.log("startscene/zib2");

      }
    }
  }

  if (currentScreen === "startscene/zib2") {
    if (dialogueZib_scene2 && dialogueZib_scene2.finished) {
      dialogueZib_scene2.reset();
    }
    if (dialogueZib_scene2 && !dialogueZib_scene2.finished) {
      dialogueZib_scene2.handleClick();
      console.log(dialogueZib_scene2.lines[dialogueZib_scene2.currentLine]);
      if (dialogueZib_scene2.finished) {
        previousScreen = currentScreen;
        currentScreen = "startscene/zib3";
        console.log("startscene/zib3");
      }
    }
  }

  if (currentScreen === "startscene/zib3") {
    if (dialogueZib_scene3 && dialogueZib_scene3.finished) {
      dialogueZib_scene3.reset();
    }
    if (dialogueZib_scene3 && !dialogueZib_scene3.finished) {
      dialogueZib_scene3.handleClick();
      console.log(dialogueZib_scene3.lines[dialogueZib_scene3.currentLine]);
      if (dialogueZib_scene3.finished) {
        previousScreen = currentScreen;
        currentScreen = "startscene/zib4";
        console.log("startscene/zib4");
      }
    }
  }

  if (currentScreen === "startscene/zib4") {
    if (dialogueZib_scene4 && dialogueZib_scene4.finished) {
      dialogueZib_scene4.reset();
    }
    if (dialogueZib_scene4 && !dialogueZib_scene4.finished) {
      dialogueZib_scene4.handleClick();
      console.log(dialogueZib_scene4.lines[dialogueZib_scene4.currentLine]);
      if (dialogueZib_scene4.finished) {
        previousScreen = currentScreen;
        currentScreen = "startscene/zib5";
        console.log("startscene/zib5");
      }
    }
  }

  if (currentScreen === "startscene/zib5") {
    if (dialogueZib_scene5 && dialogueZib_scene5.finished) {
      dialogueZib_scene5.reset();
    }
    if (dialogueZib_scene5 && !dialogueZib_scene5.finished) {
      dialogueZib_scene5.handleClick();
      console.log(dialogueZib_scene5.lines[dialogueZib_scene5.currentLine]);
      if (dialogueZib_scene5.finished) {
        previousScreen = currentScreen;
        currentScreen = "startscene/zib6";
        console.log("startscene/zib6");
      }
    }
  }

  if (currentScreen === "startscene/zib6") {
    if (dialogueZib_scene6 && dialogueZib_scene6.finished) {
      dialogueZib_scene6.reset();
    }
    if (dialogueZib_scene6 && !dialogueZib_scene6.finished) {
      dialogueZib_scene6.handleClick();
      console.log(dialogueZib_scene6.lines[dialogueZib_scene6.currentLine]);
      if (dialogueZib_scene6.finished) {
        previousScreen = currentScreen;
        currentScreen = "startscene/zib7";
        console.log("startscene/zib7");
      }
    }
  }

  if (currentScreen === "startscene/zib7") {
    if (dialogueZib_scene7 && dialogueZib_scene7.finished) {
      dialogueZib_scene7.reset();
    }
    if (dialogueZib_scene7 && !dialogueZib_scene7.finished) {
      dialogueZib_scene7.handleClick();
      console.log(dialogueZib_scene7.lines[dialogueZib_scene7.currentLine]);
      if (dialogueZib_scene7.finished) {
        previousScreen = currentScreen;
        currentScreen = "startscene/zib8";
        console.log("startscene/zib8");
      }
    }
  }

  if (currentScreen === "startscene/zib8") {
    if (dialogueZib_scene8 && dialogueZib_scene8.finished) {
      dialogueZib_scene8.reset();
    }
    if (dialogueZib_scene8 && !dialogueZib_scene8.finished) {
      dialogueZib_scene8.handleClick();
      if (dialogueZib_scene8.finished) {
        previousScreen = currentScreen;
        currentScreen = "startscene/zib9";
      }
    }
  }

  if (currentScreen === "startscene/zib9") {
    if (dialogueZib_scene9 && dialogueZib_scene9.finished) {
      dialogueZib_scene9.reset();
    }
    if (dialogueZib_scene9 && !dialogueZib_scene9.finished) {
      dialogueZib_scene9.handleClick();
      console.log(dialogueZib_scene9.lines[dialogueZib_scene9.currentLine]);
      if (dialogueZib_scene9.finished) {
        previousScreen = currentScreen;
        currentScreen = "startscene/zib10";
        console.log("startscene/zib10");
      }
    }
  }

  if (currentScreen === "startscene/zib10") {
    if (dialogueZib_scene10 && dialogueZib_scene10.finished) {
      dialogueZib_scene10.reset();
    }
    if (dialogueZib_scene10 && !dialogueZib_scene10.finished) {
      dialogueZib_scene10.handleClick();
      console.log(dialogueZib_scene10.lines[dialogueZib_scene10.currentLine]);
      if (dialogueZib_scene10.finished) {
        previousScreen = currentScreen;
        currentScreen = "startscene/zib11";
        console.log("startscene/zib11");
      }
    }
  }
  else if (currentScreen === "startscene/zib11") {

    previousScreen = currentScreen;
    currentScreen = "startscene/zib12";
    console.log("startscene/zib12");
  }

  else if (currentScreen === "startscene/zib12") {
    previousScreen = currentScreen;
    currentScreen = "startscene/zib13";
    console.log("startscene/zib13");
  }

  else if (currentScreen === "startscene/zib13") {
    previousScreen = currentScreen;
    currentScreen = "startscene/zib14";
    console.log("startscene/zib14");
  }

  else if (currentScreen === "startscene/zib14") {
    previousScreen = currentScreen;
    currentScreen = "play";
    console.log("play");
  }

  else if (currentScreen === "play") {
    if (!selectedItem) {
      if (walletItem.isHovered()) {
        previousScreen = currentScreen;
        selectedItem = "wallet";
      }
      else if (phoneItem.isHovered()) {
        previousScreen = currentScreen;
        selectedItem = "phone";
      }
      else if (diaryItem.isHovered()) {
        previousScreen = currentScreen;
        selectedItem = "diary";
      }
    }
  }

  else if (currentScreen === "work" && dialogue) {
    dialogue.handleClick();

    if (dialogue.finishedClicked && !isDialogueBlocking) {
      previousScreen = currentScreen;
      currentScreen = "play";
      selectedItem = 'wallet';
      dialogue = null;
    }
  }

  else if (currentScreen === "readDiary" && dialogue1) {
    dialogue1.handleClick();

    if (dialogue1.finishedClicked) {
      previousScreen = currentScreen;
      currentScreen = "play";
      selectedItem = 'diary';
      dialogue1 = null;
    }
  }

  else if (currentScreen === 'checkMsg' && dialogueMsg) {
    dialogueMsg.handleClick();
    if (dialogueMsg.finishedClicked) {
      previousScreen = currentScreen;
      currentScreen = 'play';
      selectedItem = 'phone';
      // dialogueMsg=null;
    }
  }

  else if (currentScreen === "doodleGame") {
    mousePressedDoodleGame();
    if (clearBtn && clearBtn.isHovered()) {
      clearBtn.action();
    }
    if (resetBtn && resetBtn.isHovered()) {
      resetBtn.action();
    }
  }

  else if (currentScreen === "dogGame") {
    if (!buddyStart && buddyStartBtn && buddyStartBtn.isHovered()) {
      mousePressedDogClickGame();
    } else {
      mousePressedDogClickGame();
    }
  }
  //? is this gf game
  if (!gameStarted && gameStartBtn && gameStartBtn.isHovered()) {
    gameStartBtn.action();
  }

  if (currentScreen === "girlfriendFT" && faceTimeStart && dialogueFaceTime && !dialogueFaceTime.finished) {
    dialogueFaceTime.handleClick();
  }



  if (currentScreen === "calculateGameResults") {
    if (totalSuccess === true) {
      previousScreen = currentScreen;
      currentScreen = "gameSuccess0";
      return;
    }
    else {
      previousScreen = currentScreen;
      currentScreen = "gameFail1";
      return;
    }
  }

  if (currentScreen === "gameSuccess0") {
    if (dialogueEnd_scene0 && dialogueEnd_scene0.finished) {
      dialogueEnd_scene0.reset();
    }
    if (dialogueEnd_scene0 && !dialogueEnd_scene0.finished) {
      dialogueEnd_scene0.handleClick();
      console.log(dialogueEnd_scene0.lines[dialogueEnd_scene0.currentLine]);
      if (dialogueEnd_scene0.finished) {
        previousScreen = currentScreen;
        console.log("startscene/zib10");
        currentScreen = "gameSuccess1";
      }
    }
  }


  if (currentScreen === "gameSuccess1") {
    if (dialogueEnd_scene1 && dialogueEnd_scene1.finished) {
      dialogueEnd_scene2.reset();
    }
    if (dialogueEnd_scene1 && !dialogueEnd_scene1.finished) {
      dialogueEnd_scene1.handleClick();
      console.log(dialogueEnd_scene1.lines[dialogueEnd_scene1.currentLine]);
      if (dialogueEnd_scene1.finished) {
        previousScreen = currentScreen;
        console.log("startscene/zib10");
        currentScreen = "gameSuccess2";
      }
    }
  }

  if (currentScreen === "gameSuccess2") {
    if (dialogueEnd_scene2 && dialogueEnd_scene2.finished) {
      dialogueEnd_scene3.reset();
    }
    if (dialogueEnd_scene2 && !dialogueEnd_scene2.finished) {
      dialogueEnd_scene2.handleClick();
      console.log(dialogueEnd_scene2.lines[dialogueEnd_scene2.currentLine]);
      if (dialogueEnd_scene2.finished) {
        previousScreen = currentScreen;
        console.log("startscene/zib10");
        currentScreen = "gameSuccess3";
      }
    }
  }

  if (currentScreen === "gameSuccess3") {
    // if (dialogueEnd_scene3 && dialogueEnd_scene3.finished) {
    //   gameSuccess4Page.reset(); // need 
    // }
    if (dialogueEnd_scene3 && !dialogueEnd_scene3.finished) {
      dialogueEnd_scene3.handleClick();
      console.log(dialogueEnd_scene3.lines[dialogueEnd_scene3.currentLine]);
      if (dialogueEnd_scene3.finished) {
        previousScreen = currentScreen;
        console.log("startscene/zib10");
        currentScreen = "gameSuccess4";
      }
    }
  }

  // else if (currentScreen === "gameSuccess2"){
  //   console.log("gameSuccess2");
  //   previousScreen = currentScreen;
  //   currentScreen = "gameSuccess3";
  // }
  if (currentScreen === "gameFail1") {
    console.log("gameFail1");
    previousScreen = currentScreen;
    currentScreen = "gameFail2";
  }
  else if (currentScreen === "gameFail2") {
    console.log("gameFail2");
  }
}



let justInspectedItem = false

function keyPressed() {
  if (keyCode === ESCAPE) {



    // 1. ESC inside active game (block)
    if ((currentScreen === "girlfriendGame" && gameStarted) ||
      (currentScreen === "girlfriendFT" && faceTimeStart) ||
      (currentScreen === "doodleGame" && doodleStarted && !dGameOver) ||
      (currentScreen === "dogGame" && buddyStart)) {
      return;
    }


    // 2. ESC from mini-game → go back to play + set selectedItem
    if (['girlfriendGame', 'girlfriendFT', 'doodleGame', 'dogGame'].includes(currentScreen)) {
      let prev = currentScreen;

      // set item FIRST before switching
      if (prev === 'girlfriendGame' || prev === 'girlfriendFT') {
        selectedItem = 'phone';
      } else if (prev === 'doodleGame') {
        selectedItem = 'wallet';
      } else if (prev === 'dogGame') {
        selectedItem = 'diary';
      }

      resetSelectedScreenFlag();
      currentScreen = 'play';
      return;
    }

    // 3. Close item inspection
    if (selectedItem && currentScreen === "play") {
      selectedItem = null;
      resetSelectedScreenFlag();
      justInspectedItem = true;
      return;
    }

    // 4. After inspection → zib14
    if (currentScreen === "play" && !selectedItem && justInspectedItem) {
      currentScreen = "startscene/zib14";
      justInspectedItem = false;
      previousScreen = null;
      return;
    }

    // 5. Default back
    if (previousScreen) {
      resetSelectedScreenFlag();

      // ADD THIS BLOCK HERE ↓
      if (currentScreen.startsWith("startscene/zib")) {
        const match = currentScreen.match(/zib(\d+)/);
        if (match) {
          let num = parseInt(match[1]);
          if (num > 1) {
            currentScreen = `startscene/zib${num - 1}`;
            // Reset the dialogue variable so clicks work
            window[`dialogueZib_scene${num - 1}`] = null;
            return;
          }
        }
      }
      // ADD THIS BLOCK HERE ↑

      currentScreen = previousScreen;
      selectedItem = null;
      justInspectedItem = false;
      console.log("ESC pressed:", currentScreen, 'prev:', previousScreen);
    }
  }
  // Skip logic
  if (key === 's' || key === 'S') {
    if (currentScreen.startsWith("startscene/zib")) {
      currentScreen = "startscene/zib11";
    }
  }
}









function nextGame() {
  console.log('came here');
  pointsMinimumMet();

  if (!endGame) {
    if (currentScreen !== "girlfriendGame" && currentScreen !== "girlfriendFT" && currentScreen !== "fTOver") {
      if (currentScreen === "doodleGame") {
        resetDoodleGameVariables();
        selectedItem = null;
        currentScreen = "play";
        return;
      } else if (currentScreen === "dogGame") {
          resetDogGameVariables();
          selectedItem = null;
          currentScreen = "play";
          return;
      }
      selectedItem = null;
      currentScreen = "play";
      return;
    }
    if (currentScreen === "girlfriendGame" || currentScreen === "girlfriendFT" || currentScreen === "fTOver") {
      if (currentScreen === "girlfriendGame") {
        resetGame();
      }
      selectedItem = "phone";
      console.log('hi');
      console.log(selectedItem);
      currentScreen = "play";
      return;

    }

  }
}



