#!/bin/bash

echo "🚀 Démarrage d'EducX..."
echo ""

# Vérifier Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Installez Node.js depuis https://nodejs.org"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Vérifier MongoDB
echo "🔍 Vérification de MongoDB..."
if command -v mongosh &> /dev/null; then
    if mongosh --eval "db.adminCommand('ping')" --quiet > /dev/null 2>&1; then
        echo "✅ MongoDB est disponible"
    else
        echo "⚠️ MongoDB n'est pas démarré. Démarrez MongoDB avec: mongod"
    fi
else
    echo "⚠️ MongoDB n'est pas installé. Installez MongoDB depuis https://www.mongodb.com/try/download/community"
fi

echo ""
echo "📡 Démarrage du serveur backend sur le port 3000..."

# Démarrer le backend
cd server
PORT=3000 MONGODB_URI=mongodb://localhost:27017/educx NODE_ENV=development npm start &
BACKEND_PID=$!

# Attendre un peu
sleep 5

echo "🎨 Démarrage du client React sur le port 3001..."

# Démarrer le frontend
cd ../client
PORT=3001 REACT_APP_API_URL=http://localhost:3000 npm start &
FRONTEND_PID=$!

echo ""
echo "✅ Les serveurs sont en cours de démarrage..."
echo "📡 Backend: http://localhost:3000"
echo "🎨 Frontend: http://localhost:3001"
echo ""
echo "⚠️ IMPORTANT: Le frontend communique directement avec le backend"
echo "   sans proxy pour éviter les conflits de port."
echo ""
echo "Appuyez sur Ctrl+C pour arrêter les serveurs..."

# Fonction de nettoyage
cleanup() {
    echo ""
    echo "🛑 Arrêt des serveurs..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    echo "✅ Serveurs arrêtés"
    exit 0
}

# Capturer Ctrl+C
trap cleanup SIGINT

# Attendre
wait
