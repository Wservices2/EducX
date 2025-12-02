#!/bin/bash

# Script d'installation pour EducX Platform
# Ce script installe toutes les dépendances nécessaires

echo "🚀 Installation de la plateforme EducX..."
echo "========================================"

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Veuillez installer Node.js 16+ depuis https://nodejs.org"
    exit 1
fi

# Vérifier la version de Node.js
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js version 16+ requise. Version actuelle: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) détecté"

# Vérifier si npm est installé
if ! command -v npm &> /dev/null; then
    echo "❌ npm n'est pas installé"
    exit 1
fi

echo "✅ npm $(npm -v) détecté"

# Installer les dépendances racine
echo "📦 Installation des dépendances racine..."
npm install

# Installer les dépendances du serveur
echo "📦 Installation des dépendances du serveur..."
cd server
npm install
cd ..

# Installer les dépendances du client
echo "📦 Installation des dépendances du client..."
cd client
npm install
cd ..

# Créer le fichier .env pour le serveur si il n'existe pas
if [ ! -f "server/.env" ]; then
    echo "📝 Création du fichier .env pour le serveur..."
    cat > server/.env << EOF
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/educx
JWT_SECRET=votre_secret_jwt_tres_securise_ici_changez_le_en_production
JWT_EXPIRE=7d
EOF
    echo "✅ Fichier .env créé dans server/"
fi

# Créer le fichier .env pour le client si il n'existe pas
if [ ! -f "client/.env" ]; then
    echo "📝 Création du fichier .env pour le client..."
    cat > client/.env << EOF
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ENV=development
EOF
    echo "✅ Fichier .env créé dans client/"
fi

echo ""
echo "🎉 Installation terminée avec succès!"
echo ""
echo "📋 Prochaines étapes:"
echo "1. Démarrer MongoDB sur votre système"
echo "2. Exécuter 'npm run dev' pour démarrer l'application"
echo "3. Ouvrir http://localhost:3000 dans votre navigateur"
echo ""
echo "📚 Documentation:"
echo "- README.md pour les instructions détaillées"
echo "- DEVELOPMENT.md pour la configuration de développement"
echo ""
echo "🔧 Commandes utiles:"
echo "- npm run dev     : Démarrer en mode développement"
echo "- npm run server  : Démarrer seulement le backend"
echo "- npm run client  : Démarrer seulement le frontend"
echo "- npm run build   : Build de production"
echo ""
echo "🇧🇯 Bienvenue sur EducX - Plateforme éducative béninoise!"
