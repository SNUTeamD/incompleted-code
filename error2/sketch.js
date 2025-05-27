let errorImg;
let errors = [];
const NUM_ERRORS = 7;

function preload() {
  errorImg = loadImage('assets/에러-큰거.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  let relW = 0.4; // 에러창 너비 비율 (화면 너비 대비)
  let relH = relW * (errorImg.height / errorImg.width);

  for (let i = 0; i < NUM_ERRORS; i++) {
    // 화면 밖으로 나가지 않도록 위치 범위 제한
    let relX = random(0, 1 - relW);
    let relY = random(0, 1 - relH);

    errors.push(new ErrorWindow(errorImg, relX, relY, relW));
  }
}

function draw() {
  background(0);
  for (let e of errors) {
    e.display();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  for (let e of errors) {
    e.resize();
  }
}

function mouseClicked() {
  // 뒤에서부터 검사해서 삭제 시 인덱스 밀림 방지
  for (let i = errors.length - 1; i >= 0; i--) {
    if (errors[i].isXBtnClicked(mouseX, mouseY)) {
      errors.splice(i, 1);
      console.log('에러창 닫음:', i);
      return;  // 한 번에 하나만 닫기
    }
  }
}
