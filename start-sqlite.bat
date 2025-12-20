@echo off
title EducX - Serveur SQLite
color 0B

echo.
echo  ███████╗██████╗ ██╗   ██╗ ██████╗██╗  ██╗
echo  ██╔════╝██╔══██╗██║   ██║██╔════╝╚██╗██╔╝
echo  █████╗  ██║  ██║██║   ██║██║      ╚███╔╝ 
echo  ██╔══╝  ██║  ██║██║   ██║██║      ██╔██╗ 
echo  ███████╗██████╔╝╚██████╔╝╚██████╗██╔╝ ██╗
echo  ╚══════╝╚═════╝  ╚═════╝  ╚═════╝╚═╝  ╚═╝
echo.
echo  🚀 SERVEUR SQLITE - EducX
echo  📚 Aucune installation de base de donnees requise!
echo.

echo ⚠️  VERIFICATIONS RAPIDES:
echo.

echo 1. Verification des fichiers...
if exist "server.js" (
    echo    ✅ Serveur unifie trouve
) else (
    echo    ❌ Fichier server.js manquant
    echo    💡 Lancez d'abord install-sqlite.bat
    echo.
    pause
    exit /b 1
)

if exist "dev.db" (
    echo    ✅ Base de donnees SQLite trouvee
) else (
    echo    ⚠️  Base de donnees SQLite non trouvee
    echo    💡 Creation de la base de donnees...
    npx prisma migrate dev --name init
    if exist "dev.db" (
        echo    ✅ Base de donnees SQLite creee
    ) else (
        echo    ❌ Erreur lors de la creation de la base de donnees
        echo.
        pause
        exit /b 1
    )
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
echo 2. Demarrage du serveur SQLite...
echo    📡 Backend + Frontend sur le port 3000
echo    🗄️  Base de donnees SQLite (fichier local)
echo    🔧 ORM Prisma
echo.

start "EducX Serveur SQLite" cmd /k "echo ✅ Serveur EducX demarre sur http://localhost:3000 && echo 📊 API disponible sur http://localhost:3000/api && echo 🗄️ Base de donnees SQLite: dev.db && echo 🔍 Surveillez les logs ci-dessous... && echo. && npm start"

echo.
echo ✅ SERVEUR DEMARRE!
echo.
echo 🚀 AVANTAGES DE SQLITE:
echo    ✅ Aucune installation de base de donnees requise
echo    ✅ Base de donnees dans un fichier local (dev.db)
echo    ✅ Configuration ultra-simple
echo    ✅ Parfait pour le developpement
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
echo    4. La base de donnees est dans le fichier dev.db
echo.

pause
