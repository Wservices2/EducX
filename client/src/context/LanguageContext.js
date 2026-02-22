import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const LanguageContext = createContext();

const translations = {
  fr: {
    nav_class: 'Classe',
    nav_chat: 'Chat',
    nav_home: 'Accueil',
    nav_subscription: 'Abonnement',
    nav_profile: 'Profil',
    settings_title: 'Parametres',
    settings_subtitle: 'Personnalisez votre experience',
    settings_notifications: 'Notifications',
    settings_push: 'Notifications push',
    settings_push_desc: 'Recevez des notifications sur votre appareil',
    settings_reminders: 'Rappels de cours',
    settings_reminders_desc: 'Rappels pour vos cours programmes',
    settings_appearance: 'Apparence',
    settings_theme: 'Theme',
    settings_theme_desc: 'Choisissez votre theme prefere',
    settings_light: 'Clair',
    settings_dark: 'Sombre',
    settings_language: 'Langue',
    settings_language_desc: "Langue de l'interface",
    settings_security: 'Securite',
    settings_2fa: 'Authentification a deux facteurs',
    settings_2fa_desc: 'Ajoutez une couche de securite supplementaire',
    settings_support: 'Support',
    settings_help_center: "Centre d'aide",
    settings_contact: 'Nous contacter',
    settings_logout: 'Se deconnecter',
    subscription_subtitle: 'Choisissez votre formule en FCFA (Benin)',
    subscription_benefits: 'Avantages Premium (plan 15 000 FCFA)',
    subscription_subscribe: "S'abonner",
  },
  en: {
    nav_class: 'Class',
    nav_chat: 'Chat',
    nav_home: 'Home',
    nav_subscription: 'Subscription',
    nav_profile: 'Profile',
    settings_title: 'Settings',
    settings_subtitle: 'Customize your experience',
    settings_notifications: 'Notifications',
    settings_push: 'Push notifications',
    settings_push_desc: 'Receive notifications on your device',
    settings_reminders: 'Course reminders',
    settings_reminders_desc: 'Reminders for your scheduled classes',
    settings_appearance: 'Appearance',
    settings_theme: 'Theme',
    settings_theme_desc: 'Choose your preferred theme',
    settings_light: 'Light',
    settings_dark: 'Dark',
    settings_language: 'Language',
    settings_language_desc: 'Interface language',
    settings_security: 'Security',
    settings_2fa: 'Two-factor authentication',
    settings_2fa_desc: 'Add an extra security layer',
    settings_support: 'Support',
    settings_help_center: 'Help center',
    settings_contact: 'Contact us',
    settings_logout: 'Log out',
    subscription_subtitle: 'Choose your plan in FCFA (Benin)',
    subscription_benefits: 'Premium benefits (15,000 FCFA plan)',
    subscription_subscribe: 'Subscribe',
  },
};

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState('fr');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('app-language');
    if (savedLanguage === 'fr' || savedLanguage === 'en') {
      setLanguageState(savedLanguage);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((nextLanguage) => {
    const safeLanguage = nextLanguage === 'en' ? 'en' : 'fr';
    setLanguageState(safeLanguage);
    localStorage.setItem('app-language', safeLanguage);
  }, []);

  const t = useCallback((key) => {
    if (translations[language]?.[key]) {
      return translations[language][key];
    }
    return translations.fr[key] || key;
  }, [language]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    t,
  }), [language, setLanguage, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
