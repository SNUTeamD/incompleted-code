class Error1 {
  constructor(img) {
    this.img = img;
    this.resize();
  }

  resize() {
    this.w = width * 0.3;
    this.h = this.w * (this.img.height / this.img.width);
    this.x = width - this.w;
    this.y = height - this.h;
  }

  display() {
    image(this.img, this.x, this.y, this.w, this.h);
  }

  isClicked(mx, my) {
    return (mx >= this.x && mx <= this.x + this.w &&
            my >= this.y && my <= this.y + this.h);
  }
}
