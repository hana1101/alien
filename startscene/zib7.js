let dialogueZib_scene7;

function drawZib7() {
  image(zib7, 0, 0, width, height);
  if (!dialogueZib_scene7) {
    let linesZib_scene7 = [
      "DAVE: 근데 그날 밤은 유독 다른 느낌이었다,",
      "DAVE: 등산 중 저 멀리서 갑자기 굉음과 함께 하늘이 번쩍 빛나서 가봤더니.."];
    dialogueZib_scene7 = new DialogueBox(10, 500, 980, 120, linesZib_scene7);
  }

  dialogueZib_scene7.display();

}
