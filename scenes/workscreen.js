// let dialogue = null;

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
    if (dialogue) dialogue.display();
  }