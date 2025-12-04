const mongoose = require('mongoose');
require('dotenv').config();

const CategorySchema = new mongoose.Schema({
  name: String,
  slug: String,
  description: String,
  icon: String,
  order: Number,
  isActive: Boolean,
}, {
  timestamps: true,
});

const Category = mongoose.model('Category', CategorySchema);

async function removeIcons() {
  try {
    const mongoUri = process.env.DATABASE_URL || 'mongodb://localhost:27017/news-portal';

    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Update all categories to remove icon
    const result = await Category.updateMany(
      {},
      { $set: { icon: '' } }
    );

    console.log(`Updated ${result.modifiedCount} categories`);
    console.log('Icons removed successfully!');

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

removeIcons();
