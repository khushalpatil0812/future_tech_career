# Backend Deployment Guide - Render (Without Docker)

## Prerequisites
- GitHub repository with your backend code
- Render account (sign up at https://render.com)

## Step 1: Create PostgreSQL Database on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"PostgreSQL"**
3. Configure:
   - **Name**: `futuretech-db`
   - **Database**: `futuretech_db`
   - **User**: `futuretech_user`
   - **Region**: Choose closest to your users (Oregon, Frankfurt, Singapore, etc.)
   - **PostgreSQL Version**: 16 (latest)
   - **Plan**: **Free** (or Starter $7/month for better performance)

4. Click **"Create Database"**

5. After creation, copy the **Internal Database URL** from the database dashboard
   - It looks like: `postgresql://futuretech_user:password@dpg-xxxxx/futuretech_db`
   - Keep this for Step 3

## Step 2: Configure Production Settings

The `application-prod.properties` file has been created in your backend folder.

You'll need to add these as Environment Variables in Render (Step 3).

## Step 3: Deploy Backend

### Option A: Using Render Dashboard (Recommended)

1. Go to Render Dashboard → **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `future-tech-career-backend`
   - **Region**: Same as database
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Java`
   - **Build Command**: `mvn clean package -DskipTests`
   - **Start Command**: `java -jar target/career-backend-1.0.0.jar`
   - **Instance Type**: Free or Starter
## Step 3: Deploy Backend on Render

### Using Render Dashboard

1. **Push your code to GitHub** (if not already done):
```bash
cd d:\future-tech-career
git add .
git commit -m "Prepare for production deployment"
git push origin main
```

2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Click **"New +"** → **"Web Service"**
4. Connect your GitHub account and select repository: `khushalpatil0812/future_tech_career`

5. **Configure Service**:
   - **Name**: `future-tech-career-backend`
   - **Region**: Choose closest to your users (e.g., Oregon, Frankfurt)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Environment**: `Java`
   - **Build Command**: `mvn clean package -DskipTests`
   - **Start Command**: `java -jar target/career-backend-1.0.0.jar`
   - **Instance Type**: `Free` (or Starter $7/month for better performance)

6. **Environment Variables** - Click "Advanced" and add:
   ```
   SPRING_PROFILES_ACTIVE=prod
   DATABASE_URL=[Paste Internal Database URL from Step 1]
   JWT_SECRET=your-very-secure-random-string-min-32-chars
   CORS_ORIGINS=https://your-app.vercel.app,http://localhost:3000
   ```
   
   **Important**: Use the **Internal Database URL** from Step 1, not the External URL.
   It should start with `postgresql://` (Render uses PostgreSQL, not MySQL)
   DB_USERNAME=[your-db-username]
   DB_PASSWORD=[your-db-password]
## Step 4: Initialize Database

After backend deployment, initialize your database:

1. **Connect to PostgreSQL database** using the connection info from Render:
   - In Render Dashboard → Your Database → "Connect"
   - Use the External Database URL for connecting from your machine

2. **Using psql command line**:
```bash
# Copy External Database URL from Render
psql postgresql://futuretech_user:password@dpg-xxxxx-external.postgres.render.com/futuretech_db

# Then paste and run the SQL commands from insert_sample_data.sql
```

3. **Using Render Shell** (Easier):
   - Go to your **Web Service** (not database) in Render Dashboard
   - Click **"Shell"** tab
   - Run this command:
```bash
psql $DATABASE_URL -f /app/insert_sample_data.sql
```

4. **Verify data**:
```sql
SELECT COUNT(*) FROM feedback WHERE status = 'approved';
-- Should return 6
```

**Note**: The SQL file uses MySQL syntax. PostgreSQL should auto-convert most of it, but if you see errors, the tables will still be created by Hibernate automatically.r backend will be available at: `https://future-tech-career-backend.onrender.com`

Test endpoints:
```bash
# Test public endpoint
curl https://future-tech-career-backend.onrender.com/api/public/feedback

## Important Notes

- **Free Tier Limitations**:
  - Spins down after 15 minutes of inactivity
  - Takes ~30 seconds to wake up on first request
  - 750 hours/month (enough for one service 24/7)
  
- **Paid Plans**: Starter at $7/month for always-on instance
- **Logs**: Available in Render Dashboard → Your Service → Logs
- **Auto-Deploy**: Enabled by default on `main` branch pushes
- **Free Tier**: Spins down after 15 minutes of inactivity (takes ~30s to wake up)
- **Paid Plans**: Starts at $7/month for always-on instance
- **Database**: Free tier PostgreSQL has 90-day limit, then $7/month
- **Logs**: Available in Render Dashboard under your service
### Database Connection Issues
- Verify all database environment variables are set correctly
- Check database allows external connections
- Test connection string locally first
- Ensure database firewall allows Render's IP addresses
- Check Java version matches (21)
- Ensure `pom.xml` is in the root of `backend` directory
- Check build logs in Render Dashboard

### Database Connection Issues
- Verify `DATABASE_URL` environment variable is set
- Check database is running in same region
- Ensure internal database URL is used (not external)

### CORS Errors
- Update `app.cors.allowed-origins` in application-prod.properties
- Add your Vercel domain to allowed origins

### Port Issues
- Render automatically sets `PORT` environment variable
- Ensure your app uses `server.port=${PORT:5000}`
