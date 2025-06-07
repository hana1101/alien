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
  
    display(_x, _y, label = "Timer") {
      fill(255);
      noStroke();
      textSize(30);
      text(`${label}: ${this.timeLeft.toFixed(0)}`, _x, _y);
    }
  
    isComplete() {
      return this.completed;
    }
  
    getTimeLeft() {
      return this.timeLeft;
    }
    
  }
  