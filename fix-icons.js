const mongoose = require('mongoose');
require('dotenv').config();

async function removeIcons() {
  try {
    const mongoUri = process.env.DATABASE_URL || 'mongodb://localhost:27017/news-portal';

    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    const db = mongoose.connection.db;

    // Try different collection names
    const collections = await db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));

    // Find the categories collection
    const categoryCollection = collections.find(c => c.name.toLowerCase().includes('categor'));

    if (categoryCollection) {
      console.log(`Found collection: ${categoryCollection.name}`);

      // Update directly using the collection
      const result = await db.collection(categoryCollection.name).updateMany(
        {},
        { $set: { icon: '' } }
      );

      console.log(`Updated ${result.modifiedCount} documents`);

      // Show updated categories
      const updatedCategories = await db.collection(categoryCollection.name).find({}).toArray();
      console.log('\nUpdated categories:');
      updatedCategories.forEach((cat, index) => {
        console.log(`${index + 1}. ${cat.name} - icon: "${cat.icon}"`);
      });
    } else {
      console.log('No category collection found');
    }

    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

removeIcons();
