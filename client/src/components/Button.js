import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';

const ButtonBase = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing[2]};
  padding: ${props => props.size === 'sm' ? '8px 16px' : props.size === 'lg' ? '16px 32px' : '12px 24px'};
  border-radius: ${props => props.theme.borderRadius.full};
  font-family: ${props => props.theme.typography.fontFamily.sans.join(', ')};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  font-size: ${props => props.size === 'sm' ? props.theme.typography.fontSize.sm : props.size === 'lg' ? props.theme.typography.fontSize.lg : props.theme.typography.fontSize.base};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary[200]};
  }
`;

const PrimaryButton = styled(ButtonBase)`
  background: ${props => props.theme.gradients.primary};
  color: white;
  box-shadow: ${props => props.theme.shadows.md};
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

const SecondaryButton = styled(ButtonBase)`
  background: transparent;
  color: ${props => props.theme.colors.primary[600]};
  border: 2px solid ${props => props.theme.colors.primary[200]};
  
  &:hover:not(:disabled) {
    background: ${props => props.theme.colors.primary[50]};
    border-color: ${props => props.theme.colors.primary[300]};
  }
`;

const OutlineButton = styled(ButtonBase)`
  background: white;
  color: ${props => props.theme.colors.gray[700]};
  border: 2px solid ${props => props.theme.colors.gray[300]};
  
  &:hover:not(:disabled) {
    background: ${props => props.theme.colors.gray[50]};
    border-color: ${props => props.theme.colors.gray[400]};
  }
`;

const GhostButton = styled(ButtonBase)`
  background: transparent;
  color: ${props => props.theme.colors.gray[600]};
  
  &:hover:not(:disabled) {
    background: ${props => props.theme.colors.gray[100]};
    color: ${props => props.theme.colors.gray[800]};
  }
`;

const SuccessButton = styled(ButtonBase)`
  background: ${props => props.theme.gradients.secondary};
  color: white;
  box-shadow: ${props => props.theme.shadows.md};
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const DangerButton = styled(ButtonBase)`
  background: ${props => props.theme.gradients.accent};
  color: white;
  box-shadow: ${props => props.theme.shadows.md};
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  icon, 
  iconPosition = 'left',
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  ...props 
}) => {
  const buttonProps = {
    size,
    disabled: disabled || loading,
    onClick,
    type,
    whileHover: { scale: disabled || loading ? 1 : 1.02 },
    whileTap: { scale: disabled || loading ? 1 : 0.98 },
    ...props
  };

  const renderContent = () => {
    if (loading) {
      return (
        <>
          <LoadingSpinner />
          Chargement...
        </>
      );
    }

    if (icon && iconPosition === 'left') {
      return (
        <>
          {icon}
          {children}
        </>
      );
    }

    if (icon && iconPosition === 'right') {
      return (
        <>
          {children}
          {icon}
        </>
      );
    }

    return children;
  };

  switch (variant) {
    case 'secondary':
      return <SecondaryButton {...buttonProps}>{renderContent()}</SecondaryButton>;
    case 'outline':
      return <OutlineButton {...buttonProps}>{renderContent()}</OutlineButton>;
    case 'ghost':
      return <GhostButton {...buttonProps}>{renderContent()}</GhostButton>;
    case 'success':
      return <SuccessButton {...buttonProps}>{renderContent()}</SuccessButton>;
    case 'danger':
      return <DangerButton {...buttonProps}>{renderContent()}</DangerButton>;
    default:
      return <PrimaryButton {...buttonProps}>{renderContent()}</PrimaryButton>;
  }
};

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export default Button;
