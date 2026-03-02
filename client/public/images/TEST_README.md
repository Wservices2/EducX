# Test du systeme d'images dynamiques

Pour tester le slideshow avec des photos d'ados africains en e-learning:

1. Ajoutez vos images dans `client/public/images/` avec les noms:
   - `african-elearning-1.jpg`
   - `african-elearning-2.jpg`
   - `african-elearning-3.jpg`
   - etc.

2. Redemarrez le front:
   ```bash
   cd client
   npm start
   ```

3. Le systeme detecte automatiquement les images valides.

## Notes

- Les noms numeriques (`1.jpg`, `2.jpg`, etc.) restent compatibles.
- Formats supportes: JPG, JPEG, PNG, WebP.
- Si aucune image locale n'est trouvee, un fallback distant est utilise.
