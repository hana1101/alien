let dialogueZib_scene10;

function drawZib10() {
  image(zib10, 0, 0, width, height);
  if (!dialogueZib_scene10) {
    let linesZib_scene10 = [
      "ZIB: 이참에 남은 72시간을 조금 더 의미있게 보낼 수 있도록 무료한 이 친구의 삶에 작은 변화를 선물해줘야겠다."];
    dialogueZib_scene10 = new DialogueBox(10, 500, 980, 120, linesZib_scene10);
  }

  dialogueZib_scene10.display();

}
