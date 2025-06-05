let clearButton, resetButton;
let drawingCanvas;
let doodleClassifier;

let workspaceImg;

let resultLabel = "";
let resultConfidence = 0;
let gameResult = "";
let results = [];

const keywords = [
  "alarm clock",
  "cello",
  "carrot",
  "mushroom",
  "sword",
  "lipstick",
  "cake",
  "cat",
  "grass",
  "strawberry",
  "lion",
  "light bulb",
  "sun",
  "smiley face",
  "cactus",
  "ice cream",
  "snowflake",
  "cookie",
  "beach",
  "leg",
];

let targetLabel = "";
let timer = 20;
let timerInterval;
let gameOver = false;

let drawAreaX = 60;
let drawAreaY = 60;
let drawAreaW = 400;
let drawAreaH = 400;

async function setup() {
  createCanvas(1200, 700);
  drawingCanvas = createGraphics(400, 400);
  drawingCanvas.background(255); // 흰 배경으로 초기화

  workspaceImg = await loadImage("assets/workplace.jpg");

  clearButton = createButton("clear");
  clearButton.position(600, 630);
  clearButton.mousePressed(clearDrawing);

  resetButton = createButton("reset");
  resetButton.position(720, 630);
  resetButton.mousePressed(resetGame);

  doodleClassifier = ml5.imageClassifier("DoodleNet", modelReady);
  pickRandomKeyword();
  startTimer();
}

function clearDrawing() {
  drawingCanvas.background(255); // ✅ 캔버스만 흰색으로 초기화
}

function pickRandomKeyword() {
  targetLabel = random(keywords);
}

function startTimer() {
  timer = 20;
  gameOver = false;
  gameResult = "";
  timerInterval = setInterval(() => {
    timer--;
    if (timer <= 0) {
      clearInterval(timerInterval);
      checkResult();
      gameOver = true;
    }
  }, 1000);
}

function resetGame() {
  drawingCanvas.background(255); // 흰 배경으로 리셋
  resultLabel = "";
  resultConfidence = 0;
  pickRandomKeyword();
  startTimer();
}

function modelReady() {
  console.log("model loaded");
  classifyCanvas();
}

function classifyCanvas() {
  if (!gameOver) {
    let resizedCanvas = drawingCanvas.get();
    resizedCanvas.resize(400, 280);
    doodleClassifier.classify(resizedCanvas.canvas, gotResults);
  }
}

function gotResults(error, res) {
  if (error) {
    console.error(error);
    return;
  }

  results = res;
  resultLabel = res[0].label;
  resultConfidence = nf(100 * res[0].confidence, 2, 1);

  if (!gameOver && results.slice(0, 5).some((r) => r.label === targetLabel)) {
    gameResult = "✅ Correct!";
    gameOver = true;
    clearInterval(timerInterval);
  }

  setTimeout(classifyCanvas, 500);
}

function checkResult() {
  let isCorrect = false;

  for (let i = 0; i < 5; i++) {
    if (results[i] && results[i].label === targetLabel) {
      isCorrect = true;
      break;
    }
  }

  if (isCorrect) {
    gameResult = "✅ Correct!";
  } else {
    gameResult = `❌ Wrong! It looks like "${results[0].label}".`;
  }
}

function draw() {
  background(255);

  if (workspaceImg) image(workspaceImg, 0, 0, width, height);

  // 그린 내용 보여주기
  image(drawingCanvas, 550, 150);

  // 텍스트 UI
  fill(255);
  stroke(0);
  strokeWeight(3);
  textSize(24);
  textAlign(LEFT, BOTTOM);
  text(`Draw: ${targetLabel}`, 50, 60);
  text(`Time Left: ${timer}s`, 50, 100);

  if (gameResult) {
    textAlign(CENTER, CENTER);
    textSize(48);
    textStyle(BOLD);
    fill(gameResult.includes("Correct") ? "green" : "red");
    noStroke();
    text(gameResult, width / 2, height / 2);
  }

  // 그릴 수 있는 영역 제한
  if (
    mouseIsPressed &&
    mouseX > 550 &&
    mouseX < 550 + drawAreaW &&
    mouseY > 150 &&
    mouseY < 150 + drawAreaH &&
    !gameOver
  ) {
    drawingCanvas.strokeWeight(16);
    drawingCanvas.stroke(0);
    drawingCanvas.line(
      mouseX - 550,
      mouseY - 150,
      pmouseX - 550,
      pmouseY - 150
    );
  }
}
