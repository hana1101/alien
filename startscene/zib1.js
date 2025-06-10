let dialoguezib;
dialoguezib = new DialogueBox(10, 500, 980, 120, lines);

function drawZib1() {
  if (!dialoguezib) {
    let lines = [
      "ZIB: 나는 Asgard에서 온 Zib이다.",
      "ZIB: 그냥 기분 전환 삼아, 우주 한 바퀴를 돌 생각이었는데...",
    ];
  }
  image(zib1, 0, 0, width, height);
  if (dialoguezib) dialoguezib.display();
}