import { MailtrapClient } from 'mailtrap';

const TOKEN = process.env.MAILTRAP_TOKEN;

const mailtrapClient = new MailtrapClient({
	token: TOKEN,
});

const sender = {
	email: 'hello@demomailtrap.com',
	name: 'Authentication_MERN',
};

export { mailtrapClient, sender };
