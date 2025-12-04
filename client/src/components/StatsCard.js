import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StatCardContainer = styled(motion.div)`
  background: #FFFFFF;
  border-radius: 24px;
  padding: 32px 24px;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(7, 47, 166, 0.08);
  border: 1px solid rgba(7, 47, 166, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 50px rgba(7, 47, 166, 0.15);
    border-color: rgba(7, 47, 166, 0.2);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(90deg, #072FA6 0%, #9E07A6 50%, #06B750 100%);
    border-radius: 24px 24px 0 0;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(7, 47, 166, 0.02) 0%, rgba(158, 7, 166, 0.02) 100%);
    border-radius: 24px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::after {
    opacity: 1;
  }
`;

const StatIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  font-size: 32px;
  color: white;
  background: linear-gradient(135deg, #072FA6 0%, #9E07A6 100%);
  box-shadow: 0 10px 30px rgba(7, 47, 166, 0.3);
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
    background: linear-gradient(135deg, #072FA6 0%, #9E07A6 100%);
    border-radius: 25px;
    z-index: -1;
    opacity: 0.3;
    filter: blur(10px);
  }
`;

const StatNumber = styled(motion.div)`
  font-size: 42px;
  font-weight: 900;
  color: #434040;
  margin-bottom: 16px;
  position: relative;
  z-index: 2;
  background: linear-gradient(135deg, #072FA6 0%, #9E07A6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;

  @media (min-width: 768px) {
    font-size: 48px;
  }
`;

const StatLabel = styled.div`
  font-size: 16px;
  color: #434040;
  font-weight: 600;
  opacity: 0.8;
  position: relative;
  z-index: 2;
  line-height: 1.3;
  text-align: center;
  max-width: 140px;
  margin: 0 auto;

  @media (min-width: 768px) {
    font-size: 17px;
  }
`;

const ProgressRing = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid rgba(7, 47, 166, 0.1);
  border-top: 3px solid #072FA6;
  animation: spin 3s linear infinite;
  opacity: 0.6;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const StatsCard = ({ icon: Icon, number, label, color, delay = 0 }) => {
  const numberVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: delay + 0.2
      }
    }
  };

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

  return (
    <StatCardContainer
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <ProgressRing />
      <StatIcon
        as={motion.div}
        variants={iconVariants}
        initial="hidden"
        animate="visible"
        style={{ background: color || 'linear-gradient(135deg, #072FA6 0%, #9E07A6 100%)' }}
      >
        <Icon />
      </StatIcon>
      <StatNumber
        variants={numberVariants}
        initial="hidden"
        animate="visible"
      >
        {number}
      </StatNumber>
      <StatLabel>{label}</StatLabel>
    </StatCardContainer>
  );
};

export default StatsCard;
