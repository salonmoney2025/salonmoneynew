# SalonMoney - Coolify Deployment Guide

This guide will help you deploy SalonMoney platform on Coolify v4.0.0-beta.453.

## Overview

SalonMoney consists of two main applications:
- **Backend**: Node.js/Express API (Port 5000)
- **Frontend**: Next.js application (Port 3000)

## Prerequisites

1. Coolify v4.0.0-beta.453 installed and running
2. MongoDB Atlas account (or self-hosted MongoDB)
3. Domain names configured (optional but recommended)
4. Git repository access

## Deployment Steps

### 1. Create Backend Application in Coolify

1. In Coolify dashboard, click **"+ New Resource"**
2. Select **"Application"**
3. Choose your server
4. Connect your Git repository
5. Configure:
   - **Build Pack**: Node.js
   - **Base Directory**: `backend`
   - **Port**: `5000`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### 2. Configure Backend Environment Variables

In Coolify's Backend Application → Environment tab, add these variables:

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret_min_128_chars
JWT_EXPIRE=24h
REFRESH_TOKEN_SECRET=your_secure_refresh_secret_min_128_chars
REFRESH_TOKEN_EXPIRE=7d
NSL_TO_USDT_RECHARGE=23
USDT_TO_NSL_WITHDRAWAL=23
RECHARGE_FEE_PERCENTAGE=10
WITHDRAWAL_FEE_PERCENTAGE=10
MIN_WITHDRAWAL_AMOUNT_NSL=100
REFERRAL_BONUS_PERCENTAGE=35
MAX_REFERRAL_LEVEL=1
SUPER_ADMIN_USERNAME=your_admin_username
SUPER_ADMIN_EMAIL=admin@yourdomain.com
SUPER_ADMIN_PHONE=+1234567890
SUPER_ADMIN_PASSWORD=your_strong_password
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=noreply@yourdomain.com
FRONTEND_URL=https://your-frontend-domain.com
BINANCE_API_KEY=your_binance_key
BINANCE_API_SECRET=your_binance_secret
BINANCE_TESTNET=false
```

### 3. Configure Backend Health Check

In Backend Application → Health Check:
- **Type**: HTTP
- **Path**: `/api/health`
- **Port**: `5000`
- **Method**: GET
- **Expected Status**: 200
- **Interval**: 10s
- **Timeout**: 5s
- **Retries**: 3
- **Start Delay**: 10s

### 4. Create Frontend Application in Coolify

1. Click **"+ New Resource"**
2. Select **"Application"**
3. Connect same Git repository
4. Configure:
   - **Build Pack**: Node.js
   - **Base Directory**: `frontend`
   - **Port**: `3000`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

### 5. Configure Frontend Environment Variables

In Coolify's Frontend Application → Environment tab:

```env
NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api
NEXT_PUBLIC_APP_NAME=SalonMoney
NEXT_PUBLIC_COMPANY_NAME=SalonMoney Inc.
NEXT_PUBLIC_NSL_TO_USDT=23
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
NEXT_PUBLIC_FACEBOOK_APP_ID=your_facebook_app_id
```

### 6. Configure Frontend Health Check

In Frontend Application → Health Check:
- **Type**: HTTP
- **Path**: `/api/health`
- **Port**: `3000`
- **Method**: GET
- **Expected Status**: 200
- **Interval**: 10s
- **Timeout**: 5s
- **Retries**: 3
- **Start Delay**: 10s

### 7. Configure Domains

1. **Backend**: 
   - Go to Backend Application → Domains
   - Add your backend domain (e.g., `api.yourdomain.com`)
   - Coolify will automatically provision SSL certificate

2. **Frontend**:
   - Go to Frontend Application → Domains
   - Add your frontend domain (e.g., `yourdomain.com`)
   - Coolify will automatically provision SSL certificate

### 8. Update CORS Configuration

After deploying, update the backend's `FRONTEND_URL` environment variable in Coolify to match your actual frontend domain.

## Database Setup

### MongoDB Atlas

1. Create a MongoDB Atlas account at https://cloud.mongodb.com
2. Create a new cluster
3. Create a database user
4. Whitelist Coolify server IP (or use 0.0.0.0/0 for all IPs)
5. Get connection string and add it to `MONGODB_URI`

## Post-Deployment

### 1. Test Health Endpoints

```bash
# Backend
curl https://your-backend-domain.com/api/health

# Frontend
curl https://your-frontend-domain.com/api/health
```

### 2. Create Super Admin

The super admin will be automatically created on first backend startup using the credentials from environment variables.

### 3. Login Credentials

Use these to login:
- **Phone**: Value from `SUPER_ADMIN_PHONE`
- **Password**: Value from `SUPER_ADMIN_PASSWORD`

### 4. Test Features

1. Login as admin
2. Create test products
3. Test user registration
4. Test transactions
5. Test referral system

## Monitoring

### View Logs in Coolify

1. Go to Application → Logs
2. View real-time logs
3. Filter by severity

### Health Check Monitoring

Coolify will automatically:
- Monitor health endpoints every 10s
- Restart containers if health check fails
- Show health status in dashboard

## Troubleshooting

### Backend Not Starting

1. Check logs in Coolify
2. Verify all environment variables are set
3. Ensure MongoDB is accessible
4. Check port 5000 is available

### Frontend Not Starting

1. Check logs in Coolify
2. Verify `NEXT_PUBLIC_API_URL` is correct
3. Ensure backend is running
4. Check port 3000 is available

### CORS Errors

1. Verify `FRONTEND_URL` in backend env matches frontend domain
2. Check server.js allowedOrigins configuration
3. Ensure domains are using HTTPS in production

### Database Connection Issues

1. Verify MongoDB URI is correct
2. Check network access in MongoDB Atlas
3. Ensure Coolify server IP is whitelisted
4. Test connection from Coolify server

## Security Best Practices

1. **Never commit .env files** to Git
2. **Use strong passwords** for admin and database
3. **Generate secure JWT secrets** (minimum 128 characters)
4. **Enable MongoDB authentication**
5. **Use HTTPS** for all production traffic
6. **Whitelist specific IPs** in MongoDB Atlas
7. **Regularly update** dependencies
8. **Monitor logs** for suspicious activity

## Backup Strategy

### Database Backups

1. Enable MongoDB Atlas automated backups
2. Configure backup retention policy
3. Test restore process regularly

### Application Backups

1. Keep Git repository up to date
2. Tag releases in Git
3. Document environment variable changes

## Scaling

### Horizontal Scaling

1. In Coolify, increase replica count for each application
2. Coolify will handle load balancing automatically

### Vertical Scaling

1. Increase resource limits in Coolify
2. Monitor performance metrics
3. Adjust as needed

## Support

For issues related to:
- **Coolify**: https://github.com/coollabsio/coolify
- **SalonMoney**: Contact your development team

## Updates and Maintenance

1. Pull latest changes from Git
2. Deploy through Coolify (automatic on push if configured)
3. Monitor health checks after deployment
4. Test critical features
5. Keep dependencies updated

---

**Note**: This guide assumes you're using Coolify v4.0.0-beta.453. Some features may vary in different versions.
