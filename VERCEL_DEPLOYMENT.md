# Frontend Deployment Guide - Vercel

## Step 1: Prepare Environment Variables

Create `.env.production` file in your project root:

```env
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com/api
```

## Step 2: Deploy to Vercel

### Option A: Using Vercel CLI (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
# From project root
vercel

# For production
vercel --prod
```

### Option B: Using Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/new)
2. Click **"Import Project"**
3. Import from GitHub: `khushalpatil0812/future_tech_career`
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (leave as root)
   - **Build Command**: `pnpm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `pnpm install`

5. **Environment Variables**:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com/api
   ```

6. Click **"Deploy"**

## Step 3: Update Backend CORS

After deployment, update your backend `application-prod.properties`:

```properties
app.cors.allowed-origins=https://your-app.vercel.app,http://localhost:3000
```

Redeploy backend on Render.

## Step 4: Test Your Deployment

Your site will be available at: `https://your-app.vercel.app`

Test:
- Homepage loads correctly
- Testimonials display (from backend API)
- Contact form submission works
- Admin login works

## Environment Variables Needed

```env
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com/api
```

## Automatic Deployments

Vercel will automatically deploy:
- **Production**: When you push to `main` branch
- **Preview**: When you create a pull request

## Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update CORS in backend to include your custom domain

## Important Notes

- Vercel free tier includes:
  - 100GB bandwidth/month
  - Unlimited deployments
  - Automatic HTTPS
  - Edge network CDN
  
- Build time limit: 45 minutes (more than enough)
- Function execution: 10 seconds max (Serverless functions)

## Troubleshooting

### Build Fails
- Check build logs in Vercel Dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### API Calls Fail
- Check `NEXT_PUBLIC_API_URL` is correct
- Ensure backend CORS includes Vercel domain
- Check backend is running on Render

### Environment Variables Not Working
- Must start with `NEXT_PUBLIC_` to be accessible in browser
- Redeploy after changing env vars
- Check in Project Settings → Environment Variables
