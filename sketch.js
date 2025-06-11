
let mgr;
let assetname = ["background", "room", "workplace", "drawingrule", "roomblur","zib1", "zib2","zib3","zib4","zib5","zib6","zib7","zib8","zib9","zib10","zib11","zib12"];
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
let dialoguezib = null;

//stats declare
let relationship_stats;
let career_stats;
let wellbeing_stats;
let life_stats;

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
  // zib12 = loadImage("assets/zib12.jpg");
  preloadDoodleAssets();
  preloadDogClickGame();
}

function setup() {
  textFont("Press Start 2P");
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

  if (currentScreen === "doodleGame"){
    initDoodleGame();
} else if (currentScreen === "dogGame"){
    initDogClickGame();
  }
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
  // }else if (currentScreen === "startscene/zib12"){
  // drawZib12();

  } else if (currentScreen === "play") {
    drawPlayScreen();
  } else if (currentScreen === "work") {
    drawWorkscreen();
  } else if (currentScreen === "drawing") {
    drawingScreen();
  } else if (currentScreen === "checkMsg") {
    checkMsg();
  } else if (currentScreen === "girlfriendGame") {
    if (!gfGameStarted) {
      initializeGirlfriendHand();
      gfGameStarted = true;
    }
    playGirlfriendHand();
  } else if (currentScreen === "doodleGame"){
      playDoodleGame();
  } else if (currentScreen === "dogGame"){
      playDogClickGame();
    }
  }

function drawStartScreen() {
  image(assets.background, 0, 0, width, height);
  //start button hover -> click
  if (startisHovering()) {
    cursor(HAND);
    image(assets.startbutton, btn.x - 5, btn.y - 5, btn.w + 10, btn.h + 10);
  } else {
    cursor(ARROW);
    image(assets.startbutton, btn.x, btn.y, btn.w, btn.h);
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
if (currentScreen === "startscene/zib11") {
      currentScreen = "startscene/zib11";
      console.log("startscene/zib11");
  } else if (currentScreen === "startscene/zib11") {
  currentScreen = "startscene/zib12";
  console.log("startscene/zib12");
}

// if (currentScreen === "startscene/zib12") {
//   if (dialogueZib_scene12 && !dialogueZib_scene12.finished) {
//     dialogueZib_scene12.handleClick();
//     console.log(dialogueZib_scene12.lines[dialogueZib_scene12.currentLine]);
//     if (dialogueZib_scene12.finished) {
//       currentScreen = "play";
//       console.log("play");
//     }
//   }
// }

// if (currentScreen==="play"){
//     startTime=millis();
if (currentScreen === "play") {
  startTime=millis();
  if (!selectedItem) {
    if (walletItem.isHovered()) selectedItem = "wallet";
    else if (phoneItem.isHovered()) selectedItem = "phone";
    else if (diaryItem.isHovered()) selectedItem = "diary";
  
}else if (currentScreen === "work" && dialogue) {
    dialogue.next();
} else if (currentScreen === "doodleGame") {
   mousePressedDoodleGame();
} else if (currentScreen === "dogGame") {
    mousePressedDogClickGame();
}
if (!gameStarted && gameStartBtn && gameStartBtn.isHovered()) {
  gameStartBtn.action();
  }
}


function keyPressed() {
  if (keyCode === ESCAPE) {
    if (currentScreen === "play" && selectedItem) {
      selectedItem = null;
    }
    if (
      currentScreen === "work" ||
     ((currentScreen === "drawing" || currentScreen==='checkMsg') && selectedItem)
    ) {
      currentScreen = "play";
    } 
    // else {
    //   currentScreen = "start";
    //   selectedItem = null;
    // }
  }
}

function startisHovering() {
  return (
    mouseX > btn.x &&
    mouseX < btn.x + btn.w &&
    mouseY > btn.y &&
    mouseY < btn.y + btn.h
  );
}
}
