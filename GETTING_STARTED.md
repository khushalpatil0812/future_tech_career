# 🎯 Getting Started - Future Tech Career

Quick setup guide to get your development environment running in **under 5 minutes**!

## ✅ Prerequisites Checklist

Before you begin, make sure you have:

- [ ] **Java 17 or higher** - [Download](https://adoptium.net/)
- [ ] **Maven 3.9+** - [Download](https://maven.apache.org/download.cgi)
- [ ] **Node.js 18+** - [Download](https://nodejs.org/)
- [ ] **PostgreSQL 14+** - [Download](https://www.postgresql.org/download/)
- [ ] **pnpm** (recommended) or npm - `npm install -g pnpm`

**Check versions:**
```bash
java -version        # Should show 17+
mvn -version         # Should show 3.9+
node -version        # Should show 18+
psql --version       # Should show 14+
pnpm -version        # Should show 8+
```

---

## 🚀 Option 1: Quick Start (Recommended for Development)

### Step 1: Set up Database (2 minutes)

```bash
# Start PostgreSQL
# Windows: Start from Services
# Mac: brew services start postgresql
# Linux: sudo systemctl start postgresql

# Create database
psql -U postgres
CREATE DATABASE futuretech_db;
\q
```

### Step 2: Start Backend (1 minute)

```bash
# Open Terminal 1
cd backend

# Copy environment file
cp .env.example .env

# Edit .env (optional - defaults work for local development)
# Just make sure DATABASE_URL matches your PostgreSQL setup

# Run backend
mvn spring-boot:run
```

**✅ Backend running on:** `http://localhost:5000`

**Default admin created:**
- Email: `admin@futuretech.com`
- Password: `admin123`

### Step 3: Start Frontend (1 minute)

```bash
# Open Terminal 2 (new terminal)
cd future-tech-career  # root directory

# Install dependencies (first time only)
pnpm install

# Create environment file
echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local

# Run frontend
pnpm dev
```

**✅ Frontend running on:** `http://localhost:3000`

### Step 4: Test Everything (1 minute)

1. **Open browser:** `http://localhost:3000`
2. **Test public pages:**
   - Home page should load with animations
   - Click "Contact Us" - submit a test inquiry
   - Click "Share Feedback" - submit test feedback

3. **Test admin panel:**
   - Go to `http://localhost:3000/admin/login`
   - Login with: `admin@futuretech.com` / `admin123`
   - Check dashboard statistics
   - View inquiries and feedback

**🎉 Done! You're ready to develop!**

---

## 🐳 Option 2: Docker Setup (Easiest - No Local Setup Required)

Perfect if you don't want to install PostgreSQL locally.

### Step 1: Install Docker

- Download [Docker Desktop](https://www.docker.com/products/docker-desktop)
- Start Docker Desktop

### Step 2: Run Backend with Docker

```bash
cd backend

# Start both PostgreSQL and backend
docker-compose up -d

# Check logs
docker-compose logs -f
```

**✅ Backend + Database running!**

### Step 3: Run Frontend

```bash
# Terminal 2
cd future-tech-career  # root directory

pnpm install
echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local
pnpm dev
```

**✅ Full stack running!**

### Stop Services

```bash
# Stop backend and database
cd backend
docker-compose down

# Frontend stops with Ctrl+C
```

---

## 🔍 Verify Installation

### Check Backend Health

```bash
# Option 1: Browser
# Open: http://localhost:5000/api/health

# Option 2: curl
curl http://localhost:5000/api/health

# Should return:
# {
#   "status": "UP",
#   "message": "Future Tech Career API is running",
#   "version": "1.0.0"
# }
```

### Check Database Connection

```bash
# Login to admin panel
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@futuretech.com","password":"admin123"}'

# Should return JWT token and user info
```

### Check Frontend

1. Open `http://localhost:3000`
2. You should see:
   - Animated hero section
   - Smooth page transitions
   - Contact form
   - Testimonials (may be empty initially)

---

## 🛠️ Common Issues & Solutions

### Backend Issues

**Issue: Port 5000 already in use**
```bash
# Find and kill process
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:5000 | xargs kill -9
```

**Issue: Database connection failed**
```bash
# Check PostgreSQL is running
# Windows: Check Services
# Mac: brew services list
# Linux: sudo systemctl status postgresql

# Check database exists
psql -U postgres -l | grep futuretech_db

# Recreate if needed
psql -U postgres
CREATE DATABASE futuretech_db;
```

**Issue: JWT secret too short**
```
Make sure JWT_SECRET in .env is at least 32 characters
```

### Frontend Issues

**Issue: Port 3000 already in use**
```bash
# Kill process
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9

# Or use different port
pnpm dev -p 3001
```

**Issue: API connection failed**
```bash
# Verify backend is running
curl http://localhost:5000/api/health

# Check .env.local file
cat .env.local
# Should contain: NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**Issue: Dependencies not installing**
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

---

## 📝 Development Workflow

### Making Changes

**Backend:**
1. Edit code in `backend/src/`
2. Spring Boot auto-reloads (if DevTools enabled)
3. Test with curl or browser

**Frontend:**
1. Edit code in `app/` or `components/`
2. Next.js hot-reloads automatically
3. See changes instantly in browser

### Database Changes

**Reset database:**
```bash
# Stop backend
Ctrl+C

# Drop and recreate
psql -U postgres
DROP DATABASE futuretech_db;
CREATE DATABASE futuretech_db;
\q

# Restart backend - tables auto-created
mvn spring-boot:run
```

### Testing API with Thunder Client / Postman

Import this collection:

```json
{
  "name": "Future Tech Career API",
  "requests": [
    {
      "name": "Health Check",
      "method": "GET",
      "url": "http://localhost:5000/api/health"
    },
    {
      "name": "Login",
      "method": "POST",
      "url": "http://localhost:5000/api/auth/login",
      "body": {
        "email": "admin@futuretech.com",
        "password": "admin123"
      }
    },
    {
      "name": "Get Testimonials",
      "method": "GET",
      "url": "http://localhost:5000/api/testimonials?limit=6"
    },
    {
      "name": "Dashboard (Admin)",
      "method": "GET",
      "url": "http://localhost:5000/api/admin/dashboard",
      "headers": {
        "Authorization": "Bearer YOUR_JWT_TOKEN"
      }
    }
  ]
}
```

---

## 🎓 Next Steps

Now that you're set up:

1. **Explore the code:**
   - Backend: `backend/src/main/java/com/futuretech/career/`
   - Frontend: `app/` and `components/`

2. **Read documentation:**
   - [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Feature overview
   - [ANIMATIONS.md](ANIMATIONS.md) - Animation guide
   - [backend/README.md](backend/README.md) - API docs

3. **Try features:**
   - Submit inquiries and feedback
   - Login to admin panel
   - Approve feedback as testimonials
   - Update content and SEO

4. **Customize:**
   - Update branding colors in `tailwind.config.js`
   - Modify content in admin panel
   - Add new pages and components

---

## 🚀 Ready for Production?

When you're ready to deploy:

1. Read [DEPLOYMENT.md](DEPLOYMENT.md)
2. Choose platform (Railway, Render, Vercel)
3. Set environment variables
4. Deploy!

---

## 💡 Tips

- **Use separate terminals** for backend and frontend
- **Check logs** when something doesn't work
- **Test API** with curl or Thunder Client before frontend
- **Clear cache** if you see stale data
- **Restart services** if behavior is weird

---

## 🆘 Still Need Help?

1. Check logs in terminal
2. Read error messages carefully
3. Search documentation
4. Check GitHub issues (if using repo)
5. Contact: careerisfuturetech@gmail.com

---

## 🎉 Happy Coding!

You're all set! Start building amazing features! 🚀
