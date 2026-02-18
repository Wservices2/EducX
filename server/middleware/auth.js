const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

// consistent JWT secret
const JWT_SECRET = process.env.JWT_SECRET || 'educx-secret-key';

const prisma = new PrismaClient();

// Middleware d'authentification
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        message: 'Token d\'accès requis'
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        lastLogin: true
      }
    });

    if (!user) {
      return res.status(401).json({
        message: 'Token invalide'
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        message: 'Compte désactivé'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Erreur d\'authentification:', error);
    return res.status(401).json({
      message: 'Token invalide'
    });
  }
};

// Middleware d'autorisation par rôle
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        message: 'Authentification requise'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'Accès non autorisé pour ce rôle'
      });
    }

    next();
  };
};

// Middleware de validation des données
const validateData = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: 'Données invalides',
        errors: error.details.map(detail => ({
          field: detail.path.join('.'),
          message: detail.message
        }))
      });
    }

    next();
  };
};

// Middleware de gestion des erreurs async
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Middleware de logging des requêtes
const requestLogger = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
  });

  next();
};

// Middleware de limitation de taux par utilisateur
const userRateLimit = (maxRequests = 100, windowMs = 15 * 60 * 1000) => {
  const requests = new Map();

  return (req, res, next) => {
    const userId = req.user ? req.user.id : req.ip;
    const now = Date.now();

    if (!requests.has(userId)) {
      requests.set(userId, { count: 1, resetTime: now + windowMs });
      return next();
    }

    const userRequests = requests.get(userId);

    if (now > userRequests.resetTime) {
      requests.set(userId, { count: 1, resetTime: now + windowMs });
      return next();
    }

    if (userRequests.count >= maxRequests) {
      return res.status(429).json({
        message: 'Trop de requêtes. Veuillez réessayer plus tard.',
        retryAfter: Math.ceil((userRequests.resetTime - now) / 1000)
      });
    }

    userRequests.count++;
    next();
  };
};

// Middleware de validation des fichiers
const validateFile = (options = {}) => {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB par défaut
    allowedTypes = ['image/jpeg', 'image/png', 'image/gif'],
    fieldName = 'file'
  } = options;

  return (req, res, next) => {
    if (!req.file) {
      return next();
    }

    if (req.file.size > maxSize) {
      return res.status(400).json({
        message: `Le fichier est trop volumineux. Taille maximale: ${maxSize / 1024 / 1024}MB`
      });
    }

    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({
        message: `Type de fichier non autorisé. Types acceptés: ${allowedTypes.join(', ')}`
      });
    }

    next();
  };
};

// Middleware de sanitisation des données
const sanitizeData = (req, res, next) => {
  const sanitize = (obj) => {
    for (let key in obj) {
      if (typeof obj[key] === 'string') {
        obj[key] = obj[key].trim();
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        sanitize(obj[key]);
      }
    }
  };

  if (req.body) {
    sanitize(req.body);
  }

  next();
};

module.exports = {
  authenticateToken,
  authorize,
  validateData,
  asyncHandler,
  requestLogger,
  userRateLimit,
  validateFile,
  sanitizeData,
};
