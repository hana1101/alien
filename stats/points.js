class stats{
  
  constructor(_leftX){ 
    this.currentStat = 0;
    this.completed = false;
    this.leftX = _leftX
  }
  
  display(){
    stroke(0);
    fill("grey");
    rect(this.leftX,50,150,30);
    
    stroke(0);
    if (this.completed == true){
      fill("green");
      this.currentStat = 100;
    }
    else{
      fill("red");
    }
    rect(this.leftX,50, 150*(this.currentStat/100),30);
    
    fill("black");
    textSize(20);
    text(this.currentStat+'%',this.leftX+160,70);
  }
  
  increase(){
    this.currentStat = this.currentStat+20;
    if (this.currentStat >= 100){
      this.completed = true;
      this.currentStat = 100;
    }
    else{
      this.completed = false;
    }
    
    return this.currentStat;
  }
  
    decrease(){
    this.currentStat = this.currentStat-5;
    this.completed = false;
    return this.currentStat;
  }
  
  reset(){
    this.currentStat = 0;
    this.completed = false;
  }
}