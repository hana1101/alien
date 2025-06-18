class DialogueBox {
  constructor(x, y, w, h, lines) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.lines = lines;

    this.currentLine = 0;
    this.finished = false;
    this.finishedClicked = false;

    this.glowColor = color(0, 255, 153, 80);
  }

  display() {
    push();

    // ---------- 대화 상자 (그라디언트 + 네온 외곽) ----------
    noStroke();
    const g = drawingContext.createLinearGradient(
      this.x, this.y, this.x, this.y + this.h
    );
    g.addColorStop(0, "rgba(15,15,45,0.95)");
    g.addColorStop(1, "rgba(35,35,70,0.95)");
    drawingContext.fillStyle = g;
    rect(this.x, this.y, this.w, this.h, 12);

    // 외곽 라인 + 글로우
    strokeWeight(3);
    stroke(0, 255, 200);
    noFill();
    rect(this.x, this.y, this.w, this.h, 12);

    strokeWeight(8);
    stroke(this.glowColor);
    rect(this.x, this.y, this.w, this.h, 12);

    pop();

    // ---------- 텍스트 ----------
    const pad = 24;
    fill(114, 255, 251); 
    textFont(neoFont);
    textSize(24);
    textAlign(LEFT, TOP);
    text(
      this.lines[this.currentLine],
      this.x + pad,
      this.y + pad,
      this.w - pad * 2
    );

    // ---------- “다음” 인디케이터 ----------
    if (this.currentLine < this.lines.length - 1) {
      const blink = frameCount % 60 < 30;
      if (blink) {
        textSize(20);
        textAlign(RIGHT, BOTTOM);
        fill(160); // 흐릿한 회색 계열로
        text("⟶", this.x + this.w - pad, this.y + this.h - pad);
      }
    }
  }

  isHovered() {
    return (
      mouseX > this.x &&
      mouseX < this.x + this.w &&
      mouseY > this.y &&
      mouseY < this.y + this.h
    );
  }

  next() {
    if (this.currentLine < this.lines.length - 1) {
      this.currentLine++;
    } else {
      this.finished = true;
    }
  }

  handleClick() {
    if (this.isHovered()) {
      this.next();
      if (this.finished) {
        this.finishedClicked = true;
        if (typeof isDialogueBlocking !== "undefined") {
          isDialogueBlocking = false;
        }
      }
    }
  }

  reset() {
    this.currentLine = 0;
    this.finished = false;
    this.finishedClicked = false;
  }

  isOnLastLine() {
    return this.currentLine === this.lines.length - 1 && !this.finished;
  }
  static maybeReset(name) {
    console.log("🧪 maybeReset called for", name);
    if (pendingDialogueReset === name) {
      console.log("🔄 Match found → Resetting:", name);
      if (window[name]) {
        window[name].reset();
        console.log("✅ Reset dialogue:", name);
      } else {
        console.warn("⚠️ Dialogue object not yet created:", name);
      }
      pendingDialogueReset = null;
    }
  }
  

  setLines(newLines) {
    this.lines = newLines;
    this.reset();
  }
}