import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiPlay, FiArrowRight, FiBookOpen, FiAward, FiUsers, FiBarChart, FiTarget, FiCpu, FiStar, FiZap, FiShield, FiTrendingUp, FiCheckCircle } from 'react-icons/fi';

const HomePageContainer = styled.div`
  width: 100%;
  overflow-x: hidden;
`;

const HeroSection = styled.section`
  min-height: 100vh;
  background: linear-gradient(135deg, #EDF6F6 0%, #FFFFFF 50%, #EDF6F6 100%);
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 20%, rgba(7, 47, 166, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(158, 7, 166, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 60%, rgba(6, 183, 80, 0.1) 0%, transparent 50%);
    animation: float 20s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }
`;

const HeroText = styled.div`
  h1 {
    font-size: 64px;
    font-weight: 900;
    line-height: 1.1;
    margin-bottom: 24px;
    background: linear-gradient(135deg, #072FA6 0%, #9E07A6 50%, #06B750 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

      .flag-text {
        position: relative;
        display: inline-flex;
        align-items: flex-end;
        gap: 16px;
        
        .flag-word {
          color: #1e40af;
          position: relative;
          z-index: 2;
          font-weight: 900;
          display: inline-block;
          text-align: center;
          
          &::after {
            content: '';
            position: absolute;
            bottom: -15px;
            left: 50%;
            transform: translateX(-50%);
            width: 100%;
            height: 15px;
            border-radius: 8px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.25);
            transition: all 0.3s ease;
          }
          
          &:nth-child(1)::after {
            background: linear-gradient(90deg, #06B750, #059669);
          }
          
          &:nth-child(2)::after {
            background: linear-gradient(90deg, #F59E0B, #D97706);
          }
          
          &:nth-child(3)::after {
            background: linear-gradient(90deg, #EF4444, #DC2626);
          }
        }
      }

    @media (max-width: 768px) {
      font-size: 48px;
    }
  }

  .subtitle {
    font-size: 24px;
    color: #434040;
    margin-bottom: 32px;
    line-height: 1.6;
    font-weight: 500;

    @media (max-width: 768px) {
      font-size: 20px;
    }
  }

  .description {
    font-size: 18px;
    color: #434040;
    margin-bottom: 40px;
    line-height: 1.7;
    opacity: 0.8;
  }
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(135deg, #06B750 0%, #15B706 100%);
  color: white;
  padding: 12px 24px;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 32px;
  box-shadow: 0 8px 25px rgba(6, 183, 80, 0.3);

  .dot {
    width: 12px;
    height: 12px;
    background: white;
    border-radius: 50%;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const PrimaryButton = styled(motion.button)`
  background: linear-gradient(135deg, #072FA6 0%, #9E07A6 100%);
  color: white;
  padding: 20px 40px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 18px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 10px 30px rgba(7, 47, 166, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(7, 47, 166, 0.4);
  }
`;

const SecondaryButton = styled(motion.button)`
  background: transparent;
  color: #072FA6;
  padding: 20px 40px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 18px;
  border: 3px solid #072FA6;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #072FA6;
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(7, 47, 166, 0.3);
  }
`;

const HeroImage = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainImage = styled.div`
  width: 100%;
  max-width: 500px;
  height: 500px;
  background: linear-gradient(135deg, #072FA6 0%, #9E07A6 50%, #06B750 100%);
  border-radius: 30px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(7, 47, 166, 0.2);
  animation: float 6s ease-in-out infinite;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80') center/cover;
    opacity: 0.8;
    border-radius: 30px;
  }
`;

const FloatingIcon = styled(motion.div)`
  position: absolute;
  width: 60px;
  height: 60px;
  background: white;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  color: #072FA6;
  font-size: 24px;
  z-index: 3;

  &.book {
    bottom: 30px;
    left: 30px;
    background: linear-gradient(135deg, #06B750 0%, #15B706 100%);
    color: white;
  }

  &.graduation {
    top: 30px;
    right: 30px;
    background: linear-gradient(135deg, #9E07A6 0%, #D4080C 100%);
    color: white;
  }

  &.star {
    top: 50%;
    left: -30px;
    background: linear-gradient(135deg, #FCEA2B 0%, #CF6D0A 100%);
    color: white;
  }
`;

const StatsSection = styled.section`
  padding: 100px 0;
  background: #FFFFFF;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #072FA6 0%, #9E07A6 50%, #06B750 100%);
  }
`;

const StatsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 48px;
  font-weight: 800;
  color: #434040;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 20px;
  color: #434040;
  margin-bottom: 80px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0.8;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
`;

const StatCard = styled(motion.div)`
  background: #FFFFFF;
  padding: 50px 30px;
  border-radius: 25px;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(7, 47, 166, 0.1);
  border: 2px solid transparent;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 50px rgba(7, 47, 166, 0.2);
    border-color: #072FA6;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(90deg, #072FA6 0%, #9E07A6 50%, #06B750 100%);
  }
`;

const StatIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  font-size: 32px;
  color: white;
  background: linear-gradient(135deg, #072FA6 0%, #9E07A6 100%);
  box-shadow: 0 10px 25px rgba(7, 47, 166, 0.3);
`;

const StatNumber = styled.div`
  font-size: 48px;
  font-weight: 900;
  color: #434040;
  margin-bottom: 12px;
  background: linear-gradient(135deg, #072FA6 0%, #9E07A6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const StatLabel = styled.div`
  font-size: 18px;
  color: #434040;
  font-weight: 600;
  opacity: 0.8;
`;

const FeaturesSection = styled.section`
  padding: 100px 0;
  background: linear-gradient(135deg, #EDF6F6 0%, #FFFFFF 100%);
`;

const FeaturesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
  margin-top: 60px;
`;

const FeatureCard = styled(motion.div)`
  background: #FFFFFF;
  padding: 40px;
  border-radius: 25px;
  box-shadow: 0 10px 30px rgba(7, 47, 166, 0.1);
  border: 2px solid transparent;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 50px rgba(7, 47, 166, 0.2);
    border-color: #06B750;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #06B750 0%, #15B706 100%);
  }
`;

const FeatureIcon = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  font-size: 28px;
  color: white;
  background: linear-gradient(135deg, #06B750 0%, #15B706 100%);
  box-shadow: 0 8px 20px rgba(6, 183, 80, 0.3);
`;

const FeatureTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #434040;
  margin-bottom: 16px;
`;

const FeatureDescription = styled.p`
  font-size: 16px;
  color: #434040;
  line-height: 1.6;
  opacity: 0.8;
`;

const CTA = styled(motion.div)`
  background: linear-gradient(135deg, #072FA6 0%, #9E07A6 100%);
  padding: 80px 40px;
  border-radius: 30px;
  text-align: center;
  color: white;
  margin: 60px 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    animation: rotate 20s linear infinite;
  }

  @keyframes rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const CTATitle = styled.h2`
  font-size: 36px;
  font-weight: 800;
  margin-bottom: 20px;
  position: relative;
  z-index: 2;
`;

const CTASubtitle = styled.p`
  font-size: 18px;
  margin-bottom: 40px;
  opacity: 0.9;
  position: relative;
  z-index: 2;
`;

const CTAButton = styled(motion.button)`
  background: white;
  color: #072FA6;
  padding: 20px 40px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 18px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  box-shadow: 0 10px 30px rgba(255, 255, 255, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(255, 255, 255, 0.4);
  }
`;

const HomePage = () => {
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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <HomePageContainer>
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <HeroText>
            <Badge>
              <div className="dot"></div>
              Plateforme éducative #1 au Bénin
            </Badge>
            <motion.h1
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              L'excellence éducative<br />
              <div className="flag-text" style={{ 
                display: 'inline-flex', 
                alignItems: 'flex-end', 
                gap: '16px', 
                marginTop: '10px',
                background: 'none',
                WebkitBackgroundClip: 'initial',
                WebkitTextFillColor: 'initial',
                color: '#1e40af'
              }}>
                <span className="flag-word" style={{ 
                  position: 'relative', 
                  display: 'inline-block', 
                  color: '#1e40af', 
                  fontWeight: '900', 
                  fontSize: 'inherit',
                  background: 'none',
                  WebkitBackgroundClip: 'initial',
                  WebkitTextFillColor: 'initial'
                }}>
                  Made
                  <div style={{
                    position: 'absolute',
                    bottom: '-15px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '100%',
                    height: '15px',
                    background: 'linear-gradient(90deg, #06B750, #059669)',
                    borderRadius: '8px',
                    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.25)'
                  }}></div>
                </span>
                <span className="flag-word" style={{ 
                  position: 'relative', 
                  display: 'inline-block', 
                  color: '#1e40af', 
                  fontWeight: '900', 
                  fontSize: 'inherit',
                  background: 'none',
                  WebkitBackgroundClip: 'initial',
                  WebkitTextFillColor: 'initial'
                }}>
                  in
                  <div style={{
                    position: 'absolute',
                    bottom: '-15px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '100%',
                    height: '15px',
                    background: 'linear-gradient(90deg, #F59E0B, #D97706)',
                    borderRadius: '8px',
                    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.25)'
                  }}></div>
                </span>
                <span className="flag-word" style={{ 
                  position: 'relative', 
                  display: 'inline-block', 
                  color: '#1e40af', 
                  fontWeight: '900', 
                  fontSize: 'inherit',
                  background: 'none',
                  WebkitBackgroundClip: 'initial',
                  WebkitTextFillColor: 'initial'
                }}>
                  Bénin
                  <div style={{
                    position: 'absolute',
                    bottom: '-15px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '100%',
                    height: '15px',
                    background: 'linear-gradient(90deg, #EF4444, #DC2626)',
                    borderRadius: '8px',
                    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.25)'
                  }}></div>
                </span>
              </div>
            </motion.h1>
            <motion.p 
              className="subtitle"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Transformez votre apprentissage avec des cours interactifs, un suivi personnalisé et une communauté active
            </motion.p>
            <motion.p 
              className="description"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Rejoignez des milliers d'étudiants qui réussissent grâce à notre plateforme innovante et nos contenus adaptés au programme béninois.
            </motion.p>
            <HeroButtons>
              <PrimaryButton
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiPlay />
                Commencer maintenant
              </PrimaryButton>
              <SecondaryButton
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Voir les cours
              </SecondaryButton>
            </HeroButtons>
          </HeroText>
          <HeroImage>
            <MainImage>
              <FloatingIcon 
                className="book"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <FiBookOpen />
              </FloatingIcon>
              <FloatingIcon 
                className="graduation"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <FiAward />
              </FloatingIcon>
              <FloatingIcon 
                className="star"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity }}
              >
                <FiStar />
              </FloatingIcon>
            </MainImage>
          </HeroImage>
        </HeroContent>
      </HeroSection>

      {/* Stats Section */}
      <StatsSection>
        <StatsContainer>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Des chiffres qui parlent
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Rejoignez une communauté grandissante d'apprenants et d'enseignants passionnés
          </SectionSubtitle>
          <StatsGrid>
            <StatCard
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <StatIcon><FiBookOpen /></StatIcon>
              <StatNumber>850+</StatNumber>
              <StatLabel>Leçons interactives</StatLabel>
            </StatCard>
            <StatCard
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <StatIcon><FiAward /></StatIcon>
              <StatNumber>30+</StatNumber>
              <StatLabel>Enseignants experts</StatLabel>
            </StatCard>
            <StatCard
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <StatIcon><FiUsers /></StatIcon>
              <StatNumber>10K+</StatNumber>
              <StatLabel>Élèves actifs</StatLabel>
            </StatCard>
            <StatCard
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <StatIcon><FiTrendingUp /></StatIcon>
              <StatNumber>95%</StatNumber>
              <StatLabel>Taux de réussite</StatLabel>
            </StatCard>
          </StatsGrid>
        </StatsContainer>
      </StatsSection>

      {/* Features Section */}
      <FeaturesSection>
        <FeaturesContainer>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Pourquoi choisir EducX ?
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Une approche pédagogique innovante qui s'adapte à vos besoins d'apprentissage
          </SectionSubtitle>
          <FeaturesGrid>
            <FeatureCard
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <FeatureIcon><FiZap /></FeatureIcon>
              <FeatureTitle>Cours interactifs</FeatureTitle>
              <FeatureDescription>
                Vidéos explicatives, exercices gamifiés, auto-correction et suivi en temps réel pour un apprentissage optimal.
              </FeatureDescription>
            </FeatureCard>
            <FeatureCard
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <FeatureIcon><FiTarget /></FeatureIcon>
              <FeatureTitle>Suivi personnalisé</FeatureTitle>
              <FeatureDescription>
                Progrès adaptés, objectifs individuels et recommandations personnalisées pour maximiser votre réussite.
              </FeatureDescription>
            </FeatureCard>
            <FeatureCard
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <FeatureIcon><FiShield /></FeatureIcon>
              <FeatureTitle>Communauté active</FeatureTitle>
              <FeatureDescription>
                Échanges avec les enseignants, soutien entre pairs et projets collaboratifs pour enrichir votre expérience.
              </FeatureDescription>
            </FeatureCard>
          </FeaturesGrid>
        </FeaturesContainer>
      </FeaturesSection>

      {/* CTA Section */}
      <StatsSection>
        <StatsContainer>
          <CTA
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <CTATitle>Prêt à transformer votre apprentissage ?</CTATitle>
            <CTASubtitle>
              Rejoignez des milliers d'étudiants qui réussissent avec EducX
            </CTASubtitle>
            <CTAButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiArrowRight />
              Commencer gratuitement
            </CTAButton>
          </CTA>
        </StatsContainer>
      </StatsSection>
    </HomePageContainer>
  );
};

export default HomePage;