import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import BottomNavigation from './BottomNavigation';

const NavigationContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ContentArea = styled.div`
  flex: 1;
  position: relative;
  min-height: 100vh;

  @media (min-width: 769px) {
    margin-left: 280px;
  }
`;

const ResponsiveNavigation = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <NavigationContainer>
      {!isMobile && <Sidebar />}
      
      <ContentArea>
        {children}
      </ContentArea>
      
      {isMobile && <BottomNavigation />}
    </NavigationContainer>
  );
};

export default ResponsiveNavigation;
