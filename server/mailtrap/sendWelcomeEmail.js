import { sender, mailtrapClient } from './mailtrap.config.js';
import { WELCOME_EMAIL_TEMPLATE } from './email.template.js';
import colors from 'colors';

async function sendWelcomeEmail(userEmail, username) {
	const recipient = [
		{
			email: userEmail,
		},
	];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: `Welcome ${username} to Authentication MERN`,
			html: WELCOME_EMAIL_TEMPLATE.replace('{username}', username),
			category: 'Welcome Email',
		});
		console.log('Email was sent Succusfully'.green.bold);
	} catch (error) {
		console.error(error.message);
	}
}

export default sendWelcomeEmail;
