function initialSetStats(){
    relationship_stats = new stats(50);
    career_stats = new stats(300);
    wellbeing_stats = new stats(550);
    life_stats = new life(800);
  }
  
function displayStats(){
  push();
  fill("white");
  textSize(15);
  textAlign(LEFT);
  text("Relationship",50,43);
  text("Career",300,43);
  text("Well-being",550,43);
  text("Life", 780,43);
  pop();
    
  relationship_stats.display();
  career_stats.display();
  wellbeing_stats.display();
  life_stats.display();
}

function pointsMinimumMet(){
  total_stats = relationship_stats.currentStat+career_stats.currentStat+wellbeing_stats.currentStat;
  console.log(total_stats);

  if (life_stats.lifeCount === 0 || life_stats.end){
    console.log("lifeOverScreen");
    currentScreen = "lifeOver";
    endGame = true;
    return;
  }
  
  else if (countGamePlayed >= 4){
    if (total_stats<80){
      console.log("gameFailScreen");
      currentScreen = "calculateGameResults"
      endGame = true;
      totalSuccess = false;
        //gamescene - 이후 minimum Met 확인
    }
    else if(total_stats>=80){
       console.log("criteria met");
      totalSuccess = true;
      currentScreen = "calculateGameResults";
      endGame = true;
      return;
    }
}

  else{
    console.log("not finished");
  }

}

// life = 없을 때 = 실패
// life가 남았지만
// - total이 80이 안됐을 때 & 게임 5개 모두 완료= 실패
// - total이 80이 넘었을 때 = 성공