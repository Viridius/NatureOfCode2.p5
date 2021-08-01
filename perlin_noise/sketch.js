
// import Particle from 'particle.js';

let inc = 0.1;
let scl = 10;
var cols, rows;
var zoff = 0;
var fr;
var particle = [];
var flowfield = [];

function setup() {
  createCanvas(1200, 720);
  colorMode(HSB, 255);
  cols = floor(width/scl);
  rows = floor(height/scl);
  fr = createP('');

  flowfield = new Array(cols * rows);

  for (var p = 0; p < 500; p++) {
    particle[p] = new Particle();
  }
  background(255);
}

function draw() {
    var yoff = 0;
    for (var y = 0; y < rows; y++) {
        var xoff = 0;
        for (var x = 0; x < cols; x++) {
            var index = x + y * cols;
            var r = noise(xoff, yoff, zoff) * TWO_PI * 2;
            var v = p5.Vector.fromAngle(r);
            v.setMag(0.1);
            flowfield[index] = v;
            stroke(0, 50);
            xoff += inc;
            // strokeWeight(0.1);
            // push();
            // translate(x * scl, y * scl);
            // rotate(v.heading());
            // line(0, 0, scl, 0);
            // pop();
        }
        yoff += inc;
        zoff += 0.0004;
    }
    for (var p = 0; p < particle.length; p++) {
      particle[p].follow(flowfield);
      particle[p].update();
      particle[p].edges();
      particle[p].show();
    }
  fr.html(floor(frameRate()));

}