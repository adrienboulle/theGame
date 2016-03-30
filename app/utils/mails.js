'user strict'

var nodemailer = require('nodemailer'),
	config = require('./../../config.js');

var Role = function() {
	
	this.smtpConfig = {
		host: config.mail.smtp,
		port: 465,
		secure: true,
		auth: {
			user: config.mail.adress,
			pass: config.mail.passwd
		}
	};
	
	this.transporter = nodemailer.createTransport(this.smtpConfig);

	this.sendMail = function(mail, callback) {
		this.transporter.sendMail(mail, function(err, info){
			if (err) console.log(err);
			callback(err, info);
		});
	}
}

module.exports = new Role();