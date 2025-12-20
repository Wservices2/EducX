import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiMail, FiCalendar, FiAward, FiTrendingUp, FiEdit3, FiCamera, FiShield } from 'react-icons/fi';
import ResponsiveNavigation from '../components/ResponsiveNavigation';

const ProfileContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 20px;
  padding-bottom: 100px;

  @media (min-width: 769px) {
    padding: 40px;
    padding-bottom: 0;
  }
`;

const Header = styled.div`
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  margin: -20px -20px 30px;
  padding: 40px 20px;
  color: white;
  border-radius: 0 0 24px 24px;
  text-align: center;

  @media (min-width: 769px) {
    margin: -40px -40px 40px;
    padding: 60px 40px;
    border-radius: 0 0 32px 32px;
  }
`;

const ProfileAvatar = styled.div`
  width: 100px;
  height: 100px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  font-weight: bold;
  margin: 0 auto 16px;
  backdrop-filter: blur(10px);
  border: 3px solid rgba(255, 255, 255, 0.3);
`;

const ProfileName = styled.h1`
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 8px;

  @media (min-width: 768px) {
    font-size: 32px;
  }
`;

const ProfileEmail = styled.p`
  font-size: 16px;
  opacity: 0.9;
`;

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 30px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }
`;

const StatCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.05);
`;

const StatNumber = styled.div`
  font-size: 24px;
  font-weight: 800;
  color: #1e40af;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
`;

const Section = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.05);
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SectionIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #1e40af, #3b82f6);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 0;
  border-bottom: 1px solid #f3f4f6;

  &:last-child {
    border-bottom: none;
  }
`;

const InfoIcon = styled.div`
  width: 40px;
  height: 40px;
  background: rgba(30, 64, 175, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1e40af;
  font-size: 18px;
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoLabel = styled.div`
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 2px;
`;

const InfoValue = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
`;

const EditButton = styled.button`
  background: transparent;
  color: #1e40af;
  border: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(30, 64, 175, 0.1);
  }
`;

const ActionButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #1e40af, #3b82f6);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(30, 64, 175, 0.4);
  }
`;

const ProfilePage = () => {
  const { user } = useAuth();

  const getUserInitials = () => {
    if (user) {
      return `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase();
    }
    return 'U';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Non disponible';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <ResponsiveNavigation>
      <ProfileContainer>
      <Header>
        <ProfileAvatar>
          {getUserInitials()}
        </ProfileAvatar>
        <ProfileName>
          {user?.firstName} {user?.lastName}
        </ProfileName>
        <ProfileEmail>{user?.email}</ProfileEmail>
      </Header>

      <Content>
        <StatsGrid>
          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <StatNumber>12</StatNumber>
            <StatLabel>Cours terminés</StatLabel>
          </StatCard>
          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <StatNumber>45h</StatNumber>
            <StatLabel>Heures étudiées</StatLabel>
          </StatCard>
          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <StatNumber>8</StatNumber>
            <StatLabel>Succès</StatLabel>
          </StatCard>
          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <StatNumber>15</StatNumber>
            <StatLabel>Jours de suite</StatLabel>
          </StatCard>
        </StatsGrid>

        <Section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <SectionTitle>
            <SectionIcon>
              <FiUser />
            </SectionIcon>
            Informations personnelles
          </SectionTitle>
          
          <InfoItem>
            <InfoIcon>
              <FiUser />
            </InfoIcon>
            <InfoContent>
              <InfoLabel>Nom complet</InfoLabel>
              <InfoValue>{user?.firstName} {user?.lastName}</InfoValue>
            </InfoContent>
            <EditButton>Modifier</EditButton>
          </InfoItem>

          <InfoItem>
            <InfoIcon>
              <FiMail />
            </InfoIcon>
            <InfoContent>
              <InfoLabel>Adresse email</InfoLabel>
              <InfoValue>{user?.email}</InfoValue>
            </InfoContent>
            <EditButton>Modifier</EditButton>
          </InfoItem>

          <InfoItem>
            <InfoIcon>
              <FiCalendar />
            </InfoIcon>
            <InfoContent>
              <InfoLabel>Membre depuis</InfoLabel>
              <InfoValue>{formatDate(user?.createdAt)}</InfoValue>
            </InfoContent>
          </InfoItem>

          <InfoItem>
            <InfoIcon>
              <FiAward />
            </InfoIcon>
            <InfoContent>
              <InfoLabel>Rôle</InfoLabel>
              <InfoValue>{user?.role === 'student' ? 'Étudiant' : user?.role}</InfoValue>
            </InfoContent>
          </InfoItem>
        </Section>

        <Section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <SectionTitle>
            <SectionIcon>
              <FiTrendingUp />
            </SectionIcon>
            Statistiques d'apprentissage
          </SectionTitle>
          
          <InfoItem>
            <InfoIcon>
              <FiAward />
            </InfoIcon>
            <InfoContent>
              <InfoLabel>Dernière connexion</InfoLabel>
              <InfoValue>{formatDate(user?.lastLogin)}</InfoValue>
            </InfoContent>
          </InfoItem>

          <InfoItem>
            <InfoIcon>
              <FiTrendingUp />
            </InfoIcon>
            <InfoContent>
              <InfoLabel>Progression moyenne</InfoLabel>
              <InfoValue>85%</InfoValue>
            </InfoContent>
          </InfoItem>
        </Section>

        <ActionButton>
          <FiCamera />
          Changer la photo de profil
        </ActionButton>
      </Content>

    </ProfileContainer>
    </ResponsiveNavigation>
  );
};

export default ProfilePage;
