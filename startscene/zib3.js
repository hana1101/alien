let dialogueZib_scene3;

function drawZib3() {
  image(zib3, 0, 0, width, height);
  if (!dialogueZib_scene3) {
    let linesZib_scene3 = [
      "ZIB: 결국 우주선은 가장 가까운 행성이었던 지구에 불시착했다."];
    dialogueZib_scene3 = new DialogueBox(10, 500, 980, 120, linesZib_scene3);
  }

  dialogueZib_scene3.display();

}
