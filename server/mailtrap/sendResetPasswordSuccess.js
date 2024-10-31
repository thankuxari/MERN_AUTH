import { sender, mailtrapClient } from './mailtrap.config.js';
import { PASSWORD_RESET_SUCCESS_TEMPLATE } from './email.template.js';
import colors from 'colors';

async function sendResetPasswordSuccessEmail(userEmail) {
	const recipient = [
		{
			email: userEmail,
		},
	];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: 'Your password was reseted successfully',
			html: PASSWORD_RESET_SUCCESS_TEMPLATE,
			category: 'Reset Password Email',
		});
		console.error('Reset Email was sent Succusfully'.green.bold);
	} catch (error) {
		console.error(error.message);
	}
}

export default sendResetPasswordSuccessEmail;
