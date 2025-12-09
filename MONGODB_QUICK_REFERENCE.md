# MongoDB Quick Reference - SalonMoney

## Quick Setup (1 Command)

```bash
cd D:\leo\finalmoney\backend
node scripts/mongodb/seed_all.js
```

This creates everything: collections, admin, products, currencies.

---

## Connection String Format

```
mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/finalmoney?retryWrites=true&w=majority
```

**Replace**:
- `USERNAME` → Your MongoDB username
- `PASSWORD` → Your MongoDB password
- `CLUSTER` → Your cluster name (e.g., salonmoney-cluster.eenfnqt)

**Add to**: `backend/.env` → `MONGODB_URI=...`

---

## Collections Overview

| Collection | Documents | Purpose |
|------------|-----------|---------|
| users | Dynamic | User accounts, balances |
| products | 8 fixed | VIP1-VIP8 packages |
| transactions | Dynamic | All financial transactions |
| referrals | Dynamic | Referral tracking |
| currencyrates | 12 fixed | Exchange rates |
| notifications | Dynamic | User notifications |
| chats | Dynamic | Support messages |

---

## Default Super Admin

**After running seed script**:

```
Username: superadmin (or SUPER_ADMIN_USERNAME from .env)
Phone: +232777777777 (or SUPER_ADMIN_PHONE from .env)
Password: Admin@123456 (or SUPER_ADMIN_PASSWORD from .env)
```

**⚠️ Change password immediately after first login!**

---

## VIP Products Created

| Product | Price NSL | Price USDT | Daily Income | Validity |
|---------|-----------|------------|--------------|----------|
| VIP1 | 100 | $4.35 | 5 NSL | 60 days |
| VIP2 | 500 | $21.74 | 28 NSL | 60 days |
| VIP3 | 1,500 | $65.22 | 90 NSL | 60 days |
| VIP4 | 3,500 | $152.17 | 220 NSL | 60 days |
| VIP5 | 8,000 | $347.83 | 520 NSL | 60 days |
| VIP6 | 15,000 | $652.17 | 1,050 NSL | 60 days |
| VIP7 | 30,000 | $1,304.35 | 2,250 NSL | 60 days |
| VIP8 | 60,000 | $2,608.70 | 4,800 NSL | 60 days |

**Conversion Rate**: 1 USDT = 23 NSL

---

## Currency Rates Created

USD, EUR, GBP, JPY, CNY, AED, CAD, AUD, INR, NGN, ZAR, SLL

All rates convert to both USD and NSL automatically.

---

## Useful Commands

### Start Backend

```bash
cd D:\leo\finalmoney\backend
npm start
```

### Start Frontend

```bash
cd D:\leo\finalmoney\frontend
npm run dev
```

### Seed Products Only

```bash
cd D:\leo\finalmoney\backend
node scripts/seed/seedProducts.js
```

### Create Admin Only

```bash
cd D:\leo\finalmoney\backend
node scripts/admin/createSuperAdmin.js
```

### Seed Currencies Only

```bash
cd D:\leo\finalmoney\backend
node scripts/seed/seedCurrencies.js
```

### Initialize Database (indexes only)

```bash
cd D:\leo\finalmoney\backend
node scripts/mongodb/init_database.js
```

---

## MongoDB Atlas UI - Manual Import

### Import Products

1. MongoDB Atlas → finalmoney database → products collection
2. Click "INSERT DOCUMENT" → Switch to JSON view
3. Copy/paste from: `backend/scripts/mongodb/data/products.json`
4. Click "Insert"

### Import Currencies

1. MongoDB Atlas → finalmoney database → currencyrates collection
2. Click "INSERT DOCUMENT" → Switch to JSON view
3. Copy/paste from: `backend/scripts/mongodb/data/currencies.json`
4. Click "Insert"

---

## Environment Variables (backend/.env)

```env
# Required for Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/finalmoney

# Required for Admin Creation
SUPER_ADMIN_USERNAME=your_admin_username
SUPER_ADMIN_EMAIL=admin@yourdomain.com
SUPER_ADMIN_PHONE=+1234567890
SUPER_ADMIN_PASSWORD=YourStrongPassword123!

# Required for JWT
JWT_SECRET=your_secret_key_32_chars_minimum
REFRESH_TOKEN_SECRET=another_secret_key
```

---

## Test Database Connection

```bash
cd D:\leo\finalmoney\backend
node -e "const mongoose = require('mongoose'); require('dotenv').config(); mongoose.connect(process.env.MONGODB_URI).then(() => console.log('✅ Connected!')).catch(e => console.log('❌ Failed:', e.message));"
```

---

## Health Check Endpoints

**Backend Health**:
```
http://localhost:5000/api/health
```

**Expected Response**:
```json
{
  "status": "Server is running",
  "timestamp": "2025-01-01T00:00:00.000Z"
}
```

---

## Common Issues & Fixes

### "Cannot connect to MongoDB"

✅ Check `MONGODB_URI` in `.env`
✅ Verify MongoDB Atlas IP whitelist (add 0.0.0.0/0)
✅ Check database user credentials

### "Super admin already exists"

✅ Normal - admin was already created
✅ Use existing credentials or delete user from MongoDB Atlas

### "Products already exist"

✅ Normal - products were already created
✅ Skip seed or delete products collection and re-import

### "Password hash mismatch"

✅ Run `node scripts/admin/createSuperAdmin.js` again
✅ Password is hashed automatically - use plain text in .env

---

## File Locations

```
D:\leo\finalmoney/
├── backend/
│   ├── scripts/
│   │   ├── mongodb/
│   │   │   ├── seed_all.js         ← ALL-IN-ONE SEED SCRIPT
│   │   │   ├── init_database.js    ← Create indexes only
│   │   │   └── data/
│   │   │       ├── products.json   ← VIP products JSON
│   │   │       └── currencies.json ← Currency rates JSON
│   │   ├── admin/
│   │   │   └── createSuperAdmin.js ← Create admin only
│   │   └── seed/
│   │       ├── seedProducts.js     ← Seed products only
│   │       └── seedCurrencies.js   ← Seed currencies only
│   └── .env                        ← Configure connection string
└── MONGODB_SETUP_GUIDE.md          ← Full documentation
```

---

## Backup Commands

### Export Collection

```bash
mongoexport --uri="mongodb+srv://..." --collection=products --out=products.json
```

### Import Collection

```bash
mongoimport --uri="mongodb+srv://..." --collection=products --file=products.json
```

---

## Production Checklist

Before deploying:

- [ ] Change super admin password
- [ ] Generate strong JWT secrets
- [ ] Restrict MongoDB Atlas IP whitelist
- [ ] Enable database backups
- [ ] Test all CRUD operations
- [ ] Verify cron jobs run correctly

---

## Support & Resources

- **Full Guide**: `MONGODB_SETUP_GUIDE.md`
- **Deployment**: `VERCEL_DEPLOYMENT_GUIDE.md`
- **MongoDB Atlas**: https://cloud.mongodb.com
- **MongoDB Docs**: https://docs.mongodb.com

---

**Remember**: Run `seed_all.js` once to set up everything! 🚀
