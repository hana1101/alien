// let glowDirection = 2;
let dialogue1

function drawDiaryscreen() {

  if (!dialogue1) {
    let lines1 = [
      "ZIB: 저런,, 요즘 많이 힘들구나",
      "ZIB: 버디랑 시간을 보내봐야지",
    ];
    dialogue1 = new DialogueBox(10, 500, 980, 120, lines1);
  }


  image(assets.diary, 0, -50, width, height)
  dialogue1.display();


  // if (dialogue1 && dialogue1.isOnLastLine()) {
  //   let alpha = 127 + 127 * sin(millis() / 300);

  //   textAlign(RIGHT, BOTTOM);
  //   textFont(pressfont);
  //   textSize(12);
  //   fill(0, 255, 153, alpha);
  //   let padding = 20;
  //   text(
  //     "CLICK HERE TO CONTINUE",
  //     dialogue1.x + dialogue1.w - padding,
  //     dialogue1.y + dialogue1.h - padding
  //   );
  // }

}
