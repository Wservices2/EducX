import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const TitleContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 26px;
  font-weight: 800;
  color: #434040;
  margin-bottom: 32px;
  position: relative;

  svg {
    color: #072FA6;
    font-size: 32px;
    filter: drop-shadow(0 2px 4px rgba(7, 47, 166, 0.2));
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, #072FA6 0%, #9E07A6 100%);
    border-radius: 2px;
  }
`;

const SectionTitle = ({ icon: Icon, children, delay = 0 }) => {
  const containerVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        delay,
        ease: "easeOut"
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
        delay: delay + 0.2
      }
    }
  };

  return (
    <TitleContainer
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        variants={iconVariants}
        initial="hidden"
        animate="visible"
      >
        <Icon />
      </motion.div>
      {children}
    </TitleContainer>
  );
};

export default SectionTitle;
