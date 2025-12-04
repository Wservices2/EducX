import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import Header from '../components/Header';
import Footer from '../components/Footer';

const RegisterPageContainer = styled.div`
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

const RegisterCard = styled(motion.div)`
  background: white;
  border-radius: clamp(16px, 4vw, 24px);
  padding: clamp(32px, 7vw, 56px);
  width: 100%;
  max-width: 500px;
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
  padding: 16px 16px 16px 50px;
  border: 2px solid ${props => props.error ? '#ef4444' : '#e5e7eb'};
  border-radius: 12px;
  font-size: 16px;
  font-family: inherit;
  background: #f9fafb;
  transition: all 0.3s ease;

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

const PasswordStrength = styled.div`
  margin-top: 8px;
`;

const StrengthBar = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 8px;
`;

const StrengthSegment = styled.div`
  height: 4px;
  flex: 1;
  border-radius: 2px;
  background: ${props => {
    if (props.strength === 'weak') return props.index < 1 ? '#ef4444' : '#e5e7eb';
    if (props.strength === 'medium') return props.index < 2 ? '#f59e0b' : '#e5e7eb';
    if (props.strength === 'strong') return props.index < 3 ? '#22c55e' : '#e5e7eb';
    return '#e5e7eb';
  }};
`;

const StrengthText = styled.div`
  font-size: 12px;
  color: ${props => {
    if (props.strength === 'weak') return '#ef4444';
    if (props.strength === 'medium') return '#f59e0b';
    if (props.strength === 'strong') return '#22c55e';
    return '#6b7280';
  }};
  font-weight: 600;
`;

const LoginPrompt = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e5e7eb;
`;

const LoginText = styled.span`
  color: #6b7280;
  font-size: 14px;
`;

const LoginLink = styled(Link)`
  color: #1e40af;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  transition: color 0.3s ease;

  &:hover {
    color: #1d4ed8;
    text-decoration: underline;
  }
`;

const RegisterPrompt = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e5e7eb;
`;

const RegisterText = styled.span`
  color: #6b7280;
  font-size: 14px;
  margin-right: 8px;
`;

const RegisterLink = styled.span`
  color: #1e40af;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  transition: color 0.3s ease;
  cursor: pointer;

  &:hover {
    color: #1d4ed8;
    text-decoration: underline;
  }
`;

const SubmitButton = styled(motion.button)`
  background: linear-gradient(135deg, #1e40af, #3b82f6);
  color: white;
  padding: 16px 32px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

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

const TermsText = styled.p`
  font-size: 12px;
  color: #6b7280;
  text-align: center;
  margin-top: 20px;
  line-height: 1.5;

  a {
    color: #1e40af;
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Check password strength
    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength < 2) setPasswordStrength('weak');
    else if (strength < 3) setPasswordStrength('medium');
    else setPasswordStrength('strong');
  };

  const validateForm = () => {
    const newError = {};

    if (!formData.firstName.trim()) {
      newError.firstName = 'Le prénom est requis';
    }

    if (!formData.lastName.trim()) {
      newError.lastName = 'Le nom est requis';
    }

    if (!formData.email.trim()) {
      newError.email = 'L\'adresse email est requise';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newError.email = 'Veuillez entrer une adresse email valide';
    }

    if (!formData.password) {
      newError.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 8) {
      newError.password = 'Le mot de passe doit contenir au moins 8 caractères';
    }

    if (!formData.confirmPassword) {
      newError.confirmPassword = 'Veuillez confirmer votre mot de passe';
    } else if (formData.password !== formData.confirmPassword) {
      newError.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    setErrors(newError);
    return Object.keys(newError).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Registration successful
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        console.log('Registration successful:', data);
        // Redirect to dashboard using React Router
        navigate('/dashboard');
      } else {
        // Handle registration error
        setErrors({ general: data.message || 'Une erreur est survenue' });
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ general: 'Erreur de connexion. Veuillez réessayer.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RegisterPageContainer>
      <Header />
      <MainContent>
        <RegisterCard
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <BackButton to="/">
            <FiArrowLeft />
            Retour à l'accueil
          </BackButton>

          <Title>Créer un compte</Title>
          <Subtitle>Rejoignez la communauté EducX et commencez votre apprentissage</Subtitle>

          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Label>Prénom</Label>
              <InputContainer>
                <InputIcon>
                  <FiUser />
                </InputIcon>
                <Input
                  type="text"
                  name="firstName"
                  placeholder="Entrez votre prénom"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  error={errors.firstName}
                />
              </InputContainer>
              {errors.firstName && (
                <ErrorMessage
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.firstName}
                </ErrorMessage>
              )}
            </InputGroup>

            <InputGroup>
              <Label>Nom</Label>
              <InputContainer>
                <InputIcon>
                  <FiUser />
                </InputIcon>
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Entrez votre nom"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  error={errors.lastName}
                />
              </InputContainer>
              {errors.lastName && (
                <ErrorMessage
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.lastName}
                </ErrorMessage>
              )}
            </InputGroup>

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
                  placeholder="Créez un mot de passe sécurisé"
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
              {formData.password && (
                <PasswordStrength>
                  <StrengthBar>
                    {[0, 1, 2].map(index => (
                      <StrengthSegment
                        key={index}
                        strength={passwordStrength}
                        index={index}
                      />
                    ))}
                  </StrengthBar>
                  <StrengthText strength={passwordStrength}>
                    {passwordStrength === 'weak' && 'Mot de passe faible'}
                    {passwordStrength === 'medium' && 'Mot de passe moyen'}
                    {passwordStrength === 'strong' && 'Mot de passe fort'}
                  </StrengthText>
                </PasswordStrength>
              )}
              {errors.password && (
                <ErrorMessage
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.password}
                </ErrorMessage>
              )}
            </InputGroup>

            <InputGroup>
              <Label>Confirmer le mot de passe</Label>
              <InputContainer>
                <InputIcon>
                  <FiLock />
                </InputIcon>
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirmez votre mot de passe"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  error={errors.confirmPassword}
                />
                <PasswordToggle
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </PasswordToggle>
              </InputContainer>
              {errors.confirmPassword && (
                <ErrorMessage
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.confirmPassword}
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
                  Création du compte...
                </>
              ) : (
                <>
                  <FiCheckCircle />
                  Créer mon compte
                </>
              )}
            </SubmitButton>

            <RegisterPrompt>
              <RegisterText>Déjà un compte ?</RegisterText>
              <RegisterLink onClick={() => navigate('/login')}>Se connecter</RegisterLink>
            </RegisterPrompt>

            <TermsText>
              En créant un compte, vous acceptez nos{' '}
              <Link to="/conditions-d-utilisation">Conditions d'utilisation</Link> et notre{' '}
              <Link to="/politique-de-confidentialite">Politique de confidentialité</Link>
            </TermsText>
          </Form>
        </RegisterCard>
      </MainContent>
      <Footer />
    </RegisterPageContainer>
  );
};

export default RegisterPage;
