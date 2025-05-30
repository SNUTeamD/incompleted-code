// morse.js

let imgMoss;
let scale = 0.25;
let inputBox;
let resultMessage = "";
let buttonX, buttonY, buttonW, buttonH;

function preloadMorse() {
  imgMoss = loadImage("assets/모스부호.jpg");
}

function setupMorseUI() {
  inputBox = createInput();
  inputBox.style("font-size", "2vw");
  inputBox.style("padding", "1vh");
  inputBox.input(() => resultMessage = "");
  positionMorseElements();
}

function positionMorseElements() {
  buttonW = windowWidth * 0.05;
  buttonH = windowHeight * 0.07;
  buttonX = windowWidth * 0.85;
  buttonY = windowHeight * 0.9;

  inputBox.size(windowWidth * 0.6, windowHeight * 0.07);
  inputBox.position(windowWidth * 0.2, windowHeight * 0.865);
}

function drawMorseStage() {
  image(imgMoss, width / 2, height * 0.5, imgMoss.width * scale, imgMoss.height * scale);
  
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
}

function checkMorseAnswer() {
  const userInput = inputBox.value().trim();
  if (userInput === "살려줘") {
    stage = 200;
    inputBox.hide();
  } else {
    resultMessage = "틀렸습니다. 다시 시도하세요.";
    console.log("실패");
  }
}

function mousePressedMorse(mx, my) {
  if (
    mx > buttonX - buttonW / 2 && mx < buttonX + buttonW / 2 &&
    my > buttonY - buttonH / 2 && my < buttonY + buttonH / 2
  ) {
    checkMorseAnswer();
  }
}
