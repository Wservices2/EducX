// Configuration du client React pour EducX

// Configuration de l'API
export const API_CONFIG = {
  // Use REACT_APP_API_URL when set (production), otherwise use relative paths
  // so the client will call the same host (e.g. /api/...) which works on Vercel.
  BASE_URL: process.env.REACT_APP_API_URL || '',
  TIMEOUT: 10000,
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/api/auth/login',
      REGISTER: '/api/auth/register',
      LOGOUT: '/api/auth/logout',
      PROFILE: '/api/auth/profile',
      REFRESH: '/api/auth/refresh',
    },
    COURSES: {
      LIST: '/api/courses',
      DETAIL: '/api/courses/:id',
      CREATE: '/api/courses',
      UPDATE: '/api/courses/:id',
      DELETE: '/api/courses/:id',
      ENROLL: '/api/courses/:id/enroll',
      UNENROLL: '/api/courses/:id/unenroll',
    },
    USERS: {
      PROFILE: '/api/users/profile',
      UPDATE: '/api/users/profile',
      COURSES: '/api/users/courses',
      CERTIFICATES: '/api/users/certificates',
    },
    UPLOAD: {
      IMAGE: '/api/upload/image',
      VIDEO: '/api/upload/video',
      DOCUMENT: '/api/upload/document',
    },
  },
};

// Configuration des routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  COURSES: '/courses',
  COURSE_DETAIL: '/courses/:id',
  DASHBOARD: '/dashboard',
  SETTINGS: '/settings',
  ABOUT: '/about',
  CONTACT: '/contact',
  HELP: '/help',
};

// Configuration des catégories de cours
export const COURSE_CATEGORIES = [
  { value: 'developpement-web', label: 'Développement Web', icon: '💻' },
  { value: 'marketing-digital', label: 'Marketing Digital', icon: '📱' },
  { value: 'entrepreneuriat', label: 'Entrepreneuriat', icon: '🚀' },
  { value: 'langues', label: 'Langues', icon: '🗣️' },
  { value: 'sciences', label: 'Sciences', icon: '🔬' },
  { value: 'design', label: 'Design', icon: '🎨' },
  { value: 'business', label: 'Business', icon: '💼' },
  { value: 'informatique', label: 'Informatique', icon: '💾' },
  { value: 'mathematiques', label: 'Mathématiques', icon: '📊' },
  { value: 'autres', label: 'Autres', icon: '📚' },
];

// Configuration des niveaux de cours
export const COURSE_LEVELS = [
  { value: 'debutant', label: 'Débutant', color: '#22c55e' },
  { value: 'intermediaire', label: 'Intermédiaire', color: '#f59e0b' },
  { value: 'avance', label: 'Avancé', color: '#ef4444' },
];

// Configuration des langues
export const LANGUAGES = [
  { value: 'fr', label: 'Français', flag: '🇫🇷' },
  { value: 'en', label: 'English', flag: '🇺🇸' },
];

// Configuration des rôles utilisateur
export const USER_ROLES = {
  STUDENT: 'student',
  INSTRUCTOR: 'instructor',
  ADMIN: 'admin',
};

// Configuration des statuts de cours
export const COURSE_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
};

// Configuration des types de contenu
export const CONTENT_TYPES = {
  VIDEO: 'video',
  TEXT: 'text',
  QUIZ: 'quiz',
  ASSIGNMENT: 'assignment',
  RESOURCE: 'resource',
};

// Configuration des notifications
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

// Configuration des tailles de fichiers
export const FILE_SIZE_LIMITS = {
  IMAGE: 5 * 1024 * 1024, // 5MB
  VIDEO: 100 * 1024 * 1024, // 100MB
  DOCUMENT: 10 * 1024 * 1024, // 10MB
};

// Configuration des formats de fichiers acceptés
export const ACCEPTED_FILE_TYPES = {
  IMAGE: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  VIDEO: ['video/mp4', 'video/webm', 'video/ogg'],
  DOCUMENT: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
};

// Configuration des animations
export const ANIMATIONS = {
  DURATION: {
    FAST: 0.2,
    NORMAL: 0.3,
    SLOW: 0.5,
  },
  EASING: {
    EASE_IN: 'ease-in',
    EASE_OUT: 'ease-out',
    EASE_IN_OUT: 'ease-in-out',
  },
};

// Configuration des breakpoints responsive
export const BREAKPOINTS = {
  MOBILE: '480px',
  TABLET: '768px',
  DESKTOP: '1024px',
  LARGE_DESKTOP: '1280px',
};

// Configuration des couleurs par défaut
export const DEFAULT_COLORS = {
  PRIMARY: '#3b82f6',
  SECONDARY: '#22c55e',
  ACCENT: '#ef4444',
  SUCCESS: '#22c55e',
  WARNING: '#f59e0b',
  ERROR: '#ef4444',
  INFO: '#3b82f6',
};

// Configuration des messages d'erreur
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Erreur de connexion. Veuillez vérifier votre connexion internet.',
  UNAUTHORIZED: 'Vous n\'êtes pas autorisé à effectuer cette action.',
  FORBIDDEN: 'Accès interdit.',
  NOT_FOUND: 'Ressource non trouvée.',
  SERVER_ERROR: 'Erreur interne du serveur. Veuillez réessayer plus tard.',
  VALIDATION_ERROR: 'Veuillez vérifier les informations saisies.',
  FILE_TOO_LARGE: 'Le fichier est trop volumineux.',
  INVALID_FILE_TYPE: 'Type de fichier non supporté.',
};

// Configuration des messages de succès
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Connexion réussie !',
  REGISTER_SUCCESS: 'Inscription réussie !',
  PROFILE_UPDATED: 'Profil mis à jour avec succès !',
  COURSE_ENROLLED: 'Inscription au cours réussie !',
  COURSE_COMPLETED: 'Félicitations ! Cours terminé avec succès !',
  CERTIFICATE_EARNED: 'Certificat obtenu avec succès !',
};

export default {
  API_CONFIG,
  ROUTES,
  COURSE_CATEGORIES,
  COURSE_LEVELS,
  LANGUAGES,
  USER_ROLES,
  COURSE_STATUS,
  CONTENT_TYPES,
  NOTIFICATION_TYPES,
  FILE_SIZE_LIMITS,
  ACCEPTED_FILE_TYPES,
  ANIMATIONS,
  BREAKPOINTS,
  DEFAULT_COLORS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
};
