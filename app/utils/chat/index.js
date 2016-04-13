'user strict'

module.exports = function(app) {
	
	var io = require('socket.io')(app.server);
	
	app.get('/chat', function (req, res) {
  		res.sendFile(__dirname + '/index.html');
	});

	app.get('/chat/chat.js', function (req, res) {
  		res.sendFile(__dirname + '/chat.js');
	});

	io.sockets.on('connection', function(socket) {

		console.log("New user");

		socket.on('newMsg', function(msg, callback) {
			msg.date = new Date();
			io.sockets.emit('newMsg', msg);
			callback(null);
		})
	
	})

}