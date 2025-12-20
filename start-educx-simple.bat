@echo off
echo 🚀 Démarrage d'EducX...
echo.

echo 📁 Vérification des fichiers...
if not exist "prisma\schema.prisma" (
    echo ❌ Schéma Prisma non trouvé
    pause
    exit /b 1
)

if not exist ".env" (
    echo ❌ Fichier .env non trouvé
    pause
    exit /b 1
)

echo ✅ Fichiers trouvés
echo.

echo 🔧 Génération du client Prisma...
npx prisma generate
if %errorlevel% neq 0 (
    echo ❌ Erreur lors de la génération du client Prisma
    pause
    exit /b 1
)

echo ✅ Client Prisma généré
echo.

echo 🗄️ Création de la base de données...
npx prisma db push
if %errorlevel% neq 0 (
    echo ❌ Erreur lors de la création de la base de données
    pause
    exit /b 1
)

echo ✅ Base de données créée
echo.

echo 🚀 Démarrage du serveur...
node server.js

pause
