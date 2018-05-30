var socket;
var r = 30;
var fr = 120;
var locked = false;

function setup() {
	console.log(frameRate());
	frameRate(fr);
	createCanvas(windowWidth, windowHeight);
	background(51);

	console.log(frameRate());

	socket = io.connect('http://10.89.100.54:3000/');
	socket.on('mouse', newDrawing);
}

function newDrawing(data) {
	noStroke();
	fill(255, 0, 100);
	ellipse(data.x, data.y, data.r, data.r);
}

function mouseWheel(event) {
	this.r -= event.delta / 20;
	document.getElementById('Size').innerHTML = "Size: " + this.r;
}

function mousePressed() {
	//console.log(mouseX + "," + mouseY);
	locked = true;
}

function mouseReleased() {
	locked = false;
}

function draw() {
	if(locked) {
		var data = {
			x: mouseX,
			y: mouseY,
			r: this.r
		};

		socket.emit('mouse', data);
		noStroke();
		fill(255);
		ellipse(mouseX, mouseY, this.r, this.r);
	}
}
