class ErrorWindow {
  constructor(img, relX, relY, relW) {
    this.img = img;
    this.relX = relX;
    this.relY = relY;
    this.relW = relW;
    this.alpha = 0;         // ✨ 초기 투명도
    this.fadeSpeed = 30;    // ✨ 한 프레임당 증가량
    this.resize();
  }

  resize() {
    this.w = width * this.relW;
    this.h = this.w * (this.img.height / this.img.width);
    this.x = width * this.relX;
    this.y = height * this.relY;

    if (this.x + this.w > width) this.x = width - this.w;
    if (this.y + this.h > height) this.y = height - this.h;

    this.xBtnSize = this.w * 0.1;
    this.xBtnX = this.x + this.w - this.xBtnSize - 10;
    this.xBtnY = this.y + this.h - this.xBtnSize - 10;
  }

  display() {
    // ✨ 페이드 인 효과
    if (this.alpha < 255) {
      this.alpha += this.fadeSpeed;
    }

    push();
    tint(255, this.alpha);
    image(this.img, this.x, this.y, this.w, this.h);
    pop();

    // 텍스트 표시
    push();
    fill(255, this.alpha);
    textSize(this.w * 0.08);  // 이미지 크기에 비례
    textAlign(CENTER, CENTER);
    text(this.text, this.x + this.w / 2, this.y + this.h / 2);
    pop();

    // ✨ X 버튼 그릴 때는 항상 불투명하게
    fill(255, 0, 0, this.alpha);
    noStroke();
    rect(this.xBtnX, this.xBtnY, this.xBtnSize, this.xBtnSize, 5);

    stroke(255, this.alpha);
    strokeWeight(3);
    line(this.xBtnX + 5, this.xBtnY + 5, this.xBtnX + this.xBtnSize - 5, this.xBtnY + this.xBtnSize - 5);
    line(this.xBtnX + this.xBtnSize - 5, this.xBtnY + 5, this.xBtnX + 5, this.xBtnY + this.xBtnSize - 5);
    noStroke();
  }

  isXBtnClicked(mx, my) {
    return (
      mx >= this.xBtnX && mx <= this.xBtnX + this.xBtnSize &&
      my >= this.xBtnY && my <= this.xBtnY + this.xBtnSize
    );
  }
}
