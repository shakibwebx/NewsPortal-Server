const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://habiburwebx_db_user:LVIqxvHgB8yvXbzZ@cluster0.yzcca8z.mongodb.net/ChannelDO?retryWrites=true&w=majority';
const NEW_PASSWORD_HASH = '$2b$10$./zLp3jbtQePfyvvXPnmx.of9m2ZN3k7H8tNqx1VALkZLZotoxZgG';

async function updatePassword() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // First check current password
    const user = await mongoose.connection.db.collection('users').findOne({ username: 'admin' });
    console.log('Current password hash:', user?.password?.substring(0, 20) + '...');

    const result = await mongoose.connection.db.collection('users').updateOne(
      { username: 'admin' },
      { $set: { password: NEW_PASSWORD_HASH } }
    );

    console.log('Update result:', result);

    if (result.matchedCount > 0) {
      console.log('\n✅ Password updated successfully!');
      console.log('Username: admin');
      console.log('Password: ChannelDO@2025!Secure');
      console.log('\nYou can now login with these credentials.');
    } else {
      console.log('❌ Admin user not found');
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

updatePassword();
