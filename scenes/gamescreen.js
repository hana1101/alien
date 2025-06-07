function drawingScreen() {
    image(assets.drawingrule, 0,0,width,height)
    
  }
  
  function checkMsg(){
    image(assets.roomblur, 0,0, width+50,height+50);
    push();
    imageMode(CENTER);
    image(assets.phone, width/2,height/2,300,600)
    pop()
  }
  
  