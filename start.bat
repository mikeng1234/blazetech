@echo off
setlocal
cd /d "%~dp0"

echo ========================================
echo  Blaze Tech Devt - Starting dev server
echo ========================================

REM Free port 3000 if anything is holding it (e.g. orphaned dev server)
for /f "tokens=5" %%a in ('netstat -ano ^| findstr /R /C:":3000 .*LISTENING"') do (
    echo Port 3000 in use by PID %%a - stopping it...
    taskkill /PID %%a /F >nul 2>&1
)

REM Also clear any stale next-dev lock for this project
if exist ".next\dev\next-dev.lock" del /F /Q ".next\dev\next-dev.lock" >nul 2>&1

REM Start the Next.js dev server in a new window
start "BlazeTech Dev Server" cmd /k "npm run dev"

REM Wait until http://localhost:3000 starts responding (max 60s)
echo Waiting for server to be ready...
set /a tries=0
:waitloop
set /a tries+=1
powershell -NoProfile -Command "try { (Invoke-WebRequest -Uri http://localhost:3000 -UseBasicParsing -TimeoutSec 2).StatusCode } catch { exit 1 }" >nul 2>&1
if %errorlevel%==0 goto open
if %tries% geq 30 goto open
timeout /t 2 /nobreak >nul
goto waitloop

:open
start chrome "http://localhost:3000"

endlocal
