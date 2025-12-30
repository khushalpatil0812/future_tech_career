# Future Tech Career Backend API

Production-ready Spring Boot backend for the Future Tech Career platform.

## 🚀 Features

- ✅ RESTful API with Spring Boot 3.2
- ✅ JWT Authentication & Authorization
- ✅ PostgreSQL Database with JPA/Hibernate
- ✅ Role-based Access Control (Admin)
- ✅ Input Validation & Error Handling
- ✅ CORS Configuration
- ✅ Auto-seeding with Default Data
- ✅ Docker Support
- ✅ Production-ready Configuration

## 📋 Prerequisites

- Java 17 or higher
- Maven 3.9+
- PostgreSQL 14+
- (Optional) Docker & Docker Compose

## 🛠️ Local Development Setup

### 1. Clone the Repository

```bash
cd backend
```

### 2. Configure Database

Create a PostgreSQL database:

```sql
CREATE DATABASE futuretech_db;
```

### 3. Set Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Edit `.env`:

```env
DATABASE_URL=jdbc:postgresql://localhost:5432/futuretech_db
DB_USERNAME=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long
ADMIN_SECRET_KEY=your_admin_setup_secret
FRONTEND_URL=http://localhost:5173
```

### 4. Run the Application

```bash
# Install dependencies and run
mvn spring-boot:run

# Or build and run jar
mvn clean package
java -jar target/career-backend-1.0.0.jar
```

The API will be available at `http://localhost:5000`

## 🐳 Docker Deployment

### Build Docker Image

```bash
docker build -t futuretech-backend .
```

### Run with Docker Compose

```bash
docker-compose up -d
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Health Check
```http
GET /api/health
```

### Authentication

#### Register Admin (First Time)
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "admin@futuretech.com",
  "password": "SecurePassword123!",
  "name": "Admin User"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@futuretech.com",
  "password": "admin123"
}

Response:
{
  "success": true,
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "...",
      "email": "admin@futuretech.com",
      "name": "Admin User",
      "role": "admin"
    }
  }
}
```

### Public Endpoints

#### Get Testimonials
```http
GET /api/testimonials?limit=6
```

#### Submit Contact Inquiry
```http
POST /api/inquiries
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "inquiryType": "Career Guidance",
  "message": "I need help with career planning..."
}
```

#### Submit Feedback
```http
POST /api/feedback
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "rating": 5,
  "feedback": "Excellent service!",
  "consent": true
}
```

#### Get Content
```http
GET /api/content/{section}
# sections: home_hero, about_text, services_text, contact_info
```

#### Get SEO Metadata
```http
GET /api/seo/{page}
# pages: home, about, services, contact, feedback
```

### Admin Endpoints (Requires JWT Token)

All admin endpoints require:
```http
Authorization: Bearer <jwt_token>
```

#### Dashboard Stats
```http
GET /api/admin/dashboard
```

#### Manage Inquiries
```http
GET /api/admin/inquiries?page=1&limit=10&status=unread
PATCH /api/admin/inquiries/{id}/read
DELETE /api/admin/inquiries/{id}
```

#### Manage Feedback
```http
GET /api/admin/feedback?page=1&limit=10&status=pending
POST /api/admin/feedback/{id}/approve
POST /api/admin/feedback/{id}/reject
```

#### Manage Testimonials
```http
GET /api/admin/testimonials?page=1&limit=10
PATCH /api/admin/testimonials/{id}/toggle
PATCH /api/admin/testimonials/{id}
DELETE /api/admin/testimonials/{id}
```

#### Update Content
```http
PUT /api/admin/content/{section}
Content-Type: application/json

{
  "content": "Updated content..."
}
```

#### Update SEO
```http
PUT /api/admin/seo/{page}
Content-Type: application/json

{
  "title": "New Title",
  "description": "New description",
  "keywords": "keyword1, keyword2"
}
```

## 🔐 Default Credentials

After first run, a default admin account is created:

```
Email: admin@futuretech.com
Password: admin123
```

**⚠️ IMPORTANT: Change this password immediately in production!**

## 🚀 Deployment

### Railway / Render / Heroku

1. **Create PostgreSQL Database**
   - Add PostgreSQL addon/service
   - Note the `DATABASE_URL`

2. **Set Environment Variables**
   ```
   DATABASE_URL=<your_database_url>
   JWT_SECRET=<generate_secure_key>
   ADMIN_SECRET_KEY=<generate_secure_key>
   FRONTEND_URL=<your_frontend_url>
   SPRING_PROFILES_ACTIVE=prod
   ```

3. **Deploy**
   - Connect GitHub repository
   - Set build command: `mvn clean package -DskipTests`
   - Set start command: `java -jar target/career-backend-1.0.0.jar`

4. **Database Auto-initialization**
   - Tables will be created automatically
   - Default admin and content will be seeded

## 📦 Project Structure

```
backend/
├── src/main/java/com/futuretech/career/
│   ├── config/          # Configuration classes
│   ├── controller/      # REST controllers
│   ├── dto/            # Data Transfer Objects
│   ├── exception/      # Custom exceptions & handlers
│   ├── model/          # JPA entities
│   ├── repository/     # JPA repositories
│   ├── security/       # Security & JWT utilities
│   └── service/        # Business logic
├── src/main/resources/
│   ├── application.properties
│   └── application-prod.properties
├── Dockerfile
├── docker-compose.yml
├── pom.xml
└── README.md
```

## 🧪 Testing

```bash
# Run tests
mvn test

# Run with coverage
mvn test jacoco:report
```

## 📝 License

MIT License

## 👥 Support

For issues or questions:
- Email: careerisfuturetech@gmail.com
- LinkedIn: https://www.linkedin.com/company/future-tech-career/
