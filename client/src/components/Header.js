import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiUser, FiUserPlus, FiLogOut, FiSettings } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import EducXLogoNew from './EducXLogo';

const HeaderContainer = styled.header`
  background: #ffffff;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
`;

const Logo = styled(Link)`
  text-decoration: none;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 8px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: #434040;
  font-weight: 500;
  font-size: 16px;
  transition: all 0.3s ease;
  cursor: pointer;
  text-decoration: none;
  padding: 12px 20px;
  border-radius: 25px;
  position: relative;
  overflow: hidden;

  &:hover {
    color: #072FA6;
    background: linear-gradient(135deg, rgba(7, 47, 166, 0.1) 0%, rgba(158, 7, 166, 0.1) 100%);
    transform: translateY(-2px);
  }

  ${props => props.$isActive && `
    background: linear-gradient(135deg, #072FA6 0%, #9E07A6 100%);
    color: #FFFFFF;
    font-weight: 700;
    font-size: 18px;
    padding: 16px 28px;
    border-radius: 30px;
    box-shadow: 0 8px 25px rgba(7, 47, 166, 0.3);
    transform: translateY(-4px) scale(1.1);
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 100%);
      border-radius: 30px;
    }
  `}
`;

const AuthButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #1e40af, #3b82f6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 14px;
`;

const UserName = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`;

const DropdownMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  padding: 8px;
  min-width: 200px;
  z-index: 1000;
`;

const DropdownItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  color: #374151;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  font-size: 14px;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  color: #ef4444;
  background: none;
  border: none;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  font-size: 14px;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #fef2f2;
  }
`;

const Button = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LoginButton = styled(Button)`
  background: transparent;
  color: #374151;
  border: 2px solid #e5e7eb;

  &:hover {
    border-color: #1e40af;
    color: #1e40af;
  }
`;

const SignupButton = styled(Button)`
  background: #1e40af;
  color: white;
  border: none;

  &:hover {
    background: #1d4ed8;
    transform: translateY(-1px);
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  color: #374151;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  background: white;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileNavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px 0;
  color: #374151;
  font-weight: 500;
  border-bottom: 1px solid #f3f4f6;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: #1e40af;
  }
`;

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  const getUserInitials = () => {
    if (user) {
      return `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase();
    }
    return 'U';
  };

  const navItems = [
    { path: '/', label: 'Accueil' },
    { path: '/courses', label: 'Cours' },
    { path: '/about', label: 'À propos' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">
          <EducXLogoNew />
        </Logo>

        <Nav>
          {navItems.map((item) => (
            <NavLink 
              key={item.path}
              to={item.path}
              $isActive={location.pathname === item.path}
            >
              {item.label}
            </NavLink>
          ))}
        </Nav>

        <AuthButtons>
          {isAuthenticated() ? (
            <UserMenu>
              <UserInfo onClick={toggleUserMenu}>
                <UserAvatar>{getUserInitials()}</UserAvatar>
                <UserName>{user?.firstName}</UserName>
              </UserInfo>
              
              {isUserMenuOpen && (
                <DropdownMenu
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <DropdownItem to="/dashboard">
                    <FiUser />
                    Mon profil
                  </DropdownItem>
                  <DropdownItem to="/settings">
                    <FiSettings />
                    Paramètres
                  </DropdownItem>
                  <LogoutButton onClick={handleLogout}>
                    <FiLogOut />
                    Déconnexion
                  </LogoutButton>
                </DropdownMenu>
              )}
            </UserMenu>
          ) : (
            <>
              <LoginButton as={Link} to="/login">
                <FiUser />
                Connexion
              </LoginButton>
              <SignupButton as={Link} to="/register">
                <FiUserPlus />
                Inscription
              </SignupButton>
            </>
          )}
        </AuthButtons>

        <MobileMenuButton onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </MobileMenuButton>
      </HeaderContent>

      {isMobileMenuOpen && (
        <MobileMenu
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <MobileNavLink to="/">Accueil</MobileNavLink>
          <MobileNavLink to="/courses">Cours</MobileNavLink>
          <MobileNavLink to="/about">À propos</MobileNavLink>
          <MobileNavLink to="/contact">Contact</MobileNavLink>
          
          {isAuthenticated() ? (
            <>
              <MobileNavLink to="/dashboard">Mon profil</MobileNavLink>
              <MobileNavLink to="/settings">Paramètres</MobileNavLink>
              <div style={{ marginTop: '20px', padding: '15px 0', borderTop: '1px solid #f3f4f6' }}>
                <LogoutButton onClick={handleLogout}>
                  <FiLogOut />
                  Déconnexion
                </LogoutButton>
              </div>
            </>
          ) : (
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
              <LoginButton as={Link} to="/login">
                <FiUser />
                Connexion
              </LoginButton>
              <SignupButton as={Link} to="/register">
                <FiUserPlus />
                Inscription
              </SignupButton>
            </div>
          )}
        </MobileMenu>
      )}
    </HeaderContainer>
  );
};

export default Header;
