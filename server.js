const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;
const prisma = new PrismaClient();

// Use a consistent JWT secret across the application (falls back to a
// single development key when JWT_SECRET is not set). The previous code
// used two different hardcoded strings which meant tokens signed during
// login/registration could not be verified later, leading to 403 errors.
const JWT_SECRET = process.env.JWT_SECRET || 'educx-secret-key';

// Créer le dossier uploads s'il n'existe pas
const uploadsDir = path.join(__dirname, 'uploads');
const avatarsDir = path.join(uploadsDir, 'avatars');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

if (!fs.existsSync(avatarsDir)) {
  fs.mkdirSync(avatarsDir, { recursive: true });
}

// Configuration de Multer pour l'upload d'images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, avatarsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `avatar-${req.user?.id || 'unknown'}-${uniqueSuffix}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  // Accepter seulement les images
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Seuls les fichiers image sont autorisés'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max
  }
});

// Middleware de sécurité
app.use(helmet({
  contentSecurityPolicy: false, // Désactivé pour le développement
}));

// Rate limiting - disabled in development
const limiter = process.env.NODE_ENV === 'production' ? rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limite chaque IP à 100 requêtes par windowMs
}) : (req, res, next) => next();
app.use(limiter);

// Configuration CORS
app.use(cors({
  origin: true, // Accepter toutes les origines en développement
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middleware d'authentification
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  console.log('--- AUTHENTICATION DEBUG ---');
  console.log('Time:', new Date().toISOString());
  console.log('Request Path:', req.path);
  console.log('Token received:', token ? 'Yes' : 'No');

  if (!token) {
    console.log('Debug: No token provided.');
    console.log('--- END DEBUG ---');
    return res.status(401).json({ message: 'Token d\'accès requis' });
  }

  // Log the secret key (for debugging purposes ONLY; remove in production)
  // To avoid exposing the full key, let's log a part of it or its source
  console.log('JWT_SECRET source:', process.env.JWT_SECRET ? 'Environment Variable' : 'Hardcoded Fallback');
  // console.log('Using JWT_SECRET:', JWT_SECRET); // Uncomment for extreme debugging

  try {
    // Decode without verifying to inspect payload
    const decodedPayload = jwt.decode(token);
    console.log('Decoded Payload:', decodedPayload);

    console.log('Verifying token...');
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('Token successfully verified. User ID:', decoded.userId);
    
    let user;
    try {
      user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        include: { profile: true }
      });
    } catch (prismaError) {
      console.error('Prisma error during user lookup:', prismaError);
      // Attempt lookup without profile on failure
      user = await prisma.user.findUnique({
        where: { id: decoded.userId }
      });
    }

    if (!user) {
      console.log('Debug: User not found in DB for ID:', decoded.userId);
      console.log('--- END DEBUG ---');
      return res.status(401).json({ message: 'Utilisateur non trouvé' });
    }

    console.log('User found:', { id: user.id, email: user.email });
    console.log('--- END DEBUG ---');
    req.user = user;
    next();
  } catch (error) {
    console.error('!!! --- AUTHENTICATION ERROR --- !!!');
    console.error('Error verifying token:', error.name, '-', error.message);
    // Log the full error for detailed diagnostics
    console.error(error);
    console.error('!!! --- END AUTH ERROR --- !!!');
    return res.status(403).json({ message: 'Token invalide', error: error.name });
  }
};

// Validation schemas
const registerSchema = Joi.object({
  fullName: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

// Routes API

// Route racine
app.get('/api', (req, res) => {
  res.json({
    message: 'API EducX - Plateforme éducative béninoise',
    version: '1.0.1',
    status: 'active',
    timestamp: new Date().toISOString()
  });
});

// Debug endpoint
app.get('/api/debug', (req, res) => {
  res.json({
    message: 'API is working',
    timestamp: new Date().toISOString(),
    registerSchemaKeys: Object.keys(registerSchema.describe().keys)
  });
});

// Debug: verify a token (development only)
app.post('/api/debug/token', (req, res) => {
  try {
    const token = req.body?.token || req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(400).json({ message: 'No token provided' });

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return res.json({ ok: true, decoded });
    } catch (err) {
      console.error('Token verify error (debug):', err);
      return res.status(401).json({ ok: false, message: 'Invalid token', error: err.message });
    }
  } catch (error) {
    console.error('Error in /api/debug/token:', error);
    return res.status(500).json({ message: 'Internal error' });
  }
});

// Route d'inscription
app.post('/api/auth/register', async (req, res) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { fullName, email, password } = value;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (existingUser) {
      return res.status(400).json({
        message: 'Un compte avec cet email existe déjà'
      });
    }

    // Séparer le nom complet en prénom et nom
    const nameParts = fullName.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || '';

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 12);

    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: 'STUDENT'
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    // Créer le profil
    await prisma.profile.create({
      data: {
        userId: user.id
      }
    });

    // Générer le token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'Inscription réussie',
      data: {
        user,
        token
      }
    });

  } catch (error) {
    console.error('Erreur d\'inscription:', error);
    res.status(500).json({
      message: 'Erreur interne du serveur',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Route de connexion
app.post('/api/auth/login', async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = value;

    // Trouver l'utilisateur
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      include: { profile: true }
    });

    if (!user) {
      return res.status(401).json({
        message: 'Email ou mot de passe incorrect'
      });
    }

    // Vérifier le mot de passe
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        message: 'Email ou mot de passe incorrect'
      });
    }

    // Mettre à jour la dernière connexion
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() }
    });

    // Générer le token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Retourner les données utilisateur sans le mot de passe
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      message: 'Connexion réussie',
      data: {
        user: userWithoutPassword,
        token
      }
    });

  } catch (error) {
    console.error('Erreur de connexion:', error);
    res.status(500).json({
      message: 'Erreur interne du serveur',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Route de profil utilisateur
app.get('/api/auth/profile', authenticateToken, async (req, res) => {
  try {
    const { password: _, ...userWithoutPassword } = req.user;
    res.json({
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Erreur de profil:', error);
    res.status(500).json({
      message: 'Erreur interne du serveur'
    });
  }
});

// Route de mise à jour du profil
app.put('/api/auth/profile', authenticateToken, async (req, res) => {
  try {
    const { firstName, lastName, bio, location, phone, website } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        firstName: firstName || req.user.firstName,
        lastName: lastName || req.user.lastName,
        profile: {
          update: {
            bio: bio || req.user.profile?.bio,
            location: location || req.user.profile?.location,
            phone: phone || req.user.profile?.phone,
            website: website || req.user.profile?.website
          }
        }
      },
      include: { profile: true },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        profile: true
      }
    });

    res.json({
      message: 'Profil mis à jour avec succès',
      user: updatedUser
    });

  } catch (error) {
    console.error('Erreur de mise à jour:', error);
    res.status(500).json({
      message: 'Erreur interne du serveur'
    });
  }
});

// Endpoint pour uploader la photo de profil
app.post('/api/auth/avatar', authenticateToken, upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: 'Aucun fichier fourni'
      });
    }

    const userId = req.user.id;
    const avatarUrl = `/uploads/avatars/${req.file.filename}`;

    // Supprimer l'ancienne photo de profil si elle existe
    if (req.user.profile?.avatar) {
      const oldAvatarPath = path.join(__dirname, req.user.profile.avatar);
      if (fs.existsSync(oldAvatarPath)) {
        fs.unlinkSync(oldAvatarPath);
      }
    }

    // Mettre à jour le profil avec la nouvelle photo
    const updatedProfile = await prisma.profile.upsert({
      where: { userId: userId },
      update: { avatar: avatarUrl },
      create: { 
        userId: userId,
        avatar: avatarUrl
      }
    });

    res.json({
      message: 'Photo de profil mise à jour avec succès',
      avatarUrl: avatarUrl,
      profile: updatedProfile
    });

  } catch (error) {
    console.error('Erreur upload avatar:', error);
    
    // Supprimer le fichier uploadé en cas d'erreur
    if (req.file) {
      const filePath = path.join(avatarsDir, req.file.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    res.status(500).json({
      message: 'Erreur lors du téléchargement de la photo de profil'
    });
  }
});

// Servir les fichiers statiques de l'application React
app.use(express.static(path.join(__dirname, 'client/build'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    } else if (filePath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    } else if (filePath.endsWith('.json')) {
      res.setHeader('Content-Type', 'application/json');
    }
  }
}));

// Servir les fichiers uploadés (avatars)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes des cours
app.get('/api/courses', async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      where: { status: 'PUBLISHED' },
      include: {
        creator: {
          select: {
            firstName: true,
            lastName: true,
            profile: {
              select: {
                avatar: true
              }
            }
          }
        },
        _count: {
          select: {
            enrollments: true,
            lessons: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ courses });
  } catch (error) {
    console.error('Erreur des cours:', error);
    res.status(500).json({
      message: 'Erreur interne du serveur'
    });
  }
});

// Dashboard API endpoints
app.get('/api/dashboard/stats', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Vérifier si les modèles Prisma sont accessibles
    if (!prisma.courseEnrollment || !prisma.certificate || !prisma.loginSession) {
      console.log('Modèles Prisma non disponibles, retour de données par défaut');
      return res.json({
        coursesEnrolled: 0,
        coursesCompleted: 0,
        certificates: 0,
        hoursLearned: 0,
        streak: 0,
        averageProgress: 0
      });
    }
    
    // Statistiques de l'utilisateur
    const [
      enrolledCourses,
      completedCourses,
      certificates,
      totalProgress,
      recentSessions
    ] = await Promise.all([
      // Cours inscrits
      prisma.courseEnrollment.count({
        where: { userId }
      }).catch(err => {
        console.log('Erreur courseEnrollment.count:', err);
        return 0;
      }),
      // Cours complétés
      prisma.courseEnrollment.count({
        where: { 
          userId,
          completedAt: { not: null }
        }
      }).catch(err => {
        console.log('Erreur courseEnrollment.completed:', err);
        return 0;
      }),
      // Certificats obtenus
      prisma.certificate.count({
        where: { userId }
      }).catch(err => {
        console.log('Erreur certificate.count:', err);
        return 0;
      }),
      // Progression moyenne
      prisma.courseEnrollment.aggregate({
        where: { userId },
        _avg: { progress: true }
      }).catch(err => {
        console.log('Erreur courseEnrollment.aggregate:', err);
        return { _avg: { progress: 0 } };
      }),
      // Sessions récentes (7 derniers jours)
      prisma.loginSession.count({
        where: {
          userId,
          loginAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          }
        }
      }).catch(err => {
        console.log('Erreur loginSession.count:', err);
        return 0;
      })
    ]);

    // Calculer les heures d'apprentissage (estimation basée sur la progression)
    const hoursLearned = Math.round((totalProgress._avg.progress || 0) * enrolledCourses * 0.5);

    res.json({
      coursesEnrolled: enrolledCourses,
      coursesCompleted: completedCourses,
      certificates: certificates,
      hoursLearned: hoursLearned,
      streak: recentSessions,
      averageProgress: Math.round(totalProgress._avg.progress || 0)
    });
  } catch (error) {
    console.error('Erreur stats dashboard:', error);
    res.json({
      coursesEnrolled: 0,
      coursesCompleted: 0,
      certificates: 0,
      hoursLearned: 0,
      streak: 0,
      averageProgress: 0
    });
  }
});

app.get('/api/dashboard/recent-activity', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Vérifier si les modèles Prisma sont accessibles
    if (!prisma.courseEnrollment || !prisma.certificate || !prisma.loginSession) {
      console.log('Modèles Prisma non disponibles pour activité, retour de tableau vide');
      return res.json([]);
    }
    
    // Activités récentes de l'utilisateur
    const [recentEnrollments, recentCertificates, recentLogins] = await Promise.all([
      // Inscriptions récentes
      prisma.courseEnrollment.findMany({
        where: { userId },
        include: {
          course: {
            select: { title: true }
          }
        },
        orderBy: { enrolledAt: 'desc' },
        take: 3
      }).catch(err => {
        console.log('Erreur recentEnrollments:', err);
        return [];
      }),
      // Certificats récents
      prisma.certificate.findMany({
        where: { userId },
        include: {
          course: {
            select: { title: true }
          }
        },
        orderBy: { issuedAt: 'desc' },
        take: 2
      }).catch(err => {
        console.log('Erreur recentCertificates:', err);
        return [];
      }),
      // Connexions récentes
      prisma.loginSession.findMany({
        where: { userId },
        orderBy: { loginAt: 'desc' },
        take: 2
      }).catch(err => {
        console.log('Erreur recentLogins:', err);
        return [];
      })
    ]);

    // Formater les activités
    const activities = [];
    
    recentEnrollments.forEach(enrollment => {
      activities.push({
        id: `enrollment-${enrollment.id}`,
        title: `Inscrit à "${enrollment.course.title}"`,
        time: formatRelativeTime(enrollment.enrolledAt),
        icon: FiBookOpen,
        type: 'enrollment'
      });
    });
    
    recentCertificates.forEach(certificate => {
      activities.push({
        id: `certificate-${certificate.id}`,
        title: `Certificat obtenu pour "${certificate.course.title}"`,
        time: formatRelativeTime(certificate.issuedAt),
        icon: FiAward,
        type: 'certificate'
      });
    });
    
    recentLogins.forEach(login => {
      activities.push({
        id: `login-${login.id}`,
        title: 'Connexion à la plateforme',
        time: formatRelativeTime(login.loginAt),
        icon: FiLogOut,
        type: 'login'
      });
    });

    // Trier par date et limiter à 5
    activities.sort((a, b) => new Date(b.time) - new Date(a.time));
    
    res.json(activities.slice(0, 5));
  } catch (error) {
    console.error('Erreur activité récente:', error);
    res.json([]);
  }
});

app.get('/api/dashboard/progress', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Progression par cours
    const enrollments = await prisma.courseEnrollment.findMany({
      where: { userId },
      include: {
        course: {
          select: { 
            title: true,
            category: true,
            lessons: {
              select: { id: true }
            }
          }
        }
      },
      orderBy: { enrolledAt: 'desc' },
      take: 5
    });

    // Grouper par catégorie
    const progressByCategory = {};
    
    enrollments.forEach(enrollment => {
      const category = enrollment.course.category || 'Autre';
      if (!progressByCategory[category]) {
        progressByCategory[category] = {
          totalProgress: 0,
          courseCount: 0
        };
      }
      progressByCategory[category].totalProgress += enrollment.progress;
      progressByCategory[category].courseCount += 1;
    });

    // Calculer la moyenne par catégorie
    const progressData = Object.entries(progressByCategory).map(([category, data]) => ({
      label: category,
      percent: Math.round(data.totalProgress / data.courseCount)
    }));

    res.json(progressData);
  } catch (error) {
    console.error('Erreur progression dashboard:', error);
    res.status(500).json({
      message: 'Erreur interne du serveur'
    });
  }
});

// Fonction utilitaire pour formater le temps relatif
function formatRelativeTime(date) {
  const now = new Date();
  const diffInMs = now - new Date(date);
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInHours / 24);
  
  if (diffInHours < 1) {
    return "Il y a quelques minutes";
  } else if (diffInHours < 24) {
    return `Il y a ${diffInHours}h`;
  } else if (diffInDays === 1) {
    return "Hier";
  } else if (diffInDays < 7) {
    return `Il y a ${diffInDays} jours`;
  } else {
    return `Il y a ${Math.floor(diffInDays / 7)} semaines`;
  }
}

// Servir l'application React pour toutes les autres routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Erreur interne du serveur',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Fonction de démarrage
async function startServer() {
  try {
    // Tester la connexion à la base de données
    await prisma.$connect();
    console.log('✅ Connexion à la base de données réussie');

    // Démarrer le serveur
    app.listen(PORT, () => {
      console.log(`🚀 Serveur EducX démarré sur le port ${PORT}`);
      console.log(`📚 Plateforme éducative béninoise active`);
      console.log(`🌍 Environnement: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 URL: http://localhost:${PORT}`);
      console.log(`📊 API: http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('❌ Erreur de démarrage:', error);
    process.exit(1);
  }
}

// Gestion propre de l'arrêt
process.on('SIGINT', async () => {
  console.log('\n🛑 Arrêt du serveur...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Arrêt du serveur...');
  await prisma.$disconnect();
  process.exit(0);
});

// Démarrer le serveur
if (require.main === module) {
  startServer();
}

module.exports = app;
