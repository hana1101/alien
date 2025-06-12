let doodlePhase = 0;
// 0 = 게임 진행 중
// 1 = 정답/오답 텍스트 표시
// 2 = doodleEnd 이미지 표시
// 3 = 클라이언트 반응 이미지 표시

let clientImageTimerStarted = false;
let endImageTimerStarted = false;

let clearBtn, resetBtn
let startBtnDoodle;
let drawingCanvas, backgroundCanvas, doodleClassifier;
let workspaceImg, doodleRules, doodleEnd, drawingBoard;
let happyClientImg, unhappyClientImg;

let resultLabel = "";
let resultConfidence = 0;
let dGameResult = "";
let results = [];

let doodleStarted = false;
let doodleTime;
let isCorrect = false;
let showFinalScreen = false;
let dGameOver = false;

const keywords = [
  "cello", "carrot", "mushroom", "sword",
  "lipstick", "cake", "cat", "grass", "strawberry",
  "lion", "light bulb", "sun", "smiley face", "cactus",
  "ice cream", "snowflake", "cookie", "beach", "leg",
];

let targetLabel = "";

const drawAreaX = 550;
const drawAreaY = 150;
const drawAreaW = 400;
const drawAreaH = 400;

function preloadDoodleAssets() {
  doodleRules = loadImage("assets/drawingrule.jpg");
  doodleEnd = loadImage("assets/careerend.jpg");
  drawingBoard = loadImage("assets/drawingboard.png");
  workspaceImg = loadImage("assets/workplace.jpg");
  happyClientImg = loadImage("assets/happy_client.jpg");
  unhappyClientImg = loadImage("assets/unhappy_client.jpg");
}

function initDoodleGame() {
  drawingCanvas = createGraphics(400, 400);
  backgroundCanvas = createGraphics(400, 400);
  backgroundCanvas.background(255);

  startBtnDoodle = new Button(width / 2 - 65, height / 2 + 245, 130, 55, "Start", dGameStartPressed);
  clearBtn = new Button(620, height / 2 + 245, 100, 40, "CLEAR", clearDrawing);
  resetBtn = new Button(780, height / 2 + 245, 100, 40, "RESET", resetDoodle);

  doodleClassifier = ml5.imageClassifier("DoodleNet", modelReady);
  pickRandomKeyword();
  doodleTime = new Timer(20);
}

function playDoodleGame() {
  if (!doodleStarted) {
    showDGameStart();
    return;
  }

  if (dGameOver && showFinalScreen) {
    doodleGameResults();
    return;
  }

  if (workspaceImg) {
    image(workspaceImg, 0, 0, width, height);
    clearBtn.display();
    resetBtn.display();
  }

  displayStats();

  doodleTime.start();
  doodleTime.update();

  if (doodleTime.isComplete() && !isCorrect) {
    checkDResult();
    setTimeout(() => showFinalScreen = true, 2000);
  }

  image(drawingBoard, drawAreaX, drawAreaY, drawAreaW, drawAreaH);
  image(drawingCanvas, drawAreaX, drawAreaY);

  fill(255);
  stroke(0);
  strokeWeight(3);
  textSize(24);
  textAlign(LEFT, BOTTOM);
  text(`Draw: ${targetLabel}`, 50, 160);
  doodleTime.display(50, 200, '남은 시간');

  if (dGameOver) {
  // phase 0: 텍스트 정답 표시
  if (doodlePhase === 0) {
    textAlign(CENTER, CENTER);
    textSize(40);
    textStyle(BOLD);
    fill(isCorrect ? "green" : "red");
    noStroke();
    text(dGameResult, width / 2, height / 2);

    if (!endImageTimerStarted) {
      endImageTimerStarted = true;
      setTimeout(() => {
        doodlePhase = 1;
        console.log("▶️ phase → 1");
      }, 1500);
    }
    return;
  }

  // phase 1: careerend 이미지
  if (doodlePhase === 1) {
    image(doodleEnd, 0, 0, width, height);

    if (!clientImageTimerStarted) {
      clientImageTimerStarted = true;
      setTimeout(() => {
        doodlePhase = 2;
        console.log("▶️ phase → 2");
      }, 1000);
    }
    return;
  }

  // phase 2: happy/unhappy 클라이언트
  if (doodlePhase === 2) {
    let clientImg = isCorrect ? happyClientImg : unhappyClientImg;
    if (clientImg) {
      image(clientImg, 0, 0, width, height);
    }
    return;
  }
}
  if (mouseIsPressed &&
      mouseX > drawAreaX && mouseX < drawAreaX + drawAreaW &&
      mouseY > drawAreaY && mouseY < drawAreaY + drawAreaH &&
      !dGameOver) {
    drawingCanvas.strokeWeight(16);
    drawingCanvas.stroke(0);
    drawingCanvas.line(mouseX - drawAreaX, mouseY - drawAreaY, pmouseX - drawAreaX, pmouseY - drawAreaY);
  }
}

function pickRandomKeyword() {
  targetLabel = random(keywords);
}

function clearDrawing() {
  drawingCanvas.clear();
}

function resetDoodle() {
  drawingCanvas.clear();
  resultLabel = "";
  resultConfidence = 0;
  doodlePhase = 0;
  clientImageTimerStarted = false;
  endImageTimerStarted = false;
  pickRandomKeyword();
  doodleTime.reset();
  doodleTime.start();
}

function modelReady() {
  console.log("model loaded");
  classifyCanvas();
}

function classifyCanvas() {
if (doodleStarted && !dGameOver) {
    backgroundCanvas.background(255);
    backgroundCanvas.image(drawingCanvas, 0, 0);
    backgroundCanvas.loadPixels();

    let resizedCanvas = backgroundCanvas.get();
    resizedCanvas.resize(400, 280);

    doodleClassifier.classify(resizedCanvas.canvas, gotDResults);
  }

  // 다음 분류 예약 (항상 실행)
  setTimeout(classifyCanvas, 500);
}

function gotDResults(res) {

  if (!res || res.length === 0) {
    console.warn("❌ 분류 결과 없음");
    return;
  }

  // ✅ 여기까지 오면 정상적인 결과
  console.log("✅ 분류 결과 라벨들:", res.map(r => r.label));

  results = res;
  resultLabel = res[0].label;
  resultConfidence = nf(100 * res[0].confidence, 2, 1);

  // ✅ 타이머가 끝난 뒤 정답 판정
  if (!dGameOver && doodleTime.isComplete()) {
    const matched = results.slice(0, 3).some(r => r.label === targetLabel);
    isCorrect = matched;
    dGameResult = matched
      ? "정답입니다!"
      : `Wrong.\nThis looks like a "${results[0].label}"`;
    dGameOver = true;
    showFinalScreen = true;
  }
}

function checkDResult() {
   if (!results || results.length === 0) {
    dGameResult = "분류 실패 (no results)";
    isCorrect = false;
    dGameOver = true;
    return;
  }
  isCorrect = results.slice(0, 3).some(r => r.label === targetLabel);
  dGameResult = isCorrect ? "정답입니다!" : `Wrong.\nThis looks like a \"${results[0].label}\"`;
  dGameOver = true;
}

function showDGameStart() {
  image(doodleRules, 0, 0, width, height);
  startBtnDoodle.display();
  console.log('button displayed');
}

function dGameStartPressed() {
  doodleStarted = true;
}

function doodleGameResults() {
  image(doodleEnd, 0, 0, width, height);
  displayStats();
}

function mousePressedDoodleGame() {
  if (!doodleStarted && startBtnDoodle && startBtnDoodle.isHovered()) {
    startBtnDoodle.action();
  }
}

