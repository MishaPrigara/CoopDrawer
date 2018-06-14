var socket;
var r = 30;
var fr = 120;
var locked = false;
var prevMouseX = -1;
var prevMouseY = -1;

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function setup() {
	console.log(frameRate());
	frameRate(fr);
	createCanvas(windowWidth, windowHeight);
	background(51);

	console.log(frameRate());

	socket = io.connect('http://localhost:3000/');
	socket.on('mouse', newDrawing);
	socket.on('init', initDrawing);
}

function initDrawing(dataArr) {
	for(var i = 0; i < dataArr.length; ++i) {
		newDrawing(dataArr[i]);
	}
}

function newDrawing(data) {
	// noStroke();
	strokeWeight(data.r);
	// fill(255, 0, 100);
	colorMode(RGB, 100);
	stroke(data.color_x, data.color_y, 100);

	line(data.px * windowWidth, data.py * windowHeight,
					data.x * windowWidth, data.y * windowHeight);
}

function mouseWheel(event) {
	this.r -= event.delta / 20;
	this.r = max(this.r, 0);
	document.getElementById('Size').innerHTML = "Size: " + this.r;
}

function mousePressed() {
	//console.log(mouseX + "," + mouseY);
	locked = true;
}

function mouseReleased() {
	locked = false;
	prevMouseX = -1;
}

function draw() {
	if(locked) {

		if(prevMouseX != -1) {

			var x = mouseX;
			var y = mouseY;
			var color_x = getRandomInt(255);
			var color_y = getRandomInt(255);
			var data = {
				px: prevMouseX / windowWidth,
				py: prevMouseY / windowHeight,
				x: x / windowWidth,
				y: y / windowHeight,
				r: this.r,
				color_x: color_x,
				color_y: color_y
			};

			socket.emit('mouse', data);
			strokeWeight(this.r);
			// fill(255, 0, 100);
			colorMode(RGB, 100);
			stroke(color_x, color_y, 100);

			line(prevMouseX, prevMouseY, x, y);
			prevMouseX = x;
			prevMouseY = y;
		} else {
			prevMouseX = mouseX;
			prevMouseY = mouseY;
		}
	}
}
