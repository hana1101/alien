
// class Button {
//   constructor(x, y, w, h, label, action) {
//     this.x = x;
//     this.y = y;
//     this.w = w;
//     this.h = h;
//     this.label = label
//     this.action=action
//     // fontsize=15
//     // this.isHovered = false;
//   }
// display() {
//   let isHovered = this.isHovered();
  
//   noStroke();
//       if (isHovered) {
//     fill(140, 124, 104); // Darker shadow when hovered
//   } else {
//     fill(160, 144, 124); // Normal shadow
//   }
//   rect(this.x + 4, this.y + 4, this.w, this.h, 6);

//   stroke(120, 94, 77);
//   strokeWeight(2);
  
//   // Change button color when hovered
//   if (isHovered) {
//     fill(245, 216, 185); // Slightly darker when hovered
//   } else {
//     fill(255, 226, 195); // Normal color
//   }
//   rect(this.x, this.y, this.w, this.h, 6);

//   noStroke();
//   if (isHovered) {
//     fill(100, 74, 57); // Darker text when hovered
//   } else {
//     fill(120, 94, 77); // Normal text color
//   }
//   textAlign(CENTER, CENTER);
//   textSize(15);
//   textFont(neoFont);
//   text(this.label, this.x + this.w / 2, this.y + this.h / 2 + 2);
// }

//   isHovered() {
//     return mouseX > this.x && mouseX < this.x + this.w &&
//            mouseY > this.y && mouseY < this.y + this.h;
//   }

//   isClicked() {
//     return this.isHovered() && mouseIsPressed;
//   }
// }

class Button {
  constructor(x, y, w, h, label, action, fontSize = 20) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.label = label;
    this.action = action;
    this.fontSize = fontSize;
  }

  display() {
    let isHovered = this.isHovered();

    noStroke();
    if (isHovered) {
      fill(140, 124, 104); // Darker shadow when hovered
    } else {
      fill(160, 144, 124); // Normal shadow
    }
    rect(this.x + 4, this.y + 4, this.w, this.h, 6);

    stroke(120, 94, 77);
    strokeWeight(2);

    // Change button color when hovered
    if (isHovered) {
      fill(245, 216, 185); // Slightly darker when hovered
    } else {
      fill(255, 226, 195); // Normal color
    }
    rect(this.x, this.y, this.w, this.h, 6);

    noStroke();
    if (isHovered) {
      fill(100, 74, 57); // Darker text when hovered
    } else {
      fill(120, 94, 77); // Normal text color
    }
    textAlign(CENTER, CENTER);
    textSize(this.fontSize);
    textFont('Press Start 2P');
    text(this.label, this.x + this.w / 2, this.y + this.h / 2 + 2);
  }

  isHovered() {
    return mouseX > this.x && mouseX < this.x + this.w &&
           mouseY > this.y && mouseY < this.y + this.h;
  }

  isClicked() {
    return this.isHovered() && mouseIsPressed;
  }
}

// function drawSelectedScreen(selectedItem) {
// image(assets.room, 0, 0, width, height);

// let panelWidth = width / 3;
// let centerX = panelWidth / 2;
// let centerY = height / 2;
// let scaleFactor = 1.5;

// // Get item height
// let itemHeight;
// if (selectedItem === "wallet") itemHeight = walletItem.baseHeight;
// else if (selectedItem === "phone") itemHeight = phoneItem.baseHeight;
// else if (selectedItem === "diary") itemHeight = diaryItem.baseHeight;

// let drawY = centerY - (itemHeight * scaleFactor) / 2;

// // Draw selected item centered in the left panel
// push();
// translate(centerX-10, drawY);
// scale(scaleFactor);
// if (selectedItem === "wallet") drawWallet(0, 0);
// else if (selectedItem === "phone") drawPhone(0, 0);
// else if (selectedItem === "diary") drawDiary(0, 0);
// pop();

// let btnX = width - 400;
// let btnW = 300;
// let btnH = 60;
// let btnSpacing = 20;

// let buttonConfigs = SettingButtons(selectedItem);

// // Calculate starting Y position to center buttons vertically
// let totalButtonsHeight = (buttonConfigs.length * btnH) + ((buttonConfigs.length - 1) * btnSpacing);
// let startY = (height - totalButtonsHeight) / 2;

// let buttons = buttonConfigs.map((config, index) => {
// let y = startY + index * (btnH + btnSpacing);
// return new Button(btnX, y, btnW, btnH, config.label, config.action);

// });

// // Display all buttons
// buttons.forEach(btn => btn.display());

// // Handle button clicks
// buttons.forEach(btn => {
//   if (btn.isClicked()) {
//     ButtonAction(btn.action);
//   }
// });
// }


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
switch(action) {
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
    currentScreen='checkMsg'
    // Add message checking logic here
    break;
  case "callGF":
    console.log("Calling girlfriend...");
    currentScreen = 'girlfriendFT'
    break;
  case "dateGF":
    console.log("Setting up date...");
    currentScreen='girlfriendGame';
    break;
  case "readDiary":
    console.log("Reading diary...");
    currentScreen='readDiary'
    // Add diary reading logic here
    break;
  case "replayGame":
    console.log('replay game');
    currentScreen='start';
    selectedItem=null;
    
  case "dogpet":
    console.log("Playing with Buddy...");
    currentScreen="dogGame"
    break;
  default:
    console.log("Unknown action:", action);
}
}

