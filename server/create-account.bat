@echo off
echo Creating demo account...
curl.exe -X POST http://localhost:5000/api/auth/signup -H "Content-Type: application/json" -d "{\"name\":\"Demo User\",\"email\":\"demo@career.ai\",\"password\":\"Demo123!\"}"
echo.
echo Done!
pause
