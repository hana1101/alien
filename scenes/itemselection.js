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

      chooseitem = new Button(
        width / 2 - 150,
        100,
        300,
        80,
        "Choose your item"
      );
      chooseitem.display();
      displayStats();
    } else {
      drawSelectedScreen(selectedItem);
      displayStats();

    }
  }
}

function drawSelectedScreen(selectedItem) {
  image(assets.room, 0, 0, width, height);

  let scaleFactor = 0.8;
  
  // ===== 아이템 중앙 배치 =====
  let itemX = width / 2;
  let itemY = height / 2 - 100; // 살짝 위로

  push();
  translate(itemX, itemY+30);

  scale(scaleFactor);
  imageMode(CENTER);
  if (selectedItem === "wallet") drawWallet(-110, -50);
  else if (selectedItem === "phone") drawPhone(-50, -140);
  else if (selectedItem === "diary") drawDiary(-80, -150);
  pop();

  // ===== 버튼 설정 =====
  let btnW = 300;
  let btnH = 60;
  let btnSpacing = 20;

  let buttonConfigs = SettingButtons(selectedItem);

  // 버튼 시작 위치는 아이템 아래 충분한 공간 확보 후 배치
  let startY = itemY + 180; // 아이템 아래로 충분히 내림
  let centerX = width / 2;

  let buttons = buttonConfigs.map((config, index) => {
    let x = centerX - btnW / 2;
    let y = startY + index * (btnH + btnSpacing);
    return new Button(x, y, btnW, btnH, config.label, config.action);
  });

  // Display and handle buttons
  buttons.forEach(btn => btn.display());
  buttons.forEach(btn => {
    if (btn.isClicked()) {
      ButtonAction(btn.action);
    }
  });
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
