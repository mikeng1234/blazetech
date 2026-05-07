@echo off
setlocal
cd /d "%~dp0"

echo ========================================
echo  Compressing images in /public ...
echo ========================================
echo.

node "%~dp0scripts\compress-images.mjs"

echo.
echo Done. Press any key to close.
pause >nul
endlocal
