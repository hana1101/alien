class Circle {
    constructor() {
      this.radius = random(100, 120);
      this.x = random(this.radius, width - this.radius);
      this.y = random(this.radius, height - this.radius);
      this.completed = false;
    }
  
    display( handActive = false, isLooking = false, percentageInside = 0 ) {
      strokeWeight(10);
      if (this.completed || handActive) {
        this.drawGlowingRotatingDots();
        if (handActive) {
          let remaining = handTimer.getTimeLeft();
          let elapsed = 3 - remaining;
          let growScale = map(elapsed, 0, 3, 0.2, 2); // adjust size range

          let imgSize = this.radius * 2 * growScale;
          push();
          imageMode(CENTER);
          image(superPowerImg, this.x, this.y, imgSize, imgSize);
          pop();
    }
  
    }else if (isLooking && percentageInside >= 0.85) {
        strokeWeight(15);
        stroke("red");
      } else {
        stroke("beige");
    }
      noFill();
      circle(this.x, this.y, this.radius * 2);
    }
    
    drawGlowingRotatingDots() {
      let remaining = handTimer.getTimeLeft();
      let elapsed = 3 - remaining;
      let angle = map(elapsed % 1, 0, 1, 0, TWO_PI);
  
      for (let i = 0; i < 3; i++) {
        let currentAngle = angle + TWO_PI * i - HALF_PI;
        let trailCount = 10;
  
        for (let t = trailCount; t >= 1; t--) {
          let trailAngle = currentAngle - (t * 0.1); // slight delay behind main dot
          let dotX = this.x + cos(trailAngle) * this.radius;
          let dotY = this.y + sin(trailAngle) * this.radius;
  
          let alpha = map(t, trailCount, 1, 20, 120);
          let size = map(t, trailCount, 1, 10, 35);
  
          fill(255, 220, 230, alpha); // lighter pink trail
          noStroke();
          circle(dotX, dotY, size);
        }
  
        // Main glowing layers
        let dotX = this.x + cos(currentAngle) * this.radius;
        let dotY = this.y + sin(currentAngle) * this.radius;
  
        for (let glow = 10; glow <= 30; glow += 10) {
          fill(255, 220, 230, map(glow, 10, 30, 150, 0));
          noStroke();
          circle(dotX, dotY, glow);
        }
  
        fill(255, 220, 230);
        circle(dotX, dotY, 27);
      }
    }
    
    isInside(x, y){
      return dist(x, y, this.x, this.y) <= this.radius;
    }
  
  }
  
  
  