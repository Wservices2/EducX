// Données des matières avec chapitres, vidéos et quiz
export const subjectsData = {
  // Mathématiques - 6ème
  'mathematiques-6eme': {
    id: 'mathematiques-6eme',
    name: 'Mathématiques',
    class: '6ème',
    series: null,
    chapters: [
      {
        id: 'math-6-chap1',
        number: 1,
        title: 'Les nombres entiers',
        summary: 'Introduction aux nombres entiers, leurs propriétés et opérations de base. Apprentissage des additions, soustractions, multiplications et divisions avec les nombres entiers.',
        videoId: '76979871', // ID Vimeo d'exemple
        quiz: {
          questions: [
            {
              question: 'Quel est le résultat de 15 + 27 ?',
              options: ['42', '41', '43', '40'],
              correctAnswer: 0,
              explanation: '15 + 27 = 42. On additionne les unités (5+7=12, on retient 1) et les dizaines (1+2+1=4).'
            },
            {
              question: 'Quelle est la différence entre 89 et 34 ?',
              options: ['55', '45', '65', '53'],
              correctAnswer: 0,
              explanation: '89 - 34 = 55. On soustrait les unités (9-4=5) et les dizaines (8-3=5).'
            },
            {
              question: 'Combien font 6 × 8 ?',
              options: ['48', '46', '54', '42'],
              correctAnswer: 0,
              explanation: '6 × 8 = 48. La table de multiplication de 6 par 8 donne 48.'
            }
          ]
        }
      },
      {
        id: 'math-6-chap2',
        number: 2,
        title: 'Les fractions',
        summary: 'Découverte des fractions, leur représentation et leurs opérations. Apprentissage à simplifier, additionner et comparer des fractions.',
        videoId: '76979872', // ID Vimeo d'exemple
        quiz: {
          questions: [
            {
              question: 'Quelle fraction représente la moitié d\'un gâteau ?',
              options: ['1/2', '1/3', '1/4', '2/3'],
              correctAnswer: 0,
              explanation: 'La moitié d\'un gâteau se représente par la fraction 1/2.'
            },
            {
              question: 'Quelle est la forme simplifiée de 4/8 ?',
              options: ['1/2', '2/4', '3/6', '1/4'],
              correctAnswer: 0,
              explanation: '4/8 se simplifie en divisant numérateur et dénominateur par 4, ce qui donne 1/2.'
            },
            {
              question: 'Quelle fraction est plus grande : 3/4 ou 2/3 ?',
              options: ['3/4', '2/3', 'Elles sont égales', 'Impossible à déterminer'],
              correctAnswer: 0,
              explanation: '3/4 = 0,75 et 2/3 ≈ 0,666, donc 3/4 est plus grande.'
            }
          ]
        }
      }
    ]
  },

  // Français - 6ème
  'francais-6eme': {
    id: 'francais-6eme',
    name: 'Français',
    class: '6ème',
    series: null,
    chapters: [
      {
        id: 'francais-6-chap1',
        number: 1,
        title: 'La phrase et la ponctuation',
        summary: 'Étude de la structure de la phrase française, des différents types de phrases et des règles de ponctuation essentielles.',
        videoId: '76979873',
        quiz: {
          questions: [
            {
              question: 'Quel signe de ponctuation termine généralement une phrase déclarative ?',
              options: ['Le point (.)', 'Le point d\'interrogation (?)', 'Le point d\'exclamation (!)', 'La virgule (,)'],
              correctAnswer: 0,
              explanation: 'Une phrase déclarative se termine par un point.'
            },
            {
              question: 'Quelle est la phrase correcte ?',
              options: ['Il fait beau aujourd\'hui.', 'il fait beau aujourd\'hui', 'Il fait beau aujourd\'hui', 'IL FAIT BEAU AUJOURD\'HUI !'],
              correctAnswer: 0,
              explanation: 'La première phrase respecte les règles de majuscules et de ponctuation.'
            }
          ]
        }
      },
      {
        id: 'francais-6-chap2',
        number: 2,
        title: 'Les classes grammaticales',
        summary: 'Découverte des différentes classes de mots : noms, verbes, adjectifs, déterminants, pronoms, etc.',
        videoId: '76979874',
        quiz: {
          questions: [
            {
              question: 'Dans "Le chat noir dort", quel mot est un nom ?',
              options: ['Le', 'chat', 'noir', 'dort'],
              correctAnswer: 1,
              explanation: '"Chat" est un nom commun qui désigne un animal.'
            },
            {
              question: 'Quel mot est un verbe dans cette phrase : "Marie chante une chanson" ?',
              options: ['Marie', 'chante', 'une', 'chanson'],
              correctAnswer: 1,
              explanation: '"Chante" est un verbe qui exprime l\'action.'
            }
          ]
        }
      }
    ]
  },

  // Histoire - 6ème
  'histoire-6eme': {
    id: 'histoire-6eme',
    name: 'Histoire',
    class: '6ème',
    series: null,
    chapters: [
      {
        id: 'histoire-6-chap1',
        number: 1,
        title: 'La Préhistoire',
        summary: 'Voyage dans le temps pour découvrir l\'époque de la Préhistoire, des premiers hominidés aux premières sociétés organisées.',
        videoId: '76979875',
        quiz: {
          questions: [
            {
              question: 'Quelle période marque la fin de la Préhistoire ?',
              options: ['L\'invention de l\'écriture', 'La découverte du feu', 'L\'apparition de l\'homme', 'L\'invention de l\'agriculture'],
              correctAnswer: 0,
              explanation: 'L\'invention de l\'écriture vers 3500 av. J.-C. marque le passage à l\'Histoire.'
            },
            {
              question: 'Quel est le nom de la période la plus ancienne de la Préhistoire ?',
              options: ['Le Paléolithique', 'Le Néolithique', 'Le Mésolithique', 'L\'Âge du fer'],
              correctAnswer: 0,
              explanation: 'Le Paléolithique est la période la plus ancienne de la Préhistoire.'
            }
          ]
        }
      },
      {
        id: 'histoire-6-chap2',
        number: 2,
        title: 'Les premières civilisations',
        summary: 'Étude des premières grandes civilisations : Égypte ancienne, Mésopotamie, Indus et Chine.',
        videoId: '76979876',
        quiz: {
          questions: [
            {
              question: 'Quel fleuve borde la civilisation égyptienne ?',
              options: ['Le Nil', 'L\'Euphrate', 'L\'Indus', 'Le Yangzi Jiang'],
              correctAnswer: 0,
              explanation: 'La civilisation égyptienne s\'est développée le long du Nil.'
            },
            {
              question: 'Quelle invention majeure est attribuée aux Sumériens ?',
              options: ['L\'écriture cunéiforme', 'La roue', 'L\'agriculture', 'Les pyramides'],
              correctAnswer: 0,
              explanation: 'Les Sumériens ont inventé l\'écriture cunéiforme vers 3500 av. J.-C.'
            }
          ]
        }
      }
    ]
  },

  // Physique-Chimie - 2nde
  'physique-chimie-2nde': {
    id: 'physique-chimie-2nde',
    name: 'Physique-Chimie',
    class: '2nde',
    series: null,
    chapters: [
      {
        id: 'pc-2nde-chap1',
        number: 1,
        title: 'Le mouvement',
        summary: 'Étude du mouvement des objets, introduction aux notions de vitesse, d\'accélération et de trajectoire.',
        videoId: '76979877',
        quiz: {
          questions: [
            {
              question: 'Quelle grandeur mesure la rapidité d\'un mouvement ?',
              options: ['La vitesse', 'La distance', 'Le temps', 'L\'accélération'],
              correctAnswer: 0,
              explanation: 'La vitesse mesure la rapidité d\'un mouvement.'
            },
            {
              question: 'Quelle est l\'unité de vitesse dans le système international ?',
              options: ['m/s', 'm²', 'kg', 'N'],
              correctAnswer: 0,
              explanation: 'La vitesse s\'exprime en mètres par seconde (m/s).'
            }
          ]
        }
      },
      {
        id: 'pc-2nde-chap2',
        number: 2,
        title: 'L\'énergie',
        summary: 'Découverte des différentes formes d\'énergie et des principes de conservation de l\'énergie.',
        videoId: '76979878',
        quiz: {
          questions: [
            {
              question: 'Quelle forme d\'énergie est stockée dans un ressort comprimé ?',
              options: ['Énergie mécanique', 'Énergie thermique', 'Énergie électrique', 'Énergie lumineuse'],
              correctAnswer: 0,
              explanation: 'Un ressort comprimé possède de l\'énergie mécanique élastique.'
            },
            {
              question: 'Quel principe stipule que l\'énergie ne peut ni être créée ni détruite ?',
              options: ['Principe de conservation', 'Principe d\'inertie', 'Principe fondamental', 'Principe de Newton'],
              correctAnswer: 0,
              explanation: 'Le principe de conservation de l\'énergie énonce que l\'énergie totale d\'un système isolé reste constante.'
            }
          ]
        }
      }
    ]
  },

  // SVT - 2nde
  'svt-2nde': {
    id: 'svt-2nde',
    name: 'Sciences de la Vie et de la Terre',
    class: '2nde',
    series: null,
    chapters: [
      {
        id: 'svt-2nde-chap1',
        number: 1,
        title: 'La cellule',
        summary: 'Exploration du monde cellulaire, découverte des organelles et des fonctions cellulaires.',
        videoId: '76979879',
        quiz: {
          questions: [
            {
              question: 'Quel organite cellulaire est responsable de la production d\'énergie ?',
              options: ['La mitochondrie', 'Le noyau', 'Le ribosome', 'L\'appareil de Golgi'],
              correctAnswer: 0,
              explanation: 'La mitochondrie est la centrale énergétique de la cellule.'
            },
            {
              question: 'Quel est le rôle principal du noyau cellulaire ?',
              options: ['Stocker l\'ADN', 'Produire des protéines', 'Synthétiser l\'énergie', 'Contrôler les échanges'],
              correctAnswer: 0,
              explanation: 'Le noyau contient l\'ADN, support de l\'information génétique.'
            }
          ]
        }
      },
      {
        id: 'svt-2nde-chap2',
        number: 2,
        title: 'La biodiversité',
        summary: 'Étude de la diversité du vivant, des niveaux d\'organisation aux interactions entre espèces.',
        videoId: '76979880',
        quiz: {
          questions: [
            {
              question: 'Quel niveau d\'organisation se situe entre l\'organe et l\'organisme ?',
              options: ['L\'appareil', 'Le système', 'La cellule', 'Le tissu'],
              correctAnswer: 1,
              explanation: 'Le système regroupe plusieurs organes qui assurent une fonction commune.'
            },
            {
              question: 'Que signifie le terme "biodiversité" ?',
              options: ['Diversité du vivant', 'Diversité des sols', 'Diversité des climats', 'Diversité des roches'],
              correctAnswer: 0,
              explanation: 'La biodiversité désigne la diversité des êtres vivants et de leurs milieux.'
            }
          ]
        }
      }
    ]
  },

  // Philosophie - Terminale
  'philosophie-terminale': {
    id: 'philosophie-terminale',
    name: 'Philosophie',
    class: 'Terminale',
    series: 'Littéraire',
    chapters: [
      {
        id: 'philo-term-chap1',
        number: 1,
        title: 'L\'être et le paraître',
        summary: 'Introduction à la distinction entre l\'être et le paraître, exploration des concepts de vérité et d\'apparence.',
        videoId: '76979881',
        quiz: {
          questions: [
            {
              question: 'Quel philosophe grec a dit "Je sais que je ne sais rien" ?',
              options: ['Socrate', 'Platon', 'Aristote', 'Descartes'],
              correctAnswer: 0,
              explanation: 'Socrate est connu pour son célèbre "Je sais que je ne sais rien".'
            },
            {
              question: 'Quelle œuvre de Platon utilise la métaphore de la caverne ?',
              options: ['La République', 'Le Banquet', 'Phédon', 'Les Lois'],
              correctAnswer: 0,
              explanation: 'La métaphore de la caverne se trouve dans "La République" de Platon.'
            }
          ]
        }
      },
      {
        id: 'philo-term-chap2',
        number: 2,
        title: 'La conscience',
        summary: 'Étude de la conscience, de la perception et des rapports entre le corps et l\'esprit.',
        videoId: '76979882',
        quiz: {
          questions: [
            {
              question: 'Quel philosophe a écrit "Je pense donc je suis" ?',
              options: ['Descartes', 'Kant', 'Hegel', 'Nietzsche'],
              correctAnswer: 0,
              explanation: 'René Descartes a formulé le cogito ergo sum dans son "Discours de la méthode".'
            },
            {
              question: 'Quelle théorie soutient que l\'esprit et le corps sont deux substances distinctes ?',
              options: ['Le dualisme', 'Le monisme', 'L\'idéalisme', 'Le matérialisme'],
              correctAnswer: 0,
              explanation: 'Le dualisme cartésien affirme la distinction entre substance pensante (esprit) et substance étendue (corps).'
            }
          ]
        }
      }
    ]
  }
};

// Fonction pour obtenir les données d'une matière spécifique
export const getSubjectData = (subjectId) => {
  return subjectsData[subjectId] || null;
};

// Fonction pour obtenir toutes les matières disponibles
export const getAllSubjects = () => {
  return Object.values(subjectsData);
};

// Fonction pour obtenir les matières d'une classe spécifique
export const getSubjectsByClass = (classLevel) => {
  return Object.values(subjectsData).filter(subject => subject.class === classLevel);
};