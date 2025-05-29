let errorImg;
let errors = [];
const NUM_ERRORS = 7;
let errorIndex = 0;
let interval = 200; // 0.4초 간격
let lastErrorTime = 0;
let errorTexts = [
  "시스템 오류 발생",
  "접근이 거부되었습니다",
  "파일이 손상되었습니다",
  "알 수 없는 명령어",
  "보안 경고!",
  "메모리 초과",
  "예상치 못한 에러"
];



function preload() {
  errorImg = loadImage('assets/에러-큰거.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  lastErrorTime = millis();
}


function draw() {
  background(0);

  // 💥 여기에서 에러 창 등장 로직 실행
  if (errorIndex < NUM_ERRORS && millis() - lastErrorTime > interval) {
    let relW = 0.4;
    let relH = relW * (errorImg.height / errorImg.width);
    let relX = random(0, 1 - relW);
    let relY = random(0, 1 - relH);

    let msg = errorTexts[errorIndex];  // 해당 에러에 맞는 텍스트
    errors.push(new ErrorWindow(errorImg, relX, relY, relW, msg));

    errorIndex++;
    lastErrorTime = millis();
  }

  // 🎯 에러창 그리기
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
