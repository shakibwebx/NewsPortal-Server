import mongoose from 'mongoose';
import app from '../src/app';
import config from '../src/config';

// Cache the database connection
let cachedConnection: typeof mongoose | null = null;

async function connectToDatabase() {
  // If we have a cached connection, check if it's still valid
  if (cachedConnection && mongoose.connection.readyState === 1) {
    console.log('✅ Using cached MongoDB connection');
    return cachedConnection;
  }

  try {
    console.log('🔄 Connecting to MongoDB...');

    // Connect with additional options for serverless
    const connection = await mongoose.connect(config.database_url as string, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    cachedConnection = connection;
    console.log('✅ MongoDB connected successfully');
    return connection;
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error);
    cachedConnection = null;
    throw error;
  }
}

// Vercel Serverless Function Handler
export default async function handler(req: any, res: any) {
  try {
    // Connect to database
    await connectToDatabase();

    // Handle the request with Express app
    return app(req, res);
  } catch (error) {
    console.error('❌ Handler error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
