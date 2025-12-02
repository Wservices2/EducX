@echo off
title EducX - Redemarrage Complet
color 0A

echo.
echo  ███████╗██████╗ ██╗   ██╗ ██████╗██╗  ██╗
echo  ██╔════╝██╔══██╗██║   ██║██╔════╝╚██╗██╔╝
echo  █████╗  ██║  ██║██║   ██║██║      ╚███╔╝ 
echo  ██╔══╝  ██║  ██║██║   ██║██║      ██╔██╗ 
echo  ███████╗██████╔╝╚██████╔╝╚██████╗██╔╝ ██╗
echo  ╚══════╝╚═════╝  ╚═════╝  ╚═════╝╚═╝  ╚═╝
echo.
echo  🔄 REDEMARRAGE COMPLET - EducX
echo  📚 Resolution definitive du probleme de connexion
echo.

echo ⚠️  ARRET DES PROCESSUS EXISTANTS:
echo.

echo 1. Arret des processus Node.js...
taskkill /f /im node.exe > nul 2>&1
if %errorlevel% equ 0 (
    echo    ✅ Processus Node.js arretes
) else (
    echo    ℹ️  Aucun processus Node.js en cours
)

echo.
echo 2. Verification de MongoDB...
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
echo 3. Nettoyage des ports...
echo    🔍 Verification du port 3000...
netstat -an | findstr :3000 > nul 2>&1
if %errorlevel% equ 0 (
    echo    ⚠️  Port 3000 encore utilise
    echo    💡 Attente de liberation...
    timeout /t 3 /nobreak > nul
) else (
    echo    ✅ Port 3000 libre
)

echo.
echo 4. Demarrage du serveur backend...
echo    📡 URL: http://localhost:3000
echo    🔍 Surveillez les logs ci-dessous...
echo.

start "EducX Backend - Redemarrage" cmd /k "cd server && set PORT=3000 && set MONGODB_URI=mongodb://localhost:27017/educx && set NODE_ENV=development && echo ✅ Backend demarre sur http://localhost:3000 && echo 📊 MongoDB URI: mongodb://localhost:27017/educx && echo 🔍 Surveillez les logs ci-dessous... && echo. && npm start"

echo.
echo ⏳ Attente du demarrage du backend...
timeout /t 15 /nobreak > nul

echo.
echo 5. Test de connectivite...
echo    🧪 Test de l'endpoint racine...

curl -s http://localhost:3000/ > nul 2>&1
if %errorlevel% equ 0 (
    echo    ✅ Backend repond correctement
) else (
    echo    ❌ Backend ne repond pas
    echo    💡 Verifiez les logs du backend
    echo    💡 Relancez ce script
    pause
    exit /b 1
)

echo.
echo 6. Test d'inscription...
echo    🧪 Test d'inscription...

curl -X POST http://localhost:3000/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"fullName\":\"Test User\",\"email\":\"test@localhost.com\",\"password\":\"test123\"}" ^
  -s > nul 2>&1

if %errorlevel% equ 0 (
    echo    ✅ Test d'inscription reussi
) else (
    echo    ❌ Erreur lors du test d'inscription
    echo    💡 Verifiez les logs du backend
)

echo.
echo 7. Demarrage du frontend...
echo    🎨 URL: http://localhost:3001
echo    🔗 API URL: http://localhost:3000
echo.

start "EducX Frontend - Redemarrage" cmd /k "cd client && set PORT=3001 && set REACT_APP_API_URL=http://localhost:3000 && set BROWSER=none && echo ✅ Frontend demarre sur http://localhost:3001 && echo 🔗 API URL: http://localhost:3000 && echo 🔍 Surveillez les logs ci-dessous... && echo. && npm start"

echo.
echo ✅ REDEMARRAGE TERMINE!
echo.
echo 📡 Backend: http://localhost:3000
echo 🎨 Frontend: http://localhost:3001
echo.
echo 🔧 ACTIONS EFFECTUEES:
echo    ✅ Arret des processus Node.js existants
echo    ✅ Verification de MongoDB
echo    ✅ Nettoyage des ports
echo    ✅ Demarrage propre du backend
echo    ✅ Test de connectivite
echo    ✅ Demarrage du frontend
echo.
echo 🧪 TESTS DISPONIBLES:
echo    - node test-server-connectivity.js
echo    - node diagnose-localhost.js
echo.
echo 💡 Si le probleme persiste:
echo    1. Verifiez les logs du backend
echo    2. Verifiez que MongoDB est demarre
echo    3. Verifiez que le port 3000 est libre
echo    4. Relancez ce script
echo.

pause
