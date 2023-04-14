
import mongoose, { mongo } from 'mongoose';

export const dbConnection = async () => {
    try {
        if(!process.env.MONGODB_URI){
            throw new Error('ERROR[.env]: There is a problem reading "MONGODB_URI" from .env')
        }
        
        mongoose.set('strictQuery', true);
        mongoose.connect(process.env.MONGODB_URI)

        console.log('Database online');
    } catch (error) {
        console.error('ERROR[Database]: Error connecting to the MongoDB database');
        console.log(error);
    }
}

