let selectedItem = null;
let justEnteredSelectedScreen = false;
let screenEnterTime = 0;

// tweak these to taste
let pulseSpeed = 0.05;     // how fast it pulses
let minAlpha = 0;        // fully invisible
let maxAlpha = 200;      // max glow strength
let baseSize = 10;       // your base text size
let scaleAmt = 0.05;


function drawSelectedScreen(selectedItem) {
  // Set flag when first entering this screen
  if (!justEnteredSelectedScreen) {
    justEnteredSelectedScreen = true;
    screenEnterTime = millis();
  }

  // image(assets.room, 0, 0, width, height);
  roomnight = loadImage("assets/roomnight.jpg")

  image(roomnight, 0, 0, width, height);

  let panelWidth = width / 3;
  let centerX = panelWidth / 2;
  let centerY = height / 2;
  let scaleFactor = 1.5;

  // Get item height
  let itemHeight;

  if (selectedItem === "wallet") itemHeight = walletItem.baseHeight;
  else if (selectedItem === "phone") itemHeight = phoneItem.baseHeight;
  else if (selectedItem === "diary") itemHeight = diaryItem.baseHeight;

  let drawY = centerY - (itemHeight * scaleFactor) / 2;

  // Draw selected item centered in the left panel
  push();
  translate(centerX - 10, drawY);
  scale(scaleFactor);
  if (selectedItem === "wallet") drawWallet(0, 0);
  else if (selectedItem === "phone") drawPhone(0, 0);
  else if (selectedItem === "diary") drawDiary(0, 0);
  pop();

  let btnX = width - 380;
  let btnW = 300;
  let btnH = 60;
  let btnSpacing = 20;

  let buttonConfigs = SettingButtons(selectedItem);

  // Calculate starting Y position to center buttons vertically
  let totalButtonsHeight = (buttonConfigs.length * btnH) + ((buttonConfigs.length - 1) * btnSpacing);
  let startY = (height - totalButtonsHeight) / 2;

  let buttons = buttonConfigs.map((config, index) => {
    let y = startY + index * (btnH + btnSpacing);
    return new Button(btnX, y, btnW, btnH, config.label, config.action);
  });

  // Display all buttons
  buttons.forEach(btn => btn.display());

  // Handle button clicks only after delay
  if (millis() - screenEnterTime > 500) { // Increased to 200ms for safety
    buttons.forEach(btn => {
      if (btn.isClicked()) {
        ButtonAction(btn.action);
      }
    });
  }
  drawGlowingText('press Esc to Return', 30, 570);

}


function drawPlayScreen() {
  image(assets.roomblur, 0, 0, width, height);
  // let elapsed = millis() - startTime;
  // if (elapsed < 1500) {
  //   // D-1
  //   textSize(50);
  //   textAlign(CENTER, CENTER);
  //   fill(255);
  //   text("D-1", width / 2, height / 2);
  // } else if (elapsed < 2000) {
  //   let alphaVal = map(elapsed, 1900, 2300, 255, 0);
  //   textSize(50);
  //   textAlign(CENTER, CENTER);
  //   fill(255, alphaVal); 
  //   text("D-1", width / 2, height / 2);
  // } else {
  if (!selectedItem) {
    walletItem.display();
    walletItem.drawLabel(20, 40);

    phoneItem.display();
    phoneItem.drawLabel(20, 0);

    diaryItem.display();
    diaryItem.drawLabel(20, 0);

    chooseitem = new Button(
      width / 2 - 150,
      145,
      300,
      50,
      "Choose your item", 'iteminstruction'
    );

    chooseitem.display();
    if (chooseitem.isClicked()) {
      ButtonAction(chooseitem.action);
    }
    // if (chooseitem.isHovered() && mouseIsPressed && !wasMousePressed) {
    //   showItemPopup = true;

    displayStats();
  } else {
    drawSelectedScreen(selectedItem);
    displayStats();

  }

  if (showItemPopup) {
    drawPopup();
  }
}

function drawPopup() {
  push();
  rectMode(CENTER);
  textAlign(CENTER, CENTER);

  // Semi-transparent background
  fill(0, 180);
  noStroke();
  rect(width / 2, height / 2, 500, 300, 20);

  fill(255);
  textSize(20);
  textFont(neoFont)
  text("Pick carefully. Each item tells a story.", width / 2, height / 2 - 20);

  textSize(16);
  text("Release to close", width / 2, height / 2 + 60);

  // Simple click detection to close popup
  if (chooseitem.isClicked()) {
    showItemPopup = false;
  }

  pop();
}





function drawWorkscreen() {
  if (!boxInitialized) {
    let lines = [
      "ZIB: 여기 작업실이나봐",
      "ZIB: 할 거 진짜 많다",
      "ZIB: 돈 많이 벌어야지",
    ];
    box = new DialogueBox(10, 500, 980, 120, lines);
    boxInitialized = true;
  }

  image(assets.workplace, 0, 0, width, height);
  if (box) box.display();
}


//choosing wallet
function drawWalletScreen() {
  // image(assets.room, 0, 0, width, height);
  image(assets.roomnight, 0, 0, width, height);

  // Draw wallet large on left
  push();
  translate(100, height / 3);
  scale(1.5);
  drawWallet(0, 0);
  pop();

  // Draw 3 buttons on right
  let buttonX = width - 300;
  let buttonY = height / 3;
  let buttonW = 180;
  let buttonH = 60;
  fill(125, 70, 45); // brownish color for button background
  stroke(25, 13, 69);
  strokeWeight(3);
  for (let i = 0; i < 3; i++) {
    rect(buttonX, buttonY + i * (buttonH + 20), buttonW, buttonH, 10);
  }
  fill(244, 190, 78); // button circle
  noStroke();
  for (let i = 0; i < 3; i++) {
    circle(buttonX + buttonW - 40, buttonY + i * (buttonH + 20) + buttonH / 2, 25);
  }

  fill(255);
  textSize(22);
  noStroke();
  textAlign(CENTER, CENTER);
  text("Open Wallet", buttonX + buttonW / 2, buttonY + 30);
  text("Go to Work", buttonX + buttonW / 2, buttonY + 30 + buttonH + 20);
  text("Go to Work", buttonX + buttonW / 2, buttonY + 30 + 2 * (buttonH + 20));
}




function resetSelectedScreenFlag() {
  justEnteredSelectedScreen = false;
}
function goBackToMainScreen() {
  resetSelectedScreenFlag(); // Reset the flag
  currentScreen = "main";
}


function drawGlowingText(txt, x, y) {
  push();
  textAlign(LEFT, TOP);
  textFont(pressfont);

  // get a 0→1 oscillation
  let osc = (sin(frameCount * pulseSpeed) + 1) / 2;

  // map that to an alpha between minAlpha and maxAlpha
  let alpha = lerp(minAlpha, maxAlpha, osc);

  // tiny scale pulse (1-scaleAmt → 1+scaleAmt)
  let s = 1 + scaleAmt * (osc - 0.5) * 2;

  translate(x, y);
  scale(s);

  // glow outlines
  for (let i = 4; i > 0; i--) {
    let glowAlpha = alpha * (i / 4);
    stroke(1, 255, 185, glowAlpha);
    strokeWeight(i);
    fill(1, 255, 185, glowAlpha);
    textSize(baseSize);
    text(txt, 0, 0);
  }

  // main text
  noStroke();
  fill(1, 255, 112, alpha * 0.9);
  textSize(baseSize);
  text(txt, 0, 0);

  pop();
}

// function drawSelectedScreen(selectedItem) {
// image(assets.room, 0, 0, width, height);

// let panelWidth = width / 3;
// let centerX = panelWidth / 2;
// let centerY = height / 2;
// let scaleFactor = 1.5;

// // Get item height
// let itemHeight;
// if (selectedItem === "wallet") itemHeight = walletItem.baseHeight;
// else if (selectedItem === "phone") itemHeight = phoneItem.baseHeight;
// else if (selectedItem === "diary") itemHeight = diaryItem.baseHeight;

// let drawY = centerY - (itemHeight * scaleFactor) / 2;

// // Draw selected item centered in the left panel
// push();
// translate(centerX-10, drawY);
// scale(scaleFactor);
// if (selectedItem === "wallet") drawWallet(0, 0);
// else if (selectedItem === "phone") drawPhone(0, 0);
// else if (selectedItem === "diary") drawDiary(0, 0);
// pop();

// let btnX = width - 400;
// let btnW = 300;
// let btnH = 60;
// let btnSpacing = 20;

// let buttonConfigs = SettingButtons(selectedItem);

// // Calculate starting Y position to center buttons vertically
// let totalButtonsHeight = (buttonConfigs.length * btnH) + ((buttonConfigs.length - 1) * btnSpacing);
// let startY = (height - totalButtonsHeight) / 2;

// let buttons = buttonConfigs.map((config, index) => {
// let y = startY + index * (btnH + btnSpacing);
// return new Button(btnX, y, btnW, btnH, config.label, config.action);

// });

// // Display all buttons
// buttons.forEach(btn => btn.display());

// // Handle button clicks
// buttons.forEach(btn => {
//   if (btn.isClicked()) {
//     ButtonAction(btn.action);
//   }
// });
// }
