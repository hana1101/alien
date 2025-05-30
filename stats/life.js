class life{
  constructor(_x,_y){ 
    //this.life = [];
    this.lifeCount = 3;
    this.end = false;
    this.x = _x;
    
  }
  
  display(){
    fill("red");
    
    for (let i=0; i<this.lifeCount;i++){
      circle(this.x+i*30, 65 ,20); 
    }
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
  