# 🔧 Guide de Dépannage EducX

## Problèmes de Connexion et Inscription

### 1. Erreur de Proxy
**Symptôme :** `Proxy request from 3000 to 5000` ou erreurs de connexion

**Solutions :**
```bash
# Vérifiez que les ports sont corrects
# Backend: port 3000
# Frontend: port 3001

# Redémarrez les serveurs
npm start
```

### 2. Erreur MongoDB
**Symptôme :** `MongoDB connection failed`

**Solutions :**
```bash
# Installez MongoDB
# Windows: https://www.mongodb.com/try/download/community
# macOS: brew install mongodb-community
# Linux: sudo apt-get install mongodb

# Démarrez MongoDB
mongod

# Ou utilisez MongoDB Atlas (cloud)
# Modifiez MONGODB_URI dans server/.env
```

### 3. Erreur CORS
**Symptôme :** `CORS policy` ou `Access-Control-Allow-Origin`

**Solutions :**
- Vérifiez que le serveur backend est sur le port 3000
- Vérifiez que le frontend est sur le port 3001
- Les URLs CORS sont configurées dans `server/index.js`

### 4. Erreur de Port Occupé
**Symptôme :** `Port 3000 is already in use`

**Solutions :**
```bash
# Trouvez le processus qui utilise le port
netstat -ano | findstr :3000

# Tuez le processus (Windows)
taskkill /PID <PID> /F

# Ou changez le port dans server/index.js
```

## Commandes de Test

### Test de l'API
```bash
# Testez l'endpoint racine
curl http://localhost:3000/

# Testez l'inscription
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test User","email":"test@educx.bj","password":"test123"}'
```

### Test de Connectivité
```bash
# Vérifiez que MongoDB répond
mongosh --eval "db.adminCommand('ping')"

# Vérifiez que le serveur répond
curl http://localhost:3000/api/auth/login
```

## Configuration Recommandée

### Variables d'Environnement
Créez un fichier `server/.env` :
```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/educx
JWT_SECRET=educx_super_secret_key_2024
```

### Ports
- **Backend API:** 3000
- **Frontend React:** 3001
- **MongoDB:** 27017 (défaut)

## Démarrage Rapide

```bash
# 1. Installez les dépendances
npm run install-all

# 2. Démarrez MongoDB
mongod

# 3. Démarrez les serveurs
npm start

# 4. Ouvrez http://localhost:3001
```

## Logs de Débogage

### Backend
```bash
cd server
DEBUG=* npm start
```

### Frontend
```bash
cd client
REACT_APP_DEBUG=true npm start
```

## Problèmes Courants

### 1. Token JWT Invalide
- Vérifiez que `JWT_SECRET` est défini
- Vérifiez que le token n'est pas expiré

### 2. Validation des Données
- Vérifiez les schémas Joi dans `server/routes/auth.js`
- Vérifiez que les champs requis sont fournis

### 3. Base de Données
- Vérifiez que MongoDB est démarré
- Vérifiez la connexion avec `mongosh`

## Support

Si les problèmes persistent :
1. Vérifiez les logs dans la console
2. Testez avec curl/Postman
3. Vérifiez la configuration réseau
4. Redémarrez tous les services
