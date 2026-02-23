import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  FiBookOpen, FiPlay, FiTarget, FiChevronRight, FiChevronLeft,
  FiZap, FiShield, FiPlus, FiMap, FiMessageCircle
} from 'react-icons/fi';
import ResponsiveNavigation from '../components/ResponsiveNavigation';

const ClassroomContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 0;
  position: relative;
  overflow-x: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const MainContent = styled.div`
  padding: clamp(24px, 6vw, 40px);
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 2;

  @media (max-width: 480px) {
    padding: 24px 20px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: clamp(30px, 8vw, 48px);
  color: white;

  @media (max-width: 480px) {
    margin-bottom: 30px;
  }
`;

const Title = styled(motion.h1)`
  font-size: clamp(28px, 7vw, 3rem);
  font-weight: 800;
  margin: 0 0 clamp(12px, 3vw, 16px) 0;
  background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);

  @media (max-width: 480px) {
    font-size: 32px;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(16px, 4vw, 1.25rem);
  opacity: 0.9;
  margin: 0;
  font-weight: 400;

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

// Section Nouveau Cours
const NewCourseSection = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: clamp(20px, 5vw, 32px);
  padding: clamp(28px, 7vw, 48px);
  margin-bottom: clamp(32px, 8vw, 48px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;

  @media (max-width: 480px) {
    padding: 28px 24px;
    border-radius: 20px;
    margin-bottom: 32px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  }
`;

const SectionTitle = styled.h2`
  font-size: clamp(24px, 6vw, 2rem);
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 clamp(6px, 2vw, 8px) 0;
  display: flex;
  align-items: center;
  gap: clamp(12px, 3vw, 16px);

  @media (max-width: 480px) {
    font-size: 24px;
    gap: 12px;
  }

  svg {
    color: #667eea;
    font-size: clamp(24px, 6vw, 2.5rem);

    @media (max-width: 480px) {
      font-size: 24px;
    }
  }
`;

const SectionDescription = styled.p`
  font-size: clamp(14px, 3.5vw, 1.1rem);
  color: #6b7280;
  margin: 0 0 clamp(24px, 6vw, 32px) 0;

  @media (max-width: 480px) {
    font-size: 15px;
    margin-bottom: 24px;
  }
`;

const StartButton = styled(motion.button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: clamp(12px, 3vw, 16px);
  padding: clamp(16px, 4vw, 20px) clamp(24px, 6vw, 40px);
  font-size: clamp(16px, 4vw, 1.25rem);
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: clamp(8px, 2vw, 12px);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
  transition: all 0.3s ease;
  margin-bottom: clamp(24px, 6vw, 32px);

  @media (max-width: 480px) {
    padding: 16px 24px;
    font-size: 16px;
    border-radius: 12px;
    margin-bottom: 24px;
    gap: 8px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 40px rgba(102, 126, 234, 0.5);
  }
`;

const SelectionContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(180px, 100%), 1fr));
  gap: clamp(12px, 3vw, 20px);
  margin-bottom: clamp(24px, 6vw, 32px);

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-bottom: 24px;
  }
`;

const SelectionCard = styled(motion.div)`
  background: ${props => props.selected ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white'};
  color: ${props => props.selected ? 'white' : '#374151'};
  border: 2px solid ${props => props.selected ? 'transparent' : '#e5e7eb'};
  border-radius: clamp(12px, 3vw, 16px);
  padding: clamp(16px, 4vw, 24px);
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  position: relative;
  overflow: hidden;

  @media (max-width: 480px) {
    padding: 16px 12px;
    border-radius: 12px;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    border-color: #667eea;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
    opacity: ${props => props.selected ? '1' : '0'};
    transition: opacity 0.3s ease;
  }
`;

const SelectionTitle = styled.h3`
  font-size: clamp(16px, 4vw, 1.25rem);
  font-weight: 600;
  margin: 0 0 clamp(6px, 2vw, 8px) 0;
  position: relative;
  z-index: 2;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const SelectionSubtitle = styled.p`
  font-size: clamp(12px, 3vw, 0.875rem);
  opacity: 0.8;
  margin: 0;
  position: relative;
  z-index: 2;

`;

const SubjectCard = styled(motion.div)`
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: clamp(12px, 3vw, 16px);
  padding: clamp(20px, 5vw, 24px);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  @media (max-width: 480px) {
    padding: 20px 16px;
    border-radius: 12px;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    border-color: #667eea;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover::before {
    transform: scaleX(1);
  }
`;

const SubjectIcon = styled.div`
  width: clamp(48px, 12vw, 60px);
  height: clamp(48px, 12vw, 60px);
  border-radius: clamp(12px, 3vw, 16px);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: clamp(20px, 5vw, 24px);
  margin-bottom: clamp(12px, 3vw, 16px);

  @media (max-width: 480px) {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    font-size: 20px;
    margin-bottom: 12px;
  }
`;

const SubjectTitle = styled.h4`
  font-size: clamp(16px, 4vw, 1.125rem);
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 clamp(6px, 2vw, 8px) 0;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const SubjectDescription = styled.p`
  font-size: clamp(13px, 3.5vw, 0.875rem);
  color: #6b7280;
  margin: 0 0 clamp(12px, 3vw, 16px) 0;

  @media (max-width: 480px) {
    font-size: 13px;
    margin-bottom: 12px;
  }
`;

const SubjectStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: clamp(13px, 3.5vw, 0.875rem);
  color: #6b7280;

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const SubjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(200px, 100%), 1fr));
  gap: clamp(12px, 3vw, 20px);
  margin-top: clamp(24px, 6vw, 32px);

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 12px;
    margin-top: 24px;
  }
`;

const CourseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
  gap: clamp(16px, 4vw, 24px);
  margin-top: clamp(24px, 6vw, 32px);

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 16px;
    margin-top: 24px;
  }
`;

const CourseCard = styled(motion.div)`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: clamp(16px, 4vw, 20px);
  padding: clamp(24px, 6vw, 32px);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  @media (max-width: 480px) {
    padding: 24px 20px;
    border-radius: 16px;
  }

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    border-color: #10b981;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #10b981 0%, #059669 100%);
  }
`;

const CourseHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: clamp(16px, 4vw, 20px);

  @media (max-width: 480px) {
    margin-bottom: 16px;
  }
`;

const CourseIcon = styled.div`
  width: clamp(40px, 10vw, 50px);
  height: clamp(40px, 10vw, 50px);
  border-radius: clamp(10px, 3vw, 12px);
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: clamp(16px, 4vw, 20px);

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    font-size: 16px;
  }
`;

const CourseProgress = styled.div`
  font-size: clamp(13px, 3.5vw, 0.875rem);
  color: #10b981;
  font-weight: 600;

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const CourseTitle = styled.h3`
  font-size: clamp(18px, 4.5vw, 1.25rem);
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 clamp(6px, 2vw, 8px) 0;

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const CourseDescription = styled.p`
  font-size: clamp(13px, 3.5vw, 0.875rem);
  color: #6b7280;
  margin: 0 0 clamp(16px, 4vw, 20px) 0;

  @media (max-width: 480px) {
    font-size: 13px;
    margin-bottom: 16px;
  }
`;

const CourseStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: clamp(13px, 3.5vw, 0.875rem);
  color: #6b7280;

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: clamp(4px, 1vw, 6px);
  background: #f3f4f6;
  border-radius: clamp(2px, 0.5vw, 3px);
  overflow: hidden;
  margin: clamp(12px, 3vw, 16px) 0;

  @media (max-width: 480px) {
    height: 4px;
    border-radius: 2px;
    margin: 12px 0;
  }
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #10b981 0%, #059669 100%);
  border-radius: clamp(2px, 0.5vw, 3px);
  transition: width 0.8s ease;
  width: ${props => props.width || '0%'};
`;

// Section Mes Cours
const MyCoursesSection = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: clamp(20px, 5vw, 32px);
  padding: clamp(28px, 7vw, 48px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;

  @media (max-width: 480px) {
    padding: 28px 24px;
    border-radius: 20px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #10b981 0%, #059669 100%);
  }
`;

const ClassroomPage = () => {
  const [showNewCourse, setShowNewCourse] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSeries, setSelectedSeries] = useState('');

  const classes = [
    { id: '6eme', name: '6ème', description: 'Première année du collège' },
    { id: '5eme', name: '5ème', description: 'Deuxième année du collège' },
    { id: '4eme', name: '4ème', description: 'Troisième année du collège' },
    { id: '3eme', name: '3ème', description: 'Dernière année du collège' },
    { id: 'seconde', name: 'Seconde', description: 'Première année du lycée' },
    { id: 'premiere', name: 'Première', description: 'Deuxième année du lycée' },
    { id: 'terminale', name: 'Terminale', description: 'Dernière année du lycée' }
  ];

    const series = [
    { id: 'A1', name: 'Serie A1', description: 'Litteraire (lettres-langues)' },
    { id: 'A2', name: 'Serie A2', description: 'Litteraire (lettres-sciences humaines)' },
    { id: 'B', name: 'Serie B', description: 'Economique et sociale' },
    { id: 'C', name: 'Serie C', description: 'Scientifique (maths-physique)' },
    { id: 'D', name: 'Serie D', description: 'Scientifique (svt-bio)' },
    { id: 'G2', name: 'Serie G2', description: 'Gestion et comptabilite' },
    { id: 'F2', name: 'Serie F2', description: 'Technique (electronique)' },
    { id: 'F3', name: 'Serie F3', description: 'Technique (electrotechnique)' },
    { id: 'F4', name: 'Serie F4', description: 'Technique (genie civil)' },
    { id: 'HR', name: 'Serie HR', description: 'Hotellerie-restauration' },
    { id: 'CF', name: 'Serie CF', description: 'Comptabilite-gestion' }
  ];

  const subjectsCatalog = {
    maths: { id: 'maths', name: 'Mathematiques', description: 'Algebre, geometrie, analyse', icon: FiTarget },
    francais: { id: 'francais', name: 'Francais', description: 'Expression, grammaire, litterature', icon: FiBookOpen },
    anglais: { id: 'anglais', name: 'Anglais', description: 'Langue vivante et communication', icon: FiMessageCircle },
    histoire_geo: { id: 'histoire_geo', name: 'Histoire-Geographie', description: 'Histoire, geographie, citoyennete', icon: FiMap },
    pct: { id: 'pct', name: 'Physique-Chimie', description: 'Physique, chimie, technologie', icon: FiZap },
    svt: { id: 'svt', name: 'SVT', description: 'Sciences de la vie et de la terre', icon: FiZap },
    philosophie: { id: 'philosophie', name: 'Philosophie', description: 'Reflexion, argumentation, logique', icon: FiShield },
    economie: { id: 'economie', name: 'Economie', description: 'Economie generale et sociale', icon: FiTarget },
    comptabilite: { id: 'comptabilite', name: 'Comptabilite', description: 'Comptabilite generale et analytique', icon: FiTarget },
    gestion: { id: 'gestion', name: 'Gestion', description: "Gestion de l'entreprise et organisation", icon: FiTarget },
    technologie: { id: 'technologie', name: 'Technologie', description: 'Applications techniques et industrielles', icon: FiZap },
    hotellerie: { id: 'hotellerie', name: 'Hotellerie-Restauration', description: 'Service, cuisine, hebergement', icon: FiShield },
  };

  const collegeSubjectsByClass = {
    '6eme': ['francais', 'maths', 'anglais', 'histoire_geo', 'svt'],
    '5eme': ['francais', 'maths', 'anglais', 'histoire_geo', 'svt', 'pct'],
    '4eme': ['francais', 'maths', 'anglais', 'histoire_geo', 'svt', 'pct'],
    '3eme': ['francais', 'maths', 'anglais', 'histoire_geo', 'svt', 'pct'],
  };

  const lyceeSubjectsBySeries = {
    A1: ['francais', 'anglais', 'histoire_geo', 'philosophie'],
    A2: ['francais', 'anglais', 'histoire_geo', 'philosophie'],
    B: ['francais', 'anglais', 'histoire_geo', 'philosophie', 'economie', 'maths'],
    C: ['francais', 'anglais', 'histoire_geo', 'philosophie', 'maths', 'pct'],
    D: ['francais', 'anglais', 'histoire_geo', 'philosophie', 'maths', 'pct', 'svt'],
    G2: ['francais', 'anglais', 'histoire_geo', 'economie', 'gestion', 'comptabilite', 'maths'],
    CF: ['francais', 'anglais', 'histoire_geo', 'gestion', 'comptabilite', 'economie'],
    F2: ['francais', 'anglais', 'maths', 'pct', 'technologie'],
    F3: ['francais', 'anglais', 'maths', 'pct', 'technologie'],
    F4: ['francais', 'anglais', 'maths', 'pct', 'technologie'],
    HR: ['francais', 'anglais', 'gestion', 'economie', 'hotellerie'],
  };

  const getSeriesByClass = (classId) => {
    if (classId === 'premiere' || classId === 'terminale') return series;
    return [];
  };

  // Fonction pour obtenir les matieres disponibles selon la classe et la serie
  const getAvailableSubjects = (classId, seriesId) => {
    if (collegeSubjectsByClass[classId]) {
      return collegeSubjectsByClass[classId]
        .map((subjectId) => subjectsCatalog[subjectId])
        .filter(Boolean);
    }

    if (classId === 'seconde') {
      const secondeSubjectIds = ['francais', 'maths', 'anglais', 'histoire_geo', 'pct', 'svt'];
      return secondeSubjectIds.map((subjectId) => subjectsCatalog[subjectId]).filter(Boolean);
    }

    if ((classId === 'premiere' || classId === 'terminale') && seriesId) {
      return (lyceeSubjectsBySeries[seriesId] || [])
        .map((subjectId) => subjectsCatalog[subjectId])
        .filter(Boolean);
    }

    return [];
  };
  const myCourses = [
    {
      id: 1,
      title: 'Mathématiques - Terminale C',
      description: 'Fonctions exponentielles et logarithmes',
      progress: 75,
      duration: '2h 30min',
      lessons: 12,
      icon: FiTarget
    },
    {
      id: 2,
      title: 'Français - Première',
      description: 'Préparation au baccalauréat',
      progress: 60,
      duration: '1h 45min',
      lessons: 8,
      icon: FiBookOpen
    },
    {
      id: 3,
      title: 'Sciences Physiques - Terminale',
      description: 'Mécanique et électricité',
      progress: 45,
      duration: '3h 15min',
      lessons: 15,
      icon: FiZap
    }
  ];

  const handleStartNewCourse = () => {
    setShowNewCourse(true);
    setSelectedClass('');
    setSelectedSeries('');
  };

  const handleClassSelect = (classId) => {
    setSelectedClass(classId);
    setSelectedSeries('');
  };

  const navigate = useNavigate();

  const handleSeriesSelect = (seriesId) => {
    setSelectedSeries(seriesId);
  };

  const handleSubjectSelect = (subject) => {
    // Rediriger vers la page de la matière sélectionnée
    const subjectRoutes = {
      'Mathematiques': 'mathematiques-6eme',
      'Francais': 'francais-6eme',
      'Histoire-Geographie': 'histoire-6eme',
      'Physique-Chimie': 'physique-chimie-2nde',
      'SVT': 'svt-2nde',
      'Philosophie': 'philosophie-terminale'
    };

    const route = subjectRoutes[subject.name];
    if (route) {
      navigate(`/${route}`);
    } else {
      console.log('Cours sélectionnés:', { selectedClass, selectedSeries, subject });
    }
  };

  return (
    <ResponsiveNavigation>
      <ClassroomContainer>
        <MainContent>
          <Header>
            <Title
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <FiBookOpen />
              Ma Classe Virtuelle
            </Title>
            <Subtitle
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Explorez, apprenez et excellez dans vos études
            </Subtitle>
          </Header>

          {/* Section Nouveau Cours */}
          <NewCourseSection>
            <SectionTitle>
              <FiPlus />
              Démarrer un Nouveau Cours
            </SectionTitle>
            <SectionDescription>
              Choisissez votre niveau, série et matière pour accéder à des cours personnalisés
            </SectionDescription>

            {!showNewCourse ? (
              <StartButton
                onClick={handleStartNewCourse}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiPlay />
                Commencer la Sélection
              </StartButton>
            ) : (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Sélection de la classe */}
                  <h3 style={{ marginBottom: '20px', color: '#1f2937', fontSize: '1.5rem' }}>
                    1. Choisissez votre classe
                  </h3>
                  <SelectionContainer>
                    {classes.map((cls, index) => (
                      <SelectionCard
                        key={cls.id}
                        selected={selectedClass === cls.id}
                        onClick={() => handleClassSelect(cls.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <SelectionTitle>{cls.name}</SelectionTitle>
                        <SelectionSubtitle>{cls.description}</SelectionSubtitle>
                      </SelectionCard>
                    ))}
                  </SelectionContainer>

                  {/* Selection de la serie (Premiere et Terminale) */}
                  {selectedClass && getSeriesByClass(selectedClass).length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3 style={{ marginBottom: '20px', color: '#1f2937', fontSize: '1.5rem' }}>
                        2. Choisissez votre série
                      </h3>
                      <SelectionContainer>
                        {getSeriesByClass(selectedClass).map((serie, index) => (
                          <SelectionCard
                            key={serie.id}
                            selected={selectedSeries === serie.id}
                            onClick={() => handleSeriesSelect(serie.id)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <SelectionTitle>{serie.name}</SelectionTitle>
                            <SelectionSubtitle>{serie.description}</SelectionSubtitle>
                          </SelectionCard>
                        ))}
                      </SelectionContainer>
                    </motion.div>
                  )}

                  {/* Sélection de la matière */}
                  {selectedClass && (getSeriesByClass(selectedClass).length === 0 || selectedSeries) && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3 style={{ marginBottom: '20px', color: '#1f2937', fontSize: '1.5rem' }}>
                        {getSeriesByClass(selectedClass).length > 0 ? '3. ' : '2. '}Choisissez une matiere
                      </h3>
                      <SubjectGrid>
                        {getAvailableSubjects(selectedClass, selectedSeries).map((subject, index) => (
                          <SubjectCard
                            key={subject.id}
                            onClick={() => handleSubjectSelect(subject)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <SubjectIcon>
                              <subject.icon />
                            </SubjectIcon>
                            <SubjectTitle>{subject.name}</SubjectTitle>
                            <SubjectDescription>{subject.description}</SubjectDescription>
                            <SubjectStats>
                              <span>Voir les cours</span>
                              <FiChevronRight />
                            </SubjectStats>
                          </SubjectCard>
                        ))}
                      </SubjectGrid>
                    </motion.div>
                  )}

                  <motion.div
                    style={{ marginTop: '32px', textAlign: 'center' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <button
                      onClick={() => setShowNewCourse(false)}
                      style={{
                        background: 'transparent',
                        border: '2px solid #e5e7eb',
                        borderRadius: '12px',
                        padding: '12px 24px',
                        color: '#6b7280',
                        cursor: 'pointer',
                        marginRight: '16px'
                      }}
                    >
                      <FiChevronLeft style={{ marginRight: '8px' }} />
                      Retour
                    </button>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            )}
          </NewCourseSection>

          {/* Section Mes Cours */}
          <MyCoursesSection>
            <SectionTitle>
              <FiBookOpen />
              Mes Cours en Cours
            </SectionTitle>
            <SectionDescription>
              Continuez votre apprentissage avec vos cours actifs
            </SectionDescription>

            <CourseGrid>
              {myCourses.map((course, index) => (
                <CourseCard
                  key={course.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CourseHeader>
                    <CourseIcon>
                      <course.icon />
                    </CourseIcon>
                    <CourseProgress>{course.progress}%</CourseProgress>
                  </CourseHeader>
                  <CourseTitle>{course.title}</CourseTitle>
                  <CourseDescription>{course.description}</CourseDescription>
                  <ProgressBar>
                    <ProgressFill width={`${course.progress}%`} />
                  </ProgressBar>
                  <CourseStats>
                    <span>{course.lessons} leçons</span>
                    <span>{course.duration}</span>
                  </CourseStats>
                </CourseCard>
              ))}
            </CourseGrid>
          </MyCoursesSection>
        </MainContent>
      </ClassroomContainer>
    </ResponsiveNavigation>
  );
};
export default ClassroomPage;
