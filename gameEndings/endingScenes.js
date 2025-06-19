

function lifeOverPage() {
  image(lifeOverScenebg, 0, 0, width, height);
  let restartButton = new Button(width / 2 - 100, height - 150, 200, 70, 'Replay Game', 'replayGame')
  restartButton.display()
}

function gameSuccess4Page() {
  image(happyending3, 0, 0, width, height);
  let restartButton = new Button(width / 2 - 100, height - 150, 200, 70, 'Replay Game', 'replayGame')
  restartButton.display()
}

let diaglougeEnd_scene0;
function calculatePointsPage() {
  image(calculateScenebg, 0, 0, width, height);
  if (!dialogueEnd_scene0) {
    let lineEnd_scene0 = [
      "ZIB이 다시 DAVE 본체로 돌아가는 중..."];
    dialogueEnd_scene0 = new DialogueBox(10, 500, 980, 120, lineEnd_scene0);
  }
  dialogueEnd_scene0.display();
  displayStats();
}

let dialogueEnd_scene1;
function drawHappyEnding1() {
  image(happyEnding1, 0, 0, width, height);
  if (!dialogueEnd_scene1) {
    let linesEnd_scene1 = [
      "정체를 들키지 않고 Dave의 삶에 변화를 준 Zib는,",
      "우주선 수리가 완료되자 무사히 Asgard 행성으로 귀환할 수 있었다."];
    dialogueEnd_scene1 = new DialogueBox(10, 500, 980, 120, linesEnd_scene1);
  }
  dialogueEnd_scene1.display();
}

let dialogueEnd_scene2;
function drawHappyEnding2() {
  image(happyEnding2, 0, 0, width, height);
  if (!dialogueEnd_scene2) {
    let linesEnd_scene2 = [
      "DAVE: 어젯밤 꿈에 외계인이 나왔는데… 왠지 진짜 같았단 말이지.",
      "데이브는 중얼거리며, 꿈이 단순한 상상이었는지, 실제로 일어난 일이었는지 끝내 확신할 수 없었다."];
    dialogueEnd_scene2 = new DialogueBox(10, 500, 980, 120, linesEnd_scene2);
  }
  dialogueEnd_scene2.display();
}

let dialoguedEnd_scene3;
function drawHappyEnding3() {
  image(happyEnding3, 0, 0, width, height);
  if (!dialogueEnd_scene3) {
    let linesEnd_scene3 = [
      "하지만 분명한 건, 그날 이후로 일도, 사랑도, 일상도 왠지 모르게 더 잘 풀리는 기분이 들었다는 것.",
      "마치 누군가가 보이지 않는 어딘가에서 작은 응원을 보내준 것처럼."];
    dialogueEnd_scene3 = new DialogueBox(10, 500, 980, 120, linesEnd_scene3);
  }
  dialogueEnd_scene3.display();
}

function drawBadEnding1() {
  image(badEnding1, 0, 0, width, height);
}
function drawBadEnding2() {
  image(badEnding2, 0, 0, width, height);
}
