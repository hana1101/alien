let mgr;
let assetname = ["background", "room", "workplace", "drawingrule", "roomblur","zib1", "zib2","zib3","zib4","zib5","zib6","zib7","zib8","zib9","zib10","zib11","zib12","zib13","zib14","diary"];
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

let countGamePlayed = 0;
let total_stats = 0;
let endGame = false;
let totalSuccess = false;
let dogGame_initialized = false;

let happyEnding1, happyEnding2, happyEnding3, badEnding1, badEnding2, badEnding3;
let superPowerImg;

let isDialogueBlocking = false;
let openSound;


function preload() {
  openSound = loadSound('assets/opening.mp3');
  startPlaySound = loadSound('assets/startplay.mp3');

  for (let name of assetname) {
    assets[name] = loadImage(`assets/${name}.jpg`);
  }
  assets["startbutton"] = loadImage(`assets/startbutton.png`);
  assets["phone"] = loadImage(`assets/phone.png`);
  // assets["buddyrule1"] = loadImage(`assets/buddyrule1.jpeg`);
  // assets["figma"] = loadImage(`assets/figma.jpeg`);
  handPose = ml5.handPose();

  bgImage_notlook = loadImage("assets/notlooking.jpg");
  bgImage_look = loadImage("assets/looking.jpg");
  hand_gameRules = loadImage("assets/powerrule!.jpg");
  success_gfbg = loadImage("assets/laughend.jpg");
  fail_gfbg = loadImage("assets/relationend.jpg");
  superPowerImg = loadImage("assets/sup.png");

  neoFont = loadFont("assets/neodgm.ttf");

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
  happyEnding1 = loadImage("assets/happyending1.jpg");
  happyEnding2 = loadImage("assets/happyending2.jpg");
  happyEnding3 = loadImage("assets/happyending3.jpg");

  badEnding1 = loadImage("assets/badending1.jpg");
  badEnding2 = loadImage("assets/badending2.jpg");

  facetimebg = loadImage("assets/facetime.jpg");
  callgamerule= loadImage("assets/callgamerule.jpg");
  ftfail = loadImage("assets/ftfail.jpg");
  ftsuccess = loadImage("assets/ftsuccess.jpg");

  // zib12 = loadImage("assets/zib12.jpg");
  preloadDoodleAssets();
  preloadDogClickGame();

}

function setup() {
  textFont(neoFont);
  textSize(25);
  // textFont("Press Start 2P");
  createCanvas(1000, 625);
  btn.x = width / 2 - btn.w / 2;
  btn.y = height / 2 + 50;
  startTime = millis();

  walletItem = new item(
    width / 5 - 100,
    height / 3 + 50,
    drawWallet,
    "Wallet",
    0.8,
    250,
    180
  );
  phoneItem = new item(
    width / 5 + 270,
    height / 3 + 20,
    drawPhone,
    "Phone",
    0.8,
    130,
    250
  );
  diaryItem = new item(
    width / 5 + 550,
    height / 3 - 10,
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
  handleBackgroundMusic();
  if (currentScreen === "start") {
    drawStartScreen();
  }else if (currentScreen==="startscene/zib1"){
  drawZib1();
  }else if (currentScreen === "startscene/zib2"){
  drawZib2();
  }else if (currentScreen === "startscene/zib3"){
  drawZib3(); 
  }else if (currentScreen === "startscene/zib4"){
  drawZib4(); 
  }else if (currentScreen === "startscene/zib5"){
  drawZib5();
  }else if (currentScreen === "startscene/zib6"){
  drawZib6();
  }else if (currentScreen === "startscene/zib7"){
  drawZib7();
  }else if (currentScreen === "startscene/zib8"){
  drawZib8();
  }else if (currentScreen === "startscene/zib9"){
  drawZib9();
  }else if (currentScreen === "startscene/zib10"){
  drawZib10();
  }else if (currentScreen === "startscene/zib11"){
  drawZib11();
  }else if (currentScreen === "startscene/zib12"){
  drawZib12();
  }else if (currentScreen === "startscene/zib13"){
  drawZib13();
  }else if (currentScreen === "startscene/zib14"){
  drawZib14();

  } else if (currentScreen === "play") {
    drawPlayScreen();
  } else if (currentScreen === "work") {
    drawWorkscreen();
  }else if (currentScreen ==="readDiary") {
    drawDiaryscreen(); //수정

  // else if (currentScreen === "drawing") {
  //   drawingScreen();
  // }
}else if (currentScreen === "checkMsg") {
    checkMsg();
  } else if (currentScreen === "girlfriendGame") {
    if (!gfGameStarted) {
      // initializeGirlfriendHand();
      resetGame();
      gfGameStarted = true;
    }
    playGirlfriendHand();

  } else if (currentScreen === "girlfriendFT") {
    if (!faceTimeStarted) {
      initializeFaceTime();
      faceTimeStarted = true;
    }
    playFaceTime();
    
  } else if (currentScreen === "doodleGame"){
      playDoodleGame();
  } else if (currentScreen === "dogGame"){
    // dogGame이 처음 시작될 때만 초기화
    // 이 플래그는 dogGame_initialized처럼 새로운 전역 변수로 선언해야 합니다.
    // let dogGame_initialized = false; (setup() 또는 전역 변수 선언부에 추가)
    if (!dogGame_initialized) { // dogGame_initialized는 sketch.js의 전역 변수로 선언하고, setup()에서 false로 초기화
      initDogClickGame();
      dogGame_initialized = true;
    }
    playDogClickGame();
  }  else if (currentScreen ==="lifeOver"){
      lifeOverPage();
  }
    else if (currentScreen === "calculateGameResults"){
      calculatePointsPage();
  } else if (currentScreen === "gameSuccess1"){
    drawHappyEnding1();
  } else if (currentScreen === "gameSuccess2"){
    drawHappyEnding2();
  } else if (currentScreen === "gameSuccess3"){
    drawHappyEnding3();
  } else if (currentScreen === "gameFail1"){
    drawBadEnding1();
  } else if (currentScreen === "gameFail2"){
    drawBadEnding2();
  }
}


function mousePressed() {
  //change screen when click
  console.log("mouse pressed at screen:", currentScreen); // Debug line

  if (currentScreen === "start" && startisHovering()) {
    console.log("START BUTTON CLICKED"); // Debug line
    previousScreen = currentScreen;
    currentScreen = "startscene/zib1";
  }

  if (currentScreen === "startscene/zib1") {
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
    if (dialogueZib_scene8 && !dialogueZib_scene8.finished) {
      dialogueZib_scene8.handleClick();
      if (dialogueZib_scene8.finished) {
        previousScreen = currentScreen;
        currentScreen = "startscene/zib9";
      }
    }
  }

  if (currentScreen === "startscene/zib9") {
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
  
  else if (currentScreen==="readDiary" && dialogue1) {
    dialogue1.handleClick();
  
    if (dialogue1.finishedClicked) {
      previousScreen = currentScreen;
      currentScreen = "play";
      selectedItem = 'diary';
      dialogue1 = null;
    }
  } 
  
  else if (currentScreen==='checkMsg') {
    previousScreen = currentScreen;
    currentScreen='play';
    selectedItem='phone';
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

  if (currentScreen === "calculateGameResults"){
    if (totalSuccess === true){
      previousScreen = currentScreen;
      currentScreen = "gameSuccess1";
      return;
    }
    else{
      previousScreen = currentScreen;
      currentScreen = "gameFail1";
      return;
    }
  }

  if (currentScreen === "gameSuccess1"){
    console.log("gameSuccess1");
    previousScreen = currentScreen;
    currentScreen = "gameSuccess2";
  }
  else if (currentScreen === "gameSuccess2"){
    console.log("gameSuccess2");
    previousScreen = currentScreen;
    currentScreen = "gameSuccess3";
  }
  if (currentScreen === "gameFail1"){
    console.log("gameFail1");
    previousScreen = currentScreen;
    currentScreen = "gameFail2";
  }
  else if (currentScreen === "gameFail2"){
    console.log("gameFail2");
  }
}


// function keyPressed() {
//   if (keyCode === ESCAPE) {
//     console.log("esc pressed at screen:", currentScreen); // Debug line
//     // Don't allow ESC during active games
//     if ((currentScreen === "girlfriendGame" && gameStarted) ||
//         (currentScreen === "girlfriendFT" && faceTimeStart) ||
//         (currentScreen === "doodleGame" && doodleStarted && !dGameOver) ||
//         (currentScreen === "dogGame" && buddyStart)) { 
//           return;
//     }
    
//     // Clear selected item first if on play screen
//     if (currentScreen === "play" && selectedItem) {
//       selectedItem = null;
//       resetSelectedScreenFlag(); // Reset when clearing selectedItem
//       return;
//     } 
   
    
//     // Go back to previous screen
//     if (previousScreen) {
//       resetSelectedScreenFlag(); // Reset when changing screens
//       currentScreen = previousScreen;
//       selectedItem = null;
//     }
//   }
//   if (currentScreen==='play' && selectedItem===null) {
//     resetSelectedScreenFlag(); 
//     currentScreen= 'zib14'
//   }
//   // Skip functionality
//   if (key === 's' || key === 'S') {
//     console.log('s pressed', currentScreen)
//     if (currentScreen.startsWith("startscene/zib")) {
//       currentScreen = "startscene/zib11";
//     }
//   }
// }

let justInspectedItem = false

function keyPressed() {
  if (keyCode === ESCAPE) {
    console.log("ESC pressed at screen:", currentScreen);

    // Block ESC in active games
    if ((currentScreen === "girlfriendGame" && gameStarted) ||
        (currentScreen === "girlfriendFT" && faceTimeStart) ||
        (currentScreen === "doodleGame" && doodleStarted && !dGameOver) ||
        (currentScreen === "dogGame" && buddyStart)) {
      return;
    }

    // 1. ESC while inspecting item → return to play
    if (selectedItem && currentScreen === "play") {
      selectedItem = null;
      resetSelectedScreenFlag();
      justInspectedItem = true;
      return;
    }

    // 2. ESC after returning from inspection → go to zib14
    if (currentScreen === "play" && !selectedItem && justInspectedItem) {
      currentScreen = "startscene/zib14";
      justInspectedItem = false;
      previousScreen = null;
      return;
    }

    // 3. Normal back logic
    if (previousScreen) {
      resetSelectedScreenFlag();
      currentScreen = previousScreen;
      selectedItem = null;

      justInspectedItem = false;
    }
  }

  // Skip logic
  if (key === 's' || key === 'S') {
    if (currentScreen.startsWith("startscene/zib")) {
      currentScreen = "startscene/zib11";
    }
  }
}


function nextGame(){
  console.log('came here');
  pointsMinimumMet();
  if (!endGame){
    if (currentScreen !== "girlfriendGame" && currentScreen !== "girlfriendFT"){
      if (currentScreen === "doodleGame"){
        resetDoodleGameVariables();
      }else if (currentScreen === "dogGame"){
        resetDogGameVariables();
      }else if (currentScreen === "girlfriendGame"){
        resetGame();
      }
      selectedItem=null;
      currentScreen = "play";
    }
    if (currentScreen === "girlfriendGame" || currentScreen === "girlfriendFT"){
      selectedItem="phone";
      console.log('hi');
      console.log(selectedItem);
      currentScreen = "play";
    }

  }
}


