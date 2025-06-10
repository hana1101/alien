let mgr;
let assetname = ["background", "room", "workplace", "drawingrule", "roomblur","zib1", "zib2","zib3"];
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
// let dialoguezib = null;
// let dialoguezib_2 = null;
// let dialoguezib_3 = null;

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
  // }else if (currentScreen === "startscene/zib2"){
  //   drawStartScene/Zib2();
  // }else if (currentScreen === "startscene/zib3"){
  //   drawStartScene/Zib3(); 
  //  }

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
  //change screen wehn click
  console.log("mouse pressed at screen:", currentScreen); // Debug line

  if (currentScreen === "start" && startisHovering()) {
    console.log("START BUTTON CLICKED"); // Debug line

    //debug for now
    //currentScreen = "play";
    currentScreen = "startscene/zib1";

//revisit later
  if (currentScreen === "startscene/zib1") {
    console.log ("startsceme/zib1");
    console.log(dialogueZib.currentLine);
    if(!dialogueZib.finished){
      if(dialogueZib.isHovered()){
        dialogueZib.handleClick();
      }
    }

  //  dialoguezib.next(); 
  //  if (currentScreen === "startscene/zib2" && dialoguezib_2) {
  //  dialoguezib_2.next();} 
  //  if (currentScreen==='startscene/zib1' && dialoguezib.finished == true){
  //   currentScreen='startscene/zib2'}
  // if (currentScreen === "startscene/zib2" && dialoguezib_2) {
  //  dialoguezib_2.next();}
  // if (currentScreen === "startscene/zib3" && dialoguezib_3) {
  //  dialoguezib_3.next();}
  // if (currentScreen==='startscene/zib2' && dialoguezib_2.finished == true){
  //   currentScreen='startscene/zib3'}
  } 
if (currentScreen==="play");
    startTime=millis();
if (currentScreen === "play") {
  startTime=millis();
  if (!selectedItem) {
    if (walletItem.isHovered()) selectedItem = "wallet";
    else if (phoneItem.isHovered()) selectedItem = "phone";
    else if (diaryItem.isHovered()) selectedItem = "diary";
    }
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
