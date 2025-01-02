import mongoose from 'mongoose';

const connectToMongoDB=async ()=> {
    try{
        mongoose.connect(process.env.MONGO_DB_URL);
        console.log("Connected to the mongoDB");
    }catch{
        console.log("Error in the connecting the Mongoose",error.message)
    };
};

export default connectToMongoDB;