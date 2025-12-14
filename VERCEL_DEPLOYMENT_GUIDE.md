# SalonMoney - Complete Vercel Deployment Guide

## 🚀 Deploy Both Frontend and Backend to Vercel

---

## Part 1: Deploy Backend to Vercel

### Step 1: Prepare Backend for Deployment

The backend is now configured with `vercel.json` to work on Vercel.

### Step 2: Deploy Backend

**Option A: Using Vercel Dashboard**

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. **Import** your GitHub repository: `salonmoney2025/salonmoneynew`
4. **Configure Project:**
   - **Framework Preset**: Other
   - **Root Directory**: `backend`
   - **Build Command**: Leave empty (not needed)
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`
5. **Add Environment Variables** (Click "Environment Variables"):

```env
MONGODB_URI=mongodb+srv://salonmoney2025_db_user:Wisdom1995@salonmoney-cluster.1ehpwp7.mongodb.net/salonmoneynew?retryWrites=true&w=majority&appName=salonmoney-cluster
NODE_ENV=production
PORT=5000
JWT_SECRET=44f0aa19af974cda78cc74b4cefff67e0d870818238ef55811b618a30b13a1ff449f9ebcb3adfe453141b3a758af1c415b7ab0a260ce8bed21e03b907662a114
JWT_EXPIRE=24h
REFRESH_TOKEN_SECRET=d84570c650c6744953e6efb5dadd613f29b14bd1f23bbcab7c7c2f8eb177db4471851d6e4a2f71e5d07b14ea6ddf81fef800e5d58186a5eb3a61dd3c6195d6eb
REFRESH_TOKEN_EXPIRE=7d
NSL_TO_USDT_RECHARGE=23
USDT_TO_NSL_WITHDRAWAL=23
RECHARGE_FEE_PERCENTAGE=10
WITHDRAWAL_FEE_PERCENTAGE=10
MIN_WITHDRAWAL_AMOUNT_NSL=100
REFERRAL_BONUS_PERCENTAGE=35
MAX_REFERRAL_LEVEL=1
SUPER_ADMIN_USERNAME=Wisrado
SUPER_ADMIN_EMAIL=admin@salonmoney.com
SUPER_ADMIN_PHONE=+23273001412
SUPER_ADMIN_PASSWORD=Makeni@2025?.
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
EMAIL_FROM=noreply@salonmoney.com
FRONTEND_URL=https://salonmoneynew.vercel.app
```

6. **Deploy**!

**Option B: Using Vercel CLI**

```bash
# Install Vercel CLI (if not installed)
npm install -g vercel

# Navigate to backend directory
cd D:\leo\salonmoneynew\backend

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### Step 3: Get Backend URL

After deployment, Vercel will give you a URL like:
```
https://salonmoney-backend-xxx.vercel.app
```

**Copy this URL!** You'll need it for the frontend.

---

## Part 2: Update Frontend to Use Backend URL

### Step 1: Update Frontend Environment Variables on Vercel

1. Go to your **frontend project** on Vercel (`salonmoneynew`)
2. **Settings** → **Environment Variables**
3. **Add or Update**:

```env
NEXT_PUBLIC_API_URL=https://salonmoney-backend-xxx.vercel.app/api
```

*(Replace `salonmoney-backend-xxx.vercel.app` with your actual backend URL)*

4. Select **All Environments** (Production, Preview, Development)
5. **Save**

### Step 2: Redeploy Frontend

1. Go to **Deployments** tab
2. Click the **"..."** menu on the latest deployment
3. Click **"Redeploy"**

OR simply push a new commit to trigger redeployment.

---

## Part 3: Update Backend CORS to Allow Frontend

After deploying both, you need to update the backend's `FRONTEND_URL` environment variable:

1. Go to **Backend project** on Vercel
2. **Settings** → **Environment Variables**
3. **Update** `FRONTEND_URL`:

```env
FRONTEND_URL=https://salonmoneynew.vercel.app
```

**Also add** (if using custom domain):
```env
FRONTEND_URL=https://www.salonmoney.my
```

4. **Redeploy backend**

---

## Part 4: Test Everything

### Test Backend API

Visit in browser:
```
https://your-backend-url.vercel.app/api/health
```

Expected response:
```json
{"status":"Server is running","timestamp":"2025-12-14T..."}
```

### Test Frontend Login

1. Go to `https://salonmoneynew.vercel.app` or `https://www.salonmoney.my`
2. Click **Login**
3. Enter credentials:
   - Username: `Wisrado`
   - Password: `Makeni@2025?.`
4. Should successfully login ✅

---

## 🔧 Troubleshooting

### Frontend Still Shows 404/405/502 Errors

**Check:**
1. `NEXT_PUBLIC_API_URL` is set correctly in frontend env vars
2. Backend is deployed and running
3. CORS is configured correctly in backend

**Solution:**
- Redeploy both frontend and backend after setting env vars

### Backend Returns CORS Error

**Check:**
1. `FRONTEND_URL` is set in backend env vars
2. Frontend domain is in the CORS allowed origins list

**Fix:**
Update backend `server.js` CORS configuration or set `FRONTEND_URL` correctly.

### MongoDB Connection Error

**Check:**
1. `MONGODB_URI` is set correctly in backend env vars
2. MongoDB Atlas allows connections from `0.0.0.0/0` (all IPs) or Vercel IPs

**Solution:**
- Go to MongoDB Atlas → Network Access → Add IP Address → Allow Access from Anywhere (`0.0.0.0/0`)

---

## 📊 Final Architecture

```
┌─────────────────────────────────────┐
│  Frontend (Vercel)                  │
│  https://salonmoneynew.vercel.app   │
│  https://www.salonmoney.my          │
└──────────────┬──────────────────────┘
               │
               │ API Calls
               │
               ▼
┌──────────────────────────────────────┐
│  Backend (Vercel)                    │
│  https://backend-xxx.vercel.app/api  │
└──────────────┬───────────────────────┘
               │
               │ Database Connection
               │
               ▼
┌──────────────────────────────────────┐
│  MongoDB Atlas (Cloud)               │
│  salonmoney-cluster.mongodb.net      │
└──────────────────────────────────────┘
```

---

## ✅ Deployment Checklist

**Backend:**
- [ ] `vercel.json` created
- [ ] Deployed to Vercel
- [ ] All environment variables set
- [ ] `/api/health` endpoint working
- [ ] MongoDB connection successful
- [ ] CORS configured for frontend domain

**Frontend:**
- [ ] `NEXT_PUBLIC_API_URL` set to backend URL
- [ ] Redeployed after env var update
- [ ] Login page loads without errors
- [ ] Can successfully login
- [ ] Dashboard loads data from backend

**Database:**
- [ ] MongoDB Atlas IP whitelist allows Vercel (`0.0.0.0/0`)
- [ ] Connection string is correct
- [ ] Collections exist and have data

---

## 🎯 Quick Commands Reference

**Deploy Backend:**
```bash
cd D:\leo\salonmoneynew\backend
vercel --prod
```

**Deploy Frontend:**
```bash
cd D:\leo\salonmoneynew\frontend
vercel --prod
```

**Test Backend API:**
```bash
curl https://your-backend.vercel.app/api/health
```

**Check Frontend Build:**
```bash
cd D:\leo\salonmoneynew\frontend
npm run build
```

---

## 🔐 Security Notes

1. **Never commit** `.env` files to Git
2. **Always use** environment variables on Vercel dashboard
3. **Rotate secrets** regularly (JWT, database passwords)
4. **Enable IP whitelisting** in MongoDB Atlas for production
5. **Use strong passwords** for admin accounts

---

## 📞 Need Help?

If deployments fail:
1. Check Vercel deployment logs
2. Verify all environment variables are set
3. Test backend `/api/health` endpoint
4. Check MongoDB Atlas connection
5. Review CORS configuration

---

**Last Updated**: December 14, 2025
**Status**: Ready for deployment ✅
