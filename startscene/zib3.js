function drawZib3() {
  if (!dialoguezib_3) {
    let lines = [
      "ZIB: 결국 우주선은 가장 가까운 행성이었던 지구에 불시착했다.",
    ];
    dialoguezib_3 = new DialogueBox(10, 500, 980, 120, lines);
  }
  image(zib3, 0, 0, width, height);
  if (dialoguezib_3) dialoguezib_3.display();
}