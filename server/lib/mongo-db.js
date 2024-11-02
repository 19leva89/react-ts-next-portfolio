import { MongoClient } from 'mongodb'

export const connectToDatabase = async () => {
	const client = new MongoClient(process.env.DATABASE_URL);

	try {
		await client.connect();
		console.log('Connected to MongoDB');
		return client.db();
	} catch (error) {
		console.error('Error connecting to MongoDB:', error);
		throw error;
	}
}