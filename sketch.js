let mgr;
let assetname = ["background", "room", "workplace", "drawingrule", "roomblur","zib1", "zib2","zib3","zib4","zib5","zib6","zib7","zib8","zib9","zib10","zib11","zib12","zib13","zib14","diary"];
let startTime;
let walletItem, phoneItem, diaryItem;
let dialogue;
let currentScreen = "start";
let assets = [];
let btn = { x: 0, y: 0, w: 130, h: 60 };
let spaceblue,
  neongreen,
  brightpink,
  cyanblue,
  lightblue,
  ufoPurple,
  starcolor,
  zibgreen;
let gfGameStarted;
let faceTimeStarted;
let dialoguezib = null;
let neoFont;


//stats declare
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

function preload() {
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
  textSize(30);
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

  spaceblue = color(10, 10, 40);
  neongreen = color(0, 255, 153);
  brightpink = color(255, 0, 255);
  cyanblue = color(114, 255, 251);
  lightblue = color(98, 176, 255);
  ufoPurple = color(167, 91, 255);
  starcolor = color(255, 235, 59);
  zibgreen = color("#92C367");

  //initialize stats
  initialSetStats();
  initDoodleGame();
  initDogClickGame();
  dogGame_initialized = false;


}

function draw() {
  
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
      initializeGirlfriendHand();
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

    //debug for now
    //currentScreen = "play";
    currentScreen = "startscene/zib1";
  }
//revisit later
  if (currentScreen === "startscene/zib1") {
  if (dialogueZib_scene1 && !dialogueZib_scene1.finished) {
    dialogueZib_scene1.handleClick();
    console.log(dialogueZib_scene1.lines[dialogueZib_scene1.currentLine]);
    if (dialogueZib_scene1.finished) {
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
      currentScreen = "startscene/zib3";
      console.log("startscene/zib3");
    }
  }
}

//only for now -> change later
  if (currentScreen === "startscene/zib3") {
  if (dialogueZib_scene3 && !dialogueZib_scene3.finished) {
    dialogueZib_scene3.handleClick();
    console.log(dialogueZib_scene3.lines[dialogueZib_scene3.currentLine]);
    if (dialogueZib_scene3.finished) {
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
      currentScreen = "startscene/zib8";
      console.log("startscene/zib8");
    }
  }
}
if (currentScreen === "startscene/zib8") {
  if (dialogueZib_scene8 && !dialogueZib_scene8.finished) {
    dialogueZib_scene8.handleClick();
    console.log(dialogueZib_scene8.lines[dialogueZib_scene8.currentLine]);
    if (dialogueZib_scene8.finished) {
      currentScreen = "startscene/zib9";
      console.log("startscene/zib9");
    }
  }
}
if (currentScreen === "startscene/zib9") {
  if (dialogueZib_scene9 && !dialogueZib_scene9.finished) {
    dialogueZib_scene9.handleClick();
    console.log(dialogueZib_scene9.lines[dialogueZib_scene9.currentLine]);
    if (dialogueZib_scene9.finished) {
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
      currentScreen = "startscene/zib11";
      console.log("startscene/zib11");
    }
  }
}
else if (currentScreen === "startscene/zib11") {
  currentScreen = "startscene/zib12";
  console.log("startscene/zib12");
}

// zib12 → zib13 (화면 클릭 시)
else if (currentScreen === "startscene/zib12") {
  currentScreen = "startscene/zib13";
  console.log("startscene/zib13");
}

else if (currentScreen === "startscene/zib13") {
  currentScreen = "startscene/zib14";
  console.log("startscene/zib14");
}

else if (currentScreen === "startscene/zib14") {
  currentScreen = "play";
  console.log("play");
}

 else if (currentScreen === "play") {
  if (!selectedItem) {
    if (walletItem.isHovered()) selectedItem = "wallet";
    else if (phoneItem.isHovered()) selectedItem = "phone";
    else if (diaryItem.isHovered()) selectedItem = "diary";
  
  }}
  
  else if (currentScreen === "work" && dialogue) {
    dialogue.handleClick();
  
    if (dialogue.finishedClicked && !isDialogueBlocking) {
      currentScreen = "play";
      selectedItem = 'wallet'; 
      dialogue = null;

    }
  }
  
  else if (currentScreen==="readDiary" && dialogue1) { // 수정함
    dialogue1.handleClick();
  
    if (dialogue1.finishedClicked) {
      currentScreen = "play";
      selectedItem = 'diary';
      dialogue1 = null;
    }
  } else if (currentScreen==='checkMsg') {
    currentScreen='play';
    selectedItem='phone';
    
  }

 else if (currentScreen === "doodleGame") {
    // if (doodleStarted && dGameOver && doodlePhase === 2) {
    //   currentScreen = "play";
    //   selectedItem=!selectedItem;
    //   resetDoodleGameVariables();
    //   // 다른 게임의 초기화 플래그도 false로 설정하여, 다음 진입 시 해당 게임이 초기화되도록 함
    //   dogGame_initialized = false; // Dog Game 초기화 플래그 리셋
    // } else if (countDoodle === 2) {
    //   doodlePhase =2 ;

    // }else {
    //   mousePressedDoodleGame();
    //   if (clearBtn && clearBtn.isHovered()) {
    //     clearBtn.action();
    //   }
    //   if (resetBtn && resetBtn.isHovered()) {
    //     resetBtn.action();
    //   }
    // }
  mousePressedDoodleGame();
    if (clearBtn && clearBtn.isHovered()) {
      clearBtn.action();
    }
    if (resetBtn && resetBtn.isHovered()) {
      resetBtn.action();
    }
  }
  // Dog Game 관련 마우스 클릭 처리 추가
  // else if (currentScreen === "dogGame") {
  //   // phase 2에서 클릭 시 홈 화면으로
  //   if (dogGameOver && dogPhase === 2) {
  //     currentScreen = "play";
  //     selectedItem=!selectedItem;
  //     resetDogGameVariables();
  //     dogGame_initialized = false; // Dog Game 초기화 플래그 리셋
  //   } else if (!buddyStart && buddyStartBtn && buddyStartBtn.isHovered()) {
  //       // buddyRulesShow() 내에서 처리됨, 여기서 직접 호출할 필요는 없음
  //       // buddyStartBtn.isClicked() 로직이 pet.js 내에 있음
  //       mousePressedDogClickGame(); // 원 클릭 처리 (이전에 buddyStart가 true가 되었다면)
  //   } else {
  //       mousePressedDogClickGame(); // 원 클릭 처리
  //   }
  // }
    else if (currentScreen === "dogGame") {
    // phase 2에서 클릭 시 홈 화면으로
      if (!buddyStart && buddyStartBtn && buddyStartBtn.isHovered()) {
        // buddyRulesShow() 내에서 처리됨, 여기서 직접 호출할 필요는 없음
        // buddyStartBtn.isClicked() 로직이 pet.js 내에 있음
        mousePressedDogClickGame(); // 원 클릭 처리 (이전에 buddyStart가 true가 되었다면)
    } else {
        mousePressedDogClickGame(); // 원 클릭 처리
    }
  }


if (!gameStarted && gameStartBtn && gameStartBtn.isHovered()) {
  gameStartBtn.action();
  }

if (currentScreen === "girlfriendFT" && faceTimeStart && dialogueFaceTime && !dialogueFaceTime.finished) {
  dialogueFaceTime.handleClick();
}

if (currentScreen === "calculateGameResults"){
  if (totalSuccess === true){
    currentScreen = "gameSuccess1";
    return;
  }
  else{
    currentScreen = "gameFail1";
    return;
  }
}

if (currentScreen === "gameSuccess1"){
  console.log("gameSuccess1");
  currentScreen = "gameSuccess2";
}
else if (currentScreen === "gameSuccess2"){
  console.log("gameSuccess2");
  currentScreen = "gameSuccess3";
}
if (currentScreen === "gameFail1"){
  console.log("gameFail1");
  currentScreen = "gameFail2";
}
else if (currentScreen === "gameFail2"){
  console.log("gameFail2");
}

}

function keyPressed() {
  if (keyCode === ESCAPE) {
    if (currentScreen === "play" && selectedItem) {
      selectedItem = null;
    }
    if (
      (currentScreen === "work" || currentScreen === "drawing" || currentScreen==='checkMsg'|| currentScreen==='readDiary') && selectedItem)
     {
      currentScreen = "play";
    } 
    
    // else {
    //   currentScreen = "start";
    //   selectedItem = null;
    // }
  }
  if (key === 's' || key === 'S') {
    if (currentScreen.startsWith("startscene/zib")) {
      currentScreen = "startscene/zib11";
      console.log("Skipped to startscene/zib11");
    }
  }
}



function nextGame(){
  console.log('came here');
  pointsMinimumMet();
  if (!endGame){
    if (currentScreen === "doodleGame"){
      resetDoodleGameVariables();
    }
    selectedItem=null;
    currentScreen = "play";
  }
}


