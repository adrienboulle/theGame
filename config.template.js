'user strict'

var config = {};

config.host = 'localhost';
config.port = 8085;

config.redis = {
	host: 'localhost',
	port: 8086,
}

config.mail = {
	smtp: 'smtp.gmail.com',
	adress: 'user@gmail.com',
	passwd: 'pass'
}

module.exports = config;