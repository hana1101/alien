class pixelbutton {
  constructor(x, y, w , h, textsize, btntext) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.btntext=btntext
    this.textsize=textsize
  }

  isHovered() {
    return mouseX > this.x && mouseX < this.x + this.w &&
           mouseY > this.y && mouseY < this.y + this.h;
  }

  display() {
    let hover = this.isHovered();

    // Background
    fill(0, 200);
    rect(this.x-5, this.y - 5, this.w + 10, this.h + 10);
    rect(this.x-10, this.y, this.w + 20, this.h );
    rect(this.x-20, this.y+5, this.w + 40, this.h-10);

    // Shadow
    noStroke();
    fill(0, 74, 159, 240);
    rect(this.x-5, this.y+5, this.w + 10, this.h-10);
    rect(this.x-13, this.y+10 , this.w+25, this.h - 20);

    // Base Button (changes color on hover)
    if (hover) {
      fill(0, 220, 255, 255); // brighter blue
    } else {
      fill(0, 180, 255, 230);
    }
    rect(this.x+5, this.y+15, this.w-8, this.h-30);
    rect(this.x-7, this.y+23, this.w+15, this.h-45);
    rect(this.x+10, this.y+10, this.w-20, this.h-20);

    // Text
    fill(255);
    textSize(this.textsize);
    textAlign(CENTER, CENTER);
    textFont('Press Start 2P');

    text(this.btntext, this.x + this.w / 2, this.y + this.h / 2 + 2);
  }
}


function drawDialogueBox(x, y, w, h, textContent) {
  // Colors
  let spaceblue = color(10, 10, 40);
  let neongreen = color(0, 255, 153);
  let brightpink = color(255, 0, 255);
  let cyanblue = color(114, 255, 251);
  let lightblue = color(98, 176, 255);
  let ufoPurple = color(167, 91, 255);
  let starcolor = color(255, 235, 59);
  let zibgreen = color('#92C367');

  // Box
  noStroke();
  fill(spaceblue);
  rect(x, y, w, h, 8); // rounded box

  // Border
  stroke(neongreen);
  strokeWeight(4);
  noFill();
  rect(x, y, w, h, 8);

  // Text
  noStroke();
  fill(cyanblue);
  textFont("Press Start 2P");
  textSize(12);
  textAlign(LEFT, TOP);
  let padding = 20;
  text(textContent, x + padding, y + padding, w - 2 * padding, h - 2 * padding);
  
}


class GlowBox {
  constructor(x, y, message, type = 'success') {
    this.x = x;
    this.y = y;
    this.message = message;
    this.type = type;
    this.padding = 40;
    this.borderRadius = 12;
    this.glowRadius = 16;
    
    // 타입별 색상 설정
    this.colors = {
      success: {
        bg: [22, 22, 53, 180],
        stroke: [1, 255, 185],
        glowStroke: [1, 255, 185, 80],
        text: "#01FF70"
      },
      failure: {
        bg: [40, 0, 0, 180],
        stroke: [255, 50, 50],
        glowStroke: [255, 50, 50, 80],
        text: "#FF4C4C"
      },
      info: {
        bg: [0, 20, 40, 180],
        stroke: [50, 150, 255],
        glowStroke: [50, 150, 255, 80],
        text: "#4DA6FF"
      }
    };
  }
  
  display(textSize = 32, font = neoFont) {
    push();
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    textSize(textSize);
    
    if (font) {
      textFont(font);
    }
    
    // 텍스트 크기 계산
    let boxW = textWidth(this.message) + this.padding * 2;
    let boxH = textSize + this.padding * 2;
    
    let currentColors = this.colors[this.type];
    
    // 메인 배경 박스
    fill(...currentColors.bg);
    stroke(...currentColors.stroke);
    strokeWeight(4);
    rect(this.x, this.y, boxW, boxH, this.borderRadius);
    
    // 글로우 효과 (외부 링)
    stroke(...currentColors.glowStroke);
    strokeWeight(10);
    noFill();
    rect(this.x, this.y, boxW + 10, boxH + 10, this.glowRadius);
    
    // 텍스트
    noStroke();
    fill(currentColors.text);
    text(this.message, this.x, this.y);
    
    pop();
  }
  
  // 애니메이션 효과를 위한 메서드들
  displayWithPulse(textSize = 32, font = null, pulseSpeed = 0.1) {
    let pulse = sin(frameCount * pulseSpeed) * 0.2 + 1;
    
    push();
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    textSize(textSize);
    
    if (font) {
      textFont(font);
    }
    
    let boxW = textWidth(this.message) + this.padding * 2;
    let boxH = textSize + this.padding * 2;
    
    let currentColors = this.colors[this.type];
    
    // 펄스 효과가 적용된 글로우
    stroke(...currentColors.glowStroke.slice(0, 3), currentColors.glowStroke[3] * pulse);
    strokeWeight(10 * pulse);
    noFill();
    rect(this.x, this.y, (boxW + 10) * pulse, (boxH + 10) * pulse, this.glowRadius);
    
    // 메인 박스
    fill(...currentColors.bg);
    stroke(...currentColors.stroke);
    strokeWeight(4);
    rect(this.x, this.y, boxW, boxH, this.borderRadius);
    
    // 텍스트
    noStroke();
    fill(currentColors.text);
    text(this.message, this.x, this.y);
    
    pop();
  }
  
  // 페이드 인 효과
  displayWithFadeIn(textSize = 32, font = null, fadeProgress = 1) {
    let alpha = fadeProgress * 255;
    
    push();
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    textSize(textSize);
    
    if (font) {
      textFont(font);
    }
    
    let boxW = textWidth(this.message) + this.padding * 2;
    let boxH = textSize + this.padding * 2;
    
    let currentColors = this.colors[this.type];
    
    // 알파값 적용된 색상들
    fill(currentColors.bg[0], currentColors.bg[1], currentColors.bg[2], currentColors.bg[3] * fadeProgress);
    stroke(currentColors.stroke[0], currentColors.stroke[1], currentColors.stroke[2], alpha);
    strokeWeight(4);
    rect(this.x, this.y, boxW, boxH, this.borderRadius);
    
    // 글로우 효과
    stroke(currentColors.glowStroke[0], currentColors.glowStroke[1], currentColors.glowStroke[2], currentColors.glowStroke[3] * fadeProgress);
    strokeWeight(10);
    noFill();
    rect(this.x, this.y, boxW + 10, boxH + 10, this.glowRadius);
    
    // 텍스트
    noStroke();
    fill(red(currentColors.text), green(currentColors.text), blue(currentColors.text), alpha);
    text(this.message, this.x, this.y);
    
    pop();
  }
}
