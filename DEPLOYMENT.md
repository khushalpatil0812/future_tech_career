# 🚀 Future Tech Career - Full Stack Deployment Guide

Complete guide for deploying the Future Tech Career platform with Spring Boot backend and Next.js frontend.

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Backend Setup (Spring Boot)](#backend-setup)
3. [Frontend Setup (Next.js)](#frontend-setup)
4. [Database Configuration](#database-configuration)
5. [Deployment Options](#deployment-options)
6. [Environment Variables](#environment-variables)
7. [Testing Guide](#testing-guide)
8. [Troubleshooting](#troubleshooting)

---

## 🎯 Project Overview

**Stack:**
- **Backend:** Spring Boot 3.2, PostgreSQL, JWT Authentication
- **Frontend:** Next.js 16, React, Framer Motion, Tailwind CSS
- **Deployment:** Docker, Railway, Render, Vercel

**Features:**
- ✅ JWT-based authentication
- ✅ Role-based admin panel
- ✅ Contact inquiry management
- ✅ Feedback collection & testimonial approval
- ✅ Dynamic content & SEO management
- ✅ Smooth animations with Framer Motion
- ✅ Responsive design

---

## 🔧 Backend Setup (Spring Boot)

### Prerequisites
- Java 17+
- Maven 3.9+
- PostgreSQL 14+
- Docker (optional)

### Local Development

```bash
# Navigate to backend directory
cd backend

# Create PostgreSQL database
psql -U postgres
CREATE DATABASE futuretech_db;

# Configure environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run the application
mvn spring-boot:run

# Or build and run JAR
mvn clean package
java -jar target/career-backend-1.0.0.jar
```

**Default Admin Credentials (Auto-created):**
- Email: `admin@futuretech.com`
- Password: `admin123`
- ⚠️ **Change immediately in production!**

### API Base URL
```
http://localhost:5000/api
```

### Key Endpoints

**Public:**
- `GET /api/health` - Health check
- `POST /api/auth/login` - Admin login
- `GET /api/testimonials` - Get active testimonials
- `POST /api/inquiries` - Submit contact inquiry
- `POST /api/feedback` - Submit feedback

**Admin (Requires JWT):**
- `GET /api/admin/dashboard` - Dashboard stats
- `GET /api/admin/inquiries` - Manage inquiries
- `GET /api/admin/feedback` - Manage feedback
- `POST /api/admin/feedback/{id}/approve` - Approve feedback as testimonial
- `GET /api/admin/testimonials` - Manage testimonials
- `PUT /api/admin/content/{section}` - Update site content
- `PUT /api/admin/seo/{page}` - Update SEO metadata

---

## 💻 Frontend Setup (Next.js)

### Prerequisites
- Node.js 18+
- pnpm/npm/yarn

### Local Development

```bash
# Install dependencies
pnpm install

# Configure environment
echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local

# Run development server
pnpm dev
```

**Frontend will be available at:** `http://localhost:3000`

### Build for Production

```bash
pnpm build
pnpm start
```

---

## 🗄️ Database Configuration

### PostgreSQL Setup

**Local Development:**
```sql
CREATE DATABASE futuretech_db;
CREATE USER futuretech_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE futuretech_db TO futuretech_user;
```

**Connection String:**
```
jdbc:postgresql://localhost:5432/futuretech_db
```

### Docker PostgreSQL

```bash
docker run --name futuretech-postgres \
  -e POSTGRES_DB=futuretech_db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  -d postgres:15-alpine
```

### Database Seeding

The application automatically seeds:
- ✅ Default admin user
- ✅ Content sections (home_hero, about_text, services_text, contact_info)
- ✅ SEO metadata for all pages

---

## 🚀 Deployment Options

### Option 1: Docker Deployment

**Backend + Database:**
```bash
cd backend
docker-compose up -d
```

This starts:
- PostgreSQL on port 5432
- Backend API on port 5000

**Frontend:**
```bash
# Build Docker image
docker build -t futuretech-frontend .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=http://your-backend-url/api \
  futuretech-frontend
```

---

### Option 2: Railway Deployment

**Backend:**
1. Go to [Railway.app](https://railway.app)
2. Create new project
3. Add PostgreSQL service
4. Deploy from GitHub (backend folder)
5. Set environment variables:
   ```
   DATABASE_URL=${POSTGRES_URL}
   JWT_SECRET=<generate_secure_32_char_key>
   ADMIN_SECRET_KEY=<generate_secure_key>
   FRONTEND_URL=https://your-frontend.vercel.app
   SPRING_PROFILES_ACTIVE=prod
   ```
6. Note your backend URL

**Frontend:**
1. Deploy to Vercel
2. Set environment variable:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api
   ```

---

### Option 3: Render Deployment

**Backend:**
1. Go to [Render.com](https://render.com)
2. Create PostgreSQL database
3. Create new Web Service (Spring Boot)
4. Build Command: `mvn clean package -DskipTests`
5. Start Command: `java -jar target/career-backend-1.0.0.jar`
6. Environment Variables:
   ```
   DATABASE_URL=<render_postgres_url>
   JWT_SECRET=<generate_secure_key>
   ADMIN_SECRET_KEY=<generate_secure_key>
   FRONTEND_URL=<your_frontend_url>
   SPRING_PROFILES_ACTIVE=prod
   ```

**Frontend:**
1. Deploy to Vercel or Render
2. Set `NEXT_PUBLIC_API_URL`

---

### Option 4: AWS EC2 / DigitalOcean

**Backend:**
```bash
# Install Java 17
sudo apt update
sudo apt install openjdk-17-jdk -y

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib -y

# Upload JAR file
scp target/career-backend-1.0.0.jar user@server:/home/app/

# Run with systemd
sudo nano /etc/systemd/system/futuretech-backend.service

# Add:
[Unit]
Description=Future Tech Career Backend
After=postgresql.service

[Service]
Type=simple
User=app
WorkingDirectory=/home/app
ExecStart=/usr/bin/java -jar /home/app/career-backend-1.0.0.jar
Restart=on-failure

[Install]
WantedBy=multi-user.target

# Start service
sudo systemctl enable futuretech-backend
sudo systemctl start futuretech-backend
```

**Frontend:**
```bash
# Build on server
cd frontend
pnpm install
pnpm build

# Serve with PM2
npm install -g pm2
pm2 start npm --name "futuretech-frontend" -- start
pm2 save
pm2 startup
```

---

## 🔐 Environment Variables

### Backend (.env)

```env
# Database
DATABASE_URL=jdbc:postgresql://localhost:5432/futuretech_db
DB_USERNAME=postgres
DB_PASSWORD=your_secure_password

# JWT (minimum 32 characters)
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long

# Admin Setup
ADMIN_SECRET_KEY=your_admin_setup_secret_for_additional_admins

# CORS
FRONTEND_URL=http://localhost:3000,https://yourdomain.com

# Profile
SPRING_PROFILES_ACTIVE=prod
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**Production:**
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
```

---

## 🧪 Testing Guide

### Backend Testing

```bash
# Run all tests
mvn test

# Run specific test
mvn test -Dtest=AuthControllerTest

# With coverage
mvn test jacoco:report
```

**Manual API Testing with curl:**

```bash
# Health check
curl http://localhost:5000/api/health

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@futuretech.com","password":"admin123"}'

# Get testimonials
curl http://localhost:5000/api/testimonials?limit=6

# Admin request (replace TOKEN)
curl http://localhost:5000/api/admin/dashboard \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Frontend Testing

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Test pages:
# - http://localhost:3000 (Home)
# - http://localhost:3000/about
# - http://localhost:3000/services
# - http://localhost:3000/contact
# - http://localhost:3000/feedback
# - http://localhost:3000/admin/login
```

---

## 🐛 Troubleshooting

### Backend Issues

**Database Connection Failed:**
```
Check DATABASE_URL format: jdbc:postgresql://host:port/database
Verify PostgreSQL is running: sudo systemctl status postgresql
Check firewall: sudo ufw allow 5432
```

**JWT Token Invalid:**
```
Ensure JWT_SECRET is at least 32 characters
Check token expiration (default: 7 days)
Verify Authorization header format: "Bearer <token>"
```

**CORS Errors:**
```
Add frontend URL to application.properties:
cors.allowed-origins=http://localhost:3000,https://yourdomain.com
```

### Frontend Issues

**API Connection Failed:**
```
Check NEXT_PUBLIC_API_URL in .env.local
Verify backend is running on specified URL
Check browser console for CORS errors
```

**Animations Not Working:**
```
Ensure framer-motion is installed: pnpm add framer-motion
Check if components are client components ('use client')
```

**Build Errors:**
```
Clear Next.js cache: rm -rf .next
Reinstall dependencies: rm -rf node_modules && pnpm install
```

---

## 📝 Post-Deployment Checklist

- [ ] Change default admin password
- [ ] Set secure JWT_SECRET (32+ characters)
- [ ] Configure production DATABASE_URL
- [ ] Set proper CORS origins
- [ ] Enable HTTPS/SSL
- [ ] Set up database backups
- [ ] Configure monitoring (Sentry, LogRocket)
- [ ] Test all API endpoints
- [ ] Verify email notifications (if configured)
- [ ] Check SEO metadata on all pages
- [ ] Test responsive design on mobile
- [ ] Run security audit

---

## 📞 Support

- **Email:** careerisfuturetech@gmail.com
- **LinkedIn:** [Future Tech Career](https://www.linkedin.com/company/future-tech-career/)
- **Documentation:** See individual README files in backend/ and root directory

---

## 📄 License

MIT License - See LICENSE file for details
