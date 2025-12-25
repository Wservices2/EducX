import React from 'react';
import styled from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiBookOpen, FiMail, FiUser, FiAward } from 'react-icons/fi';

const BottomNavContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  right: 20px;
  height: 75px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(25px);
  border-radius: 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 25px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
  z-index: 1000;
  border: 1px solid rgba(255, 255, 255, 0.8);

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
  color: #9ca3af;
  position: relative;
  width: 55px;
  height: 55px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 16px;

  &.active {
    color: #667eea;
    background: rgba(102, 126, 234, 0.1);
    transform: translateY(-2px);
    
    .icon-container {
      transform: translateY(-2px);
    }
  }

  &:hover {
    color: #667eea;
    background: rgba(102, 126, 234, 0.05);
    transform: translateY(-1px);
  }
`;

const FloatingHomeWrapper = styled.div`
  position: relative;
  top: -25px;
  width: 60px;
  height: 60px;
`;

const FloatingHomeButton = styled(NavLink)`
  width: 65px;
  height: 65px;
  border-radius: 22px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 26px;
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 4px solid white;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 22px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
  }

  svg {
    position: relative;
    z-index: 1;
  }

  &.active {
    transform: scale(1.1);
    box-shadow: 0 14px 30px rgba(102, 126, 234, 0.5);
  }

  &:hover {
    transform: translateY(-6px) scale(1.05);
    box-shadow: 0 16px 35px rgba(102, 126, 234, 0.5);
  }
`;

const IconWrapper = styled(motion.div)`
  font-size: 1.5rem;
  margin-bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
`;

const Label = styled(motion.span)`
  font-size: 0.65rem;
  font-weight: 600;
  margin-top: 2px;
  position: absolute;
  bottom: -15px;
  width: 100%;
  text-align: center;
  white-space: nowrap;
  opacity: 0.8;
`;

const BottomNavigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/classroom', icon: FiBookOpen, label: 'Classe' },
    { path: '/inbox', icon: FiMail, label: 'Messages' },
    // Home is handled separately
    { path: '/subscription', icon: FiAward, label: 'Abonnement' },
    { path: '/profile', icon: FiUser, label: 'Profil' }
  ];

  return (
    <BottomNavContainer>
      {/* Classe */}
      <NavItem to="/classroom" className={({ isActive }) => isActive ? 'active' : ''}>
        <IconWrapper className="icon-container">
          <FiBookOpen />
        </IconWrapper>
        <Label>Classe</Label>
      </NavItem>

      {/* Messages */}
      <NavItem to="/inbox" className={({ isActive }) => isActive ? 'active' : ''}>
        <IconWrapper className="icon-container">
          <FiMail />
        </IconWrapper>
        <Label>Messages</Label>
      </NavItem>

      {/* CENTER FLOATING HOME BUTTON */}
      <FloatingHomeWrapper>
        <FloatingHomeButton to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
          <FiHome />
        </FloatingHomeButton>
      </FloatingHomeWrapper>

      {/* Abonnement */}
      <NavItem to="/subscription" className={({ isActive }) => isActive ? 'active' : ''}>
        <IconWrapper className="icon-container">
          <FiAward />
        </IconWrapper>
        <Label>Abonné</Label>
      </NavItem>

      {/* Profil */}
      <NavItem to="/profile" className={({ isActive }) => isActive ? 'active' : ''}>
        <IconWrapper className="icon-container">
          <FiUser />
        </IconWrapper>
        <Label>Profil</Label>
      </NavItem>
    </BottomNavContainer>
  );
};

export default BottomNavigation;
