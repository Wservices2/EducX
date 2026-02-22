import React from 'react';
import styled, { keyframes } from 'styled-components';
import EducXLogo from './EducXLogo';

const reveal = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.06);
  }
`;

const fillBar = keyframes`
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
`;

const shimmer = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

const LoaderOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background:
    radial-gradient(circle at 15% 20%, rgba(59, 130, 246, 0.2), transparent 45%),
    radial-gradient(circle at 85% 80%, rgba(30, 64, 175, 0.24), transparent 45%),
    linear-gradient(135deg, #f4f7ff 0%, #e8f0ff 100%);
`;

const LoaderCard = styled.div`
  width: min(560px, 100%);
  border-radius: 26px;
  padding: 40px 28px;
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(8px);
  box-shadow: 0 18px 50px rgba(30, 64, 175, 0.16);
  text-align: center;
  animation: ${reveal} 0.6s ease both;
`;

const LogoWrap = styled.div`
  display: flex;
  justify-content: center;
  animation: ${pulse} 1.8s ease-in-out infinite;
`;

const Tagline = styled.p`
  margin-top: 16px;
  color: #1e3a8a;
  font-weight: 600;
  font-size: clamp(0.95rem, 2vw, 1.08rem);
  letter-spacing: 0.01em;
`;

const Progress = styled.div`
  margin: 20px auto 0;
  width: min(340px, 84%);
  height: 8px;
  border-radius: 999px;
  background: #dbeafe;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  position: relative;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #1d4ed8 0%, #3b82f6 55%, #60a5fa 100%);
  animation: ${fillBar} 1.9s ease forwards;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      120deg,
      transparent 30%,
      rgba(255, 255, 255, 0.55) 50%,
      transparent 70%
    );
    animation: ${shimmer} 1.3s linear infinite;
  }
`;

const LoadingText = styled.span`
  display: inline-block;
  margin-top: 14px;
  color: #334155;
  font-size: 0.9rem;
  font-weight: 500;
`;

const SiteLoader = () => (
  <LoaderOverlay aria-label="Chargement du site EducX">
    <LoaderCard>
      <LogoWrap>
        <EducXLogo size="large" showText />
      </LogoWrap>
      <Tagline>Votre espace d'apprentissage se prepare...</Tagline>
      <Progress>
        <ProgressFill />
      </Progress>
      <LoadingText>Chargement en cours</LoadingText>
    </LoaderCard>
  </LoaderOverlay>
);

export default SiteLoader;
