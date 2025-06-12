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

let countDoodle = 0;
let countFlagDoodle;
let statsAlreadyChangedDoodle;
let nextBtnDoodle;

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
  nextBtnDoodle = new Button(width-150, height / 2 + 50+195, 130,55, "Next", nextGame);

  clearBtn = new Button(620, height / 2 + 245, 100, 40, "CLEAR", clearDrawing);
  resetBtn = new Button(780, height / 2 + 245, 100, 40, "RESET", resetDoodle);

  doodleClassifier = ml5.imageClassifier("DoodleNet", modelReady);
  pickRandomKeyword();
  doodleTime = new Timer(20);
  countFlagDoodle = false;
  statsAlreadyChangedDoodle = false;

}

function playDoodleGame() {
  if (!doodleStarted) {
    resetDoodleGameVariables();
    resetDoodle();
    console.log("Doodle Phase",doodlePhase);
    showDGameStart();
    return;
  }

  // doodlePhase가 2일 때는 다른 게임 요소들이 그려지지 않도록 확실히 처리
  if (doodlePhase === 2) {
    if(!countFlagDoodle){
      countGamePlayed++;
      countDoodle++;
      countFlagDoodle = true;
    }

    console.log(countGamePlayed);
    console.log(countDoodle);
    console.log("🎯 phase 2: 클라이언트 반응 이미지 표시 단계");

    // 화면을 확실히 덮는 배경을 그려줍니다.
    // 이전 디버깅용 보라색 사각형을 제거하고, 클라이언트 이미지만 그립니다.
    background(0); // 임시로 검은색 배경을 그려 이미지가 제대로 올라오는지 확인
    // let clientImg = isCorrect ? happyClientImg : unhappyClientImg;

    if (isCorrect){
      image(happyClientImg, 0, 0, width, height);
      if(!statsAlreadyChangedDoodle){
        career_stats.increase();
        statsAlreadyChangedDoodle = true;
      }
    }
    else{
      image(unhappyClientImg, 0, 0, width, height);
      if(!statsAlreadyChangedDoodle){
        life_stats.decrease();
        statsAlreadyChangedDoodle = true;
      }
    }
    
    // if (clientImg && clientImg.width > 0 && clientImg.height > 0) { // 이미지의 유효성 한 번 더 체크
    //   image(clientImg, 0, 0, width, height);
    //   console.log("✅ 이미지 그리기 완료");
    // } else {
    //   fill("red");
    //   textAlign(CENTER, CENTER);
    //   textSize(32);
    //   text("❌ 클라이언트 이미지 로드 또는 유효성 문제", width / 2, height / 2);
    //   console.error("클라이언트 이미지가 로드되지 않았거나 유효하지 않습니다:", clientImg);
    // }

    displayStats();
    nextBtnDoodle.display();
    if (nextBtnDoodle.isClicked()){
      nextGame();
  }

    return; // doodlePhase 2에서는 이 화면만 표시하고 다른 로직은 실행하지 않습니다.
  }

  // doodlePhase가 2가 아닐 때만 아래 코드 실행
  if (workspaceImg) {
    image(workspaceImg, 0, 0, width, height);
    clearBtn.display();
    resetBtn.display();
  }

  displayStats();

  doodleTime.start();
  doodleTime.update();

  if (doodleTime.isComplete() && !isCorrect && !dGameOver) { // dGameOver 플래그 추가
    checkDResult();
    // setTimeout(() => showFinalScreen = true, 2000); // 이 부분도 doodlePhase 로직으로 대체
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
          doodlePhase = 2;
          console.log("▶️ phase → 2 (텍스트 -> doodleEnd)");
          // endImageTimerStarted = false; // 여기서 플래그 초기화는 setTimeout이 한 번만 실행되도록 하는 목적이므로 유지
        }, 3000);
      }
      // return; // 이 return 문은 phase 0일 때만 텍스트를 그리고, 다음 프레임에 바로 phase 1으로 넘어가는 걸 방해할 수 있습니다.
                 // setTimeout으로 비동기적으로 phase를 바꾸므로, 여기서는 return을 제거하는 것이 좋습니다.
                 // (단, 텍스트 표시 중 다른 그리기 로직이 실행되지 않도록 주의해야 합니다.)
    }

    // phase 1: careerend 이미지
    if (doodlePhase === 1) {
      image(doodleEnd, 0, 0, width, height);

      if (!clientImageTimerStarted) {
        clientImageTimerStarted = true;
        setTimeout(() => {
          doodlePhase = 2;
          console.log("▶️ phase → 2 (doodleEnd -> 클라이언트 반응)");
          // clientImageTimerStarted = false; // 여기서 플래그 초기화는 setTimeout이 한 번만 실행되도록 하는 목적이므로 유지
        }, 1000);
      }
      // return; // 위와 동일한 이유로 여기도 return 제거를 고려
    }
  }

  // 마우스 드로잉 로직은 doodlePhase가 2가 아닐 때만 실행
  if (doodlePhase !== 2 && mouseIsPressed &&
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

function resetDoodleGameVariables() {
  doodlePhase = 0; // 초기 페이즈로 되돌림
  doodleStarted = false; // 게임 시작 전 상태로 되돌림
  dGameOver = false; // 게임 오버 상태 해제
  showFinalScreen = false; // 최종 화면 표시 상태 해제
  clientImageTimerStarted = false; // 타이머 플래그 초기화
  endImageTimerStarted = false; // 타이머 플래그 초기화
  countFlagDoodle = false;
  statsAlreadyChangedDoodle = false;
  // 필요한 경우 clearDrawing() 또는 resetDoodle()을 호출하여 캔버스를 초기화
  // clearDrawing(); // 캔버스 초기화
  // pickRandomKeyword(); // 새로운 키워드 선택 (선택 사항)
  // doodleTime.reset(); // 타이머 초기화 (선택 사항)
}
