# 🚀 Future Tech Career - Full Stack Platform

A modern, production-ready career consultancy platform built with **Spring Boot** and **Next.js**.

![Tech Stack](https://img.shields.io/badge/Spring%20Boot-3.2-green)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![Java](https://img.shields.io/badge/Java-17-orange)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-11-pink)

---

## 📋 Overview

**Future Tech Career** is a comprehensive platform for career consultancy services featuring:

- 🔐 **Secure Admin Panel** with JWT authentication
- 📬 **Contact Inquiry Management** with read/unread tracking
- ⭐ **Feedback Collection & Approval** system
- 💬 **Dynamic Testimonials** with approval workflow
- 📝 **Content Management** for all site sections
- 🎯 **SEO Optimization** tools
- 🎨 **Beautiful Animations** with Framer Motion

---

## 🛠️ Tech Stack

### Backend (Spring Boot)
- **Framework:** Spring Boot 3.2.1
- **Language:** Java 17
- **Database:** PostgreSQL 15
- **Security:** Spring Security + JWT
- **Build Tool:** Maven 3.9
- **ORM:** Hibernate/JPA

### Frontend (Next.js)
- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 18
- **Styling:** Tailwind CSS
- **Components:** Radix UI + shadcn/ui
- **Animations:** Framer Motion 11
- **Type Safety:** TypeScript

---

## 🚀 Quick Start

### Prerequisites
- Java 17+
- Node.js 18+
- PostgreSQL 14+
- Maven 3.9+
- pnpm/npm

### 1. Clone Repository

```bash
git clone <repository-url>
cd future-tech-career
```

### 2. Start Backend

```bash
cd backend

# Configure database
cp .env.example .env
# Edit .env with your database credentials

# Run application
mvn spring-boot:run
```

Backend will run on `http://localhost:5000`

**Default Admin:**
- Email: `admin@futuretech.com`
- Password: `admin123`

### 3. Start Frontend

```bash
# From root directory
pnpm install

# Configure API URL
echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local

# Run development server
pnpm dev
```

Frontend will run on `http://localhost:3000`

---

## 📁 Project Structure

```
future-tech-career/
├── backend/                 # Spring Boot API
│   ├── src/
│   │   └── main/java/com/futuretech/career/
│   │       ├── config/      # Security, CORS, DB
│   │       ├── controller/  # REST endpoints
│   │       ├── dto/         # Data transfer objects
│   │       ├── exception/   # Error handling
│   │       ├── model/       # JPA entities
│   │       ├── repository/  # Data access
│   │       ├── security/    # JWT utilities
│   │       └── service/     # Business logic
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── README.md
│
├── app/                     # Next.js pages
├── components/
│   ├── animations/          # Framer Motion components
│   ├── layout/              # Header, Footer
│   ├── sections/            # Hero, Testimonials
│   └── ui/                  # Reusable UI components
│
├── DEPLOYMENT.md            # Deployment guide
├── ANIMATIONS.md            # Animation documentation
└── PROJECT_SUMMARY.md       # Complete project overview
```

---

## 🔑 Key Features

### Authentication & Security
- JWT-based authentication
- BCrypt password hashing
- Role-based access control (Admin)
- CORS protection
- Input validation
- SQL injection prevention

### Admin Dashboard
- Real-time statistics
- Inquiry management (mark read, delete)
- Feedback approval workflow
- Testimonial management
- Content editor
- SEO metadata editor

### Public Features
- Contact form submission
- Feedback submission with consent
- View approved testimonials
- Dynamic content loading
- SEO-optimized pages

### User Experience
- Smooth page transitions
- Animated components
- Responsive design
- Loading states
- Toast notifications
- Mobile-friendly

---

## 📡 API Endpoints

### Public APIs
```
GET    /api/health                    # Health check
POST   /api/auth/login                # Admin login
GET    /api/testimonials              # Get testimonials
POST   /api/inquiries                 # Submit inquiry
POST   /api/feedback                  # Submit feedback
GET    /api/content/{section}         # Get content
GET    /api/seo/{page}                # Get SEO metadata
```

### Admin APIs (Requires JWT)
```
GET    /api/admin/dashboard           # Dashboard stats
GET    /api/admin/inquiries           # List inquiries
PATCH  /api/admin/inquiries/{id}/read # Mark as read
DELETE /api/admin/inquiries/{id}     # Delete inquiry
GET    /api/admin/feedback            # List feedback
POST   /api/admin/feedback/{id}/approve  # Approve feedback
POST   /api/admin/feedback/{id}/reject   # Reject feedback
GET    /api/admin/testimonials        # List testimonials
PATCH  /api/admin/testimonials/{id}/toggle  # Toggle status
DELETE /api/admin/testimonials/{id}   # Delete testimonial
PUT    /api/admin/content/{section}   # Update content
PUT    /api/admin/seo/{page}          # Update SEO
```

**Full API Documentation:** See [`backend/README.md`](backend/README.md)

---

## 🎨 Animations

This project uses **Framer Motion** for smooth animations:

```tsx
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';

// Fade in with direction
<FadeIn delay={0.2} direction="up">
  <h1>Animated Heading</h1>
</FadeIn>

// Stagger list items
<StaggerContainer staggerDelay={0.1}>
  {items.map(item => (
    <StaggerItem key={item.id}>
      <Card>{item.content}</Card>
    </StaggerItem>
  ))}
</StaggerContainer>
```

**Animation Guide:** See [`ANIMATIONS.md`](ANIMATIONS.md)

---

## 🐳 Docker Deployment

### Using Docker Compose (Easiest)

```bash
cd backend
docker-compose up -d
```

This starts:
- PostgreSQL on port 5432
- Backend API on port 5000

### Manual Docker Build

```bash
# Backend
cd backend
docker build -t futuretech-backend .
docker run -p 5000:5000 --env-file .env futuretech-backend

# Frontend
docker build -t futuretech-frontend .
docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=http://localhost:5000/api futuretech-frontend
```

---

## 🌍 Deployment

### Recommended Platforms

**Backend:** Railway, Render, AWS EC2  
**Frontend:** Vercel, Netlify  
**Database:** Railway PostgreSQL, Render PostgreSQL, AWS RDS

### Railway Deployment (Backend)

1. Create new project on [Railway.app](https://railway.app)
2. Add PostgreSQL service
3. Connect GitHub repository (backend folder)
4. Set environment variables:
   ```
   DATABASE_URL=${POSTGRES_URL}
   JWT_SECRET=<your_secret_key>
   ADMIN_SECRET_KEY=<your_admin_key>
   FRONTEND_URL=https://your-frontend.vercel.app
   ```
5. Deploy!

### Vercel Deployment (Frontend)

1. Import project to [Vercel](https://vercel.com)
2. Set environment variable:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api
   ```
3. Deploy!

**Complete Deployment Guide:** See [`DEPLOYMENT.md`](DEPLOYMENT.md)

---

## 🧪 Testing

### Backend

```bash
# Run all tests
cd backend
mvn test

# Test with curl
curl http://localhost:5000/api/health
```

### Frontend

```bash
# Start dev server
pnpm dev

# Navigate to:
http://localhost:3000          # Home
http://localhost:3000/about    # About
http://localhost:3000/contact  # Contact
http://localhost:3000/admin/login  # Admin Login
```

---

## 🔧 Configuration

### Backend Environment Variables

```env
DATABASE_URL=jdbc:postgresql://localhost:5432/futuretech_db
DB_USERNAME=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters
ADMIN_SECRET_KEY=your_admin_setup_secret
FRONTEND_URL=http://localhost:3000
```

### Frontend Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 📚 Documentation

- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Complete feature overview
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deployment guide for all platforms
- **[ANIMATIONS.md](ANIMATIONS.md)** - Animation component usage
- **[backend/README.md](backend/README.md)** - Backend API documentation

---

## 🔒 Security

- JWT token authentication (7-day expiry)
- BCrypt password hashing (strength: 10)
- CORS protection
- SQL injection prevention (JPA)
- XSS protection (Spring Security)
- Input validation (Bean Validation)
- Rate limiting ready (configuration included)

---

## 📊 Database Schema

**6 Main Entities:**

1. **Admin** - Admin users with encrypted passwords
2. **Inquiry** - Contact form submissions
3. **Feedback** - User feedback (pending/approved/rejected)
4. **Testimonial** - Approved testimonials
5. **Content** - Dynamic site content by section
6. **SEO** - Page-specific SEO metadata

**Auto-seeded Data:**
- Default admin account
- Home, About, Services, Contact content
- SEO metadata for all pages

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

## 📞 Contact

**Future Tech Career**
- Email: careerisfuturetech@gmail.com
- Phone: 7385552872
- LinkedIn: [future-tech-career](https://www.linkedin.com/company/future-tech-career/)

---

## ⭐ Acknowledgments

- Spring Boot team
- Next.js team
- Framer Motion
- shadcn/ui
- Radix UI

---

## 🎉 Ready to Deploy!

Your platform is **production-ready** with:

✅ Secure backend API  
✅ Beautiful animated frontend  
✅ Complete documentation  
✅ Docker support  
✅ Deployment guides  

**Start building the future of tech careers! 🚀**
