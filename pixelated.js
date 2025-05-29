class pixelbutton {
  constructor(x, y, w , h, textsize, btntext) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.btntext=btntext
    this.textsize=textsize
  }

  isHovered() {
    return mouseX > this.x && mouseX < this.x + this.w &&
           mouseY > this.y && mouseY < this.y + this.h;
  }

  display() {
    let hover = this.isHovered();

    // Background
    fill(0, 200);
    rect(this.x-5, this.y - 5, this.w + 10, this.h + 10);
    rect(this.x-10, this.y, this.w + 20, this.h );
    rect(this.x-20, this.y+5, this.w + 40, this.h-10);

    // Shadow
    noStroke();
    fill(0, 74, 159, 240);
    rect(this.x-5, this.y+5, this.w + 10, this.h-10);
    rect(this.x-13, this.y+10 , this.w+25, this.h - 20);

    // Base Button (changes color on hover)
    if (hover) {
      fill(0, 220, 255, 255); // brighter blue
    } else {
      fill(0, 180, 255, 230);
    }
    rect(this.x+5, this.y+15, this.w-8, this.h-30);
    rect(this.x-7, this.y+23, this.w+15, this.h-45);
    rect(this.x+10, this.y+10, this.w-20, this.h-20);

    // Text
    fill(255);
    textSize(this.textsize);
    textAlign(CENTER, CENTER);
    textFont('Press Start 2P');

    text(this.btntext, this.x + this.w / 2, this.y + this.h / 2 + 2);
  }
}


function drawDialogueBox(x, y, w, h, textContent) {
  // Colors
  let spaceblue = color(10, 10, 40);
  let neongreen = color(0, 255, 153);
  let brightpink = color(255, 0, 255);
  let cyanblue = color(114, 255, 251);
  let lightblue = color(98, 176, 255);
  let ufoPurple = color(167, 91, 255);
  let starcolor = color(255, 235, 59);
  let zibgreen = color('#92C367');

  // Box
  noStroke();
  fill(spaceblue);
  rect(x, y, w, h, 8); // rounded box

  // Border
  stroke(neongreen);
  strokeWeight(4);
  noFill();
  rect(x, y, w, h, 8);

  // Text
  noStroke();
  fill(cyanblue);
  textFont("Press Start 2P");
  textSize(12);
  textAlign(LEFT, TOP);
  let padding = 20;
  text(textContent, x + padding, y + padding, w - 2 * padding, h - 2 * padding);
  
}
