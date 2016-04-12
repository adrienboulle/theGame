'user strict'

module.exports = function(app) {
	
	var io = require('socket.io')(app.server);
	
	app.get('/chat', function (req, res) {
  		res.sendfile(__dirname + '/index.html');
	});
}