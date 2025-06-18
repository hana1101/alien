let dialogueZib_scene6;

function drawZib6() {
  image(zib6, 0, 0, width, height);


  if (!dialogueZib_scene6) {
    let linesZib_scene6 = [
    "DAVE: 반복되는 일상, 행복하지 않은 하루들 중에서 내가 유일하게 소소한 행복을 느끼는 취미는 밤 하이킹이다."];
    dialogueZib_scene6 = new DialogueBox(10, 500, 980, 120, linesZib_scene6);
  }
  DialogueBox.maybeReset("dialogueZib_scene6");

  dialogueZib_scene6.display();

}