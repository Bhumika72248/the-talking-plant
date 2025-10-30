@echo off
echo 🌱 Starting The Talking Plant...
echo.
echo Installing dependencies...
call npm run install-all
echo.
echo Starting development servers...
echo Backend: http://localhost:3001
echo Frontend: http://localhost:3000
echo.
call npm run dev