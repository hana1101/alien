let dialogueZib;

function drawZib1() {
  image(zib1, 0, 0, width, height);
  let linesZib = [
    "ZIB: 나는 Asgard에서 온 Zib이다.",
    "ZIB: 그냥 기분 전환 삼아, 우주 한 바퀴를 돌 생각이었는데...",
  ];
  dialogueZib = new DialogueBox(10, 500, 980, 120, linesZib);
  dialogueZib.display();

  // if (!dialogueZib.finished){
  //   dialogueZib.isHovered();
  //   dialogueZib.handleClick();
  // }
  // if (!dialoguezib) {

  // }
}

// class DialogueBox {
//     constructor(x, y, w, h, lines) {
//       this.x = x;
//       this.y = y;
//       this.w = w;
//       this.h = h;
//       this.lines = lines;
//       this.currentLine = 0;
//       this.finished = false;
//     }
  
//     display() {
//       let spaceblue = color(10, 10, 40);
//       let neongreen = color(0, 255, 153);
//       let cyanblue = color(114, 255, 251);
  
//       // Box
//       noStroke();
//       fill(spaceblue);
//       rect(this.x, this.y, this.w, this.h, 8);
//       stroke(neongreen);
//       strokeWeight(4);
//       noFill();
//       rect(this.x, this.y, this.w, this.h, 8);
  
//       // Text
//       noStroke();
//       fill(cyanblue);
//       textFont("Press Start 2P");
//       textSize(20);
//       textAlign(LEFT, TOP);
//       let padding = 20;
//       text(
//         this.lines[this.currentLine],
//         this.x + padding,
//         this.y + padding,
//         this.w - 2 * padding
//       );
//     }
  
//     next() {
//       if (this.currentLine < this.lines.length - 1) {
//         this.currentLine++;
//       } else {
//         this.finished = true;
//       }
//     }
  
//     isHovered() {
//       return (
//         mouseX > this.x &&
//         mouseX < this.x + this.w &&
//         mouseY > this.y &&
//         mouseY < this.y + this.h
//       );
//     }
//     setLines(newLines) {
//       this.lines = newLines;
//       this.currentLine = 0;
//       this.finished = false;
//     }
//     handleClick() {
//     if (!this.finished && this.isHovered()) {
//       this.next();
//     }
//   }
//   }

  
  