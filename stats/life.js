const heart = [
  "00000000000000000",
  "00001100000110000",
  "00011110001111000",
  "00111111011111100",
  "00111111111111100",
  "01111111111111110",
  "01111111111111110",
  "01111111111111110",
  "00111111111111100",
  "00011111111111000",
  "00001111111110000",
  "00000111111100000",
  "00000011111000000",
  "00000001110000000",
  "00000000100000000"
];

/* ---------- 2) 픽셀 하트 그리기 ---------- */
function drawHeart(x, y, pixelSize) {
  push();
  fill('#d62839');      // 빨간 픽셀 색
  noStroke();
  for (let r = 0; r < heart.length; r++) {
    for (let c = 0; c < heart[r].length; c++) {
      if (heart[r][c] === "1") {
        rect(
          x + c * pixelSize,
          y + r * pixelSize,
          pixelSize,
          pixelSize
        );
      }
    }
  }
  pop();
}


class life{
  
  constructor(_x,_y){ 
    //this.life = [];
    this.lifeCount = 3;
    this.end = false;
    this.x = _x;
    
  }
  
  display(){
    push();
    noStroke();
    fill("red");
    
    for (let i=0; i<this.lifeCount;i++){
      drawHeart(-7+this.x+i*40,63,20);
      // circle(this.x+i*30, 65 ,20); 
    }
    
    pop();
  }
  
    decrease(){
      this.lifeCount--;
      if (this.lifeCount === 0){
        this.end = true;
      }
  
  }
  
  reset(){
    this.lifeCount = 3;
    this.end = false;
  }
  
  }