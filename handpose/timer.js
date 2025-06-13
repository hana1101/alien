class Timer {
    constructor(_total) {
      this.initialTime = _total;
      this.timeLeft = _total;
      this.active = false;
      this.completed = false;
    }
  
    start() {
      if (!this.active && !this.completed) {
        this.active = true;
      }
    }
  
    reset() {
      this.timeLeft = this.initialTime;
      this.active = false;
      this.completed = false;
    }
  
    update() {
      if (this.active && !this.completed) {
        this.timeLeft -= deltaTime / 1000;
        if (this.timeLeft <= 0) {
          this.timeLeft = 0;
          this.completed = true;
          this.active = false;
        }
      }
    }
    
    forceComplete() { // << 이 메서드 추가
    this.currentTime = 0;
    this.running = false;
    this.completed = true;
    }
    
    display(_x, _y, label = "Timer") {
      
      fill(255);
      noStroke();
      textSize(20);
      push();
      textAlign(LEFT);
      text(`${label}: ${this.timeLeft.toFixed(0)}`, _x, _y);
      pop();
    }
  
    isComplete() {
      return this.completed;
    }
  
    getTimeLeft() {
      return this.timeLeft;
    }
    
  }
  
