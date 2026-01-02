# Start Backend Server Script
Write-Host "Starting Future Tech Career Backend Server..." -ForegroundColor Green

# Navigate to backend directory
Set-Location -Path "d:\future-tech-career\backend"

# Check if MySQL is running
$mysqlService = Get-Service -Name MySQL80 -ErrorAction SilentlyContinue
if ($mysqlService -and $mysqlService.Status -eq 'Running') {
    Write-Host "MySQL service is running" -ForegroundColor Green
} else {
    Write-Host "ERROR: MySQL service is not running!" -ForegroundColor Red
    Write-Host "Please start MySQL service first" -ForegroundColor Yellow
    exit 1
}

# Check if JAR file exists
if (-not (Test-Path ".\target\career-backend-1.0.0.jar")) {
    Write-Host "JAR file not found. Building the project..." -ForegroundColor Yellow
    mvn clean package -DskipTests
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERROR: Build failed!" -ForegroundColor Red
        exit 1
    }
}

# Start the backend server
Write-Host "Starting backend on port 5000..." -ForegroundColor Cyan
java -jar ".\target\career-backend-1.0.0.jar"
