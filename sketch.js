'use strict';

var textTyped = '半角でタイピングしてみてください';
var fontSizes = [textTyped.length];
var minFontSize = 15;
var maxFontSize = 800;
var newFontSize = 0;

var pMillis = 0;
var maxTimeDelta = 5000.0;

var spacing = 2;
var tracking = 0;
var font;

function setup() {
  createCanvas(800, 600);

  font = 'Sawarabi Mincho';

  noCursor();
  noStroke();

  for (var i = 0; i < textTyped.length; i++) {
    fontSizes[i] = minFontSize;
  }
}

function draw() {
  background(255);
  textAlign(LEFT);
  fill(0);

  spacing = map(mouseY, 0, height, 0, 120);
  translate(0, 200 + spacing);

  var x = 0;
  var y = 0;
  var fontSize = 20;

  for (var i = 0; i < textTyped.length; i++) {
    fontSize = fontSizes[i];
    textFont("Sawarabi Mincho", fontSize);
    var letter = textTyped.charAt(i);
    var letterWidth = textWidth(letter) + tracking;

    if (x + letterWidth > width) {
      x = 0;
      y += spacing;
    }

    text(letter, x, y);
    x += letterWidth;
  }

  var timeDelta = millis() - pMillis;
  newFontSize = map(timeDelta, 0, maxTimeDelta, minFontSize, maxFontSize);
  newFontSize = min(newFontSize, maxFontSize);

  fill(200);
  if (int(frameCount / 10) % 2 == 0) fill(255);
  rect(x, y, newFontSize / 1, newFontSize / 100);
}

function keyReleased() {
  if (keyCode == CONTROL) saveCanvas(gd.timestamp(), 'png');
}

function keyTyped() {
  if (keyCode >= 48) {
    textTyped += key;
    fontSizes.push(newFontSize);
  } else if (keyCode == BACKSPACE || keyCode == DELETE) {
    if (textTyped.length > 0) {
      textTyped = textTyped.substring(0, max(0, textTyped.length - 1));
      fontSizes.pop();
    }
  }
  
  pMillis = millis();
}
