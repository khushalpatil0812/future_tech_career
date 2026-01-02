# Pre-Deployment Test Script
# Run this script to verify everything works before deploying to production

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "🚀 Future-Tech Career - Production Test" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$errors = 0
$warnings = 0

# Check if backend JAR exists
Write-Host "📦 Checking Backend Build..." -ForegroundColor Yellow
if (Test-Path "backend\target\career-backend-1.0.0.jar") {
    Write-Host "✅ Backend JAR file found" -ForegroundColor Green
} else {
    Write-Host "❌ Backend JAR not found. Run: cd backend && mvn clean package -DskipTests" -ForegroundColor Red
    $errors++
}

# Check if node_modules exists
Write-Host ""
Write-Host "📦 Checking Frontend Dependencies..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "✅ Frontend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "❌ Frontend dependencies not installed. Run: pnpm install" -ForegroundColor Red
    $errors++
}

# Check for .env files
Write-Host ""
Write-Host "🔐 Checking Configuration Files..." -ForegroundColor Yellow
if (Test-Path ".env.example") {
    Write-Host "✅ Frontend .env.example found" -ForegroundColor Green
} else {
    Write-Host "⚠️  Frontend .env.example missing" -ForegroundColor Yellow
    $warnings++
}

if (Test-Path "backend\.env.example") {
    Write-Host "✅ Backend .env.example found" -ForegroundColor Green
} else {
    Write-Host "⚠️  Backend .env.example missing" -ForegroundColor Yellow
    $warnings++
}

# Check if backend is running
Write-Host ""
Write-Host "🔌 Checking Services..." -ForegroundColor Yellow
try {
    $backendResponse = Invoke-WebRequest -Uri "http://localhost:5000/api/auth/login" -Method HEAD -ErrorAction SilentlyContinue -TimeoutSec 2
    Write-Host "✅ Backend is running on port 5000" -ForegroundColor Green
} catch {
    Write-Host "❌ Backend not running. Start with: java -jar backend\target\career-backend-1.0.0.jar" -ForegroundColor Red
    $errors++
}

# Check MySQL
Write-Host ""
Write-Host "🗄️  Checking Database..." -ForegroundColor Yellow
$mysqlService = Get-Service -Name "MySQL*" -ErrorAction SilentlyContinue
if ($mysqlService -and $mysqlService.Status -eq "Running") {
    Write-Host "✅ MySQL service is running" -ForegroundColor Green
} else {
    Write-Host "❌ MySQL service not found or not running" -ForegroundColor Red
    $errors++
}

# Test database connection
Write-Host ""
Write-Host "🔍 Testing Database Connection..." -ForegroundColor Yellow
try {
    $dbTest = mysql -u root -p"KHUSHAL#0812" -e "USE futuretech_db; SELECT 1;" 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Database connection successful" -ForegroundColor Green
    } else {
        Write-Host "❌ Database connection failed" -ForegroundColor Red
        $errors++
    }
} catch {
    Write-Host "⚠️  Could not test database connection" -ForegroundColor Yellow
    $warnings++
}

# Check for production config warnings
Write-Host ""
Write-Host "⚠️  Security Configuration Warnings:" -ForegroundColor Yellow
Write-Host "   Before deploying to production, ensure you:" -ForegroundColor White
Write-Host "   1. Change JWT_SECRET in application.properties" -ForegroundColor White
Write-Host "   2. Change ADMIN_SECRET_KEY" -ForegroundColor White
Write-Host "   3. Change database password" -ForegroundColor White
Write-Host "   4. Update CORS allowed-origins" -ForegroundColor White
Write-Host "   5. Set NEXT_PUBLIC_API_URL to production backend" -ForegroundColor White

# Summary
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "📊 Test Summary" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
if ($errors -eq 0 -and $warnings -eq 0) {
    Write-Host "✅ All checks passed! Ready for deployment." -ForegroundColor Green
} elseif ($errors -eq 0) {
    Write-Host "⚠️  All critical checks passed. $warnings warnings." -ForegroundColor Yellow
} else {
    Write-Host "❌ $errors errors found. Fix them before deployment." -ForegroundColor Red
}
Write-Host ""

# Quick test endpoints
Write-Host "🧪 Quick API Tests (if backend is running):" -ForegroundColor Cyan
Write-Host ""

if ($errors -eq 0) {
    # Test public endpoint
    Write-Host "Testing GET /api/testimonials/active..." -ForegroundColor Yellow
    try {
        $response = Invoke-RestMethod -Uri "http://localhost:5000/api/testimonials/active" -Method GET -TimeoutSec 5
        Write-Host "✅ Public API working" -ForegroundColor Green
    } catch {
        Write-Host "❌ Public API failed: $($_.Exception.Message)" -ForegroundColor Red
    }

    # Test admin login (should return 401 or 400 without credentials)
    Write-Host ""
    Write-Host "Testing POST /api/auth/login..." -ForegroundColor Yellow
    try {
        $body = @{ email = "test@test.com"; password = "test" } | ConvertTo-Json
        $response = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method POST -Body $body -ContentType "application/json" -TimeoutSec 5
        Write-Host "⚠️  Login test returned unexpected success" -ForegroundColor Yellow
    } catch {
        if ($_.Exception.Response.StatusCode -eq 401 -or $_.Exception.Response.StatusCode -eq 400) {
            Write-Host "✅ Admin auth endpoint responding (401/400 expected)" -ForegroundColor Green
        } else {
            Write-Host "❌ Admin auth failed: $($_.Exception.Message)" -ForegroundColor Red
        }
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "📚 Next Steps:" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "1. Review PRODUCTION_READY_SUMMARY.md" -ForegroundColor White
Write-Host "2. Update configuration values (JWT secret, etc.)" -ForegroundColor White
Write-Host "3. Follow PRODUCTION_DEPLOYMENT.md" -ForegroundColor White
Write-Host "4. Deploy backend first, then frontend" -ForegroundColor White
Write-Host "5. Create first admin account" -ForegroundColor White
Write-Host "6. Test all functionality in production" -ForegroundColor White
Write-Host ""
