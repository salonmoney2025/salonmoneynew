# SalonMoney - Vercel Deployment Guide

This guide will walk you through deploying the SalonMoney platform to Vercel (frontend) and a backend hosting service.

## Architecture Overview

- **Frontend**: Next.js application deployed on Vercel
- **Backend**: Node.js/Express API with MongoDB (requires separate hosting)

> **Note**: The backend cannot be fully deployed to Vercel because it uses:
> - Cron jobs (daily income, auto-renewal, exchange rates)
> - Socket.io for real-time communication
> - File upload handling with persistent storage
>
> These features require a persistent server environment.

## Prerequisites

- [Vercel Account](https://vercel.com/signup)
- [MongoDB Atlas Account](https://www.mongodb.com/cloud/atlas) (or existing MongoDB)
- [Git](https://git-scm.com/) installed
- Backend hosting service account (Render, Railway, or Heroku)

---

## Part 1: Deploy Backend (Choose One Platform)

### Option A: Deploy to Render (Recommended)

1. **Create a Render account**: [https://render.com](https://render.com)

2. **Create a new Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure the service:
     - **Name**: `salonmoney-backend`
     - **Root Directory**: `backend`
     - **Environment**: `Node`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Plan**: Free (or paid for better performance)

3. **Add Environment Variables**:
   Go to "Environment" tab and add all variables from `backend/envexample`:
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=generate_random_string_here
   JWT_EXPIRE=24h
   REFRESH_TOKEN_SECRET=another_random_string
   REFRESH_TOKEN_EXPIRE=7d
   PORT=5000
   FRONTEND_URL=https://your-vercel-domain.vercel.app
   NODE_ENV=production

   # Fee Configuration
   RECHARGE_FEE_PERCENTAGE=10
   WITHDRAWAL_FEE_PERCENTAGE=10
   REFERRAL_BONUS_PERCENTAGE=35

   # Conversion Rates
   NSL_TO_USDT_RECHARGE=23
   USDT_TO_NSL_WITHDRAWAL=23

   # Withdrawal Settings
   MIN_WITHDRAWAL_AMOUNT_NSL=100
   MAX_REFERRAL_LEVEL=1

   # Super Admin (CHANGE THESE!)
   SUPER_ADMIN_USERNAME=your_admin_username
   SUPER_ADMIN_EMAIL=admin@yourdomain.com
   SUPER_ADMIN_PHONE=+1234567890
   SUPER_ADMIN_PASSWORD=strong_password_here

   # Email Configuration (Optional)
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your_gmail_app_password
   EMAIL_FROM=noreply@yourdomain.com

   # Binance API (Optional)
   BINANCE_API_KEY=your_key
   BINANCE_API_SECRET=your_secret
   BINANCE_TESTNET=true
   ```

4. **Deploy**: Click "Create Web Service" and wait for deployment

5. **Note your backend URL**: `https://salonmoney-backend.onrender.com`

### Option B: Deploy to Railway

1. **Create a Railway account**: [https://railway.app](https://railway.app)

2. **Create new project**:
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Railway will auto-detect Node.js

3. **Configure Root Directory**:
   - Go to Settings → "Root Directory" → Set to `backend`

4. **Add Environment Variables**: Same as Render option above

5. **Deploy**: Railway will automatically deploy

6. **Generate Domain**: Go to Settings → Generate Domain

---

## Part 2: Setup MongoDB Atlas

1. **Create MongoDB Atlas cluster**:
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster (M0 tier)
   - Choose a region close to your backend server

2. **Configure Database Access**:
   - Go to "Database Access"
   - Add new database user
   - Save username and password

3. **Configure Network Access**:
   - Go to "Network Access"
   - Add IP Address: `0.0.0.0/0` (allow from anywhere)
   - Or add your backend server's IP for better security

4. **Get Connection String**:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password
   - Replace `myFirstDatabase` with `finalmoney` or your preferred database name
   - Example: `mongodb+srv://username:password@cluster.mongodb.net/finalmoney?retryWrites=true&w=majority`

5. **Update Backend Environment Variables**:
   - Add the connection string to your backend hosting service's environment variables
   - Key: `MONGODB_URI`

---

## Part 3: Deploy Frontend to Vercel

### Step 1: Prepare Your Repository

1. **Ensure files are in Git**:
   ```bash
   cd D:\leo\finalmoney
   git init
   git add .
   git commit -m "Prepare for Vercel deployment"
   ```

2. **Push to GitHub** (if not already):
   ```bash
   git remote add origin https://github.com/yourusername/finalmoney.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. **Import Project**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Import your Git repository

2. **Configure Project**:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

3. **Add Environment Variables**:
   Click "Environment Variables" and add:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com/api
   NEXT_PUBLIC_APP_NAME=SalonMoney
   NEXT_PUBLIC_COMPANY_NAME=SalonMoney Inc.
   ```

   Optional (if using social login):
   ```
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
   NEXT_PUBLIC_FACEBOOK_APP_ID=your_facebook_app_id
   ```

4. **Deploy**: Click "Deploy"

5. **Get Frontend URL**: After deployment, note your URL (e.g., `https://salonmoney.vercel.app`)

### Step 3: Update Backend FRONTEND_URL

1. Go back to your backend hosting service (Render/Railway)
2. Update the `FRONTEND_URL` environment variable to your Vercel URL:
   ```
   FRONTEND_URL=https://salonmoney.vercel.app
   ```
3. Redeploy the backend if necessary

---

## Part 4: Post-Deployment Setup

### 1. Initialize Super Admin

After backend is deployed, run these commands to seed initial data:

**Option 1: Using Backend Service Console** (Render/Railway)
- Go to your backend service console/shell
- Run: `npm run seed:admin`
- Run: `npm run seed:products`

**Option 2: Using API Endpoints**
- The super admin will be auto-created on first backend startup using the credentials in your environment variables

### 2. Test the Deployment

1. **Test Backend Health**:
   - Visit: `https://your-backend-url.onrender.com/api/health`
   - Should return: `{"status":"Server is running","timestamp":"..."}`

2. **Test Frontend**:
   - Visit: `https://your-frontend-url.vercel.app`
   - Should load the login page

3. **Test Login**:
   - Use super admin credentials to log in
   - Phone: The one you set in `SUPER_ADMIN_PHONE`
   - Password: The one you set in `SUPER_ADMIN_PASSWORD`

### 3. Verify Cron Jobs

Check your backend logs to ensure cron jobs are running:
- Daily income generation: `0 0 * * *` (midnight)
- Auto-renewal: `1 0 * * *` (12:01 AM)
- Exchange rate updates: `0 */4 * * *` (every 4 hours)

---

## Part 5: Custom Domain (Optional)

### For Vercel Frontend:
1. Go to your Vercel project → Settings → Domains
2. Add your custom domain (e.g., `salonmoney.com`)
3. Follow DNS configuration instructions
4. Update `FRONTEND_URL` in backend environment variables

### For Backend:
1. Most hosting services provide custom domain support
2. Configure your domain DNS to point to backend server
3. Update `NEXT_PUBLIC_API_URL` in Vercel environment variables

---

## Part 6: Security Checklist

Before going live:

- [ ] Change all default passwords (super admin, database)
- [ ] Generate strong JWT secrets (use crypto.randomBytes)
- [ ] Configure proper CORS (limit to your frontend domain)
- [ ] Enable MongoDB Atlas IP whitelist (remove 0.0.0.0/0)
- [ ] Set up database backups in MongoDB Atlas
- [ ] Enable email service (Gmail app password or SendGrid)
- [ ] Review and adjust rate limits in backend middleware
- [ ] Set up monitoring and alerting (Vercel Analytics, Render metrics)
- [ ] Enable HTTPS (auto on Vercel and Render)
- [ ] Test 2FA functionality
- [ ] Test all user flows (register, login, purchase, withdrawal)

---

## Part 7: Continuous Deployment

### Automatic Deployments:

**Vercel** (Frontend):
- Automatically deploys on every push to `main` branch
- Preview deployments for pull requests

**Render/Railway** (Backend):
- Automatically deploys on every push to `main` branch
- Can configure branch-specific deployments

### Manual Deployments:

**Vercel**:
```bash
npm install -g vercel
cd frontend
vercel --prod
```

**Render**: Push to GitHub or use Render Dashboard → Manual Deploy

---

## Part 8: Monitoring and Logs

### View Logs:

**Vercel**:
- Dashboard → Your Project → Logs
- Real-time function logs
- Build logs

**Render**:
- Dashboard → Your Service → Logs
- Real-time server logs
- Cron job execution logs

**Railway**:
- Dashboard → Your Service → Deployments → View Logs

---

## Part 9: Troubleshooting

### Common Issues:

1. **CORS Errors**:
   - Ensure `FRONTEND_URL` in backend matches your Vercel URL exactly
   - Check that backend CORS configuration allows your frontend domain

2. **API Connection Failed**:
   - Verify `NEXT_PUBLIC_API_URL` in Vercel environment variables
   - Check backend health endpoint is accessible
   - Ensure backend is running (not sleeping on free tier)

3. **Database Connection Failed**:
   - Verify MongoDB connection string is correct
   - Check MongoDB Atlas network access allows backend IP
   - Ensure database user has proper permissions

4. **Image Upload Issues**:
   - Check backend `/uploads` directory has write permissions
   - Verify file size limits in backend configuration
   - Ensure backend has sufficient disk space

5. **Cron Jobs Not Running**:
   - Check backend logs for cron execution
   - Verify backend is not sleeping (free tiers may sleep)
   - Consider upgrading to paid tier for 24/7 uptime

6. **Build Failures**:
   - Check build logs in Vercel/Render dashboard
   - Verify all dependencies are in package.json
   - Ensure Node.js version compatibility

---

## Part 10: Scaling Considerations

As your application grows:

1. **Database**:
   - Upgrade MongoDB Atlas tier for better performance
   - Enable database indexes (already configured)
   - Consider read replicas for high traffic

2. **Backend**:
   - Upgrade to paid tier for better performance and uptime
   - Consider horizontal scaling (multiple instances)
   - Use Redis for caching (add Redis service)

3. **Frontend**:
   - Vercel scales automatically
   - Monitor bandwidth usage
   - Use Vercel Analytics for performance insights

4. **File Storage**:
   - Consider moving uploads to AWS S3 or Cloudinary
   - Current local storage may not persist on some platforms

---

## Part 11: Backup Strategy

### Database Backups:
- MongoDB Atlas provides automatic backups
- Configure backup schedule in Atlas dashboard
- Test restore procedure periodically

### Code Backups:
- Git repository serves as code backup
- Consider additional backup to GitLab or Bitbucket
- Tag releases: `git tag -a v1.0.0 -m "Production release"`

---

## Support and Resources

- **Vercel Documentation**: https://vercel.com/docs
- **Render Documentation**: https://render.com/docs
- **Railway Documentation**: https://docs.railway.app
- **MongoDB Atlas**: https://docs.atlas.mongodb.com
- **Next.js Documentation**: https://nextjs.org/docs

---

## Quick Reference: Environment Variables

### Backend (Required):
```
MONGODB_URI
JWT_SECRET
REFRESH_TOKEN_SECRET
FRONTEND_URL
NODE_ENV=production
SUPER_ADMIN_USERNAME
SUPER_ADMIN_PASSWORD
SUPER_ADMIN_EMAIL
SUPER_ADMIN_PHONE
```

### Frontend (Required):
```
NEXT_PUBLIC_API_URL
```

---

## Summary Checklist

- [ ] Backend deployed and running
- [ ] MongoDB Atlas configured and connected
- [ ] Frontend deployed to Vercel
- [ ] Environment variables set on both services
- [ ] Super admin account created
- [ ] Products seeded
- [ ] Login tested
- [ ] All features tested (purchase, income, withdrawal)
- [ ] Security checklist completed
- [ ] Monitoring enabled
- [ ] Backup strategy in place

---

**Congratulations!** Your SalonMoney platform is now live on Vercel (frontend) with a professional backend hosting setup.

For questions or issues, refer to the platform documentation or contact your development team.
