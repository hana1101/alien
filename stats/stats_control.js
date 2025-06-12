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
  total_stats = 


}