// let scene = 1;
// let currentImage;
// let box;
// let img1;

// function preload() {
//   img1 = loadImage("assets/alien1.png");
// }

// function setup() {
//   createCanvas(1000, 625);
//   loadScene(scene); // 첫 씬 로드
// }

// function draw() {
//   background(0);
//   image(currentImage, 0, 0, width, height);
//   if (box) {
//     box.display();
//   }
// // }

// function mousePressed() {
//   if (box && !box.finished && box.isHovered()) {
//     box.next();
//   } else if (box && box.finished) {
//     scene++; // 다음 씬으로 전환
//     loadScene(scene);
//   }
// }
function loadScene(sceneNumber) {
  if (sceneNumber === 1) {
    currentImage = img1;
    const lines = [
      "ZIB: 나는 Asgard에서 온 Zib이다.",
      "ZIB: 그냥 기분 전환 삼아, 우주 한 바퀴를 돌 생각이었는데...",
    ];
    box = new DialogueBox(40, 500, 920, 100, lines);
  } else {
    // 예시: 다음 장면이 없을 경우 대체 메시지
    currentImage = createGraphics(1000, 625);
    currentImage.background(30);
    box = new DialogueBox(300, 500, 400, 100, ["다음 장면 준비 중..."]);
  }
}