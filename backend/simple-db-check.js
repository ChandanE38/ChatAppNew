import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const MONGO_URI = process.env.MONGO_DB_URL;

console.log('🔍 Testing MongoDB connection and profile fields...');
console.log('MongoDB URI found:', MONGO_URI ? 'Yes' : 'No');

try {
  await mongoose.connect(MONGO_URI);
  console.log('✅ Successfully connected to MongoDB');
  
  // Import User model
  const { default: User } = await import('./models/user.model.js');
  
  const userCount = await User.countDocuments();
  console.log('📊 Total users in database:', userCount);
  
  if (userCount > 0) {
    // Check for users with profile pictures
    const usersWithProfilePics = await User.find({
      profilePic: { $exists: true, $ne: "" }
    }).select('fullName username profilePic gender').lean();
    
    console.log('🖼️ Users with profile pictures:', usersWithProfilePics.length);
    
    if (usersWithProfilePics.length > 0) {
      console.log('👤 Sample user with profile pic:');
      console.log(JSON.stringify(usersWithProfilePics[0], null, 2));
    }
    
    // Check if obsolete fields still exist
    const usersWithNameField = await User.countDocuments({ name: { $exists: true } });
    const usersWithProfileField = await User.countDocuments({ profile: { $exists: true } });
    
    console.log('\n🧹 Field cleanup status:');
    console.log(`Users with "name" field: ${usersWithNameField}`);
    console.log(`Users with "profile" field: ${usersWithProfileField}`);
    
    if (usersWithNameField > 0 || usersWithProfileField > 0) {
      console.log('\n🔧 Cleaning up obsolete fields...');
      const result = await User.updateMany(
        {},
        { 
          $unset: { 
            name: "",
            profile: ""
          }
        }
      );
      console.log(`✅ Cleaned ${result.modifiedCount} users`);
    } else {
      console.log('✨ Database is already clean!');
    }
  }
  
  await mongoose.connection.close();
  console.log('🔌 Database connection closed');
  
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}