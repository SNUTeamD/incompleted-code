let phase = 0;
let phaseStartTime;
let blinkAlpha;
let texts = [
  "(잠깐 졸았나..?)",
  "첫 날부터 주무시는 거에요? 이제 일하셔야죠."
];

let currentTextIndex = 0;
let fullText = "";
let displayedText = "";
let charIndex = 0;
let lastUpdateTime = 0;
let delay = 50;
let isTyping = true;
let clickReady = false;

let noiseStartTime;
let noiseDuration = 800;
let isNoising = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont("sans-serif");
  textAlign(CENTER, CENTER);
  textSize(36);
  phaseStartTime = millis();
}

function draw() {
  background(0);

  if (phase === 0) {
    // 1단계: 깜빡이는 경고 문구
    blinkAlpha = random(120, 255);
    fill(255, 0, 0, blinkAlpha);
    textSize(80);
    text("매뉴얼을 지키라고 했잖아", width / 2, height / 2);

    if (millis() - phaseStartTime > 2000 && !isNoising) {
      isNoising = true;
      noiseStartTime = millis();
    }

    // 2단계: 노이즈 효과
    if (isNoising) {
      drawNoise();
      if (millis() - noiseStartTime > noiseDuration) {
        phase = 1;
        loadNextText();
      }
    }

  } else if (phase === 1) {
    // 3단계: 대사 출력
    drawTextbox();
    drawTyping();
  }
}

function drawNoise() {
  loadPixels();
  for (let i = 0; i < pixels.length; i += 4) {
    let val = random(0, 255);
    pixels[i] = val;
    pixels[i + 1] = val;
    pixels[i + 2] = val;
    pixels[i + 3] = 255;
  }
  updatePixels();
}

function drawTextbox() {
  // 회색 박스
  let boxW = width * 0.9;
  let boxH = 160;
  let boxX = width / 2 - boxW / 2;
  let boxY = height - boxH - 50;
  fill(60);
  rect(boxX, boxY, boxW, boxH, 20);

  // 대사 텍스트
  fill(255);
  textAlign(LEFT, TOP);
  textSize(28);
  text(displayedText, boxX + 30, boxY + 30);
}

function drawTyping() {
  if (isTyping && charIndex < fullText.length) {
    if (millis() - lastUpdateTime > delay) {
      displayedText += fullText.charAt(charIndex);
      charIndex++;
      lastUpdateTime = millis();
    }
  } else {
    isTyping = false;
    clickReady = true;
  }
}

function loadNextText() {
  fullText = texts[currentTextIndex];
  displayedText = "";
  charIndex = 0;
  isTyping = true;
  clickReady = false;
  lastUpdateTime = millis();
}

function mousePressed() {
  if (phase !== 1) return;

  // 1. 타이핑 중이면 즉시 완료
  if (isTyping) {
    displayedText = fullText;
    charIndex = fullText.length;
    isTyping = false;
    clickReady = true;
  }
  // 2. 이미 출력 완료된 상태에서 클릭 → 다음 대사
  else if (clickReady) {
    currentTextIndex++;
    if (currentTextIndex < texts.length) {
      loadNextText();
    } else {
      noLoop(); // 종료
    }
  }
}
