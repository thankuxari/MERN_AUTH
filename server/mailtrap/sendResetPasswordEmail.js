import { sender, mailtrapClient } from './mailtrap.config.js';
import { PASSWORD_RESET_REQUEST_TEMPLATE } from './email.template.js';
import colors from 'colors';
async function sendResetPasswordEmail(userEmail, resetURL) {
	const recipient = [
		{
			email: userEmail,
		},
	];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: 'Reset Your Password',
			html: PASSWORD_RESET_REQUEST_TEMPLATE.replace(
				'{resetURL}',
				resetURL
			),
			category: 'Reset Password Email',
		});
		console.log('Reset Email was sent Succusfully'.green.bold);
	} catch (error) {
		console.error(error.message);
	}
}

export default sendResetPasswordEmail;
