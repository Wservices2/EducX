import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './components/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ContactPage from './pages/ContactPage';
import Dashboard from './pages/Dashboard';
import InboxPage from './pages/InboxPage';
import ClassroomPage from './pages/ClassroomPage';
import SubscriptionPage from './pages/SubscriptionPage';
import CoursesPage from './pages/CoursesPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import Mathematiques6emePage from './pages/Mathematiques6emePage';
import Francais6emePage from './pages/Francais6emePage';
import Histoire6emePage from './pages/Histoire6emePage';
import PhysiqueChimie2ndePage from './pages/PhysiqueChimie2ndePage';
import SVT2ndePage from './pages/SVT2ndePage';
import PhilosophieTerminalePage from './pages/PhilosophieTerminalePage';
import Header from './components/Header';
import Footer from './components/Footer';
import SiteLoader from './components/SiteLoader';
import GlobalTranslator from './components/GlobalTranslator';

// Styles globaux
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.6;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  html[data-theme='dark'] body {
    background: #0b1220;
    color: #e5e7eb;
  }

  /* Force dark mode globally, including pages that still contain hardcoded light styles */
  html[data-theme='dark'] #root {
    filter: invert(1) hue-rotate(180deg);
    background: #0b1220;
    min-height: 100vh;
  }

  html[data-theme='dark'] img,
  html[data-theme='dark'] video,
  html[data-theme='dark'] canvas,
  html[data-theme='dark'] iframe {
    filter: invert(1) hue-rotate(180deg);
  }

  /* Use this class on elements that must keep original colors in dark mode. */
  html[data-theme='dark'] .no-dark-invert {
    filter: invert(1) hue-rotate(180deg);
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
  }

  ul, ol {
    list-style: none;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background};
  transition: background-color 0.3s ease;
`;

const MainContent = styled.main`
  flex: 1;
`;

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const minimumLoaderTime = 1900;
    const start = Date.now();

    const hideLoader = () => {
      const elapsed = Date.now() - start;
      const delay = Math.max(0, minimumLoaderTime - elapsed);
      window.setTimeout(() => setIsLoading(false), delay);
    };

    if (document.readyState === 'complete') {
      hideLoader();
      return undefined;
    }

    window.addEventListener('load', hideLoader, { once: true });
    return () => window.removeEventListener('load', hideLoader);
  }, []);

  if (isLoading) {
    return (
      <ThemeProvider>
        <GlobalStyle />
        <SiteLoader />
      </ThemeProvider>
    );
  }

  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <GlobalStyle />
          <GlobalTranslator />
          <AppContainer>
            <Routes>
              {/* Route publique avec Header et Footer */}
              <Route path="/" element={
                <>
                  <Header />
                  <MainContent>
                    <HomePage />
                  </MainContent>
                  <Footer />
                </>
              } />

              {/* Routes d'authentification sans Header/Footer */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Routes protégées */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />

              <Route path="/inbox" element={
                <ProtectedRoute>
                  <InboxPage />
                </ProtectedRoute>
              } />

              <Route path="/classroom" element={
                <ProtectedRoute>
                  <ClassroomPage />
                </ProtectedRoute>
              } />

              <Route path="/subscription" element={
                <ProtectedRoute>
                  <SubscriptionPage />
                </ProtectedRoute>
              } />

              <Route path="/courses" element={
                <ProtectedRoute>
                  <CoursesPage />
                </ProtectedRoute>
              } />

              <Route path="/profile" element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } />

              <Route path="/settings" element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              } />

              {/* Routes des matières */}
              <Route path="/mathematiques-6eme" element={
                <ProtectedRoute>
                  <Mathematiques6emePage />
                </ProtectedRoute>
              } />

              <Route path="/francais-6eme" element={
                <ProtectedRoute>
                  <Francais6emePage />
                </ProtectedRoute>
              } />

              <Route path="/histoire-6eme" element={
                <ProtectedRoute>
                  <Histoire6emePage />
                </ProtectedRoute>
              } />

              <Route path="/physique-chimie-2nde" element={
                <ProtectedRoute>
                  <PhysiqueChimie2ndePage />
                </ProtectedRoute>
              } />

              <Route path="/svt-2nde" element={
                <ProtectedRoute>
                  <SVT2ndePage />
                </ProtectedRoute>
              } />

              <Route path="/philosophie-terminale" element={
                <ProtectedRoute>
                  <PhilosophieTerminalePage />
                </ProtectedRoute>
              } />

              {/* Page contact publique */}
              <Route path="/contact" element={
                <>
                  <Header />
                  <MainContent>
                    <ContactPage />
                  </MainContent>
                  <Footer />
                </>
              } />

              {/* Route pour les utilisateurs non autorisés */}
              <Route path="/unauthorized" element={
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100vh',
                  flexDirection: 'column',
                  gap: '20px'
                }}>
                  <h1>Accès non autorisé</h1>
                  <p>Vous n'avez pas les permissions nécessaires pour accéder à cette page.</p>
                  <a href="/" style={{ color: '#1e40af' }}>Retour à l'accueil</a>
                </div>
              } />
            </Routes>
          </AppContainer>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
