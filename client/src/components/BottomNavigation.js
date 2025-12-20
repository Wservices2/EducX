<<<<<<< HEAD
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiMail, FiBookOpen, FiAward, FiUser } from 'react-icons/fi';

const BottomNavContainer = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, #FFFFFF 0%, #EDF6F6 100%);
  backdrop-filter: blur(30px);
  border-top: 2px solid #072FA6;
  padding: clamp(8px, 2vw, 12px) clamp(12px, 3vw, 16px) clamp(12px, 3vw, 16px);
  z-index: 1000;
  display: none;
  box-shadow: 0 -10px 40px rgba(7, 47, 166, 0.15);

  @media (max-width: 768px) {
    display: block;
  }

  @media (max-width: 480px) {
    padding: 8px 12px 12px;
  }
`;

const NavItems = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  max-width: 400px;
  margin: 0 auto;
  position: relative;
  gap: clamp(4px, 1vw, 8px);

  @media (max-width: 480px) {
    gap: 4px;
  }
`;

const NavItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(4px, 1vw, 8px);
  padding: clamp(12px, 3vw, 16px) clamp(8px, 2vw, 12px);
  border-radius: clamp(16px, 4vw, 20px);
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  min-width: clamp(60px, 15vw, 70px);
  overflow: hidden;

  @media (max-width: 480px) {
    padding: 12px 8px;
    border-radius: 16px;
    min-width: 60px;
  }

  ${props => props.$isActive && `
    background: linear-gradient(135deg, #072FA6 0%, #9E07A6 100%);
    box-shadow: 0 12px 30px rgba(7, 47, 166, 0.4);
    transform: translateY(-8px) scale(1.1);
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 100%);
      border-radius: 20px;
    }
  `}

  &:not([$isActive]):hover {
    background: linear-gradient(135deg, rgba(7, 47, 166, 0.1) 0%, rgba(158, 7, 166, 0.1) 100%);
    transform: translateY(-4px) scale(1.05);
    box-shadow: 0 8px 25px rgba(7, 47, 166, 0.2);
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: radial-gradient(circle, rgba(7, 47, 166, 0.2) 0%, transparent 70%);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.6s ease;
    pointer-events: none;
  }

  &:hover::after {
    width: 100px;
    height: 100px;
  }
`;

const IconContainer = styled(motion.div)`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: clamp(40px, 10vw, 50px);
  height: clamp(40px, 10vw, 50px);
  border-radius: clamp(12px, 3vw, 15px);
  transition: all 0.3s ease;

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    border-radius: 12px;
  }

  ${props => props.$isActive && `
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 15px rgba(255, 255, 255, 0.3);
  `}

  ${props => !props.$isActive && `
    background: linear-gradient(135deg, rgba(7, 47, 166, 0.1) 0%, rgba(158, 7, 166, 0.1) 100%);
  `}
`;

const NavIcon = styled.div`
  font-size: clamp(18px, 5vw, 24px);
  color: ${props => props.$isActive ? '#FFFFFF' : '#434040'};
  transition: all 0.3s ease;
  position: relative;

  @media (max-width: 480px) {
    font-size: 18px;
  }

  ${props => props.$isActive && `
    color: #FFFFFF;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  `}
`;

const NavLabel = styled.span`
  font-size: clamp(10px, 3vw, 12px);
  font-weight: 600;
  color: ${props => props.$isActive ? '#FFFFFF' : '#434040'};
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
  text-align: center;
  line-height: 1.2;

  @media (max-width: 480px) {
    font-size: 10px;
  }

  ${props => props.$isActive && `
    color: #FFFFFF;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  `}
`;

const NotificationBadge = styled(motion.div)`
  position: absolute;
  top: -5px;
  right: -5px;
  background: linear-gradient(135deg, #D4080C 0%, #CF6D0A 100%);
  color: white;
  font-size: 10px;
  font-weight: 700;
  padding: 3px 6px;
  border-radius: 12px;
  min-width: 18px;
  text-align: center;
  box-shadow: 0 3px 10px rgba(212, 8, 12, 0.4);
  z-index: 3;
  border: 2px solid #FFFFFF;
`;

const PulseRing = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 70px;
  height: 70px;
  border: 3px solid rgba(7, 47, 166, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
`;

const CenterAccent = styled.div`
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #072FA6 0%, #9E07A6 50%, #06B750 100%);
  border-radius: 2px;
  box-shadow: 0 2px 10px rgba(7, 47, 166, 0.3);
`;

const BottomNavigation = () => {
  const location = useLocation();

  const navItems = [
    {
      path: '/inbox',
      icon: FiMail,
      label: 'Messages',
      notifications: 5,
      color: '#D4080C'
    },
    {
      path: '/classroom',
      icon: FiBookOpen,
      label: 'Classe',
      notifications: 0,
      color: '#06B750'
    },
    {
      path: '/dashboard',
      icon: FiHome,
      label: 'Accueil',
      notifications: 0,
      color: '#072FA6',
      isCenter: true
    },
    {
      path: '/subscription',
      icon: FiAward,
      label: 'Abonnement',
      notifications: 0,
      color: '#9E07A6'
    },
    {
      path: '/profile',
      icon: FiUser,
      label: 'Profil',
      notifications: 0,
      color: '#434040'
    }
  ];

  const containerVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.3, 1],
      opacity: [0.3, 0.1, 0.3],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <BottomNavContainer
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <CenterAccent />
      <NavItems>
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          
          return (
            <NavItem
              key={item.path}
              to={item.path}
              $isActive={isActive}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                transform: item.isCenter && isActive ? 'translateY(-12px) scale(1.15)' : 
                          item.isCenter ? 'translateY(-4px) scale(1.05)' : 
                          isActive ? 'translateY(-8px) scale(1.1)' : 'none'
              }}
            >
              <IconContainer $isActive={isActive}>
                <NavIcon $isActive={isActive}>
                  <item.icon />
                </NavIcon>
                {item.notifications > 0 && (
                  <NotificationBadge
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {item.notifications}
                  </NotificationBadge>
                )}
                {isActive && (
                  <PulseRing
                    variants={pulseVariants}
                    animate="animate"
                  />
                )}
              </IconContainer>
              <NavLabel $isActive={isActive}>
                {item.label}
              </NavLabel>
            </NavItem>
          );
        })}
      </NavItems>
    </BottomNavContainer>
  );
};

=======
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiMail, FiBookOpen, FiAward, FiUser } from 'react-icons/fi';

const BottomNavContainer = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, #FFFFFF 0%, #EDF6F6 100%);
  backdrop-filter: blur(30px);
  border-top: 2px solid #072FA6;
  padding: clamp(8px, 2vw, 12px) clamp(12px, 3vw, 16px) clamp(12px, 3vw, 16px);
  z-index: 1000;
  display: none;
  box-shadow: 0 -10px 40px rgba(7, 47, 166, 0.15);

  @media (max-width: 768px) {
    display: block;
  }

  @media (max-width: 480px) {
    padding: 8px 12px 12px;
  }
`;

const NavItems = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  max-width: 400px;
  margin: 0 auto;
  position: relative;
  gap: clamp(4px, 1vw, 8px);

  @media (max-width: 480px) {
    gap: 4px;
  }
`;

const NavItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(4px, 1vw, 8px);
  padding: clamp(12px, 3vw, 16px) clamp(8px, 2vw, 12px);
  border-radius: clamp(16px, 4vw, 20px);
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  min-width: clamp(60px, 15vw, 70px);
  overflow: hidden;

  @media (max-width: 480px) {
    padding: 12px 8px;
    border-radius: 16px;
    min-width: 60px;
  }

  ${props => props.$isActive && `
    background: linear-gradient(135deg, #072FA6 0%, #9E07A6 100%);
    box-shadow: 0 12px 30px rgba(7, 47, 166, 0.4);
    transform: translateY(-8px) scale(1.1);
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 100%);
      border-radius: 20px;
    }
  `}

  &:not([$isActive]):hover {
    background: linear-gradient(135deg, rgba(7, 47, 166, 0.1) 0%, rgba(158, 7, 166, 0.1) 100%);
    transform: translateY(-4px) scale(1.05);
    box-shadow: 0 8px 25px rgba(7, 47, 166, 0.2);
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: radial-gradient(circle, rgba(7, 47, 166, 0.2) 0%, transparent 70%);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.6s ease;
    pointer-events: none;
  }

  &:hover::after {
    width: 100px;
    height: 100px;
  }
`;

const IconContainer = styled(motion.div)`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: clamp(40px, 10vw, 50px);
  height: clamp(40px, 10vw, 50px);
  border-radius: clamp(12px, 3vw, 15px);
  transition: all 0.3s ease;

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    border-radius: 12px;
  }

  ${props => props.$isActive && `
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 15px rgba(255, 255, 255, 0.3);
  `}

  ${props => !props.$isActive && `
    background: linear-gradient(135deg, rgba(7, 47, 166, 0.1) 0%, rgba(158, 7, 166, 0.1) 100%);
  `}
`;

const NavIcon = styled.div`
  font-size: clamp(18px, 5vw, 24px);
  color: ${props => props.$isActive ? '#FFFFFF' : '#434040'};
  transition: all 0.3s ease;
  position: relative;

  @media (max-width: 480px) {
    font-size: 18px;
  }

  ${props => props.$isActive && `
    color: #FFFFFF;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  `}
`;

const NavLabel = styled.span`
  font-size: clamp(10px, 3vw, 12px);
  font-weight: 600;
  color: ${props => props.$isActive ? '#FFFFFF' : '#434040'};
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
  text-align: center;
  line-height: 1.2;

  @media (max-width: 480px) {
    font-size: 10px;
  }

  ${props => props.$isActive && `
    color: #FFFFFF;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  `}
`;

const NotificationBadge = styled(motion.div)`
  position: absolute;
  top: -5px;
  right: -5px;
  background: linear-gradient(135deg, #D4080C 0%, #CF6D0A 100%);
  color: white;
  font-size: 10px;
  font-weight: 700;
  padding: 3px 6px;
  border-radius: 12px;
  min-width: 18px;
  text-align: center;
  box-shadow: 0 3px 10px rgba(212, 8, 12, 0.4);
  z-index: 3;
  border: 2px solid #FFFFFF;
`;

const PulseRing = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 70px;
  height: 70px;
  border: 3px solid rgba(7, 47, 166, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
`;

const CenterAccent = styled.div`
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #072FA6 0%, #9E07A6 50%, #06B750 100%);
  border-radius: 2px;
  box-shadow: 0 2px 10px rgba(7, 47, 166, 0.3);
`;

const BottomNavigation = () => {
  const location = useLocation();

  const navItems = [
    {
      path: '/inbox',
      icon: FiMail,
      label: 'Messages',
      notifications: 5,
      color: '#D4080C'
    },
    {
      path: '/classroom',
      icon: FiBookOpen,
      label: 'Classe',
      notifications: 0,
      color: '#06B750'
    },
    {
      path: '/dashboard',
      icon: FiHome,
      label: 'Accueil',
      notifications: 0,
      color: '#072FA6',
      isCenter: true
    },
    {
      path: '/subscription',
      icon: FiAward,
      label: 'Abonnement',
      notifications: 0,
      color: '#9E07A6'
    },
    {
      path: '/profile',
      icon: FiUser,
      label: 'Profil',
      notifications: 0,
      color: '#434040'
    }
  ];

  const containerVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.3, 1],
      opacity: [0.3, 0.1, 0.3],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <BottomNavContainer
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <CenterAccent />
      <NavItems>
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          
          return (
            <NavItem
              key={item.path}
              to={item.path}
              $isActive={isActive}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                transform: item.isCenter && isActive ? 'translateY(-12px) scale(1.15)' : 
                          item.isCenter ? 'translateY(-4px) scale(1.05)' : 
                          isActive ? 'translateY(-8px) scale(1.1)' : 'none'
              }}
            >
              <IconContainer $isActive={isActive}>
                <NavIcon $isActive={isActive}>
                  <item.icon />
                </NavIcon>
                {item.notifications > 0 && (
                  <NotificationBadge
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {item.notifications}
                  </NotificationBadge>
                )}
                {isActive && (
                  <PulseRing
                    variants={pulseVariants}
                    animate="animate"
                  />
                )}
              </IconContainer>
              <NavLabel $isActive={isActive}>
                {item.label}
              </NavLabel>
            </NavItem>
          );
        })}
      </NavItems>
    </BottomNavContainer>
  );
};

>>>>>>> 37b56642f1115aa25f6067ac55742b8556b69362
export default BottomNavigation;