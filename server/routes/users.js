const express = require('express');
const router = express.Router();

// Routes pour les utilisateurs
router.get('/profile', (req, res) => {
  res.json({ 
    message: 'Profil utilisateur - À implémenter'
  });
});

router.put('/profile', (req, res) => {
  res.json({ 
    message: 'Mise à jour du profil - À implémenter'
  });
});

module.exports = router;
