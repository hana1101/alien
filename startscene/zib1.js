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
