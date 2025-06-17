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
let waitFT;

let playedFT;

let stageFT;

let currentStageCompleteFT = false;


function initializeFaceTime() {
  success = false;
  facetimeOver = false;
  facetimeLife = false;
  faceTimeStart = false;
  playedFT = false;
  stageFT = 1;
  
  
  choice1 = new Button(500,340,300,50,"아직 시간 남았는데 이따가 결정할까?",choice1Action);
  choice2 = new Button(500,400,300,50,"스테이크 먹으로 갈까?",choice2Action);
  choice3 = new Button(500,460,300,50,"해산물 리조또 어때?",choice3Action);
  
  let linesGf = [
    "자기야 ! 우리 진짜 오랜만인 것 같아... \n잘 지냈어 ??\n...",
    "요즘 너무 보고싶당.. \n\n이번주 토요일 데이트가 너무 기대돼 !!\n...",
    "\n우리 뭐 먹을까 ??\n..."
  ];

  dialogueFaceTime = new DialogueBox(460, 150, 380, 180, linesGf);
  dialogueFaceTime.currentLine = 0;
  
  //start button
  ftStartBtn = new Button(width / 2 - 130 / 2 -5, height / 2 + 50+195, 130,55, "Start")
  nextBtnFT = new Button(width-150, height / 2 + 50+195, 130,55, "Next", nextGame);

  waitFT = new Timer(1);
}


function playFaceTime() {
  
  if(!faceTimeStart){
    ftRules();
    return;
  }
  
  image(facetimebg,0,0,width,height);  
  
  displayStats();
  
  if(facetimeOver){
    if(!playedFT){
      countGamePlayed ++;
      playedFT = true;
    }
    console.log(countGamePlayed);
    facetimeEnd();
    return;
  }
  
  if(dialogueFaceTime){
    push();
    dialogueFaceTime.display();
    pop();
  }

  switch (stageFT){
    case 2:

      choice1.label = "Question 2 Correct";
      choice2.label = "Question 2 LIFE WRONG";
      choice3.label = "Qestion 2 -5";
      break;

  }
  
  if(dialogueFaceTime.finished){
    waitFT.start();
    waitFT.update();
    if(waitFT.completed){
      choice1.display();
      choice2.display();
      choice3.display();
      choices_show = true;
    }

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
  currentStageCompleteFT = true;
  if (stageFT === 1) {
    relationship_stats.decrease();
  } else if (stageFT === 2) {
    relationship_stats.increase();
    success = true;
  }
  // countGamePlayed++;
}

function choice2Action() {
  facetimeOver = true;
  currentStageCompleteFT = true;
  if (stageFT === 1) {
    relationship_stats.increase();
    success = true;
  } else if (stageFT === 2) {
    life_stats.decrease();
    facetimeLife = true;
  }
  // countGamePlayed++;
  
}

function choice3Action() {
  facetimeOver = true;
  currentStageCompleteFT = true;
  if (stageFT === 1) {
    life_stats.decrease();
    facetimeLife = true;
  } else if (stageFT === 2) {
    relationship_stats.decrease();
  }
  // countGamePlayed++;
  
}

function facetimeEnd(){
  textSize(40);
  // if (success){
  //   push();
  //   textAlign(CENTER);
  //   image(ftsuccess, 0, 0, width, height);
  //   // fill(0,255,0);
  //   text('성공! 여자친구가 좋아해요!', width / 2, height / 2);
  //   pop();
  // }
  // else if (!success && facetimeLife){
  //   push();
  //   textAlign(CENTER);
  //   image(ftfail, 0, 0, width, height);
  //   text('실패! 여자친구는 해산물 알러지가 있어요', width / 2, height / 2);
  //   pop();
  // }
  // else{
  //   push();
  //   textAlign(CENTER);
  //   image(ftfail, 0, 0, width, height);
  //   text('실패! 여자친구가 싫어해요', width / 2, height / 2);
  //   pop();
  // }
   if (stageFT === 1) {
    if (success) {
      image(ftsuccess, 0, 0, width, height);
      fill(0, 255, 0);
      text("성공! 여자친구가 웃었어요!", width / 2, height / 2);
    } else if (facetimeLife) {
      image(ftfail, 0, 0, width, height);
      fill("red");
      text("실패! 여자친구는 해산물을 싫어해요!", width / 2, height / 2);
    } else {
      image(ftfail, 0, 0, width, height);
      fill("red");
      text("실패! 여자친구가 서운해해요.", width / 2, height / 2);
    }

  } else if (stageFT === 2) {
    if (success) {
      image(ftsuccess, 0, 0, width, height);
      fill(0, 255, 0);
      text("정답! Lorem이 맞는 선택이었어요!", width / 2, height / 2);
    } else if (facetimeLife) {
      image(ftfail, 0, 0, width, height);
      fill("red");
      text("실패! LIFE가 줄어들었어요!", width / 2, height / 2);
    } else {
      image(ftfail, 0, 0, width, height);
      fill("red");
      text("오답! 좀 더 생각해볼까요?", width / 2, height / 2);
    }
  } 

  nextBtnFT.display();
  if (nextBtnFT.isClicked()) {
    if (stageFT === 1) {
      // Go to stage 2
      stageFT = 2;
      facetimeOver = false;
      success = false;
      facetimeLife = false;
      choices_show = false;
      currentStageCompleteFT = false;

      dialogueFaceTime.setLines([
        "Lorem ipsum is placeholder text",
        "graphic, print, and publishing industries",
        "layouts and visual mockups."
      ]);
      dialogueFaceTime.reset();
    } else {
      // After stage 2, finish FaceTime mini-game
      nextGame();
    }
  }

  displayStats();
}

function ftRules(){
  image(callgamerule, 0, 0, width, height); // ← 이미지 배경 추가
  ftStartBtn.display();
  if(ftStartBtn.isClicked()){
    faceTimeStart = true;
  }
}
