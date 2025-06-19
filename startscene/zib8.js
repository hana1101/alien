let dialogueZib_scene8;

function drawZib8() {
  image(zib8, 0, 0, width, height);
  if (!dialogueZib_scene8) {
    let linesZib_scene8 = [
      "DAVE: 소리 나는 곳을 따라 가보니 외계인을 봤던 것 같은데, 정확한 기억은 나지 않는다.."];
    dialogueZib_scene8 = new DialogueBox(10, 500, 980, 120, linesZib_scene8);
  }

  dialogueZib_scene8.display();

}
