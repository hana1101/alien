// let dialogue = null;

// function drawWorkscreen() {
//     if (!dialogue) {
//       let lines = [
//         "ZIB: 여기 작업실이나봐",
//         "ZIB: 할 거 진짜 많다",
//         "ZIB: 돈 많이 벌어야지",
//       ];
//       dialogue = new DialogueBox(10, 500, 980, 120, lines);
//     }
//     image(assets.workplace, 0, 0, width, height);
//     if (dialogue) dialogue.display();
//   }

let glowAlpha = 0;
let glowDirection = 2;

function drawWorkscreen() {
  if (!dialogue) {
    let lines = [
      "ZIB: 여기 작업실이나봐",
      "ZIB: 할 거 진짜 많다",
      "ZIB: 돈 많이 벌어야지",
    ];
    dialogue = new DialogueBox(10, 500, 980, 120, lines);
  }

  image(assets.workplace, 0, 0, width, height);
  dialogue.display();
  
if (dialogue && dialogue.isOnLastLine()) {
  let alpha = 127 + 127 * sin(millis() / 300);

  textAlign(RIGHT, BOTTOM);
  textFont("Press Start 2P");
  textSize(14);
  fill(0, 255, 153, alpha);
  let padding = 20;
  text(
    "CLICK HERE TO CONTINUE",
    dialogue.x + dialogue.w - padding,
    dialogue.y + dialogue.h - padding
  );
}


  // if (dialogue.finished && dialogue.finishedClicked){
  //   currentScreen='play'
  // }

}

