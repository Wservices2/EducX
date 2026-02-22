import React from 'react';
import styled from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiBookOpen, FiMail, FiUser, FiAward } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';

const BottomNavContainer = styled(motion.div)`
  position: fixed;
  bottom: calc(12px + env(safe-area-inset-bottom, 0px));
  left: 12px;
  right: 12px;
  height: 82px;
  background: ${({ theme }) =>
    theme.mode === 'dark'
      ? 'linear-gradient(135deg, rgba(30, 58, 138, 0.78) 0%, rgba(17, 24, 39, 0.9) 100%)'
      : 'linear-gradient(135deg, rgba(239, 246, 255, 0.96) 0%, rgba(236, 253, 245, 0.95) 100%)'};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  box-shadow: ${({ theme }) =>
    theme.mode === 'dark'
      ? '0 14px 34px rgba(0, 0, 0, 0.45)'
      : '0 14px 34px rgba(30, 64, 175, 0.2)'};
  z-index: 1000;
  border: 1px solid ${({ theme }) =>
    theme.mode === 'dark' ? 'rgba(96, 165, 250, 0.3)' : 'rgba(59, 130, 246, 0.25)'};
  max-width: 620px;
  margin: 0 auto;
  transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;

  @media (min-width: 769px) {
    display: none;
  }

  @media (max-width: 380px) {
    height: 78px;
    left: 8px;
    right: 8px;
    border-radius: 24px;
  }
`;

const NavItem = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: ${({ theme }) => theme.mode === 'dark' ? '#cbd5e1' : '#475569'};
  position: relative;
  flex: 1 1 0;
  min-width: 62px;
  height: 64px;
  border-radius: 18px;
  transition: all 0.25s ease;
  overflow: hidden;
  padding-top: 2px;

  &.active {
    color: ${({ theme }) => theme.mode === 'dark' ? '#bfdbfe' : '#1e3a8a'};
    background: ${({ theme }) =>
      theme.mode === 'dark' ? 'rgba(30, 64, 175, 0.28)' : 'rgba(191, 219, 254, 0.65)'};
  }

  &:hover {
    color: ${({ theme }) => theme.mode === 'dark' ? '#dbeafe' : '#1d4ed8'};
  }
`;

const FloatingHomeWrapper = styled.div`
  position: relative;
  width: 84px;
  height: 84px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -42px;
  flex-shrink: 0;
`;

const FloatingHomeButton = styled(NavLink)`
  width: 66px;
  height: 66px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 45%, #0f766e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 28px;
  box-shadow: 0 14px 26px rgba(29, 78, 216, 0.45);
  position: relative;
  z-index: 10;
  border: 4px solid ${({ theme }) => theme.mode === 'dark' ? '#111827' : '#ffffff'};
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.3s ease;

  &:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 16px 30px rgba(29, 78, 216, 0.56);
  }

  &.active {
    transform: translateY(-2px);
    box-shadow: 0 16px 30px rgba(15, 118, 110, 0.45);
    border-color: ${({ theme }) => theme.mode === 'dark' ? '#374151' : '#ffffff'};
  }
`;

const IconWrapper = styled(motion.div)`
  font-size: 1.35rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  margin-bottom: 3px;
`;

const Label = styled(motion.span)`
  font-size: clamp(10px, 2.4vw, 12px);
  font-weight: 700;
  text-align: center;
  letter-spacing: 0.01em;
  opacity: 0.8;
`;

const ActiveDot = styled(motion.div)`
  width: 22px;
  height: 3px;
  background: ${({ theme }) => theme.mode === 'dark' ? '#93c5fd' : '#2563eb'};
  border-radius: 999px;
  margin-top: 6px;
  position: absolute;
  bottom: 6px;
`;

const BottomNavigation = () => {
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { path: '/classroom', icon: FiBookOpen, label: t('nav_class') },
    { path: '/inbox', icon: FiMail, label: t('nav_chat') },
    { path: '/dashboard', icon: FiHome, label: t('nav_home'), isMain: true },
    { path: '/subscription', icon: FiAward, label: t('nav_subscription') },
    { path: '/profile', icon: FiUser, label: t('nav_profile') }
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
