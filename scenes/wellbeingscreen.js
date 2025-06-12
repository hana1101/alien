let glowAlpha = 0;
let glowDirection = 2;

function drawWellbeingscreen() {
if (!dialogue) {
    let lines = [
      "ZIB: 저런,, 요즘 많이 힘들구나",
      "ZIB: 버디랑 시간을 보내봐야지",
    ];
    dialogue = new DialogueBox(10, 500, 980, 120, lines);
  }

  image(assets.diary, 0, 0, width, height);
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
}