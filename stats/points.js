class stats{
  
  constructor(_leftX){ 
    this.currentStat = 0;
    this.completed = false;
    this.leftX = _leftX
    
  }
  
  display(){
    strokeWeight(2);
    stroke(255);
    fill("grey");
    rect(this.leftX,55,150,30);
    
    if (this.completed == true){
      fill("green");
      this.currentStat = 100;
    }
    else{
      fill("red");
    }
    // noStroke();
    rect(this.leftX,55, 150*(this.currentStat/100),30);
    
    noStroke();
    fill("white");
    textSize(20);
    text(this.currentStat+'%',this.leftX+190,73);
  }
  
  increase(){
    this.currentStat = this.currentStat+30;
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