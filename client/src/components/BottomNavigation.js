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
  height: 80px;
  background: #F9FAFB;
  backdrop-filter: blur(20px);
  border-radius: 20px 20px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 25px 20px;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.08);
  z-index: 1000;
  border: 1px solid rgba(255, 255, 255, 0.6);

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
  width: 60px;
  height: 60px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 12px;

  &.active {
    color: #5B5FEF;
    
    .icon-container {
      transform: scale(1.05);
    }
    
    .label {
      color: #1f2937;
      font-weight: 600;
    }
  }

  &:hover {
    color: #5B5FEF;
  }
`;

const FloatingHomeWrapper = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
`;

const FloatingHomeButton = styled(NavLink)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(91, 95, 239, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #5B5FEF;
  font-size: 22px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  &.active {
    background: rgba(91, 95, 239, 0.15);
    transform: scale(1.05);
    
    &::before {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #5B5FEF;
    }
  }

  &:hover {
    background: rgba(91, 95, 239, 0.12);
    transform: scale(1.02);
  }
`;

const IconWrapper = styled(motion.div)`
  font-size: 1.6rem;
  margin-bottom: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

const Label = styled(motion.span)`
  font-size: 11px;
  font-weight: 500;
  margin-top: 2px;
  position: absolute;
  bottom: -16px;
  width: 100%;
  text-align: center;
  white-space: nowrap;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0.8;
`;

const ActiveIndicator = styled.div`
  position: absolute;
  bottom: -22px;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #5B5FEF;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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
        <Label className="label">Classe</Label>
        {location.pathname === '/classroom' && <ActiveIndicator />}
      </NavItem>

      {/* Messages */}
      <NavItem to="/inbox" className={({ isActive }) => isActive ? 'active' : ''}>
        <IconWrapper className="icon-container">
          <FiMail />
        </IconWrapper>
        <Label className="label">Messages</Label>
        {location.pathname === '/inbox' && <ActiveIndicator />}
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
        <Label className="label">Abonné</Label>
        {location.pathname === '/subscription' && <ActiveIndicator />}
      </NavItem>

      {/* Profil */}
      <NavItem to="/profile" className={({ isActive }) => isActive ? 'active' : ''}>
        <IconWrapper className="icon-container">
          <FiUser />
        </IconWrapper>
        <Label className="label">Profil</Label>
        {location.pathname === '/profile' && <ActiveIndicator />}
      </NavItem>
    </BottomNavContainer>
  );
};

export default BottomNavigation;
