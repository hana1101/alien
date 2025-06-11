let selectedItem=null;

function drawPlayScreen() {
  image(assets.room, 0, 0, width, height);
  let elapsed = millis() - startTime;
  if (elapsed < 1500) {
    // D-1
    textSize(50);
    textAlign(CENTER, CENTER);
    fill(255);
    text("D-1", width / 2, height / 2);
  } else if (elapsed < 2000) {
    let alphaVal = map(elapsed, 1900, 2300, 255, 0);
    textSize(50);
    textAlign(CENTER, CENTER);
    fill(255, alphaVal); 
    text("D-1", width / 2, height / 2);
  } else {
    if (!selectedItem) {
      walletItem.display();
      walletItem.drawLabel(20, 40);

      phoneItem.display();
      phoneItem.drawLabel(20, 0);

      diaryItem.display();
      diaryItem.drawLabel(20, 0);

      chooseitem = new pixelbutton(
        width / 2 - 150,
        100,
        300,
        80,
        19,
        "Choose your item"
      );
      chooseitem.display();
    } else {
      drawSelectedScreen(selectedItem);
    }
  }
}

let boxInitialized = false;

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
  image(assets.room, 0, 0, width, height);

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
