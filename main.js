const nodemailer = require('nodemailer');
const path = "credentials.env";
require('dotenv').config({ path: path.toString() })

var sendingEmail = process.env.EMAIL;
var sendingEmailPassword = process.env.PASSWORD;
var mailingServer = process.env.MAILSERVER;
var receivingEmails = "wisdomnji@gmail.com"; //TODO: Move this to a file read into a map <name:email>
var mailSubject = "Learning NodejsMailer"; //TODO: Pass this as argument
var text = "Hello world"; //TODO: Move this to a file read into an an array

console.log(sendingEmail);
console.log(sendingEmailPassword);
console.log(mailingServer);
console.log(receivingEmails);
console.log(mailSubject);

var transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	debug : true,
	port : 465,
	secure : true,
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
