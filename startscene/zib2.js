let dialogueZib_scene2;

function drawZib2() {
  image(zib2, 0, 0, width, height);

  if (!dialogueZib_scene2) {
    let linesZib_scene2 = [
      "ZIB: 갑자기 우주선에 경고 알람이 울리기 시작했고, 뭔가 잘못되고 있다는 게 느껴졌다.",
    ];
    dialogueZib_scene2 = new DialogueBox(10, 500, 980, 120, linesZib_scene2);
    DialogueBox.maybeReset("dialogueZib_scene2");

  }

  dialogueZib_scene2.display();
}
