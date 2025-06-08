// 🟡 전역 변수 (초기화는 init 함수에서)
let circles, haloEffects, floatingTexts;
let bpm = 60;
let interval;
let patMyDog;
let score, totalSpawned, penaltyCount;
let dogGameOver;

// 🟡 이미지 불러오기
function preloadDogClickGame() {
  patMyDog = loadImage("patmydog.png");
}

// 🟡 초기화 함수
function initDogClickGame() {
  circles = [];
  haloEffects = [];
  floatingTexts = [];
  score = 0;
  totalSpawned = 0;
  penaltyCount = 0;
  dogGameOver = false;

  interval = setInterval(spawnCircle, 1000); // 60 bpm
}

// 🟡 게임 메인 루프
function playDogClickGame() {
  image(patMyDog, 0, 0, width, height);

  if (dogGameOver) {
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(32);
    text("Game Over\nFinal Score: " + score, width / 2, height / 2);
    return;
  }

  for (let i = circles.length - 1; i >= 0; i--) {
    circles[i].update();
    circles[i].show();
    if (circles[i].done()) circles.splice(i, 1);
  }

  for (let i = floatingTexts.length - 1; i >= 0; i--) {
    floatingTexts[i].update();
    floatingTexts[i].show();
    if (floatingTexts[i].finished()) floatingTexts.splice(i, 1);
  }

  for (let i = haloEffects.length - 1; i >= 0; i--) {
    haloEffects[i].update();
    haloEffects[i].show();
    if (haloEffects[i].finished()) haloEffects.splice(i, 1);
  }

  fill(255);
  textSize(24);
  noStroke();
  text("Score: " + score, width / 2, 30);
}

// 🟡 클릭 처리
function mousePressedDogClickGame() {
  if (dogGameOver) return;

  for (let i = circles.length - 1; i >= 0; i--) {
    let result = circles[i].checkClick(mouseX, mouseY);
    if (result !== 0) {
      score += result;
      floatingTexts.push(new FloatingText(circles[i].x, circles[i].y, result));
      haloEffects.push(new HaloEffect(circles[i].x, circles[i].y, result));
      circles.splice(i, 1);
      break;
    }
  }
}

// 🟡 원 생성
function spawnCircle() {
  if (totalSpawned >= 35) {
    clearInterval(interval);
    dogGameOver = true;
    return;
  }

  let x, y, forcedPenalty = false;

  if (penaltyCount < 5 && random(1) < 0.3) {
    x = random(620, 760);
    y = random(480, 540);
    forcedPenalty = true;
    penaltyCount++;
  } else {
    x = random(580, 870);
    y = random(320, 540);
    if (x >= 620 && x <= 760 && y >= 480 && y <= 540) {
      penaltyCount++;
    }
  }

  let isPenalty = (x >= 620 && x <= 760 && y >= 480 && y <= 540);
  circles.push(new Circle(x, y, isPenalty));
  totalSpawned++;
}
