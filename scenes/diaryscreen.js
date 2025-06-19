let dialogue1 = null;
let diaryStart = null;

// 호출 위치: 다이어리 화면으로 전환될 때 한 번만 실행
function enterDiaryScreen() {
  dialogue1 = null;
  diaryStart = null;
}

function drawDiaryscreen() {
  // 1) 타이머 시작 (첫 프레임에만)
  if (diaryStart === null) {
    diaryStart = millis();
  }

  // 2) 배경은 즉시 렌더링
  image(assets.diary, 0, -50, width, height);

  // 3) 1.5초(1500ms) 이후에 대화 상자 생성 및 표시
  if (millis() - diaryStart >= 1500) {
    if (!dialogue1) {
      let lines1 = [
        "ZIB: 저런,, 요즘 많이 힘들구나",
        "ZIB: 버디랑 시간을 보내봐야지"
      ];
      dialogue1 = new DialogueBox(10, 500, 980, 120, lines1);
    }
    dialogue1.display();
  }
}
