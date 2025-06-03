let phase = 1; // ← 1로 설정하여 자동 재생 시작
let phaseStartTime;
let fadeAlpha = 0;
let autoAdvanceTime = null;
let autoDelay = 1500; // 1.5초 후 다음 문장 자동 전환
let lockInput = false; // 입력 허용 상태


let texts = [
  { speaker: "PLAYER", text: "소독약 냄새 ... 여긴... 어디지?" },
  { speaker: "PLAYER", text: "무언가가 머리에 연결되어 있어 몸을 움직일 수가 없다." },
  { speaker: "SYSTEM", text: "[SYSTEM MESSAGE: 실험체 0441 반응 기록 개시] \n실험체 0441: 고감도 공포 반응군" },
  { speaker: "SYSTEM", text: "안녕하세요. 편하게 계세요." },
  { speaker: "SYSTEM", text: "곧 당신에 대한 데이터 수집을 시작하겠습니다." },
  { speaker: "SYSTEM", text: "공포 반응이 적을 경우, 추가 자극이 투입됩니다." },
  { speaker: "PLAYER", text: "어째서?" },
  { speaker: "SYSTEM", text: "공포를 감각하세요. 공포는 인간의 당연한 본능이며 당신의 존재 이유입니다." },
  { speaker: "PLAYER", text: "이게 뭐야..? 도대체 왜..." },
  { speaker: "PLAYER", text: "제발! 제발 멈춰.. 나는 분명 ... ... 분명 ... " },
  { speaker: "PLAYER", text: "... ... ... 나는 누구였지?" },
  {
    speaker: "PLAYER",
    text: "소리가 들려. 아니, 아니, 아니지. 소리 같은 건 없어. 근데 그 소리가, 내 뼈 사이로 파고들어. 찢어, 비틀어, 부숴, 다시 붙여, 다시 찢어. 아, 너무 커. 너무 작아. 너무 조용해. 너무 시끄러워. 그게 소리야? 그게 날 말하고 있어.",
    lockInput: true,
    speedUp: true
  },
  { speaker: "SYSTEM", text: "[SYSTEM MESSAGE] 공포 지수 100% 달성.",
    lockInput: true
   },
  { speaker: "SYSTEM", text: "[SYSTEM MESSAGE] 실험체 0441: 고감도 공포 반응군 데이터 수집 완료.",
    lockInput: true
   },
  { speaker: "SYSTEM", text: "[SYSTEM MESSAGE] 에너지 변환 시작. 에너지 변환 중..." ,
    lockInput: true},
  { speaker: "SYSTEM", text: "[SYSTEM MESSAGE] 변환 완료." ,
    lockInput: true},
  { speaker: "PLAYER", 
    text: "나는 이제 공포를 흘리는 관이다. 나는 기계이며 나는 양분이다. 나는 통로다. 나는 그들이다. 그들은 나를 본다. 나는 그들이 본 것을 본다. 나는 그들이 본 것을 느낀다.",
    lockInput: true
   },
  { speaker: "SYSTEM", text: "[SYSTEM MESSAGE] 감정 및 기억 초기화 프로세스 시작.",
    lockInput: true},
  { speaker: "SYSTEM", text: "[SYSTEM MESSAGE] 초기화 완료. 실험체 0441 변환 성공.",
    lockInput: true }
];

let currentTextIndex = 0;
let fullText = "";
let displayedText = "";
let charIndex = 0;
let lastUpdateTime = 0;
let delay = 50;
let isTyping = true;
let clickReady = false;
let noiseStartTime = null;
let noiseDuration = 30000; // 노이즈가 완전히 덮이는 데 걸리는 시간(ms)
let isNoising = false;
let endc1Reached = false;




function preload() {
  endingC1Img = loadImage('assets/ending c-1.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont("sans-serif");
  textAlign(CENTER, CENTER);
  textSize(36);
  phaseStartTime = millis();
  loadNextText();
}


function draw() {
  if (endc1Reached) {
    background(0);
    fill(255);
    textSize(36);
    textAlign(CENTER, CENTER);
    textFont("Courier New");
    text("#End C: Fusion Ending", width / 2, height / 2);
    return;
  }

  fadeAlpha = constrain((millis() - phaseStartTime) / 2000 * 255, 0, 255);
  tint(255, fadeAlpha);
  image(endingC1Img, 0, 0, width, height);
  noTint();

  drawTyping(); // 텍스트 타이핑 로직 먼저
  if (currentTextIndex >= 11) {
    if (!isNoising) {
      noiseStartTime = millis();
      isNoising = true;
    }

    let elapsed = millis() - noiseStartTime;
    let progress = constrain(elapsed / noiseDuration, 0, 1);

    drawNoise(progress);
  }
  
  drawTextbox(); // 항상 제일 위에 출력
}


function drawNoise(progress) {
  loadPixels();
  let alpha = map(progress, 1, 0, 0, 255);

  for (let i = 0; i < pixels.length; i += 4) {
    let val = random(0, 255);
    pixels[i] = val;       // R
    pixels[i + 1] = val;   // G
    pixels[i + 2] = val;   // B
    pixels[i + 3] = alpha; // A 
  }

  updatePixels();
}


function drawTextbox() {
  let speaker = texts[currentTextIndex].speaker;

  // 텍스트 박스
  let boxW = width * 0.9;
  let boxH = 160;
  let boxX = width / 2 - boxW / 2;
  let boxY = height - boxH - 50;
  noStroke();
  fill(60,220);
  rect(boxX, boxY, boxW, boxH, 20);

  // SYSTEM 이름 태그
  if (speaker === "SYSTEM") {
    fill(120);
    rect(boxX + 20, boxY - 40, 100, 30, 10);
    fill(255);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("SYSTEM", boxX + 70, boxY - 25);
  }

  // 텍스트
  fill(255);
  textAlign(LEFT, TOP);
  textSize(20);
  let textMargin = 30;
  text(displayedText, boxX + textMargin, boxY + textMargin, boxW - textMargin * 2, boxH - textMargin * 2);
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

    let currentObj = texts[currentTextIndex];

    if (currentObj.lockInput) {
      // 마우스 조작 불가 상태일 경우 clickReady도 false 유지
      clickReady = false;

      // 자동 진행 시작
      if (autoAdvanceTime === null) {
        autoAdvanceTime = millis();
      }
    } else {
      // 일반 대사일 경우만 clickReady true
      clickReady = true;
    }
}

  // 자동 진행 실행
 if (autoAdvanceTime !== null) {
  let elapsed = millis() - autoAdvanceTime;
  console.log("Auto delay:", elapsed);

  if (elapsed > autoDelay) {
    if (currentTextIndex < texts.length - 1) {
      console.log("Advancing to:", currentTextIndex + 1);
      currentTextIndex++;
      loadNextText();
    } else {
      console.log("✅ 엔딩 도달!");
      endc1Reached = true;
    }

    autoAdvanceTime = null;
  }
}

}

function loadNextText() {
   let obj = texts[currentTextIndex];
  fullText = obj.text;
  displayedText = "";
  charIndex = 0;
  isTyping = true;
  clickReady = false;

  // 타이핑 속도 조절
  delay = obj.speedUp ? 50 / 1.5 : 50;

  lastUpdateTime = millis();
}

function mousePressed() {
  if (phase !== 1) return;

  let currentObj = texts[currentTextIndex];
  if (currentObj.lockInput) return; // 조작 불가능한 상태

  if (isTyping) {
    displayedText = fullText;
    charIndex = fullText.length;
    isTyping = false;
    clickReady = true;
  } else if (clickReady) {
    currentTextIndex++;
    if (currentTextIndex < texts.length) {
      loadNextText();
    } else {
      endc1Reached = true;
      //noLoop(); // 종료
    }
  }
}

