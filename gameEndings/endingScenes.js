function showEndingPage(isGood = true) {
  let bg = isGood ? happyending3 : lifeOverScenebg;
  image(bg, 0, 0, width, height);

  let restartButton = new Button(width / 2 - 100, height - 150, 200, 70, 'Replay Game', 'replayGame');
  restartButton.display();
}

function calculatePointsPage() {
  image(calculateScenebg, 0, 0, width, height);
  displayStats();
}

// let dialogueEnd_scene0;
function drawHappyEnding0() {
  image(calculateScenebg, 0, 0, width, height);
  if (!dialogueEnd_scene0) { //f 
    let lineEnd_scene0 = [
      "낯설었던 지구에서 72시간동안 정체를 들키지 않은 ZIB, DAVE 본체로 복귀하는 중..."];
    dialogueEnd_scene0 = new DialogueBox(10, 500, 980, 120, lineEnd_scene0);
  }
  dialogueEnd_scene0.display();
}

// let dialogueEnd_scene1;
function drawHappyEnding1() {
  image(happyEnding1, 0, 0, width, height);
  if (!dialogueEnd_scene1) {
    let linesEnd_scene1 = [
      "비록 인간의 감정, DAVE의 우울감을 이해하진 못했지만, Dave의 삶에 작은 변화를 준 ZIB는,",
      "우주선 수리가 완료되자 무사히 Asgard 행성으로 귀환할 수 있었다.",
      "ZIB는 이번 여정을, 만족스러웠던 기억으로 간직하게 될 것이다."];
    dialogueEnd_scene1 = new DialogueBox(10, 500, 980, 120, linesEnd_scene1);
  }
  dialogueEnd_scene1.display();
}

// let dialogueEnd_scene2;
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

// let dialogueEnd_scene3;
function drawHappyEnding3() {
  image(happyEnding3, 0, 0, width, height);
  if (!dialogueEnd_scene3) {
    let linesEnd_scene3 = [
      "하지만 분명한 건, 그날 이후로 일도, 사랑도, 일상도 왠지 모르게 더 잘 풀리는 기분이 들었다는 것.",
      "마치 누군가가 보이지 않는 어딘가에서 작은 응원을 보내준 것처럼."];
    dialogueEnd_scene3 = new DialogueBox(10, 500, 980, 120, linesEnd_scene3);
  }
  dialogueEnd_scene3.display();

  if (dialogueEnd_scene3.finished && !dialogueEnd_scene3.finishedClicked) {
    dialogueEnd_scene3.finishedClicked = true; // 중복 방지
    previousScreen = currentScreen;
    currentScreen = "gameSuccess4"; // 다음 페이지로 전환
    console.log("➡ gameSuccess4");
  }
}


function drawBadEnding1() {
  image(badEnding1, 0, 0, width, height);
}

function drawBadEnding2() {
  image(badEnding2, 0, 0, width, height);
  if (!restartButton_badEnding) {
    restartButton_badEnding = new Button(width / 2 - 100, height - 150, 200, 70, 'Replay Game', 'replayGame');
  }
  restartButton_badEnding.display();
}
