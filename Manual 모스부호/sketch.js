let stage = 106;

function preload() {
  preloadMorse();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  textAlign(CENTER);
  rectMode(CENTER);
  setupMorseUI();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  positionMorseElements();
}

function draw() {
  background(105, 159, 169);

  switch (stage) {
    case 106:
      drawMorseStage();
      break;

    case 200:
      background(0);
      fill(255);
      textSize(windowWidth * 0.06);
      text("Day 2", width / 2, height / 2);
      break;
  }
}

function mousePressed() {
  switch (stage) {
    case 106:
      mousePressedMorse(mouseX, mouseY);
      break;
  }
}
