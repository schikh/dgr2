@echo off
echo =========================================
echo DGR Exclusion App - Quick Start
echo =========================================
echo.

node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js v20 from: https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=1,2 delims=v." %%a in ('node --version') do (
    set major=%%b
)

if %major% LSS 18 (
    echo WARNING: Node.js version is too old!
    echo Current version: 
    node --version
    echo.
    echo Required: Node.js v18 or higher
    echo Download from: https://nodejs.org/
    echo.
    echo See NODE_VERSION_HELP.md for alternatives
    pause
    exit /b 1
)

echo Checking dependencies...
if not exist "node_modules\" (
    echo Installing dependencies...
    call npm install
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install dependencies
        pause
        exit /b 1
    )
)

echo.
echo Starting development server...
echo The app will open at: http://localhost:5173
echo.
call npm run dev

pause
