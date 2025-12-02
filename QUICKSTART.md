# Guide de démarrage rapide - EducX Platform

## 🚀 Installation et démarrage

### Prérequis
- Node.js 16+ installé
- MongoDB installé et démarré
- Git installé

### Installation automatique

**Sur Windows :**
```powershell
.\install.ps1
```

**Sur macOS/Linux :**
```bash
chmod +x install.sh
./install.sh
```

### Installation manuelle

1. **Cloner le projet**
```bash
git clone <votre-repo-url>
cd educx-platform
```

2. **Installer les dépendances**
```bash
npm run install-all
```

3. **Configurer l'environnement**
```bash
# Créer le fichier .env pour le serveur
cp server/.env.example server/.env

# Éditer server/.env avec vos configurations
# Créer le fichier .env pour le client
cp client/.env.example client/.env
```

4. **Démarrer MongoDB**
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

5. **Démarrer l'application**
```bash
npm run dev
```

## 🌐 Accès à l'application

- **Frontend** : http://localhost:3000
- **Backend API** : http://localhost:5000
- **Documentation API** : http://localhost:5000/api

## 📱 Fonctionnalités principales

### Page d'accueil
- Hero section avec appel à l'action
- Statistiques de la plateforme
- Section des fonctionnalités principales
- Design responsive et moderne

### Composants disponibles
- **Header** : Navigation principale avec menu mobile
- **Footer** : Liens et informations de contact
- **Button** : Boutons avec différentes variantes
- **Card** : Cartes pour afficher du contenu
- **Input** : Champs de saisie avec validation

### API Endpoints
- `GET /api/auth/profile` - Profil utilisateur
- `POST /api/auth/login` - Connexion
- `POST /api/auth/register` - Inscription
- `GET /api/courses` - Liste des cours
- `GET /api/courses/:id` - Détails d'un cours

## 🎨 Personnalisation

### Couleurs et thème
Le thème est configuré dans `client/src/styles/theme.js` avec :
- Couleurs inspirées du drapeau béninois
- Gradients modernes
- Ombres et bordures arrondies
- Typographie Inter

### Configuration
- Variables d'environnement dans `.env`
- Configuration API dans `client/src/config/index.js`
- Middlewares dans `server/middleware/`

## 🔧 Commandes utiles

```bash
# Développement
npm run dev          # Démarre frontend + backend
npm run client       # Démarre uniquement le frontend
npm run server       # Démarre uniquement le backend

# Production
npm run build        # Build de production
npm start           # Démarre en production

# Maintenance
npm run install-all # Installe toutes les dépendances
```

## 📊 Structure de la base de données

### Collections MongoDB
- **users** : Utilisateurs de la plateforme
- **courses** : Cours disponibles
- **enrollments** : Inscriptions aux cours
- **certificates** : Certificats obtenus
- **categories** : Catégories de cours

### Modèles principaux
- **User** : Informations utilisateur avec rôles
- **Course** : Cours avec métadonnées complètes
- **Lesson** : Leçons individuelles
- **Review** : Avis et notes

## 🛡️ Sécurité

### Middlewares implémentés
- Authentification JWT
- Autorisation par rôles
- Rate limiting
- Validation des données
- Sanitisation des entrées
- Helmet pour les headers de sécurité

### Bonnes pratiques
- Mots de passe chiffrés avec bcrypt
- Tokens JWT sécurisés
- Validation côté client et serveur
- Gestion d'erreurs centralisée

## 📈 Fonctionnalités avancées

### Système d'authentification
- Inscription/Connexion sécurisée
- Réinitialisation de mot de passe
- Profils utilisateur complets
- Rôles et permissions

### Gestion des cours
- Création et édition de cours
- Système de leçons
- Inscription des étudiants
- Suivi de progression

### Système de notation
- Avis et commentaires
- Notes sur 5 étoiles
- Calcul automatique des moyennes
- Certificats de complétion

## 🚀 Déploiement

### Prérequis production
- Node.js 16+
- MongoDB Atlas ou instance MongoDB
- Serveur web (Nginx/Apache)
- SSL Certificate
- Domain name

### Variables d'environnement production
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=secret_tres_securise_production
PORT=5000
SMTP_HOST=smtp.gmail.com
SMTP_USER=votre-email@gmail.com
SMTP_PASS=votre-mot-de-passe-app
```

## 📞 Support et communauté

- **Email** : contact@educx.bj
- **Téléphone** : +229 XX XX XX XX
- **Adresse** : Cotonou, Bénin
- **Documentation** : README.md et DEVELOPMENT.md

## 🎯 Roadmap

- [ ] Système de paiement (Mobile Money)
- [ ] Application mobile (React Native)
- [ ] Intégration universités béninoises
- [ ] Certifications officielles
- [ ] Forum communautaire
- [ ] Système de mentorat
- [ ] IA pour recommandations
- [ ] Mode hors ligne

---

**EducX** - Révolutionnons l'éducation au Bénin 🇧🇯

*Développé avec ❤️ pour l'éducation béninoise*
