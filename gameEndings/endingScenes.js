function lifeOverPage(){
    image(lifeOverScenebg, 0, 0, width, height);
    let restartButton = new Button(width/2-100, height-150, 200, 70, 'Replay Game', 'replayGame')
    restartButton.display()
}

function calculatePointsPage(){
    image(calculateScenebg, 0, 0, width, height);
    displayStats();
}

let dialogueEnd_scene1;
function drawHappyEnding1(){
    image(happyEnding1,0,0,width,height);
    if (!dialogueEnd_scene1) {
    let linesEnd_scene1 = [
    "DAVE에서 다시 ZIB의 몸으로 돌아가는 중.."];
    dialogueEnd_scene1 = new DialogueBox(10, 500, 980, 120, linesEnd_scene1);
  }
  dialogueEnd_scene1.display();
}

function drawHappyEnding2(){
    image(happyEnding2,0,0,width,height);
}
function drawHappyEnding3(){
    image(happyEnding3,0,0,width,height);
}


function drawBadEnding1(){
    image(badEnding1,0,0,width,height);
}
function drawBadEnding2(){
    image(badEnding2,0,0,width,height);
}