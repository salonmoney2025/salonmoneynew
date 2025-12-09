# ⚡ Quick Start - Rate Limit Dashboard

**Get up and running in 2 minutes!**

---

## 🚀 Step-by-Step

### 1. Start the Servers

**Backend:**
```bash
cd D:\leo\finalmoney\backend
npm run dev
```
Wait for: ✅ Server running on port 5000

**Frontend (New Terminal):**
```bash
cd D:\leo\finalmoney\frontend
npm run dev
```
Wait for: ✅ Ready on http://localhost:3000

---

### 2. Login as SuperAdmin

Open: http://localhost:3000/login

```
Username: wisrado
Password: Makeni@2025?.
```

Click **Login**

---

### 3. Access the Dashboard

**Method 1: Direct URL**
```
http://localhost:3000/admin/rate-limits
```

**Method 2: Add to Navigation** (Optional)

Edit your admin navbar/sidebar to include:
```jsx
<Link href="/admin/rate-limits" className="nav-link">
  <Shield className="w-4 h-4" />
  <span>Rate Limits</span>
</Link>
```

---

## 🎯 What You'll See

### Dashboard Layout:

```
┌────────────────────────────────────────────────┐
│  🛡️  Rate Limit Dashboard           [Refresh] │
│  Manage API rate limits and restrictions       │
│                                                 │
│  ℹ️  Your Current IP Address                   │
│  ::1                                            │
└────────────────────────────────────────────────┘

┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ Global API      │ │ Authentication  │ │ Transaction     │
│ Limiter         │ │ Limiter         │ │ Limiter         │
│                 │ │                 │ │                 │
│ 5 min / 1000    │ │ 5 min / 100     │ │ 1 hour / 100    │
└─────────────────┘ └─────────────────┘ └─────────────────┘

┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ Admin Actions   │ │ Finance         │ │ Password Reset  │
│ Limiter         │ │ Limiter         │ │ Limiter         │
│                 │ │                 │ │                 │
│ 1 min / 60      │ │ 5 min / 60      │ │ 1 hour / 10     │
└─────────────────┘ └─────────────────┘ └─────────────────┘

⚠️  Automatic Reset
Rate limits automatically reset after their window time

┌─ Reset Actions ────────────────────────────────┐
│                                                 │
│  Reset Your IP                [Reset My Limits]│
│                                                 │
│  Reset Specific IP                              │
│  [IP Address Input]              [Reset IP]    │
│                                                 │
│  ⚠️  Important Note                             │
│  Rate limits auto-expire after time window     │
└────────────────────────────────────────────────┘
```

---

## 🎮 How to Use

### View Rate Limits
**Just look!** - All info is displayed automatically

### Reset Your IP
1. Click **"Reset My Limits"** button
2. See success toast: ✅ "Rate limits reset requested"
3. Done!

### Reset Another IP
1. Type IP address (e.g., `192.168.1.100`)
2. Click **"Reset IP"** button
3. See success toast
4. Input clears automatically

### Refresh Data
- Click **"Refresh"** button in top-right
- Data reloads
- Loading spinner shows briefly

---

## 💡 Pro Tips

### Tip 1: Bookmark It
```
Ctrl/Cmd + D
→ http://localhost:3000/admin/rate-limits
```

### Tip 2: Check Your IP
Your current IP is shown at the top in a blue box

### Tip 3: Understand Auto-Reset
- **5 min limiters:** Reset every 5 minutes
- **1 hour limiters:** Reset every 60 minutes
- **Manual reset:** Logs request but limits auto-expire anyway

### Tip 4: Development vs Production
Current limits are HIGH for development:
- Global: 1000 requests / 5 min
- Auth: 100 attempts / 5 min

For production, lower these in `backend/middleware/security.js`

---

## 🔍 Quick Troubleshooting

### Can't Access Dashboard?
```bash
# Check you're logged in as superadmin
# Role must be: superadmin (not admin, not user)
```

### Dashboard Shows Loading?
```bash
# Check backend is running on port 5000
curl http://localhost:5000/api/health

# Should return: {"status": "Server is running"}
```

### Reset Button Doesn't Work?
```bash
# Check browser console (F12)
# Look for error messages
# Verify network tab shows API call
```

---

## 📞 Need Help?

### Check Documentation:
- Full Guide: `RATE_LIMIT_DASHBOARD.md`
- Rate Limit Fix: `RATE_LIMIT_FIX.md`

### Check Logs:
```bash
# Backend logs
type D:\leo\finalmoney\backend\logs\combined.log

# Error logs
type D:\leo\finalmoney\backend\logs\error.log
```

### Test API Directly:
```bash
# Get rate limit info
curl http://localhost:5000/api/admin/rate-limit-info \
  -H "Authorization: Bearer <YOUR_TOKEN>"

# Reset limits
curl -X POST http://localhost:5000/api/admin/reset-limits \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -H "Content-Type: application/json"
```

---

## ✅ Success Checklist

When everything works, you should see:
- [x] Dashboard loads without errors
- [x] 6 rate limiter cards displayed
- [x] Current IP shown in blue box
- [x] Reset buttons are clickable
- [x] Toast notifications appear
- [x] No errors in console

---

## 🎉 You're Ready!

The Rate Limit Dashboard is now available at:

**URL:** http://localhost:3000/admin/rate-limits

**Access:** SuperAdmin Only

**Login:** wisrado / Makeni@2025?.

---

**Total Time:** ~2 minutes
**Status:** 🟢 **READY!**
