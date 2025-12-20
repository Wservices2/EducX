# Configuration de développement pour EducX

## Variables d'environnement requises

### Backend (.env)
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/educx
JWT_SECRET=votre_secret_jwt_tres_securise_ici_changez_le_en_production
JWT_EXPIRE=7d
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ENV=development
```

## Ports utilisés
- Frontend React: 3000
- Backend Node.js: 5000
- MongoDB: 27017

## Commandes utiles

### Installation
```bash
# Installer toutes les dépendances
npm run install-all

# Installer seulement le backend
cd server && npm install

# Installer seulement le frontend
cd client && npm install
```

### Développement
```bash
# Démarrer tout en mode développement
npm run dev

# Démarrer seulement le backend
npm run server

# Démarrer seulement le frontend
npm run client
```

### Production
```bash
# Build de production
npm run build

# Démarrer en production
npm start
```

## Structure des dossiers

```
educx-platform/
├── client/                 # Frontend React
│   ├── public/            # Fichiers publics
│   ├── src/
│   │   ├── components/    # Composants réutilisables
│   │   ├── pages/         # Pages de l'application
│   │   ├── hooks/         # Hooks personnalisés
│   │   ├── context/       # Context API
│   │   ├── utils/         # Fonctions utilitaires
│   │   └── styles/        # Styles globaux
│   └── package.json
├── server/                 # Backend Node.js
│   ├── routes/            # Routes API
│   ├── models/            # Modèles Mongoose
│   ├── middleware/        # Middlewares Express
│   ├── controllers/       # Logique métier
│   ├── utils/             # Utilitaires serveur
│   └── package.json
└── package.json           # Configuration racine
```

## Base de données

### Collections MongoDB
- `users` - Utilisateurs de la plateforme
- `courses` - Cours disponibles
- `enrollments` - Inscriptions aux cours
- `certificates` - Certificats obtenus
- `categories` - Catégories de cours

### Modèles de données
```javascript
// User
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  email: String,
  password: String (hashed),
  role: String, // 'student', 'instructor', 'admin'
  profile: {
    avatar: String,
    bio: String,
    location: String,
    phone: String
  },
  createdAt: Date,
  updatedAt: Date
}

// Course
{
  _id: ObjectId,
  title: String,
  description: String,
  instructor: ObjectId (ref: User),
  category: String,
  level: String, // 'beginner', 'intermediate', 'advanced'
  duration: Number, // en heures
  price: Number,
  thumbnail: String,
  lessons: [ObjectId], // ref: Lesson
  students: [ObjectId], // ref: User
  rating: Number,
  reviews: [ObjectId], // ref: Review
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints

### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `POST /api/auth/logout` - Déconnexion
- `GET /api/auth/profile` - Profil utilisateur

### Cours
- `GET /api/courses` - Liste des cours
- `GET /api/courses/:id` - Détails d'un cours
- `POST /api/courses` - Créer un cours (instructeur)
- `PUT /api/courses/:id` - Modifier un cours
- `DELETE /api/courses/:id` - Supprimer un cours

### Utilisateurs
- `GET /api/users/profile` - Profil utilisateur
- `PUT /api/users/profile` - Modifier le profil
- `GET /api/users/courses` - Cours de l'utilisateur
- `POST /api/users/enroll` - S'inscrire à un cours

## Sécurité

### Middlewares de sécurité
- Helmet pour les headers de sécurité
- Rate limiting pour éviter les abus
- CORS configuré pour le frontend
- Validation des données d'entrée
- Chiffrement des mots de passe avec bcrypt
- Tokens JWT pour l'authentification

### Bonnes pratiques
- Variables d'environnement pour les secrets
- Validation côté client et serveur
- Gestion d'erreurs centralisée
- Logs de sécurité
- HTTPS en production

## Déploiement

### Prérequis production
- Node.js 16+
- MongoDB Atlas ou instance MongoDB
- Serveur web (Nginx/Apache)
- SSL Certificate
- Domain name

### Variables d'environnement production
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=secret_tres_securise_production
PORT=5000
```

## Monitoring et logs

### Logs recommandés
- Logs d'authentification
- Logs d'erreurs
- Logs de performance
- Logs d'activité utilisateur

### Métriques importantes
- Nombre d'utilisateurs actifs
- Cours les plus populaires
- Taux de complétion des cours
- Temps de réponse API
- Erreurs 4xx/5xx
