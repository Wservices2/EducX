import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FiHome, FiBookOpen, FiMail, FiUser } from 'react-icons/fi';

const BottomNavContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 64px;
  background: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  z-index: 1000;
  border-top: 1px solid #f3f4f6;

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
  font-size: 0.75rem;
  font-weight: 500;
  width: 100%;
  height: 100%;
  transition: all 0.2s ease;

  &.active {
    color: #667eea;
    
    svg {
      transform: translateY(-2px);
    }
  }

  &:hover {
    color: #667eea;
  }
`;

const IconWrapper = styled.div`
  font-size: 1.5rem;
  margin-bottom: 4px;
  transition: transform 0.2s ease;
`;

const BottomNavigation = () => {
    const navItems = [
        { path: '/dashboard', icon: FiHome, label: 'Accueil' },
        { path: '/classroom', icon: FiBookOpen, label: 'Classe' },
        { path: '/inbox', icon: FiMail, label: 'Messages' },
        { path: '/profile', icon: FiUser, label: 'Profil' }
    ];

    return (
        <BottomNavContainer>
            {navItems.map((item) => (
                <NavItem
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) => isActive ? 'active' : ''}
                >
                    <IconWrapper>
                        <item.icon />
                    </IconWrapper>
                    <span>{item.label}</span>
                </NavItem>
            ))}
        </BottomNavContainer>
    );
};

export default BottomNavigation;
