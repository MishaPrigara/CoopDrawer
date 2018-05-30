function setup() {
	createCanvas(windowWidth, windowHeight);
	background(51);
}

function draw() {
	noStroke();
	fill(255);
	ellipse(mouseX, mouseY, 60, 60);
}
