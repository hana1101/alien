let img;
let box;
let boxInitialized = false;

function preload() {
  img = loadImage("assets/alien1.png");
}

function setup() {
  createCanvas(1000, 625);

  let lines = [
    "ZIB: 나는 Asgard에서 온 Zib이다.",
    "ZIB: 그냥 기분 전환 삼아, 우주 한 바퀴를 돌 생각이었는데...",
  ];
  box = new DialogueBox(40, 500, 920, 100, lines);
}

function draw() {
  image(img, 0, 0, width, height); 
  if (box) {
    box.display(); 
  }
}

// 마우스로 누르면 다음 대사로
function mousePressed() {
  if (box && !box.finished && box.isHovered()) {
    box.next();
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

    
    noStroke();
    fill(spaceblue);
    rect(this.x, this.y, this.w, this.h, 8);


    stroke(neongreen);
    strokeWeight(4);
    noFill();
    rect(this.x, this.y, this.w, this.h, 8);

    noStroke();
    fill(cyanblue);
    textFont("Press Start 2P");
    textSize(28);
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