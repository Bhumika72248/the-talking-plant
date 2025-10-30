@echo off
echo 🌱 Starting The Talking Plant...
echo.
echo Installing frontend dependencies...
cd frontend
call npm install
echo.
echo Installing backend dependencies...
cd ..\backend
call npm install
echo.
echo Starting backend server...
start "Backend" cmd /k "npm run dev"
echo.
echo Starting frontend server...
cd ..\frontend
start "Frontend" cmd /k "npm run dev"
echo.
echo ✅ Both servers starting...
echo Backend: http://localhost:3001
echo Frontend: http://localhost:3000
pause