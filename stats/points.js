// class stats{

//   constructor(_leftX){ 
//     this.currentStat = 0;
//     this.completed = false;
//     this.leftX = _leftX

//   }

//   display(){
//     strokeWeight(2);
//     stroke(255);
//     fill(10);
//     rect(this.leftX,55,150,20,10,10);

//     if (this.currentStat > 0) {

//     if (this.completed == true){
//       fill("green");
//       this.currentStat = 100;
//     }
//     else{
//       fill("red");
//     }

//     // noStroke();
//     rect(this.leftX,55, 150*(this.currentStat/100),20,10,10);
//   }
//     noStroke();
//     fill("white");
//     textSize(20);
//     text(this.currentStat+'%',this.leftX+190,73);
//   }

//   increase(){
//     if (currentScreen === "girlfriendFT"){
//       this.currentStat = this.currentStat+15;
//     }
//     else {
//       this.currentStat = this.currentStat+30;
//     }
//     if (this.currentStat >= 100){
//       this.completed = true;
//       this.currentStat = 100;
//     }
//     else{
//       this.completed = false;
//     }

//     return this.currentStat;
//   }

//     decrease(){
//     this.currentStat = this.currentStat-5;
//     this.completed = false;
//     return this.currentStat;
//   }

//   reset(){
//     this.currentStat = 0;
//     this.completed = false;
//   }

//   }

class stats {
  constructor(_leftX, barColor = "red") {
    this.currentStat = 0;
    this.completed = false;
    this.leftX = _leftX;
    this.barColor = barColor; // 진행 바 색상만 저장
  }

  setBarColor(newColor) {
    this.barColor = newColor;
  }

  display() {
    strokeWeight(2);
    stroke(255);
    noFill();
    rect(this.leftX, 55, 150, 20, 10, 10); // 바 테두리만
    textFont(neoFont)
    if (this.currentStat > 0) {
      if (this.completed) {
        fill("green"); // 완료시 항상 초록색
        this.currentStat = 100;
      } else {
        fill(this.barColor); // 진행중엔 지정색상
      }
      rect(this.leftX, 55, 150 * (this.currentStat / 100), 20, 10, 10);
    }
    noStroke();
    fill("white");
    textSize(20);
    text(this.currentStat + '%', this.leftX + 190, 73);
  }

  increase() {
    if (currentScreen === "girlfriendFT") {
      this.currentStat += 15;
    } else {
      this.currentStat += 30;
    }
    if (this.currentStat >= 100) {
      this.completed = true;
      this.currentStat = 100;
    } else {
      this.completed = false;
    }
    return this.currentStat;
  }

  decrease() {
    this.currentStat -= 5;
    this.completed = false;
    return this.currentStat;
  }

  reset() {
    this.currentStat = 0;
    this.completed = false;
  }
}
