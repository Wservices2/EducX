const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Génération de token JWT
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

// Génération de token de réinitialisation de mot de passe
const generateResetToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Génération de code de vérification
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Validation d'email
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validation de numéro de téléphone béninois
const isValidBeninPhone = (phone) => {
  const phoneRegex = /^(\+229|229)?[0-9]{8}$/;
  return phoneRegex.test(phone);
};

// Formatage de numéro de téléphone
const formatPhoneNumber = (phone) => {
  if (phone.startsWith('+229')) {
    return phone;
  } else if (phone.startsWith('229')) {
    return `+${phone}`;
  } else if (phone.length === 8) {
    return `+229${phone}`;
  }
  return phone;
};

// Génération de slug à partir d'un titre
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Supprimer les accents
    .replace(/[^a-z0-9\s-]/g, '') // Supprimer les caractères spéciaux
    .replace(/\s+/g, '-') // Remplacer les espaces par des tirets
    .replace(/-+/g, '-') // Supprimer les tirets multiples
    .trim('-'); // Supprimer les tirets en début/fin
};

// Calcul de la durée en format lisible
const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours > 0) {
    return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
  }
  return `${mins}min`;
};

// Formatage de la date en français
const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Africa/Porto-Novo'
  };

  return new Intl.DateTimeFormat('fr-FR', { ...defaultOptions, ...options }).format(date);
};

// Formatage de la monnaie (XOF)
const formatCurrency = (amount, currency = 'XOF') => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

// Génération de mot de passe sécurisé
const generateSecurePassword = (length = 12) => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  let password = '';

  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  return password;
};

// Validation de mot de passe
const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const errors = [];

  if (password.length < minLength) {
    errors.push(`Le mot de passe doit contenir au moins ${minLength} caractères`);
  }

  if (!hasUpperCase) {
    errors.push('Le mot de passe doit contenir au moins une majuscule');
  }

  if (!hasLowerCase) {
    errors.push('Le mot de passe doit contenir au moins une minuscule');
  }

  if (!hasNumbers) {
    errors.push('Le mot de passe doit contenir au moins un chiffre');
  }

  if (!hasSpecialChar) {
    errors.push('Le mot de passe doit contenir au moins un caractère spécial');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Configuration du transporteur email
const createEmailTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

// Envoi d'email de bienvenue
const sendWelcomeEmail = async (user) => {
  try {
    // Skip if email not configured
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log('Email configuration not found, skipping welcome email');
      return;
    }

    const transporter = createEmailTransporter();

    const mailOptions = {
      from: process.env.SMTP_FROM || 'EducX <noreply@educx.bj>',
      to: user.email,
      subject: 'Bienvenue sur EducX !',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #3b82f6;">Bienvenue sur EducX !</h1>
          <p>Bonjour ${user.firstName},</p>
          <p>Félicitations ! Votre compte EducX a été créé avec succès.</p>
          <p>Vous pouvez maintenant accéder à tous nos cours et commencer votre apprentissage.</p>
          <a href="${process.env.CLIENT_URL || 'http://localhost:3001'}/login" style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Se connecter</a>
          <p>Merci de nous faire confiance !</p>
          <p>L'équipe EducX</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email de bienvenue envoyé à ${user.email}`);
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
  }
};

// Envoi d'email de réinitialisation de mot de passe
const sendPasswordResetEmail = async (user, resetToken) => {
  try {
    // Skip if email not configured
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log('Email configuration not found, skipping password reset email');
      return;
    }

    const transporter = createEmailTransporter();
    const resetUrl = `${process.env.CLIENT_URL || 'http://localhost:3001'}/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: process.env.SMTP_FROM || 'EducX <noreply@educx.bj>',
      to: user.email,
      subject: 'Réinitialisation de votre mot de passe EducX',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #3b82f6;">Réinitialisation de mot de passe</h1>
          <p>Bonjour ${user.firstName},</p>
          <p>Vous avez demandé la réinitialisation de votre mot de passe.</p>
          <p>Cliquez sur le lien ci-dessous pour créer un nouveau mot de passe :</p>
          <a href="${resetUrl}" style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Réinitialiser le mot de passe</a>
          <p>Ce lien expire dans 1 heure.</p>
          <p>Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.</p>
          <p>L'équipe EducX</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email de réinitialisation envoyé à ${user.email}`);
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
  }
};

// Génération d'URL sécurisée pour les fichiers
const generateSecureUrl = (filePath) => {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
  return `${baseUrl}/uploads/${filePath}`;
};

// Pagination
const paginate = (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  return { skip, limit };
};

// Tri des résultats pour Prisma
const sortResults = (sortBy = 'createdAt', sortOrder = 'desc') => {
  const sort = {};
  sort[sortBy] = sortOrder;
  return sort;
};

module.exports = {
  generateToken,
  generateResetToken,
  generateVerificationCode,
  isValidEmail,
  isValidBeninPhone,
  formatPhoneNumber,
  generateSlug,
  formatDuration,
  formatDate,
  formatCurrency,
  generateSecurePassword,
  validatePassword,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  generateSecureUrl,
  paginate,
  sortResults,
};
