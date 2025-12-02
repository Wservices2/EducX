import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAward, FiCheck, FiStar, FiZap, FiShield, FiGift, FiTrendingUp } from 'react-icons/fi';
import ResponsiveNavigation from '../components/ResponsiveNavigation';

const SubscriptionContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding-bottom: 100px;
  position: relative;

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

const Header = styled.div`
  background: linear-gradient(135deg, rgba(30, 64, 175, 0.9) 0%, rgba(59, 130, 246, 0.9) 100%);
  backdrop-filter: blur(20px);
  padding: 40px 20px 30px;
  color: white;
  position: relative;
  z-index: 2;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled(motion.h1)`
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Subtitle = styled(motion.p)`
  font-size: 16px;
  opacity: 0.9;
`;

const MainContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
  position: relative;
  z-index: 2;
`;

const CurrentPlan = styled(motion.div)`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  padding: 24px;
  margin-bottom: 30px;
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%);
    pointer-events: none;
  }
`;

const PlanHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  position: relative;
  z-index: 2;
`;

const PlanIcon = styled.div`
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
`;

const PlanInfo = styled.div`
  flex: 1;
`;

const PlanName = styled.h3`
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 4px;
`;

const PlanDescription = styled.p`
  font-size: 14px;
  opacity: 0.9;
`;

const PlanStatus = styled.div`
  background: rgba(34, 197, 94, 0.2);
  border: 1px solid rgba(34, 197, 94, 0.3);
  border-radius: 12px;
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 600;
  color: #22c55e;
`;

const PlansGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
`;

const PlanCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 32px 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;

  ${props => props.$isPopular && `
    border: 2px solid #fbbf24;
    transform: scale(1.05);
    
    &::before {
      content: 'POPULAIRE';
      position: absolute;
      top: 16px;
      right: -30px;
      background: linear-gradient(135deg, #fbbf24, #f59e0b);
      color: white;
      font-size: 10px;
      font-weight: 700;
      padding: 4px 40px;
      transform: rotate(45deg);
      z-index: 3;
    }
  `}

  &:hover {
    transform: ${props => props.$isPopular ? 'scale(1.08)' : 'translateY(-8px)'};
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const PlanCardHeader = styled.div`
  text-align: center;
  margin-bottom: 24px;
`;

const PlanCardIcon = styled.div`
  width: 64px;
  height: 64px;
  background: ${props => props.$color || 'linear-gradient(135deg, #3b82f6, #1e40af)'};
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 28px;
  margin: 0 auto 16px;
`;

const PlanCardName = styled.h3`
  font-size: 24px;
  font-weight: 800;
  color: #1f2937;
  margin-bottom: 8px;
`;

const PlanCardPrice = styled.div`
  font-size: 32px;
  font-weight: 900;
  color: #1f2937;
  margin-bottom: 4px;
`;

const PlanCardPeriod = styled.div`
  font-size: 14px;
  color: #6b7280;
`;

const FeaturesList = styled.div`
  margin-bottom: 24px;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  font-size: 14px;
  color: #4b5563;
`;

const FeatureIcon = styled.div`
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
`;

const SubscribeButton = styled(motion.button)`
  width: 100%;
  background: ${props => props.$isPopular 
    ? 'linear-gradient(135deg, #fbbf24, #f59e0b)' 
    : 'linear-gradient(135deg, #3b82f6, #1e40af)'};
  border: none;
  border-radius: 16px;
  padding: 16px;
  color: white;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(59, 130, 246, 0.4);
  }
`;

const BenefitsSection = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 20px;
  font-weight: 700;
  color: white;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const BenefitCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 20px;
  text-align: center;
  color: white;
`;

const BenefitIcon = styled.div`
  font-size: 32px;
  margin-bottom: 12px;
  color: #fbbf24;
`;

const BenefitTitle = styled.h4`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const BenefitDescription = styled.p`
  font-size: 12px;
  opacity: 0.9;
  line-height: 1.4;
`;

const SubscriptionPage = () => {
  const [currentPlan] = useState({
    name: 'Plan Gratuit',
    description: 'Accès aux cours de base',
    status: 'Actif'
  });

  const [plans] = useState([
    {
      id: 'free',
      name: 'Gratuit',
      price: '0',
      period: '/mois',
      icon: FiStar,
      color: 'linear-gradient(135deg, #6b7280, #4b5563)',
      features: [
        'Accès aux cours de base',
        'Certificats limités',
        'Support communautaire',
        'Contenu public'
      ],
      isPopular: false
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '9.99',
      period: '/mois',
      icon: FiAward,
      color: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
      features: [
        'Tous les cours premium',
        'Certificats illimités',
        'Support prioritaire',
        'Contenu exclusif',
        'Accès hors ligne',
        'Analyses détaillées'
      ],
      isPopular: true
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '19.99',
      period: '/mois',
      icon: FiZap,
      color: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
      features: [
        'Tout Premium inclus',
        'Cours privés',
        'Mentorat personnel',
        'Projets pratiques',
        'Certifications avancées',
        'Accès anticipé'
      ],
      isPopular: false
    }
  ]);

  const [benefits] = useState([
    {
      icon: FiShield,
      title: 'Sécurisé',
      description: 'Vos données sont protégées'
    },
    {
      icon: FiGift,
      title: 'Cadeaux',
      description: 'Bonus et surprises'
    },
    {
      icon: FiTrendingUp,
      title: 'Progression',
      description: 'Suivi détaillé'
    },
    {
      icon: FiAward,
      title: 'Certificats',
      description: 'Reconnaissance officielle'
    },
    {
      icon: FiZap,
      title: 'Rapide',
      description: 'Accès instantané'
    },
    {
      icon: FiStar,
      title: 'Qualité',
      description: 'Contenu premium'
    }
  ]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <ResponsiveNavigation>
      <SubscriptionContainer>
      <Header>
        <HeaderContent>
          <Title
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <FiAward />
            Abonnement
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Choisissez le plan qui vous convient
          </Subtitle>
        </HeaderContent>
      </Header>

      <MainContent>
        <CurrentPlan
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.02 }}
        >
          <PlanHeader>
            <PlanIcon>
              <FiAward />
            </PlanIcon>
            <PlanInfo>
              <PlanName>{currentPlan.name}</PlanName>
              <PlanDescription>{currentPlan.description}</PlanDescription>
            </PlanInfo>
            <PlanStatus>{currentPlan.status}</PlanStatus>
          </PlanHeader>
        </CurrentPlan>

        <PlansGrid>
          <AnimatePresence>
            {plans.map((plan, index) => (
              <PlanCard
                key={plan.id}
                $isPopular={plan.isPopular}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: plan.isPopular ? 1.08 : 1.05 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <PlanCardHeader>
                  <PlanCardIcon $color={plan.color}>
                    <plan.icon />
                  </PlanCardIcon>
                  <PlanCardName>{plan.name}</PlanCardName>
                  <PlanCardPrice>${plan.price}</PlanCardPrice>
                  <PlanCardPeriod>{plan.period}</PlanCardPeriod>
                </PlanCardHeader>

                <FeaturesList>
                  {plan.features.map((feature, featureIndex) => (
                    <FeatureItem key={featureIndex}>
                      <FeatureIcon>
                        <FiCheck />
                      </FeatureIcon>
                      {feature}
                    </FeatureItem>
                  ))}
                </FeaturesList>

                <SubscribeButton
                  $isPopular={plan.isPopular}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {plan.id === 'free' ? 'Plan actuel' : 'S\'abonner'}
                </SubscribeButton>
              </PlanCard>
            ))}
          </AnimatePresence>
        </PlansGrid>

        <BenefitsSection>
          <SectionTitle
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <FiStar />
            Avantages Premium
          </SectionTitle>

          <BenefitsGrid>
            <AnimatePresence>
              {benefits.map((benefit, index) => (
                <BenefitCard
                  key={index}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.05 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <BenefitIcon>
                    <benefit.icon />
                  </BenefitIcon>
                  <BenefitTitle>{benefit.title}</BenefitTitle>
                  <BenefitDescription>{benefit.description}</BenefitDescription>
                </BenefitCard>
              ))}
            </AnimatePresence>
          </BenefitsGrid>
        </BenefitsSection>
      </MainContent>

    </SubscriptionContainer>
    </ResponsiveNavigation>
  );
};

export default SubscriptionPage;
