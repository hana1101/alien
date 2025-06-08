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
let sceneIndex=0;
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
  preloadDoodleAssets();
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
}
}

function draw() {
  if (currentScreen === "start") {
    drawStartScreen();
  } else if (currentScreen==="zib1"){ 
    drawZib1();
  }else if (currentScreen === "zib2"){
    drawZib2();
  }else if (currentScreen === "zib3"){
    drawZib3(); 
  }else if (currentScreen === "play") {
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
  
    if (currentScreen === "zib1" && dialoguezib) {
   dialoguezib.next();
  } if (currentScreen === "zib2" && dialoguezib_2) {
   dialoguezib_2.next();}
  if (currentScreen==='zib1' && dialoguezib.finished == true){
    currentScreen='zib2'}
  if (currentScreen === "zib2") && dialoguezib_2) {
   dialoguezib_2.next();}
  if (currentScreen === "zib3") && dialoguezib_3) {
   dialoguezib_3.next();}
  if (currentScreen==='zib2' && dialoguezib_2.finished == true){
    currentScreen='zib3'}

  if (currentScreen="play");
    startTime=millis();}
}

 if (currentScreen === "play") {
    if (!selectedItem) {
      if (walletItem.isHovered()) selectedItem = "wallet";
      else if (phoneItem.isHovered()) selectedItem = "phone";
      else if (diaryItem.isHovered()) selectedItem = "diary";
    }
  } else if (currentScreen === "work" && dialogue) {
    dialogue.next();
  } else if (currentScreen === "doodleGame") {
    mousePressedDoodleGame(); // 낙서 게임용 클릭 핸들러
  }
  if (!gameStarted && gameStartBtn && gameStartBtn.isHovered()) {
    gameStartBtn.action();
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
