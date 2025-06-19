let dialogueMsg;
// let isDialogueBlocking = false;
let msgCheckStart = null;

function drawStartScreen() {
  image(assets.background, 0, 0, width, height);
  //start button hover -> click
  if (startisHovering()) {
    cursor(HAND);
    image(assets.startbutton, btn.x - 5, btn.y - 5, btn.w + 10, btn.h + 20);
  } else {
    cursor(ARROW);
    image(assets.startbutton, btn.x, btn.y, btn.w, btn.h);
  }
}


function drawingScreen() {
  image(assets.drawingrule, 0, 0, width, height)

}

// function checkMsg() {
//   if (!dialogueMsg) {
//     let linesMsg = [
//       "ZIB: 여자친구...?",
//       "ZIB: 그게 어떤 종류의 인간이지?"
//     ];
//     dialogueMsg = new DialogueBox(10, 500, 980, 120, linesMsg);
//     isDialogueBlocking = true;
//   }

//   image(assets.roomblur, 0, 0, width + 50, height + 50);
//   push();
//   imageMode(CENTER);
//   image(assets.phone, width / 2, height / 2, 300, 600)
//   pop()
//   dialogueMsg.display()

//   textAlign(RIGHT, BOTTOM);
//   let alpha = 127 + 127 * sin(millis() / 300);

//   textFont(pressfont);
//   textSize(12);
//   fill(0, 255, 153, alpha);
//   text(
//     "CLICK HERE TO CONTINUE", width - 80, height - 30
//   );
// }


function checkMsg() {
  // Start (or restart) the 2-second timer on first entry
  if (msgCheckStart === null) {
    msgCheckStart = millis();
  }

  // Always draw the blurred room & phone immediately
  image(assets.roomblur, 0, 0, width + 50, height + 50);
  push();
  imageMode(CENTER);
  image(assets.phone, width / 2, height / 2, 300, 600);
  pop();

  // Once 2 seconds have elapsed, spawn & display the dialogue
  if (millis() - msgCheckStart >= 2000) {
    if (!dialogueMsg) {
      let linesMsg = [
        "ZIB: 여자친구...?",
        "ZIB: 그게 어떤 종류의 인간이지?"
      ];
      dialogueMsg = new DialogueBox(10, 500, 980, 120, linesMsg);
      isDialogueBlocking = true;
    }
    dialogueMsg.display();

    //   // Pulsing “CLICK HERE TO CONTINUE” prompt
    //   textAlign(RIGHT, BOTTOM);
    //   let alpha = 127 + 127 * sin(millis() / 300);
    //   textFont(pressfont);
    //   textSize(12);
    //   fill(0, 255, 153, alpha);
    //   text("CLICK HERE TO CONTINUE", width - 80, height - 30);
    // }
  }
}
function enterPhoneScreen() {
  dialogueMsg = null;  // clear any old dialogue
  isDialogueBlocking = false;
  msgCheckStart = null;  // reset the timer
}




// if (dialogue.finished && dialogue.finishedClicked){
//   currentScreen='play'
// }


