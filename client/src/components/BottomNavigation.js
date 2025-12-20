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
  height: 70px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  border: 1px solid rgba(255, 255, 255, 0.5);

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
  width: 50px;
  height: 50px;
  transition: all 0.3s ease;

  &.active {
    color: #667eea;
    
    .icon-container {
      transform: translateY(-2px);
    }
  }
`;

const FloatingHomeWrapper = styled.div`
  position: relative;
  top: -25px;
  width: 60px;
  height: 60px;
`;

const FloatingHomeButton = styled(NavLink)`
  width: 60px;
  height: 60px;
  border-radius: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 4px solid white;

  &.active {
    transform: scale(1.1);
    box-shadow: 0 12px 25px rgba(102, 126, 234, 0.5);
  }

  &:hover {
    transform: translateY(-5px);
  }
`;

const IconWrapper = styled(motion.div)`
  font-size: 1.4rem;
  margin-bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
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
        {location.pathname === '/classroom' && <Label initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Classe</Label>}
      </NavItem>

      {/* Messages */}
      <NavItem to="/inbox" className={({ isActive }) => isActive ? 'active' : ''}>
        <IconWrapper className="icon-container">
          <FiMail />
        </IconWrapper>
        {location.pathname === '/inbox' && <Label initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Messages</Label>}
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
        {location.pathname === '/subscription' && <Label initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Abonné</Label>}
      </NavItem>

      {/* Profil */}
      <NavItem to="/profile" className={({ isActive }) => isActive ? 'active' : ''}>
        <IconWrapper className="icon-container">
          <FiUser />
        </IconWrapper>
        {location.pathname === '/profile' && <Label initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Profil</Label>}
      </NavItem>
    </BottomNavContainer>
  );
};

export default BottomNavigation;
