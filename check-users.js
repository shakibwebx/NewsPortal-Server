const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://habiburwebx_db_user:LVIqxvHgB8yvXbzZ@cluster0.yzcca8z.mongodb.net/ChannelDO?retryWrites=true&w=majority';

async function checkUsers() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const users = await mongoose.connection.db.collection('users').find({}).toArray();

    console.log(`Found ${users.length} users:\n`);
    users.forEach((user, index) => {
      console.log(`${index + 1}. Username: ${user.username}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Active: ${user.isActive}`);
      console.log('');
    });

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkUsers();
