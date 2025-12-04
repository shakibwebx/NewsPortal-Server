import mongoose from 'mongoose';
import app from './app';
import config from './config';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('✅ MongoDB connected successfully');

    app.listen(config.port, () => {
      console.log(`🚀 News Portal Server running on port ${config.port}`);
      console.log(`📍 Environment: ${config.node_env}`);
      console.log(`🔗 Health check: http://localhost:${config.port}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

main();

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  process.exit(1);
});
