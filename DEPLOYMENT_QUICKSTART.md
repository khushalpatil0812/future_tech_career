# 🚀 Quick Deployment Guide

## Overview
- **Backend**: Render.com (Java Spring Boot on port 5000)
- **Frontend**: Vercel (Next.js)
- **Database**: Railway/PlanetScale/Aiven (MySQL)

---

## 📋 Step-by-Step Deployment

### 1️⃣ Setup Database (5 minutes)

Choose one free option:

**Option A: Railway.app** (Recommended)
```
1. Go to https://railway.app
2. Sign up with GitHub
3. New Project → Add MySQL
4. Copy connection details
```

**Option B: PlanetScale**
```
1. Go to https://planetscale.com
2. Create database
3. Copy connection string
```

### 2️⃣ Deploy Backend on Render (10 minutes)

```bash
# 1. Push your code
git add .
git commit -m "Ready for deployment"
git push origin main

# 2. Go to https://dashboard.render.com
# 3. New+ → Web Service
# 4. Connect GitHub: khushalpatil0812/future_tech_career
# 5. Configure:
```

**Settings:**
- Name: `future-tech-career-backend`
- Root Directory: `backend`
- Build Command: `mvn clean package -DskipTests`
- Start Command: `java -jar target/career-backend-1.0.0.jar`
- Instance Type: `Free`

**Environment Variables:**
```env
SPRING_PROFILES_ACTIVE=prod
DATABASE_URL=jdbc:mysql://[HOST]:[PORT]/futuretech_db
DB_USERNAME=[your-username]
DB_PASSWORD=[your-password]
JWT_SECRET=change-this-to-a-very-long-random-string-min-32-characters
CORS_ORIGINS=http://localhost:3000
PORT=5000
```

Click "Create Web Service" → Wait 5-10 minutes

**Your backend URL:** `https://future-tech-career-backend.onrender.com`

### 3️⃣ Initialize Database (2 minutes)

```bash
# Connect to your database and run:
mysql -h [HOST] -u [USER] -p [DATABASE] < backend/insert_sample_data.sql

# Or use MySQL Workbench and paste the content of insert_sample_data.sql
```

### 4️⃣ Deploy Frontend on Vercel (5 minutes)

```bash
# Option 1: Vercel CLI
npm install -g vercel
vercel login
vercel --prod

# Option 2: Vercel Dashboard
# 1. Go to https://vercel.com/new
# 2. Import GitHub repo
# 3. Add environment variable:
```

**Environment Variable:**
```env
NEXT_PUBLIC_API_URL=https://future-tech-career-backend.onrender.com/api
```

Click "Deploy" → Wait 3-5 minutes

**Your frontend URL:** `https://your-app.vercel.app`

### 5️⃣ Update CORS (1 minute)

Go back to Render → Your Service → Environment

Update `CORS_ORIGINS`:
```
https://your-app.vercel.app,http://localhost:3000
```

Click "Save Changes" → Service will auto-redeploy

---

## ✅ Verify Deployment

Test these URLs in browser:

1. **Backend Health:**
   - `https://future-tech-career-backend.onrender.com/api/public/feedback`
   - Should return JSON with testimonials

2. **Frontend:**
   - `https://your-app.vercel.app`
   - Check testimonials section loads
   - Try contact form

3. **Admin:**
   - `https://your-app.vercel.app/admin/login`
   - Login with credentials from database

---

## 🔥 Important Notes

### Free Tier Limitations:
- **Render**: Spins down after 15 min inactivity (30s wake up time)
- **Vercel**: 100GB bandwidth/month
- **Database**: Check your provider's limits

### Costs (if you upgrade):
- Render: $7/month (always-on)
- Database: $5-15/month depending on provider

### Auto-Deploy:
- **Frontend**: Auto-deploys on push to `main`
- **Backend**: Auto-deploys on push to `main`

---

## 📚 Detailed Guides

- Backend: See `backend/RENDER_DEPLOYMENT.md`
- Frontend: See `VERCEL_DEPLOYMENT.md`

---

## 🆘 Troubleshooting

**Backend not responding:**
- Check Render logs
- Verify all environment variables are set
- Test database connection

**Frontend shows errors:**
- Check browser console
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check CORS settings in backend

**Testimonials not showing:**
- Verify database has data
- Check API endpoint directly
- Look at Network tab in browser DevTools

---

## 🎉 You're Done!

Your app is now live and production-ready!

Share your links:
- Frontend: `https://your-app.vercel.app`
- Backend: `https://future-tech-career-backend.onrender.com`
