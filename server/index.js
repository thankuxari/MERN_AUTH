import express from 'express';
import router from './routers/auth.router.js';
import colors from 'colors';

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.use('/', router);

app.listen(PORT, (req, res) => {
	try {
		console.log(`Server Is Running On Port ${PORT}`.green.bold);
	} catch (error) {
		console.error(error).red.bold;
	}
});
