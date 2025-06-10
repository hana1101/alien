// 🟡 전역 변수 (초기화는 init 함수에서)
let dogEndImg, happyDogImg, sadDogImg, patMyDog;
let dogPhase = 0;
let dogEndTimerStarted = false;
let dogClientTimerStarted = false;
let circles_pet, haloEffects, floatingTexts;
let bpm = 60;
let interval;
let score, totalSpawned, penaltyCount;
let dogGameOver;

// 🟡 이미지 불러오기
function preloadDogClickGame() {
  patMyDog = loadImage("assets/patmydog.png");
  dogEndImg = loadImage("assets/dogend.jpg");
  happyDogImg = loadImage("assets/happy_dog.jpg");
  sadDogImg = loadImage("assets/sad_dog.jpg");
}

// 🟡 초기화 함수
function initDogClickGame() {
  circles_pet = [];
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
    if (dogPhase === 0) {
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(36);
    text("Game Over\nFinal Score: " + score, width / 2, height / 2);
      
    if (!dogEndTimerStarted) {
      dogEndTimerStarted = true;
      setTimeout(() => {
        dogPhase = 1; // dogend 화면으로 전환
      }, 1500); // 1.5초 후 전환
    }
    return;
  }
  if (dogPhase === 1) {
    if (dogEndImg) {
      image(dogEndImg, 0, 0, width, height);
    }
   if (!dogClientTimerStarted) {
      dogClientTimerStarted = true;
      setTimeout(() => {
        dogPhase = 2;
      }, 1000); // 1초 후 happy/sad 화면
    }
    return;
  }
  if (dogPhase === 2) {
    let resultImg = score >= 55 ? happyDogImg : sadDogImg;
    if (resultImg) {
      image(resultImg, 0, 0, width, height);
    }
    return;
  }
  }

  for (let i = circles_pet.length - 1; i >= 0; i--) {
    circles_pet[i].update();
    circles_pet[i].show();
    if (circles_pet[i].done()) circles_pet.splice(i, 1);
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

  for (let i = circles_pet.length - 1; i >= 0; i--) {
    let result = circles_pet[i].checkClick(mouseX, mouseY);
    if (result !== 0) {
      score += result;
      floatingTexts.push(new DogFloatingText(circles_pet[i].x, circles_pet[i].y, result));
      haloEffects.push(new DogHaloEffect(circles_pet[i].x, circles_pet[i].y, result));
      circles_pet.splice(i, 1);
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
  circles_pet.push(new DogCircle(x, y, isPenalty));
  totalSpawned++;
}

class DogCircle {
  constructor(x, y, isPenalty) {
    this.x = x;
    this.y = y;
    this.outerRadius = 50;
    this.innerRadius = 0;
    this.growthRate = 1.5;
    this.clicked = false;
    this.isPenalty = isPenalty;
  }

  update() {
    if (this.innerRadius < this.outerRadius) {
      this.innerRadius += this.growthRate;
    }
  }

  show() {
    noFill();
    stroke(this.isPenalty ? color(255, 0, 0) : 200);
    strokeWeight(2);
    ellipse(this.x, this.y, this.outerRadius * 2);

    fill(100, 150, 255, 150);
    noStroke();
    ellipse(this.x, this.y, this.innerRadius * 2);
  }

  done() {
    return this.innerRadius >= this.outerRadius;
  }

  checkClick(mx, my) {
    let d = dist(mx, my, this.x, this.y);
    if (d < this.outerRadius) {
      if (this.isPenalty) {
        return -3; // penalty zone
      }
      let diff = abs(this.innerRadius - this.outerRadius);
      if (diff < 3) {
        return 3; // perfect timing
      } else if (diff < 13) {
        return 1; // slightly off
      }
    }
    return 0;
  }
}

//score effect
class DogFloatingText {
  constructor(x, y, value) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.opacity = 255;
    this.lifetime = 60; // frames
  }

  update() {
    this.y -= 1;
    this.opacity -= 4;
    this.lifetime--;
  }

  show() {
    textSize(20);
    fill(this.value > 0 ? color(255, this.opacity) : color(255,0,0, this.opacity));
    text((this.value > 0 ? "+" : "") + this.value, this.x, this.y);
  }

  finished() {
    return this.lifetime <= 0 || this.opacity <= 0;
  }
}

class DogHaloEffect {
  constructor(x, y, value) {
    this.x = x;
    this.y = y;
    this.radius = 50;
    this.maxRadius = 100;
    this.opacity = 150;
    this.value=value;
  }

  update() {
    this.radius += 3;
    this.opacity -= 5;
  }

  show() {
    noFill();
    stroke(this.value > 0 ? color(255, this.opacity) : color(255,0,0, this.opacity));
    strokeWeight(4);
    ellipse(this.x, this.y, this.radius * 2);
  }

  finished() {
    return this.opacity <= 0 || this.radius >= this.maxRadius;
  }
}
