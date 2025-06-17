// function mousePressed() {
//   //change screen when click
//   console.log("mouse pressed at screen:", currentScreen); // Debug line


//   if (currentScreen === "start" && startisHovering()) {
//     console.log("START BUTTON CLICKED"); // Debug line

//     //debug for now
//     //currentScreen = "play";
//     currentScreen = "startscene/zib1";
//   }
// //revisit later
//   if (currentScreen === "startscene/zib1") {
//   if (dialogueZib_scene1 && !dialogueZib_scene1.finished) {
//     dialogueZib_scene1.handleClick();
//     console.log(dialogueZib_scene1.lines[dialogueZib_scene1.currentLine]);
//     if (dialogueZib_scene1.finished) {
//       currentScreen = "startscene/zib2";
//       console.log("startscene/zib2");
//     }
//   }
// }

//   if (currentScreen === "startscene/zib2") {
//   if (dialogueZib_scene2 && !dialogueZib_scene2.finished) {
//     dialogueZib_scene2.handleClick();
//     console.log(dialogueZib_scene2.lines[dialogueZib_scene2.currentLine]);
//     if (dialogueZib_scene2.finished) {
//       currentScreen = "startscene/zib3";
//       console.log("startscene/zib3");
//     }
//   }
// }

// //only for now -> change later
//   if (currentScreen === "startscene/zib3") {
//   if (dialogueZib_scene3 && !dialogueZib_scene3.finished) {
//     dialogueZib_scene3.handleClick();
//     console.log(dialogueZib_scene3.lines[dialogueZib_scene3.currentLine]);
//     if (dialogueZib_scene3.finished) {
//       currentScreen = "startscene/zib4";
//       console.log("startscene/zib4");
//     }
//   }
// }
//   if (currentScreen === "startscene/zib4") {
//   if (dialogueZib_scene4 && !dialogueZib_scene4.finished) {
//     dialogueZib_scene4.handleClick();
//     console.log(dialogueZib_scene4.lines[dialogueZib_scene4.currentLine]);
//     if (dialogueZib_scene4.finished) {
//       currentScreen = "startscene/zib5";
//       console.log("startscene/zib5");
//     }
//   }
// }
// if (currentScreen === "startscene/zib5") {
//   if (dialogueZib_scene5 && !dialogueZib_scene5.finished) {
//     dialogueZib_scene5.handleClick();
//     console.log(dialogueZib_scene5.lines[dialogueZib_scene5.currentLine]);
//     if (dialogueZib_scene5.finished) {
//       currentScreen = "startscene/zib6";
//       console.log("startscene/zib6");
//     }
//   }
// }
// if (currentScreen === "startscene/zib6") {
//   if (dialogueZib_scene6 && !dialogueZib_scene6.finished) {
//     dialogueZib_scene6.handleClick();
//     console.log(dialogueZib_scene6.lines[dialogueZib_scene6.currentLine]);
//     if (dialogueZib_scene6.finished) {
//       currentScreen = "startscene/zib7";
//       console.log("startscene/zib7");
//     }
//   }
// }
// if (currentScreen === "startscene/zib7") {
//   if (dialogueZib_scene7 && !dialogueZib_scene7.finished) {
//     dialogueZib_scene7.handleClick();
//     console.log(dialogueZib_scene7.lines[dialogueZib_scene7.currentLine]);
//     if (dialogueZib_scene7.finished) {
//       currentScreen = "startscene/zib8";
//       console.log("startscene/zib8");
//     }
//   }
// }
// if (currentScreen === "startscene/zib8") {
//   if (dialogueZib_scene8 && !dialogueZib_scene8.finished) {
//     dialogueZib_scene8.handleClick();
//     console.log(dialogueZib_scene8.lines[dialogueZib_scene8.currentLine]);
//     if (dialogueZib_scene8.finished) {
//       currentScreen = "startscene/zib9";
//       console.log("startscene/zib9");
//     }
//   }
// }
// if (currentScreen === "startscene/zib9") {
//   if (dialogueZib_scene9 && !dialogueZib_scene9.finished) {
//     dialogueZib_scene9.handleClick();
//     console.log(dialogueZib_scene9.lines[dialogueZib_scene9.currentLine]);
//     if (dialogueZib_scene9.finished) {
//       currentScreen = "startscene/zib10";
//       console.log("startscene/zib10");
//     }
//   }
// }
// if (currentScreen === "startscene/zib10") {
//   if (dialogueZib_scene10 && !dialogueZib_scene10.finished) {
//     dialogueZib_scene10.handleClick();
//     console.log(dialogueZib_scene10.lines[dialogueZib_scene10.currentLine]);
//     if (dialogueZib_scene10.finished) {
//       currentScreen = "startscene/zib11";
//       console.log("startscene/zib11");
//     }
//   }
// }
// else if (currentScreen === "startscene/zib11") {
//   currentScreen = "startscene/zib12";
//   console.log("startscene/zib12");
// }

// // zib12 → zib13 (화면 클릭 시)
// else if (currentScreen === "startscene/zib12") {
//   currentScreen = "startscene/zib13";
//   console.log("startscene/zib13");
// }

// else if (currentScreen === "startscene/zib13") {
//   currentScreen = "startscene/zib14";
//   console.log("startscene/zib14");
// }

// else if (currentScreen === "startscene/zib14") {
//   currentScreen = "play";
//   console.log("play");
// }

//  else if (currentScreen === "play") {
//   if (!selectedItem) {
//     if (walletItem.isHovered()) selectedItem = "wallet";
//     else if (phoneItem.isHovered()) selectedItem = "phone";
//     else if (diaryItem.isHovered()) selectedItem = "diary";

// }
//  }
  
//   else if (currentScreen === "work" && dialogue) {
//     dialogue.handleClick();
  
//     if (dialogue.finishedClicked && !isDialogueBlocking) {
//       currentScreen = "play";
//       selectedItem = 'wallet'; 
//       dialogue = null;

//     }
//   }
  
//   else if (currentScreen==="readDiary" && dialogue1) { // 수정함
//     dialogue1.handleClick();
  
//     if (dialogue1.finishedClicked) {
//       currentScreen = "play";
//       selectedItem = 'diary';
//       dialogue1 = null;
//     }
//   } else if (currentScreen==='checkMsg') {
//     currentScreen='play';
//     selectedItem='phone';
    
//   }

//  else if (currentScreen === "doodleGame") {
//     // if (doodleStarted && dGameOver && doodlePhase === 2) {
//     //   currentScreen = "play";
//     //   selectedItem=!selectedItem;
//     //   resetDoodleGameVariables();
//     //   // 다른 게임의 초기화 플래그도 false로 설정하여, 다음 진입 시 해당 게임이 초기화되도록 함
//     //   dogGame_initialized = false; // Dog Game 초기화 플래그 리셋
//     // } else if (countDoodle === 2) {
//     //   doodlePhase =2 ;

//     // }else {
//     //   mousePressedDoodleGame();
//     //   if (clearBtn && clearBtn.isHovered()) {
//     //     clearBtn.action();
//     //   }
//     //   if (resetBtn && resetBtn.isHovered()) {
//     //     resetBtn.action();
//     //   }
//     // }
//   mousePressedDoodleGame();
//     if (clearBtn && clearBtn.isHovered()) {
//       clearBtn.action();
//     }
//     if (resetBtn && resetBtn.isHovered()) {
//       resetBtn.action();
//     }
//   }
//   // Dog Game 관련 마우스 클릭 처리 추가
//   // else if (currentScreen === "dogGame") {
//   //   // phase 2에서 클릭 시 홈 화면으로
//   //   if (dogGameOver && dogPhase === 2) {
//   //     currentScreen = "play";
//   //     selectedItem=!selectedItem;
//   //     resetDogGameVariables();
//   //     dogGame_initialized = false; // Dog Game 초기화 플래그 리셋
//   //   } else if (!buddyStart && buddyStartBtn && buddyStartBtn.isHovered()) {
//   //       // buddyRulesShow() 내에서 처리됨, 여기서 직접 호출할 필요는 없음
//   //       // buddyStartBtn.isClicked() 로직이 pet.js 내에 있음
//   //       mousePressedDogClickGame(); // 원 클릭 처리 (이전에 buddyStart가 true가 되었다면)
//   //   } else {
//   //       mousePressedDogClickGame(); // 원 클릭 처리
//   //   }
//   // }
//     else if (currentScreen === "dogGame") {
//     // phase 2에서 클릭 시 홈 화면으로
//       if (!buddyStart && buddyStartBtn && buddyStartBtn.isHovered()) {
//         // buddyRulesShow() 내에서 처리됨, 여기서 직접 호출할 필요는 없음
//         // buddyStartBtn.isClicked() 로직이 pet.js 내에 있음
//         mousePressedDogClickGame(); // 원 클릭 처리 (이전에 buddyStart가 true가 되었다면)
//     } else {
//         mousePressedDogClickGame(); // 원 클릭 처리
//     }
//   }


// if (!gameStarted && gameStartBtn && gameStartBtn.isHovered()) {
//   gameStartBtn.action();
//   }

// if (currentScreen === "girlfriendFT" && faceTimeStart && dialogueFaceTime && !dialogueFaceTime.finished) {
//   dialogueFaceTime.handleClick();
// }

// if (currentScreen === "calculateGameResults"){
//   if (totalSuccess === true){
//     currentScreen = "gameSuccess1";
//     return;
//   }
//   else{
//     currentScreen = "gameFail1";
//     return;
//   }
// }

// if (currentScreen === "gameSuccess1"){
//   console.log("gameSuccess1");
//   currentScreen = "gameSuccess2";
// }
// else if (currentScreen === "gameSuccess2"){
//   console.log("gameSuccess2");
//   currentScreen = "gameSuccess3";
// }
// if (currentScreen === "gameFail1"){
//   console.log("gameFail1");
//   currentScreen = "gameFail2";
// }
// else if (currentScreen === "gameFail2"){
//   console.log("gameFail2");
// }

// }




// function keyPressed() {
//   if (keyCode === ESCAPE) {
//     if (currentScreen === "play" && selectedItem) {
//       selectedItem = null;
//     }
//     if (
//       (currentScreen === "work" || currentScreen === "drawing" || currentScreen==='checkMsg'|| currentScreen==='readDiary') && selectedItem)
//      {
//       currentScreen = "play";
//     } 
    
//     // else {
//     //   currentScreen = "start";
//     //   selectedItem = null;
//     // }
//   }
//   if (key === 's' || key === 'S') {
//     if (currentScreen.startsWith("startscene/zib")) {
//       currentScreen = "startscene/zib11";
//       console.log("Skipped to startscene/zib11");
//     }
//   }
// }
