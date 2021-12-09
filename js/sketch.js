let snowflakes = [];

function preload(){
  sound = loadSound('assets/Marine Snow.mp3');
}


function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.mouseClicked(togglePlay);
  fft = new p5.FFT();
  sound.amp(2);
  for (let i = 0; i < 1000; i++) {
    snowflakes[i] = new Snowflake(random(width), random(height, height+200));
  }
}

function draw() {
  background(0);

  let spectrum = fft.analyze();
  noStroke();
  fill(0, 255, 255, 90);
  for (let i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length, 0, width * 10);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, (width / spectrum.length) * 40, h);
  }

  for (let i = 0; i < snowflakes.length; i++) {
    let s = snowflakes[i];
    s.move();
    s.appear();
    s.display();
  }
}
class Snowflake {
  constructor(x, y) {
    let randomness = random(1, 6);
    this.x = x;
    this.y = y;
    this.xSpd = 0;
    this.ySpd = map(randomness, 1, 6, -4, -1);
    this.dia = randomness;
  }
  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
  }
  appear() {
    if (this.y < 0) {
      this.y = height;
    }
  }
  display() {
    push();
    blendMode(ADD);
    fill(0, 150, 255, 200);
    rectMode(CENTER);
    rect(this.x, this.y, this.dia, this.dia);
    pop();
  }
}

function togglePlay() {
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.loop();
  }
}
