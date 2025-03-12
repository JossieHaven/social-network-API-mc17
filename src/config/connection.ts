import mongoose from 'mongoose';


// Function to establish a connection to the MongoDB database

const db = async (): Promise<typeof mongoose.connection> => {
    try {
        // Connect to MongoDB using the provided URI or fallback to local database
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialsDB');

        console.log('Database connected.'); 

        return mongoose.connection; 
    } catch (error) {
        console.error('Database connection error:', error); 
        throw new Error('Database connection failed.'); 
    }
}

export default db;
