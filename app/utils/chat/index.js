'user strict'

module.exports = function(app, redisStore) {
	
	var io 				 = require('socket.io')(app.server),
		passportSocketIo = require("passport.socketio"),
		cookieParser     = require('cookie-parser');

	io.use(passportSocketIo.authorize({
		cookieParser: cookieParser,
		store: 		  redisStore,
	  	key:          process.env.SESSION_SECRET || 'key',
	  	secret:       process.env.SESSION_KEY || 'secret'
	}));


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

		console.log("New user : " + socket.request.user.username);

		socket.on('join', function(options) {
			if (options.room && canAccesRoom(options.room)) {
				socket.join(options.room);
			}
		})

		socket.on('newMsg', function(msg, callback) {
			msg.date = new Date();
			io.to(msg.room).emit('newMsg', msg);
			callback(null);
		})
	
	})

	function canAccesRoom(room) {
		return true;
	}

}