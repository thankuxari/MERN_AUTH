import express from 'express';
import router from './routers/auth.routers.js';
import connectToDB from './db/connectToDB.js';
import cookieParser from 'cookie-parser';
import colors from 'colors';
import cors from 'cors';

const PORT = process.env.PORT || 5000;
const app = express();

app.use(
	cors({
		origin: 'http://localhost:5173',
		credentials: true,
	})
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.listen(PORT, (req, res) => {
	connectToDB();
	console.log(`Server is running on port ${PORT}`.green.bold);
});
