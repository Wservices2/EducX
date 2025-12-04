import React from 'react';
import styled from 'styled-components';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const FooterContainer = styled.footer`
  background: #1f2937;
  color: white;
  padding: 60px 0 20px;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const FooterSection = styled.div`
  h3 {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 20px;
    color: #ffffff;
  }

  p {
    color: #d1d5db;
    line-height: 1.6;
    margin-bottom: 15px;
  }

  ul {
    list-style: none;
  }

  li {
    margin-bottom: 10px;
  }

  a {
    color: #d1d5db;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #3b82f6;
    }
  }
`;

const LogoSection = styled(FooterSection)`
  .logo {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 24px;
    font-weight: 800;
    color: #3b82f6;
    margin-bottom: 20px;
  }

  .logo-icon {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  color: #d1d5db;
`;

const FooterBottom = styled.div`
  border-top: 1px solid #374151;
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }

  p {
    color: #9ca3af;
    margin: 0;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          <LogoSection>
            <div className="logo">
              <div className="logo-icon">E</div>
              EducX
            </div>
            <p>
              L'excellence éducative made in Benin. Transformons l'éducation avec des contenus adaptés au programme Béninois.
            </p>
          </LogoSection>

          <FooterSection>
            <h3>Navigation</h3>
            <ul>
              <li><a href="#">Accueil</a></li>
              <li><a href="#">Cours</a></li>
              <li><a href="#">Connexion</a></li>
              <li><a href="#">Inscription</a></li>
            </ul>
          </FooterSection>

          <FooterSection>
            <h3>Support</h3>
            <ul>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Centre d'aide</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </FooterSection>
        </FooterGrid>

        <FooterBottom>
          <p>&copy; 2024 EducX. Tous droits réservés.</p>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
