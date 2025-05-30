

class Button {
    constructor(x, y, w, h, label) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.label = label
      this.isHovered = false;
    }
    display() {
      // Background block with pixel art vibe (blocky shadows)
  noStroke();
  // Draw shadow (offset bottom-right)
  fill(160, 144, 124);
  rect(this.x + 4, this.y + 4, this.w, this.h, 6);
  
  // Draw button base with outline
  stroke(120, 94, 77);
  strokeWeight(2);
  fill(255, 226, 195);
  rect(this.x, this.y, this.w, this.h, 6);
  
  // Draw label
  noStroke();
  fill(120, 94, 77);
  textAlign(CENTER, CENTER);
  textSize(26); // Adjust for your button size
  textFont('Press Start 2P'); // Or another pixel font
  text(this.label, this.x + this.w / 2, this.y + this.h / 2 + 2);}
  
    isHovered() {
      return mouseX > this.x && mouseX < this.x + this.w &&
             mouseY > this.y && mouseY < this.y + this.h;
    }
  
    isClicked() {
      return this.isHovered() && mouseIsPressed;
    }
  }
  
  function drawSelectedScreen(selectedItem) {
    image(assets.room, 0, 0, width, height);
  
    // Center position for the item (in the left third)
    let panelWidth = width / 3;
    let centerX = panelWidth / 2;
    let centerY = height / 2;
    let scaleFactor = 1.5;
  
    // Get item height
    let itemHeight;
    if (selectedItem === "wallet") itemHeight = walletItem.baseHeight;
    else if (selectedItem === "phone") itemHeight = phoneItem.baseHeight;
    else if (selectedItem === "diary") itemHeight = diaryItem.baseHeight;
  
    let drawY = centerY - (itemHeight * scaleFactor) / 2;
  
    // Draw selected item centered in the left panel
    push();
    translate(centerX-10, drawY);
    scale(scaleFactor);
    if (selectedItem === "wallet") drawWallet(0, 0);
    else if (selectedItem === "phone") drawPhone(0, 0);
    else if (selectedItem === "diary") drawDiary(0, 0);
    pop();
  
    // Create 3 buttons on the right
    let btnX = width - 400;
    let btnY = height / 3;
    let btnW = 300;
    let btnH = 60;
  
    let buttons = [
      new Button(btnX, btnY, btnW, btnH, 'Look inside'),
      new Button(btnX, btnY + btnH + 20, btnW, btnH, 'Task 1'),
      new Button(btnX, btnY + 2 * (btnH + 20), btnW, btnH, 'Task 2'),
    ];
  
    buttons.forEach(btn => btn.display());
  }
  