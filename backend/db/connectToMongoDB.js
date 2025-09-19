import mongoose from 'mongoose';

const connectToMongoDB=async ()=> {
    try{
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("Connected to the mongoDB");
    }catch(error){
        console.log("Error in the connecting the Mongoose",error.message)
    };
};

export default connectToMongoDB;