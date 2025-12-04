import mongoose from 'mongoose';
import app from '../src/app';
import config from '../src/config';

let isConnected = false;

async function connectToDatabase() {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(config.database_url as string);
    isConnected = true;
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error);
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
    console.error('Handler error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
