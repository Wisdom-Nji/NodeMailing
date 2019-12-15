const nodemailer = require('nodemailer');
const path = 'credentials.env";
require('dotenv').config({path: path.toString()})

var sendingEmail = "sample_sending_email@gmail.com";
var sendingEmailPassword = "sendingEmailPassword";
var receivingEmail = "sample_receiving_email@mail.com";
var mailSubject = "Hello world";
var text = "Hello world";


var transporter = nodemailer.createTransport({
	server: mailingServer,
	auth: {
		user : sendingEmail,
		pass : sendingEmailPassword
	}
});


var mailOptions = {
	from : sendingEmail,
	to : receivingEmails,
	subject : mailSubject,
	text : text
};

transporter.sendMail( mailOptions, function(error, info) {
	if( error) {
		console.log( error );
	}
	else {
		console.log("Email sent: " + info.response);
	}
});
