import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  FiBookOpen, FiAward, FiClock, FiTrendingUp, FiBell, FiZap, FiBarChart
} from 'react-icons/fi';
import ResponsiveNavigation from '../components/ResponsiveNavigation';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: #fafbfc;
  padding: 0;
  position: relative;
`;

const MainContent = styled.div`
  padding: clamp(20px, 5vw, 32px);
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 480px) {
    padding: 20px 15px;
  }
`;

const Header = styled.div`
  margin-bottom: clamp(30px, 8vw, 48px);

  @media (max-width: 480px) {
    margin-bottom: 30px;
  }
`;

const WelcomeCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: clamp(16px, 4vw, 24px);
  padding: clamp(25px, 6vw, 40px);
  color: white;
  position: relative;
  overflow: hidden;
  margin-bottom: clamp(25px, 6vw, 32px);

  @media (max-width: 480px) {
    padding: 25px 20px;
    border-radius: 16px;
    margin-bottom: 25px;
  }

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 200px;
    height: 200px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    animation: float 6s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }
`;

const WelcomeTitle = styled.h1`
  font-size: clamp(24px, 6vw, 2.5rem);
  font-weight: 700;
  margin: 0 0 clamp(6px, 2vw, 8px) 0;
  line-height: 1.2;

  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

const WelcomeSubtitle = styled.p`
  font-size: clamp(14px, 3.5vw, 1.1rem);
  opacity: 0.9;
  margin: 0;
  font-weight: 400;

  @media (max-width: 480px) {
    font-size: 15px;
  }
`;

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
  gap: clamp(20px, 5vw, 24px);
  margin-bottom: clamp(35px, 8vw, 48px);

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 20px;
    margin-bottom: 35px;
  }
`;

const StatCard = styled.div`
  background: white;
  border-radius: clamp(12px, 3vw, 16px);
  padding: clamp(24px, 6vw, 32px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease;
  position: relative;

  @media (max-width: 480px) {
    padding: 24px 20px;
    border-radius: 12px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.color || '#667eea'};
  }
`;

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const StatIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${props => props.bgColor || '#f3f4f6'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.color || '#6b7280'};
  font-size: 24px;
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 8px;
  line-height: 1;
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 48px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const QuickActions = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 24px 0;
  display: flex;
  align-items: center;
  gap: 12px;

  svg {
    color: #667eea;
  }
`;

const ActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

const ActionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  border-radius: 12px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f3f4f6;
    transform: translateY(-1px);
  }
`;

const ActionIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${props => props.bgColor || '#667eea'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
`;

const ActionText = styled.div`
  flex: 1;
`;

const ActionTitle = styled.div`
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
`;

const ActionSubtitle = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`;

const RecentActivity = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
`;

const ActivityList = styled.div`
  space-y: 16px;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid #f3f4f6;

  &:last-child {
    border-bottom: none;
  }
`;

const ActivityIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  font-size: 18px;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityTitle = styled.div`
  font-weight: 500;
  color: #1f2937;
  margin-bottom: 4px;
`;

const ActivityTime = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`;

const ProgressSection = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
`;

const ProgressItem = styled.div`
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const ProgressLabel = styled.div`
  font-weight: 500;
  color: #1f2937;
`;

const ProgressPercent = styled.div`
  font-weight: 600;
  color: #667eea;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #f3f4f6;
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
`;

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [stats] = useState({
    coursesCompleted: 12,
    hoursLearned: 48,
    certificates: 3,
    streak: 7
  });
  const [notifications] = useState([
    { id: 1, title: 'Mathématiques - Chapitre 3', time: 'Il y a 2 heures', icon: FiBookOpen },
    { id: 2, title: 'Exercice de Physique', time: 'Il y a 5 heures', icon: FiZap },
    { id: 3, title: 'Quiz d\'Histoire', time: 'Hier', icon: FiAward }
  ]);
  const [progressData] = useState([
    { label: 'Mathématiques', percent: 75 },
    { label: 'Physique', percent: 60 },
    { label: 'Histoire', percent: 90 }
  ]);

  useEffect(() => {
    // Simuler le chargement des données utilisateur
    const userData = {
      firstName: 'Jean'
    };
    setUser(userData);
  }, []);

  return (
    <ResponsiveNavigation>
      <DashboardContainer>
        <MainContent>
          <Header>
            <WelcomeCard>
              <WelcomeTitle>
                Bonjour, {user?.firstName || 'Étudiant'} ! 👋
              </WelcomeTitle>
              <WelcomeSubtitle>
                Prêt à continuer votre apprentissage ?
              </WelcomeSubtitle>
            </WelcomeCard>

            <StatsSection>
              <StatCard color="#10b981">
                <StatHeader>
                  <StatIcon bgColor="#dcfce7" color="#10b981">
                    <FiBookOpen />
                  </StatIcon>
                </StatHeader>
                <StatValue>{stats.coursesCompleted}</StatValue>
                <StatLabel>Cours terminés</StatLabel>
              </StatCard>

              <StatCard color="#f59e0b">
                <StatHeader>
                  <StatIcon bgColor="#fef3c7" color="#f59e0b">
                    <FiClock />
                  </StatIcon>
                </StatHeader>
                <StatValue>{stats.hoursLearned}h</StatValue>
                <StatLabel>Heures apprises</StatLabel>
              </StatCard>

              <StatCard color="#8b5cf6">
                <StatHeader>
                  <StatIcon bgColor="#ede9fe" color="#8b5cf6">
                    <FiAward />
                  </StatIcon>
                </StatHeader>
                <StatValue>{stats.certificates}</StatValue>
                <StatLabel>Certificats</StatLabel>
              </StatCard>

              <StatCard color="#3b82f6">
                <StatHeader>
                  <StatIcon bgColor="#dbeafe" color="#3b82f6">
                    <FiTrendingUp />
                  </StatIcon>
                </StatHeader>
                <StatValue>{stats.streak}</StatValue>
                <StatLabel>Jours de suite</StatLabel>
              </StatCard>
            </StatsSection>
          </Header>

          <ContentGrid>
            <RecentActivity>
              <SectionTitle>
                <FiBell />
                Activité récente
              </SectionTitle>
              <ActivityList>
                {notifications.map((notification) => (
                  <ActivityItem key={notification.id}>
                    <ActivityIcon>
                      <notification.icon />
                    </ActivityIcon>
                    <ActivityContent>
                      <ActivityTitle>{notification.title}</ActivityTitle>
                      <ActivityTime>{notification.time}</ActivityTime>
                    </ActivityContent>
                  </ActivityItem>
                ))}
              </ActivityList>
            </RecentActivity>
          </ContentGrid>

          <ProgressSection>
            <SectionTitle>
              <FiBarChart />
              Progression
            </SectionTitle>
            {progressData.map((item, index) => (
              <ProgressItem key={index}>
                <ProgressHeader>
                  <ProgressLabel>{item.label}</ProgressLabel>
                  <ProgressPercent>{item.percent}%</ProgressPercent>
                </ProgressHeader>
                <ProgressBar>
                  <ProgressFill style={{width: `${item.percent}%`}} />
                </ProgressBar>
              </ProgressItem>
            ))}
          </ProgressSection>
        </MainContent>
      </DashboardContainer>
    </ResponsiveNavigation>
  );
};

export default Dashboard;
