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
      { label: "스테이크 먹으로 갈까?", result: "correctRelUp" },
      { label: "해산물 리조또 어때?", result: "lifeDown" }
    ],
    msg: {
      success: "성공! 여자친구가 웃었어요!",
      lifeFail: "실패! 여자친구는 해산물을 싫어해요!",
      wrongFail: "실패! 여자친구가 서운해해요."
    }
  },

  { // stage 1
    lines: ["모치가 또 난리네..ㅠ"],
    choices: [
      { label: "또 충전기 물어뜯었어?", result: "correctRelUp" },
      { label: "응? 모치가 뭔 사고 쳤었어?", result: "lifeDown" },
      { label: "헉..대박..", result: "wrongRelDown" }
    ],
    msg: {
      success: "정답! 기억력에 여자친구가 감동받았어요!",
      lifeFail: "실패! 기억력에 여자친구가 실망했어요.",
      wrongFail: "오답! 성의 없는 여자친구가 반응에 서운해해요."
    }
  },

  { // stage 2
    lines: ["우리 다음 여행은 어디로 갈까?"],
    choices: [
      { label: "부산 어때?", result: "wrongRelDown" },
      { label: "이번엔 대전 갈까?", result: "correctRelUp" },
      { label: "글쎄 생각나는 곳이 없네..", result: "lifeDown" }
    ],
    msg: {
      success: "정답! 좋은 아이디어에요!",
      lifeFail: "실패! 부산은 이미 갔었어요!",
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

  choice1 = new Button(500, 340, 300, 50, s.choices[0].label, () => handleChoice(s.choices[0].result), 20);
  choice2 = new Button(500, 400, 300, 50, s.choices[1].label, () => handleChoice(s.choices[1].result), 20);
  choice3 = new Button(500, 460, 300, 50, s.choices[2].label, () => handleChoice(s.choices[2].result), 20);
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

function facetimeEnd() {
  const msg = stages[stageFT].msg;
  textSize(40);

  // 중앙 정렬 설정 추가
  textAlign(CENTER, CENTER);  // ✨ 추가
  let textX = width / 2;
  let textY = height / 2;

  if (success) {
    image(ftsuccess, 0, 0, width, height);
    fill(0, 255, 0);
    text(msg.success, textX, textY);
  } else if (facetimeLife) {
    image(ftfail, 0, 0, width, height);
    fill("red");
    text(msg.lifeFail, textX, textY);
  } else {
    image(ftfail, 0, 0, width, height);
    fill("red");
    text(msg.wrongFail, textX, textY);
  }

  nextBtnFT.display();
  if (nextBtnFT.isClicked()) {
    stageFT++;
    if (stageFT < stages.length) {

      facetimeOver = success = facetimeLife = choices_show = false;
      loadStage(stageFT);
    } else {
      if (!playedFT) {
        countGamePlayed++
        playedFT = true
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
