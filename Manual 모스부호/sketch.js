let img;
let scale = 0.25;
let inputBox;
let resultMessage = "";
let buttonX, buttonY, buttonW, buttonH;
let gameState = "quiz"; // "quiz" 또는 "success"

function preload() {
  img = loadImage("assets/모스부호.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  textAlign(CENTER);
  rectMode(CENTER);

  // 입력창 생성
  inputBox = createInput();
  inputBox.style("font-size", "2vw");
  inputBox.style("padding", "1vh");
  inputBox.input(() => resultMessage = ""); // 입력 시 메시지 초기화

  positionElements();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  positionElements();
}

function positionElements() {
  // 버튼 크기 비율로 조정
  buttonW = windowWidth * 0.05;
  buttonH = windowHeight * 0.07;
  buttonX = windowWidth * 0.85;
  buttonY = windowHeight * 0.9;

  // 입력창 크기 및 위치 조정
  inputBox.size(windowWidth * 0.6, windowHeight * 0.07);
  inputBox.position(windowWidth * 0.2, windowHeight * 0.865);
}

function draw() {
  background(105, 159, 169);

  switch (gameState) {
    //게임 화면면
    case "quiz":
      image(img, width / 2, height * 0.5, img.width * scale, img.height * scale);
      fill(255);
      stroke(0);
      textSize(windowWidth * 0.03);
      rect(width / 2, height * 0.05, width * 0.75, height * 0.08);
      fill(0);
      text("모스부호를 해독해서 적절한 글을 입력하시오", width / 2, height * 0.06);
      text("– – ·　 ·　 · · · –　 · · · –　 · · ·　 · – – ·　 · · · ·　 –　", width / 2, height * 0.15);

      fill(74, 144, 226);
      stroke(255);
      strokeWeight(2);
      rect(buttonX, buttonY, buttonW, buttonH, 10);

      fill(255);
      noStroke();
      textSize(windowWidth * 0.012);
      text("제출", buttonX, buttonY + buttonH * 0.1);

      fill(0);
      textSize(windowWidth * 0.025);
      text(resultMessage, width / 2, height * 0.83);
      break;
  //다음 날로
    case "success":
      background(0);
      fill(255);
      textSize(windowWidth * 0.06);
      text("Day 2", width / 2, height / 2);
      break;
  }
}

function mousePressed() {
  //정답 버튼튼
  switch (gameState) {
    case "quiz":
      if (
        mouseX > buttonX - buttonW / 2 && mouseX < buttonX + buttonW / 2 &&
        mouseY > buttonY - buttonH / 2 && mouseY < buttonY + buttonH / 2
      ) {
        checkAnswer();
      }
      break;
  }
}

function checkAnswer() {
  //상태 변화
  const userInput = inputBox.value().trim();
  if (userInput === "살려줘") {
    gameState = "success";
    inputBox.hide();
  } else {
    resultMessage = "틀렸습니다. 다시 시도하세요.";
    console.log("실패");
  }
}
