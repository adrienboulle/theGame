'user strict'

var nodemailer = require('nodemailer');

var Role = function(config) {
	
	this.smtpConfig = {
		host: config.mail.smtp,
		port: 465,
		secure: true,
		auth: {
			user: config.mail.adress,
			pass: config.mail.passwd
		}
	};
	
	this.transporter = nodemailer.createTransport(smtpConfig);

	this.sendMail(mail, callback) {
		transporter.sendMail(mail, function(err, info){
			callback(err, info);
		});
	}
}

module.exports = new Role();