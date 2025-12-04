import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiBookOpen, FiPlay, FiClock, FiStar, FiUsers, FiAward, FiTarget } from 'react-icons/fi';
import ResponsiveNavigation from '../components/ResponsiveNavigation';

const CoursesContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: clamp(20px, 5vw, 24px);
  padding-bottom: clamp(80px, 15vw, 100px);

  @media (min-width: 769px) {
    padding: clamp(32px, 7vw, 48px);
    padding-bottom: 0;
  }
`;

const Header = styled.div`
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  margin: calc(-1 * clamp(20px, 5vw, 24px)) calc(-1 * clamp(20px, 5vw, 24px)) clamp(28px, 7vw, 32px);
  padding: clamp(32px, 8vw, 48px) clamp(20px, 5vw, 24px);
  color: white;
  border-radius: 0 0 clamp(20px, 5vw, 24px) clamp(20px, 5vw, 24px);

  @media (min-width: 769px) {
    margin: calc(-1 * clamp(32px, 7vw, 48px)) calc(-1 * clamp(32px, 7vw, 48px)) clamp(40px, 9vw, 48px);
    padding: clamp(56px, 11vw, 64px) clamp(32px, 7vw, 48px);
    border-radius: 0 0 clamp(24px, 6vw, 32px) clamp(24px, 6vw, 32px);
  }
`;

const HeaderTitle = styled.h1`
  font-size: clamp(24px, 6vw, 28px);
  font-weight: 800;
  margin-bottom: clamp(6px, 2vw, 8px);

  @media (min-width: 768px) {
    font-size: clamp(30px, 8vw, 36px);
  }
`;

const HeaderSubtitle = styled.p`
  font-size: clamp(14px, 3.5vw, 16px);
  opacity: 0.9;
`;

const CoursesGrid = styled.div`
  display: grid;
  gap: clamp(20px, 5vw, 24px);
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: clamp(20px, 5vw, 24px);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const CourseCard = styled(motion.div)`
  background: white;
  border-radius: clamp(16px, 4vw, 20px);
  padding: clamp(20px, 5vw, 24px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;

  @media (max-width: 480px) {
    padding: 20px;
    border-radius: 16px;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const CourseImage = styled.div`
  width: 100%;
  height: 120px;
  background: ${props => props.gradient || 'linear-gradient(135deg, #1e40af, #3b82f6)'};
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  color: white;
  font-size: 32px;
`;

const CourseTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 8px;
`;

const CourseDescription = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 16px;
  line-height: 1.5;
`;

const CourseMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const CourseDuration = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #6b7280;
`;

const CourseRating = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #f59e0b;
`;

const CourseProgress = styled.div`
  margin-bottom: 16px;
`;

const ProgressLabel = styled.div`
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 8px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #22c55e, #16a34a);
  border-radius: 4px;
  width: ${props => props.percentage}%;
  transition: width 0.3s ease;
`;

const StartButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #1e40af, #3b82f6);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(30, 64, 175, 0.4);
  }
`;

const CoursesPage = () => {
  const courses = [
    {
      id: 1,
      title: 'Français - Grammaire',
      description: 'Maîtrisez les règles de grammaire française avec des exercices pratiques.',
      duration: '2h 30min',
      rating: 4.8,
      progress: 75,
      gradient: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
      icon: FiBookOpen
    },
    {
      id: 2,
      title: 'Mathématiques - Algèbre',
      description: 'Apprenez les concepts fondamentaux de l\'algèbre et résolvez des équations.',
      duration: '3h 15min',
      rating: 4.9,
      progress: 45,
      gradient: 'linear-gradient(135deg, #22c55e, #16a34a)',
      icon: FiTarget
    },
    {
      id: 3,
      title: 'Sciences - Biologie',
      description: 'Explorez le monde vivant et comprenez les mécanismes biologiques.',
      duration: '2h 45min',
      rating: 4.7,
      progress: 90,
      gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
      icon: FiBookOpen
    },
    {
      id: 4,
      title: 'Histoire du Bénin',
      description: 'Découvrez l\'histoire riche et fascinante du Bénin.',
      duration: '1h 50min',
      rating: 4.6,
      progress: 30,
      gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
      icon: FiAward
    },
    {
      id: 5,
      title: 'Géographie Africaine',
      description: 'Explorez la géographie du continent africain et ses spécificités.',
      duration: '2h 20min',
      rating: 4.5,
      progress: 60,
      gradient: 'linear-gradient(135deg, #ef4444, #dc2626)',
      icon: FiUsers
    },
    {
      id: 6,
      title: 'Physique - Mécanique',
      description: 'Comprenez les lois fondamentales de la mécanique.',
      duration: '3h 30min',
      rating: 4.8,
      progress: 20,
      gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
      icon: FiStar
    }
  ];

  return (
    <ResponsiveNavigation>
      <CoursesContainer>
      <Header>
        <HeaderTitle>Mes Cours</HeaderTitle>
        <HeaderSubtitle>Continuez votre apprentissage</HeaderSubtitle>
      </Header>

      <CoursesGrid>
        {courses.map((course, index) => (
          <CourseCard
            key={course.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <CourseImage gradient={course.gradient}>
              <course.icon />
            </CourseImage>
            
            <CourseTitle>{course.title}</CourseTitle>
            <CourseDescription>{course.description}</CourseDescription>
            
            <CourseMeta>
              <CourseDuration>
                <FiClock />
                {course.duration}
              </CourseDuration>
              <CourseRating>
                <FiStar />
                {course.rating}
              </CourseRating>
            </CourseMeta>

            <CourseProgress>
              <ProgressLabel>Progression: {course.progress}%</ProgressLabel>
              <ProgressBar>
                <ProgressFill percentage={course.progress} />
              </ProgressBar>
            </CourseProgress>

            <StartButton>
              <FiPlay />
              {course.progress > 0 ? 'Continuer' : 'Commencer'}
            </StartButton>
          </CourseCard>
        ))}
      </CoursesGrid>

    </CoursesContainer>
    </ResponsiveNavigation>
  );
};

export default CoursesPage;
