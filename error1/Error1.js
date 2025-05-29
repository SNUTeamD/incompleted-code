class Error1 {
  constructor(img) {
    this.img = img;
    this.animationSpeed = 20;
    this.isVisible = true;  // 표시 여부
    this.startTime = millis();  // 생성 시점 시간 저장
    this.resize();
  }

  resize() {
    this.w = width * 0.3;
    this.h = this.w * (this.img.height / this.img.width);
    this.x = width - this.w;

    this.targetY = height - this.h;
    this.y = height + 50;

    // 위치가 리셋될 때마다 다시 보여지고 타이머 리셋
    this.isVisible = true;
    this.startTime = millis();
  }

  display() {
    if (!this.isVisible) return;  // 표시 안 하면 스킵

    // 30초 후 자동 숨김
    if (millis() - this.startTime > 30000) {
      this.isVisible = false;
      return;
    }

    // 애니메이션 이동
    if (this.y > this.targetY) {
      this.y -= this.animationSpeed;
      if (this.y < this.targetY) this.y = this.targetY;
    }

    image(this.img, this.x, this.y, this.w, this.h);
  }

  isClicked(mx, my) {
    return this.isVisible &&
           mx >= this.x && mx <= this.x + this.w &&
           my >= this.y && my <= this.y + this.h;
  }
}
