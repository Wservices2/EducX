const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { validateData, asyncHandler } = require('../middleware/auth');
const { generateToken, isValidEmail, sendWelcomeEmail } = require('../utils/helpers');
const Joi = require('joi');

const router = express.Router();
const prisma = new PrismaClient();

// Validation schemas
const registerSchema = Joi.object({
  fullName: Joi.string().min(2).max(50).required().messages({
    'string.empty': 'Le nom complet est requis',
    'string.min': 'Le nom doit contenir au moins 2 caractères',
    'string.max': 'Le nom ne peut pas dépasser 50 caractères'
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'L\'email est requis',
    'string.email': 'Veuillez entrer un email valide'
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'Le mot de passe est requis',
    'string.min': 'Le mot de passe doit contenir au moins 6 caractères'
  })
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'L\'email est requis',
    'string.email': 'Veuillez entrer un email valide'
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Le mot de passe est requis'
  })
});

// Route d'inscription
router.post('/register', validateData(registerSchema), asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

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
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Créer le nouvel utilisateur
  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: 'STUDENT'
    }
  });

  // Générer le token JWT
  const token = generateToken({ userId: user.id });

  // Envoyer l'email de bienvenue (optionnel)
  try {
    await sendWelcomeEmail(user);
  } catch (error) {
    console.error('Erreur envoi email bienvenue:', error);
  }

  // Retourner les données utilisateur (sans le mot de passe)
  const userResponse = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt
  };

  res.status(201).json({
    success: true,
    message: 'Compte créé avec succès',
    data: {
      token,
      user: userResponse
    }
  });
}));

// Route de connexion
router.post('/login', validateData(loginSchema), asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Trouver l'utilisateur par email
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() }
  });

  if (!user) {
    return res.status(401).json({
      message: 'Email ou mot de passe incorrect'
    });
  }

  // Vérifier si le compte est actif
  if (!user.isActive) {
    return res.status(401).json({
      message: 'Votre compte a été désactivé. Contactez le support.'
    });
  }

  // Vérifier le mot de passe
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
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
  const token = generateToken({ userId: user.id });

  // Retourner les données utilisateur (sans le mot de passe)
  const userResponse = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    lastLogin: new Date(),
    createdAt: user.createdAt
  };

  res.json({
    success: true,
    message: 'Connexion réussie',
    data: {
      token,
      user: userResponse
    }
  });
}));

// Route pour obtenir le profil utilisateur
router.get('/profile', require('../middleware/auth').authenticateToken, asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    include: {
      profile: true,
      enrolledCourses: {
        include: {
          course: true
        }
      },
      certificates: true
    }
  });

  if (!user) {
    return res.status(404).json({
      message: 'Utilisateur non trouvé'
    });
  }

  res.json({
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      profile: user.profile,
      lastLogin: user.lastLogin,
      createdAt: user.createdAt,
      stats: {
        enrolledCourses: user.enrolledCourses.length,
        completedCourses: user.enrolledCourses.filter(e => e.completedAt).length,
        certificates: user.certificates.length,
        memberSince: user.createdAt
      }
    }
  });
}));

// Route pour mettre à jour le profil
router.put('/profile', require('../middleware/auth').authenticateToken, asyncHandler(async (req, res) => {
  const { firstName, lastName, profile } = req.body;

  const user = await prisma.user.findUnique({
    where: { id: req.user.id }
  });

  if (!user) {
    return res.status(404).json({
      message: 'Utilisateur non trouvé'
    });
  }

  // Mettre à jour les champs utilisateur
  const updateData = {};
  if (firstName) updateData.firstName = firstName;
  if (lastName) updateData.lastName = lastName;

  const updatedUser = await prisma.user.update({
    where: { id: req.user.id },
    data: updateData
  });

  // Mettre à jour ou créer le profil
  if (profile) {
    await prisma.profile.upsert({
      where: { userId: req.user.id },
      update: profile,
      create: {
        userId: req.user.id,
        ...profile
      }
    });
  }

  const userWithProfile = await prisma.user.findUnique({
    where: { id: req.user.id },
    include: { profile: true }
  });

  res.json({
    message: 'Profil mis à jour avec succès',
    user: {
      id: userWithProfile.id,
      firstName: userWithProfile.firstName,
      lastName: userWithProfile.lastName,
      email: userWithProfile.email,
      role: userWithProfile.role,
      profile: userWithProfile.profile,
      lastLogin: userWithProfile.lastLogin,
      createdAt: userWithProfile.createdAt
    }
  });
}));

// Route pour enregistrer une session de connexion
router.post('/login-session', asyncHandler(async (req, res) => {
  const { userId, operator, deviceInfo, userAgent, loginAt } = req.body;

  // Validation basique
  if (!userId || !operator) {
    return res.status(400).json({
      message: 'userId et operator sont requis'
    });
  }

  // Créer la session de connexion
  const loginSession = await prisma.loginSession.create({
    data: {
      userId,
      operator,
      deviceInfo,
      userAgent,
      loginAt: loginAt ? new Date(loginAt) : new Date()
    }
  });

  res.json({
    message: 'Session de connexion enregistrée',
    sessionId: loginSession.id
  });
}));

// Route de déconnexion (côté client principalement)
router.post('/logout', (req, res) => {
  res.json({
    message: 'Déconnexion réussie'
  });
});

module.exports = router;
