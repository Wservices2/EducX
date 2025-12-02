# EducX - Plateforme Éducative Béninoise (Version Unifiée)

## 🚀 Architecture Simplifiée

Cette version unifie le backend et le frontend sur un seul port (3000) avec Prisma et PostgreSQL pour une solution plus simple et robuste.

## ✨ Avantages de cette Architecture

- **Un seul port** : Plus de conflits entre frontend et backend
- **Prisma ORM** : Gestion de base de données moderne et type-safe
- **PostgreSQL** : Base de données robuste et performante
- **Serveur unifié** : API et frontend servis depuis le même serveur
- **Configuration simplifiée** : Moins de variables d'environnement

## 🛠️ Technologies Utilisées

- **Backend** : Node.js + Express
- **Frontend** : React (servi statiquement)
- **Base de données** : PostgreSQL
- **ORM** : Prisma
- **Authentification** : JWT
- **Validation** : Joi

## 📋 Prérequis

1. **Node.js** (version 16 ou plus récente)
2. **PostgreSQL** (version 12 ou plus récente)
3. **npm** ou **yarn**

## 🚀 Installation Rapide

### Option 1 : Installation Automatique (Recommandée)
```bash
install-unified.bat
```

### Option 2 : Installation Manuelle

1. **Installer les dépendances**
```bash
npm install
cd client && npm install && cd ..
```

2. **Configurer PostgreSQL**
```bash
# Créer la base de données
psql -h localhost -U postgres -c "CREATE DATABASE educx;"
```

3. **Configurer Prisma**
```bash
# Générer le client Prisma
npx prisma generate

# Appliquer les migrations
npx prisma migrate dev --name init
```

4. **Construire le frontend**
```bash
cd client && npm run build && cd ..
```

5. **Démarrer le serveur**
```bash
npm start
```

## 🔧 Configuration

### Variables d'Environnement

Créez un fichier `.env` à la racine du projet :

```env
# Base de données PostgreSQL
DATABASE_URL="postgresql://postgres:password@localhost:5432/educx?schema=public"

# JWT Secret
JWT_SECRET="educx-super-secret-key-change-in-production"

# Port du serveur
PORT=3000

# Environnement
NODE_ENV=development
```

### Configuration PostgreSQL

1. **Installer PostgreSQL** depuis [postgresql.org](https://www.postgresql.org/download/)
2. **Démarrer le service PostgreSQL**
3. **Créer la base de données** :
   ```sql
   CREATE DATABASE educx;
   CREATE USER educx_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE educx TO educx_user;
   ```

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
educx-unified/
├── server.js              # Serveur unifié (API + Frontend)
├── package.json           # Dépendances principales
├── prisma/
│   └── schema.prisma     # Schéma de base de données
├── client/               # Application React
│   ├── src/
│   ├── public/
│   └── build/            # Frontend construit (servi par Express)
├── install-unified.bat   # Script d'installation Windows
├── start-unified.bat     # Script de démarrage Windows
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

## 🗄️ Base de Données

### Modèles Principaux

- **User** : Utilisateurs (étudiants, instructeurs, admins)
- **Profile** : Profils utilisateurs étendus
- **Course** : Cours disponibles
- **Lesson** : Leçons des cours
- **CourseEnrollment** : Inscriptions aux cours
- **Certificate** : Certificats obtenus

### Relations

- Un utilisateur peut avoir un profil
- Un utilisateur peut créer plusieurs cours
- Un utilisateur peut s'inscrire à plusieurs cours
- Un cours peut avoir plusieurs leçons
- Un utilisateur peut obtenir plusieurs certificats

## 🧪 Tests

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
   - Vérifiez que PostgreSQL est démarré
   - Vérifiez la configuration DATABASE_URL
   - Vérifiez que la base de données 'educx' existe

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
DATABASE_URL="postgresql://user:password@host:port/database"
JWT_SECRET="your-super-secure-secret"
PORT=3000
```

## 📞 Support

Pour toute question ou problème :
1. Vérifiez les logs du serveur
2. Consultez la documentation Prisma
3. Vérifiez la configuration PostgreSQL
4. Testez avec les scripts fournis

## 🎉 Avantages de cette Solution

- ✅ **Un seul port** : Plus de conflits
- ✅ **Prisma** : ORM moderne et type-safe
- ✅ **PostgreSQL** : Base de données robuste
- ✅ **Configuration simple** : Moins de variables d'environnement
- ✅ **Déploiement facile** : Un seul serveur à gérer
- ✅ **Développement rapide** : Hot reload avec `npm run dev`
- ✅ **Gestion de base de données** : Interface graphique avec Prisma Studio
