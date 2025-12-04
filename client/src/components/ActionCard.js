import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ActionCardContainer = styled(motion.div)`
  background: #FFFFFF;
  border-radius: 20px;
  padding: 28px 24px;
  text-align: center;
  box-shadow: 0 8px 25px rgba(7, 47, 166, 0.08);
  border: 1px solid rgba(7, 47, 166, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  min-height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 16px 40px rgba(7, 47, 166, 0.15);
    border-color: rgba(6, 183, 80, 0.3);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #06B750 0%, #15B706 100%);
    border-radius: 20px 20px 0 0;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(6, 183, 80, 0.02) 0%, rgba(21, 183, 6, 0.02) 100%);
    border-radius: 20px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::after {
    opacity: 1;
  }
`;

const ActionIcon = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 28px;
  color: white;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    border-radius: 21px;
    z-index: -1;
    opacity: 0.3;
    filter: blur(8px);
  }
`;

const ActionTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #434040;
  margin-bottom: 10px;
  position: relative;
  z-index: 2;
  line-height: 1.3;
`;

const ActionSubtitle = styled.div`
  font-size: 14px;
  color: #434040;
  opacity: 0.7;
  position: relative;
  z-index: 2;
  line-height: 1.3;
  text-align: center;
`;

const ActionCard = ({ icon: Icon, title, subtitle, color, delay = 0, onClick }) => {
  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: delay
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: delay + 0.2
      }
    }
  };

  return (
    <ActionCardContainer
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <ActionIcon
        as={motion.div}
        variants={iconVariants}
        initial="hidden"
        animate="visible"
        style={{ 
          background: color || 'linear-gradient(135deg, #06B750 0%, #15B706 100%)',
          '&::before': {
            background: color || 'linear-gradient(135deg, #06B750 0%, #15B706 100%)'
          }
        }}
      >
        <Icon />
      </ActionIcon>
      <motion.div
        variants={contentVariants}
        initial="hidden"
        animate="visible"
      >
        <ActionTitle>{title}</ActionTitle>
        <ActionSubtitle>{subtitle}</ActionSubtitle>
      </motion.div>
    </ActionCardContainer>
  );
};

export default ActionCard;
