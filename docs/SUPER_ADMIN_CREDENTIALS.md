# Super Admin Account - Login Credentials

## ✅ Super Admin Account Created Successfully!

Your super admin account has been created with **ALL PRIVILEGES**.

---

## 🔐 Login Credentials

### Option 1: Login with Username
- **Username:** `superadmin`
- **Password:** `Admin@SuperSecure2024!`

### Option 2: Login with Email
- **Email:** `admin@salonmoney.com`
- **Password:** `Admin@SuperSecure2024!`

### Option 3: Login with Phone
- **Phone:** `+232777777777`
- **Password:** `Admin@SuperSecure2024!`

---

## 🎯 Account Details

| Field | Value |
|-------|-------|
| **Username** | superadmin |
| **Email** | admin@salonmoney.com |
| **Phone** | +232777777777 |
| **Role** | superadmin |
| **Status** | active |
| **VIP Level** | VIP8 |
| **Email Verified** | ✅ Yes |
| **KYC Verified** | ✅ Yes |
| **2FA Enabled** | ❌ No (can enable later) |
| **Auth Provider** | local |

---

## 🚀 How to Login

### Method 1: Web Interface
1. Go to: http://localhost:3000/login
2. Enter username: `superadmin`
3. Enter password: `Admin@SuperSecure2024!`
4. Click "Sign In"
5. You'll be redirected to: `/admin` (admin dashboard)

### Method 2: API (for testing)
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "superadmin",
    "password": "Admin@SuperSecure2024!"
  }'
```

---

## 🔒 Super Admin Privileges

As a super admin, you have access to:

✅ **Admin Dashboard** - Full access to `/admin` panel
✅ **User Management** - Create, edit, delete users
✅ **Role Management** - Assign roles to users
✅ **Account Status** - Approve/freeze/activate accounts
✅ **Financial Operations** - Manage balances, transactions
✅ **VIP Levels** - Assign VIP levels to users
✅ **Referral System** - View and manage referrals
✅ **KYC Verification** - Approve/reject KYC documents
✅ **System Settings** - Configure platform settings
✅ **Transaction History** - View all transactions
✅ **Product Management** - Manage products/investments
✅ **Reports & Analytics** - Access all reports

---

## 📝 Change Password (Recommended)

For security, you should change the default password after first login:

### Via Web Interface:
1. Login to admin dashboard
2. Go to Profile/Settings
3. Change password

### Via API:
```bash
curl -X POST http://localhost:5000/api/auth/change-password \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "oldPassword": "Admin@SuperSecure2024!",
    "newPassword": "YourNewSecurePassword123!"
  }'
```

---

## 🔐 Enable Two-Factor Authentication (Optional)

For extra security, you can enable 2FA:

```bash
curl -X POST http://localhost:5000/api/auth/toggle-2fa \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "enable": true,
    "email": "admin@salonmoney.com"
  }'
```

After enabling 2FA, you'll receive a 6-digit code via email each time you login.

---

## ⚙️ Update Credentials in .env

The super admin credentials are configured in `backend/.env`:

```env
# Admin Settings
SUPER_ADMIN_USERNAME=superadmin
SUPER_ADMIN_EMAIL=admin@salonmoney.com
SUPER_ADMIN_PHONE=+232777777777
SUPER_ADMIN_PASSWORD=Admin@SuperSecure2024!
```

You can change these values and re-run the script to update the account:

```bash
cd backend
npm run seed:admin
```

---

## 🛠️ Recreate Super Admin

If you ever need to recreate or update the super admin account:

```bash
cd backend
npm run seed:admin
```

The script will:
- ✅ Check if super admin exists
- ✅ Update existing account with all privileges
- ✅ Or create new account if none exists

---

## 📊 Testing Super Admin Access

### Test Dashboard Access:
1. Login with credentials above
2. Should redirect to `/admin` instead of `/dashboard`
3. Verify you can access all admin features

### Test API Access:
```bash
# 1. Login
TOKEN=$(curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"superadmin","password":"Admin@SuperSecure2024!"}' \
  | jq -r '.token')

# 2. Get current user
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer $TOKEN"

# Should return role: "superadmin"
```

---

## 🚨 Security Warnings

⚠️ **IMPORTANT SECURITY NOTES:**

1. **Change Default Password**
   - The default password is publicly visible in this file
   - Change it immediately after first login

2. **Protect Credentials**
   - Never share super admin credentials
   - Don't commit `.env` file to git
   - Use strong, unique passwords

3. **Enable 2FA**
   - Highly recommended for super admin accounts
   - Adds extra layer of security

4. **Monitor Access**
   - Review admin login logs regularly
   - Check for suspicious activity
   - Limit super admin accounts

5. **Production Security**
   - Use different credentials for production
   - Store secrets securely (AWS Secrets Manager, etc.)
   - Enable IP whitelisting for admin access

---

## 📞 Need Help?

If you have issues logging in:
1. Verify backend server is running: `cd backend && npm run dev`
2. Verify frontend server is running: `cd frontend && npm run dev`
3. Check MongoDB connection in backend logs
4. Verify credentials match `.env` file
5. Try running `npm run seed:admin` again

---

## ✅ Quick Start Checklist

- [x] Super admin account created
- [ ] Change default password
- [ ] Enable 2FA (optional but recommended)
- [ ] Test admin dashboard access
- [ ] Test user management features
- [ ] Configure production credentials

---

**Last Updated:** Created with all login system features
**Status:** ✅ Active and Ready to Use
**Login URL:** http://localhost:3000/login
