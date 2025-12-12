# 💰 SalonMoney Platform

**Version:** 1.0.0
**Status:** Production Ready ✅
**Last Updated:** December 11, 2025

---

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/yourusername/salonmoneynew.git
cd salonmoneynew

# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Configure environment
# Copy backend/envexample to backend/.env and configure
# Copy frontend/.env.example to frontend/.env.local and configure

# Setup database
cd backend
npm run seed:admin
npm run seed:products

# Run servers
npm run dev  # Backend (Terminal 1)
cd ../frontend && npm run dev  # Frontend (Terminal 2)
```

**Access:** http://localhost:3000
**Login:** Use the superadmin credentials created during setup

---

## 🎯 Features

- ✅ User authentication with JWT & 2FA
- ✅ OAuth (Google, Facebook)
- ✅ 9 VIP investment packages (VIP0-VIP9)
- ✅ Daily income generation
- ✅ Referral system (35% bonus)
- ✅ Binance API integration
- ✅ Multi-currency support (12+ currencies)
- ✅ Real-time chat support
- ✅ Admin dashboards
- ✅ Transaction management
- ✅ Rate limiting & security
- ✅ KYC verification with OCR
- ✅ Email notifications

---

## 📁 Project Structure

```
salonmoneynew/
├── backend/           # Node.js + Express API
├── frontend/          # Next.js 14 application
├── docs/              # Documentation
└── README.md          # This file
```

---

## 🔐 Admin Access

Create superadmin using: `npm run seed:admin`

⚠️ **Never commit credentials to version control!**

---

## 💻 Tech Stack

**Backend:** Node.js, Express, MongoDB, Socket.io, Binance API
**Frontend:** Next.js 14, React 18, Tailwind CSS
**Database:** MongoDB Atlas
**Real-time:** Socket.io
**Security:** JWT, bcrypt, Helmet, Rate Limiting

---

## 📚 Documentation

See the [docs](./docs/) folder for detailed guides:
- [Quick Start Guide](./docs/QUICK_START.md)
- [Login Features](./docs/LOGIN_FEATURES.md)
- [Recharge System](./docs/RECHARGE_SYSTEM_GUIDE.md)
- [Super Admin Credentials](./docs/SUPER_ADMIN_CREDENTIALS.md)
- And more...

---

**Built with ❤️ by the SalonMoney Team**
