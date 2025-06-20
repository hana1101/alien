//startbutton;
let gameStartBtn;

// let bgImage_look, bgImage_notlook; -> inside preload

// declare timers
let handTimer, totalTimer, lookSwitchTimer, caughtTimer, lookTime, firstTenSeconds;
let firstTenDecreased;
let successgfBox, failuregfBox;

// declare circles
// let circles = [];
// // let currentCircle = null;;
// let currentCircle = null;
// let completedCircles = 0;
// let totalRequired = 3;

// declare flags
// let gameStarted = false;
// let isLooking = false;
// let isCaught = false;
// let fail = false; //game failed
// let gameEnded = false;

//statsAlreadChanged flag
// let statsAlreadyChanged = false;
let showEnding = false;
let endingStartTime = 0;
let caughtEnding = false;

let circles;
let currentCircle;
let completedCircles;
let totalRequired;

//declare flags
let gameStarted;
let isLooking;
let isCaught;
let fail; //game failed
let gameEnded;

let statsAlreadyChanged;

let handPose, video, videoMask;
// let hands = [];
let hands = [];

let nextBtnHand;
let countGameHand = false;

//gfGameStarted
let gfwowPlayed = false;

function initializeGirlfriendHand() {

  // circles = [];
  // currentCircle = null;;
  // // currentCircle = null;
  // completedCircles = 0;
  totalRequired = 3;


  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  videoMask = createGraphics(width, height);

  handPose.detectStart(video, gotHands);
  initializeTimers();

  //start button
  gameStartBtn = new Button(width / 2 - 130 / 2 - 5, height / 2 + 50 + 195, 130, 55, "Start", gameStartPressed)
  nextBtnHand = new Button(width - 150, height / 2 + 50 + 195, 130, 55, "Next", nextGame);

}

function resetGame() {
  gfGameStarted = false;
  fail = false;
  circles = [];
  completedCircles = 0;
  currentCircle = null;
  gameStarted = false;
  gameEnded = false;
  statsAlreadyChanged = false;
  firstTenDecreased = false;


  //declare flags
  isLooking = false;
  isCaught = false;

  createNextCircle();

  handTimer.reset();
  totalTimer.reset();
  caughtTimer.reset();
  lookSwitchTimer.reset();
  firstTenSeconds.reset();
  lookTime.reset();
}

function playGirlfriendHand() {

  if (!gameStarted) {
    showGameStart();
    return;
  }

  if (gameEnded) {
    if (!countGameHand) {
      countGameHand = true;
      countGamePlayed++;
    }
    console.log(countGamePlayed);

    displayGameResults();
    return;
  }

  drawBackground();
  drawMaskedVideo();
  handleLookTimers();
  updateAndDisplayCurrentCircle();


  let percentageInside = calculateKeypointsInsideCircle();

  handleGameLogic(percentageInside);

  displayTimers();
  displayStats();

  if (totalTimer.isComplete() || fail) {
    gameEnded = true;
  }
  if (caughtEnding) {
    image(relationend2, 0, 0, width, height);

    let gfwarning = new GlowBox(
      width / 2,
      height / 2,
      '경고! 여자친구가 의심하기 시작했어요!',
      'failure'
    );
    gfwarning.display(32, pressfont);

    nextBtnHand.display();
    if (nextBtnHand.isClicked()) {
      caughtEnding = false;
      nextGame();
    }
    return;
  }
}

function showGameStart() {
  image(hand_gameRules, 0, 0, width, height);
  gameStartBtn.display();
}

function gameStartPressed() {
  gameStarted = true;
  displayPointsLife = true;
  totalTimer.start();
  lookSwitchTimer.start();
  firstTenSeconds.start();
}


function drawBackground() {
  image(isLooking ? bgImage_look : bgImage_notlook, 0, 0, width, height);
}

function drawMaskedVideo() {
  if (!currentCircle) return;

  videoMask.clear();
  let mirroredX = width - currentCircle.x;

  videoMask.fill(255);
  videoMask.noStroke();
  videoMask.circle(mirroredX, currentCircle.y, currentCircle.radius * 2);

  let maskedVideo = video.get();
  maskedVideo.mask(videoMask);

  push();
  translate(width, 0);
  scale(-1, 1);
  image(maskedVideo, 0, 0);
  pop();
}

function handleLookTimers() {
  if (!lookSwitchTimer.active && !lookTime.active) {
    lookSwitchTimer.reset();
    lookSwitchTimer.start();
  }

  if (lookSwitchTimer.active) {
    lookSwitchTimer.update();
    if (lookSwitchTimer.isComplete()) {
      isLooking = true;
      lookTime.reset();
      lookTime.start();
    }
  } else if (lookTime.active) {
    lookTime.update();
    if (lookTime.isComplete()) {
      isLooking = false;
      lookSwitchTimer.reset();
      lookSwitchTimer.start();
    }
  }
}

function updateAndDisplayCurrentCircle() {
  if (currentCircle) {
    let percentageInside = calculateKeypointsInsideCircle();
    currentCircle.display(handTimer.active, isLooking, percentageInside);
  }
}


function calculateKeypointsInsideCircle() {
  let totalPoints = 0;
  let insideCount = 0;

  hands.forEach(hand => {
    hand.keypoints.forEach(keypoint => {
      let x = width - keypoint.x;
      let y = keypoint.y;

      fill(0, 255, 0);
      noStroke();
      circle(x, y, 10);

      totalPoints++;
      if (currentCircle && currentCircle.isInside(x, y)) {
        insideCount++;
      }
    });
  });

  return totalPoints > 0 ? insideCount / totalPoints : 0;
}

function handleGameLogic(percentageInside) {
  if (totalTimer.isComplete() || fail) return;

  totalTimer.update();
  firstTenSeconds.update();

  if (handTimer.isComplete() && currentCircle && !currentCircle.completed) {
    currentCircle.completed = true;
    completedCircles++;

    if (completedCircles < totalRequired) {
      createNextCircle();
    } else {
      currentCircle = null;
      fail = false;
      gameEnded = true;
    }
  }


  if (firstTenSeconds.isComplete() && completedCircles == 0) {
    if (!firstTenDecreased) {
      relationship_stats.decrease();
      firstTenDecreased = true;
    }
  }


  if (isGirlLooking()) {
    handTimer.reset();

    if (percentageInside >= 0.85) {
      if (!isCaught) {
        caughtTimer.start();
        isCaught = true;
      } else {
        caughtTimer.update();
        if (caughtTimer.isComplete()) {
          caughtEnding = true;
          fail = true;
          gameEnded = true;

        }
      }
      caughtTimer.display(50, 160, "Caught Timer", 20);
    } else {
      caughtTimer.reset();
      isCaught = false;
    }
  } else {
    caughtTimer.reset();
    isCaught = false;

    if (percentageInside >= 0.85) {
      handTimer.start();
    } else {
      handTimer.reset();
    }

    handTimer.update();

  }
}

function displayTimers() {
  totalTimer.display(50, 125, "남은 시간", 20);

}

function initializeTimers() {
  handTimer = new Timer(3);
  totalTimer = new Timer(30);
  caughtTimer = new Timer(2);
  lookSwitchTimer = new Timer(5);
  firstTenSeconds = new Timer(10);
  lookTime = new Timer(3);
}


function createNextCircle() {
  let newCircle;
  let maxAttempts = 100;
  let attempt = 0;

  do {
    newCircle = new Circle();
    attempt++;
  } while (
    isOverlappingFaceArea(newCircle.x, newCircle.y, newCircle.radius) &&
    attempt < maxAttempts
  );

  currentCircle = newCircle;
  circles.push(currentCircle);
  handTimer.reset();
}

function isGirlLooking() {
  return isLooking;
}

function gotHands(results) {
  hands = results;
}

function displayGameResults() {
  if (caughtEnding) {
    image(assets.relationend2, 0, 0, width, height);

    let gfwarning = new GlowBox(
      width / 2,
      height / 2,
      '경고! 여자친구가 의심하기 시작했어요!',
      'failure'
    );
    gfwarning.display(32, pressfont);

    if (!statsAlreadyChanged) {
      life_stats.decrease();
      console.log(life_stats.lifeCount);
      statsAlreadyChanged = true;
    }

    nextBtnHand.display();
    if (nextBtnHand.isClicked()) {
      // reset the flag for next time
      caughtEnding = false;
      nextGame();
    }
    return;
  }
  if (!successgfBox) {
    successgfBox = new GlowBox(
      width / 2,
      height / 2,
      '성공! 여자친구가 웃었어요!',
      'success'
    );
  }
  if (!failuregfBox) {
    failuregfBox = new GlowBox(
      width / 2,
      height / 2,
      '실패! 여자친구가 실망했네요...',
      'failure'
    );
  }
  textSize(40);
  if (completedCircles >= totalRequired && !fail) {
    // if (!statsAlreadyChanged && gfwow && gfwow.play) {
    //   gfwow.play();
    // }

    if (!gfwowPlayed) {
      gfwow.rate(1.8);  // 2× normal speed/pitch

      gfwow.play();
      gfwowPlayed = true;
    }

    image(success_gfbg, 0, 30, width, height);
    successgfBox.display(32, pressfont);

    // push();
    // fill(0, 255, 0);
    // textAlign(CENTER);
    // text('성공! 여자친구가 웃었어요!', width / 2, height / 2);
    // pop();
    if (!statsAlreadyChanged) {
      relationship_stats.increase();
      statsAlreadyChanged = true;
    }

  } else {
    image(fail_gfbg, 0, 0, width, height);
    // push();
    // fill('red');
    // textAlign(CENTER);
    // text('실패! 여자친구가 실망했네요...', width / 2, height / 2);
    // pop();
    failuregfBox.display(32, pressfont);

    if (!statsAlreadyChanged) {
      life_stats.decrease();
      console.log(life_stats.lifeCount);
      statsAlreadyChanged = true;
    }
  }
  push();
  displayStats();
  pop();
  nextBtnHand.display();
  if (nextBtnHand.isClicked()) {
    gfwowPlayed = false;

    nextGame();


  }

  console.log("calculate page");

}


function isOverlappingFaceArea(x, y, radius) {
  let faceLeft = 220;
  let faceRight = 220 + 250;
  let faceTop = 220;
  let faceBottom = 220 + 500;

  let circleLeft = x - radius;
  let circleRight = x + radius;
  let circleTop = y - radius;
  let circleBottom = y + radius;

  return !(circleRight < faceLeft || circleLeft > faceRight || circleBottom < faceTop || circleTop > faceBottom);
}
