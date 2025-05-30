// let patMyDog;
// let circles = [];
// let bpm = 60;
// let interval;
// let score = 0;
// let totalSpawned = 0;
// let penaltyCount = 0;
// let gameOver = false;

// function preload(){
//   patMyDog=loadImage("assets/patmydog.png");
// }
// function setup() {
//   createCanvas(1000, 625);
//   textAlign(CENTER, CENTER);
//   textSize(24);
//   interval = setInterval(spawnCircle, 1000); // 60 bpm = 1000ms interval
// }

// function draw() {
//   image(patMyDog,0,0,width,height);

//   if (gameOver) {
//     fill(255);
//     text("Game Over\nFinal Score: " + score, width / 2, height / 2);
//     return;
//   }

//   // Draw and update all circles
//   for (let i = circles.length - 1; i >= 0; i--) {
//     circles[i].update();
//     circles[i].show();
//     if (circles[i].done()) {
//       circles.splice(i, 1);
//     }
//   }

//   // Draw score
//   fill(255);
//   noStroke();
//   text("Score: " + score, width / 2, 30);
// }

// function mousePressed() {
//   if (gameOver) return;

//   for (let i = circles.length - 1; i >= 0; i--) {
//     let result = circles[i].checkClick(mouseX, mouseY);
//     if (result !== 0) {
//       score += result;
//       circles.splice(i, 1);
//       break; // Only allow one circle per click
//     }
//   }
// }

// function spawnCircle() {
//   if (totalSpawned >= 40) {
//     clearInterval(interval);
//     gameOver = true;
//     return;
//   }

//   let x, y;
//   let forcedPenalty = false;

//   if (penaltyCount < 5 && random(1) < 0.3) {
//     // 강제로 페널티존에 생성
//     x = random(620, 760);
//     y = random(480, 540);
//     forcedPenalty = true;
//     penaltyCount++;
//   } else {
//     x = random(580, 870);
//     y = random(320, 540);
//     if (x >= 620 && x <= 760 && y >= 480 && y <= 540) {
//       penaltyCount++;
//     }
//   }

//   // ✅ 페널티 여부는 항상 위치로 결정
//   let isPenalty = (x >= 620 && x <= 760 && y >= 480 && y <= 540);

//   circles.push(new Circle(x, y, isPenalty));
//   totalSpawned++;
// }

// class Circle {
//   constructor(x, y, isPenalty) {
//     this.x = x;
//     this.y = y;
//     this.outerRadius = 50;
//     this.innerRadius = 0;
//     this.growthRate = 1.5;
//     this.clicked = false;
//     this.isPenalty = isPenalty;
//   }

//   update() {
//     if (this.innerRadius < this.outerRadius) {
//       this.innerRadius += this.growthRate;
//     }
//   }

//   show() {
//     noFill();
//     stroke(this.isPenalty ? color(255, 0, 0) : 200);
//     strokeWeight(2);
//     ellipse(this.x, this.y, this.outerRadius * 2);

//     fill(100, 150, 255, 150);
//     noStroke();
//     ellipse(this.x, this.y, this.innerRadius * 2);
//   }

//   done() {
//     return this.innerRadius >= this.outerRadius;
//   }

//   checkClick(mx, my) {
//     let d = dist(mx, my, this.x, this.y);
//     if