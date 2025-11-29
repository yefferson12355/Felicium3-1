import React, { useEffect, useState } from 'react';
import { HashRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from './core/contexts/AuthContext';
import { AppProvider } from './core/contexts/AppContext';
import { ThemeProvider } from './core/contexts/ThemeContext';
import { getRoleRoute } from './core/utils/roleMapper';
import Login from './features/auth/components/Login';
import LayoutBase from './components/layout/LayoutBase/LayoutBase';
import RoleBasedRouter from './routes/RoleBasedRouter';
import Loader from './components/ui/Loader/Loader';

// Dashboard Router - Renderiza dashboard según el rol y el hash
const DashboardRouter = () => {
  const { user, isAuthenticated } = useAuth();
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (!isAuthenticated || !user) {
    window.location.hash = '#/login';
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        <Loader text="Redirigiendo..." />
      </div>
    );
  }

  const roleLabel = getRoleRoute(user.role);
  const firstName = user.firstName || user.first_name || '';
  const lastName = user.lastName || user.last_name || '';

  return (
    <LayoutBase role={roleLabel} userName={`${firstName} ${lastName}`}>
      <RoleBasedRouter role={roleLabel} userName={`${firstName} ${lastName}`} />
    </LayoutBase>
  );
};

// Main App Component - CON HashRouter para soporte de hooks
function App() {
  const { isAuthenticated, loading } = useAuth();
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (loading) {
    return <Loader fullscreen text="Cargando aplicación..." />;
  }

  // Si el hash es login o vacío, mostrar login
  if (currentHash === '#/login' || currentHash === '' || currentHash === '#') {
    return <Login />;
  }

  // Si no está autenticado, enviar a login
  if (!isAuthenticated) {
    window.location.hash = '#/login';
    return <Loader fullscreen text="Redirigiendo a login..." />;
  }

  // Si está autenticado, mostrar dashboard
  return <DashboardRouter />;
}

// Wrapper with providers - ORDEN IMPORTANTE: ThemeProvider primero
function AppWrapper() {
  return (
    <HashRouter 
      future={{ 
        v7_startTransition: true,
        v7_relativeSplatPath: true 
      }}
    >
      <ThemeProvider>
        <AuthProvider>
          <AppProvider>
            <App />
          </AppProvider>
        </AuthProvider>
      </ThemeProvider>
    </HashRouter>
  );
}

export default AppWrapper;