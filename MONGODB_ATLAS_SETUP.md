# SalonMoney - MongoDB Atlas Connection Setup

## Connection Status: ✅ CONFIGURED & TESTED

Your SalonMoney application is now configured to connect to MongoDB Atlas!

---

## Database Information

- **Database Provider**: MongoDB Atlas
- **Cluster**: salonmoney-cluster.1ehpwp7.mongodb.net
- **Database Name**: salonmoneynew
- **Username**: salonmoney2025_db_user
- **Password**: Wisdom1995
- **Connection Status**: ✅ Successfully tested

### Existing Collections (Already Created)
Your database already contains the following collections:
- `users` - User accounts and authentication
- `products` - VIP packages (VIP1-VIP8)
- `transactions` - Recharge, withdrawal, and income records
- `referrals` - Referral program data
- `notifications` - User notifications
- `sessions` - User sessions
- `exchangerates` - Currency exchange rates
- `currencyrates` - Currency conversion rates
- `chats` - Chat/support messages
- `twofactorauths` - 2FA authentication data

---

## Configuration Files Updated

### 1. Backend Development Environment
**File**: `D:\leo\salonmoneynew\backend\.env`

```env
MONGODB_URI=mongodb+srv://salonmoney2025_db_user:Wisdom1995@salonmoney-cluster.1ehpwp7.mongodb.net/salonmoneynew?retryWrites=true&w=majority&appName=salonmoney-cluster
```

### 2. Backend Production Environment
**File**: `D:\leo\salonmoneynew\backend\.env.production`

```env
MONGODB_URI=mongodb+srv://salonmoney2025_db_user:Wisdom1995@salonmoney-cluster.1ehpwp7.mongodb.net/salonmoneynew?retryWrites=true&w=majority&appName=salonmoney-cluster
```

### 3. Frontend Configuration
**File**: `D:\leo\salonmoneynew\frontend\.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## Step-by-Step Instructions to Run Your Application

### Step 1: Test Database Connection (Optional)

```bash
# Navigate to backend directory
cd D:\leo\salonmoneynew\backend

# Run connection test
node test-db-connection.js
```

**Expected Output**:
```
✅ SUCCESS! Pinged your deployment. You successfully connected to MongoDB!
📊 Database Information:
Database Name: salonmoneynew
Collections: [list of collections]
```

---

### Step 2: Start Backend Server

Open a **new terminal/command prompt** and run:

```bash
# Navigate to backend directory
cd D:\leo\salonmoneynew\backend

# Install dependencies (if not already installed)
npm install

# Start backend in development mode
npm run dev
```

**Expected Output**:
```
Server running on port 5000
MongoDB connected
Socket.io initialized
```

**Backend will be available at**: `http://localhost:5000`

---

### Step 3: Start Frontend Application

Open a **second terminal/command prompt** (keep backend running) and run:

```bash
# Navigate to frontend directory
cd D:\leo\salonmoneynew\frontend

# Install dependencies (if not already installed)
npm install

# Start frontend in development mode
npm run dev
```

**Expected Output**:
```
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

**Frontend will be available at**: `http://localhost:3000`

---

### Step 4: Access Your Application

1. **Open your web browser**
2. **Navigate to**: `http://localhost:3000`
3. **Login with Super Admin credentials**:
   - Username: `Wisrado`
   - Email: `admin@salonmoney.com`
   - Phone: `+23273001412`
   - Password: `Makeni@2025?.`

---

## Production Deployment (Coolify)

### Backend Configuration in Coolify

1. **Go to your Coolify dashboard**
2. **Navigate to**: Projects → backend → production
3. **Click on**: Environment Variables
4. **Add the following environment variable**:

   **Variable Name**: `MONGODB_URI`

   **Variable Value**:
   ```
   mongodb+srv://salonmoney2025_db_user:Wisdom1995@salonmoney-cluster.1ehpwp7.mongodb.net/salonmoneynew?retryWrites=true&w=majority&appName=salonmoney-cluster
   ```

5. **Save** and **Restart** your backend service

### Frontend Configuration in Coolify

1. **Navigate to**: Projects → salonmoney (frontend) → production
2. **Click on**: Environment Variables
3. **Add/Update the following variable**:

   **Variable Name**: `NEXT_PUBLIC_API_URL`

   **Variable Value**: `https://your-backend-domain.com/api`

   *(Replace with your actual Coolify backend domain)*

4. **Save** and **Restart** your frontend service

---

## Important Notes

### 1. The Coolify MongoDB Database (Exited)
The MongoDB database you saw in Coolify (status: Exited) is **NOT needed** for your application. Your application is now configured to use **MongoDB Atlas** (cloud-hosted), which is:
- ✅ More reliable
- ✅ Automatically backed up
- ✅ Scalable
- ✅ Accessible from anywhere

You can safely **delete** or **ignore** the local MongoDB database in Coolify.

### 2. Connection String Security
**IMPORTANT**: Your MongoDB connection string contains your password. Make sure to:
- ✅ Never commit `.env` files to Git
- ✅ Never share your connection string publicly
- ✅ Use environment variables in production (Coolify)

### 3. MongoDB Atlas Dashboard Access
To manage your database directly:
1. Go to: https://cloud.mongodb.com
2. Login with your MongoDB Atlas account
3. Navigate to: Clusters → salonmoney-cluster
4. Browse Collections to view/edit data

---

## Troubleshooting

### Backend Won't Start
```bash
# Check if MongoDB connection string is correct
cd D:\leo\salonmoneynew\backend
node test-db-connection.js
```

### Port Already in Use
```bash
# Backend (Port 5000)
netstat -ano | findstr :5000
taskkill /F /PID <PID_NUMBER>

# Frontend (Port 3000)
netstat -ano | findstr :3000
taskkill /F /PID <PID_NUMBER>
```

### Frontend Can't Connect to Backend
1. Make sure backend is running on `http://localhost:5000`
2. Check `frontend\.env.local` has correct `NEXT_PUBLIC_API_URL`
3. Clear browser cache and reload

### MongoDB Connection Fails
1. Check your internet connection (MongoDB Atlas is cloud-based)
2. Verify the password in `.env` is exactly: `Wisdom1995`
3. Check MongoDB Atlas dashboard to ensure cluster is running

---

## Quick Reference Commands

### Backend Commands
```bash
cd D:\leo\salonmoneynew\backend
npm run dev          # Start development server
npm start            # Start production server
npm run seed:admin   # Create super admin
npm run seed:products # Seed VIP products
npm test             # Run tests
```

### Frontend Commands
```bash
cd D:\leo\salonmoneynew\frontend
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Check code quality
```

---

## Next Steps

1. ✅ **Test the connection** - Run `node test-db-connection.js`
2. ✅ **Start backend** - Run `npm run dev` in backend folder
3. ✅ **Start frontend** - Run `npm run dev` in frontend folder
4. ✅ **Access application** - Open `http://localhost:3000`
5. ✅ **Login** - Use super admin credentials
6. 📦 **Deploy to production** - Configure Coolify environment variables

---

## Support & Resources

- **MongoDB Atlas Documentation**: https://docs.atlas.mongodb.com/
- **Coolify Documentation**: https://coolify.io/docs
- **Project Location**: `D:\leo\salonmoneynew`

---

**Status**: ✅ All configurations complete. Ready to run!

**Last Updated**: December 14, 2025
