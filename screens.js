function drawPlayScreen() {
  image(assets.room, 0, 0, width, height);

  let elapsed = millis() - startTime;

  if (elapsed < 1500) {
    // D-1
    fill(0);
    textSize(50);
    textAlign(CENTER, CENTER);
    stroke(10);
    fill(255);
    text("D-1", width / 2, height / 2);
  } else if (elapsed < 2000) {
    let alphaVal = map(elapsed, 1900, 2300, 255, 0);
    textSize(50);
    textAlign(CENTER, CENTER);
    stroke(0, alphaVal);
    fill(255, alphaVal); // apply alpha to the white text
    text("D-1", width / 2, height / 2);
  } else {


 walletItem.display();
walletItem.drawLabel(20, 40);   // smaller gap below wallet, font size 20

phoneItem.display();
phoneItem.drawLabel(20, 0);

diaryItem.display();
diaryItem.drawLabel(20, 0)
    chooseitem = new pixelbutton(
      width / 2 - 150,
      100,
      300,
      80,
      19,
      "Choose your item"
    );
    chooseitem.display();
  
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
