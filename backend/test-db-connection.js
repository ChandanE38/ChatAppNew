import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/user.model.js';

dotenv.config();

console.log('🔍 Testing MongoDB connection...');
console.log('MongoDB URI:', process.env.MONGO_DB_URI ? 'Present' : 'Missing');

try {
  await mongoose.connect(process.env.MONGO_DB_URI);
  console.log('✅ Successfully connected to MongoDB');
  
  // Test if User collection exists and get sample data
  const userCount = await User.countDocuments();
  console.log('📊 Total users in database:', userCount);
  
  if (userCount > 0) {
    const sampleUser = await User.findOne().select('fullName username gender profilePic profile').lean();
    console.log('👤 Sample user data:', JSON.stringify(sampleUser, null, 2));
    
    // Check if there are any users with profile pictures
    const usersWithProfilePics = await User.find({
      $or: [
        { profilePic: { $exists: true, $ne: "" } },
        { profile: { $exists: true, $ne: "" } }
      ]
    }).select('fullName username profilePic profile').lean();
    
    console.log('🖼️ Users with profile pictures:', usersWithProfilePics.length);
    if (usersWithProfilePics.length > 0) {
      console.log('📸 Sample user with profile pic:', JSON.stringify(usersWithProfilePics[0], null, 2));
    }
  }
  
  mongoose.connection.close();
  console.log('🔌 Database connection closed');
} catch (error) {
  console.error('❌ MongoDB connection failed:', error.message);
  process.exit(1);
}