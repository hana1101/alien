let nextBtnEndFT

function endingSceneFT(){
    image(unav, 0, 0, width, height);
    // background(225);
    // push();
    // text(CENTER);
    // textAlign("Cant play again");
    nextBtnEndFT = new Button(width-150, height / 2 + 50+195, 130,55, "Next", nextGame);
    nextBtnEndFT.display();

    if (nextBtnEndFT.isClicked()){
        nextGame();
    }
}