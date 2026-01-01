# Testing Your Database Connection - Quick Guide

## ✅ What We've Confirmed:
1. **MySQL is running and working** ✓
2. **Database `futuretech_db` exists** ✓  
3. **Connection credentials are correct** ✓
4. **Java 21 is installed** ✓
5. **Maven is installed** ✓
6. **JAVA_HOME is set** ✓

## 📋 Manual Steps to Test Your Backend:

### Option 1: Using IntelliJ IDEA or Eclipse (Easiest)
1. Open IntelliJ IDEA / Eclipse
2. Import project: `D:\future-tech-career\backend`
3. Wait for Maven to download dependencies
4. Right-click `FutureTechCareerApplication.java`
5. Click "Run" or "Debug"
6. Check console - you should see:
   ```
   Started FutureTechCareerApplication in X seconds
   ```

### Option 2: Command Line (If IDEs don't work)

#### Step 1: Open **NEW** PowerShell (Admin)
```powershell
# Set JAVA_HOME for this session
$env:JAVA_HOME = 'C:\Program Files\Eclipse Adoptium\jdk-21.0.8.9-hotspot'

# Navigate to backend
cd D:\future-tech-career\backend

# Build the project
mvn clean package -DskipTests

# Run the JAR file
java -jar target/career-backend-1.0.0.jar
```

#### Step 2: Check if it's running
Open browser and go to:
```
http://localhost:5000/api/health
```

You should see:
```json
{
  "status": "UP",
  "database": "Connected"
}
```

#### Step 3: Check Database Tables
In another PowerShell:
```powershell
mysql -u root -pKHUSHAL#0812 futuretech_db -e "SHOW TABLES;"
```

You should see tables like:
- admins
- contents
- feedback
- inquiries
- seo
- testimonials

## 🎯 Quick Test Endpoints:

Once running, test these in browser or Postman:

### 1. Health Check
```
GET http://localhost:5000/api/health
```

### 2. Get All Testimonials
```
GET http://localhost:5000/api/testimonials
```

### 3. Get All Feedback
```
GET http://localhost:5000/api/feedback
```

## ⚠️ Common Issues:

### "Port 5000 already in use"
```powershell
# Find what's using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F
```

### "Cannot connect to database"
- Check MySQL is running: `mysql -u root -p`
- Verify password in `application.properties`

### "JAVA_HOME not set"
Run this in PowerShell:
```powershell
[System.Environment]::SetEnvironmentVariable('JAVA_HOME', 'C:\Program Files\Eclipse Adoptium\jdk-21.0.8.9-hotspot', 'User')
```
Then **restart PowerShell**.

## 🚀 Ready to Deploy?

Once local testing works, we'll deploy to:
- **Frontend**: Vercel (free, always on)
- **Backend**: Render (free with sleep)
- **Database**: Render PostgreSQL (free, always on)

Let me know when your backend runs successfully!
