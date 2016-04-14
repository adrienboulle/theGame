'user strict'

module.exports = function(app) {
	
	var io = require('socket.io')(app.server);
	
	app.get('/chat', function (req, res) {
  		res.sendFile(__dirname + '/index.html');
	});

	app.get('/chat/index.css', function (req, res) {
  		res.sendFile(__dirname + '/index.css');
	})

	app.get('/chat/jquery.js', function (req, res) {
  		res.sendFile(__dirname + '/imports/jquery-2.2.2.min.js');
	})

	app.get('/chat/mCustomScrollbar.js', function (req, res) {
  		res.sendFile(__dirname + '/imports/jquery.mCustomScrollbar.concat.min.js');
	})

	app.get('/chat/mCustomScrollbar.css', function (req, res) {
  		res.sendFile(__dirname + '/imports/jquery.mCustomScrollbar.min.css');
	})


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