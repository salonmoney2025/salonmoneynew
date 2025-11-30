const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'backend', 'routes', 'finance.js');
let content = fs.readFileSync(filePath, 'utf8');

// Add FEE import if not already present
if (!content.includes("const { FEE } = require('../config/constants');")) {
  content = content.replace(
    "const notificationService = require('../utils/notificationService');",
    "const notificationService = require('../utils/notificationService');\nconst { FEE } = require('../config/constants');"
  );
}

// Replace the recharge logic
const oldCode = `    if (transaction.type === 'recharge') {
      user.balance_NSL += transaction.amount_NSL;
      // Removed: user.balance_usdt += transaction.amount_usdt;
    } else if (transaction.type === 'withdrawal') {`;

const newCode = `    if (transaction.type === 'recharge') {
      // Apply 15% fee for standard users, no fee for super admin
      let creditAmount = transaction.amount_NSL;
      let rechargeFee = 0;

      if (user.role !== 'superadmin') {
        // Standard user - apply 15% fee
        rechargeFee = (transaction.amount_NSL * FEE.RECHARGE_FEE_PERCENTAGE) / 100;
        creditAmount = transaction.amount_NSL - rechargeFee;
      }
      // Super admin gets full amount (no fee)

      user.balance_NSL += creditAmount;

      // Log fee details
      logger.info(\`Recharge approved: User \${user.phone}, Amount: \${transaction.amount_NSL} NSL, Fee: \${rechargeFee.toFixed(2)} NSL, Credited: \${creditAmount.toFixed(2)} NSL\`);

      // Update transaction notes with fee info
      if (rechargeFee > 0) {
        transaction.notes = \`\${transaction.notes || 'Recharge approved'} - Fee: \${rechargeFee.toFixed(2)} NSL (\${FEE.RECHARGE_FEE_PERCENTAGE}%)\`;
      }
      // Removed: user.balance_usdt += transaction.amount_usdt;
    } else if (transaction.type === 'withdrawal') {`;

content = content.replace(oldCode, newCode);

fs.writeFileSync(filePath, content);
console.log('✅ Updated finance.js with recharge fee logic');
