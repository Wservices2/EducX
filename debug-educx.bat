@echo off
title EducX - Debug Mode
color 0C

echo.
echo  ███████╗██████╗ ██╗   ██╗ ██████╗██╗  ██╗
echo  ██╔════╝██╔══██╗██║   ██║██╔════╝╚██╗██╔╝
echo  █████╗  ██║  ██║██║   ██║██║      ╚███╔╝ 
echo  ██╔══╝  ██║  ██║██║   ██║██║      ██╔██╗ 
echo  ███████╗██████╔╝╚██████╔╝╚██████╗██╔╝ ██╗
echo  ╚══════╝╚═════╝  ╚═════╝  ╚═════╝╚═╝  ╚═╝
echo.
echo  🔧 MODE DEBUG - EducX
echo  📚 Diagnostic des problemes de creation de compte
echo.

echo ⚠️  VERIFICATIONS PREALABLES:
echo.

echo 1. Verification de MongoDB...
mongosh --eval "db.adminCommand('ping')" --quiet > nul 2>&1
if %errorlevel% equ 0 (
    echo    ✅ MongoDB est actif
) else (
    echo    ❌ MongoDB n'est pas actif
    echo    💡 Demarrez MongoDB avec: mongod
    echo.
    pause
    exit /b 1
)

echo.
echo 2. Verification de Node.js...
node --version > nul 2>&1
if %errorlevel% equ 0 (
    echo    ✅ Node.js est installe
) else (
    echo    ❌ Node.js n'est pas installe
    echo    💡 Installez Node.js depuis https://nodejs.org
    echo.
    pause
    exit /b 1
)

echo.
echo 3. Test de l'API backend...
echo    📡 Demarrage du serveur backend...
echo.

start "EducX Backend Debug" cmd /k "cd server && set PORT=3000 && set MONGODB_URI=mongodb://localhost:27017/educx && set NODE_ENV=development && echo ✅ Backend demarre sur http://localhost:3000 && echo 📊 MongoDB URI: mongodb://localhost:27017/educx && echo 🔍 Surveillez les logs ci-dessous pour les erreurs... && echo. && npm start"

echo.
echo ⏳ Attente du demarrage du backend...
timeout /t 10 /nobreak > nul

echo.
echo 4. Test de l'API avec curl...
echo    🧪 Test de l'endpoint racine...

curl -s http://localhost:3000/ > nul 2>&1
if %errorlevel% equ 0 (
    echo    ✅ Backend repond correctement
) else (
    echo    ❌ Backend ne repond pas
    echo    💡 Verifiez les logs du backend ci-dessus
)

echo.
echo 5. Test de creation de compte...
echo    🧪 Test d'inscription...

curl -X POST http://localhost:3000/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"fullName\":\"Test User\",\"email\":\"test@educx.bj\",\"password\":\"test123\"}" ^
  -s > nul 2>&1

if %errorlevel% equ 0 (
    echo    ✅ Test d'inscription reussi
) else (
    echo    ❌ Erreur lors du test d'inscription
    echo    💡 Verifiez les logs du backend
)

echo.
echo 6. Demarrage du frontend...
echo    🎨 Demarrage du client React...

start "EducX Frontend Debug" cmd /k "cd client && set PORT=3001 && set REACT_APP_API_URL=http://localhost:3000 && set BROWSER=none && echo ✅ Frontend demarre sur http://localhost:3001 && echo 🔗 API URL: http://localhost:3000 && echo 🔍 Surveillez les logs ci-dessous pour les erreurs... && echo. && npm start"

echo.
echo ✅ DIAGNOSTIC TERMINE!
echo.
echo 📡 Backend: http://localhost:3000
echo 🎨 Frontend: http://localhost:3001
echo.
echo 🔍 LOGS IMPORTANTS A VERIFIER:
echo    - Erreurs MongoDB dans le backend
echo    - Erreurs de validation Joi
echo    - Erreurs de connexion CORS
echo    - Erreurs de hashage de mot de passe
echo.
echo 💡 Si la creation de compte echoue encore:
echo    1. Verifiez les logs du backend
echo    2. Testez avec: node test-registration.js
echo    3. Verifiez MongoDB: node test-mongodb.js
echo.

pause
