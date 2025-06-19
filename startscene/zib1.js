let dialogueZib_scene1;

function drawZib1() {
  image(zib1, 0, 0, width, height);

  if (!dialogueZib_scene1) {
    let linesZib_scene1 = [
      "ZIB: 나는 Asgard에서 온 Zib이다.",
      "ZIB: 그냥 기분 전환 삼아, 우주 한 바퀴를 돌 생각이었는데..."];
    dialogueZib_scene1 = new DialogueBox(10, 500, 980, 120, linesZib_scene1);
    console.log("Dialogue object created:", dialogueZib_scene3);
  }
  if (pendingDialogueReset === "dialogueZib_scene1") {
    dialogueZib_scene1.reset();
    pendingDialogueReset = null;
    console.log("✅ Dialogue reset inside drawZib1");
  }

  dialogueZib_scene1.display(); // 이거 추가함
}

let dialogueZib_scene2;

function drawZib2() {
  image(zib2, 0, 0, width, height);

  if (!dialogueZib_scene2) {
    let linesZib_scene2 = [
      "ZIB: 갑자기 우주선에 경고 알람이 울리기 시작했고, 뭔가 잘못되고 있다는 게 느껴졌다.",
    ];
    dialogueZib_scene2 = new DialogueBox(10, 500, 980, 120, linesZib_scene2);
  }

  if (pendingDialogueReset === "dialogueZib_scene2") {
    dialogueZib_scene2.reset();
    pendingDialogueReset = null;
    console.log("✅ Dialogue reset inside drawZib2");
  }
  dialogueZib_scene2.display();
}

let dialogueZib_scene3;

function drawZib3() {
  image(zib3, 0, 0, width, height);

  if (!dialogueZib_scene3) {
    let linesZib_scene3 = [
      "ZIB: 결국 우주선은 가장 가까운 행성이었던 지구에 불시착했다."];
    dialogueZib_scene3 = new DialogueBox(10, 500, 980, 120, linesZib_scene3);

  }
  if (pendingDialogueReset === "dialogueZib_scene3") {
    dialogueZib_scene3.reset();
    pendingDialogueReset = null;
    console.log("✅ Dialogue reset inside drawZib2");
  }

  dialogueZib_scene3.display();

}

let dialogueZib_scene4;

function drawZib4() {
  image(zib4, 0, 0, width, height);

  if (!dialogueZib_scene4) {
    let linesZib_scene4 = [
      "ZIB: Asgard에 바로 연락해 자동 수리 시스템을 가동했지만, 수리까지 75시간이 소요되고,",
      "ZIB: 수리가 끝나는 즉시, Asgard로 귀환하게 될 예정이라는 안내를 받았다."];
    dialogueZib_scene4 = new DialogueBox(10, 500, 980, 120, linesZib_scene4);
    setTimeout(() => DialogueBox.maybeReset("dialogueZib_scene4"), 0);

  }

  dialogueZib_scene4.display();

}
