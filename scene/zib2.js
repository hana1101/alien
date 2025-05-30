let img;
let box;

function preload() {
  img = loadImage("assets/zib2.png"); // 이미지 경로 확인
}

function setup() {
  createCanvas(1000, 625);

  let lines = [
    "ZIB: 갑자기 우주선에 경고 알람이 울리기 시작했고,",
    "ZIB: 뭔가 잘못되고 있다는 게 느껴졌다.",
  ];
  box = new DialogueBox(40, 500, 920, 100, lines);
}

function draw() {
  image(img, 0, 0, width, height);

  // 대화 상자
  if (box) {
    box.display();
  }

  // 오른쪽 상단 Dave 시점 태그
  let tagX = width - 200;
  let tagY = 20;
  let tagW = 180;
  let tagH = 60;
  let borderRadius = 30;

  // 테두리
  fill(245, 31, 2);
  noStroke();
  rect(tagX, tagY, tagW, tagH, borderRadius);

  // 내부 배경
  fill(201, 171, 167);
  rect(tagX + 5, tagY + 5, tagW - 10, tagH - 10, borderRadius - 5);

  // 텍스트
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(24);
  textStyle(BOLD);
  text("Dave 시점", tagX + tagW / 2, tagY + tagH / 2);
}

// 마우스 클릭으로 다음 대사
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

    // 배경 박스
    noStroke();
    fill(spaceblue);
    rect(this.x, this.y, this.w, this.h, 8);

    // 테두리
    stroke(neongreen);
    strokeWeight(4);
    noFill();
    rect(this.x, this.y, this.w, this.h, 8);

    // 텍스트
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