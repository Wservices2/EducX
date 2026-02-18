import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FiBookOpen, FiAward, FiClock, FiTrendingUp, FiPlay,
  FiUser, FiBell, FiSettings, FiZap, FiBarChart,
  FiChevronRight
} from 'react-icons/fi';
import ResponsiveNavigation from '../components/ResponsiveNavigation';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: #fafbfc;
  padding: 0;
  position: relative;
`;

const MainContent = styled.div`
  padding: 32px;
  max-width: 1400px;
  margin: 0 auto;
  padding-bottom: 100px; // Space for bottom nav on mobile

  @media (max-width: 768px) {
    padding: 20px;
    padding-bottom: 90px;
  }
`;

const Header = styled.div`
  margin-bottom: 48px;
`;

const WelcomeCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 24px;
  padding: 40px;
  color: white;
  position: relative;
  overflow: hidden;
  margin-bottom: 32px;

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

  @media (max-width: 768px) {
    padding: 24px;
    border-radius: 20px;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }
`;

const WelcomeTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 8px 0;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const WelcomeSubtitle = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
  margin: 0;
  font-weight: 400;
`;

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 48px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 16px;
    margin-bottom: 32px;
  }
`;

const StatCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 20px;
  }
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;

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
    gap: 24px;
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

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ActionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  border-radius: 16px;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border: 1px solid #e2e8f0;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    border-color: #cbd5e1;

    &::before {
      opacity: 1;
    }

    svg:last-child {
      transform: translateX(4px);
      color: #64748b;
    }
  }

  &:active {
    transform: translateY(-2px) scale(1.01);
  }
`;

const ActionIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: ${props => props.bgColor || '#667eea'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 22px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 14px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
  }

  svg {
    position: relative;
    z-index: 1;
  }
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
  border-radius: 4px;
  transition: width 0.8s ease;
  width: ${props => props.width || '0%'};
`;

const Dashboard = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    coursesEnrolled: 0,
    coursesCompleted: 0,
    certificates: 0,
    hoursLearned: 0,
    streak: 0,
    averageProgress: 0
  });
  const [notifications, setNotifications] = useState([]);
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Rediriger si non connecté
  useEffect(() => {
    if (!user || !token) {
      console.log('Utilisateur non connecté, redirection vers /login');
      navigate('/login');
      return;
    }
  }, [user, token, navigate]);

  // Charger les données du dashboard
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        if (!token) {
          console.log('Token non disponible, chargement annulé');
          return;
        }

        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        };

        console.log('Chargement des données du dashboard avec token:', token.substring(0, 20) + '...');

        const [statsRes, activityRes, progressRes] = await Promise.all([
          fetch('http://localhost:5000/api/dashboard/stats', { headers }),
          fetch('http://localhost:5000/api/dashboard/recent-activity', { headers }),
          fetch('http://localhost:5000/api/dashboard/progress', { headers })
        ]);

        console.log('Réponses API:', {
          stats: statsRes.status,
          activity: activityRes.status,
          progress: progressRes.status
        });

        if (!statsRes.ok || !activityRes.ok || !progressRes.ok) {
          const errorData = await Promise.all([
            statsRes.ok ? null : statsRes.json(),
            activityRes.ok ? null : activityRes.json(),
            progressRes.ok ? null : progressRes.json()
          ]);
          console.error('Erreurs API:', errorData);
          throw new Error('Erreur lors du chargement des données');
        }

        const [statsData, activityData, progressData] = await Promise.all([
          statsRes.json(),
          activityRes.json(),
          progressRes.json()
        ]);

        console.log('Données reçues:', { statsData, activityData, progressData });

        setStats(statsData);
        setNotifications(activityData);
        setProgressData(progressData);
      } catch (error) {
        console.error('Erreur lors du chargement des données du dashboard:', error);
        // En cas d'erreur, utiliser des données par défaut
        setStats({
          coursesEnrolled: 0,
          coursesCompleted: 0,
          certificates: 0,
          hoursLearned: 0,
          streak: 0,
          averageProgress: 0
        });
        setNotifications([]);
        setProgressData([]);
      } finally {
        setLoading(false);
      }
    };

    if (user && token) {
      fetchDashboardData();
    }
  }, [token, user]);

  const quickActions = [
    { title: 'Continuer', subtitle: 'Mes cours', icon: FiPlay, color: '#10b981', bgColor: '#10b981', path: '/classroom' },
    { title: 'Explorer', subtitle: 'Nouveaux cours', icon: FiBookOpen, color: '#3b82f6', bgColor: '#3b82f6', path: '/courses' },
    { title: 'Profil', subtitle: 'Mon compte', icon: FiUser, color: '#8b5cf6', bgColor: '#8b5cf6', path: '/profile' },
    { title: 'Paramètres', subtitle: 'Configuration', icon: FiSettings, color: '#f59e0b', bgColor: '#f59e0b', path: '/settings' }
  ];

  return (
    <ResponsiveNavigation>
      <DashboardContainer>
        <MainContent>
          <Header>
            <WelcomeCard>
              <WelcomeTitle>
                Bonjour, {user?.firstName || 'étudiant'} ! ­
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
                <StatValue>{loading ? '...' : stats.coursesEnrolled}</StatValue>
                <StatLabel>Cours inscrits</StatLabel>
              </StatCard>

              <StatCard color="#f59e0b">
                <StatHeader>
                  <StatIcon bgColor="#fef3c7" color="#f59e0b">
                    <FiClock />
                  </StatIcon>
                </StatHeader>
                <StatValue>{loading ? '...' : stats.hoursLearned}h</StatValue>
                <StatLabel>Heures apprises</StatLabel>
              </StatCard>

              <StatCard color="#8b5cf6">
                <StatHeader>
                  <StatIcon bgColor="#ede9fe" color="#8b5cf6">
                    <FiAward />
                  </StatIcon>
                </StatHeader>
                <StatValue>{loading ? '...' : stats.certificates}</StatValue>
                <StatLabel>Certificats</StatLabel>
              </StatCard>

              <StatCard color="#3b82f6">
                <StatHeader>
                  <StatIcon bgColor="#dbeafe" color="#3b82f6">
                    <FiTrendingUp />
                  </StatIcon>
                </StatHeader>
                <StatValue>{loading ? '...' : stats.streak}</StatValue>
                <StatLabel>Jours actifs</StatLabel>
              </StatCard>
            </StatsSection>
          </Header>

          <ContentGrid>
            <QuickActions>
              <SectionTitle>
                <FiZap />
                Actions rapides
              </SectionTitle>
              <ActionsGrid>
                {quickActions.map((action, index) => (
                  <ActionItem key={index} onClick={() => navigate(action.path)}>
                    <ActionIcon bgColor={action.bgColor}>
                      <action.icon />
                    </ActionIcon>
                    <ActionText>
                      <ActionTitle>{action.title}</ActionTitle>
                      <ActionSubtitle>{action.subtitle}</ActionSubtitle>
                    </ActionText>
                    <FiChevronRight color="#9ca3af" />
                  </ActionItem>
                ))}
              </ActionsGrid>
            </QuickActions>

            <RecentActivity>
              <SectionTitle>
                <FiBell />
                Activité récente
              </SectionTitle>
              <ActivityList>
                {loading ? (
                  <ActivityItem>
                    <ActivityIcon>
                      <FiClock />
                    </ActivityIcon>
                    <ActivityContent>
                      <ActivityTitle>Chargement...</ActivityTitle>
                      <ActivityTime></ActivityTime>
                    </ActivityContent>
                  </ActivityItem>
                ) : notifications.length === 0 ? (
                  <ActivityItem>
                    <ActivityIcon>
                      <FiBell />
                    </ActivityIcon>
                    <ActivityContent>
                      <ActivityTitle>Aucune activité récente</ActivityTitle>
                      <ActivityTime>Commencez un cours pour voir votre activité ici</ActivityTime>
                    </ActivityContent>
                  </ActivityItem>
                ) : (
                  notifications.map((notification) => (
                    <ActivityItem key={notification.id}>
                      <ActivityIcon>
                        <notification.icon />
                      </ActivityIcon>
                      <ActivityContent>
                        <ActivityTitle>{notification.title}</ActivityTitle>
                        <ActivityTime>{notification.time}</ActivityTime>
                      </ActivityContent>
                    </ActivityItem>
                  ))
                )}
              </ActivityList>
            </RecentActivity>
          </ContentGrid>

          <ProgressSection>
            <SectionTitle>
              <FiBarChart />
              Progression
            </SectionTitle>
            {progressData.length === 0 ? (
              <ProgressItem>
                <ProgressHeader>
                  <ProgressLabel>Aucune progression enregistrée</ProgressLabel>
                  <ProgressPercent>0%</ProgressPercent>
                </ProgressHeader>
                <ProgressBar>
                  <ProgressFill width="0%" />
                </ProgressBar>
              </ProgressItem>
            ) : (
              progressData.map((item, index) => (
                <ProgressItem key={index}>
                  <ProgressHeader>
                    <ProgressLabel>{item.label}</ProgressLabel>
                    <ProgressPercent>{item.percent}%</ProgressPercent>
                  </ProgressHeader>
                  <ProgressBar>
                    <ProgressFill width={`${item.percent}%`} />
                  </ProgressBar>
                </ProgressItem>
              ))
            )}
          </ProgressSection>
        </MainContent>
      </DashboardContainer>
    </ResponsiveNavigation>
  );
};

export default Dashboard;
