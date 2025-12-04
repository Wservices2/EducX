@echo off
title EducX - Serveur Unifie
color 0B

echo.
echo  ███████╗██████╗ ██╗   ██╗ ██████╗██╗  ██╗
echo  ██╔════╝██╔══██╗██║   ██║██╔════╝╚██╗██╔╝
echo  █████╗  ██║  ██║██║   ██║██║      ╚███╔╝ 
echo  ██╔══╝  ██║  ██║██║   ██║██║      ██╔██╗ 
echo  ███████╗██████╔╝╚██████╔╝╚██████╗██╔╝ ██╗
echo  ╚══════╝╚═════╝  ╚═════╝  ╚═════╝╚═╝  ╚═╝
echo.
echo  🚀 SERVEUR UNIFIE - EducX
echo  📚 Prisma + PostgreSQL + React
echo.

echo ⚠️  VERIFICATIONS RAPIDES:
echo.

echo 1. Verification de PostgreSQL...
psql -h localhost -U postgres -d educx -c "SELECT 1;" > nul 2>&1
if %errorlevel% equ 0 (
    echo    ✅ PostgreSQL actif
) else (
    echo    ❌ PostgreSQL non accessible
    echo    💡 Demarrez PostgreSQL ou verifiez la configuration
    echo.
    pause
    exit /b 1
)

echo.
echo 2. Verification des fichiers...
if exist "server.js" (
    echo    ✅ Serveur unifie trouve
) else (
    echo    ❌ Fichier server.js manquant
    echo    💡 Lancez d'abord install-unified.bat
    echo.
    pause
    exit /b 1
)

if exist "client\build" (
    echo    ✅ Application React construite
) else (
    echo    ⚠️  Application React non construite
    echo    💡 Construction en cours...
    cd client
    npm run build
    cd ..
    if exist "client\build" (
        echo    ✅ Application React construite
    ) else (
        echo    ❌ Erreur lors de la construction
        echo.
        pause
        exit /b 1
    )
)

echo.
echo 3. Demarrage du serveur unifie...
echo    📡 Backend + Frontend sur le port 3000
echo    🗄️  Base de donnees PostgreSQL
echo    🔧 ORM Prisma
echo.

start "EducX Serveur Unifie" cmd /k "echo ✅ Serveur EducX demarre sur http://localhost:3000 && echo 📊 API disponible sur http://localhost:3000/api && echo 🔍 Surveillez les logs ci-dessous... && echo. && npm start"

echo.
echo ✅ SERVEUR DEMARRE!
echo.
echo 🔗 URLS IMPORTANTES:
echo    - Application: http://localhost:3000
echo    - API: http://localhost:3000/api
echo    - Test API: http://localhost:3000/api/auth/register
echo.
echo 💡 COMMANDES UTILES:
echo    - npx prisma studio  : Interface de gestion de la base de donnees
echo    - npx prisma migrate : Appliquer les migrations
echo    - npm run dev        : Mode developpement avec rechargement
echo.
echo 🧪 TESTEZ MAINTENANT:
echo    1. Ouvrez http://localhost:3000
echo    2. Essayez de vous inscrire
echo    3. L'erreur de connexion devrait disparaitre
echo.

pause
