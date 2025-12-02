import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  FiHome, FiMail, FiBookOpen, FiAward, FiUser, FiSettings, 
  FiLogOut, FiChevronLeft, FiChevronRight, FiBell, FiHeart,
  FiTrendingUp, FiTarget, FiZap, FiShield, FiGift, FiSun
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const SidebarContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  background: linear-gradient(180deg, #FFFFFF 0%, #EDF6F6 100%);
  backdrop-filter: blur(20px);
  border-right: 2px solid rgba(7, 47, 166, 0.1);
  z-index: 1000;
  display: none;
  flex-direction: column;
  box-shadow: 4px 0 20px rgba(7, 47, 166, 0.1);

  @media (min-width: 769px) {
    display: flex;
  }

  ${props => props.$collapsed ? `
    width: 80px;
  ` : `
    width: 280px;
  `}
`;

const SidebarHeader = styled.div`
  padding: 24px 20px;
  border-bottom: 1px solid rgba(7, 47, 166, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(7, 47, 166, 0.05) 0%, rgba(158, 7, 166, 0.05) 100%);
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  z-index: 2;
  margin-bottom: 20px;
`;

const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #072FA6 0%, #9E07A6 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 800;
  font-size: 18px;
  box-shadow: 0 4px 15px rgba(7, 47, 166, 0.3);
`;

const LogoText = styled(motion.div)`
  font-size: 24px;
  font-weight: 800;
  background: linear-gradient(135deg, #072FA6 0%, #9E07A6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  white-space: nowrap;
`;

const ToggleButton = styled(motion.button)`
  position: absolute;
  top: 24px;
  right: 20px;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: linear-gradient(135deg, #072FA6 0%, #9E07A6 100%);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  box-shadow: 0 4px 15px rgba(7, 47, 166, 0.3);
  z-index: 3;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(7, 47, 166, 0.4);
  }
`;

const UserSection = styled(motion.div)`
  padding: 16px 20px;
  background: linear-gradient(135deg, rgba(7, 47, 166, 0.05) 0%, rgba(158, 7, 166, 0.05) 100%);
  border-radius: 16px;
  margin: 0 12px 20px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #072FA6 0%, #9E07A6 50%, #06B750 100%);
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  z-index: 2;
`;

const UserAvatar = styled.div`
  width: 45px;
  height: 45px;
  background: linear-gradient(135deg, #072FA6 0%, #9E07A6 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 16px;
  box-shadow: 0 4px 15px rgba(7, 47, 166, 0.3);
`;

const UserDetails = styled.div`
  flex: 1;
  min-width: 0;
`;

const UserName = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #434040;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UserRole = styled.div`
  font-size: 12px;
  color: #434040;
  opacity: 0.7;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Navigation = styled.nav`
  flex: 1;
  padding: 0 12px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(7, 47, 166, 0.3) transparent;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(7, 47, 166, 0.3);
    border-radius: 2px;
  }
`;

const NavSection = styled.div`
  margin-bottom: 32px;
`;

const SectionTitle = styled(motion.div)`
  font-size: 12px;
  font-weight: 700;
  color: #434040;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 16px;
  padding: 0 8px;
  opacity: 0.6;
`;

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 12px;
  margin-bottom: 8px;
  border-radius: 12px;
  text-decoration: none;
  color: #434040;
  font-weight: 500;
  font-size: 15px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  ${props => props.$isActive && `
    background: linear-gradient(135deg, #072FA6 0%, #9E07A6 100%);
    color: #FFFFFF;
    font-weight: 700;
    box-shadow: 0 8px 25px rgba(7, 47, 166, 0.3);
    transform: translateX(4px);

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 100%);
      border-radius: 12px;
    }
  `}

  &:not([$isActive]):hover {
    background: linear-gradient(135deg, rgba(7, 47, 166, 0.1) 0%, rgba(158, 7, 166, 0.1) 100%);
    color: #072FA6;
    transform: translateX(4px);
    box-shadow: 0 4px 15px rgba(7, 47, 166, 0.15);
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 0;
    height: 0;
    background: linear-gradient(90deg, #072FA6 0%, #9E07A6 100%);
    border-radius: 0 4px 4px 0;
    transform: translateY(-50%);
    transition: width 0.3s ease;
  }

  ${props => props.$isActive && `
    &::after {
      width: 4px;
      height: 24px;
    }
  `}
`;

const NavIcon = styled.div`
  font-size: 20px;
  min-width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
`;

const NavLabel = styled(motion.span)`
  position: relative;
  z-index: 2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NotificationBadge = styled(motion.div)`
  position: absolute;
  top: -2px;
  right: -2px;
  background: linear-gradient(135deg, #D4080C 0%, #CF6D0A 100%);
  color: white;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 18px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(212, 8, 12, 0.4);
  z-index: 3;
  border: 2px solid #FFFFFF;
`;

const SidebarFooter = styled.div`
  padding: 20px;
  border-top: 1px solid rgba(7, 47, 166, 0.1);
  background: linear-gradient(135deg, rgba(7, 47, 166, 0.02) 0%, rgba(158, 7, 166, 0.02) 100%);
`;

const LogoutButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 12px;
  width: 100%;
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%);
  color: #EF4444;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(239, 68, 68, 0.3);
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
`;

const LogoutIcon = styled.div`
  font-size: 18px;
  position: relative;
  z-index: 2;
`;

const LogoutText = styled.span`
  position: relative;
  z-index: 2;
`;

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    logout();
  };

  const getUserInitials = () => {
    if (user) {
      return `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase();
    }
    return 'U';
  };

  const mainNavItems = [
    {
      path: '/dashboard',
      icon: FiHome,
      label: 'Accueil',
      notifications: 0
    },
    {
      path: '/inbox',
      icon: FiMail,
      label: 'Messages',
      notifications: 5
    },
    {
      path: '/classroom',
      icon: FiBookOpen,
      label: 'Classe',
      notifications: 0
    },
    {
      path: '/subscription',
      icon: FiAward,
      label: 'Abonnement',
      notifications: 0
    }
  ];

  const userNavItems = [
    {
      path: '/profile',
      icon: FiUser,
      label: 'Profil',
      notifications: 0
    },
    {
      path: '/settings',
      icon: FiSettings,
      label: 'Paramètres',
      notifications: 0
    }
  ];

  const containerVariants = {
    hidden: { x: -300, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <SidebarContainer
      $collapsed={isCollapsed}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <SidebarHeader>
        <LogoContainer>
          <LogoIcon>E</LogoIcon>
          <AnimatePresence>
            {!isCollapsed && (
              <LogoText
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3 }}
              >
                EducX
              </LogoText>
            )}
          </AnimatePresence>
        </LogoContainer>
        
        <ToggleButton
          onClick={toggleCollapse}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </ToggleButton>
      </SidebarHeader>

      <AnimatePresence>
        {!isCollapsed && (
          <UserSection
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <UserInfo>
              <UserAvatar>{getUserInitials()}</UserAvatar>
              <UserDetails>
                <UserName>{user?.firstName || 'Utilisateur'}</UserName>
                <UserRole>Étudiant</UserRole>
              </UserDetails>
            </UserInfo>
          </UserSection>
        )}
      </AnimatePresence>

      <Navigation>
        <NavSection>
          <AnimatePresence>
            {!isCollapsed && (
              <SectionTitle
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.2 }}
              >
                Navigation
              </SectionTitle>
            )}
          </AnimatePresence>
          
          {mainNavItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            
            return (
              <NavItem
                key={item.path}
                to={item.path}
                $isActive={isActive}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ delay: 0.1 * index }}
              >
                <NavIcon>
                  <item.icon />
                  {item.notifications > 0 && (
                    <NotificationBadge
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      {item.notifications}
                    </NotificationBadge>
                  )}
                </NavIcon>
                <AnimatePresence>
                  {!isCollapsed && (
                    <NavLabel
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.label}
                    </NavLabel>
                  )}
                </AnimatePresence>
              </NavItem>
            );
          })}
        </NavSection>

        <NavSection>
          <AnimatePresence>
            {!isCollapsed && (
              <SectionTitle
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.3 }}
              >
                Compte
              </SectionTitle>
            )}
          </AnimatePresence>
          
          {userNavItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            
            return (
              <NavItem
                key={item.path}
                to={item.path}
                $isActive={isActive}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ delay: 0.1 * (index + 4) }}
              >
                <NavIcon>
                  <item.icon />
                </NavIcon>
                <AnimatePresence>
                  {!isCollapsed && (
                    <NavLabel
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.label}
                    </NavLabel>
                  )}
                </AnimatePresence>
              </NavItem>
            );
          })}
        </NavSection>
      </Navigation>

      <SidebarFooter>
        <LogoutButton
          onClick={handleLogout}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <LogoutIcon>
            <FiLogOut />
          </LogoutIcon>
          <AnimatePresence>
            {!isCollapsed && (
              <LogoutText
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                Déconnexion
              </LogoutText>
            )}
          </AnimatePresence>
        </LogoutButton>
      </SidebarFooter>
    </SidebarContainer>
  );
};

export default Sidebar;
