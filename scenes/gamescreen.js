function drawStartScreen() {
  image(assets.background, 0, 0, width, height);
  //start button hover -> click
  if (startisHovering()) {
    cursor(HAND);
    image(assets.startbutton, btn.x - 5, btn.y - 5, btn.w + 10, btn.h + 10);
  } else {
    cursor(ARROW);
    image(assets.startbutton, btn.x, btn.y, btn.w, btn.h);
  }
}


function drawingScreen() {
    image(assets.drawingrule, 0,0,width,height)
    
  }
  
  function checkMsg(){
    image(assets.roomblur, 0,0, width+50,height+50);
    push();
    imageMode(CENTER);
    image(assets.phone, width/2,height/2,300,600)
    pop()
    textAlign(RIGHT, BOTTOM);
    let alpha = 127 + 127 * sin(millis() / 300);

    textFont("Press Start 2P");
    textSize(14);
    fill(0, 255, 153, alpha);
    text(
      "CLICK HERE TO CONTINUE", width-80, height-50
    );
  }
  
  