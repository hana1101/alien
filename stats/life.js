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
      if (this.lifeCount == 0){
        this.end = true;
      }
  
  }
  
  reset(){
    this.lifeCount = 3;
    this.end = false;
  }
  
  }

function drawHeart(x, y, size) {
  beginShape();
  vertex(x, y);
  bezierVertex(
    x - size / 2, y - size * 0.8, 
    x - size,     y + size / 3,
    x,            y + size
  );
  bezierVertex(
    x + size,     y + size / 3,
    x + size / 2, y - size * 0.8,
    x,            y
  );
  endShape(CLOSE);
}