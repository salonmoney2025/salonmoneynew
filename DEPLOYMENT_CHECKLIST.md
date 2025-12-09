# Deployment Checklist

Use this checklist to ensure all steps are completed for a successful deployment.

## Pre-Deployment

### Code Preparation
- [ ] All code committed to Git
- [ ] Repository pushed to GitHub/GitLab/Bitbucket
- [ ] `.env` files are in `.gitignore` (should not be in Git)
- [ ] All dependencies are in `package.json`
- [ ] Code tested locally (frontend and backend)

### Credentials Prepared
- [ ] MongoDB Atlas account created
- [ ] Render/Railway account created
- [ ] Vercel account created
- [ ] Strong JWT secrets generated
- [ ] Super admin credentials decided
- [ ] Email service credentials ready (optional)

---

## Backend Deployment

### MongoDB Setup
- [ ] MongoDB Atlas cluster created
- [ ] Database user created with password
- [ ] Network access configured (0.0.0.0/0 or specific IPs)
- [ ] Connection string copied and tested

### Backend Hosting (Render/Railway)
- [ ] Web service created
- [ ] Root directory set to `backend`
- [ ] Build command: `npm install`
- [ ] Start command: `npm start`
- [ ] All environment variables added:
  - [ ] `MONGODB_URI`
  - [ ] `JWT_SECRET`
  - [ ] `REFRESH_TOKEN_SECRET`
  - [ ] `FRONTEND_URL` (placeholder for now)
  - [ ] `NODE_ENV=production`
  - [ ] `PORT=5000`
  - [ ] `SUPER_ADMIN_USERNAME`
  - [ ] `SUPER_ADMIN_PASSWORD`
  - [ ] `SUPER_ADMIN_EMAIL`
  - [ ] `SUPER_ADMIN_PHONE`
  - [ ] Fee configuration variables
  - [ ] Conversion rate variables
- [ ] Service deployed successfully
- [ ] Backend URL noted: `________________`
- [ ] Health check works: `/api/health` returns success

---

## Frontend Deployment

### Vercel Setup
- [ ] Project imported from Git repository
- [ ] Root directory set to `frontend`
- [ ] Framework preset: Next.js
- [ ] Environment variables added:
  - [ ] `NEXT_PUBLIC_API_URL` (backend URL + /api)
  - [ ] `NEXT_PUBLIC_APP_NAME`
  - [ ] `NEXT_PUBLIC_COMPANY_NAME`
  - [ ] Social login IDs (if applicable)
- [ ] Project deployed successfully
- [ ] Frontend URL noted: `________________`
- [ ] Frontend loads in browser

---

## Post-Deployment Configuration

### Update Backend
- [ ] Go back to backend hosting service
- [ ] Update `FRONTEND_URL` to actual Vercel URL
- [ ] Service redeployed with new environment variable
- [ ] CORS working (no errors in browser console)

### Initialize Database
- [ ] Super admin account created (auto-created on startup)
- [ ] Products seeded (use seed script or create manually)
- [ ] Currencies configured (if needed)

---

## Testing

### Basic Functionality
- [ ] Frontend loads without errors
- [ ] Backend health check responds
- [ ] Login page accessible
- [ ] Super admin can log in
- [ ] Dashboard loads after login
- [ ] User registration works
- [ ] Profile page loads

### Core Features
- [ ] VIP products visible
- [ ] Purchase product works
- [ ] Balance updates correctly
- [ ] Daily income generation (check logs)
- [ ] Referral system works
- [ ] Transactions display correctly
- [ ] Withdrawal request works
- [ ] Admin panel accessible

### Admin Features
- [ ] Admin can approve/reject transactions
- [ ] Admin can manage users
- [ ] Admin can view analytics
- [ ] Finance dashboard works
- [ ] Verificator functions work (if applicable)

---

## Security Hardening

### Credentials
- [ ] All default passwords changed
- [ ] JWT secrets are strong random strings (32+ chars)
- [ ] Super admin password is strong
- [ ] Database password is strong
- [ ] No credentials in Git repository

### Network Security
- [ ] HTTPS enabled (auto on Vercel/Render)
- [ ] CORS properly configured (only your frontend domain)
- [ ] Rate limiting enabled (already in code)
- [ ] MongoDB network access restricted (optional but recommended)

### Application Security
- [ ] Input validation working (test with invalid data)
- [ ] SQL/NoSQL injection prevention active
- [ ] XSS protection headers present
- [ ] CSRF protection enabled (if needed)
- [ ] File upload restrictions working

---

## Monitoring & Maintenance

### Monitoring Setup
- [ ] Vercel Analytics enabled (optional)
- [ ] Backend logs accessible
- [ ] Error tracking configured (optional: Sentry)
- [ ] Uptime monitoring (optional: UptimeRobot)

### Backup Strategy
- [ ] MongoDB Atlas automatic backups enabled
- [ ] Backup schedule configured
- [ ] Test restore procedure documented

### Cron Jobs
- [ ] Daily income cron running (check logs at midnight)
- [ ] Auto-renewal cron running (check logs at 12:01 AM)
- [ ] Exchange rate update cron running (check logs every 4 hours)

---

## Optional Enhancements

### Email Service
- [ ] Email service configured (Gmail/SendGrid)
- [ ] Test email sending works
- [ ] Password reset emails work
- [ ] Transaction notification emails work
- [ ] 2FA emails work

### Custom Domain
- [ ] Domain purchased
- [ ] DNS configured for Vercel (frontend)
- [ ] DNS configured for backend (optional)
- [ ] SSL certificates active
- [ ] Environment variables updated with new domains

### Social Login
- [ ] Google OAuth configured
- [ ] Facebook OAuth configured
- [ ] Test social login flows

---

## Documentation

- [ ] Deployment guide reviewed
- [ ] Admin credentials documented (securely)
- [ ] API endpoints documented
- [ ] Environment variables documented
- [ ] Backup procedure documented
- [ ] Rollback procedure documented

---

## Go-Live Checklist

### Final Checks Before Announcing
- [ ] All features tested end-to-end
- [ ] Performance tested (load times acceptable)
- [ ] Mobile responsiveness verified
- [ ] Cross-browser testing done (Chrome, Firefox, Safari)
- [ ] Terms of service page added (if required)
- [ ] Privacy policy page added (if required)
- [ ] Contact/support information added

### Launch
- [ ] DNS propagated (if using custom domain)
- [ ] Final smoke test completed
- [ ] Team trained on admin panel
- [ ] Support channels ready
- [ ] Monitoring dashboards open
- [ ] Rollback plan ready

---

## Post-Launch

### First 24 Hours
- [ ] Monitor error logs closely
- [ ] Check cron job execution
- [ ] Verify daily income generation
- [ ] Monitor database performance
- [ ] Check user registration flow
- [ ] Monitor transaction processing

### First Week
- [ ] Review analytics and usage
- [ ] Collect user feedback
- [ ] Monitor server resources
- [ ] Check backup completions
- [ ] Review security logs
- [ ] Plan first optimization updates

---

## Contacts & Resources

### Service Dashboards
- **Vercel**: https://vercel.com/dashboard
- **Render**: https://dashboard.render.com
- **Railway**: https://railway.app/dashboard
- **MongoDB Atlas**: https://cloud.mongodb.com

### Support Resources
- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs
- **MongoDB Docs**: https://docs.mongodb.com

### Emergency Contacts
- Dev Team: `________________`
- Database Admin: `________________`
- DevOps: `________________`

---

## Rollback Procedure

If something goes wrong:

1. **Frontend Issues**:
   - Go to Vercel → Deployments
   - Click on previous working deployment
   - Click "Promote to Production"

2. **Backend Issues**:
   - Go to Render/Railway → Deployments
   - Rollback to previous deployment
   - Or revert Git commit and redeploy

3. **Database Issues**:
   - Go to MongoDB Atlas → Clusters
   - Restore from backup
   - Follow Atlas restore documentation

---

## Success Criteria

Deployment is successful when:
- ✅ Frontend loads without errors
- ✅ Backend API responds correctly
- ✅ Users can register and login
- ✅ Users can purchase VIP products
- ✅ Daily income generates correctly
- ✅ Withdrawals can be requested
- ✅ Admin panel functions properly
- ✅ No critical security vulnerabilities
- ✅ Cron jobs execute on schedule
- ✅ Monitoring and logging active

---

**Date Deployed**: `________________`

**Deployed By**: `________________`

**Production URLs**:
- Frontend: `________________`
- Backend: `________________`

**Notes**:
`________________`
`________________`
`________________`
