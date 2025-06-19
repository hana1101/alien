/* ---------- 1) 전역 변수 ---------- */
let dialogueFaceTime;
let choice1;
let choice2;
let choice3;
let success;
let facetimeOver;
let facetimeLife;
let faceTimeStart;
let choices_show;
// 버튼
let ftStartBtn;
let nextBtnFT;
let waitFT;

let playedFT = false;

let stageFT;               // stageFT = 인덱스(0,1,…)
let currentStageCompleteFT = false;
let fTOverForever = false;
let ftResultBox = null;

/* ---------- 0) 스테이지 데이터 ---------- */
const stages = [
  { // stage 0
    lines: [
      "자기야 ! 우리 진짜 오랜만인 것 같아... \n잘 지냈어 ??\n...",
      "요즘 너무 보고싶당.. \n\n이번주 토요일 데이트가 너무 기대돼 !!\n...",
      "\n우리 뭐 먹을까 ??\n..."
    ],
    choices: [
      { label: "조금 있다가 결정할까?", result: "wrongRelDown" },
      { label: "스테이크 먹으러 갈까?", result: "correctRelUp" },
      { label: "해산물 리조또 어때?", result: "lifeDown" }
    ],
    msg: {
      success: "성공! 여자친구가 웃었어요!",
      lifeFail: "실패! 여자친구는 해산물을 싫어해요!",
      wrongFail: "실패! 여자친구가 서운해해요."
    }
  },

  { // stage 1
    lines: ["모치 먹일 음식이 다 떨어졌네 ㅜㅜ 혹시 오빠가 사다줄 수 있어?"],
    choices: [
      { label: "그래! 당근 사갈게", result: "correctRelUp" },
      { label: "모치가 제일 좋아하는 게 개껌이지?", result: "lifeDown" },
      { label: "츄르 넉넉히 사올게!", result: "wrongRelDown" }
    ],
    msg: {
      success: "정답! 기억력에 여자친구가 감동받았어요!",
      lifeFail: "실패! 기억력에 여자친구가 실망했어요.",
      wrongFail: "오답! 성의 없는 여자친구가 반응에 서운해해요."
    }
  },

  { // stage 2
    // lines: ["우리 다음 여행은 어디로 갈까?"],
    // choices: [
    //   { label: "글쎄 생각나는 곳이 없네..", result: "wrongRelDown" },
    //   { label: "이번엔 대전 갈까?", result: "correctRelUp" },
    //   { label: "부산은 가본 적 없는데 어때?", result: "lifeDown" }
    // ],
    lines: ["우리 저번에 여행 갔던 데가 정말 좋았잖아!"],
    choices: [
      { label: "우리 같이 여행 간 적 있어?", result: "wrongRelDown" },
      { label: "이번에도 부산 갈까?", result: "correctRelUp" },
      { label: "응, 도쿄 정말 예뻤어", result: "lifeDown" }
    ],
    msg: {
      success: "정답! 좋은 아이디어에요!",
      lifeFail: "실패! 누구랑 도쿄에 갔었어요?!",
      wrongFail: "오답! 여자친구가 서운해해요."
    }
  }
];

/* ---------- 2) 초기화 ---------- */
function initializeFaceTime() {
  success = facetimeOver = facetimeLife = false;
  faceTimeStart = playedFT = choices_show = false;
  stageFT = 0;

  ftStartBtn = new Button(width / 2 - 65, height / 2 + 245, 130, 55, "Start");
  nextBtnFT = new Button(width - 150, height / 2 + 245, 130, 55, "Next");
  waitFT = new Timer(1);

  loadStage(stageFT);
}

/* ---------- 3) 스테이지 로더 ---------- */
function loadStage(idx) {
  const s = stages[idx];

  dialogueFaceTime = new DialogueBox(460, 150, 380, 180, s.lines);
  dialogueFaceTime.reset();

  choice1 = new Button(500, 340, 300, 50, s.choices[0].label, () => handleChoice(s.choices[0].result), 18);
  choice2 = new Button(500, 400, 300, 50, s.choices[1].label, () => handleChoice(s.choices[1].result), 18);
  choice3 = new Button(500, 460, 300, 50, s.choices[2].label, () => handleChoice(s.choices[2].result), 18);
}

/* ---------- 4) 메인 루프 ---------- */
function playFaceTime() {
  if (!faceTimeStart) { ftRules(); return; }

  image(facetimebg, 0, 0, width, height);
  displayStats();

  if (facetimeOver) { facetimeEnd(); return; }

  push();
  dialogueFaceTime.display();
  pop();

  if (dialogueFaceTime.finished) {
    waitFT.start(); waitFT.update();
    if (waitFT.completed) {
      choice1.display(); choice2.display(); choice3.display();
      choices_show = true;
    }
  }

  /* ✱ 클릭 검사 복구 */
  if (choices_show) {
    if (choice1.isClicked()) choice1.action();
    if (choice2.isClicked()) choice2.action();
    if (choice3.isClicked()) choice3.action();
  }
}

/* ---------- 5) 선택 처리 ---------- */
function handleChoice(result) {
  facetimeOver = true;
  switch (result) {
    case "correctRelUp": relationship_stats.increase(); success = true; break;
    case "lifeDown": life_stats.decrease(); facetimeLife = true; break;
    case "wrongRelDown": relationship_stats.decrease(); break;
  }
}

/* ---------- 6) 결과 화면 ---------- */

// function facetimeEnd() {
//   const msg = stages[stageFT].msg;
//   textSize(40);

//   // 중앙 정렬 설정 추가
//   textAlign(CENTER, CENTER);  // ✨ 추가
//   let textX = width / 2;
//   let textY = height / 2;

//   if (success) {
//     image(ftsuccess, 0, 0, width, height);
//     fill(0, 255, 0);
//     text(msg.success, textX, textY);
//   } else if (facetimeLife) {
//     image(ftfail, 0, 0, width, height);
//     fill("red");
//     text(msg.lifeFail, textX, textY);
//   } else {
//     image(ftfail, 0, 0, width, height);
//     fill("red");
//     text(msg.wrongFail, textX, textY);
//   }

//   nextBtnFT.display();
//   if (nextBtnFT.isClicked()) {
//     stageFT++;
//     if (stageFT < stages.length) {

//       facetimeOver = success = facetimeLife = choices_show = false;
//       loadStage(stageFT);
//     } else {
//       if (!playedFT) {
//         countGamePlayed++
//         playedFT = true
//       }
//       nextGame();
//     }
//   }

//   displayStats();
// }

// *---hana's edit---* pretty box
function facetimeEnd() {
  const m = stages[stageFT].msg;
  // pick the correct string
  let theMessage;
  let boxType;

  if (success) {
    image(ftsuccess, 0, 0, width, height);
    theMessage = m.success;
    boxType = 'success';

  } else if (facetimeLife) {
    image(ftfail, 0, 0, width, height);
    theMessage = m.lifeFail;
    boxType = 'failure';

  } else {
    image(ftfail, 0, 0, width, height);
    theMessage = m.wrongFail;
    boxType = 'failure';
  }

  // (re)create the GlowBox with current message and type
  ftResultBox = new GlowBox(
    width / 2,
    height / 2,
    theMessage,
    boxType
  );

  // display it at size 40, using your desired font
  ftResultBox.display(40, pressfont);

  // next button
  nextBtnFT.display();
  if (nextBtnFT.isClicked()) {
    // clear for next stage
    ftResultBox = null;

    stageFT++;
    if (stageFT < stages.length) {
      facetimeOver = success = facetimeLife = choices_show = false;
      loadStage(stageFT);
    } else {
      if (!playedFT) {
        countGamePlayed++;
        playedFT = true;
      }
      nextGame();
    }
  }

  displayStats();
}


/* ---------- 7) 룰 화면 ---------- */
function ftRules() {
  image(callgamerule, 0, 0, width, height);
  ftStartBtn.display();
  if (ftStartBtn.isClicked()) { faceTimeStart = true; }
}
