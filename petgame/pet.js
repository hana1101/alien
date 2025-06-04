let haloEffects = [];
let patMyDog;
let circles = [];
let floatingTexts = []; // 점수 텍스트 효과 배열
let bpm = 60;
let interval;
let score = 0;
let totalSpawned = 0;
let penaltyCount = 0;
let gameOver = false;

function preload(){
  patMyDog = loadImage("patmydog.png");
}

function setup() {
  createCanvas(1000, 625);
  textAlign(CENTER, CENTER);
  textSize(24);
  interval = setInterval(spawnCircle, 1000); // 60 bpm = 1000ms interval
}

function draw() {
  image(patMyDog, 0, 0, width, height);

  if (gameOver) {
    fill(255);
    text("Game Over\nFinal Score: " + score, width / 2, height / 2);
    return;
  }

  // Draw and update all circles
  for (let i = circles.length - 1; i >= 0; i--) {
    circles[i].update();
    circles[i].show();
    if (circles[i].done()) {
      circles.splice(i, 1);
    }
  }

  // Draw floating score texts
  for (let i = floatingTexts.length - 1; i >= 0; i--) {
    floatingTexts[i].update();
    floatingTexts[i].show();
    if (floatingTexts[i].finished()) {
      floatingTexts.splice(i, 1);
    }
  }

  // Draw score
  fill(255);
  noStroke();
  text("Score: " + score, width / 2, 30);
  
  // Draw halo effects
  for (let i = haloEffects.length - 1; i >= 0; i--) {
    haloEffects[i].update();
    haloEffects[i].show();
    if (haloEffects[i].finished()) {
      haloEffects.splice(i, 1);
  }
}
}

function mousePressed() {
  if (gameOver) return;

  for (let i = circles.length - 1; i >= 0; i--) {
    let result = circles[i].checkClick(mouseX, mouseY);
    if (result !== 0) {
      score += result;
      floatingTexts.push(new FloatingText(circles[i].x, circles[i].y, result)); // 점수 변화 텍스트 추가
      haloEffects.push(new HaloEffect(circles[i].x, circles[i].y, result)); // ✅ 헤일로 효과 추가
      circles.splice(i, 1);
      break; // Only allow one circle per click
    }
  }

}

function spawnCircle() {
  if (totalSpawned >= 35) {
    clearInterval(interval);
    gameOver = true;
    return;
  }

  let x, y;
  let forcedPenalty = false;

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

class Circle {
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
class FloatingText {
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

class HaloEffect {
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
