let ButtonX, ButtonY, ButtonW, ButtonH;
let stage = 102;
let isStage4Initialized = false;
let missionEnded = false;
let missionSuccess = false;
let folders = [];
let docs = [];
let docarr = [];

let docNames = ["까치", "은행나무", "해파리", "사슴", "고양이", "민들레", "원숭이"];
let answerMap = {
  "까치": "동물",
  "은행나무": "식물",
  "해파리": "동물",
  "사슴": "동물",
  "고양이": "동물",
  "민들레": "식물",
  "원숭이": "동물"
};

function preload(){
 myFont = loadFont('assets/DungGeunMo.ttf');
 folderIcon = loadImage('assets/folderIcon.png');
 folderDoc = loadImage('assets/folderDoc.png');
}

function setup(){
 createCanvas(windowWidth, windowHeight);
 textFont(myFont);
 textSize(35);
 textAlign(CENTER, CENTER);
 //컴퓨터 화면 버튼
 ButtonX = windowWidth/3;
 ButtonY = windowHeight/2;

}

function draw(){
  background(0);
  cursor(ARROW);
  switch(stage){
    case 102: 
      day1Home();
    break;
    case 103:
      day1Task1();
    break;

  }
}

function day1Home(){
   //업무 화면
      fill(255); // White text
      textSize(35);
      text("Day 1", 100,50);
    //폴더 버튼 만들기
      imageMode(CENTER);
      ButtonW = 150;
      ButtonH = 100;
      image(folderIcon, ButtonX, ButtonY, ButtonW, ButtonH);
    //마우스 버튼 호버링 여부 판단
      let isHovering =
        mouseX >= ButtonX - ButtonW/2 &&
        mouseX <= ButtonX + ButtonW/2 &&
        mouseY >= ButtonY - ButtonH/2 &&
        mouseY <= ButtonY + ButtonH/2;
      if (isHovering) {
        textBox("문서 분류 업무", mouseX, mouseY-25);
        cursor(HAND); // 커서 손 모양으로
      } else {
        cursor(ARROW); // 기본 커서
      }
}

function day1Task1(){
  // Instructions
  fill(255);
  textSize(16);
  textAlign(CENTER, TOP);
  text("문서를 마우스로 클릭해 선택하세요. 식물 이름을 가진 문서는 ‘식물’ 폴더에, \n동물 이름을 가진 문서는 ‘동물’ 폴더에 넣어주세요. \n문서를 마우스를 드래그 한 후 ctrl+x를 누르면 문서를 여러 개 잘라낼 수 있습니다. \n분류에 맞게 문서를 옮기면, ‘완료’ 버튼을 눌러주세요.", width/2, 30);

  if (!isStage4Initialized){
  // 파일: 동물, 식물
  folders.push(new MyFolder(width/3, 200, 100, 60, "동물"));
  folders.push(new MyFolder(2*width/3, 200, 100, 60, "식물"));
  

  let cols = 4;
  let spacing = 150;
  let startX = width/4;
  let startY = 350;
  for (let i = 0; i < docNames.length; i++) {
    let x = startX + (i % cols) * spacing;
    let y = startY + floor(i / cols) * spacing;
    docs.push(new MyDoc(x, y, 50, 80, docNames[i]));
  }

  isStage4Initialized = true; 
  
  }

  for (let f of folders) {
    f.display();
  }
  for (let d of docs) {
    if(!d.removed){
      d.display();
    }
  }

  if (!missionEnded) {
    checkMissionStatus();
  } else {
    fill(225);
    textSize(36);
    text(missionSuccess ? "🎉 미션 성공!" : "❌ 미션 실패", width / 2, height / 2);
  }
}

function mouseClicked(){
  if (stage===102){
    if( mouseX >= ButtonX - ButtonW/2 &&
        mouseX <= ButtonX + ButtonW/2 &&
        mouseY >= ButtonY - ButtonH/2 &&
        mouseY <= ButtonY + ButtonH/2)
      {
        stage++;
      }
  }
}

function mousePressed() {
  if (missionEnded) return;
  for (let doc of docs) {
    doc.checkPressed();
  }
}

function mouseDragged() {
  if (missionEnded) return;
  for (let doc of docs) {
    doc.drag();
  }
}

function mouseReleased() {
  if (missionEnded) return;

  for (let doc of docs) {
    doc.stopDragging();

    for (let f of folders) {
      if (f.contains(doc)) {
        doc.inBasket = f.name;

        if (!doc.isCorrect()) {
          missionEnded = true;
          missionSuccess = false;
        } else {
          doc.removed = true;
        }
      }
    }
  }
}


function checkMissionStatus() {
  // 모든 파일이 제거되었으면 성공
  if (docs.every(d => d.removed)) {
    missionEnded = true;
    missionSuccess = true;
  }
}


function textBox(textcont, textX, textY){
  rectMode(CENTER);
  fill(80, 80, 80, 200); // Semi-transparent dark grey background for textbox
  noStroke();
  textSize(20); // Smaller text for tooltip
  let textW = textWidth(textcont) + 20; // Add padding
  let textH = 40;
  rect(textX, textY, textW, textH, 5); // Rounded corners
  fill(255); // White text
  textAlign(CENTER, CENTER);
  text(textcont, textX, textY);
}



