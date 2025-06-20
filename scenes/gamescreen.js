let dialogueMsg;
// let isDialogueBlocking = false;
let msgCheckStart = null;

// function drawStartScreen() {
//   image(assets.background, 0, 0, width, height);
//   image(ufo, width - 340, height - 300, 400, 315)
//   //start button hover -> click
//   if (startisHovering()) {
//     cursor(HAND);
//     image(assets.startbutton, btn.x - 5, btn.y - 5, btn.w + 10, btn.h + 20);
//   } else {
//     cursor(ARROW);
//     image(assets.startbutton, btn.x, btn.y, btn.w, btn.h);
//   }

// }
function drawStartScreen() {
  image(assets.background, 0, 0, width, height);

  // bobbing UFO …
  const bobSpeed = 0.05;
  const bobHeight = 10;
  let bobOffset = sin(frameCount * bobSpeed) * bobHeight;
  image(ufo, width - 340, height - 300 + bobOffset, 400, 315);

  // start button hover -> click
  if (startisHovering()) {
    cursor(HAND);

    // — teal glow behind the button —
    push();
    noStroke();
    let glowCenterX = btn.x + btn.w / 2;
    let glowCenterY = btn.y + btn.h / 2;
    let maxGlow = max(btn.w, btn.h) * 1.6; // adjust for desired spread

    for (let r = maxGlow; r > 0; r -= 8) {
      let alpha = map(r, 0, maxGlow, 0, 90); // 90 = max alpha, adjust for strength
      fill(0, 255, 200, alpha); // teal color with fading alpha
      ellipse(glowCenterX, glowCenterY, r, r * 0.6); // elliptical glow
    }
    pop();
    // draw the button over it
    image(
      assets.startbutton,
      btn.x - 5, btn.y - 5,
      btn.w + 10, btn.h + 20
    );
  } else {
    cursor(ARROW);
    image(
      assets.startbutton,
      btn.x, btn.y,
      btn.w, btn.h
    );
  }
}



function drawingScreen() {
  image(assets.drawingrule, 0, 0, width, height)

}


function enterPhoneScreen() {
  dialogueMsg = null;   // clear any previous dialogue
  isDialogueBlocking = false;
  msgCheckStart = null;   // reset the 2 s timer

}
function checkMsg() {
  // 1) On the very first frame, start the timer
  if (msgCheckStart === null) {
    msgCheckStart = millis();
  }

  // 2) Draw the blurred room & phone immediately
  image(assets.roomblur, 0, 0, width + 50, height + 50);
  push();
  imageMode(CENTER);
  image(assets.phone, width / 2, height / 2, 300, 600);
  pop();

  // 3) After 2 seconds have passed, create & display the dialogue box
  if (millis() - msgCheckStart >= 1500) {
    if (!dialogueMsg) {
      let linesMsg = [
        "ZIB: 여자친구...?",
        "ZIB: 그게 어떤 종류의 인간이지?"
      ];
      dialogueMsg = new DialogueBox(10, 500, 980, 120, linesMsg);
      isDialogueBlocking = true;
    }
    dialogueMsg.display();
  }
}



// if (dialogue.finished && dialogue.finishedClicked){
//   currentScreen='play'
// }


