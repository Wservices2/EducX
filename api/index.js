const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const app = express();

// ensure a consistent JWT secret throughout the modules
const JWT_SECRET = process.env.JWT_SECRET || 'educx-secret-key';

// Configure Prisma for serverless
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
    log: ['error', 'warn'],
});

// Ensure Prisma connects properly in serverless
prisma.$connect().catch(err => {
    console.error('Prisma connection error:', err);
});

// Trust proxy for Vercel
app.set('trust proxy', 1);

// Middleware de sécurité
app.use(helmet({
    contentSecurityPolicy: false,
}));

// Rate limiting - disabled in development
const limiter = process.env.NODE_ENV === 'production' ? rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
}) : (req, res, next) => next();
app.use(limiter);

// Configuration CORS
app.use(cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

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

// Route racine
app.get('/api', (req, res) => {
    res.json({
        message: 'API EducX - Plateforme éducative béninoise',
        version: '1.0.1',
        status: 'active',
        timestamp: new Date().toISOString()
    });
});

// Route d'inscription
app.post('/api/auth/register', async (req, res) => {
    try {
        const { error, value } = registerSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { fullName, email, password } = value;

        const existingUser = await prisma.user.findUnique({
            where: { email: email.toLowerCase() }
        });

        if (existingUser) {
            return res.status(400).json({
                message: 'Un compte avec cet email existe déjà'
            });
        }

        const nameParts = fullName.trim().split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(' ') || '';

        const hashedPassword = await bcrypt.hash(password, 12);

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

        await prisma.profile.create({
            data: {
                userId: user.id
            }
        });

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
        console.error("Erreur d'inscription:", error);
        res.status(500).json({
            message: 'Erreur interne du serveur',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

const { FiBookOpen, FiAward, FiLogOut } = require('react-icons/fi');
// Route de connexion
app.post('/api/auth/login', async (req, res) => {
    try {
        const { error, value } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { email, password } = value;

        const user = await prisma.user.findUnique({
            where: { email: email.toLowerCase() },
            include: { profile: true }
        });

        if (!user) {
            return res.status(401).json({
                message: 'Email ou mot de passe incorrect'
            });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({
                message: 'Email ou mot de passe incorrect'
            });
        }

        await prisma.user.update({
            where: { id: user.id },
            data: { lastLogin: new Date() }
        });

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

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

// Middleware d'authentification
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token d\'accès requis' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    let user;
    try {
      user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        include: { profile: true }
      });
    } catch (prismaError) {
      console.error('Erreur Prisma lors de la recherche utilisateur:', prismaError);
      // Essayer sans le profil si la jointure échoue
      user = await prisma.user.findUnique({
        where: { id: decoded.userId }
      });
    }

    if (!user) {
      return res.status(401).json({ message: 'Utilisateur non trouvé' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Erreur d\'authentification:', error);
    return res.status(403).json({ message: 'Token invalide' });
  }
};


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

module.exports = app;
