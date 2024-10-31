import mongoose from 'mongoose';
import colors from 'colors';

const MONGO_URI = process.env.MONGO_URI;

async function connectToDB() {
	try {
		await mongoose.connect(MONGO_URI);
		console.log('Connection With Database Succesfull'.green.bold);
	} catch (error) {
		console.error(
			'Connection With Database Unsuccesfull : '.red.bold,
			error.message
		);
		process.exit(1); //Failure
	}
}

export default connectToDB;
