const nodemailer = require('nodemailer');
const path = "credentials.env";
require('dotenv').config({ path: path.toString() })
const fs = require('fs');


var sendingEmail = process.env.EMAIL;
var sendingEmailPassword = process.env.PASSWORD;
var mailingServer = process.env.MAILSERVER;
var name = process.env.NAME;
var receivingEmails = ""; //TODO: Move this to a file read into a map <name:email>
var mailSubject = ""; //TODO: Pass this as argument

//Read args
for( let i=0;i<process.argv.length;++i ) {
	let arg = process.argv[i];
	if(arg == "--subject" ) {
		mailSubject = process.argv[i+1];
		++i;
	}

	else if( arg == "--mailing_list") {
		receivingEmails = fs.readFileSync( process.argv[i+1] ).toString();
		receivingEmails = receivingEmails.split('\n');
		++i;
	}
}

//TODO: put some checks here before proceeding

var html = fs.readFileSync('devfest/devfest-email/index.html').toString(); //TODO: change this to file, so any HTML template can be dynamically added and changed

//custom code

console.log(sendingEmail);
console.log(sendingEmailPassword);
console.log(mailingServer);
console.log(receivingEmails);
console.log(mailSubject);
console.log(name);
console.log();

var transporter = nodemailer.createTransport({
	host: mailingServer,
	debug : true,
	port : 465,
	secure : true,
	auth: {
		user : sendingEmail,
		pass : sendingEmailPassword
	}
});


for( let i in receivingEmails ) {
	if( receivingEmails[i].length < 1) continue;
	var memberDetails = receivingEmails[i].split(':');
	var membersName = memberDetails[0];
	var membersEmail = memberDetails[1];
	
	if( membersEmail.length < 1 ) continue;

	console.log("=> Sending Email to=> %s:%s", membersName, membersEmail);

	html = html.replace("_____members_name_goes_here_____", membersName);
	var mailOptions = {
		from : `"${name}" <${sendingEmail}>`,
		to : membersEmail,
		subject : mailSubject,
		html : html,
		attachments : [{
			filename : 'devfest19.png',
			path : 'devfest/devfest-email/images/devfest19.png',
			cid : sendingEmail + "_devfest19.png"
		},
		{
			filename : 'gdc.png',
			path : 'devfest/devfest-email/images/gdc.png',
			cid : sendingEmail + "_gdc.png"
		}]
	};

	/*
	transporter.sendMail( mailOptions, function(error, info) {
		if( error) {
			console.log( error );
		}
		else {
			console.log("Email sent: " + info.response);
		}
	});
	*/

}
