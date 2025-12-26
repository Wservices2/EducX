# Test du système d'images dynamiques

Pour tester le système d'images du slideshow :

1. **Ajoutez des images** dans le dossier `client/public/images/` :
   - `1.jpg`
   - `2.png`
   - `3.jpeg`
   - etc.

2. **Redémarrez le serveur de développement** :
   ```bash
   cd client
   npm start
   ```

3. **Les images se chargeront automatiquement** sur la page d'accueil

## Images de test :
Vous pouvez télécharger des images depuis Pexels ou Unsplash et les renommer simplement :
- Copiez vos images dans `client/public/images/`
- Nommez-les `1.jpg`, `2.jpg`, `3.jpg`, etc.
- Le système les détectera automatiquement !

## Avantages :
- ✅ Ajout d'images sans modifier le code
- ✅ Chargement automatique au démarrage
- ✅ Fallback vers des images par défaut si aucune image locale
- ✅ Support de plusieurs formats (JPG, PNG, WebP, etc.)
- ✅ Vérification automatique de l'existence des images