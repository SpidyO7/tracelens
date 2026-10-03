@echo off
echo =======================================
echo Starting TraceLens Development Server
echo =======================================

echo.
echo [1/2] Starting Backend Server...
cd backend
start cmd /k "npm install && npm run seed && npm start"
cd ..

echo.
echo [2/2] Starting Frontend Vite Server...
cd frontend
start cmd /k "npm install && npm run dev"
cd ..

echo.
echo Both servers have been launched in separate windows!
echo - Backend API: http://localhost:5000
echo - Frontend UI: http://localhost:5173
echo.
pause
