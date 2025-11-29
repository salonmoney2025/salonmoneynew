# Quick Start Guide - Enhanced Login Features

## Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

This installs the new `nodemailer` package.

## Step 2: Configure Email (Required)

Edit `backend/.env` and update these lines:

```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-actual-email@gmail.com
EMAIL_PASSWORD=your-app-password-here
EMAIL_FROM=noreply@salonmoney.com
FRONTEND_URL=http://localhost:3000
```

### Get Gmail App Password:
1. Go to https://myaccount.google.com/security
2. Enable "2-Step Verification"
3. Go to "App passwords"
4. Generate password for "Mail"
5. Copy the 16-character password
6. Paste it as `EMAIL_PASSWORD`

## Step 3: Start Your Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## Step 4: Test the Features

### Test Forgot Password:
1. Go to http://localhost:3000/login
2. Click "Forgot password?"
3. Enter your email
4. Check your email inbox
5. Click the reset link
6. Set new password

### Test Remember Me:
1. Login with "Remember me" checked
2. Close browser
3. Reopen and go to dashboard
4. You should still be logged in

### Test 2FA (Optional):
First, enable 2FA for a user using this API call:

```bash
# Login first to get a token
# Then enable 2FA:
curl -X POST http://localhost:5000/api/auth/toggle-2fa \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"enable":true,"email":"your-email@gmail.com"}'
```

Then login - you'll receive a 6-digit code via email.

## New Pages Available:

- http://localhost:3000/login (Enhanced UI)
- http://localhost:3000/forgot-password
- http://localhost:3000/reset-password/[token]
- http://localhost:3000/verify-2fa

## Troubleshooting:

**Emails not sending?**
- Check EMAIL_USER and EMAIL_PASSWORD are correct
- Make sure you're using an App Password, not your regular password
- Check spam folder
- Look at backend terminal for error messages

**2FA not working?**
- Make sure user has email in database
- Code expires after 10 minutes
- Each code can only be used once

**Remember Me not working?**
- Clear browser localStorage
- Check browser allows cookies/storage
- Verify tokens in browser DevTools > Application > Local Storage

## That's it!

Your login system now has:
- Password reset functionality
- Remember me feature
- Two-factor authentication
- Beautiful, modern UI

See `LOGIN_FEATURES.md` for detailed documentation.
