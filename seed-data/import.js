// MongoDB Data Import Script
// Run: node seed-data/import.js

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config();

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/news-portal';

// Define schemas (simple versions for seeding)
const categorySchema = new mongoose.Schema({
  name: String,
  slug: String,
  description: String,
  icon: String,
  order: Number,
  isActive: Boolean,
}, { timestamps: true });

const newsSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  content: String,
  excerpt: String,
  author: String,
  category: String,
  tags: [String],
  imageUrl: String,
  featured: Boolean,
  views: Number,
  publishedAt: Date,
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);
const News = mongoose.model('News', newsSchema);

// Import data function
async function importData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Delete existing data
    await Category.deleteMany({});
    await News.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Read JSON files
    const categories = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'categories.json'), 'utf-8')
    );
    const news = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'news.json'), 'utf-8')
    );

    // Insert categories
    await Category.insertMany(categories);
    console.log(`✅ Imported ${categories.length} categories`);

    // Insert news
    await News.insertMany(news);
    console.log(`✅ Imported ${news.length} news articles`);

    console.log('\n🎉 Data import completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error importing data:', error);
    process.exit(1);
  }
}

// Run import
importData();
