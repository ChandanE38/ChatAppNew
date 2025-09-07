import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/user.model.js';

dotenv.config();

console.log('🧹 Starting database cleanup...');
console.log('📋 Target fields to remove: "name" and "profile"');

try {
  await mongoose.connect(process.env.MONGO_DB_URI);
  console.log('✅ Successfully connected to MongoDB');
  
  // Check current state before cleanup
  const totalUsers = await User.countDocuments();
  console.log(`📊 Total users in database: ${totalUsers}`);
  
  // Find users with name or profile fields
  const usersWithNameField = await User.countDocuments({ name: { $exists: true } });
  const usersWithProfileField = await User.countDocuments({ profile: { $exists: true } });
  
  console.log(`🔍 Users with "name" field: ${usersWithNameField}`);
  console.log(`🔍 Users with "profile" field: ${usersWithProfileField}`);
  
  if (usersWithNameField === 0 && usersWithProfileField === 0) {
    console.log('✨ Database is already clean! No fields to remove.');
    process.exit(0);
  }
  
  // Show sample data before cleanup
  const sampleUser = await User.findOne({ 
    $or: [
      { name: { $exists: true } },
      { profile: { $exists: true } }
    ]
  }).select('fullName username name profile profilePic').lean();
  
  if (sampleUser) {
    console.log('👤 Sample user before cleanup:', JSON.stringify(sampleUser, null, 2));
  }
  
  // Remove the "name" and "profile" fields from all users
  console.log('\n🚀 Starting field removal...');
  
  const result = await User.updateMany(
    {},
    { 
      $unset: { 
        name: "",
        profile: ""
      }
    }
  );
  
  console.log(`✅ Updated ${result.modifiedCount} users`);
  
  // Verify cleanup
  const usersWithNameFieldAfter = await User.countDocuments({ name: { $exists: true } });
  const usersWithProfileFieldAfter = await User.countDocuments({ profile: { $exists: true } });
  
  console.log('\n📋 Cleanup Results:');
  console.log(`🔍 Users with "name" field after cleanup: ${usersWithNameFieldAfter}`);
  console.log(`🔍 Users with "profile" field after cleanup: ${usersWithProfileFieldAfter}`);
  
  // Show sample data after cleanup
  const sampleUserAfter = await User.findOne().select('fullName username profilePic gender').lean();
  if (sampleUserAfter) {
    console.log('👤 Sample user after cleanup:', JSON.stringify(sampleUserAfter, null, 2));
  }
  
  if (usersWithNameFieldAfter === 0 && usersWithProfileFieldAfter === 0) {
    console.log('\n🎉 Database cleanup completed successfully!');
    console.log('✨ All "name" and "profile" fields have been removed.');
  } else {
    console.log('\n⚠️ Some fields may still exist. Manual verification recommended.');
  }
  
  mongoose.connection.close();
  console.log('🔌 Database connection closed');
  
} catch (error) {
  console.error('❌ Database cleanup failed:', error.message);
  process.exit(1);
}