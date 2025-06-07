let clearBtn, resetBtn, startBtnDoodle;
let drawingCanvas, backgroundCanvas, doodleClassifier;
let workspaceImg, doodleRules, doodleEnd, drawingBoard;

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
}

function initDoodleGame() {
  drawingCanvas = createGraphics(400, 400);
  backgroundCanvas = createGraphics(400, 400);
  backgroundCanvas.background(255);

  startBtnDoodle = new Button(width / 2 - 65, height / 2 + 245, 130, 55, "Start", dGameStartPressed);
  clearBtn = new Button(620, height / 2 + 245, 100, 40, "CLEAR", clearDrawing);
  resetBtn = new Button(780, height / 2 + 245, 100, 40, "RESET", resetGame);

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

  if (dGameOver && dGameResult && !showFinalScreen) {
    textAlign(CENTER, CENTER);
    textSize(48);
    textStyle(BOLD);
    fill(dGameResult.includes("정답") ? "green" : "red");
    noStroke();
    text(dGameResult, width / 2, height / 2);
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

function resetGame() {
  drawingCanvas.clear();
  resultLabel = "";
  resultConfidence = 0;
  pickRandomKeyword();
  doodleTime.reset();
  doodleTime.start();
}

function modelReady() {
  console.log("model loaded");
  classifyCanvas();
}

function classifyCanvas() {
  if (!dGameOver) {
    backgroundCanvas.background(255);
    backgroundCanvas.image(drawingCanvas, 0, 0);
    let resizedCanvas = backgroundCanvas.get();
    resizedCanvas.resize(400, 280);
    doodleClassifier.classify(resizedCanvas.canvas, gotDResults);
  }
}

function gotDResults(error, res) {
  if (error) {
    console.error(error);
    return;
  }

  results = res;
  resultLabel = res[0].label;
  resultConfidence = nf(100 * res[0].confidence, 2, 1);

  if (!dGameOver && results.slice(0, 5).some(r => r.label === targetLabel)) {
    dGameResult = "정답입니다!";
    isCorrect = true;
    dGameOver = true;
    setTimeout(() => showFinalScreen = true, 2000);
  }

  setTimeout(classifyCanvas, 500);
}

function checkDResult() {
  isCorrect = results.slice(0, 3).some(r => r.label === targetLabel);
  dGameResult = isCorrect ? "정답입니다!" : `Wrong. This looks like a \"${results[0].label}\"`;
  dGameOver = true;
}

function showDGameStart() {
  image(doodleRules, 0, 0, width, height);
  startBtnDoodle.display();
}

function dGameStartPressed() {
  doodleStarted = true;
}

function doodleGameResults() {
  image(doodleEnd, 0, 0, width, height);
}

function mousePressedDoodleGame() {
  if (!doodleStarted && startBtnDoodle && startBtnDoodle.isHovered()) {
    startBtnDoodle.action();
  }
}
