const nodemailer = require('nodemailer');
const path = 'credentials.env";
require('dotenv').config({path: path.toString()})

var sendingEmail = process.env.EMAIL;
var sendingEmailPassword = process.env.PASSWORD;
var receivingEmail = "wisdomnji@gmail.com"; //TODO: Move this to a file read into a map <name:email>
var mailSubject = "Learning NodejsMailer"; //TODO: Pass this as argument
var text = "Hello world"; //TODO: Move this to a file read into an an array


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
