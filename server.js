var express = require('express');
var saved = [];
var app = express();
var server = app.listen(3000);

app.use(express.static('public'));


var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
	console.log("New connection: " + socket.id);
	socket.emit('init', saved);
	socket.on('mouse', mouseMsg);

	function mouseMsg(data) {
		saved.push(data);
		socket.broadcast.emit('mouse', data);
	}
}
