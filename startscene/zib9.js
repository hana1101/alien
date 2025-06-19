let dialogueZib_scene9;

function drawZib9() {
  image(zib9, 0, 0, width, height);
  if (!dialogueZib_scene9) {
    let linesZib_scene9 = [
      "ZIB: 인간이 나를 본 이상 정체를 숨기기 위해 어쩔 수 없이 최면술을 걸었다."];
    dialogueZib_scene9 = new DialogueBox(10, 500, 980, 120, linesZib_scene9);
  }

  dialogueZib_scene9.display();

}
