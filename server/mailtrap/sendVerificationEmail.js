import { sender, mailtrapClient } from './mailtrap.config.js';
import { VERIFICATION_EMAIL_TEMPLATE } from './email.template.js';
import colors from 'colors';
async function sendVerificationEmail(userEmail, verificationToken) {
	const recipient = [
		{
			email: userEmail,
		},
	];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: 'Verify Your Email',
			html: VERIFICATION_EMAIL_TEMPLATE.replace(
				'{verificationCode}',
				verificationToken
			),
			category: 'Verification Email',
		});
		console.log('Email was sent Succusfully'.green.bold);
	} catch (error) {
		console.error(error.message);
	}
}

export default sendVerificationEmail;
