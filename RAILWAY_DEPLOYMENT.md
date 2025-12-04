# Railway Deployment Guide

## Prerequisites
- GitHub account
- Railway account (signup at railway.app)
- MongoDB Atlas database ready

## Step-by-Step Deployment

### 1. Push Code to GitHub
```bash
# If not already in a git repository
cd /Users/shakib/Projects/news-portal
git init
git add .
git commit -m "Initial commit for deployment"

# Create a new repository on GitHub and push
git remote add origin https://github.com/your-username/news-portal.git
git branch -M main
git push -u origin main
```

### 2. Deploy to Railway

1. Go to https://railway.app
2. Click "Start a New Project"
3. Select "Deploy from GitHub repo"
4. Choose your `news-portal` repository
5. Railway will detect it as a Node.js project
6. Select the `server` directory as the root

### 3. Configure Environment Variables

In Railway dashboard, go to your project → Variables → Add the following:

```
PORT=5001
NODE_ENV=production
MONGODB_URI=mongodb+srv://habiburwebx_db_user:LVIqxvHgB8yvXbzZ@cluster0.yzcca8z.mongodb.net/ChannelDO?retryWrites=true&w=majority
JWT_SECRET=super-secret-jwt-key-for-production-change-this
JWT_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=10
CORS_ORIGIN=https://your-app-name.vercel.app
CLOUDINARY_CLOUD_NAME=dge2c3dkx
CLOUDINARY_API_KEY=145979941582321
CLOUDINARY_API_SECRET=OvIZhhtLeJjr4V86vYpGTjMbIME
```

**Important:**
- Replace `CORS_ORIGIN` with your actual Vercel URL after frontend deployment
- Generate a new `JWT_SECRET` using a random string generator

### 4. Deploy Settings

Railway should auto-detect these settings:
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start`
- **Root Directory:** `/server`

### 5. Get Your Railway URL

After deployment, Railway will give you a URL like:
`https://your-app-name.up.railway.app`

Save this URL - you'll need it for frontend configuration!

### 6. Test Your API

Visit: `https://your-app-name.up.railway.app/`

You should see the server running message.

## Troubleshooting

### Build Fails
- Check Railway logs for errors
- Ensure all dependencies are in package.json
- Verify TypeScript builds without errors

### Database Connection Issues
- Verify MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Check MONGODB_URI is correct
- Ensure database user has read/write permissions

### CORS Errors
- Update CORS_ORIGIN with correct Vercel URL
- Don't include trailing slash in URL

## Update Deployment

Railway auto-deploys when you push to GitHub:
```bash
git add .
git commit -m "Your update message"
git push
```

Railway will automatically rebuild and redeploy!
