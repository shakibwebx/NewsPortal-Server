import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT || 5001,
  node_env: process.env.NODE_ENV || 'development',
  database_url: process.env.MONGODB_URI || 'mongodb://localhost:27017/news-portal',
  jwt_secret: (process.env.JWT_SECRET || 'your-secret-key') as string,
  jwt_expires_in: (process.env.JWT_EXPIRES_IN || '7d') as string,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS || 10,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
};
