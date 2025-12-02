@echo off
title EducX - Installation Unifiee
color 0A

echo.
echo  ███████╗██████╗ ██╗   ██╗ ██████╗██╗  ██╗
echo  ██╔════╝██╔══██╗██║   ██║██╔════╝╚██╗██╔╝
echo  █████╗  ██║  ██║██║   ██║██║      ╚███╔╝ 
echo  ██╔══╝  ██║  ██║██║   ██║██║      ██╔██╗ 
echo  ███████╗██████╔╝╚██████╔╝╚██████╗██╔╝ ██╗
echo  ╚══════╝╚═════╝  ╚═════╝  ╚═════╝╚═╝  ╚═╝
echo.
echo  🚀 INSTALLATION UNIFIEE - EducX
echo  📚 Prisma + PostgreSQL + Serveur Unifie
echo.

echo ⚠️  VERIFICATIONS PREALABLES:
echo.

echo 1. Verification de Node.js...
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
echo 2. Verification de PostgreSQL...
psql --version > nul 2>&1
if %errorlevel% equ 0 (
    echo    ✅ PostgreSQL est installe
) else (
    echo    ❌ PostgreSQL n'est pas installe
    echo    💡 Installez PostgreSQL depuis https://www.postgresql.org/download/
    echo.
    pause
    exit /b 1
)

echo.
echo 3. Verification de la base de donnees...
psql -h localhost -U postgres -d educx -c "SELECT 1;" > nul 2>&1
if %errorlevel% equ 0 (
    echo    ✅ Base de donnees 'educx' existe
) else (
    echo    ⚠️  Base de donnees 'educx' n'existe pas
    echo    💡 Creation de la base de donnees...
    psql -h localhost -U postgres -c "CREATE DATABASE educx;" > nul 2>&1
    if %errorlevel% equ 0 (
        echo    ✅ Base de donnees 'educx' creee
    ) else (
        echo    ❌ Erreur lors de la creation de la base de donnees
        echo    💡 Verifiez que PostgreSQL est demarre et accessible
        echo.
        pause
        exit /b 1
    )
)

echo.
echo 4. Installation des dependances...
echo    📦 Installation des packages Node.js...

npm install
if %errorlevel% equ 0 (
    echo    ✅ Dependances principales installees
) else (
    echo    ❌ Erreur lors de l'installation des dependances
    echo.
    pause
    exit /b 1
)

echo.
echo 5. Installation des dependances du client...
echo    📦 Installation des packages React...

cd client
npm install
if %errorlevel% equ 0 (
    echo    ✅ Dependances client installees
) else (
    echo    ❌ Erreur lors de l'installation des dependances client
    echo.
    pause
    exit /b 1
)

cd ..

echo.
echo 6. Configuration de Prisma...
echo    🔧 Generation du client Prisma...

npx prisma generate
if %errorlevel% equ 0 (
    echo    ✅ Client Prisma genere
) else (
    echo    ❌ Erreur lors de la generation du client Prisma
    echo.
    pause
    exit /b 1
)

echo.
echo 7. Migration de la base de donnees...
echo    🗄️  Application des migrations...

npx prisma migrate dev --name init
if %errorlevel% equ 0 (
    echo    ✅ Migrations appliquees
) else (
    echo    ❌ Erreur lors des migrations
    echo.
    pause
    exit /b 1
)

echo.
echo 8. Construction du client React...
echo    🏗️  Construction de l'application React...

cd client
npm run build
if %errorlevel% equ 0 (
    echo    ✅ Application React construite
) else (
    echo    ❌ Erreur lors de la construction
    echo.
    pause
    exit /b 1
)

cd ..

echo.
echo ✅ INSTALLATION TERMINEE!
echo.
echo 🚀 DEMARRAGE DU SERVEUR UNIFIE:
echo    📡 Backend + Frontend sur le port 3000
echo    🗄️  Base de donnees PostgreSQL
echo    🔧 ORM Prisma
echo.
echo 💡 COMMANDES UTILES:
echo    - npm start          : Demarrer le serveur
echo    - npm run dev        : Mode developpement
echo    - npx prisma studio  : Interface de gestion de la base de donnees
echo    - npx prisma migrate : Appliquer les migrations
echo.
echo 🔗 URLS:
echo    - Application: http://localhost:3000
echo    - API: http://localhost:3000/api
echo    - Prisma Studio: http://localhost:5555 (apres npx prisma studio)
echo.

echo Voulez-vous demarrer le serveur maintenant? (O/N)
set /p choice="Votre choix: "
if /i "%choice%"=="O" (
    echo.
    echo 🚀 Demarrage du serveur...
    npm start
) else (
    echo.
    echo 💡 Pour demarrer le serveur plus tard, utilisez: npm start
    echo.
    pause
)
