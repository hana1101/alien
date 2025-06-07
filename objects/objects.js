

function drawWallet(x, y) {
  // you enter the x and y value only
  rectMode(CORNER);
  stroke(25, 13, 69);
  strokeWeight(5);
  //brownish
  fill(125, 70, 45);
  //lower rect
  rect(x + 10, y - 10, 250, 180, 10, 10);
  //front rect
  rect(x, y, 250, 180, 10, 10);
  line(x + 20, y + 10, x + 230, y + 10);
  line(x + 20, y + 170, x + 230, y + 170);
  // line(x+240,y+10, x+240, y+170)
  //button and clip
  rect(x + 200, y + 180 / 2 - 15, 70, 40, 5, 5);
  fill(244, 190, 78);
  noStroke();
  circle(x + 230, y + 95, 25);
}

// function drawPhone(x, y) {
//   fill(250);
//   stroke(0);
//   strokeWeight(8);
//   rectMode(CORNER);
//   //phone rect
//   fill(200);
//   rect(x + 20, y, 130, 250, 15, 15);
//   fill(255);
//   rect(x, y, 130, 250, 15, 15);
//   fill(0);
//   //camera
//   rect(x + 45, y, 40, 10, 10, 10);
//   line(x + 50, y + 240, x + 90, y + 240);
//   // fill(255);
//   // stroke(0)
//   // circle(x+80,y+230,20)
// }

function drawPhone(x, y) {
  let phoneW = 130;
  let phoneH = 250;

  // Shadow for depth — darker and more visible
  // noStroke(); 
    stroke(60);
  strokeWeight(4);
  fill(60,60,60,200); // more opaque
  rect(x + 12, y, phoneW, phoneH, 20);

  // Phone body
  stroke(60);
  strokeWeight(4);
  // fill(245); // soft body tone (still neutral)
    fill(255, 248, 235); // warm beige glow, like soft sunlight


  rect(x, y, phoneW, phoneH, 20);

  // Warmer screen area inside (slightly inset)
  noStroke();
  rect(x + 8, y + 20, phoneW - 16, phoneH - 40, 15);

  // Camera bar
  fill(70);
  rect(x + 40, y + 8, 50, 8, 5);

  // Bottom gesture line
  fill(160);
  rect(x + phoneW / 2 - 20, y + phoneH - 16, 40, 4, 2);
}



// function drawDiary(x, y) {
//   stroke(101, 109, 113);
//   strokeWeight(2);
//   fill(160, 173, 185); //light blue
//   rect(x, y, 200, 280);
//   noStroke();
//   fill(101, 109, 113, 50); //transparent darker blue
//   rect(x + 10, y, 10, 280); //3d effects
//   fill(255);
//   textSize(30);
//   textFont("Press Start 2P");
//   text("DIARY", x + 100, y + 280 / 2);

//   fill(135, 168, 130); // muted green ribbon

//   beginShape();
//   vertex(x + 20, y + 280); // top left
//   vertex(x + 30, y + 280); // top right
//   vertex(x + 30, y + 300); // bottom right
//   vertex(x + 20, y + 320); // bottom left
//   endShape(CLOSE);
// }
function drawDiary(x, y) {
  let diaryW = 200;
  let diaryH = 280;

  // Base leather cover
  stroke(80, 50, 30,90); // dark brown outline
  strokeWeight(2);
  fill(90, 45, 25); // rich leather brown
  rect(x, y, diaryW, diaryH);

  // Fake texture (dark stripe shadow)
  noStroke();
  fill(60, 30, 20, 50); // low-opacity stripe
  for (let i = 0; i < diaryH; i += 10) {
    rect(x + 5, y + i, 5, 5);
  }

  // 3D binding shadow
  fill(50, 30, 20, 80);
  rect(x + 10, y, 10, diaryH);

  // Gold title text
  fill(255, 215, 100); // gold
  textSize(26);
  textFont("Press Start 2P");
  textAlign(CENTER, CENTER);
  text("DIARY", x + diaryW / 2, y + diaryH / 2);

  // Bookmark ribbon
  fill(135, 168, 130); // muted green
  beginShape();
  vertex(x + 20, y + diaryH);
  vertex(x + 30, y + diaryH);
  vertex(x + 30, y + diaryH + 20);
  vertex(x + 20, y + diaryH + 40);
  endShape(CLOSE);
}



class item {
  constructor(
    x,
    y,
    drawFunc,
    label,
    scale = 0.8,
    baseWidth = 250,
    baseHeight = 280
  ) {
    this.x = x;
    this.y = y;
    this.drawFunc = drawFunc;
    this.label = label;
    this.scale = scale;
    this.baseWidth = baseWidth;
    this.baseHeight = baseHeight;
  }

  isHovered() {
    const w = this.baseWidth * this.scale;
    const h = this.baseHeight * this.scale;
    return (
      mouseX > this.x &&
      mouseX < this.x + w &&
      mouseY > this.y &&
      mouseY < this.y + h
    );
  }

  isClicked() {
    return this.isHovered() && mouseIsPressed;
  }

  display() {
    let floatOffset = this.isHovered() ? sin(millis() / 200) * 5 : 0;

    push();
    translate(this.x, this.y + floatOffset);
    scale(this.scale);
    this.drawFunc(0, 0);
    pop();
  }

  drawLabel(fontSize = 18, yOffset = 5) {
    // Label position independent of scale
    let labelX = this.x + this.baseWidth / 2;
    let labelY = this.y + this.baseHeight + yOffset;

    textFont("Press Start 2P");
    textSize(fontSize);
    fill(255);
    textAlign(CENTER, CENTER);
    text(this.label, labelX, labelY);
  }
}

