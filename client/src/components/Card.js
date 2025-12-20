import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';

const CardContainer = styled(motion.div)`
  background: white;
  border-radius: ${props => props.theme.borderRadius['2xl']};
  box-shadow: ${props => props.elevated ? props.theme.shadows.lg : props.theme.shadows.md};
  overflow: hidden;
  transition: all 0.3s ease;
  border: ${props => props.bordered ? `1px solid ${props.theme.colors.gray[200]}` : 'none'};
  
  &:hover {
    transform: ${props => props.hoverable ? 'translateY(-4px)' : 'none'};
    box-shadow: ${props => props.hoverable ? props.theme.shadows.xl : props.elevated ? props.theme.shadows.lg : props.theme.shadows.md};
  }
`;

const CardHeader = styled.div`
  padding: ${props => props.theme.spacing[6]};
  border-bottom: ${props => props.separated ? `1px solid ${props.theme.colors.gray[200]}` : 'none'};
  background: ${props => props.gradient ? props.theme.gradients.primary : 'transparent'};
  color: ${props => props.gradient ? 'white' : 'inherit'};
`;

const CardBody = styled.div`
  padding: ${props => props.theme.spacing[6]};
`;

const CardFooter = styled.div`
  padding: ${props => props.theme.spacing[6]};
  border-top: ${props => props.separated ? `1px solid ${props.theme.colors.gray[200]}` : 'none'};
  background: ${props => props.gray ? props.theme.colors.gray[50] : 'transparent'};
`;

const CardImage = styled.div`
  width: 100%;
  height: ${props => props.height || '200px'};
  background: ${props => props.src ? `url(${props.src})` : props.theme.colors.gray[100]};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  
  ${props => props.overlay && `
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.3);
    }
  `}
`;

const CardTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize['2xl']};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.gray[900]};
  margin: 0 0 ${props => props.theme.spacing[2]} 0;
  line-height: ${props => props.theme.typography.lineHeight.tight};
`;

const CardSubtitle = styled.p`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.gray[600]};
  margin: 0 0 ${props => props.theme.spacing[4]} 0;
`;

const CardDescription = styled.p`
  font-size: ${props => props.theme.typography.fontSize.base};
  color: ${props => props.theme.colors.gray[700]};
  line-height: ${props => props.theme.typography.lineHeight.relaxed};
  margin: 0;
`;

const Card = ({ 
  children, 
  title, 
  subtitle, 
  description,
  image,
  imageHeight,
  imageOverlay,
  header,
  footer,
  headerGradient,
  headerSeparated,
  footerSeparated,
  footerGray,
  elevated = false,
  hoverable = true,
  bordered = false,
  className,
  ...props 
}) => {
  return (
    <CardContainer
      className={className}
      elevated={elevated}
      hoverable={hoverable}
      bordered={bordered}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {image && (
        <CardImage 
          src={image} 
          height={imageHeight}
          overlay={imageOverlay}
        />
      )}
      
      {(title || subtitle || header) && (
        <CardHeader 
          gradient={headerGradient}
          separated={headerSeparated}
        >
          {header || (
            <>
              {title && <CardTitle>{title}</CardTitle>}
              {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
            </>
          )}
        </CardHeader>
      )}
      
      <CardBody>
        {description && <CardDescription>{description}</CardDescription>}
        {children}
      </CardBody>
      
      {footer && (
        <CardFooter 
          separated={footerSeparated}
          gray={footerGray}
        >
          {footer}
        </CardFooter>
      )}
    </CardContainer>
  );
};

export default Card;
