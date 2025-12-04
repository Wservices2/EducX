# Script d'installation PowerShell pour EducX Platform
# Ce script installe toutes les dépendances nécessaires sur Windows

Write-Host "🚀 Installation de la plateforme EducX..." -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

# Vérifier si Node.js est installé
try {
    $nodeVersion = node -v
    Write-Host "✅ Node.js $nodeVersion détecté" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js n'est pas installé. Veuillez installer Node.js 16+ depuis https://nodejs.org" -ForegroundColor Red
    exit 1
}

# Vérifier la version de Node.js
$versionNumber = [int]($nodeVersion -replace 'v(\d+)\..*', '$1')
if ($versionNumber -lt 16) {
    Write-Host "❌ Node.js version 16+ requise. Version actuelle: $nodeVersion" -ForegroundColor Red
    exit 1
}

# Vérifier si npm est installé
try {
    $npmVersion = npm -v
    Write-Host "✅ npm $npmVersion détecté" -ForegroundColor Green
} catch {
    Write-Host "❌ npm n'est pas installé" -ForegroundColor Red
    exit 1
}

# Installer les dépendances racine
Write-Host "📦 Installation des dépendances racine..." -ForegroundColor Yellow
npm install

# Installer les dépendances du serveur
Write-Host "📦 Installation des dépendances du serveur..." -ForegroundColor Yellow
Set-Location server
npm install
Set-Location ..

# Installer les dépendances du client
Write-Host "📦 Installation des dépendances du client..." -ForegroundColor Yellow
Set-Location client
npm install
Set-Location ..

# Créer le fichier .env pour le serveur si il n'existe pas
if (-not (Test-Path "server\.env")) {
    Write-Host "📝 Création du fichier .env pour le serveur..." -ForegroundColor Yellow
    @"
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/educx
JWT_SECRET=votre_secret_jwt_tres_securise_ici_changez_le_en_production
JWT_EXPIRE=7d
"@ | Out-File -FilePath "server\.env" -Encoding UTF8
    Write-Host "✅ Fichier .env créé dans server/" -ForegroundColor Green
}

# Créer le fichier .env pour le client si il n'existe pas
if (-not (Test-Path "client\.env")) {
    Write-Host "📝 Création du fichier .env pour le client..." -ForegroundColor Yellow
    @"
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ENV=development
"@ | Out-File -FilePath "client\.env" -Encoding UTF8
    Write-Host "✅ Fichier .env créé dans client/" -ForegroundColor Green
}

Write-Host ""
Write-Host "🎉 Installation terminée avec succès!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Prochaines étapes:" -ForegroundColor Cyan
Write-Host "1. Démarrer MongoDB sur votre système" -ForegroundColor White
Write-Host "2. Exécuter 'npm run dev' pour démarrer l'application" -ForegroundColor White
Write-Host "3. Ouvrir http://localhost:3000 dans votre navigateur" -ForegroundColor White
Write-Host ""
Write-Host "📚 Documentation:" -ForegroundColor Cyan
Write-Host "- README.md pour les instructions détaillées" -ForegroundColor White
Write-Host "- DEVELOPMENT.md pour la configuration de développement" -ForegroundColor White
Write-Host ""
Write-Host "🔧 Commandes utiles:" -ForegroundColor Cyan
Write-Host "- npm run dev     : Démarrer en mode développement" -ForegroundColor White
Write-Host "- npm run server  : Démarrer seulement le backend" -ForegroundColor White
Write-Host "- npm run client  : Démarrer seulement le frontend" -ForegroundColor White
Write-Host "- npm run build   : Build de production" -ForegroundColor White
Write-Host ""
Write-Host "🇧🇯 Bienvenue sur EducX - Plateforme éducative béninoise!" -ForegroundColor Green
