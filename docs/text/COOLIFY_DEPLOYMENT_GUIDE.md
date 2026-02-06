# SalonMoney - Coolify Deployment Guide
## Using MongoDB Atlas (Cloud Database)

---

## 📦 Backend Deployment on Coolify

### Step 1: Configure Backend Environment Variables

1. **Go to Coolify Dashboard**
2. **Navigate to**: Projects → `backend` → `production`
3. **Click on**: Environment Variables tab
4. **Add/Update these variables**:

```env
# Node Environment
NODE_ENV=production

# Server Configuration
PORT=5000

# ⭐ CRITICAL: MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://salonmoney2025_db_user:Wisdom1995@salonmoney-cluster.1ehpwp7.mongodb.net/salonmoneynew?retryWrites=true&w=majority&appName=salonmoney-cluster

# JWT Configuration (Use the values from your backend/.env file)
JWT_SECRET=44f0aa19af974cda78cc74b4cefff67e0d870818238ef55811b618a30b13a1ff449f9ebcb3adfe453141b3a758af1c415b7ab0a260ce8bed21e03b907662a114
JWT_EXPIRE=24h
REFRESH_TOKEN_SECRET=d84570c650c6744953e6efb5dadd613f29b14bd1f23bbcab7c7c2f8eb177db4471851d6e4a2f71e5d07b14ea6ddf81fef800e5d58186a5eb3a61dd3c6195d6eb
REFRESH_TOKEN_EXPIRE=7d

# Conversion Rates
NSL_TO_USDT_RECHARGE=23
USDT_TO_NSL_WITHDRAWAL=23

# Fee Settings
RECHARGE_FEE_PERCENTAGE=10
WITHDRAWAL_FEE_PERCENTAGE=10
MIN_WITHDRAWAL_AMOUNT_NSL=100

# Referral Settings
REFERRAL_BONUS_PERCENTAGE=35
MAX_REFERRAL_LEVEL=1

# Super Admin Credentials
SUPER_ADMIN_USERNAME=Wisrado
SUPER_ADMIN_EMAIL=admin@salonmoney.com
SUPER_ADMIN_PHONE=+23273001412
SUPER_ADMIN_PASSWORD=Makeni@2025?.

# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
EMAIL_FROM=noreply@salonmoney.com

# Frontend URL (Replace with your actual Coolify frontend domain)
FRONTEND_URL=https://your-frontend-domain.com

# Binance API (Optional)
BINANCE_API_KEY=your_binance_api_key
BINANCE_API_SECRET=your_binance_api_secret
BINANCE_TESTNET=true
```

5. **Save** the environment variables
6. **Click "Deploy"** to restart the backend with new configuration

---

### Step 2: Verify Backend is Running

After deployment:
1. **Check Logs** in Coolify
2. Look for these messages:
   ```
   ✅ Server running on port 5000
   ✅ MongoDB Connected: salonmoney-cluster-shard-00-...
   ✅ Database Name: salonmoneynew
   ✅ Socket.io initialized
   ```

3. **Test the health endpoint**:
   - Open: `https://your-backend-domain.com/api/health`
   - Should return: `{"status":"Server is running","timestamp":"..."}`

---

## 🎨 Frontend Deployment on Coolify

### Step 1: Configure Frontend Environment Variables

1. **Go to Coolify Dashboard**
2. **Navigate to**: Projects → `salonmoney` → `production`
3. **Click on**: Environment Variables tab
4. **Add/Update these variables**:

```env
# Backend API URL (Replace with your actual Coolify backend domain)
NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api

# App Configuration
NEXT_PUBLIC_APP_NAME=SalonMoney
NEXT_PUBLIC_COMPANY_NAME=SalonMoney Inc.

# Conversion Rate
NEXT_PUBLIC_NSL_TO_USDT=23

# Social Login (Optional - Get from Google/Facebook Developer Console)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
NEXT_PUBLIC_FACEBOOK_APP_ID=your-facebook-app-id
```

5. **Save** the environment variables
6. **Click "Deploy"** to rebuild and restart the frontend

---

### Step 2: Verify Frontend is Running

After deployment:
1. **Open your frontend URL** in a browser
2. You should see the SalonMoney login page
3. **Test login** with super admin credentials:
   - Username: `Wisrado`
   - Password: `Makeni@2025?.`

---

## 🗄️ Remove Unused Coolify MongoDB Database

Since your application now uses MongoDB Atlas (cloud), the local MongoDB database in Coolify is no longer needed:

### To Stop the Database:
1. Go to: Projects → `backend` → `production` → MongoDB database
2. Click: **"Stop"** button

### To Delete the Database (Optional):
1. Scroll to: **"Danger Zone"**
2. Click: **"Delete Database"**
3. Confirm deletion

**Note**: This will NOT affect your application since it uses MongoDB Atlas.

---

## 🔗 Important URLs to Replace

Before deploying, make sure to replace these placeholder URLs with your actual Coolify domains:

### Backend Environment:
- `FRONTEND_URL=https://your-frontend-domain.com`
  - Replace with your actual frontend Coolify domain

### Frontend Environment:
- `NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api`
  - Replace with your actual backend Coolify domain

---

## 🧪 Testing After Deployment

### 1. Test Backend Connection:
```bash
# Test health endpoint
curl https://your-backend-domain.com/api/health

# Expected response:
{"status":"Server is running","timestamp":"2025-12-14T..."}
```

### 2. Test Frontend:
1. Open frontend URL in browser
2. Login with super admin credentials
3. Check dashboard loads correctly
4. Verify user can see products and perform actions

### 3. Test Database Connection:
1. Login to the application
2. Try creating a test user or transaction
3. Verify data persists after page reload
4. Check MongoDB Atlas dashboard to see data

---

## 📊 Monitor Your Deployment

### In Coolify:
- **Backend Logs**: Projects → backend → Logs tab
- **Frontend Logs**: Projects → salonmoney → Logs tab
- **Resource Usage**: Check Metrics tab for CPU/Memory usage

### In MongoDB Atlas:
1. Go to: https://cloud.mongodb.com
2. Login to your account
3. Navigate to: Clusters → salonmoney-cluster
4. Click: **"Metrics"** to see database performance
5. Click: **"Browse Collections"** to view data

---

## 🔧 Troubleshooting

### Backend Issues:

**Problem**: Backend won't start
```bash
# Check Coolify logs for error messages
# Common issues:
1. MONGODB_URI not set correctly
2. Missing environment variables
3. Port conflicts
```

**Solution**:
1. Verify `MONGODB_URI` in environment variables
2. Check all required env vars are set
3. Restart the backend service

---

**Problem**: "MongoDB connection error"
```bash
# Error in logs: MongoNetworkError or connection timeout
```

**Solution**:
1. Check internet connectivity from Coolify server
2. Verify MongoDB Atlas cluster is running
3. Check connection string has correct password (`Wisdom1995`)
4. Ensure MongoDB Atlas IP whitelist allows connections (use `0.0.0.0/0` for testing)

---

### Frontend Issues:

**Problem**: "Network Error" or "Cannot connect to backend"

**Solution**:
1. Check `NEXT_PUBLIC_API_URL` is set correctly
2. Verify backend is running and accessible
3. Check CORS settings in backend allow frontend domain
4. Clear browser cache and reload

---

**Problem**: 404 errors on page refresh

**Solution**:
1. Ensure Next.js is configured correctly in Coolify
2. Check build command is `npm run build`
3. Check start command is `npm start`

---

## 🚀 Deployment Checklist

Before going live, ensure:

- [ ] MongoDB Atlas connection string is in backend env vars
- [ ] All backend environment variables are set
- [ ] Backend deploys successfully and shows "MongoDB Connected" in logs
- [ ] Frontend environment variables are set with correct backend URL
- [ ] Frontend deploys successfully and loads in browser
- [ ] Can login with super admin credentials
- [ ] Dashboard displays correctly
- [ ] Can create test transactions
- [ ] Data persists in MongoDB Atlas
- [ ] Email notifications are configured (optional)
- [ ] SSL/HTTPS is enabled in Coolify
- [ ] Local Coolify MongoDB is stopped/deleted

---

## 📱 Production URLs Structure

After deployment, your application will have these URLs:

```
Backend API:    https://[your-backend].coolify.domain/api
Frontend:       https://[your-frontend].coolify.domain
MongoDB Atlas:  salonmoney-cluster.1ehpwp7.mongodb.net (cloud)
```

---

## 🔐 Security Recommendations

1. **Change default passwords** in production
2. **Enable IP whitelisting** in MongoDB Atlas for production
3. **Use strong JWT secrets** (regenerate for production)
4. **Enable email verification** for new users
5. **Set up backups** in MongoDB Atlas (auto-enabled)
6. **Monitor logs** regularly in Coolify
7. **Enable 2FA** for admin accounts

---

## 📞 Support

If you encounter issues:
1. Check Coolify logs first
2. Test MongoDB connection using the test script
3. Verify all environment variables are set
4. Check MongoDB Atlas dashboard for connection issues

---

**Last Updated**: December 14, 2025
**Database**: MongoDB Atlas (Cloud)
**Status**: Ready for Deployment ✅
