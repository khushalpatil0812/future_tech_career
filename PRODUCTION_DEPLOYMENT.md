# Production Deployment Guide

## ⚠️ PRE-DEPLOYMENT CHECKLIST

### 1. Security Configuration

#### Backend Security
- [ ] Change `JWT_SECRET` in application.properties (minimum 32 characters)
- [ ] Change `ADMIN_SECRET_KEY` for admin registration
- [ ] Update `DB_PASSWORD` to a strong password
- [ ] Set `spring.jpa.show-sql=false` in production
- [ ] Set `logging.level.*=WARN` or `INFO` in production
- [ ] Never commit `.env` or `application-local.properties` to Git

#### Frontend Security
- [ ] Update `NEXT_PUBLIC_API_URL` to your production backend URL
- [ ] Ensure no hardcoded credentials in code
- [ ] Remove all `console.log` statements (already done)
- [ ] Remove debug sections (already done)

### 2. Database Setup

#### MySQL Database
```sql
-- Create production database
CREATE DATABASE futuretech_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create dedicated database user (recommended)
CREATE USER 'futuretech'@'localhost' IDENTIFIED BY 'strong_password_here';
GRANT ALL PRIVILEGES ON futuretech_db.* TO 'futuretech'@'localhost';
FLUSH PRIVILEGES;
```

#### Initial Admin Account
After backend starts, create admin account:
```
POST http://your-backend-url/api/auth/register-admin
Headers:
  X-Admin-Secret: your_admin_secret_key_value
Body:
{
  "email": "admin@futuretech.com",
  "password": "strong_password",
  "fullName": "Admin Name"
}
```

### 3. Backend Deployment

#### Option A: Traditional Server (VPS/Dedicated)

1. **Install Requirements**
   ```bash
   # Java 21
   sudo apt update
   sudo apt install openjdk-21-jdk
   
   # Maven
   sudo apt install maven
   
   # MySQL
   sudo apt install mysql-server
   ```

2. **Build Application**
   ```bash
   cd backend
   mvn clean package -DskipTests
   ```

3. **Configure Environment Variables**
   ```bash
   # Create .env file or export variables
   export DATABASE_URL="jdbc:mysql://localhost:3306/futuretech_db"
   export DB_USERNAME="futuretech"
   export DB_PASSWORD="your_strong_password"
   export JWT_SECRET="your_production_jwt_secret_minimum_32_chars"
   export FRONTEND_URL="https://your-frontend-domain.com"
   export ADMIN_SECRET_KEY="your_admin_secret"
   ```

4. **Run as Systemd Service**
   Create `/etc/systemd/system/futuretech-backend.service`:
   ```ini
   [Unit]
   Description=Future Tech Career Backend
   After=syslog.target mysql.service

   [Service]
   User=www-data
   WorkingDirectory=/opt/futuretech-backend
   ExecStart=/usr/bin/java -jar /opt/futuretech-backend/career-backend-1.0.0.jar
   SuccessExitStatus=143
   Environment="DATABASE_URL=jdbc:mysql://localhost:3306/futuretech_db"
   Environment="DB_USERNAME=futuretech"
   Environment="DB_PASSWORD=your_password"
   Environment="JWT_SECRET=your_jwt_secret"
   Environment="FRONTEND_URL=https://your-domain.com"
   Restart=always
   RestartSec=10

   [Install]
   WantedBy=multi-user.target
   ```

   Enable and start:
   ```bash
   sudo systemctl enable futuretech-backend
   sudo systemctl start futuretech-backend
   sudo systemctl status futuretech-backend
   ```

#### Option B: Docker Deployment

1. **Create Dockerfile** (already exists in backend/)

2. **Build and Run**
   ```bash
   cd backend
   docker build -t futuretech-backend .
   docker run -d \
     -p 5000:5000 \
     -e DATABASE_URL="jdbc:mysql://host.docker.internal:3306/futuretech_db" \
     -e DB_USERNAME="futuretech" \
     -e DB_PASSWORD="your_password" \
     -e JWT_SECRET="your_jwt_secret" \
     -e FRONTEND_URL="https://your-domain.com" \
     --name futuretech-backend \
     futuretech-backend
   ```

3. **Or use Docker Compose** (backend/docker-compose.yml exists)
   ```bash
   docker-compose up -d
   ```

#### Option C: Cloud Platform (AWS/Azure/GCP)

##### AWS Elastic Beanstalk
1. Install AWS CLI and EB CLI
2. Configure `eb init` in backend directory
3. Deploy: `eb create` or `eb deploy`

##### Azure App Service
1. Install Azure CLI
2. Create App Service
3. Deploy JAR file via Azure Portal or CLI

##### Google Cloud Run
1. Build container image
2. Push to Google Container Registry
3. Deploy to Cloud Run

### 4. Frontend Deployment

#### Option A: Vercel (Recommended for Next.js)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Set Environment Variables in Vercel Dashboard**
   - `NEXT_PUBLIC_API_URL`: Your backend URL (e.g., https://api.futuretech.com/api)

3. **Deploy**
   ```bash
   vercel --prod
   ```

#### Option B: Netlify

1. **Build Command**: `npm run build` or `pnpm build`
2. **Publish Directory**: `.next`
3. **Environment Variables**:
   - `NEXT_PUBLIC_API_URL`: Your backend URL

#### Option C: Traditional Server (Nginx)

1. **Build Application**
   ```bash
   npm run build
   # or
   pnpm build
   ```

2. **Copy Build Files**
   ```bash
   cp -r .next /var/www/futuretech-frontend/
   cp -r public /var/www/futuretech-frontend/
   cp package.json /var/www/futuretech-frontend/
   cd /var/www/futuretech-frontend
   npm install --production
   ```

3. **Run with PM2**
   ```bash
   npm install -g pm2
   pm2 start npm --name "futuretech-frontend" -- start
   pm2 save
   pm2 startup
   ```

4. **Configure Nginx**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

### 5. Domain and SSL Setup

#### SSL Certificate (Let's Encrypt)
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

#### Update CORS in Backend
Make sure `cors.allowed-origins` in application.properties includes your production domain:
```properties
cors.allowed-origins=https://your-domain.com,https://www.your-domain.com
```

### 6. Database Backup Strategy

#### Automated MySQL Backup Script
```bash
#!/bin/bash
BACKUP_DIR="/backups/mysql"
MYSQL_USER="futuretech"
MYSQL_PASSWORD="your_password"
MYSQL_DATABASE="futuretech_db"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR
mysqldump -u $MYSQL_USER -p$MYSQL_PASSWORD $MYSQL_DATABASE > $BACKUP_DIR/futuretech_db_$DATE.sql
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
```

Add to crontab for daily backups:
```bash
0 2 * * * /path/to/backup-script.sh
```

### 7. Monitoring and Logging

#### Application Logs
- **Backend**: `/var/log/futuretech-backend.log` (if using systemd with logging)
- **Frontend**: PM2 logs (`pm2 logs futuretech-frontend`)

#### Health Check Endpoints
- Backend: `http://your-backend-url:5000/api/health` (you may need to create this)
- Frontend: `http://your-frontend-url/`

#### Recommended Monitoring Tools
- **Uptime monitoring**: UptimeRobot, Pingdom
- **Error tracking**: Sentry
- **Performance**: New Relic, Datadog

### 8. Post-Deployment Verification

#### Backend Checks
- [ ] Server responds at `/api/health` or `/api/auth/login`
- [ ] Database connection successful
- [ ] CORS headers present in responses
- [ ] JWT authentication working
- [ ] Can create admin account
- [ ] Can login to admin panel

#### Frontend Checks
- [ ] Site loads without errors
- [ ] API calls reach backend successfully
- [ ] Contact form submits successfully
- [ ] Feedback form submits successfully
- [ ] Admin login works
- [ ] Admin dashboard displays data
- [ ] All admin pages accessible
- [ ] SEO meta tags present
- [ ] Images loading correctly
- [ ] Mobile responsive

#### Security Checks
- [ ] HTTPS enabled (SSL certificate)
- [ ] Database credentials secure
- [ ] JWT secret is strong and unique
- [ ] No sensitive data in client-side code
- [ ] CORS restricted to your domains only
- [ ] SQL injection protected (JPA handles this)
- [ ] XSS protection (React handles this)

### 9. Performance Optimization

#### Backend
- Enable GZIP compression
- Use connection pooling (HikariCP - already configured)
- Cache frequently accessed data
- Enable database indexing

#### Frontend
- Image optimization (Next.js handles this)
- Code splitting (Next.js handles this)
- CDN for static assets
- Browser caching headers

### 10. Maintenance

#### Regular Updates
```bash
# Backend dependencies
cd backend
mvn versions:display-dependency-updates

# Frontend dependencies
npm outdated
# or
pnpm outdated
```

#### Database Maintenance
```sql
-- Optimize tables monthly
OPTIMIZE TABLE inquiries, feedback, testimonials, admins;

-- Check database size
SELECT 
    table_schema AS 'Database',
    SUM(data_length + index_length) / 1024 / 1024 AS 'Size (MB)' 
FROM information_schema.TABLES 
WHERE table_schema = 'futuretech_db'
GROUP BY table_schema;
```

## 🚨 CRITICAL REMINDERS

1. **Never commit these files to Git:**
   - `.env`
   - `application-local.properties`
   - Any file with real passwords or secrets

2. **Change default credentials immediately:**
   - Database password
   - JWT secret
   - Admin secret key
   - Default admin password after first login

3. **Backup database before any updates**

4. **Test in staging environment before production**

5. **Monitor error logs after deployment**

## 📞 Support

For deployment issues:
- Check application logs
- Verify environment variables
- Confirm database connectivity
- Check CORS configuration
- Verify firewall/security group rules

## 🎯 Quick Start for Testing Production Build Locally

### Backend
```bash
cd backend
# Set production profile
export SPRING_PROFILES_ACTIVE=prod
# Or use environment-specific properties
java -jar -Dspring.profiles.active=prod target/career-backend-1.0.0.jar
```

### Frontend
```bash
# Build
pnpm build

# Test production build locally
pnpm start
```

This will help identify issues before actual deployment.
