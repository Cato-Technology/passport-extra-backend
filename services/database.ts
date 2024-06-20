import mongoose, { ConnectOptions } from 'mongoose';
import { env } from './config';

const MONGODB_URI = env.MONGODB_URI || 'mongodb://localhost:27017/passportextra';

const connectToDatabase = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {

        } as ConnectOptions);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        throw err;
    }
};

export default connectToDatabase;
