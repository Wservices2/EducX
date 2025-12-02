import React from 'react';
import styled from 'styled-components';

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
`;

const LogoIcon = styled.div`
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoText = styled.span`
  font-size: 28px;
  font-weight: 800;
  color: #1e40af;
  font-family: 'Inter', sans-serif;
`;

const EducXLogo = ({ size = 'normal', showText = true, className }) => {
  const iconSize = size === 'small' ? 32 : size === 'large' ? 60 : 45;
  const textSize = size === 'small' ? 20 : size === 'large' ? 36 : 28;
  
  // Générer des IDs uniques pour éviter les conflits - Version mise à jour
  const uniqueId = Math.random().toString(36).substr(2, 9);
  const bodyGradientId = `bodyGradient-${uniqueId}`;
  const capGradientId = `capGradient-${uniqueId}`;
  const tasselGradientId = `tasselGradient-${uniqueId}`;

  return (
    <LogoContainer className={className}>
      <LogoIcon style={{ width: iconSize, height: iconSize }}>
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Figure humaine stylisée */}
          <g>
            {/* Corps */}
            <path
              d="M35 75C35 70 40 65 50 65C60 65 65 70 65 75V85C65 90 60 95 50 95C40 95 35 90 35 85V75Z"
              fill={`url(#${bodyGradientId})`}
            />
            
            {/* Bras gauche */}
            <path
              d="M25 60C20 55 20 50 25 45C30 40 35 45 30 50C25 55 25 60 25 60Z"
              fill={`url(#${bodyGradientId})`}
            />
            
            {/* Bras droit */}
            <path
              d="M75 60C80 55 80 50 75 45C70 40 65 45 70 50C75 55 75 60 75 60Z"
              fill={`url(#${bodyGradientId})`}
            />
            
            {/* Tête */}
            <circle
              cx="50"
              cy="40"
              r="15"
              fill={`url(#${bodyGradientId})`}
            />
            
            {/* Toque de graduation */}
            <rect
              x="35"
              y="25"
              width="30"
              height="8"
              rx="2"
              fill={`url(#${capGradientId})`}
            />
            
            {/* Tassel (pompon) */}
            <circle
              cx="65"
              cy="29"
              r="2"
              fill={`url(#${tasselGradientId})`}
            />
            
            {/* Ligne du pompon */}
            <line
              x1="65"
              y1="29"
              x2="70"
              y2="35"
              stroke={`url(#${tasselGradientId})`}
              strokeWidth="1"
            />
          </g>
          
          {/* Dégradés */}
          <defs>
            <linearGradient id={bodyGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e40af" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            
            <linearGradient id={capGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e40af" />
              <stop offset="50%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            
            <linearGradient id={tasselGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e40af" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
      </LogoIcon>
      
      {showText && (
        <LogoText style={{ fontSize: textSize }}>
          EducX
        </LogoText>
      )}
    </LogoContainer>
  );
};

export default EducXLogo;
