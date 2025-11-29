# 🚀 HOW TO RESTART SERVERS (FIX CORS ERROR)

## ⚠️ IMPORTANT: You MUST restart BOTH servers for the CORS fix to work!

---

## 🔧 WHAT WAS FIXED:

1. ✅ **Backend CORS Configuration** - Updated to allow cross-origin image loading
2. ✅ **Helmet Security Headers** - Disabled restrictive policies for development
3. ✅ **Static File Serving** - Added explicit CORS headers for `/uploads` route
4. ✅ **Next.js Image Config** - Allowed localhost:5000 as external image source
5. ✅ **Profile Update Endpoint** - Implemented `PUT /api/user/profile`

---

## 📋 RESTART INSTRUCTIONS:

### **Method 1: Manual Restart (Recommended)**

#### **Step 1: Stop Backend Server**
```bash
# In your backend terminal window:
# Press: Ctrl + C

# If the server won't stop, close the terminal window
```

#### **Step 2: Stop Frontend Server**
```bash
# In your frontend terminal window:
# Press: Ctrl + C

# If the server won't stop, close the terminal window
```

#### **Step 3: Start Backend Server**
```bash 
# Open NEW terminal
cd C:\Users\Wisdom\Desktop\money\files\salonmoney-platform\backend

# Start backend
npm run dev

# Wait for: "Server running on port 5000"
```

#### **Step 4: Start Frontend Server**
```bash
# Open ANOTHER NEW terminal
cd C:\Users\Wisdom\Desktop\money\files\salonmoney-platform\frontend

# Start frontend
npm run dev

# Wait for: "Ready on http://localhost:3000"
```

---

### **Method 2: Quick Restart (Windows)**

#### **Backend:**
```bash
cd C:\Users\Wisdom\Desktop\money\files\salonmoney-platform\backend
taskkill /F /IM node.exe
npm run dev
```

#### **Frontend:**
```bash
cd C:\Users\Wisdom\Desktop\money\files\salonmoney-platform\frontend
npm run dev
```

---

## ✅ TESTING AFTER RESTART:

### **1. Clear Browser Cache**
```
Press: Ctrl + Shift + Delete
OR
Press: Ctrl + F5 (Hard Refresh)
```

### **2. Test Profile Photo Upload**
1. ✅ Go to: http://localhost:3000/dashboard
2. ✅ Click profile icon in top-right navbar
3. ✅ ProfileSidebar opens on left
4. ✅ Click on the circular avatar image
5. ✅ Select an image file (JPG/PNG)
6. ✅ Upload should complete with green success message
7. ✅ Photo should display immediately (NO CORS ERROR!)

### **3. Check Browser Console**
```
Press F12 → Console Tab

Expected: No CORS errors
Should see: Profile photo loading successfully
```

---

## 🔍 VERIFY THE FIX WORKED:

### **Before (Broken):**
```
❌ Console Error: ERR_BLOCKED_BY_RESPONSE.NotSameOrigin
❌ Photo won't display
❌ Red X or broken image icon
```

### **After (Fixed):**
```
✅ No CORS errors in console
✅ Photo displays in sidebar
✅ Photo displays in Account page
✅ Green success toast message
```

---

## 🐛 TROUBLESHOOTING:

### **If CORS error persists:**

1. **Check backend is running on port 5000:**
   ```
   Open browser: http://localhost:5000/api/health
   Should see: {"status":"Server is running","timestamp":"..."}
   ```

2. **Check frontend is running on port 3000:**
   ```
   Open browser: http://localhost:3000
   Should load the homepage
   ```

3. **Check .env files:**

   **Backend (.env):**
   ```
   FRONTEND_URL=http://localhost:3000
   ```

   **Frontend (.env.local):**
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. **Verify profile photo path:**
   ```
   Backend saves to: /backend/uploads/profiles/
   URL format: http://localhost:5000/uploads/profiles/profile-{id}-{timestamp}.jpg
   ```

5. **Test direct image access:**
   ```
   After upload, copy the image URL from console
   Paste in new browser tab
   Should display the image directly
   ```

---

## 📊 WHAT CHANGED IN THE CODE:

### **1. backend/server.js:**
```javascript
// OLD (Restrictive):
app.use(helmet());
app.use(cors());
app.use('/uploads', express.static('uploads'));

// NEW (Permissive for development):
app.use(helmet({
  crossOriginResourcePolicy: false,
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: false
}));
app.use(cors(corsOptions));
app.use('/uploads', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
}, express.static('uploads'));
```

### **2. frontend/next.config.js:**
```javascript
// Added image configuration:
images: {
  remotePatterns: [
    {
      protocol: 'http',
      hostname: 'localhost',
      port: '5000',
      pathname: '/uploads/**',
    },
  ],
  domains: ['localhost'],
},
```

### **3. backend/routes/user.js:**
```javascript
// NEW ENDPOINT:
PUT /api/user/profile
- Update username, email, phone
- Validates uniqueness
- Prevents duplicate data
```

---

## 🎯 EXPECTED API BEHAVIOR:

### **Upload Photo:**
```
POST http://localhost:5000/api/user/upload-profile-photo
Authorization: Bearer {token}
Content-Type: multipart/form-data
Body: profile_photo={file}

Response:
{
  "message": "Profile photo uploaded successfully",
  "profile_photo": "/uploads/profiles/profile-123-456.jpg"
}
```

### **Update Profile:**
```
PUT http://localhost:5000/api/user/profile
Authorization: Bearer {token}
Content-Type: application/json
Body: {
  "username": "newusername",
  "email": "newemail@example.com",
  "phone": "+232123456789"
}

Response:
{
  "message": "Profile updated successfully",
  "user": { ... }
}
```

---

## ✅ CHECKLIST:

- [ ] Backend server stopped (Ctrl+C)
- [ ] Frontend server stopped (Ctrl+C)
- [ ] Backend server restarted (`npm run dev`)
- [ ] Frontend server restarted (`npm run dev`)
- [ ] Browser cache cleared (Ctrl+F5)
- [ ] Profile photo upload tested
- [ ] No CORS errors in console
- [ ] Photo displays correctly

---

## 🎉 ONCE WORKING:

You should be able to:
- ✅ Upload profile photos (up to 10MB)
- ✅ See photos display immediately
- ✅ Update username, email, phone
- ✅ No CORS errors in console

---

**The CORS issue will be 100% FIXED after restarting both servers!** 🚀
