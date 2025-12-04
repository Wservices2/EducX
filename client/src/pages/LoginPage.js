import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowLeft, FiLogIn, FiUser } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LoginPageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(24px, 6vw, 48px) clamp(20px, 5vw, 32px);

  @media (max-width: 480px) {
    padding: 24px 20px;
  }
`;

const LoginCard = styled(motion.div)`
  background: white;
  border-radius: clamp(16px, 4vw, 24px);
  padding: clamp(32px, 7vw, 56px);
  width: 100%;
  max-width: 450px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;

  @media (max-width: 480px) {
    max-width: 100%;
    padding: 32px 24px;
    border-radius: 16px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #22c55e, #fbbf24, #ef4444);
  }
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #6b7280;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 30px;
  transition: color 0.3s ease;

  &:hover {
    color: #1e40af;
  }
`;

const Title = styled.h1`
  font-size: clamp(24px, 6vw, 32px);
  font-weight: 800;
  color: #1f2937;
  margin-bottom: clamp(6px, 2vw, 8px);
  text-align: center;

  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

const Subtitle = styled.p`
  font-size: clamp(14px, 3.5vw, 16px);
  color: #6b7280;
  text-align: center;
  margin-bottom: clamp(30px, 6vw, 40px);

  @media (max-width: 480px) {
    margin-bottom: 30px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: clamp(20px, 5vw, 24px);

  @media (max-width: 480px) {
    gap: 20px;
  }
`;

const InputGroup = styled.div`
  position: relative;
`;

const Label = styled.label`
  display: block;
  font-size: clamp(13px, 3.5vw, 14px);
  font-weight: 600;
  color: #374151;
  margin-bottom: clamp(6px, 2vw, 8px);

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 16px;
  color: #9ca3af;
  z-index: 1;
  font-size: 18px;
`;

const Input = styled.input`
  width: 100%;
  padding: clamp(14px, 4vw, 16px) clamp(14px, 4vw, 16px) clamp(14px, 4vw, 16px) clamp(45px, 10vw, 50px);
  border: 2px solid ${props => props.error ? '#ef4444' : '#e5e7eb'};
  border-radius: clamp(10px, 3vw, 12px);
  font-size: clamp(15px, 4vw, 16px);
  font-family: inherit;
  background: #f9fafb;
  transition: all 0.3s ease;

  @media (max-width: 480px) {
    padding: 14px 14px 14px 45px;
    font-size: 15px;
    border-radius: 10px;
  }

  &:focus {
    outline: none;
    border-color: #1e40af;
    background: white;
    box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 16px;
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  font-size: 18px;
  z-index: 1;
  transition: color 0.3s ease;

  &:hover {
    color: #6b7280;
  }
`;

const ErrorMessage = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  font-size: 14px;
  color: #ef4444;
`;

const SuccessMessage = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  font-size: 14px;
  color: #22c55e;
`;

const RememberForgot = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
`;

const RememberMe = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #6b7280;
  cursor: pointer;

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: #1e40af;
  }
`;

const ForgotPassword = styled(Link)`
  color: #1e40af;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  transition: color 0.3s ease;

  &:hover {
    color: #1d4ed8;
    text-decoration: underline;
  }
`;

const SubmitButton = styled(motion.button)`
  background: linear-gradient(135deg, #1e40af, #3b82f6);
  color: white;
  padding: clamp(14px, 4vw, 16px) clamp(24px, 6vw, 32px);
  border: none;
  border-radius: clamp(10px, 3vw, 12px);
  font-size: clamp(15px, 4vw, 16px);
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(8px, 2vw, 10px);
  margin-top: clamp(16px, 4vw, 20px);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  @media (max-width: 480px) {
    padding: 14px 24px;
    font-size: 15px;
    border-radius: 10px;
    margin-top: 16px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(30, 64, 175, 0.4);
  }

  &:not(:disabled):active {
    transform: translateY(0);
  }
`;

const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const RegisterPrompt = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: clamp(20px, 5vw, 30px);
  padding-top: clamp(20px, 5vw, 30px);
  border-top: 1px solid #e5e7eb;
  gap: clamp(6px, 2vw, 8px);

  @media (max-width: 480px) {
    margin-top: 20px;
    padding-top: 20px;
    gap: 6px;
  }
`;

const RegisterText = styled.span`
  color: #6b7280;
  font-size: clamp(13px, 3.5vw, 14px);

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const RegisterLink = styled(Link)`
  color: #1e40af;
  text-decoration: none;
  font-weight: 600;
  font-size: clamp(13px, 3.5vw, 14px);
  transition: color 0.3s ease;
  padding: clamp(4px, 1vw, 6px) clamp(8px, 2vw, 12px);
  border-radius: 6px;
  background: rgba(30, 64, 175, 0.05);

  @media (max-width: 480px) {
    font-size: 13px;
    padding: 4px 8px;
  }

  &:hover {
    color: #1d4ed8;
    text-decoration: underline;
    background: rgba(30, 64, 175, 0.1);
  }
`;

const SocialLogin = styled.div`
  margin-top: clamp(20px, 5vw, 30px);

  @media (max-width: 480px) {
    margin-top: 20px;
  }
`;

const SocialTitle = styled.div`
  text-align: center;
  font-size: clamp(13px, 3.5vw, 14px);
  color: #6b7280;
  margin-bottom: clamp(16px, 4vw, 20px);
  position: relative;

  @media (max-width: 480px) {
    font-size: 13px;
    margin-bottom: 16px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: #e5e7eb;
    z-index: 1;
  }

  span {
    background: white;
    padding: 0 clamp(16px, 4vw, 20px);
    position: relative;
    z-index: 2;

    @media (max-width: 480px) {
      padding: 0 16px;
    }
  }
`;

const SocialButtons = styled.div`
  display: flex;
  gap: clamp(10px, 3vw, 12px);

  @media (max-width: 480px) {
    gap: 10px;
  }
`;

const SocialButton = styled.button`
  flex: 1;
  padding: clamp(10px, 3vw, 12px);
  border: 2px solid #e5e7eb;
  border-radius: clamp(8px, 2vw, 12px);
  background: white;
  color: #6b7280;
  font-size: clamp(13px, 3.5vw, 14px);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(6px, 2vw, 8px);

  @media (max-width: 480px) {
    padding: 10px;
    font-size: 13px;
    border-radius: 8px;
    gap: 6px;
  }

  &:hover {
    border-color: #1e40af;
    color: #1e40af;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(30, 64, 175, 0.15);
  }
`;

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'L\'adresse email est requise';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Veuillez entrer une adresse email valide';
    }

    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const result = await login(formData.email, formData.password);

      if (result.success) {
        console.log('Login successful:', result.data);
        navigate('/dashboard');
      } else {
        setErrors({ general: result.error || 'Email ou mot de passe incorrect' });
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ general: 'Erreur de connexion. Veuillez réessayer.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Social login with ${provider}`);
    // Implement social login logic here
  };

  return (
    <LoginPageContainer>
      <Header />
      <MainContent>
        <LoginCard
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <BackButton to="/">
            <FiArrowLeft />
            Retour à l'accueil
          </BackButton>

          <Title>Connexion</Title>
          <Subtitle>Connectez-vous à votre compte EducX</Subtitle>

          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Label>Adresse email</Label>
              <InputContainer>
                <InputIcon>
                  <FiMail />
                </InputIcon>
                <Input
                  type="email"
                  name="email"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={errors.email}
                />
              </InputContainer>
              {errors.email && (
                <ErrorMessage
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.email}
                </ErrorMessage>
              )}
            </InputGroup>

            <InputGroup>
              <Label>Mot de passe</Label>
              <InputContainer>
                <InputIcon>
                  <FiLock />
                </InputIcon>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Entrez votre mot de passe"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={errors.password}
                />
                <PasswordToggle
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </PasswordToggle>
              </InputContainer>
              <RememberForgot>
                <RememberMe>
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                  />
                  Se souvenir de moi
                </RememberMe>
                <ForgotPassword to="/forgot-password">
                  Mot de passe oublié ?
                </ForgotPassword>
              </RememberForgot>
              {errors.password && (
                <ErrorMessage
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.password}
                </ErrorMessage>
              )}
            </InputGroup>

            {errors.general && (
              <ErrorMessage
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {errors.general}
              </ErrorMessage>
            )}

            <SubmitButton
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <>
                  <LoadingSpinner />
                  Connexion...
                </>
              ) : (
                <>
                  <FiLogIn />
                  Se connecter
                </>
              )}
            </SubmitButton>

            <SocialLogin>
              <SocialTitle>
                <span>Ou connectez-vous avec</span>
              </SocialTitle>
              <SocialButtons>
                <SocialButton onClick={() => handleSocialLogin('google')}>
                  <FiUser />
                  Google
                </SocialButton>
                <SocialButton onClick={() => handleSocialLogin('facebook')}>
                  <FiUser />
                  Facebook
                </SocialButton>
              </SocialButtons>
            </SocialLogin>

            <RegisterPrompt>
              <RegisterText>Pas encore de compte ?</RegisterText>
              <RegisterLink to="/register">Créer un compte</RegisterLink>
            </RegisterPrompt>
          </Form>
        </LoginCard>
      </MainContent>
      <Footer />
    </LoginPageContainer>
  );
};

export default LoginPage;
