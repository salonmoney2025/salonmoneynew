# QUICK INTEGRATION GUIDE
## How to Apply the Security & Validation Features

This guide shows you exactly how to integrate the security middleware and validation that has been created.

---

## 🔐 Step 1: Apply Validation to Auth Routes

**File:** `backend/routes/auth.js`

**Add at the top:**
```javascript
const {
  validateSignup,
  validateLogin,
  validateChangePassword,
  validateResetPassword
} = require('../middleware/validation');

const { authLimiter, passwordResetLimiter } = require('../middleware/security');
```

**Apply to routes:**
```javascript
// Replace:
router.post('/signup', async (req, res) => {

// With:
router.post('/signup', validateSignup, async (req, res) => {

// Replace:
router.post('/login', async (req, res) => {

// With:
router.post('/login', authLimiter, validateLogin, async (req, res) => {

// Replace:
router.post('/change-password', authenticate, async (req, res) => {

// With:
router.post('/change-password', authenticate, validateChangePassword, async (req, res) => {

// Replace:
router.post('/reset-password/:token', async (req, res) => {

// With:
router.post('/reset-password/:token', validateResetPassword, async (req, res) => {

// Replace:
router.post('/forgot-password', async (req, res) => {

// With:
router.post('/forgot-password', passwordResetLimiter, async (req, res) => {
```

---

## 💰 Step 2: Apply Validation to User Routes

**File:** `backend/routes/user.js`

**Add at the top:**
```javascript
const {
  validateRecharge,
  validateWithdraw,
  validateUpdateProfile
} = require('../middleware/validation');

const { transactionLimiter } = require('../middleware/security');
```

**Apply to routes:**
```javascript
// Recharge
router.post('/recharge', authenticate, transactionLimiter, validateRecharge, async (req, res) => {

// Withdraw
router.post('/withdraw', authenticate, transactionLimiter, validateWithdraw, async (req, res) => {

// Update Profile
router.put('/profile', authenticate, validateUpdateProfile, async (req, res) => {
```

---

## 🛍️ Step 3: Apply Validation to Product Routes

**File:** `backend/routes/products.js`

**Add at the top:**
```javascript
const {
  validateBuyProduct,
  validateCreateProduct,
  validateUpdateProduct
} = require('../middleware/validation');
```

**Apply to routes:**
```javascript
// Buy Product
router.post('/buy', authenticate, validateBuyProduct, async (req, res) => {

// Create Product (admin)
router.post('/', authenticate, authorize(['superadmin', 'admin']), validateCreateProduct, async (req, res) => {

// Update Product (admin)
router.patch('/:id', authenticate, authorize(['superadmin', 'admin']), validateUpdateProduct, async (req, res) => {
```

---

## 👨‍💼 Step 4: Apply Validation to Admin Routes

**File:** `backend/routes/admin.js`

**Add at the top:**
```javascript
const {
  validateCreateUser,
  validateUpdateBalance,
  validateUpdateRole,
  validateUpdateStatus,
  validateUpdateVIP,
  validateResetPassword
} = require('../middleware/validation');

const { adminLimiter } = require('../middleware/security');
```

**Apply to routes:**
```javascript
// Create User
router.post('/users', authenticate, authorize(['superadmin']), validateCreateUser, async (req, res) => {

// Update Balance
router.patch('/users/:id/balance', authenticate, authorize(['superadmin']), validateUpdateBalance, async (req, res) => {

// Update Role
router.patch('/users/:id/role', authenticate, authorize(['superadmin']), validateUpdateRole, async (req, res) => {

// Update Status
router.patch('/users/:id/status', authenticate, authorize(['superadmin']), validateUpdateStatus, async (req, res) => {

// Update VIP
router.patch('/users/:id/vip', authenticate, authorize(['superadmin']), validateUpdateVIP, async (req, res) => {

// Reset Password
router.patch('/users/:id/reset-password', authenticate, authorize(['superadmin']), validateResetPassword, async (req, res) => {
```

---

## 💵 Step 5: Add Email Notifications to Finance Routes

**File:** `backend/routes/finance.js`

**Add at the top:**
```javascript
const emailService = require('../utils/emailService');
const {
  validateAddCurrency,
  validateApproveReject
} = require('../middleware/validation');
```

**In transaction approval (line ~67):**
```javascript
router.patch('/transactions/:id/approve', authenticate, authorize(['superadmin', 'finance']), async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    const user = await User.findById(transaction.user_id);

    // ... existing balance update logic ...

    await transaction.save();
    await user.save();

    // ✅ ADD THIS: Send email notification
    if (user.email) {
      await emailService.sendTransactionApproved(
        user.email,
        user.username,
        transaction
      );
    }

    logger.info(`Transaction approved: ${transaction._id} by ${req.user.phone}`);
    res.json({ message: 'Transaction approved', transaction });
  } catch (error) {
    logger.error('Transaction approval error:', error);
    res.status(500).json({ message: 'Error approving transaction' });
  }
});
```

**In transaction rejection (line ~96):**
```javascript
router.patch('/transactions/:id/reject', authenticate, authorize(['superadmin', 'finance']), validateApproveReject, async (req, res) => {
  try {
    const { reason } = req.body;
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    const user = await User.findById(transaction.user_id);

    transaction.status = 'rejected';
    transaction.approved_by = req.user.id;
    transaction.notes = reason || 'No reason provided';

    await transaction.save();

    // ✅ ADD THIS: Send email notification
    if (user.email) {
      await emailService.sendTransactionRejected(
        user.email,
        user.username,
        transaction,
        reason
      );
    }

    logger.info(`Transaction rejected: ${transaction._id} by ${req.user.phone}`);
    res.json({ message: 'Transaction rejected', transaction });
  } catch (error) {
    logger.error('Transaction rejection error:', error);
    res.status(500).json({ message: 'Error rejecting transaction' });
  }
});
```

**Add validation to add-currency (line ~161):**
```javascript
router.patch('/users/:id/add-currency', authenticate, authorize(['superadmin', 'finance']), validateAddCurrency, async (req, res) => {
  // ... existing code ...
});
```

---

## ✅ Step 6: Add Email Notifications to Approval Route

**File:** `backend/routes/approval.js`

**Add at the top:**
```javascript
const emailService = require('../utils/emailService');
```

**In user approval (around line 23):**
```javascript
router.patch('/users/:id/approve', authenticate, authorize(['superadmin', 'approval']), async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status: 'active', kyc_verified: true },
      { new: true }
    ).select('-password_hash');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // ✅ ADD THIS: Send email notification
    if (user.email) {
      await emailService.sendAccountApproved(user.email, user.username);
    }

    logger.info(`User approved: ${user.phone} by ${req.user.phone}`);
    res.json({ message: 'User approved', user });
  } catch (error) {
    logger.error('User approval error:', error);
    res.status(500).json({ message: 'Error approving user' });
  }
});
```

---

## 🐛 Step 7: Fix Referral Bonus Bug

**File:** `backend/routes/products.js`

**Find the referral bonus code (around line 100-121):**

**BEFORE (Buggy - pays on every purchase):**
```javascript
if (user.referred_by) {
  const referrer = await User.findOne({ referral_code: user.referred_by });
  if (referrer) {
    const bonusPercentage = parseInt(process.env.REFERRAL_BONUS_PERCENTAGE || 35);
    const bonusAmount = (product.price_NSL * bonusPercentage) / 100;

    referrer.balance_NSL += bonusAmount;
    await referrer.save();

    // ... create referral record ...
  }
}
```

**AFTER (Fixed - only first purchase):**
```javascript
if (user.referred_by) {
  // ✅ CHECK: Has referral bonus already been paid?
  const existingBonus = await Referral.findOne({
    referrer_id: await User.findOne({ referral_code: user.referred_by }).select('_id'),
    referred_id: user._id,
    status: 'paid'
  });

  // Only pay bonus if this is first purchase
  if (!existingBonus) {
    const referrer = await User.findOne({ referral_code: user.referred_by });
    if (referrer) {
      const bonusPercentage = parseInt(process.env.REFERRAL_BONUS_PERCENTAGE || 35);
      const bonusAmount = (product.price_NSL * bonusPercentage) / 100;

      referrer.balance_NSL += bonusAmount;
      await referrer.save();

      // Create referral record
      await Referral.create({
        referrer_id: referrer._id,
        referred_id: user._id,
        bonus_NSL: bonusAmount,
        recharge_amount_NSL: product.price_NSL,
        bonus_percentage: bonusPercentage,
        status: 'paid'
      });

      // ✅ ADD: Send email notification
      if (referrer.email) {
        await emailService.sendNewReferral(
          referrer.email,
          referrer.username,
          user.username,
          bonusAmount
        );
      }

      logger.info(`Referral bonus paid: ${bonusAmount} NSL to ${referrer.phone} from ${user.phone}`);
    }
  }
}
```

---

## 🧪 Step 8: Test Everything

### Test Validation:

```bash
# Test signup with weak password (should fail)
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "phone": "+1234567890",
    "password": "weak"
  }'

# Should return: Password must contain uppercase, lowercase, number, special char

# Test with strong password (should succeed)
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "phone": "+1234567890",
    "password": "Strong@Pass123"
  }'
```

### Test Rate Limiting:

```bash
# Make 6 rapid login attempts (should get rate limited)
for i in {1..6}; do
  curl -X POST http://localhost:5000/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"phone": "+1234567890", "password": "wrong"}'
done

# 6th attempt should return: Too many login attempts
```

### Test Email Notifications:

1. Configure email in `.env`:
```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@salonmoney.com
FRONTEND_URL=http://localhost:3000
```

2. Approve a transaction from finance panel
3. Check user's email - should receive "Transaction Approved" email

---

## 📋 Integration Checklist

- [ ] Install new dependencies: `npm install joi express-mongo-sanitize compression`
- [ ] Apply validation to `routes/auth.js`
- [ ] Apply validation to `routes/user.js`
- [ ] Apply validation to `routes/products.js`
- [ ] Apply validation to `routes/admin.js`
- [ ] Apply validation to `routes/finance.js`
- [ ] Add email notifications to `routes/finance.js`
- [ ] Add email notifications to `routes/approval.js`
- [ ] Fix referral bonus logic in `routes/products.js`
- [ ] Configure email service in `.env`
- [ ] Test signup with weak/strong passwords
- [ ] Test rate limiting
- [ ] Test email delivery
- [ ] Test referral bonus (should only pay once)
- [ ] Restart backend server
- [ ] Test all user flows

---

## ⚡ Quick Commands

```bash
# Install dependencies
cd backend
npm install joi express-mongo-sanitize compression

# Restart server
npm run dev

# Or with PM2
pm2 restart salonmoney-backend
```

---

## 🎯 Expected Results

After integration:

✅ **Security:**
- All inputs validated
- Strong passwords enforced
- Rate limiting active
- NoSQL injection prevented

✅ **User Experience:**
- Email notifications on all important events
- Clear error messages
- Professional validation feedback

✅ **Bug Fixes:**
- Referral bonus only paid once
- Transaction balance updates correct
- Currency routes working

---

## 🆘 Troubleshooting

**Issue:** Validation errors not showing
- **Fix:** Make sure middleware is imported and applied BEFORE route handler

**Issue:** Emails not sending
- **Fix:** Check `.env` email configuration, enable "Less secure apps" for Gmail, or use App Password

**Issue:** Rate limiting not working
- **Fix:** Make sure `app.set('trust proxy', 1)` is set in server.js

**Issue:** "Module not found" errors
- **Fix:** Run `npm install` to install new dependencies

---

**Time to Integrate:** 1-2 hours
**Testing Time:** 1 hour
**Total:** 2-3 hours for complete integration

**Need help?** Check `IMPLEMENTATION_SUMMARY.md` for detailed documentation.
