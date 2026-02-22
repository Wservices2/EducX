import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const phraseMap = {
  "Accueil": "Home",
  "Cours": "Courses",
  "À propos": "About",
  "Contact": "Contact",
  "Connexion": "Login",
  "Inscription": "Sign up",
  "Mon profil": "My profile",
  "Paramètres": "Settings",
  "Déconnexion": "Logout",
  "Navigation": "Navigation",
  "Support": "Support",
  "Plateforme éducative #1 au Bénin": "Benin's #1 educational platform",
  "Transformez votre apprentissage avec des cours interactifs, un suivi personnalisé et une communauté active": "Transform your learning with interactive courses, personalized tracking, and an active community",
  "Rejoignez des milliers de collégiens ou lycéens qui réussissent grâce à notre plateforme innovante et nos contenus adaptés au programme béninois.": "Join thousands of students succeeding with our innovative platform and curriculum-aligned content.",
  "Commencer maintenant": "Start now",
  "Voir les cours": "View courses",
  "Des chiffres qui parlent": "Numbers that speak",
  "Pourquoi choisir EducX ?": "Why choose EducX?",
  "Cours interactifs": "Interactive courses",
  "Suivi personnalisé": "Personalized tracking",
  "Communauté active": "Active community",
  "Prêt à transformer votre apprentissage ?": "Ready to transform your learning?",
  "Commencer gratuitement": "Start for free",
  "Retour à l'accueil": "Back to home",
  "Connexion...": "Logging in...",
  "Se connecter": "Login",
  "Créer un compte": "Create an account",
  "Créer mon compte": "Create my account",
  "Création du compte...": "Creating account...",
  "Adresse email": "Email address",
  "Mot de passe": "Password",
  "Confirmer le mot de passe": "Confirm password",
  "Se souvenir de moi": "Remember me",
  "Mot de passe oublié ?": "Forgot password?",
  "Votre opérateur mobile": "Your mobile operator",
  "Sélectionnez votre opérateur": "Select your operator",
  "Ou connectez-vous avec": "Or sign in with",
  "Pas encore de compte ?": "Don't have an account yet?",
  "Déjà un compte ?": "Already have an account?",
  "Prénom": "First name",
  "Nom": "Last name",
  "Entrez votre prénom": "Enter your first name",
  "Entrez votre nom": "Enter your last name",
  "Entrez votre mot de passe": "Enter your password",
  "Connectez-vous à votre compte EducX": "Sign in to your EducX account",
  "Rejoignez la communauté EducX et commencez votre apprentissage": "Join the EducX community and start learning",
  "Actions rapides": "Quick actions",
  "Activité récente": "Recent activity",
  "Progression": "Progress",
  "Cours inscrits": "Enrolled courses",
  "Heures apprises": "Hours learned",
  "Certificats": "Certificates",
  "Jours actifs": "Active days",
  "Chargement...": "Loading...",
  "Aucune activité récente": "No recent activity",
  "Commencez un cours pour voir votre activité ici": "Start a course to see your activity here",
  "Aucune progression enregistrée": "No progress recorded",
  "Abonnement": "Subscription",
  "Classe": "Class",
  "Profil": "Profile",
  "Parametres": "Settings",
  "Centre d'aide": "Help center",
  "Nous contacter": "Contact us",
  "Se deconnecter": "Log out",
  "Sombre": "Dark",
  "Clair": "Light",
};

const reverseMap = Object.fromEntries(
  Object.entries(phraseMap).map(([fr, en]) => [en, fr])
);

const replaceText = (text, lang) => {
  const source = lang === 'en' ? phraseMap : reverseMap;
  const normalized = text.trim();
  if (!normalized) return text;

  if (source[normalized]) {
    return text.replace(normalized, source[normalized]);
  }

  let next = text;
  Object.entries(source).forEach(([from, to]) => {
    if (next.includes(from)) {
      next = next.split(from).join(to);
    }
  });
  return next;
};

const GlobalTranslator = () => {
  const { language } = useLanguage();

  useEffect(() => {
    const applyTranslation = (root) => {
      if (!root) return;

      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          const tag = parent.tagName?.toLowerCase();
          if (tag === 'script' || tag === 'style' || tag === 'noscript') {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      });

      let current = walker.nextNode();
      while (current) {
        const translated = replaceText(current.nodeValue, language);
        if (translated !== current.nodeValue) {
          current.nodeValue = translated;
        }
        current = walker.nextNode();
      }

      const fields = root.querySelectorAll('input[placeholder], textarea[placeholder], option, [aria-label]');
      fields.forEach((el) => {
        if (el.placeholder) {
          el.placeholder = replaceText(el.placeholder, language);
        }
        if (el.textContent) {
          const translated = replaceText(el.textContent, language);
          if (translated !== el.textContent) el.textContent = translated;
        }
        const ariaLabel = el.getAttribute('aria-label');
        if (ariaLabel) {
          el.setAttribute('aria-label', replaceText(ariaLabel, language));
        }
      });
    };

    applyTranslation(document.body);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            applyTranslation(node);
          } else if (node.nodeType === Node.TEXT_NODE && node.nodeValue) {
            const translated = replaceText(node.nodeValue, language);
            if (translated !== node.nodeValue) {
              node.nodeValue = translated;
            }
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, [language]);

  return null;
};

export default GlobalTranslator;
