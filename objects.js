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
  
  function drawPhone(x, y) {
    fill(250);
    stroke(0);
    strokeWeight(8);
    rectMode(CORNER);
    //phone rect
    fill(200);
    rect(x + 20, y, 130, 250, 15, 15);
    fill(255);
    rect(x, y, 130, 250, 15, 15);
    fill(0);
    //camera
    rect(x + 45, y, 40, 10, 10, 10);
    line(x + 50, y + 240, x + 90, y + 240);
    // fill(255);
    // stroke(0)
    // circle(x+80,y+230,20)
  }
  
  function drawDiary(x, y) {
    stroke(101, 109, 113);
    strokeWeight(2);
    fill(160, 173, 185); //light blue
    rect(x, y, 200, 280);
    noStroke();
    fill(101, 109, 113, 50); //transparent darker blue
    rect(x + 10, y, 10, 280); //3d effects
    fill(255);
    textSize(30);
    textFont("Press Start 2P");
    text("DIARY", x + 100, y + 280 / 2);
  
    fill(135, 168, 130); // muted green ribbon
  
    beginShape();
    vertex(x + 20, y + 280); // top left
    vertex(x + 30, y + 280); // top right
    vertex(x + 30, y + 300); // bottom right
    vertex(x + 20, y + 320); // bottom left
    endShape(CLOSE);
    
  }
  class item {
    constructor(x, y, drawFunc, label, scale = 0.8, baseWidth = 250, baseHeight = 280) {
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
      return mouseX > this.x && mouseX < this.x + w &&
             mouseY > this.y && mouseY < this.y + h;
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
      let labelY = this.y + this.baseHeight+yOffset;
  
      textFont("Press Start 2P");
      textSize(fontSize);
      fill(255);
      textAlign(CENTER, CENTER);
      text(this.label, labelX, labelY);
    }
  
  }

  class DialogueBox {
    constructor(x, y, w, h, lines) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.lines = lines;
      this.currentLine = 0;
      this.finished = false;
    }
  
    display() {
      let spaceblue = color(10, 10, 40);
      let neongreen = color(0, 255, 153);
      let cyanblue = color(114, 255, 251);
  
      // Box
      noStroke();
      fill(spaceblue);
      rect(this.x, this.y, this.w, this.h, 8);
      stroke(neongreen);
      strokeWeight(4);
      noFill();
      rect(this.x, this.y, this.w, this.h, 8);
  
      // Text
      noStroke();
      fill(cyanblue);
      textFont("Press Start 2P");
      textSize(12);
      textAlign(LEFT, TOP);
      let padding = 20;
      text(this.lines[this.currentLine], this.x + padding, this.y + padding, this.w - 2 * padding);
    }
  
    next() {
      if (this.currentLine < this.lines.length - 1) {
        this.currentLine++;
      } else {
        this.finished = true;
      }
    }
  
    isHovered() {
      return mouseX > this.x && mouseX < this.x + this.w &&
             mouseY > this.y && mouseY < this.y + this.h;
    }
  }
  
  function isHovering() {
    return (
      mouseX >= btn.x &&
      mouseX <= btn.x + btn.w &&
      mouseY >= btn.y &&
      mouseY <= btn.y + btn.h
    );
  }
  