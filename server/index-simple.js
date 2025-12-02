const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialiser SQLite
const dbPath = path.join(__dirname, 'dev.db');
const db = new sqlite3.Database(dbPath);

// Créer les tables si elles n'existent pas
db.serialize(() => {
  // Table des utilisateurs
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'STUDENT',
    isActive BOOLEAN DEFAULT 1,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    lastLogin DATETIME
  )`);

  // Table des profils
  db.run(`CREATE TABLE IF NOT EXISTS profiles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER UNIQUE NOT NULL,
    avatar TEXT,
    bio TEXT,
    location TEXT,
    phone TEXT,
    website TEXT,
    FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
  )`);

  console.log('📊 Base de données SQLite initialisée');
});

// Middleware de sécurité
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limite chaque IP à 100 requêtes par windowMs
});
app.use(limiter);

// Configuration CORS
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
    'http://10.126.75.55:3000',
    'http://10.126.75.55:3001'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};
app.use(cors(corsOptions));

// Middleware pour parser JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes d'authentification
app.post('/api/auth/register', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Validation basique
    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Tous les champs sont requis'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Le mot de passe doit contenir au moins 6 caractères'
      });
    }

    // Vérifier si l'utilisateur existe déjà
    db.get('SELECT id FROM users WHERE email = ?', [email.toLowerCase()], async (err, row) => {
      if (err) {
        console.error('Erreur base de données:', err);
        return res.status(500).json({
          success: false,
          message: 'Erreur serveur'
        });
      }

      if (row) {
        return res.status(400).json({
          success: false,
          message: 'Un compte avec cet email existe déjà'
        });
      }

      // Hacher le mot de passe
      const hashedPassword = await bcrypt.hash(password, 12);

      // Séparer le nom complet
      const nameParts = fullName.trim().split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ') || '';

      // Créer l'utilisateur
      db.run(
        'INSERT INTO users (email, firstName, lastName, password) VALUES (?, ?, ?, ?)',
        [email.toLowerCase(), firstName, lastName, hashedPassword],
        function(err) {
          if (err) {
            console.error('Erreur création utilisateur:', err);
            return res.status(500).json({
              success: false,
              message: 'Erreur lors de la création du compte'
            });
          }

          const userId = this.lastID;
          const token = jwt.sign(
            { userId, email: email.toLowerCase() },
            process.env.JWT_SECRET || 'secret_key',
            { expiresIn: '7d' }
          );

          const user = {
            id: userId,
            email: email.toLowerCase(),
            firstName,
            lastName,
            role: 'STUDENT'
          };

          res.status(201).json({
            success: true,
            message: 'Compte créé avec succès',
            data: {
              user,
              token
            }
          });
        }
      );
    });
  } catch (error) {
    console.error('Erreur inscription:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation basique
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email et mot de passe requis'
      });
    }

    // Trouver l'utilisateur
    db.get(
      'SELECT * FROM users WHERE email = ? AND isActive = 1',
      [email.toLowerCase()],
      async (err, user) => {
        if (err) {
          console.error('Erreur base de données:', err);
          return res.status(500).json({
            success: false,
            message: 'Erreur serveur'
          });
        }

        if (!user) {
          return res.status(401).json({
            success: false,
            message: 'Email ou mot de passe incorrect'
          });
        }

        // Vérifier le mot de passe
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          return res.status(401).json({
            success: false,
            message: 'Email ou mot de passe incorrect'
          });
        }

        // Mettre à jour la dernière connexion
        db.run(
          'UPDATE users SET lastLogin = CURRENT_TIMESTAMP WHERE id = ?',
          [user.id]
        );

        // Générer le token
        const token = jwt.sign(
          { userId: user.id, email: user.email },
          process.env.JWT_SECRET || 'secret_key',
          { expiresIn: '7d' }
        );

        const userData = {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role
        };

        res.json({
          success: true,
          message: 'Connexion réussie',
          data: {
            user: userData,
            token
          }
        });
      }
    );
  } catch (error) {
    console.error('Erreur connexion:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
});

// Route de test
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'Serveur EducX fonctionne correctement',
    timestamp: new Date().toISOString()
  });
});

// Route 404
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false,
    message: 'Route non trouvée' 
  });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error('Erreur serveur:', err);
  res.status(500).json({
    success: false,
    message: 'Erreur interne du serveur'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur EducX démarré sur le port ${PORT}`);
  console.log(`📚 Plateforme éducative béninoise active`);
  console.log(`🌍 Environnement: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📊 Base de données: SQLite (${dbPath})`);
});

// Gestion propre de l'arrêt
process.on('SIGINT', () => {
  console.log('\n🛑 Arrêt du serveur...');
  db.close((err) => {
    if (err) {
      console.error('Erreur fermeture base de données:', err);
    } else {
      console.log('📊 Base de données fermée');
    }
    process.exit(0);
  });
});
