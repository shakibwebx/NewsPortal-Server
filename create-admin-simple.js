const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

// User Schema (matching your model exactly)
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'editor'], default: 'editor' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model('User', userSchema);

async function createAdmin(username, email, password, role = 'admin') {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
      console.error('❌ Error: MONGODB_URI not found in .env file!');
      process.exit(1);
    }

    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB!\n');

    // Validate inputs
    if (!username || !email || !password) {
      console.error('❌ Error: All fields are required!');
      console.log('\nUsage: node create-admin-simple.js <username> <email> <password> [role]');
      console.log('Example: node create-admin-simple.js admin admin@example.com password123 admin');
      process.exit(1);
    }

    if (password.length < 6) {
      console.error('❌ Error: Password must be at least 6 characters!');
      process.exit(1);
    }

    if (!['admin', 'editor'].includes(role)) {
      console.error('❌ Error: Role must be either "admin" or "editor"!');
      process.exit(1);
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      console.error('❌ Error: User with this username or email already exists!');
      console.log('\nExisting user details:');
      console.log('Username:', existingUser.username);
      console.log('Email:', existingUser.email);
      console.log('Role:', existingUser.role);
      process.exit(1);
    }

    // Create user
    console.log('👤 Creating user...');
    const user = await User.create({
      username: username.trim(),
      email: email.trim(),
      password,
      role,
      isActive: true
    });

    console.log('\n✅ User created successfully!');
    console.log('━'.repeat(60));
    console.log('👤 Username:', user.username);
    console.log('📧 Email:', user.email);
    console.log('🔑 Role:', user.role);
    console.log('✓ Active:', user.isActive);
    console.log('🆔 User ID:', user._id);
    console.log('📅 Created:', user.createdAt);
    console.log('━'.repeat(60));
    console.log('\n✨ You can now login with these credentials!\n');

    // Verify the user was actually saved
    const savedUser = await User.findById(user._id);
    if (savedUser) {
      console.log('✅ Verified: User exists in database');
    } else {
      console.log('⚠️  Warning: User may not have been saved properly');
    }

  } catch (error) {
    console.error('\n❌ Error creating user:', error.message);
    if (error.code === 11000) {
      console.log('\n💡 This usually means a user with this username or email already exists.');
    }
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB.');
  }
}

// Get arguments from command line
const args = process.argv.slice(2);
const [username, email, password, role = 'admin'] = args;

createAdmin(username, email, password, role);
