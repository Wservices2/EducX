@echo off
title EducX - Installation SQLite (Sans PostgreSQL)
color 0A

echo.
echo  ███████╗██████╗ ██╗   ██╗ ██████╗██╗  ██╗
echo  ██╔════╝██╔══██╗██║   ██║██╔════╝╚██╗██╔╝
echo  █████╗  ██║  ██║██║   ██║██║      ╚███╔╝ 
echo  ██╔══╝  ██║  ██║██║   ██║██║      ██╔██╗ 
echo  ███████╗██████╔╝╚██████╔╝╚██████╗██╔╝ ██╗
echo  ╚══════╝╚═════╝  ╚═════╝  ╚═════╝╚═╝  ╚═╝
echo.
echo  🚀 INSTALLATION SQLITE - EducX
echo  📚 Aucune installation de base de donnees requise!
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
echo 2. Installation des dependances principales...
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
echo 3. Installation des dependances du client...
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
echo 4. Configuration de Prisma avec SQLite...
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
echo 5. Creation de la base de donnees SQLite...
echo    🗄️  Application des migrations...

npx prisma migrate dev --name init
if %errorlevel% equ 0 (
    echo    ✅ Base de donnees SQLite creee
    echo    📁 Fichier: dev.db
) else (
    echo    ❌ Erreur lors de la creation de la base de donnees
    echo.
    pause
    exit /b 1
)

echo.
echo 6. Construction du client React...
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
echo 🚀 AVANTAGES DE SQLITE:
echo    ✅ Aucune installation de base de donnees requise
echo    ✅ Base de donnees dans un fichier local (dev.db)
echo    ✅ Configuration ultra-simple
echo    ✅ Parfait pour le developpement et les tests
echo.
echo 🚀 DEMARRAGE DU SERVEUR UNIFIE:
echo    📡 Backend + Frontend sur le port 3000
echo    🗄️  Base de donnees SQLite (fichier local)
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
