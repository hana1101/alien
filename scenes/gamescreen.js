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
function drawTealGlow(x, y, w, h) {
  let centerX = x + w / 2;
  let centerY = y + h / 2;
  let maxR = Math.max(w, h) * 0.8; // Much smaller glow radius

  // Create multiple layers for natural falloff
  for (let r = maxR; r > 0; r -= 1) { // Smaller steps for smoother gradient
    // Use exponential falloff for more natural light behavior
    let normalizedR = r / maxR;
    let alpha = pow(1 - normalizedR, 3) * 25; // Exponential falloff, lower max alpha

    fill(0, 255, 200, alpha); // teal, very transparent
    noStroke();
    ellipse(centerX, centerY, r, r); // Keep it circular for more natural light
  }
}

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
    drawTealGlow(btn.x, btn.y + 10, btn.w + 30, btn.h + 30);

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


