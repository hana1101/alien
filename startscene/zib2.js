let img2;
let box;

function preload() {
  img2 = loadImage("assets/zib2.png");
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
  image(img2, 0, 0, width, height);

  // 대화 상자
  if (box) {
    box.display();
  }

  // 오른쪽 상단 zib 시점 태그
  let tagX = width - 200;
  let tagY = 20;
  let tagW = 180;
  let tagH = 60;
  let borderRadius = 30;

  fill(245, 31, 2);
  noStroke();
  rect(tagX, tagY, tagW, tagH, borderRadius);

  fill(201, 171, 167);
  rect(tagX + 5, tagY + 5, tagW - 10, tagH - 10, borderRadius - 5);

  fill(0);
  textAlign(CENTER, CENTER);
  textSize(24);
  textStyle(BOLD);
  text("ZIB 시점", tagX + tagW / 2, tagY + tagH / 2);
}

function mousePressed() {
  if (box && !box.finished && box.isHovered()) {
    box.next();
  } else if (box && box.finished) {
    // 다음 scene3로 넘어갈 수 있게 준비
    console.log("Go to scene3");
    // 또는 scene = 3; loadScene(scene); 과 같이 연결
  }
}