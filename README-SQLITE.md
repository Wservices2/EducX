# EducX - Version SQLite (Ultra-Simple)

## 🚀 Installation Ultra-Simple

**Aucune installation de base de données requise !** SQLite est inclus avec Node.js.

## ✨ Avantages de SQLite

- ✅ **Aucune installation** de base de données requise
- ✅ **Base de données dans un fichier local** (dev.db)
- ✅ **Configuration ultra-simple**
- ✅ **Parfait pour le développement** et les tests
- ✅ **Portable** - peut être copié facilement
- ✅ **Un seul port** (3000) pour tout

## 🛠️ Technologies

- **Backend** : Node.js + Express
- **Frontend** : React (servi statiquement)
- **Base de données** : SQLite (fichier local)
- **ORM** : Prisma
- **Authentification** : JWT

## 📋 Prérequis

1. **Node.js** (version 16 ou plus récente)
2. **npm** ou **yarn**

**C'est tout !** Pas besoin d'installer PostgreSQL ou MySQL.

## 🚀 Installation Rapide

### Option 1 : Installation Automatique (Recommandée)
```bash
install-sqlite.bat
```

### Option 2 : Démarrage Direct
```bash
start-sqlite.bat
```

### Option 3 : Installation Manuelle

1. **Installer les dépendances**
```bash
npm install
cd client && npm install && cd ..
```

2. **Configurer Prisma**
```bash
# Générer le client Prisma
npx prisma generate

# Créer la base de données SQLite
npx prisma migrate dev --name init
```

3. **Construire le frontend**
```bash
cd client && npm run build && cd ..
```

4. **Démarrer le serveur**
```bash
npm start
```

## 🔧 Configuration

### Variables d'Environnement

Créez un fichier `.env` à la racine du projet :

```env
# Base de données SQLite (fichier local)
DATABASE_URL="file:./dev.db"

# JWT Secret
JWT_SECRET="educx-super-secret-key"

# Port du serveur
PORT=3000

# Environnement
NODE_ENV=development
```

**C'est tout !** Pas de configuration de base de données complexe.

## 🎯 Utilisation

### Démarrage du Serveur
```bash
# Mode production
npm start

# Mode développement (avec rechargement)
npm run dev
```

### URLs Importantes
- **Application** : http://localhost:3000
- **API** : http://localhost:3000/api
- **Prisma Studio** : http://localhost:5555 (après `npx prisma studio`)

### Commandes Utiles
```bash
# Gestion de la base de données
npx prisma studio          # Interface graphique
npx prisma migrate dev     # Appliquer les migrations
npx prisma migrate reset   # Réinitialiser la base de données
npx prisma generate        # Régénérer le client Prisma

# Développement
npm run dev               # Mode développement
npm run build            # Construire le frontend
```

## 📊 Structure du Projet

```
educx-sqlite/
├── server.js              # Serveur unifié (API + Frontend)
├── package.json           # Dépendances principales
├── dev.db                 # Base de données SQLite (fichier local)
├── prisma/
│   └── schema.prisma     # Schéma de base de données
├── client/               # Application React
│   ├── src/
│   ├── public/
│   └── build/            # Frontend construit (servi par Express)
├── install-sqlite.bat    # Script d'installation Windows
├── start-sqlite.bat      # Script de démarrage Windows
└── README.md
```

## 🔐 Authentification

### Inscription
```bash
POST /api/auth/register
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Connexion
```bash
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Profil Utilisateur
```bash
GET /api/auth/profile
Authorization: Bearer <token>
```

## 🗄️ Base de Données SQLite

### Modèles Principaux

- **User** : Utilisateurs (étudiants, instructeurs, admins)
- **Profile** : Profils utilisateurs étendus
- **Course** : Cours disponibles
- **Lesson** : Leçons des cours
- **CourseEnrollment** : Inscriptions aux cours
- **Certificate** : Certificats obtenus

### Avantages de SQLite

- **Fichier local** : `dev.db` contient toute la base de données
- **Portable** : Copiez le fichier `dev.db` pour sauvegarder
- **Rapide** : Parfait pour le développement
- **Simple** : Aucune configuration de serveur

## 🧪 Tests

### Test de la Base de Données
```bash
node test-sqlite.js
```

### Test de l'API
```bash
# Test de l'endpoint racine
curl http://localhost:3000/api

# Test d'inscription
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@example.com","password":"test123"}'
```

### Test de l'Application
1. Ouvrir http://localhost:3000
2. Essayer de s'inscrire
3. Vérifier que l'inscription fonctionne
4. Tester la connexion

## 🐛 Dépannage

### Problèmes Courants

1. **Erreur de connexion à la base de données**
   - Vérifiez que le fichier `dev.db` existe
   - Exécutez `npx prisma migrate dev --name init`

2. **Erreur de migration Prisma**
   - Exécutez `npx prisma migrate reset`
   - Puis `npx prisma migrate dev --name init`

3. **Frontend non accessible**
   - Vérifiez que `npm run build` a été exécuté
   - Vérifiez que le dossier `client/build` existe

4. **Port 3000 occupé**
   - Changez le PORT dans le fichier .env
   - Ou arrêtez le processus qui utilise le port 3000

### Logs Utiles

```bash
# Vérifier les logs du serveur
npm start

# Vérifier la base de données
npx prisma studio

# Vérifier les migrations
npx prisma migrate status
```

## 🚀 Déploiement

### Production

1. **Configurer les variables d'environnement**
2. **Construire le frontend** : `npm run build`
3. **Appliquer les migrations** : `npx prisma migrate deploy`
4. **Démarrer le serveur** : `npm start`

### Variables d'Environnement Production

```env
NODE_ENV=production
DATABASE_URL="file:./prod.db"
JWT_SECRET="your-super-secure-secret"
PORT=3000
```

## 📞 Support

Pour toute question ou problème :
1. Vérifiez les logs du serveur
2. Consultez la documentation Prisma
3. Vérifiez que le fichier `dev.db` existe
4. Testez avec les scripts fournis

## 🎉 Avantages de cette Solution SQLite

- ✅ **Aucune installation** de base de données requise
- ✅ **Base de données dans un fichier local** (dev.db)
- ✅ **Configuration ultra-simple**
- ✅ **Parfait pour le développement** et les tests
- ✅ **Portable** - peut être copié facilement
- ✅ **Un seul port** (3000) pour tout
- ✅ **Déploiement facile** - un seul serveur à gérer
- ✅ **Développement rapide** - hot reload avec `npm run dev`
- ✅ **Gestion de base de données** - interface graphique avec Prisma Studio

## 🔄 Migration depuis PostgreSQL

Si vous aviez déjà configuré PostgreSQL, vous pouvez facilement migrer :

1. **Sauvegardez vos données** (si nécessaire)
2. **Changez le provider** dans `prisma/schema.prisma` :
   ```prisma
   datasource db {
     provider = "sqlite"
     url      = env("DATABASE_URL")
   }
   ```
3. **Mettez à jour le .env** :
   ```env
   DATABASE_URL="file:./dev.db"
   ```
4. **Appliquez les migrations** :
   ```bash
   npx prisma migrate dev --name init
   ```

**C'est tout !** Votre base de données est maintenant en SQLite.
