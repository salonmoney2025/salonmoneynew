# Login System - New Features Guide

## Overview
Your login system has been enhanced with the following features:
- **Forgot Password** - Email-based password reset
- **Remember Me** - Extended login sessions
- **Two-Factor Authentication (2FA)** - Email-based verification codes
- **Improved UI/UX** - Modern design with smooth animations

---

## Setup Instructions

### 1. Install Dependencies

Navigate to the backend folder and install nodemailer:
```bash
cd backend
npm install
```

This will install the newly added `nodemailer` package for email functionality.

### 2. Configure Email Settings

Update the following environment variables in `backend/.env`:

```env
# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
EMAIL_FROM=noreply@salonmoney.com

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

#### For Gmail:
1. Go to your Google Account settings
2. Enable 2-Step Verification
3. Generate an App Password:
   - Go to Security > 2-Step Verification > App passwords
   - Select "Mail" and your device
   - Copy the 16-character password
   - Use this as `EMAIL_PASSWORD`

#### For Other Email Services:
Change `EMAIL_SERVICE` to:
- `outlook` for Outlook/Hotmail
- `yahoo` for Yahoo Mail
- Or configure custom SMTP settings

### 3. Database Migration

The User model now includes new fields:
- `email` - User's email address (optional, required for password reset and 2FA)
- `resetPasswordToken` - Token for password reset
- `resetPasswordExpires` - Expiration time for reset token
- `twoFactorEnabled` - Whether 2FA is enabled
- `twoFactorCode` - Current 2FA code
- `twoFactorExpires` - Expiration time for 2FA code

No manual migration needed - Mongoose will handle the new fields automatically.

---

## Features Guide

### 1. Forgot Password

**User Flow:**
1. Click "Forgot password?" on login page
2. Enter email address
3. Receive password reset email
4. Click link in email
5. Enter new password
6. Redirected to login

**API Endpoints:**
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password/:token` - Reset password with token

**Pages:**
- `/forgot-password` - Request reset
- `/reset-password/[token]` - Reset password form

### 2. Remember Me

**User Flow:**
1. Check "Remember me" checkbox on login
2. Token validity extended to 30 days (vs 24 hours)
3. Refresh token extended to 90 days (vs 7 days)

**Implementation:**
- Checkbox state passed to login API
- Backend adjusts token expiration times
- No additional configuration needed

### 3. Two-Factor Authentication (2FA)

**Setup (User):**
1. User must have email address in profile
2. Call `/api/auth/toggle-2fa` to enable
3. Provide email address when enabling

**Login Flow:**
1. User enters username and password
2. If 2FA enabled, 6-digit code sent to email
3. User redirected to verification page
4. Enter 6-digit code
5. Code valid for 10 minutes
6. Upon success, logged in normally

**API Endpoints:**
- `POST /api/auth/toggle-2fa` - Enable/disable 2FA (Protected)
- `POST /api/auth/verify-2fa` - Verify 2FA code (Public)

**Pages:**
- `/verify-2fa` - 2FA verification page

**Example: Enable 2FA**
```javascript
// Protected endpoint - requires authentication
const response = await api.post('/auth/toggle-2fa', {
  enable: true,
  email: 'user@example.com'
});
```

**Example: Disable 2FA**
```javascript
const response = await api.post('/auth/toggle-2fa', {
  enable: false
});
```

### 4. UI/UX Improvements

**New Features:**
- Animated page transitions with fade-in effect
- Password visibility toggle (eye icon)
- Input field icons for better UX
- Hover effects and smooth transitions
- Loading spinner during authentication
- Improved responsive design
- Enhanced color scheme with gradients

**Animations:**
- `animate-fadeIn` - Page entrance animation
- `animate-pulse-subtle` - Subtle pulsing effect
- Scale transitions on buttons
- Smooth color transitions

---

## Testing Guide

### Test Forgot Password
1. Start backend and frontend servers
2. Configure email settings in `.env`
3. Navigate to `/login`
4. Click "Forgot password?"
5. Enter a valid email from your database
6. Check email for reset link
7. Click link and set new password

### Test Remember Me
1. Login with "Remember me" checked
2. Close browser completely
3. Reopen and navigate to dashboard
4. Should remain logged in (token persists)

### Test 2FA
1. Enable 2FA for a user via API:
   ```bash
   # Get auth token first by logging in
   # Then enable 2FA
   curl -X POST http://localhost:5000/api/auth/toggle-2fa \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"enable": true, "email": "user@example.com"}'
   ```
2. Logout and login again
3. Should receive 6-digit code via email
4. Enter code on verification page
5. Should login successfully

---

## Security Notes

### Password Reset
- Reset tokens expire after 1 hour
- Tokens are cryptographically random (32 bytes)
- Email doesn't reveal if account exists (security best practice)

### Two-Factor Authentication
- Codes are 6 digits (100,000 - 999,999)
- Codes expire after 10 minutes
- Codes stored hashed in database
- One-time use only

### Remember Me
- Longer token expiration times
- Tokens still validated on each request
- User can logout to invalidate tokens

### Email Security
- Use app-specific passwords, not account passwords
- Keep EMAIL_PASSWORD in .env (never commit)
- Consider using dedicated email service (SendGrid, Mailgun) for production

---

## Troubleshooting

### Email Not Sending
1. Check email credentials in `.env`
2. Verify Gmail App Password is correct
3. Check spam/junk folder
4. Review backend logs for errors
5. Test SMTP connection

### 2FA Code Not Working
1. Check code hasn't expired (10 min limit)
2. Verify email was received
3. Ensure user has 2FA enabled
4. Check backend logs

### Remember Me Not Working
1. Check browser allows localStorage
2. Verify token not expired
3. Check backend JWT_SECRET is consistent
4. Clear localStorage and try again

---

## Production Recommendations

1. **Use Environment-Specific Email Service**
   - Development: Gmail with app password
   - Production: SendGrid, AWS SES, or Mailgun

2. **Configure Proper Frontend URL**
   ```env
   FRONTEND_URL=https://yourdomain.com
   ```

3. **Secure Email Credentials**
   - Never commit .env files
   - Use secure secret management in production
   - Rotate passwords regularly

4. **Monitor Email Deliverability**
   - Track bounce rates
   - Monitor spam reports
   - Keep email templates updated

5. **Rate Limiting**
   - Limit password reset requests per IP
   - Limit 2FA attempts
   - Consider implementing in middleware

---

## API Reference

### Authentication Endpoints

#### POST /api/auth/login
Login with username and password
```json
{
  "username": "makemoney_doe",
  "password": "password123",
  "rememberMe": true
}
```

Response (Normal):
```json
{
  "message": "Login successful",
  "token": "jwt_token",
  "refreshToken": "refresh_token",
  "redirectTo": "/dashboard",
  "user": { /* user object */ }
}
```

Response (2FA Required):
```json
{
  "message": "2FA code sent to your email",
  "requiresTwoFactor": true,
  "userId": "user_id"
}
```

#### POST /api/auth/verify-2fa
Verify 2FA code
```json
{
  "userId": "user_id",
  "code": "123456"
}
```

#### POST /api/auth/forgot-password
Request password reset
```json
{
  "email": "user@example.com"
}
```

#### POST /api/auth/reset-password/:token
Reset password
```json
{
  "password": "newPassword123"
}
```

#### POST /api/auth/toggle-2fa (Protected)
Enable/disable 2FA
```json
{
  "enable": true,
  "email": "user@example.com"
}
```

---

## File Changes Summary

### Backend Files
- `backend/utils/emailService.js` - New email service
- `backend/models/User.js` - Added email and 2FA fields
- `backend/routes/auth.js` - Added new auth endpoints
- `backend/package.json` - Added nodemailer dependency
- `backend/.env` - Added email configuration

### Frontend Files
- `frontend/app/login/page.jsx` - Enhanced UI, added Remember Me and 2FA handling
- `frontend/app/forgot-password/page.jsx` - New page
- `frontend/app/reset-password/[token]/page.jsx` - New page
- `frontend/app/verify-2fa/page.jsx` - New page
- `frontend/store/auth.js` - Updated login function
- `frontend/styles/globals.css` - Added animations

---

## Support

If you encounter any issues:
1. Check backend logs for errors
2. Verify all environment variables are set
3. Ensure dependencies are installed
4. Test email service separately
5. Review this documentation

For additional help, check the main README.md or contact support.
