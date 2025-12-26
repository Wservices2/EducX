# Pages de Matières EducX

## Vue d'ensemble

Le système de pages de matières d'EducX offre une expérience d'apprentissage interactive et moderne avec un design mobile-first. Chaque matière dispose de sa propre page dédiée avec des chapitres organisés, des vidéos Vimeo intégrées et des quiz interactifs.

## Fonctionnalités

### 📚 Structure des Pages
Chaque page de matière comprend :
- **En-tête élégant** avec le nom de la matière et la classe
- **Chapitres extensibles** avec résumé et actions
- **Vidéos intégrées** hébergées sur Vimeo (gratuites)
- **Quiz interactifs** avec corrections détaillées

### 🎥 Système Vidéo
- Vidéos hébergées sur Vimeo
- Confirmation avant lecture (0 FCFA pour tous les étudiants)
- Lecteur intégré responsive
- Support fullscreen et picture-in-picture

### 🧠 Quiz Interactif
- Questions à choix multiples
- Validation en temps réel
- Corrections détaillées avec explications
- Calcul automatique de la note
- Possibilité de refaire le quiz

### 📱 Design Mobile-First
- Interface entièrement responsive
- Animations fluides avec Framer Motion
- Design moderne avec dégradés et effets de verre
- Navigation adaptée mobile

## Matières Disponibles

### Classe de 6ème
- **Mathématiques** : Nombres entiers, fractions
- **Français** : Phrase et ponctuation, classes grammaticales
- **Histoire** : Préhistoire, premières civilisations

### Classe de 2nde
- **Physique-Chimie** : Mouvement, énergie
- **SVT** : La cellule, biodiversité

### Classe de Terminale
- **Philosophie** (Littéraire) : L'être et le paraître, la conscience

## Comment Accéder aux Pages

1. **Via la page Classroom** :
   - Sélectionnez votre classe
   - Choisissez votre série (si applicable)
   - Cliquez sur une matière disponible

2. **Navigation directe** :
   - `/mathematiques-6eme`
   - `/francais-6eme`
   - `/histoire-6eme`
   - `/physique-chimie-2nde`
   - `/svt-2nde`
   - `/philosophie-terminale`

## Structure des Données

Les données des matières sont stockées dans `src/data/subjectsData.js` avec la structure suivante :

```javascript
{
  id: 'mathematiques-6eme',
  name: 'Mathématiques',
  class: '6ème',
  series: null, // null pour toutes séries
  chapters: [
    {
      id: 'math-6-chap1',
      number: 1,
      title: 'Les nombres entiers',
      summary: 'Résumé du chapitre...',
      videoId: '76979871', // ID Vimeo
      quiz: {
        questions: [
          {
            question: 'Question ?',
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 0,
            explanation: 'Explication...'
          }
        ]
      }
    }
  ]
}
```

## Ajouter une Nouvelle Matière

1. **Ajouter les données** dans `subjectsData.js`
2. **Créer la page** : `src/pages/[Matiere][Classe]Page.js`
3. **Ajouter la route** dans `App.js`
4. **Mettre à jour la navigation** dans `ClassroomPage.js`

## Personnalisation

### Modifier le Design
- Styles dans `SubjectPage.js`
- Thème global dans `src/styles/theme.js`
- Animations Framer Motion

### Ajouter du Contenu
- Modifier `subjectsData.js`
- Remplacer les `videoId` par de vraies vidéos Vimeo
- Ajouter plus de chapitres et quiz

### Intégration Vimeo
- Upload des vidéos sur Vimeo
- Récupérer l'ID de la vidéo dans l'URL
- Mettre à jour le `videoId` dans les données

## Technologies Utilisées

- **React** : Composants fonctionnels avec hooks
- **Styled Components** : CSS-in-JS pour le styling
- **Framer Motion** : Animations et transitions
- **React Router** : Navigation entre pages
- **Vimeo Player** : Intégration vidéo

## Support et Maintenance

- Design entièrement responsive
- Tests automatiques recommandés
- Mise à jour régulière du contenu pédagogique
- Monitoring des performances vidéos

---

*Ce système offre une base solide pour l'expansion future avec plus de matières, chapitres et fonctionnalités interactives.*