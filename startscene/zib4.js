let dialogueZib_scene4;

function drawZib4() {
  image(zib4, 0, 0, width, height);
  DialogueBox.maybeReset("dialogueZib_scene4");

  if (!dialogueZib_scene4) {
    let linesZib_scene4 = [
    "ZIB: Asgard에 바로 연락해 자동 수리 시스템을 가동했지만, 수리까지 75시간이 소요되고,",
    "ZIB: 수리가 끝나는 즉시, Asgard로 귀환하게 될 예정이라는 안내를 받았다."];
    dialogueZib_scene4 = new DialogueBox(10, 500, 980, 120, linesZib_scene4);
  }

  dialogueZib_scene4.display();

}