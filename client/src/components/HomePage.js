import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiPlay, FiArrowRight, FiBookOpen, FiAward, FiUsers, FiTarget, FiStar, FiZap, FiShield, FiTrendingUp, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

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
  padding: 20px 0;

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

  @media (max-width: 480px) {
    min-height: 90vh;
    padding: 15px 0;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  position: relative;
  z-index: 2;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }

  @media (max-width: 480px) {
    padding: 0 15px;
    gap: 30px;
  }
`;

const HeroText = styled.div`
  h1 {
    font-size: clamp(36px, 8vw, 64px);
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
      gap: clamp(8px, 2vw, 16px);
      flex-wrap: wrap;
      justify-content: center;
      
      .flag-word {
        color: #1e40af;
        position: relative;
        z-index: 2;
        font-weight: 900;
        display: inline-block;
        text-align: center;
        font-size: clamp(28px, 6vw, 48px);
        
        &::after {
          content: '';
          position: absolute;
          bottom: -12px;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          height: 12px;
          border-radius: 6px;
          box-shadow: 0 3px 15px rgba(0, 0, 0, 0.2);
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
  }

  .subtitle {
    font-size: clamp(18px, 4vw, 24px);
    color: #434040;
    margin-bottom: 28px;
    line-height: 1.6;
    font-weight: 500;
  }

  .description {
    font-size: clamp(16px, 3.5vw, 18px);
    color: #434040;
    margin-bottom: 36px;
    line-height: 1.7;
    opacity: 0.8;
  }

  @media (max-width: 480px) {
    .subtitle {
      margin-bottom: 24px;
    }

    .description {
      margin-bottom: 28px;
    }
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
  font-size: clamp(14px, 3vw, 16px);
  font-weight: 700;
  margin-bottom: 28px;
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

  @media (max-width: 480px) {
    padding: 10px 20px;
    margin-bottom: 24px;
  }
`;

const HeroButtons = styled.div`
  display: flex;
  gap: clamp(16px, 4vw, 24px);
  flex-wrap: wrap;
  justify-content: flex-start;

  @media (max-width: 968px) {
    justify-content: center;
  }

  @media (max-width: 480px) {
    gap: 16px;
    flex-direction: column;
    align-items: center;
  }
`;

const PrimaryButton = styled(motion.button)`
  background: linear-gradient(135deg, #072FA6 0%, #9E07A6 100%);
  color: white;
  padding: clamp(16px, 4vw, 20px) clamp(32px, 6vw, 40px);
  border-radius: 50px;
  font-weight: 700;
  font-size: clamp(16px, 3.5vw, 18px);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 10px 30px rgba(7, 47, 166, 0.3);
  position: relative;
  overflow: hidden;
  animation: blink 2s infinite;

  @keyframes blink {
    0%, 50%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    25%, 75% {
      opacity: 0.8;
      transform: scale(1.02);
    }
  }

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
    animation: none;
  }

  @media (max-width: 480px) {
    width: 100%;
    max-width: 280px;
    justify-content: center;
  }
`;

const SecondaryButton = styled(motion.button)`
  background: transparent;
  color: #072FA6;
  padding: clamp(16px, 4vw, 20px) clamp(32px, 6vw, 40px);
  border-radius: 50px;
  font-weight: 700;
  font-size: clamp(16px, 3.5vw, 18px);
  border: 3px solid #072FA6;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #072FA6;
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(7, 47, 166, 0.3);
  }

  @media (max-width: 480px) {
    width: 100%;
    max-width: 280px;
    justify-content: center;
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
  height: clamp(300px, 60vw, 500px);
  background: linear-gradient(135deg, #072FA6 0%, #9E07A6 50%, #06B750 100%);
  border-radius: 30px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(7, 47, 166, 0.2);

  @media (max-width: 480px) {
    max-width: 100%;
    height: 280px;
  }
`;

const SlideImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url('${props => props.image}');
  background-size: cover;
  background-position: center;
  border-radius: 30px;
  opacity: 0.9;
  transition: opacity 0.5s ease-in-out;
`;

const SlideControls = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 15px;
  z-index: 10;
`;

const SlideButton = styled(motion.button)`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #072FA6;
  font-size: 18px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background: white;
    transform: scale(1.1);
  }

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }
`;

const SlideIndicators = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10;
`;

const Indicator = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.5)'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: white;
    transform: scale(1.2);
  }
`;

const FloatingIcon = styled(motion.div)`
  position: absolute;
  width: clamp(40px, 8vw, 60px);
  height: clamp(40px, 8vw, 60px);
  background: white;
  border-radius: clamp(12px, 3vw, 20px);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  color: #072FA6;
  font-size: clamp(18px, 4vw, 24px);
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

  @media (max-width: 480px) {
    &.book {
      bottom: 20px;
      left: 20px;
    }

    &.graduation {
      top: 20px;
      right: 20px;
    }

    &.star {
      left: -20px;
    }
  }
`;

const StatsSection = styled.section`
  padding: clamp(60px, 12vw, 100px) 0;
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

  @media (max-width: 480px) {
    padding: 40px 0;
  }
`;

const StatsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(15px, 4vw, 20px);
  text-align: center;
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(32px, 6vw, 48px);
  font-weight: 800;
  color: #434040;
  margin-bottom: 20px;
`;

const SectionSubtitle = styled(motion.p)`
  font-size: clamp(18px, 4vw, 20px);
  color: #434040;
  margin-bottom: clamp(40px, 8vw, 80px);
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0.8;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
  gap: clamp(24px, 5vw, 40px);

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const StatCard = styled(motion.div)`
  background: #FFFFFF;
  padding: clamp(30px, 6vw, 50px) clamp(20px, 4vw, 30px);
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

  @media (max-width: 480px) {
    padding: 25px 20px;
  }
`;

const StatIcon = styled.div`
  width: clamp(60px, 12vw, 80px);
  height: clamp(60px, 12vw, 80px);
  border-radius: clamp(16px, 3vw, 20px);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto clamp(16px, 4vw, 24px);
  font-size: clamp(24px, 5vw, 32px);
  color: white;
  background: linear-gradient(135deg, #072FA6 0%, #9E07A6 100%);
  box-shadow: 0 10px 25px rgba(7, 47, 166, 0.3);
`;

const StatNumber = styled.div`
  font-size: clamp(36px, 8vw, 48px);
  font-weight: 900;
  color: #434040;
  margin-bottom: 12px;
  background: linear-gradient(135deg, #072FA6 0%, #9E07A6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const StatLabel = styled.div`
  font-size: clamp(16px, 3.5vw, 18px);
  color: #434040;
  font-weight: 600;
  opacity: 0.8;
`;

const FeaturesSection = styled.section`
  padding: clamp(60px, 12vw, 100px) 0;
  background: linear-gradient(135deg, #EDF6F6 0%, #FFFFFF 100%);

  @media (max-width: 480px) {
    padding: 40px 0;
  }
`;

const FeaturesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(15px, 4vw, 20px);
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(320px, 100%), 1fr));
  gap: clamp(24px, 5vw, 40px);
  margin-top: clamp(40px, 8vw, 60px);

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 20px;
    margin-top: 30px;
  }
`;

const FeatureCard = styled(motion.div)`
  background: #FFFFFF;
  padding: clamp(30px, 6vw, 40px);
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

  @media (max-width: 480px) {
    padding: 25px 20px;
  }
`;

const FeatureIcon = styled.div`
  width: clamp(50px, 10vw, 70px);
  height: clamp(50px, 10vw, 70px);
  border-radius: clamp(14px, 3vw, 18px);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: clamp(16px, 4vw, 24px);
  font-size: clamp(20px, 4.5vw, 28px);
  color: white;
  background: linear-gradient(135deg, #06B750 0%, #15B706 100%);
  box-shadow: 0 8px 20px rgba(6, 183, 80, 0.3);
`;

const FeatureTitle = styled.h3`
  font-size: clamp(20px, 4.5vw, 24px);
  font-weight: 700;
  color: #434040;
  margin-bottom: 16px;
`;

const FeatureDescription = styled.p`
  font-size: clamp(15px, 3.5vw, 16px);
  color: #434040;
  line-height: 1.6;
  opacity: 0.8;
`;

const CTA = styled(motion.div)`
  background: linear-gradient(135deg, #072FA6 0%, #9E07A6 100%);
  padding: clamp(40px, 8vw, 80px) clamp(20px, 4vw, 40px);
  border-radius: 30px;
  text-align: center;
  color: white;
  margin: clamp(30px, 6vw, 60px) 0;
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

  @media (max-width: 480px) {
    padding: 30px 20px;
    margin: 30px 0;
  }
`;

const CTATitle = styled.h2`
  font-size: clamp(28px, 6vw, 36px);
  font-weight: 800;
  margin-bottom: 20px;
  position: relative;
  z-index: 2;
`;

const CTASubtitle = styled.p`
  font-size: clamp(16px, 3.5vw, 18px);
  margin-bottom: clamp(30px, 6vw, 40px);
  opacity: 0.9;
  position: relative;
  z-index: 2;
`;

const CTAButton = styled(motion.button)`
  background: white;
  color: #072FA6;
  padding: clamp(16px, 4vw, 20px) clamp(32px, 6vw, 40px);
  border-radius: 50px;
  font-weight: 700;
  font-size: clamp(16px, 3.5vw, 18px);
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

  @media (max-width: 480px) {
    width: 100%;
    max-width: 280px;
    justify-content: center;
  }
`;

const HomePage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slideshowImages = [
    'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1000&h=750&dpr=2',
    'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1000&h=750&dpr=2',
    'https://images.pexels.com/photos/814124/pexels-photo-814124.jpeg?auto=compress&cs=tinysrgb&w=1000&h=750&dpr=2',
    'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1000&h=750&dpr=2',
    'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1000&h=750&dpr=2'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [slideshowImages.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slideshowImages.length) % slideshowImages.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const handleCommencer = () => {
    navigate('/register');
  };

  const handleVoirCours = () => {
    navigate('/login');
  };

  const handleCommencerGratuitement = () => {
    navigate('/register');
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
                onClick={handleCommencer}
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
                onClick={handleVoirCours}
              >
                Voir les cours
              </SecondaryButton>
            </HeroButtons>
          </HeroText>
          <HeroImage>
            <MainImage>
              <SlideImage image={slideshowImages[currentSlide]} />
              <SlideControls>
                <SlideButton
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={goToPrevious}
                >
                  <FiChevronLeft />
                </SlideButton>
                <SlideButton
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={goToNext}
                >
                  <FiChevronRight />
                </SlideButton>
              </SlideControls>
              <SlideIndicators>
                {slideshowImages.map((_, index) => (
                  <Indicator
                    key={index}
                    active={index === currentSlide}
                    onClick={() => goToSlide(index)}
                  />
                ))}
              </SlideIndicators>
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
              onClick={handleCommencerGratuitement}
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

=======
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiPlay, FiArrowRight, FiBookOpen, FiAward, FiUsers, FiTarget, FiStar, FiZap, FiShield, FiTrendingUp, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

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
  padding: 20px 0;

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

  @media (max-width: 480px) {
    min-height: 90vh;
    padding: 15px 0;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  position: relative;
  z-index: 2;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }

  @media (max-width: 480px) {
    padding: 0 15px;
    gap: 30px;
  }
`;

const HeroText = styled.div`
  h1 {
    font-size: clamp(36px, 8vw, 64px);
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
      gap: clamp(8px, 2vw, 16px);
      flex-wrap: wrap;
      justify-content: center;

      .flag-word {
        color: #1e40af;
        position: relative;
        z-index: 2;
        font-weight: 900;
        display: inline-block;
        text-align: center;
        font-size: clamp(28px, 6vw, 48px);

        &::after {
          content: '';
          position: absolute;
          bottom: -12px;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          height: 12px;
          border-radius: 6px;
          box-shadow: 0 3px 15px rgba(0, 0, 0, 0.2);
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
  }

  .subtitle {
    font-size: clamp(18px, 4vw, 24px);
    color: #434040;
    margin-bottom: 28px;
    line-height: 1.6;
    font-weight: 500;
  }

  .description {
    font-size: clamp(16px, 3.5vw, 18px);
    color: #434040;
    margin-bottom: 36px;
    line-height: 1.7;
    opacity: 0.8;
  }

  @media (max-width: 480px) {
    .subtitle {
      margin-bottom: 24px;
    }

    .description {
      margin-bottom: 28px;
    }
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
  font-size: clamp(14px, 3vw, 16px);
  font-weight: 700;
  margin-bottom: 28px;
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

  @media (max-width: 480px) {
    padding: 10px 20px;
    margin-bottom: 24px;
  }
`;

const HeroButtons = styled.div`
  display: flex;
  gap: clamp(16px, 4vw, 24px);
  flex-wrap: wrap;
  justify-content: flex-start;

  @media (max-width: 968px) {
    justify-content: center;
  }

  @media (max-width: 480px) {
    gap: 16px;
    flex-direction: column;
    align-items: center;
  }
`;

const PrimaryButton = styled(motion.button)`
  background: linear-gradient(135deg, #072FA6 0%, #9E07A6 100%);
  color: white;
  padding: clamp(16px, 4vw, 20px) clamp(32px, 6vw, 40px);
  border-radius: 50px;
  font-weight: 700;
  font-size: clamp(16px, 3.5vw, 18px);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 10px 30px rgba(7, 47, 166, 0.3);
  position: relative;
  overflow: hidden;
  animation: blink 2s infinite;

  @keyframes blink {
    0%, 50%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    25%, 75% {
      opacity: 0.8;
      transform: scale(1.02);
    }
  }

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
    animation: none;
  }

  @media (max-width: 480px) {
    width: 100%;
    max-width: 280px;
    justify-content: center;
  }
`;

const SecondaryButton = styled(motion.button)`
  background: transparent;
  color: #072FA6;
  padding: clamp(16px, 4vw, 20px) clamp(32px, 6vw, 40px);
  border-radius: 50px;
  font-weight: 700;
  font-size: clamp(16px, 3.5vw, 18px);
  border: 3px solid #072FA6;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #072FA6;
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(7, 47, 166, 0.3);
  }

  @media (max-width: 480px) {
    width: 100%;
    max-width: 280px;
    justify-content: center;
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
  height: clamp(300px, 60vw, 500px);
  background: linear-gradient(135deg, #072FA6 0%, #9E07A6 50%, #06B750 100%);
  border-radius: 30px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(7, 47, 166, 0.2);

  @media (max-width: 480px) {
    max-width: 100%;
    height: 280px;
  }
`;

const SlideImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url('${props => props.image}');
  background-size: cover;
  background-position: center;
  border-radius: 30px;
  opacity: 0.9;
  transition: opacity 0.5s ease-in-out;
`;

const SlideControls = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 15px;
  z-index: 10;
`;

const SlideButton = styled(motion.button)`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #072FA6;
  font-size: 18px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background: white;
    transform: scale(1.1);
  }

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }
`;

const SlideIndicators = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10;
`;

const Indicator = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.5)'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: white;
    transform: scale(1.2);
  }
`;

const FloatingIcon = styled(motion.div)`
  position: absolute;
  width: clamp(40px, 8vw, 60px);
  height: clamp(40px, 8vw, 60px);
  background: white;
  border-radius: clamp(12px, 3vw, 20px);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  color: #072FA6;
  font-size: clamp(18px, 4vw, 24px);
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

  @media (max-width: 480px) {
    &.book {
      bottom: 20px;
      left: 20px;
    }

    &.graduation {
      top: 20px;
      right: 20px;
    }

    &.star {
      left: -20px;
    }
  }
`;

const StatsSection = styled.section`
  padding: clamp(60px, 12vw, 100px) 0;
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

  @media (max-width: 480px) {
    padding: 40px 0;
  }
`;

const StatsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(15px, 4vw, 20px);
  text-align: center;
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(32px, 6vw, 48px);
  font-weight: 800;
  color: #434040;
  margin-bottom: 20px;
`;

const SectionSubtitle = styled(motion.p)`
  font-size: clamp(18px, 4vw, 20px);
  color: #434040;
  margin-bottom: clamp(40px, 8vw, 80px);
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0.8;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
  gap: clamp(24px, 5vw, 40px);

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const StatCard = styled(motion.div)`
  background: #FFFFFF;
  padding: clamp(30px, 6vw, 50px) clamp(20px, 4vw, 30px);
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

  @media (max-width: 480px) {
    padding: 25px 20px;
  }
`;

const StatIcon = styled.div`
  width: clamp(60px, 12vw, 80px);
  height: clamp(60px, 12vw, 80px);
  border-radius: clamp(16px, 3vw, 20px);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto clamp(16px, 4vw, 24px);
  font-size: clamp(24px, 5vw, 32px);
  color: white;
  background: linear-gradient(135deg, #072FA6 0%, #9E07A6 100%);
  box-shadow: 0 10px 25px rgba(7, 47, 166, 0.3);
`;

const StatNumber = styled.div`
  font-size: clamp(36px, 8vw, 48px);
  font-weight: 900;
  color: #434040;
  margin-bottom: 12px;
  background: linear-gradient(135deg, #072FA6 0%, #9E07A6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const StatLabel = styled.div`
  font-size: clamp(16px, 3.5vw, 18px);
  color: #434040;
  font-weight: 600;
  opacity: 0.8;
`;

const FeaturesSection = styled.section`
  padding: clamp(60px, 12vw, 100px) 0;
  background: linear-gradient(135deg, #EDF6F6 0%, #FFFFFF 100%);

  @media (max-width: 480px) {
    padding: 40px 0;
  }
`;

const FeaturesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(15px, 4vw, 20px);
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(320px, 100%), 1fr));
  gap: clamp(24px, 5vw, 40px);
  margin-top: clamp(40px, 8vw, 60px);

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 20px;
    margin-top: 30px;
  }
`;

const FeatureCard = styled(motion.div)`
  background: #FFFFFF;
  padding: clamp(30px, 6vw, 40px);
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

  @media (max-width: 480px) {
    padding: 25px 20px;
  }
`;

const FeatureIcon = styled.div`
  width: clamp(50px, 10vw, 70px);
  height: clamp(50px, 10vw, 70px);
  border-radius: clamp(14px, 3vw, 18px);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: clamp(16px, 4vw, 24px);
  font-size: clamp(20px, 4.5vw, 28px);
  color: white;
  background: linear-gradient(135deg, #06B750 0%, #15B706 100%);
  box-shadow: 0 8px 20px rgba(6, 183, 80, 0.3);
`;

const FeatureTitle = styled.h3`
  font-size: clamp(20px, 4.5vw, 24px);
  font-weight: 700;
  color: #434040;
  margin-bottom: 16px;
`;

const FeatureDescription = styled.p`
  font-size: clamp(15px, 3.5vw, 16px);
  color: #434040;
  line-height: 1.6;
  opacity: 0.8;
`;

const CTA = styled(motion.div)`
  background: linear-gradient(135deg, #072FA6 0%, #9E07A6 100%);
  padding: clamp(40px, 8vw, 80px) clamp(20px, 4vw, 40px);
  border-radius: 30px;
  text-align: center;
  color: white;
  margin: clamp(30px, 6vw, 60px) 0;
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

  @media (max-width: 480px) {
    padding: 30px 20px;
    margin: 30px 0;
  }
`;

const CTATitle = styled.h2`
  font-size: clamp(28px, 6vw, 36px);
  font-weight: 800;
  margin-bottom: 20px;
  position: relative;
  z-index: 2;
`;

const CTASubtitle = styled.p`
  font-size: clamp(16px, 3.5vw, 18px);
  margin-bottom: clamp(30px, 6vw, 40px);
  opacity: 0.9;
  position: relative;
  z-index: 2;
`;

const CTAButton = styled(motion.button)`
  background: white;
  color: #072FA6;
  padding: clamp(16px, 4vw, 20px) clamp(32px, 6vw, 40px);
  border-radius: 50px;
  font-weight: 700;
  font-size: clamp(16px, 3.5vw, 18px);
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

  @media (max-width: 480px) {
    width: 100%;
    max-width: 280px;
    justify-content: center;
  }
`;

const HomePage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slideshowImages = [
    'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1000&h=750&dpr=2',
    'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1000&h=750&dpr=2',
    'https://images.pexels.com/photos/814124/pexels-photo-814124.jpeg?auto=compress&cs=tinysrgb&w=1000&h=750&dpr=2',
    'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1000&h=750&dpr=2',
    'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1000&h=750&dpr=2'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [slideshowImages.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slideshowImages.length) % slideshowImages.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const handleCommencer = () => {
    navigate('/register');
  };

  const handleVoirCours = () => {
    navigate('/login');
  };

  const handleCommencerGratuitement = () => {
    navigate('/register');
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
                onClick={handleCommencer}
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
                onClick={handleVoirCours}
              >
                Voir les cours
              </SecondaryButton>
            </HeroButtons>
          </HeroText>
          <HeroImage>
            <MainImage>
              <SlideImage image={slideshowImages[currentSlide]} />
              <SlideControls>
                <SlideButton
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={goToPrevious}
                >
                  <FiChevronLeft />
                </SlideButton>
                <SlideButton
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={goToNext}
                >
                  <FiChevronRight />
                </SlideButton>
              </SlideControls>
              <SlideIndicators>
                {slideshowImages.map((_, index) => (
                  <Indicator
                    key={index}
                    active={index === currentSlide}
                    onClick={() => goToSlide(index)}
                  />
                ))}
              </SlideIndicators>
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
              onClick={handleCommencerGratuitement}
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

>>>>>>> 37b56642f1115aa25f6067ac55742b8556b69362
export default HomePage;