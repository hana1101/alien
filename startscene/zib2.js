function drawZib2() {
  if (!dialoguezib_2) {
    let lines = [
      "ZIB: 갑자기 우주선에 경고 알람이 울리기 시작했고, 뭔가 잘못되고 있다는 게 느껴졌다.",
    ];
    dialoguezib_2 = new DialogueBox(10, 500, 980, 120, lines);
  }
  image(zib2, 0, 0, width, height);
  if (dialoguezib_2) dialoguezib_2.display();
}