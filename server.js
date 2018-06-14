var express = require('express');
var saved = {};
var pass = {};
var app = express();
var server = app.listen(3000);
// var SOCKETS = {};

app.use(express.static('public'));


var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);



function newConnection(socket) {
	// socket.loged = false;
	// SOCKETS[socket.id] = socket;
	socket.on('checkLogin', checkLogin);

	function checkLogin(user) {
		if(!pass[user.getGroupName()] || pass[user.getGroupName()] == user.getPass()) {
			pass[user.getGroupName()] = user.getPass();
			users[user.getGroupName()].push(socket.id);
			return true;
		}
		return false;
	}

	socket.on('getData', sendData);

	function sendData(groupName) {

	}

	socket.on('mouse', mouseMsg);

	function mouseMsg(data) {
		saved.push(data);
		socket.broadcast.emit('mouse', data);
	}
}
