let clearButton;
let drawingCanvas;
let doodleClassifier;

let workspaceImg, drawingBoardImg;

let resultLabel = '';
let resultConfidence = 0;
let gameResult = '';

const keywords = [
  'alarm clock', 'cello', 'carrot', 'mushroom', 'sword', 'lipstick', 'cake',
  'cat', 'grass', 'strawberry', 'lion', 'light bulb', 'sun', 'smiley face',
  'cactus', 'ice cream', 'snowflake', 'cookie', 'beach', 'leg'
];

let targetLabel = '';
let timer = 20;
let timerInterval;
let gameOver = false;

const drawAreaX = 60;
const drawAreaY = 60;
const drawAreaW = 380;
const drawAreaH = 280;

async function setup() {
  createCanvas(1200, 700);
  drawingCanvas = createGraphics(500, 400);
  drawingCanvas.clear();

  workspaceImg = await loadImage('assets/workplace.png');
  drawingBoardImg = await loadImage('assets/drawingboard.png');

  clearButton = createButton('clear');
  clearButton.position(600, 630);
  clearButton.mousePressed(resetGame);

  doodleClassifier = ml5.imageClassifier('DoodleNet', modelReady);
  pickRandomKeyword();
  startTimer();
}

function pickRandomKeyword() {
  targetLabel = random(keywords);
}

function startTimer() {
  timer = 20;
  gameOver = false;
  gameResult = '';
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
  drawingCanvas.clear();
  resultLabel = '';
  resultConfidence = 0;
  pickRandomKeyword();
  startTimer();
}

function modelReady() {
  console.log('model loaded');
  classifyCanvas();
}

function classifyCanvas() {
  if (!gameOver) {
    doodleClassifier.classify(drawingCanvas.canvas, gotResults);
  }
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  resultLabel = results[0].label;
  resultConfidence = nf(100 * results[0].confidence, 2, 1);

  if (resultLabel === targetLabel && !gameOver) {
    gameResult = '✅ Correct!';
    gameOver = true;
    clearInterval(timerInterval);
  }

  setTimeout(classifyCanvas, 500);
}

function checkResult() {
  if (resultLabel === targetLabel) {
    gameResult = '✅ Correct!';
  } else {
    gameResult = `❌ Wrong! It looks like "${resultLabel}".`;
  }
}

function draw() {
  background(255);

  if (workspaceImg) image(workspaceImg, 0, 0, width, height);
  if (drawingBoardImg) image(drawingBoardImg, 550, 150, 500, 400);

  image(drawingCanvas, 550, 150);

  // Text UI
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
  fill(gameResult.includes('Correct') ? 'green' : 'red');
  noStroke();
  text(gameResult, width / 2, height / 2);
}

  // 그릴 수 있는 영역 제한
  if (
    mouseIsPressed &&
    mouseX > 550 + drawAreaX &&
    mouseX < 550 + drawAreaX + drawAreaW &&
    mouseY > 150 + drawAreaY &&
    mouseY < 150 + drawAreaY + drawAreaH &&
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
