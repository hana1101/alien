let dialogueFaceTime;
let choice1;
let choice2;
let choice3;
let success;
let facetimeOver;
let facetimeLife;

let faceTimeStart;
let choices_show;

//button
let ftStartBtn;
let nextBtnFT;


function initializeFaceTime() {
  success = false;
  facetimeOver = false;
  facetimeLife = false;
  faceTimeStart = false;
  
  
  choice1 = new Button(500,340,300,50,"아직 시간 남았는데 이따가 결정할까?",choice1Action);
  choice2 = new Button(500,400,300,50,"스테이크 먹으로 갈까?",choice2Action);
  choice3 = new Button(500,460,300,50,"해산물 리조또 어때?",choice3Action);
  
  let linesGf = [
    "자기야! 우리 진짜 오랜만인 것 같아... \n잘 지냈어??\n...",
    "요즘 너무 보고싶당.. \n\n이번주 토요일 데이트가 너무 기대돼!!\n...",
    "\n우리 뭐 먹을까??\n..."
  ];
  
  dialogueFaceTime = new DialogueBox(460, 150, 380, 130, linesGf);
  
  //start button
  ftStartBtn = new Button(width / 2 - 130 / 2 -5, height / 2 + 50+195, 130,55, "Start")
  nextBtnFT = new Button(width-150, height / 2 + 50+195, 130,55, "Next", nextGame);
  
}


function playFaceTime() {
  
  if(!faceTimeStart){
    ftRules();
    return;
  }
  
  image(facetimebg,0,0,width,height);  
  
  displayStats();
  
  if(facetimeOver){
    facetimeEnd();
    return;
  }
  
  if(dialogueFaceTime){
    dialogueFaceTime.display();
  }
  
  if(dialogueFaceTime.finished){
    choice1.display();
    choice2.display();
    choice3.display();
    choices_show = true;
  }
  
  if(choice1.isClicked() && choices_show){
    choice1Action();
  }
  else if (choice2.isClicked() && choices_show){
    choice2Action();
  }
  else if (choice3.isClicked() && choices_show){
    choice3Action();
  }
  
}

function choice1Action() {
  facetimeOver = true;
  relationship_stats.decrease();
}

function choice2Action() {
  facetimeOver = true;
  relationship_stats.increase();
  success = true;
  
}

function choice3Action() {
  facetimeOver = true;
  life_stats.decrease();
  facetimeLife = true;
  
}

function facetimeEnd(){
  background("white");
  displayStats();
  textSize(40);
  if (success){
    push();
    textAlign(CENTER);
    fill(0,255,0);
    text('성공! 여자친구가 좋아해요!', width / 2, height / 2);
    pop();
  }
  else if (!success && facetimeLife){
    push();
    textAlign(CENTER);
    fill(255,0,0);
    text('실패! 여자친구는 해산물 알러지가 있어요', width / 2, height / 2);
    pop();
  }
  else{
    push();
    textAlign(CENTER);
    fill('gray');
    text('실패! 여자친구가 싫어해요', width / 2, height / 2);
    pop();
  }
  nextBtnFT.display();
  if (nextBtnFT.isClicked()){
     nextGame();
  }
}

function ftRules(){
   image(callgamerule, 0, 0, width, height); // ← 이미지 배경 추가
  ftStartBtn.display();
  if(ftStartBtn.isClicked()){
    faceTimeStart = true;
  }
}
