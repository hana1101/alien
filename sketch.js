
let myFont;
let assetname = ["background", "room", "workplace"];
let startTime;
let walletItem, phoneItem, diaryItem;
let box;
let currentScreen = "start";
let assets = [];
let btn = { x: 0, y: 0, w: 130, h: 60 };
let selectedItem = null;  // track selected item

function preload() {
  for (let name of assetname) {
    assets[name] = loadImage(`assets/${name}.jpg`);
  }
  assets["startbutton"] = loadImage(`assets/startbutton.png`);
  myFont = loadFont('assets/DungGeunMo.ttf'); 


}

function setup() {
  createCanvas(1000, 625);
  btn.x = width / 2 - btn.w / 2;
  btn.y = height / 2 + 50;
  startTime = millis();

  walletItem = new item(width / 5 - 100, height / 3 + 50, drawWallet, "Wallet", 0.8, 250, 180);
  phoneItem = new item(width / 5 + 270, height / 3 + 20, drawPhone, "Phone", 0.8, 130, 250);
  diaryItem = new item(width / 5 + 550, height / 3 - 10, drawDiary, "Diary", 0.8, 200, 280);
}

function draw() {
  textFont("Press Start 2P");
  switch (currentScreen) {
    case "start":
      drawStartScreen();
      break;
    case "play":
      drawPlayScreen();
      break;
    case "work":
      drawWorkscreen();
      break;
    
  }
  

}

function drawStartScreen() {
  image(assets.background, 0, 0, width, height);
  if (isHovering()) {
    cursor(HAND);
    image(assets.startbutton, btn.x - 5, btn.y - 5, btn.w + 10, btn.h + 10);
  } else {
    cursor(ARROW);
    image(assets.startbutton, btn.x, btn.y, btn.w, btn.h);
  }
}


// function mousePressed() {
//   if (currentScreen === "start" && isHovering()) {
//     currentScreen = "play";
//     startTime = millis();
//   } else if (currentScreen === "play" && walletItem.isClicked()) {
//     currentScreen = "work";
//     boxInitialized = false; // reset dialogue setup
//   } else if (currentScreen === "play" && diaryItem.isClicked()) {
//     currentScreen = "home";
//     boxInitialized = false; // reset dialogue setup
//   }
//   else if (currentScreen === "work" && box) {
//     box.next();
//   }
// }

function mousePressed() {
  if (currentScreen === "start" && isHovering()) {
    currentScreen = "play";
    startTime = millis();
  } else if (currentScreen === "play") {
    if (!selectedItem) {
      if (walletItem.isHovered()) selectedItem = "wallet";
      else if (phoneItem.isHovered()) selectedItem = "phone";
      else if (diaryItem.isHovered()) selectedItem = "diary";
    }
  } else if (currentScreen === "work" && box) {
    box.next();
  }
}

function keyPressed() {
  if (keyCode === ESCAPE) {
    if (currentScreen === "play" && selectedItem) {
      selectedItem = null;  // back to showing all items
    } else {
      currentScreen = 'start';
      selectedItem = null;
    }
  }
}

function isHovering() {
  return mouseX > btn.x && mouseX < btn.x + btn.w && mouseY > btn.y && mouseY < btn.y + btn.h;
}

