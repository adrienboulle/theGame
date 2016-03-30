'user strict'

var nodemailer = require('nodemailer');

var Mail = function() {
    
    this.smtpConfig = {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'adri1.boulle@gmail.com',
            pass: '123;321'
        }
    };

    this.transporter = nodemailer.createTransport(this.smtpConfig);

    this.sendMail = function(mailOptions, callback) {
        this.transporter.sendMail(mailOptions, function(err, info){
            callback(err, info);
        });
    }

}

module.exports = new Mail();
