'user strict'

module.exports = function(app, redisStore) {
	
	var io 				 = require('socket.io')(app.server),
		passportSocketIo = require("passport.socketio"),
		cookieParser     = require('cookie-parser'),
		Room             = require('./models/room.js'),
		Message          = require('./models/message.js');


	io.use(passportSocketIo.authorize({
		cookieParser: cookieParser,
		store: 		  redisStore,
	  	key:          process.env.SESSION_SECRET || 'key',
	  	secret:       process.env.SESSION_KEY || 'secret'
	}));


	app.get('/chat/chat.js', function (req, res) {
  		res.sendFile(__dirname + '/chat.js');
	});

	app.get('/chat/chat.html', function (req, res) {
  		res.sendFile(__dirname + '/chat.html');
	});

	app.get('/chat/chat.css', function (req, res) {
  		res.sendFile(__dirname + '/chat.css');
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
		
		socket.emit('connected', {user: socket.request.user.username});

		socket.on('join', function(options, callback) {
			if (options.roomId && canAccesRoom(options.roomId)) {
				socket.join(options.roomId);
			} else if (!options.roomId) {
				var room = new Room({
					name: socket.request.user.username + " & " + options.others[0],
					participants: options.others,
					owners: socket.request.user.username 
				});
				room.save(function(err, room) {
					callback({id: room.id, name: room.name});
				});
			}
		})

		socket.on('newMsg', function(msg, callback) {
			msg.date = new Date();
			msg.sender = socket.request.user.username;
			io.to(msg.room).emit('newMsg', msg);			
			callback(null);
		})
	
	})

	function canAccesRoom(roomId) {
		return true;
	}

}