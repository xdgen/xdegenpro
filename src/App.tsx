import React, { useState } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthModal from './components/auth/AuthModal';
import AppRoutes from './routes/AppRoutes';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <MainApp />
      </BrowserRouter>
    </AuthProvider>
  );
};

const MainApp: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const [authModalOpen, setAuthModalOpen] = useState(true);
  const [authMode, setAuthMode] = useState<"login" | "register" | "verify" | "emailCheck">(
    "login"
  );


  if (loading) return <div>Loading...</div>;

  const isLandingPage = location.pathname === "/";

  return (
    <>
      {isLandingPage && !isAuthenticated && (
        <AuthModal
          open={authModalOpen}
          mode={authMode}
          onClose={() => setAuthModalOpen(false)}
          onSwitchMode={setAuthMode}
        />
      )}
      <AppRoutes />
    </>
  );
};

export default App;
