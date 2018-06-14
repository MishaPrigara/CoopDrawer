/*
TODO list:
- add init data after login
- don't forget to delete user after disconection
- find out how to set to data to users of the same group
hope i'll do it

*/
var socket;
var r = 30;
var fr = 120;
var locked = false;
var prevMouseX = -1;
var prevMouseY = -1;
var user = new User();


function login() {
	user.login();
	socket.emit('checkLogin', user);
}

function processLogin(ok) {
	if(!ok) {
		local.reload();
	}
	user.deleteLogin();
	background(15);
	socket.emit('getData', user.getGroupName());
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function setup() {
	console.log(frameRate());
	frameRate(fr);
	createCanvas(windowWidth, windowHeight);
	background(160, 169, 204);

	console.log(frameRate());

	socket = io.connect('http://localhost:3000/');
	socket.on('mouse', newDrawing);
	socket.on('init', initDrawing);
	socket.on('checkedLogin', processLogin);
}

function initDrawing(dataArr) {
	if(!user.isLogged()) return;
	document.getElementById('Size').innerHTML = "Size: 30";
	for(var i = 0; i < dataArr.length; ++i) {
		newDrawing(dataArr[i]);
	}
}

function newDrawing(data) {
	if(!user.isLogged()) return;
	// noStroke();
	strokeWeight(data.r);
	// fill(255, 0, 100);
	colorMode(RGB, 100);
	stroke(data.color_x, data.color_y, 100);

	line(data.px * windowWidth, data.py * windowHeight,
					data.x * windowWidth, data.y * windowHeight);
}

function mouseWheel(event) {
	if(!user.isLogged()) return;
	this.r -= event.delta / 20;
	this.r = max(this.r, 0);
	document.getElementById('Size').innerHTML = "Size: " + this.r;
}

function mousePressed() {
	if(!user.isLogged()) return;
	//console.log(mouseX + "," + mouseY);
	locked = true;
}

function mouseReleased() {
	if(!user.isLogged()) return;
	locked = false;
	prevMouseX = -1;
}

function draw() {
	if(!user.isLogged()) return;
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
