import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi';
import { theme } from '../styles/theme';

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledInput = styled(motion.input)`
  width: 100%;
  padding: ${props => props.size === 'sm' ? '8px 12px' : props.size === 'lg' ? '16px 20px' : '12px 16px'};
  padding-right: ${props => props.type === 'password' || props.iconRight ? '40px' : '16px'};
  padding-left: ${props => props.iconLeft ? '40px' : '16px'};
  border: 2px solid ${props => {
    if (props.error) return props.theme.colors.error[500];
    if (props.success) return props.theme.colors.success[500];
    return props.theme.colors.gray[300];
  }};
  border-radius: ${props => props.theme.borderRadius.lg};
  font-family: ${props => props.theme.typography.fontFamily.sans.join(', ')};
  font-size: ${props => props.size === 'sm' ? props.theme.typography.fontSize.sm : props.size === 'lg' ? props.theme.typography.fontSize.lg : props.theme.typography.fontSize.base};
  background: ${props => props.disabled ? props.theme.colors.gray[100] : 'white'};
  color: ${props => props.disabled ? props.theme.colors.gray[500] : props.theme.colors.gray[900]};
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary[500]};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary[100]};
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.gray[400]};
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const IconLeft = styled.div`
  position: absolute;
  left: 12px;
  color: ${props => props.theme.colors.gray[400]};
  z-index: 1;
`;

const IconRight = styled.div`
  position: absolute;
  right: 12px;
  color: ${props => props.theme.colors.gray[400]};
  cursor: pointer;
  z-index: 1;
  
  &:hover {
    color: ${props => props.theme.colors.gray[600]};
  }
`;

const Label = styled.label`
  display: block;
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.gray[700]};
  margin-bottom: ${props => props.theme.spacing[2]};
`;

const ErrorMessage = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[1]};
  margin-top: ${props => props.theme.spacing[2]};
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.error[600]};
`;

const SuccessMessage = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[1]};
  margin-top: ${props => props.theme.spacing[2]};
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.success[600]};
`;

const HelpText = styled.div`
  margin-top: ${props => props.theme.spacing[2]};
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.gray[500]};
`;

const Input = ({
  label,
  placeholder,
  type = 'text',
  size = 'md',
  iconLeft,
  iconRight,
  error,
  success,
  helpText,
  disabled = false,
  required = false,
  value,
  onChange,
  onFocus,
  onBlur,
  className,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus && onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur && onBlur(e);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

  return (
    <InputContainer className={className}>
      {label && (
        <Label>
          {label}
          {required && <span style={{ color: theme.colors.error[500] }}> *</span>}
        </Label>
      )}
      
      <InputWrapper>
        {iconLeft && <IconLeft>{iconLeft}</IconLeft>}
        
        <StyledInput
          type={inputType}
          placeholder={placeholder}
          size={size}
          iconLeft={iconLeft}
          iconRight={iconRight || type === 'password'}
          error={error}
          success={success}
          disabled={disabled}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        
        {type === 'password' && (
          <IconRight onClick={togglePasswordVisibility}>
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </IconRight>
        )}
        
        {iconRight && type !== 'password' && (
          <IconRight>{iconRight}</IconRight>
        )}
      </InputWrapper>
      
      {error && (
        <ErrorMessage
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <FiAlertCircle />
          {error}
        </ErrorMessage>
      )}
      
      {success && (
        <SuccessMessage
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <FiAlertCircle />
          {success}
        </SuccessMessage>
      )}
      
      {helpText && !error && !success && (
        <HelpText>{helpText}</HelpText>
      )}
    </InputContainer>
  );
};

export default Input;
