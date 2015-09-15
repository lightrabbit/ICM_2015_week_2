var mushroom = [];
var mouseRange = 100;
function setup() {
	createCanvas(900, 600);
  mouseRange = random(100, 300);
	for (var i = 0; i < 20; i++) {
		mushroom.push(new circle(900/20*i + 25, 300, random(10,50)));
	}

}

function draw() {
  clear();
  background('black');
	for (var i = 0; i < mushroom.length; i++) {

		mushroom[i].draw();
	}

}

function circle(x, y, diameter) {
  this.origin = createVector(x,y);
  this.pos = createVector(x,y);
  
  var high = color(255,0,0)
  var mid = color(0,255,0);
  var low = color(0,0,255);
  
  var lastTime = millis();
  var lastY = y;
  
  var t = 0;
  
  this.draw = function() {
    //update
    var mouse = createVector(mouseX, mouseY);
    var diff = p5.Vector.sub(mouse, this.pos);
    if (diff.mag() < mouseRange) {
      if (this.pos.y < mouseY) {
        this.pos.y = mouseY - Math.sqrt(mouseRange * mouseRange - diff.x * diff.x) - 2;
      } else {
        this.pos.y = mouseY + Math.sqrt(mouseRange * mouseRange - diff.x * diff.x) + 2;
      }
      lastY = this.pos.y;
      lastTime = millis();
      t = 0;
    } else if (t < 20000) {
      t = millis() - lastTime;
      var yDiff = lastY - this.origin.y;
      this.pos.y = this.origin.y + yDiff * cos(t / 10 / diameter * PI) * pow(0.5, t / 40 / diameter);
    }
    //draw
    var color;
    if (this.pos.y > this.origin.y) {
      color = lerpColor(mid, low, abs(this.pos.y - this.origin.y) / height * 2);
    } else {
      color = lerpColor(mid, high, abs(this.pos.y - this.origin.y) / height * 2);
    }
    fill(color);
    stroke(color);
    ellipse(this.pos.x, this.pos.y, diameter, diameter);
    line(this.pos.x, this.pos.y, this.pos.x, height);
  }
}
