//function drawWellbeingcreen() {
//   if (!dialogue) {
//     let lines = [
//       "ZIB: 일기장",
//       "ZIB: 내가 지구에서 있는동안 할 수 있는 경험은 다 해보고 가야지",
//       "ZIB: 그럼 이 친구 직업이..",
//     ];
//     dialogue = new DialogueBox(10, 500, 980, 120, lines);
//   }

//   image(assets.workplace, 0, 0, width, height);
//   dialogue.display();
  
// if (dialogue && dialogue.isOnLastLine()) {
//   let alpha = 127 + 127 * sin(millis() / 300);

//   textAlign(RIGHT, BOTTOM);
//   textFont("Press Start 2P");
//   textSize(14);
//   fill(0, 255, 153, alpha);
//   let padding = 20;
//   text(
//     "CLICK HERE TO CONTINUE",
//     dialogue.x + dialogue.w - padding,
//     dialogue.y + dialogue.h - padding
//   );
// }