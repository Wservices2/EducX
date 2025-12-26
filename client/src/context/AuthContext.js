import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_CONFIG } from '../config';
import { getLoginSessionData } from '../utils/networkUtils';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fonction pour construire l'URL complète
  const getApiUrl = (endpoint) => {
    return `${API_CONFIG.BASE_URL}${endpoint}`;
  };

  // Fonction pour faire des requêtes avec gestion d'erreur
  const makeRequest = async (url, options = {}) => {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Erreur HTTP: ${response.status}`);
      }

      return { success: true, data };
    } catch (error) {
      console.error('Erreur de requête:', error);
      return { success: false, error: error.message || 'Erreur de connexion' };
    }
  };

  // Vérifier si l'utilisateur est connecté au chargement
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (storedToken && storedUser && storedUser !== 'undefined' && storedUser !== 'null') {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error loading user from localStorage:', error);
      // Clear invalid data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    setIsLoading(false);
  }, []);

  // Fonction de connexion
  const login = async (email, password, operator = null) => {
    const url = getApiUrl(API_CONFIG.ENDPOINTS.AUTH.LOGIN);
    const result = await makeRequest(url, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (result.success && result.data.success) {
      setToken(result.data.data.token);
      setUser(result.data.data.user);
      localStorage.setItem('token', result.data.data.token);
      localStorage.setItem('user', JSON.stringify(result.data.data.user));

      // Enregistrer la session de connexion avec les données réseau
      try {
        const sessionData = getLoginSessionData();
        const sessionUrl = getApiUrl('/auth/login-session');
        await makeRequest(sessionUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${result.data.data.token}`,
          },
          body: JSON.stringify({
            userId: result.data.data.user.id,
            operator: operator || sessionData.networkType, // Utiliser l'opérateur fourni ou détecter automatiquement
            deviceInfo: sessionData.deviceInfo,
            userAgent: sessionData.userAgent,
            loginAt: sessionData.timestamp
          }),
        });
      } catch (sessionError) {
        console.warn('Failed to save login session data:', sessionError);
        // Ne pas échouer la connexion si l'enregistrement de session échoue
      }
    }

    return result;
  };

  // Fonction d'inscription
  const register = async (userData) => {
    const url = getApiUrl(API_CONFIG.ENDPOINTS.AUTH.REGISTER);
    const result = await makeRequest(url, {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (result.success && result.data.success) {
      setToken(result.data.data.token);
      setUser(result.data.data.user);
      localStorage.setItem('token', result.data.data.token);
      localStorage.setItem('user', JSON.stringify(result.data.data.user));
    }

    return result;
  };

  // Fonction de déconnexion
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // Fonction pour mettre à jour le profil
  const updateProfile = async (profileData) => {
    const url = getApiUrl(API_CONFIG.ENDPOINTS.AUTH.PROFILE);
    const result = await makeRequest(url, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });

    if (result.success) {
      setUser(result.data.user);
      localStorage.setItem('user', JSON.stringify(result.data.user));
    }

    return result;
  };

  // Fonction pour obtenir le profil utilisateur
  const getProfile = async () => {
    const url = getApiUrl(API_CONFIG.ENDPOINTS.AUTH.PROFILE);
    const result = await makeRequest(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (result.success) {
      setUser(result.data.user);
      localStorage.setItem('user', JSON.stringify(result.data.user));
    }

    return result;
  };

  // Fonction pour vérifier si l'utilisateur est connecté
  const isAuthenticated = () => {
    return !!token && !!user;
  };

  // Fonction pour vérifier si l'utilisateur a un rôle spécifique
  const hasRole = (role) => {
    return user && user.role === role;
  };

  // Fonction pour vérifier si l'utilisateur est admin
  const isAdmin = () => {
    return hasRole('admin');
  };

  // Fonction pour vérifier si l'utilisateur est instructeur
  const isInstructor = () => {
    return hasRole('instructor');
  };

  // Fonction pour vérifier si l'utilisateur est étudiant
  const isStudent = () => {
    return hasRole('student');
  };

  const value = {
    user,
    token,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    getProfile,
    isAuthenticated,
    hasRole,
    isAdmin,
    isInstructor,
    isStudent,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
