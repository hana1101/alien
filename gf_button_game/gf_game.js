// let bgImage_look, bgImage_notlook;
// let handPose, video, videoMask;
// let hands = [];

// let handTimer, totalTimer, lookSwitchTimer, caughtTimer, gameStartTimer, lookTime;

// let circles = [];
// let currentCircle = null;
// let completedCircles = 0;
// let totalRequired = 3;

// let gameStarted = false;
// let isLooking = false;
// let isCaught = false;
// let fail = false;
// let gameEnded = false;

// function preload() {
//   handPose = ml5.handPose();
//   bgImage_notlook = loadImage("assets/notlooking.jpg");
//   bgImage_look = loadImage("assets/looking.jpg");
// }

// function setup() {
//   createCanvas(1000, 625);
  
//   video = createCapture(VIDEO);
//   video.size(width, height);
//   video.hide();

//   videoMask = createGraphics(width, height);

//   handPose.detectStart(video, gotHands);
//   initializeTimers();

//   gameStartTimer.start();
//   createNextCircle();
// }

// function draw() {
//   if (!gameStarted) {
//     showGameStartCountdown();
//     return;
//   }

//   if (gameEnded) {
//     displayGameResults();
//     return;
//   }

//   drawBackground();
//   drawMaskedVideo();

//   handleLookTimers();
//   updateAndDisplayCurrentCircle();
  
//   let percentageInside = calculateKeypointsInsideCircle();

//   handleGameLogic(percentageInside);

//   displayTimers();

//   if (totalTimer.isComplete() || fail) {
//     gameEnded = true;
//   }
// }

// function showGameStartCountdown() {
//   background(255);
//   gameStartTimer.display(width / 2, height / 2, "Game Starting In ");
//   gameStartTimer.update();

//   if (gameStartTimer.isComplete()) {
//     gameStarted = true;
//     totalTimer.start();
//     lookSwitchTimer.start();
//   }
// }

// function drawBackground() {
//   image(isLooking ? bgImage_look : bgImage_notlook, 0, 0, width, height);
// }

// function drawMaskedVideo() {
//   if (!currentCircle) return;

//   videoMask.clear();
//   let mirroredX = width - currentCircle.x;

//   videoMask.fill(255);
//   videoMask.noStroke();
//   videoMask.circle(mirroredX, currentCircle.y, currentCircle.radius * 2);

//   let maskedVideo = video.get();
//   maskedVideo.mask(videoMask);

//   push();
//   translate(width, 0);
//   scale(-1, 1);
//   image(maskedVideo, 0, 0);
//   pop();
// }

// function handleLookTimers() {
//   if (!lookSwitchTimer.active && !lookTime.active) {
//     lookSwitchTimer.reset();
//     lookSwitchTimer.start();
//   }

//   if (lookSwitchTimer.active) {
//     lookSwitchTimer.update();
//     if (lookSwitchTimer.isComplete()) {
//       isLooking = true;
//       lookTime.reset();
//       lookTime.start();
//     }
//   } else if (lookTime.active) {
//     lookTime.update();
//     if (lookTime.isComplete()) {
//       isLooking = false;
//       lookSwitchTimer.reset();
//       lookSwitchTimer.start();
//     }
//   }
// }

// function updateAndDisplayCurrentCircle() {
//   if (currentCircle) {
//     let percentageInside = calculateKeypointsInsideCircle();
//     currentCircle.display(handTimer.active, isLooking, percentageInside);
//   }
// }


// function calculateKeypointsInsideCircle() {
//   let totalPoints = 0;
//   let insideCount = 0;

//   hands.forEach(hand => {
//     hand.keypoints.forEach(keypoint => {
//       let x = width - keypoint.x;
//       let y = keypoint.y;

//       fill(0, 255, 0);
//       noStroke();
//       circle(x, y, 10);

//       totalPoints++;
//       if (currentCircle && currentCircle.isInside(x, y)) {
//         insideCount++;
//       }
//     });
//   });

//   return totalPoints > 0 ? insideCount / totalPoints : 0;
// }

// function handleGameLogic(percentageInside) {
//   if (totalTimer.isComplete() || fail) return;

//   totalTimer.update();

//   if (isGirlLooking()) {
//     handTimer.reset();
    
//     if (percentageInside >= 0.85) {
//       if (!isCaught) {
//         caughtTimer.start();
//         isCaught = true;
//       } else {
//         caughtTimer.update();
//         if (caughtTimer.isComplete()) {
//           fail = true;
//           gameEnded = true;
//         }
//       }
//       caughtTimer.display(50, 150, "Caught Timer");
//     } else {
//       caughtTimer.reset();
//       isCaught = false;
//     }
//   } else {
//     caughtTimer.reset();
//     isCaught = false;

//     if (percentageInside >= 0.85) {
//       handTimer.start();
//     } else {
//       handTimer.reset();
//     }

//     handTimer.update();

//     if (handTimer.isComplete() && currentCircle && !currentCircle.completed) {
//       currentCircle.completed = true;
//       completedCircles++;

//       if (completedCircles < totalRequired) {
//         createNextCircle();
//       } else {
//         currentCircle = null;
//         fail = false;
//         gameEnded = true;
//       }
//     }
//   }
// }

// function displayTimers() {
//   handTimer.display(50, 50, "Hold for");
//   totalTimer.display(50, 100, "Total Time");
// }

// function initializeTimers() {
//   handTimer = new Timer(3);
//   totalTimer = new Timer(25);
//   caughtTimer = new Timer(2);
//   lookSwitchTimer = new Timer(5);
//   gameStartTimer = new Timer(5);
//   lookTime = new Timer(3);
// }

// function resetGame() {
//   fail = false;
//   completedCircles = 0;
//   currentCircle = null;
//   gameStarted = false;
//   gameEnded = false;
//   circles = [];

//   handTimer.reset();
//   totalTimer.reset();
//   caughtTimer.reset();
//   lookSwitchTimer.reset();
//   gameStartTimer.reset();
//   lookTime.reset();
// }

// function createNextCircle() {
//   currentCircle = new Circle();
//   circles.push(currentCircle);
//   handTimer.reset();
// }

// function isGirlLooking() {
//   return isLooking;
// }

// function gotHands(results) {
//   hands = results;
// }

// function displayGameResults() {
//   background(255);
//   textSize(40);
//   textAlign(CENTER);
//   if (completedCircles >= totalRequired && !fail) {
//     fill('green');
//     text('You Win!', width / 2, height / 2);
//   } else {
//     fill('red');
//     text('You Lose!', width / 2, height / 2);
//   }
// }