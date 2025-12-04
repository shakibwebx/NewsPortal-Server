const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const readline = require('readline');
require('dotenv').config();

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Prompt function
const prompt = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

// User Schema (matching your model exactly)
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true, select: false },
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

async function createAdmin() {
  try {
    // Get MongoDB URI from .env file
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
      console.error('❌ Error: MONGODB_URI not found in .env file!');
      process.exit(1);
    }

    console.log('Connecting to MongoDB...');
    console.log('URI:', MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@')); // Hide password in log
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB!\n');

    // Get user input
    const username = await prompt('Enter username: ');
    const email = await prompt('Enter email: ');
    const password = await prompt('Enter password (min 6 characters): ');
    const roleInput = await prompt('Enter role (admin/editor) [default: admin]: ');
    const role = roleInput.trim() || 'admin';

    // Validate inputs
    if (!username || !email || !password) {
      console.error('\n❌ Error: All fields are required!');
      process.exit(1);
    }

    if (password.length < 6) {
      console.error('\n❌ Error: Password must be at least 6 characters!');
      process.exit(1);
    }

    if (!['admin', 'editor'].includes(role)) {
      console.error('\n❌ Error: Role must be either "admin" or "editor"!');
      process.exit(1);
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      console.error('\n❌ Error: User with this username or email already exists!');
      process.exit(1);
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password,
      role,
      isActive: true
    });

    console.log('\n✅ User created successfully!');
    console.log('━'.repeat(50));
    console.log(`👤 Username: ${user.username}`);
    console.log(`📧 Email: ${user.email}`);
    console.log(`🔑 Role: ${user.role}`);
    console.log(`✓ Active: ${user.isActive}`);
    console.log('━'.repeat(50));
    console.log('\n✨ You can now login with these credentials!\n');

  } catch (error) {
    console.error('\n❌ Error creating user:', error.message);
    process.exit(1);
  } finally {
    rl.close();
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  }
}

// Run the script
createAdmin();
