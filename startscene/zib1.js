let dialogueZib;

function drawZib1() {
  image(zib1, 0, 0, width, height);
  if(!dialogueZib){
    let linesZib = [
      "ZIB: 나는 Asgard에서 온 Zib이다.",
      "ZIB: 그냥 기분 전환 삼아, 우주 한 바퀴를 돌 생각이었는데...",
  ];
    dialogueZib = new DialogueBox(10, 500, 980, 120, linesZib);
  }

  dialogueZib.display();

}