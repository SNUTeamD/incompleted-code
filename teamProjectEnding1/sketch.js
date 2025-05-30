//엔딩 A

let dialogues;
let currentLine = 0;
let currentText = "";
let typingSpeed = 2;
let frameCountOffset = 0;
let lineDelayFrames = 60;
let waitingForNext = false;
let endReached = false;

let displayedLines = [];
let lineHeight = 40;

function preload() {
  dialogues = loadJSON("dialogue.json");
  //myFont = loadFont('assets/DungGeunMo.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('Courier New');
  textSize(28);
  textAlign(LEFT, TOP);
  frameCountOffset = frameCount;
}

function draw() {
  background(0);
  fill(255);

  if (endReached) {
    background(0);
    textSize(36);
    textAlign(CENTER, CENTER);
    text("#End A: Bad Ending", width / 2, height / 2);
    return;
  }

  // 출력된 줄들 그리기
  textAlign(LEFT, TOP);
  for (let i = 0; i < displayedLines.length; i++) {
    text(displayedLines[i], 80, 80 + i * lineHeight);
  }

  // 현재 줄 타이핑 처리
  let line = dialogues.lines[currentLine];
  let numCharsToShow = min(line.length, floor((frameCount - frameCountOffset) / typingSpeed));
  currentText = line.substring(0, numCharsToShow);

  // 현재 진행 중인 줄만 따로 그리기
  text(currentText, 80, 80 + displayedLines.length * lineHeight);

  if (numCharsToShow === line.length && !waitingForNext) {
    waitingForNext = true;
    setTimeout(() => {
      displayedLines.push(line);
      currentLine++;
      if (currentLine >= dialogues.lines.length) {
        endReached = true;
      } else {
        frameCountOffset = frameCount;
        waitingForNext = false;
      }
    }, lineDelayFrames * (1000 / 60));
  }
}



