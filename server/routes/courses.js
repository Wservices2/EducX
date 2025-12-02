const express = require('express');
const router = express.Router();

// Routes pour les cours
router.get('/', (req, res) => {
  res.json({ 
    message: 'Liste des cours - À implémenter',
    courses: []
  });
});

router.get('/:id', (req, res) => {
  res.json({ 
    message: `Détails du cours ${req.params.id} - À implémenter`
  });
});

module.exports = router;
