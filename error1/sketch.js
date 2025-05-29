let error1;
let imgError;
let stage = 0;  // stage 변수 정의

function preload() {
  imgError = loadImage('assets/에러창-예.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  error1 = new Error1(imgError);  // 클래스는 Error1, 인스턴스는 error1
}

function draw() {
  background(0);

  switch (stage) {
    case 500:
      fill(255);
      textSize(32);
      textAlign(CENTER, CENTER);
      text("에러 발생! 엔딩B 스테이지입니다.", width / 2, height / 2);
      break;

    default:
      error1.display();
      break;
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  error1.resize();
}

function mouseClicked() {
  // 에러 이미지 클릭 시 999 스테이지로 이동
  if (error1 && error1.isClicked(mouseX, mouseY)) {
    stage = 500;
    return;
  }

  // 나머지 기존 로직은 여기에 추가하면 됨
}
