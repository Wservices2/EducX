import React from 'react';
import styled from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiBookOpen, FiMail, FiUser, FiAward } from 'react-icons/fi';

const BottomNavContainer = styled(motion.div)`
  position: fixed;
  bottom: 24px;
  left: 20px;
  right: 20px;
  height: 72px;
  background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(31, 41, 55, 0.9)' : 'rgba(255, 255, 255, 0.9)'};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  border: 1px solid ${({ theme }) => theme.colors.border};
  max-width: 480px;
  margin: 0 auto;
  transition: background 0.3s ease, border-color 0.3s ease;

  @media (min-width: 769px) {
    display: none;
  }
`;

const NavItem = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  transition: all 0.3s ease;
  overflow: hidden;

  &.active {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const FloatingHomeWrapper = styled.div`
  position: relative;
  width: 72px;
  height: 72px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -40px; /* Floats above */
  flex-shrink: 0;
`;

const FloatingHomeButton = styled(NavLink)`
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.headerGradient};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 26px;
  box-shadow: 0 12px 25px rgba(79, 70, 229, 0.5);
  position: relative;
  z-index: 10;
  border: 4px solid ${({ theme }) => theme.mode === 'dark' ? '#1f2937' : '#ffffff'};
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.3s ease;

  &:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 15px 30px rgba(79, 70, 229, 0.6);
  }

  &.active {
    transform: translateY(-2px);
    box-shadow: 0 15px 30px rgba(79, 70, 229, 0.6);
    border-color: ${({ theme }) => theme.mode === 'dark' ? '#374151' : '#ffffff'};
  }
`;

const IconWrapper = styled(motion.div)`
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  margin-bottom: 2px;
`;

const Label = styled(motion.span)`
  font-size: 10px;
  font-weight: 600;
  text-align: center;
  opacity: 0.7;
`;

const ActiveDot = styled(motion.div)`
  width: 4px;
  height: 4px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  margin-top: 4px;
  position: absolute;
  bottom: 8px;
`;

const BottomNavigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/classroom', icon: FiBookOpen, label: 'Classe' },
    { path: '/inbox', icon: FiMail, label: 'Chat' },
    { path: '/dashboard', icon: FiHome, label: 'Home', isMain: true },
    { path: '/subscription', icon: FiAward, label: 'Pro' },
    { path: '/profile', icon: FiUser, label: 'Profil' }
  ];

  return (
    <BottomNavContainer
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
    >
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;

        if (item.isMain) {
          return (
            <FloatingHomeWrapper key={item.path}>
              <FloatingHomeButton
                to={item.path}
                className={isActive ? 'active' : ''}
              >
                <item.icon />
              </FloatingHomeButton>
            </FloatingHomeWrapper>
          );
        }

        return (
          <NavItem
            key={item.path}
            to={item.path}
            className={isActive ? 'active' : ''}
          >
            <IconWrapper
              animate={{
                y: isActive ? -2 : 0,
                scale: isActive ? 1.1 : 1,
                // Color is handled by styled-component but we can override for animation if needed
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <item.icon />
            </IconWrapper>
            <Label
              animate={{
                opacity: isActive ? 1 : 0.5,
                fontWeight: isActive ? 600 : 500,
                // Color is handled by parent color prop inheriting
              }}
            >
              {item.label}
            </Label>
            {isActive && (
              <ActiveDot
                layoutId="activeDot"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </NavItem>
        );
      })}
    </BottomNavContainer>
  );
};

export default BottomNavigation;
