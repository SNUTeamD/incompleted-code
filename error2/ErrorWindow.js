class ErrorWindow {
  constructor(img, relX, relY, relW) {
    this.img = img;
    this.relX = relX;  // 화면 너비 대비 비율 (0~1)
    this.relY = relY;  // 화면 높이 대비 비율 (0~1)
    this.relW = relW;  // 화면 너비 대비 에러창 너비 비율 (예: 0.2 = 20%)
    this.resize();
  }

  resize() {
    // 너비는 화면 너비의 relW 비율로 고정
    this.w = width * this.relW;
    this.h = this.w * (this.img.height / this.img.width);

    // 위치는 화면 크기 대비 비율로 설정
    this.x = width * this.relX;
    this.y = height * this.relY;

    // 화면 밖으로 나가는 경우 위치 보정 (오른쪽, 아래)
    if (this.x + this.w > width) {
      this.x = width - this.w;
    }
    if (this.y + this.h > height) {
      this.y = height - this.h;
    }

    // 빨간 X 버튼 크기와 위치 계산 (이미지 너비 대비 10%)
    this.xBtnSize = this.w * 0.1;
    this.xBtnX = this.x + this.w - this.xBtnSize - 10;
    this.xBtnY = this.y + this.h - this.xBtnSize - 10;
  }

  display() {
    image(this.img, this.x, this.y, this.w, this.h);

    // 빨간 X 버튼 그리기
    fill(255, 0, 0);
    noStroke();
    rect(this.xBtnX, this.xBtnY, this.xBtnSize, this.xBtnSize, 5);

    stroke(255);
    strokeWeight(3);
    line(this.xBtnX + 5, this.xBtnY + 5, this.xBtnX + this.xBtnSize - 5, this.xBtnY + this.xBtnSize - 5);
    line(this.xBtnX + this.xBtnSize - 5, this.xBtnY + 5, this.xBtnX + 5, this.xBtnY + this.xBtnSize - 5);
    noStroke();
  }

  isXBtnClicked(mx, my) {
    return (mx >= this.xBtnX && mx <= this.xBtnX + this.xBtnSize &&
            my >= this.xBtnY && my <= this.xBtnY + this.xBtnSize);
  }
}
