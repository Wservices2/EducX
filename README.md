# EducX - Plateforme Éducative Béninoise

EducX est une plateforme éducative moderne développée spécifiquement pour le marché béninois, offrant des cours en ligne de qualité et des certifications reconnues.

## 🚀 Fonctionnalités

- **Interface moderne et responsive** : Design adapté aux besoins des utilisateurs béninois
- **Cours variés** : Développement web, marketing digital, entrepreneuriat, langues, sciences
- **Certifications reconnues** : Diplômes valorisés par les employeurs locaux
- **Communauté active** : Échanges entre apprenants et experts
- **Apprentissage flexible** : Cours accessibles 24h/24, 7j/7

## 🛠️ Technologies utilisées

### Frontend
- **React 18** : Framework JavaScript moderne
- **Styled Components** : Styling CSS-in-JS
- **Framer Motion** : Animations fluides
- **React Router** : Navigation entre pages
- **React Icons** : Icônes modernes

### Backend
- **Node.js** : Runtime JavaScript côté serveur
- **Express.js** : Framework web minimaliste
- **MongoDB** : Base de données NoSQL
- **JWT** : Authentification sécurisée
- **Bcrypt** : Chiffrement des mots de passe

## 📦 Installation

### Prérequis
- Node.js (version 16 ou supérieure)
- MongoDB (version 5 ou supérieure)
- npm ou yarn

### Installation complète

1. **Cloner le projet**
```bash
git clone https://github.com/votre-username/educx-platform.git
cd educx-platform
```

2. **Installer toutes les dépendances**
```bash
npm run install-all
```

3. **Configuration de l'environnement**
```bash
# Copier le fichier d'exemple d'environnement
cp server/.env.example server/.env

# Éditer le fichier .env avec vos configurations
```

4. **Démarrer MongoDB**
```bash
# Sur Windows
net start MongoDB

# Sur macOS/Linux
sudo systemctl start mongod
```

5. **Démarrer l'application**
```bash
# Démarrer le frontend et le backend simultanément
npm run dev

# Ou démarrer séparément :
# Backend (port 5000)
npm run server

# Frontend (port 3000)
npm run client
```

## 🌐 Accès à l'application

- **Frontend** : http://localhost:3000
- **Backend API** : http://localhost:5000
- **Documentation API** : http://localhost:5000/api

## 📁 Structure du projet

```
educx-platform/
├── client/                 # Frontend React
│   ├── public/
│   ├── src/
│   │   ├── components/     # Composants React
│   │   ├── pages/         # Pages de l'application
│   │   ├── styles/        # Styles globaux
│   │   └── utils/         # Utilitaires
│   └── package.json
├── server/                 # Backend Node.js
│   ├── routes/            # Routes API
│   ├── models/            # Modèles de données
│   ├── middleware/        # Middlewares
│   ├── controllers/       # Contrôleurs
│   └── package.json
└── package.json           # Configuration racine
```

## 🎨 Design

Le design de la plateforme est inspiré des meilleures pratiques UX/UI modernes, avec une attention particulière à l'expérience utilisateur sur mobile et desktop. L'interface est optimisée pour les utilisateurs béninois avec :

- Couleurs inspirées du drapeau béninois
- Typographie claire et lisible
- Navigation intuitive
- Responsive design pour tous les appareils

## 🔧 Scripts disponibles

```bash
# Développement
npm run dev          # Démarre frontend + backend
npm run client       # Démarre uniquement le frontend
npm run server       # Démarre uniquement le backend

# Production
npm run build        # Build de production du frontend
npm start           # Démarre l'application en production

# Installation
npm run install-all # Installe toutes les dépendances
```

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit vos changements (`git commit -m 'Ajout d'une nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou support :
- Email : contact@educx.bj
- Téléphone : +229 XX XX XX XX
- Adresse : Cotonou, Bénin

## 🎯 Roadmap

- [ ] Système d'authentification complet
- [ ] Gestion des cours et leçons
- [ ] Système de paiement local (Mobile Money)
- [ ] Application mobile (React Native)
- [ ] Intégration avec les universités béninoises
- [ ] Certifications officielles
- [ ] Forum communautaire
- [ ] Système de mentorat

---

**EducX** - Révolutionnons l'éducation au Bénin 🇧🇯
