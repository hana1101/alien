
let closeButton;
class Button {
  constructor(x, y, w, h, label, action, fontSize = 20) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.label = label;
    this.action = action;
    this.fontSize = fontSize;
    this._clickedLastFrame = false;

  }

  display() {
    let isHovered = this.isHovered();

    push();
    rectMode(CORNER);
    textAlign(CENTER, CENTER);
    textFont(neoFont);
    textSize(this.fontSize);

    // --- Glow behind button ---
    if (isHovered) {
      noStroke();
      fill(0, 255, 200, 40); // teal glow
      rect(this.x - 6, this.y - 6, this.w + 12, this.h + 12, 12);
    }

    // --- Main button body ---
    noStroke();
    fill(10, 10, 40); // dark navy core
    rect(this.x, this.y, this.w, this.h, 8);

    // --- Neon border ---
    strokeWeight(2.5);
    stroke(isHovered ? '#01FFB9' : '#00CED1'); // brighter when hovered
    noFill();
    rect(this.x, this.y, this.w, this.h, 8);

    // --- Inner Glow Ring ---
    strokeWeight(5);
    stroke(isHovered ? 'rgba(1, 255, 185, 0.3)' : 'rgba(0, 206, 209, 0.2)');
    rect(this.x, this.y, this.w, this.h, 8);

    // --- Label ---
    noStroke();
    fill(isHovered ? '#01FFB9' : '#00FFFF');
    text(this.label, this.x + this.w / 2, this.y + this.h / 2);
    pop();
  }

  isHovered() {
    return mouseX > this.x && mouseX < this.x + this.w &&
      mouseY > this.y && mouseY < this.y + this.h;
  }

  // isClicked() {
  //   return this.isHovered() && mouseIsPressed;

  // }
  isClicked() {
    let now = this.isHovered() && mouseIsPressed;
    let justClicked = now && !this._clickedLastFrame;
    this._clickedLastFrame = now;

    if (justClicked) {
      if (buttonclicksound && buttonclicksound.isLoaded()) {
        buttonclicksound.stop();
        buttonclicksound.play();
      }
      return true;
    }
    return false;
  }
}


function SettingButtons(selectedItem) {
  const configs = {
    wallet: [
      { label: "Check Wallet", action: "checkWallet" },
      { label: "Go To Work", action: "doodleGame" },
    ],
    phone: [
      { label: "Check Messages", action: "checkMessages" },
      { label: "Call Girlfriend", action: "callGF" },
      { label: "Set up Date", action: "dateGF" }
    ],
    diary: [
      { label: "Read Diary", action: "readDiary" },
      { label: "Play with Buddy", action: "dogpet" },
    ]
  };

  return configs[selectedItem] || configs.wallet;
}

function ButtonAction(action) {
  switch (action) {
    case "startscene/zib1":
      console.log("zib1_screen");
      currentScreen = "startscene/zib1";
    case "startscene/zib2":
      console.log("zib2_screen");
      currentScreen = "startscene/zib2";
    case "startscene/zib3":
      console.log("zib3_screen");
      currentScreen = "startscene/zib3";

    case "startscene/zib4":
      console.log("zib4_screen");
      currentScreen = "startscene/zib4";

    case "startscene/zib5":
      console.log("zib5_screen");
      currentScreen = "startscene/zib5";

    case "startscene/zib6":
      console.log("zib6_screen");
      currentScreen = "startscene/zib6";

    case "startscene/zib7":
      console.log("zib7_screen");
      currentScreen = "startscene/zib7";

    case "startscene/zib8":
      console.log("zib8_screen");
      currentScreen = "startscene/zib8";

    case "startscene/zib9":
      console.log("zib9_screen");
      currentScreen = "startscene/zib9";

    case "startscene/zib10":
      console.log("zib10_screen");
      currentScreen = "startscene/zib10";

    case "startscene/zib11":
      console.log("zib11_screen");
      currentScreen = "startscene/zib11";

    case "startscene/zib12":
      console.log("zib12_screen");
      currentScreen = "startscene/zib12";

    case "startscene/zib13":
      console.log("zib13_screen");
      currentScreen = "startscene/zib13";

    case "startscene/zib14":
      console.log("zib14_screen");
      currentScreen = "startscene/zib14";

    case "checkWallet":
      console.log("Checking wallet...");
      currentScreen = "work";
      break;
    case "doodleGame":
      console.log("Going to work...");
      currentScreen = "doodleGame"
      // Add work/drawing logic here
      break;
    case "checkMessages":
      console.log("Checking messages...");
      currentScreen = 'checkMsg'
      // Add message checking logic here
      break;
    case "callGF":
      console.log("Calling girlfriend...");
      if (!fTOverForever) {
        currentScreen = 'girlfriendFT';
      }
      else {
        currentScreen = 'fTOver';
      }

      break;
    case "dateGF":
      console.log("Setting up date...");
      currentScreen = 'girlfriendGame';
      break;
    case "readDiary":
      console.log("Reading diary...");
      currentScreen = 'readDiary'
      // Add diary reading logic here
      break;
    case "replayGame":
      console.log('replay game');
      currentScreen = 'start';
      selectedItem = null;

    case "dogpet":
      console.log("Playing with Buddy...");
      currentScreen = "dogGame"
      break;
    case "iteminstruction":
      console.log("item instruction");
      showItemPopup = true;
      break;


    // case "iteminstruction":
    //   console.log("item instruction");
    //   showPopup = true; // Set popup to show
    //   // Create close button when popup opens
    //   closeButton = new Button(
    //     width/2 - 50,
    //     height/2 + 80,
    //     100,
    //     40,
    //     "Close",
    //     "closepopup",
    //     16
    //   );
    //   break;
    // case "closepopup":
    //   showPopup = false;
    //   closeButton = null; // Clear the button
    //   break;

    default:
      console.log("Unknown action:", action);
  }
}
