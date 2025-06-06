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
      stroke("green");
    } else if (isLooking && percentageInside >= 0.85) {
      strokeWeight(15);
      stroke("red");
    } else {
      stroke("beige");
  }
    noFill();
    circle(this.x, this.y, this.radius * 2);
  }
  isInside(x, y){
    return dist(x, y, this.x, this.y) <= this.radius;
  }

}