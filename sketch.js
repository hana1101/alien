// let assetname = ["background", "room", 'workplace'];
// let startTime;
// let walletItem;
// let phoneItem;
// let diaryItem;
// let box;


// // button position and size
// const btn = {
//   x: 0,
//   y: 0,
//   w: 130,
//   h: 60,
// };
// let assets = [];
// // game state: 'start', 'play', 'options', etc.
// // let gameState = "start";
// let currentScreen = "start";


// function preload() {

//   for (let name of assetname) {
//     assets[name] = loadImage(`assets/${name}.jpg`);

//     assets["startbutton"] = loadImage(`assets/startbutton.png`);
//   }
// }

// function setup() {
//   createCanvas(1000, 625);
//   // center button coordinates start
//   btn.x = width / 2 - btn.w / 2;
//   btn.y = height / 2 + 50;
//   startTime = millis();
//   walletItem = new item(width / 5-100, height / 3 + 50, drawWallet, "Wallet", 0.8 ,250, 180);
//   phoneItem = new item(width / 5 + 270, height / 3 + 20, drawPhone, "Phone", 0.8, 130, 250);
//   diaryItem = new item(width / 5 + 550, height / 3 - 10, drawDiary, "Diary", 0.8, 200, 280);

// }

// function draw() {
//   background(220);

//   // switch (gameState) {
//   //   case "start":
//   //     drawStartScreen();
//   //     break;
//   //   case "play":
//   //     drawPlayScreen();
//   //     break;
//   //   // add more cases for other screens
//   //   default:
//   //     drawStartScreen();
      
//   // }

//   function draw() {
//     if (currentScreen === "start") {
//       drawStartScreen();
//     } else if (currentScreen === "play") {
//       drawPlayScreen();
//     } else if (currentScreen === "work") {
//       drawWorkscreen();
//     }
//   }
// }

// function drawStartScreen() {
//   // draw background
//   image(assets.background, 0, 0, width, height);
//   // draw and hover effect on start button
//   if (isHovering()) {
//     cursor(HAND);
//     image(assets.startbutton, btn.x - 5, btn.y - 5, btn.w + 10, btn.h + 10);
//   } else {
//     cursor(ARROW);
//     image(assets.startbutton, btn.x, btn.y, btn.w, btn.h);
//   }
// }



// // function mousePressed() {
// //   if (gameState === "start" && isHovering()) {
// //     // go to play screen
// //     gameState = "play";
  
// //   }

// //   // add click logic for other screens if needed
// // }

// function mousePressed() {
//   if (currentScreen === "start" && isHovering()) {
//     currentScreen = "play";
//     startTime = millis();
//   }
//   else if (currentScreen === "play" && walletItem.isClicked()) {
//     currentScreen = "work";
//     box = null; // reset dialogue box when entering work
//   } else if (currentScreen === "work" && box) {
//     box.next();
//   }
// }

// function keyPressed() {
//   if (gameState === "play" && keyCode === ESCAPE) {
//     // return to start screen
//     gameState = "start";
//   }
// }

// // returns true when mouse is over the button area on the start screen
let myFont;
let assetname = ["background", "room", "workplace"];
let startTime;
let walletItem, phoneItem, diaryItem;
let box;
let currentScreen = "start";
let assets = [];
let btn = { x: 0, y: 0, w: 130, h: 60 };

function preload() {
  for (let name of assetname) {
    assets[name] = loadImage(`assets/${name}.jpg`);
  }
  assets["startbutton"] = loadImage(`assets/startbutton.png`);
  myFont = loadFont('assets/DungGeunMo.ttf'); // 폰트 경로에 맞게 수정

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
  if (currentScreen === "start") {
    drawStartScreen();
  } else if (currentScreen === "play") {
    drawPlayScreen();
  } else if (currentScreen === "work") {
    drawWorkscreen();
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

function drawPlayScreen() {
  image(assets.room, 0, 0, width, height);
  let elapsed = millis() - startTime;
  if (elapsed < 1900) {
    fill(255);
    textSize(50);
    textAlign(CENTER, CENTER);
    text("D-1", width / 2, height / 2);
  } else if (elapsed < 2300) {
    let alphaVal = map(elapsed, 1900, 2300, 255, 0);
    fill(255, alphaVal);
    textSize(50);
    textAlign(CENTER, CENTER);
    text("D-1", width / 2, height / 2);
  } else {
    walletItem.display();
    walletItem.drawLabel(20, 40);
    phoneItem.display();
    phoneItem.drawLabel(20, 0);
    diaryItem.display();
    diaryItem.drawLabel(20, 0);
  }
}

function mousePressed() {
  if (currentScreen === "start" && isHovering()) {
    currentScreen = "play";
    startTime = millis();
  } else if (currentScreen === "play" && walletItem.isClicked()) {
    currentScreen = "work";
    boxInitialized = false; // reset dialogue setup
  } else if (currentScreen === "work" && box) {
    box.next();
  }
}

function isHovering() {
  return mouseX > btn.x && mouseX < btn.x + btn.w && mouseY > btn.y && mouseY < btn.y + btn.h;
}
