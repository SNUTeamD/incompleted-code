let ButtonX, ButtonY, ButtonW, ButtonH;
let stage = 3;
let files = [];
let docs = [];
let docarr = [];

function preload(){
 myFont = loadFont('assets/DungGeunMo.ttf');
 fileIcon = loadImage('assets/fileIcon.png');
 fileDoc = loadImage('assets/fileDoc.png');
}

function setup(){
 createCanvas(windowWidth, windowHeight);
 textFont(myFont);
 textSize(35);
 textAlign(CENTER, CENTER);
 //컴퓨터 화면 버튼
 ButtonX = windowWidth/3;
 ButtonY = windowHeight/2;
 ButtonW = windowWidth/3-100;
 ButtonH = windowHeight/4;
}

function draw(){
  background(0);
  cursor(ARROW);
  switch(stage){
    case 3: 
    //업무 화면
    text("Day 1", 100,50);
    rectMode(CENTER);
    rect(ButtonX, ButtonY, ButtonH, ButtonW);
    let isHovering =
        mouseX >= ButtonX - ButtonW/2 &&
        mouseX <= ButtonX + ButtonW/2 &&
        mouseY >= ButtonY - ButtonH/2 &&
        mouseY <= ButtonY + ButtonH/2;

      if (isHovering) {
        textBox("파일 업무", mouseX, mouseY-25);
        cursor(HAND); // 커서 손 모양으로
        fill(255, 80, 80); // 연한 빨강
      } else {
        fill(255, 0, 0); // 기본 빨강
        cursor(ARROW); // 기본 커서
      }
     
      break;

    case 4:
    
    // 파일: 동물, 식물
    for (let i = 0; i < 2; i++) {
    let x = 200 + i * 300; // 간격 조절
    let y = 150;
    let w = 100;
    let h = 60;
    if (i=0){
      c="식물"
    } else {
      c="동물"
    }
    files.push(new MyFolder(x, y, w, h, c));
    }

    // 문서: 7개 랜덤 위치
    docarr = ["까치", "은행나무", "해파리", "사슴", "고양이", "민들레", "원숭이"];
    for (let i = 0; i < 7; i++) {
    let x = random(200, width-200);
    let y = random(200, height);
    let w = 120;
    let h = 50;
    let c = docarr[i];
    docs.push(new MyDoc(x, y, w, h, c));
    }
    

  }
}

function mouseClicked(){
  if (stage===3){
    if( mouseX >= ButtonX - ButtonW/2 &&
        mouseX <= ButtonX + ButtonW/2 &&
        mouseY >= ButtonY - ButtonH/2 &&
        mouseY <= ButtonY + ButtonH/2)
      {
        stage++;
      }
  }
  if (stage===4){
 
    
  }
}

function textBox(textcont, textX, textY){
  fill(120);
  rect(textX, textY, textWidth(textcont), 50);
  fill(250);
  text(textcont, textX, textY);
}

// function keyPresssed(){
//   if ()
// }