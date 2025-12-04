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

async function checkCategories() {
  try {
    const mongoUri = process.env.DATABASE_URL || 'mongodb://localhost:27017/news-portal';

    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Get all categories
    const categories = await Category.find({});
    console.log(`Found ${categories.length} categories`);

    categories.forEach((cat, index) => {
      console.log(`${index + 1}. ${cat.name} - icon: "${cat.icon}"`);
    });

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkCategories();
