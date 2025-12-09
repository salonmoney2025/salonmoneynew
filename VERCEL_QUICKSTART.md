# Quick Start: Deploy to Vercel (5 Minutes)

This is a simplified guide for quick deployment. For detailed instructions, see `VERCEL_DEPLOYMENT_GUIDE.md`.

## Prerequisites
- GitHub account
- Vercel account
- MongoDB Atlas account (free tier)

---

## Step 1: Setup MongoDB (2 minutes)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create database user (save username/password)
4. Network Access → Add `0.0.0.0/0`
5. Get connection string: `mongodb+srv://user:pass@cluster.mongodb.net/finalmoney?retryWrites=true&w=majority`

---

## Step 2: Deploy Backend to Render (2 minutes)

1. Go to [Render.com](https://render.com) → Sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repo
4. Settings:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add Environment Variables (click "Environment" tab):
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=any_random_long_string_32chars_minimum
   REFRESH_TOKEN_SECRET=another_random_string
   FRONTEND_URL=https://your-app.vercel.app
   NODE_ENV=production
   SUPER_ADMIN_USERNAME=admin
   SUPER_ADMIN_PASSWORD=YourStrongPassword123!
   SUPER_ADMIN_EMAIL=admin@yourapp.com
   SUPER_ADMIN_PHONE=+1234567890
   PORT=5000
   ```
6. Click "Create Web Service"
7. Wait for deployment
8. Copy your backend URL (e.g., `https://your-app.onrender.com`)

---

## Step 3: Deploy Frontend to Vercel (1 minute)

1. Go to [Vercel.com](https://vercel.com) → Import Project
2. Import your GitHub repo
3. Settings:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Next.js
4. Add Environment Variable:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com/api
   ```
5. Click "Deploy"
6. Wait 2-3 minutes
7. Copy your Vercel URL (e.g., `https://your-app.vercel.app`)

---

## Step 4: Update Backend with Frontend URL

1. Go back to Render dashboard
2. Select your backend service
3. Go to "Environment" tab
4. Update `FRONTEND_URL` to your Vercel URL:
   ```
   FRONTEND_URL=https://your-app.vercel.app
   ```
5. Click "Save Changes" (service will auto-redeploy)

---

## Step 5: Test Your App

1. Visit your Vercel URL: `https://your-app.vercel.app`
2. Click "Register" or "Login"
3. Login with super admin credentials:
   - Phone: `+1234567890` (or whatever you set)
   - Password: `YourStrongPassword123!` (or whatever you set)
4. You're live!

---

## Important URLs

- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-backend.onrender.com`
- **API Health Check**: `https://your-backend.onrender.com/api/health`

---

## Next Steps

1. Change super admin password
2. Add VIP products (Admin Dashboard → Products)
3. Set up email service (optional but recommended)
4. Configure custom domain (optional)
5. Read full deployment guide for security best practices

---

## Need Help?

See `VERCEL_DEPLOYMENT_GUIDE.md` for:
- Detailed configuration
- Security checklist
- Troubleshooting
- Custom domain setup
- Monitoring and logs

---

## Free Tier Limitations

- **Render Free**: May sleep after 15 min of inactivity
- **MongoDB Atlas Free**: 512MB storage
- **Vercel Free**: Unlimited bandwidth, but function timeout limits

Consider upgrading for production use with real users.

---

## Cost Estimate (Paid Tiers)

- Render: $7/month (Starter)
- MongoDB Atlas: $9/month (M2 cluster)
- Vercel: Free for most use cases (Pro $20/month if needed)

**Total**: ~$16-36/month for reliable production hosting

---

**That's it!** Your SalonMoney platform is now live and ready to accept users.
