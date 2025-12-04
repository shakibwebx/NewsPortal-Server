import mongoose from 'mongoose';
import { User } from './user.model';
import config from '../../../config';

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.database_url as string);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ username: 'admin' });

    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create default admin user
    const admin = await User.create({
      username: 'admin',
      email: 'admin@channeldo.com',
      password: 'admin123', // Will be hashed by the model
      role: 'admin',
      isActive: true,
    });

    console.log('✅ Admin user created successfully!');
    console.log('Username: admin');
    console.log('Password: admin123');
    console.log('⚠️  Please change the password after first login');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
