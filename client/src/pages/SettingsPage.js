import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiSettings, FiBell, FiShield, FiMoon, FiSun, FiGlobe, FiHelpCircle, FiLogOut } from 'react-icons/fi';
import ResponsiveNavigation from '../components/ResponsiveNavigation';

const SettingsContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 20px;
  padding-bottom: 100px;

  @media (min-width: 769px) {
    padding: 40px;
    padding-bottom: 0;
  }
`;

const Header = styled.div`
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  margin: -20px -20px 30px;
  padding: 40px 20px;
  color: white;
  border-radius: 0 0 24px 24px;

  @media (min-width: 769px) {
    margin: -40px -40px 40px;
    padding: 60px 40px;
    border-radius: 0 0 32px 32px;
  }
`;

const HeaderTitle = styled.h1`
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 8px;

  @media (min-width: 768px) {
    font-size: 36px;
  }
`;

const HeaderSubtitle = styled.p`
  font-size: 16px;
  opacity: 0.9;
`;

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Section = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.05);
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SectionIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #1e40af, #3b82f6);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
`;

const SettingItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px solid #f3f4f6;

  &:last-child {
    border-bottom: none;
  }
`;

const SettingInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
`;

const SettingIcon = styled.div`
  width: 40px;
  height: 40px;
  background: rgba(30, 64, 175, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1e40af;
  font-size: 18px;
`;

const SettingContent = styled.div`
  flex: 1;
`;

const SettingLabel = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 2px;
`;

const SettingDescription = styled.div`
  font-size: 14px;
  color: #6b7280;
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: #1e40af;
  }

  &:checked + span:before {
    transform: translateX(22px);
  }
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.3s;
  border-radius: 28px;

  &:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.3s;
    border-radius: 50%;
  }
`;

const SelectSetting = styled.select`
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 14px;
  color: #1f2937;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #1e40af;
  }
`;

const ActionButton = styled.button`
  width: 100%;
  background: ${props => props.danger ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 'linear-gradient(135deg, #1e40af, #3b82f6)'};
  color: white;
  border: none;
  border-radius: 12px;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px ${props => props.danger ? 'rgba(239, 68, 68, 0.4)' : 'rgba(30, 64, 175, 0.4)'};
  }
`;

const SettingsPage = () => {
  return (
    <ResponsiveNavigation>
      <SettingsContainer>
      <Header>
        <HeaderTitle>Paramètres</HeaderTitle>
        <HeaderSubtitle>Personnalisez votre expérience</HeaderSubtitle>
      </Header>

      <Content>
        <Section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <SectionTitle>
            <SectionIcon>
              <FiBell />
            </SectionIcon>
            Notifications
          </SectionTitle>
          
          <SettingItem>
            <SettingInfo>
              <SettingIcon>
                <FiBell />
              </SettingIcon>
              <SettingContent>
                <SettingLabel>Notifications push</SettingLabel>
                <SettingDescription>Recevez des notifications sur votre appareil</SettingDescription>
              </SettingContent>
            </SettingInfo>
            <ToggleSwitch>
              <ToggleInput type="checkbox" defaultChecked />
              <ToggleSlider />
            </ToggleSwitch>
          </SettingItem>

          <SettingItem>
            <SettingInfo>
              <SettingIcon>
                <FiBell />
              </SettingIcon>
              <SettingContent>
                <SettingLabel>Rappels de cours</SettingLabel>
                <SettingDescription>Rappels pour vos cours programmés</SettingDescription>
              </SettingContent>
            </SettingInfo>
            <ToggleSwitch>
              <ToggleInput type="checkbox" defaultChecked />
              <ToggleSlider />
            </ToggleSwitch>
          </SettingItem>
        </Section>

        <Section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <SectionTitle>
            <SectionIcon>
              <FiMoon />
            </SectionIcon>
            Apparence
          </SectionTitle>
          
          <SettingItem>
            <SettingInfo>
              <SettingIcon>
                <FiMoon />
              </SettingIcon>
              <SettingContent>
                <SettingLabel>Thème</SettingLabel>
                <SettingDescription>Choisissez votre thème préféré</SettingDescription>
              </SettingContent>
            </SettingInfo>
            <SelectSetting defaultValue="light">
              <option value="light">Clair</option>
              <option value="dark">Sombre</option>
              <option value="auto">Automatique</option>
            </SelectSetting>
          </SettingItem>

          <SettingItem>
            <SettingInfo>
              <SettingIcon>
                <FiGlobe />
              </SettingIcon>
              <SettingContent>
                <SettingLabel>Langue</SettingLabel>
                <SettingDescription>Langue de l'interface</SettingDescription>
              </SettingContent>
            </SettingInfo>
            <SelectSetting defaultValue="fr">
              <option value="fr">Français</option>
              <option value="en">English</option>
            </SelectSetting>
          </SettingItem>
        </Section>

        <Section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <SectionTitle>
            <SectionIcon>
              <FiShield />
            </SectionIcon>
            Sécurité
          </SectionTitle>
          
          <SettingItem>
            <SettingInfo>
              <SettingIcon>
                <FiShield />
              </SettingIcon>
              <SettingContent>
                <SettingLabel>Authentification à deux facteurs</SettingLabel>
                <SettingDescription>Ajoutez une couche de sécurité supplémentaire</SettingDescription>
              </SettingContent>
            </SettingInfo>
            <ToggleSwitch>
              <ToggleInput type="checkbox" />
              <ToggleSlider />
            </ToggleSwitch>
          </SettingItem>
        </Section>

        <Section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <SectionTitle>
            <SectionIcon>
              <FiHelpCircle />
            </SectionIcon>
            Support
          </SectionTitle>
          
          <ActionButton>
            <FiHelpCircle />
            Centre d'aide
          </ActionButton>

          <ActionButton>
            <FiHelpCircle />
            Nous contacter
          </ActionButton>
        </Section>

        <ActionButton danger>
          <FiLogOut />
          Se déconnecter
        </ActionButton>
      </Content>

    </SettingsContainer>
    </ResponsiveNavigation>
  );
};

export default SettingsPage;
