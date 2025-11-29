# 🎉 SalonMoney - Secure Salon Financial Platform

A complete, production-ready prepaid-card-style financial system where users invest in salon services, earn daily income, and participate in a referral program.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Requirements](#system-requirements)
- [Installation & Setup](#installation--setup)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Admin Dashboard Setup](#admin-dashboard-setup)
- [Troubleshooting](#troubleshooting)

## ✨ Features

### User Features
- ✅ Secure authentication with JWT
- ✅ Phone number-based registration & login
- ✅ User dashboard with balance overview
- ✅ VIP product purchases (VIP1-VIP8)
- ✅ Daily income generation
- ✅ Referral program with up to 35% bonus
- ✅ Transaction history tracking
- ✅ Recharge & withdrawal requests

### Admin Features
- ✅ Super Admin full system control
- ✅ Role-based access control (5 admin roles)
- ✅ User management & verification
- ✅ Transaction approval/rejection
- ✅ Balance adjustment for discrepancies
- ✅ Product management
- ✅ Financial reporting
- ✅ Audit logging

### Security
- ✅ JWT authentication with refresh tokens
- ✅ bcrypt password hashing
- ✅ Role-based middleware
- ✅ Rate limiting on sensitive endpoints
- ✅ MongoDB encrypted storage
- ✅ HTTPS ready

## 🛠 Tech Stack

**Backend:**
- Node.js + Express.js
- MongoDB Atlas
- JWT Authentication
- Winston Logger

**Frontend:**
- Next.js 14
- React 18
- Tailwind CSS
- Zustand (State Management)
- Axios (API Client)

## 💻 System Requirements

- **Node.js**: v16 or higher
- **npm**: v8 or higher
- **MongoDB**: v5 or higher (Atlas account recommended)
- **Git**: For version control
- **RAM**: 4GB minimum
- **Disk Space**: 2GB minimum

## 📦 Installation & Setup

### Step 1: Extract the ZIP File

```bash
unzip salonmoney-platform.zip
cd salonmoney-platform
```

### Step 2: MongoDB Setup

#### Option A: MongoDB Atlas (Cloud - Recommended)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster
4. Get your connection string:
   - Click "Connect" → "Drivers"
   - Copy the connection string
   - Replace `<username>`, `<password>`, and `<dbname>`

#### Option B: Local MongoDB
```bash
# On Ubuntu/Debian
sudo apt-get install -y mongodb

# On macOS
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB service
mongod
```

### Step 3: Backend Setup

```bash
cd backend
npm install
```

#### Configure Environment Variables

Edit `.env` file:

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/salonmoney?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
JWT_EXPIRE=24h
REFRESH_TOKEN_SECRET=your_refresh_secret_key_change_this_12345
REFRESH_TOKEN_EXPIRE=7d

# Conversion Rates (NSL = Sierra Leone Leone, USDT = Tether)
NSL_TO_USDT_RECHARGE=252
USDT_TO_NSL_WITHDRAWAL=6

# Referral Settings
REFERRAL_BONUS_PERCENTAGE=35

NODE_ENV=development
```

### Step 4: Frontend Setup

```bash
cd ../frontend
npm install
```

#### Configure Environment Variables

Edit `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_NAME=SalonMoney
NEXT_PUBLIC_COMPANY_NAME=SalonMoney Inc.
```

## 📁 Project Structure

```
salonmoney-platform/
├── backend/
│   ├── models/
│   │   ├── User.js              # User schema & methods
│   │   ├── Product.js           # Product/VIP packages
│   │   ├── Transaction.js       # Financial transactions
│   │   └── Referral.js          # Referral tracking
│   ├── routes/
│   │   ├── auth.js              # Authentication endpoints
│   │   ├── user.js              # User endpoints
│   │   ├── admin.js             # Super admin endpoints
│   │   ├── finance.js           # Finance admin endpoints
│   │   ├── verificator.js       # Verification admin endpoints
│   │   ├── approval.js          # Approval admin endpoints
│   │   └── products.js          # Product endpoints
│   ├── middleware/
│   │   └── auth.js              # JWT & role validation
│   ├── utils/
│   │   └── logger.js            # Winston logger
│   ├── server.js                # Express app setup
│   ├── package.json             # Dependencies
│   └── .env                     # Environment variables
│
├── frontend/
│   ├── app/
│   │   ├── layout.jsx           # Root layout
│   │   ├── login/               # Login page
│   │   ├── signup/              # Registration page
│   │   ├── dashboard/           # User dashboard
│   │   ├── products/            # Product catalog
│   │   ├── recharge/            # Recharge page
│   │   └── ...
│   ├── store/
│   │   └── auth.js              # Zustand auth store
│   ├── utils/
│   │   └── api.js               # Axios instance
│   ├── styles/
│   │   └── globals.css          # Global styles
│   ├── package.json             # Dependencies
│   └── .env.local               # Environment variables
│
└── README.md                    # This file
```

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/signup           Register new user
POST   /api/auth/login            User login
POST   /api/auth/refresh          Refresh JWT token
POST   /api/auth/change-password  Change password
```

### User Endpoints
```
GET    /api/user/dashboard        User dashboard data
GET    /api/user/transactions     Transaction history
GET    /api/user/referrals        Referral statistics
POST   /api/user/recharge         Request recharge
POST   /api/user/withdraw         Request withdrawal
```

### Products
```
GET    /api/products              List all products
POST   /api/products/buy          Purchase product
POST   /api/products              Create product (Admin)
PATCH  /api/products/:id          Update product (Admin)
```

### Finance Admin
```
GET    /api/finance/transactions           Get pending transactions
PATCH  /api/finance/transactions/:id/approve  Approve transaction
PATCH  /api/finance/transactions/:id/reject   Reject transaction
```

### Super Admin
```
GET    /api/admin/users                    Get all users
GET    /api/admin/users/:id                Get user details
PATCH  /api/admin/users/:id/role          Assign role
PATCH  /api/admin/users/:id/status        Freeze/unfreeze user
PATCH  /api/admin/users/:id/balance       Adjust balance
GET    /api/admin/transactions            Get all transactions
```

### Verificator
```
GET    /api/verificator/users/pending     Get pending users
PATCH  /api/verificator/users/:id/verify  Verify user
PATCH  /api/verificator/users/:id/reject  Reject user
```

### Approval Admin
```
GET    /api/approval/users/pending         Get pending users
PATCH  /api/approval/users/:id/approve     Approve user
PATCH  /api/approval/users/:id/reject      Reject user
```

## 🗄️ Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  phone: String (unique),
  password_hash: String,
  role: String,
  referral_code: String,
  referred_by: String,
  balance_NSL: Number,
  balance_usdt: Number,
  vip_level: String,
  products: [ObjectId],
  status: String,
  kyc_verified: Boolean,
  created_at: Date,
  last_login: Date
}
```

### Products Collection
```javascript
{
  _id: ObjectId,
  name: String,
  price_NSL: Number,
  price_usdt: Number,
  daily_income_NSL: Number,
  validity_days: Number,
  benefits: [String],
  active: Boolean,
  created_at: Date
}
```

### Transactions Collection
```javascript
{
  _id: ObjectId,
  user_id: ObjectId,
  type: String,
  amount_NSL: Number,
  amount_usdt: Number,
  status: String,
  approved_by: ObjectId,
  notes: String,
  binance_tx_id: String,
  timestamp: Date
}
```

### Referrals Collection
```javascript
{
  _id: ObjectId,
  referrer_id: ObjectId,
  referred_id: ObjectId,
  bonus_NSL: Number,
  recharge_amount_NSL: Number,
  bonus_percentage: Number,
  status: String,
  timestamp: Date
}
```

## ⚙️ Configuration

### JWT Configuration
- **Access Token Duration**: 24 hours (configurable)
- **Refresh Token Duration**: 7 days (configurable)
- Both tokens are required for secure operations

### Conversion Rates
- **Recharge**: 252 NSL = 1 USDT
- **Withdrawal**: 1 NSL = 1/6 USDT

### Referral Settings
- **Default Bonus**: 35% of first purchase
- **Max Levels**: Single-tier (direct referrals only)
- **Payment Status**: Automatic upon purchase

### Role Permissions
```
superadmin      → Full system access
finance         → Approve/reject transactions
verificator     → Verify user KYC
approval        → Approve new accounts
admin           → General admin tasks
user            → Standard user access
```

## 🚀 Running the Application

### Terminal 1: Start Backend Server

```bash
cd backend
npm install
npm run dev
# Server runs on http://localhost:5000
```

### Terminal 2: Start Frontend Development Server

```bash
cd frontend
npm install
npm run dev
# Frontend runs on http://localhost:3000
```

### Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

## 👨‍💼 Admin Dashboard Setup

### Creating the First Super Admin

1. **Via Direct MongoDB:**

```javascript
// Connect to MongoDB and run:
db.users.insertOne({
  phone: "+232XXXXXXXXX",
  password_hash: "$2a$10$...", // bcrypt hash of "AdminPassword123!"
  role: "superadmin",
  referral_code: "SUPERADMIN001",
  balance_NSL: 0,
  balance_usdt: 0,
  status: "active",
  kyc_verified: true,
  created_at: new Date()
});
```

2. **Via Signup + Manual Role Update:**
   - Sign up as normal user
   - Update role in MongoDB:
   ```javascript
   db.users.updateOne(
     { phone: "+232XXXXXXXXX" },
     { $set: { role: "superadmin", status: "active" } }
   );
   ```

### Admin Workflow

1. **User Registration** → Status: "pending"
2. **Approval Admin** → Reviews and approves account
3. **Verificator Admin** → Validates KYC/identity
4. **Finance Admin** → Handles payment transactions
5. **Super Admin** → Oversees everything

## 🔧 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: 
- Ensure MongoDB is running locally
- OR check MongoDB Atlas connection string is correct
- OR verify IP whitelist in MongoDB Atlas

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**:
```bash
# Change PORT in .env or kill existing process
kill -9 $(lsof -ti:5000)
```

### JWT Token Expired
**Solution**: Frontend automatically refreshes token using refresh token. If both expire, user is logged out.

### CORS Issues
**Solution**: Ensure `NEXT_PUBLIC_API_URL` in frontend matches backend URL.

### Module Not Found
**Solution**:
```bash
cd backend && npm install
cd ../frontend && npm install
```

## 📝 Default Test Credentials

After setup, you can create test accounts:

```
Phone: +232701234567
Password: Test123!@

Phone: +232702345678
Password: Test456!@
```

## 📞 Support

For issues or questions:
1. Check logs in `backend/logs/` directory
2. Review MongoDB indexes
3. Verify all .env variables are set correctly
4. Check network connectivity to MongoDB

## 🔐 Security Checklist

- [ ] Change JWT_SECRET in production
- [ ] Change JWT secret in .env
- [ ] Use strong MongoDB password
- [ ] Enable HTTPS in production
- [ ] Set NODE_ENV=production
- [ ] Configure CORS properly
- [ ] Implement rate limiting
- [ ] Regular database backups
- [ ] Review audit logs regularly
- [ ] Use environment variables for secrets

## 🎉 You're All Set!

Your SalonMoney platform is ready to use. Start with:

1. Backend: `npm run dev` (from backend directory)
2. Frontend: `npm run dev` (from frontend directory)
3. Visit: http://localhost:3000

**Happy coding! 🚀**

---

**Version**: 1.0.0  
**Last Updated**: 2025  
**License**: MIT
