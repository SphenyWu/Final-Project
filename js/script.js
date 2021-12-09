function preload(){
  sound = loadSound('assets/Marine Snow.mp3');
}

function setup() {
   let cnv = createCanvas(windowWidth,windowHeight);
  cnv.mouseClicked(togglePlay);
  fft = new p5.FFT();
  sound.amp(2);
  background(0);
  fill(255);
  noStroke();
}

function draw() {
  push();
  //backgroung(0);
  let freq = frameCount * 0.02;
  let amp = random(10, 200);
  let sinValue = sin(freq) * amp;

  let x = frameCount;
  let y = mouseY + sinValue;

  if (keyIsPressed) {
    fill(0, 191, 255);
  } else {
    fill("cyan");
  }
  ellipse(x, y, 3, 3);
  pop();

  for (let x = 0; x < width; x = x + 30) {
    for (let y = 0; y < height; y = y + 20) {
      const xAngle = map(mouseX, 0, width, -2 * PI/2, 21* PI, true);
      const yAngle = map(mouseY, 0, height, -4 * PI/3, 4 * PI, true);

      const angle = xAngle * (x / width) + yAngle * (y / height);

      const myX = x + 20 * cos(2 * PI + angle);
      const myY = y + 20 * sin(2 * PI + angle);

      fill(176, 196, 222, 1);
      circle(myX, myY, 1);
    }
  }
}
function togglePlay() {
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.loop();
  }
}
