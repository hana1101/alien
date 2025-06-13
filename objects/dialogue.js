
class DialogueBox {
  constructor(x, y, w, h, lines) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.lines = lines;
    this.currentLine = 0;
    this.finished = false;
    this.finishedClicked = false; // 👈 new flag
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
    textSize(20);
    textAlign(LEFT, TOP);
    let padding = 20;
    text(
      this.lines[this.currentLine],
      this.x + padding,
      this.y + padding,
      this.w - 2 * padding
    );
  }

  next() {
    if (this.currentLine < this.lines.length - 1) {
      this.currentLine++;
    } else {
      this.finished = true;
    }
  }

  isHovered() {
    return (
      mouseX > this.x &&
      mouseX < this.x + this.w &&
      mouseY > this.y &&
      mouseY < this.y + this.h
    );
  }
// handleClick() {
//   if (this.currentLine < this.lines.length - 1) {
//     this.next();
//   } else {
//     this.finished = true;
//     this.finishedClicked = true;
//   }
// }

  handleClick() {
  if (this.currentLine < this.lines.length - 1) {
    this.currentLine++;
  } else {
    this.finished = true;
    this.finishedClicked = true;
    isDialogueBlocking=false
  }
}

  reset() {
    this.currentLine = 0;
    this.finished = false;
    this.finishedClicked = false;
  }
  isOnLastLine() {
  return this.currentLine === this.lines.length - 1 && !this.finished;
}

  setLines(newLines) {
    this.lines = newLines;
    this.reset();
  }
}
