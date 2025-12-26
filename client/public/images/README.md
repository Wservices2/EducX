# Images du slideshow d'accueil

Ce dossier contient les images qui défilent automatiquement sur la page d'accueil d'EducX.

## Comment ajouter des images :

1. **Nommez vos images** avec des numéros simples :
   - `1.jpg` ou `1.png`
   - `2.jpg` ou `2.png`
   - `3.jpg` ou `3.png`
   - etc.

2. **Formats supportés** :
   - JPG/JPEG
   - PNG
   - GIF
   - WebP

3. **Taille recommandée** :
   - Largeur : 1000px minimum
   - Hauteur : 750px minimum
   - Format 4:3 ou 16:9

4. **Qualité** :
   - Images optimisées pour le web
   - Taille de fichier < 500KB par image

## Fonctionnement automatique :

- Le système charge automatiquement toutes les images nommées `1.jpg`, `2.jpg`, etc.
- Les images défilent toutes les 4 secondes
- Si une image n'existe pas, elle est ignorée automatiquement
- Images de fallback si aucune image locale n'est trouvée

## Exemple :
Ajoutez simplement vos images dans ce dossier :
```
images/
├── 1.jpg
├── 2.jpg
├── 3.jpg
└── README.md
```

Les images s'afficheront automatiquement sur le site ! 🎯