const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Le titre du cours est requis'],
    trim: true,
    maxlength: [100, 'Le titre ne peut pas dépasser 100 caractères']
  },
  description: {
    type: String,
    required: [true, 'La description est requise'],
    maxlength: [1000, 'La description ne peut pas dépasser 1000 caractères']
  },
  shortDescription: {
    type: String,
    maxlength: [200, 'La description courte ne peut pas dépasser 200 caractères']
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'L\'instructeur est requis']
  },
  category: {
    type: String,
    required: [true, 'La catégorie est requise'],
    enum: [
      'developpement-web',
      'marketing-digital',
      'entrepreneuriat',
      'langues',
      'sciences',
      'design',
      'business',
      'informatique',
      'mathematiques',
      'autres'
    ]
  },
  level: {
    type: String,
    required: [true, 'Le niveau est requis'],
    enum: ['debutant', 'intermediaire', 'avance'],
    default: 'debutant'
  },
  duration: {
    type: Number,
    required: [true, 'La durée est requise'],
    min: [1, 'La durée doit être d\'au moins 1 heure']
  },
  price: {
    type: Number,
    required: [true, 'Le prix est requis'],
    min: [0, 'Le prix ne peut pas être négatif']
  },
  currency: {
    type: String,
    default: 'XOF',
    enum: ['XOF', 'USD', 'EUR']
  },
  thumbnail: {
    type: String,
    default: ''
  },
  videoIntro: {
    type: String,
    default: ''
  },
  lessons: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson'
  }],
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
  tags: [{
    type: String,
    trim: true
  }],
  prerequisites: [{
    type: String,
    trim: true
  }],
  learningObjectives: [{
    type: String,
    trim: true
  }],
  isPublished: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  enrollmentCount: {
    type: Number,
    default: 0
  },
  completionCount: {
    type: Number,
    default: 0
  },
  language: {
    type: String,
    default: 'fr',
    enum: ['fr', 'en']
  },
  difficulty: {
    type: String,
    enum: ['facile', 'moyen', 'difficile'],
    default: 'facile'
  }
}, {
  timestamps: true
});

// Index pour améliorer les performances
courseSchema.index({ title: 'text', description: 'text', tags: 'text' });
courseSchema.index({ category: 1 });
courseSchema.index({ level: 1 });
courseSchema.index({ instructor: 1 });
courseSchema.index({ isPublished: 1 });
courseSchema.index({ isFeatured: 1 });
courseSchema.index({ 'rating.average': -1 });
courseSchema.index({ enrollmentCount: -1 });

// Méthode virtuelle pour obtenir le nombre de leçons
courseSchema.virtual('lessonCount').get(function() {
  return this.lessons.length;
});

// Méthode pour calculer le taux de complétion
courseSchema.methods.getCompletionRate = function() {
  if (this.enrollmentCount === 0) return 0;
  return Math.round((this.completionCount / this.enrollmentCount) * 100);
};

// Méthode pour mettre à jour la note moyenne
courseSchema.methods.updateRating = function() {
  const Review = mongoose.model('Review');
  return Review.aggregate([
    { $match: { course: this._id } },
    { $group: { _id: null, average: { $avg: '$rating' }, count: { $sum: 1 } } }
  ]).then(result => {
    if (result.length > 0) {
      this.rating.average = Math.round(result[0].average * 10) / 10;
      this.rating.count = result[0].count;
    } else {
      this.rating.average = 0;
      this.rating.count = 0;
    }
    return this.save();
  });
};

// Middleware pour mettre à jour les compteurs
courseSchema.pre('save', function(next) {
  this.enrollmentCount = this.students.length;
  next();
});

module.exports = mongoose.model('Course', courseSchema);
