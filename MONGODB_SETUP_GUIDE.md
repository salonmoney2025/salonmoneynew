# MongoDB Database Setup Guide for SalonMoney

This guide provides complete instructions for setting up your MongoDB database for the SalonMoney platform.

## Table of Contents

1. [Database Structure](#database-structure)
2. [Setup Options](#setup-options)
3. [Option A: Automated Setup (Recommended)](#option-a-automated-setup-recommended)
4. [Option B: Manual Setup via MongoDB Atlas UI](#option-b-manual-setup-via-mongodb-atlas-ui)
5. [Verification](#verification)
6. [Troubleshooting](#troubleshooting)

---

## Database Structure

Your SalonMoney database uses the following collections:

| Collection | Purpose | Key Fields |
|------------|---------|------------|
| **users** | User accounts and profiles | username, phone, email, role, balance |
| **products** | VIP product packages | name, price, daily_income, validity_days |
| **transactions** | Financial transactions | user_id, type, amount, status |
| **referrals** | Referral tracking | referrer_id, referred_id, bonus |
| **currencyrates** | Exchange rates | currency_code, rate_to_usd, rate_to_nsl |
| **notifications** | User notifications | user_id, type, message, read |
| **chats** | Support chat messages | user_id, admin_id, messages |
| **sessions** | User sessions | user_id, token, expires_at |

**Database Name**: `finalmoney` (or as specified in your MONGODB_URI)

---

## Setup Options

Choose one of the following setup methods:

### Quick Comparison

| Method | Time | Difficulty | Best For |
|--------|------|------------|----------|
| **Option A: Automated** | 2 min | Easy | Developers with Node.js |
| **Option B: Manual UI** | 5 min | Very Easy | Anyone with MongoDB Atlas |

---

## Option A: Automated Setup (Recommended)

### Prerequisites

- Node.js installed on your computer
- MongoDB connection string (from MongoDB Atlas)
- Backend environment variables configured

### Step 1: Configure Environment Variables

Make sure your `backend/.env` file has the MongoDB connection string:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/finalmoney?retryWrites=true&w=majority
```

### Step 2: Run the Complete Seed Script

Open terminal in the backend directory and run:

```bash
cd D:\leo\finalmoney\backend
node scripts/mongodb/seed_all.js
```

This single script will:
- ✅ Create all collections and indexes
- ✅ Create super admin user
- ✅ Create all VIP products (VIP1-VIP8)
- ✅ Add currency exchange rates

### Step 3: Review Output

The script will display:

```
🚀 Starting Complete Database Seeding...

✅ Connected to MongoDB!

📋 STEP 1: Creating Collections and Indexes
✅ User indexes created
✅ Product indexes created
✅ CurrencyRate indexes created

📋 STEP 2: Creating Super Admin User
✅ Super Admin created successfully!
   Username: superadmin
   Phone: +232777777777
   Password: Admin@123456

📋 STEP 3: Creating VIP Products
✅ VIP1 created - 5 NSL/day
✅ VIP2 created - 28 NSL/day
... (8 products total)

📋 STEP 4: Creating Currency Rates
✅ USD (US Dollar) created
✅ EUR (Euro) created
... (12 currencies total)

🎉 DATABASE SEEDING COMPLETE!
```

### Step 4: Save Login Credentials

**IMPORTANT**: Save these credentials securely:

```
Username: superadmin (or your SUPER_ADMIN_USERNAME)
Phone: +232777777777 (or your SUPER_ADMIN_PHONE)
Password: Admin@123456 (or your SUPER_ADMIN_PASSWORD)
```

**✅ Done!** Your database is ready.

---

## Option B: Manual Setup via MongoDB Atlas UI

### Step 1: Create Database

1. Log in to [MongoDB Atlas](https://cloud.mongodb.com)
2. Go to your cluster → **Browse Collections**
3. Click **"+ Create Database"**
4. Enter:
   - **Database name**: `finalmoney`
   - **Collection name**: `products` (we'll create others later)
5. Click **"Create"**

### Step 2: Import Products

1. In MongoDB Atlas, select database **"finalmoney"**
2. Click on collection **"products"**
3. Click **"INSERT DOCUMENT"** button
4. Click the **"{}"** icon to switch to JSON view
5. **Copy and paste** the content from:
   ```
   D:\leo\finalmoney\backend\scripts\mongodb\data\products.json
   ```
6. Click **"Insert"**

You should now see 8 VIP products (VIP1-VIP8).

### Step 3: Create Currency Rates Collection

1. Click **"+ Create Collection"** button
2. Enter collection name: `currencyrates`
3. Click **"Create"**
4. Click **"INSERT DOCUMENT"**
5. Switch to JSON view
6. **Copy and paste** the content from:
   ```
   D:\leo\finalmoney\backend\scripts\mongodb\data\currencies.json
   ```
7. Click **"Insert"**

You should now see 12 currency rates.

### Step 4: Create Users Collection (for Super Admin)

1. Click **"+ Create Collection"** button
2. Enter collection name: `users`
3. Click **"Create"**
4. Click **"INSERT DOCUMENT"**
5. Switch to JSON view
6. **Paste this JSON** (replace placeholders with your values):

```json
{
  "username": "superadmin",
  "phone": "+232777777777",
  "email": "admin@salonmoney.com",
  "password_hash": "$2a$10$YourHashedPasswordHere",
  "role": "superadmin",
  "referral_code": "ADMIN12345",
  "referred_by": null,
  "balance_NSL": 0,
  "balance_usdt": 0,
  "vip_level": "none",
  "products": [],
  "status": "active",
  "kyc_verified": true,
  "kyc_documents": {},
  "emailVerified": true,
  "twoFactorEnabled": false,
  "authProvider": "local",
  "profile_photo": null,
  "binance_account_id": null,
  "binance_wallet_address": null,
  "binance_wallet_verified": false,
  "withdrawal_addresses": [],
  "preferred_currency": "USD",
  "created_at": { "$date": "2025-01-01T00:00:00.000Z" },
  "last_login": null,
  "updated_at": { "$date": "2025-01-01T00:00:00.000Z" }
}
```

**IMPORTANT**: The `password_hash` above is a placeholder. You have two options:

**Option 4a: Use Automated Script Instead**

It's easier to run the seed script to create the admin:

```bash
cd D:\leo\finalmoney\backend
node scripts/admin/createSuperAdmin.js
```

**Option 4b: Generate Password Hash Manually**

To hash your password:

```bash
cd D:\leo\finalmoney\backend
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('YourPassword', 10).then(hash => console.log(hash));"
```

Copy the output hash and paste it as `password_hash` in the JSON above.

### Step 5: Create Additional Collections

The remaining collections will be created automatically by the application when needed:

- `transactions` - Created when first transaction is made
- `referrals` - Created when first referral is made
- `notifications` - Created when first notification is sent
- `chats` - Created when first chat is started
- `sessions` - Created when users log in

**✅ Done!** Your database is ready.

---

## Verification

### Check via MongoDB Atlas UI

1. Go to MongoDB Atlas → Browse Collections
2. Verify you have these collections:
   - ✅ **products** (8 documents: VIP1-VIP8)
   - ✅ **currencyrates** (12 documents: USD, EUR, etc.)
   - ✅ **users** (at least 1 document: super admin)

### Check via Backend Health Endpoint

1. Start your backend server:
   ```bash
   cd D:\leo\finalmoney\backend
   npm start
   ```

2. Visit: `http://localhost:5000/api/health`

   Should return:
   ```json
   {
     "status": "Server is running",
     "timestamp": "2025-01-01T00:00:00.000Z"
   }
   ```

### Test Login

1. Start frontend:
   ```bash
   cd D:\leo\finalmoney\frontend
   npm run dev
   ```

2. Go to: `http://localhost:3000`

3. Try logging in with super admin credentials:
   - **Phone**: `+232777777777` (or your configured phone)
   - **Password**: `Admin@123456` (or your configured password)

If login succeeds, your database is working correctly! ✅

---

## Troubleshooting

### Problem: "MongoServerError: E11000 duplicate key error"

**Cause**: Data already exists in the database.

**Solution**: Either:
1. Drop the existing collection and re-import
2. Skip the seed script (data already exists)
3. Manually delete duplicate documents

### Problem: "MongooseError: Operation `users.findOne()` buffering timed out"

**Cause**: Cannot connect to MongoDB.

**Solution**:
1. Check `MONGODB_URI` in `.env` file
2. Verify MongoDB Atlas network access allows your IP (0.0.0.0/0)
3. Verify database user credentials are correct
4. Check internet connection

### Problem: "Cannot login with super admin credentials"

**Cause**: Password hash mismatch or user not created properly.

**Solution**:
1. Delete existing admin user from MongoDB Atlas
2. Run the automated seed script:
   ```bash
   node scripts/mongodb/seed_all.js
   ```
3. Use the credentials shown in script output

### Problem: "No products showing in frontend"

**Cause**: Products not imported correctly.

**Solution**:
1. Check MongoDB Atlas → products collection has 8 documents
2. Run product seed script:
   ```bash
   cd D:\leo\finalmoney\backend
   node scripts/seed/seedProducts.js
   ```
3. Restart backend server

### Problem: "Database connection refused"

**Cause**: MongoDB Atlas cluster is paused or connection string is wrong.

**Solution**:
1. Go to MongoDB Atlas → Clusters
2. Check if cluster is running (not paused)
3. If paused, click "Resume"
4. Verify connection string format:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/finalmoney?retryWrites=true&w=majority
   ```

---

## Database Collections Reference

### Users Collection

```javascript
{
  username: "john_doe",
  phone: "+1234567890",
  email: "john@example.com",
  password_hash: "hashed_password",
  role: "user", // user, admin, superadmin, finance, verificator
  referral_code: "JOHNDOE123",
  referred_by: "FRIEND456",
  balance_NSL: 1500.50,
  balance_usdt: 65.24,
  vip_level: "VIP3",
  products: [
    {
      product_id: ObjectId("..."),
      purchase_date: Date,
      expires_at: Date,
      auto_renew: true,
      is_active: true
    }
  ],
  status: "active", // active, frozen, pending
  kyc_verified: true
}
```

### Products Collection

```javascript
{
  name: "VIP1", // VIP0-VIP9
  description: "Entry Level VIP",
  price_NSL: 100,
  price_usdt: 4.35,
  daily_income_NSL: 5,
  validity_days: 60,
  benefits: ["Benefit 1", "Benefit 2"],
  active: true
}
```

### Transactions Collection

```javascript
{
  user_id: ObjectId("..."),
  type: "recharge", // recharge, withdrawal, income, referral_bonus, purchase, renewal
  product_id: ObjectId("..."), // if purchase/renewal
  amount_NSL: 100,
  amount_usdt: 4.35,
  status: "pending", // pending, approved, rejected, completed
  approved_by: ObjectId("..."),
  notes: "Transaction notes",
  timestamp: Date
}
```

---

## Indexes Created

The following indexes are automatically created for optimal performance:

### Users Indexes
- `username` (unique)
- `phone` (unique)
- `email` (unique, sparse)
- `referral_code` (unique, sparse)

### Transactions Indexes
- `user_id`
- `status`
- `type`
- `timestamp` (descending)

### Notifications Indexes
- `user_id`, `read` (compound)
- `user_id`, `created_at` (compound, descending)
- `expires_at` (TTL index - auto-deletes expired)

### Chats Indexes
- `user_id`
- `admin_id`
- `status`
- `priority`, `last_message_at` (compound, descending)

---

## Backup and Restore

### Create Backup (MongoDB Atlas)

1. Go to MongoDB Atlas → Clusters
2. Click "..." → Backup
3. Configure backup schedule
4. Manual backup: Click "Take Snapshot Now"

### Restore from Backup

1. Go to MongoDB Atlas → Backups
2. Select backup snapshot
3. Click "Restore"
4. Choose restore target (new cluster or existing)

### Export Data (Manual)

```bash
# Export specific collection
mongoexport --uri="your_mongodb_uri" --collection=products --out=products_backup.json

# Export entire database
mongodump --uri="your_mongodb_uri" --out=backup_folder
```

### Import Data

```bash
# Import specific collection
mongoimport --uri="your_mongodb_uri" --collection=products --file=products_backup.json

# Restore entire database
mongorestore --uri="your_mongodb_uri" backup_folder
```

---

## Security Best Practices

1. **Change Default Passwords**
   - Change super admin password immediately after first login
   - Use strong passwords (min 12 characters, mixed case, numbers, symbols)

2. **Restrict Network Access**
   - MongoDB Atlas: Add only your server's IP instead of 0.0.0.0/0
   - For development: use VPN or specific IPs

3. **Use Environment Variables**
   - Never commit `.env` file to Git
   - Keep database credentials secure

4. **Enable Audit Logging**
   - MongoDB Atlas: Enable database auditing
   - Monitor for suspicious activity

5. **Regular Backups**
   - Configure automatic daily backups
   - Test restore procedure periodically

---

## Next Steps

After database setup:

1. ✅ **Start Backend Server**
   ```bash
   cd D:\leo\finalmoney\backend
   npm start
   ```

2. ✅ **Start Frontend Server**
   ```bash
   cd D:\leo\finalmoney\frontend
   npm run dev
   ```

3. ✅ **Test Application**
   - Login as super admin
   - Create test user account
   - Make test purchase
   - Test withdrawal request

4. ✅ **Configure Email Service** (Optional but recommended)
   - Update EMAIL_* variables in `.env`
   - Test email notifications

5. ✅ **Deploy to Production**
   - Follow `VERCEL_DEPLOYMENT_GUIDE.md`

---

## Support

If you encounter issues:

1. Check this troubleshooting guide
2. Review backend logs
3. Check MongoDB Atlas metrics
4. Verify environment variables

**Database is working when**:
- ✅ Can connect from backend
- ✅ Collections are created
- ✅ Can login as super admin
- ✅ Products display in frontend

---

**Good luck! Your SalonMoney database is ready to power your application.** 🚀
