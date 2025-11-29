import React, { useState, useEffect } from 'react';
import theme from '../../../core/styles/theme';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';

/**
 * LayoutBase - Layout principal de la aplicación
 * 
 * Estructura:
 * - Header fijo en la parte superior
 * - Sidebar lateral (colapsable en móvil)
 * - Content area principal
 * - Footer
 */
const LayoutBase = ({ children, role: propRole = 'paciente', userName = 'Usuario' }) => {
  const [currentRole, setCurrentRole] = useState(propRole);
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    // Detectar tamaño de pantalla
    const checkMobile = () => {
      const mobile = window.innerWidth < parseInt(theme.breakpoints.md);
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile); // Auto-cerrar en móvil
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Listen for hash changes to potentially update role
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.includes('/')) {
        const [role] = hash.split('/');
        if (['paciente', 'recepcionista', 'dentista', 'admin', 'doctor'].includes(role)) {
          setCurrentRole(role === 'doctor' ? 'dentista' : role);
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const HEADER_HEIGHT = '60px';
  const SIDEBAR_WIDTH = '260px';

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: theme.colors.background.default,
  };

  const contentWrapperStyles: React.CSSProperties = {
    display: 'flex',
    flex: 1,
    marginTop: HEADER_HEIGHT,
    position: 'relative' as const,
  };

  const mainStyles: React.CSSProperties = {
    flex: 1,
    marginLeft: isMobile || !isSidebarOpen ? '0' : SIDEBAR_WIDTH,
    padding: isMobile ? theme.spacing[5] : theme.spacing[7],
    transition: `margin-left ${theme.transitions.duration.normal} ${theme.transitions.easing.easeOut}`,
    minHeight: `calc(100vh - ${HEADER_HEIGHT} - 80px)`, // 80px for footer
    backgroundColor: theme.colors.background.default,
  };

  return (
    <div style={containerStyles}>
      <Header 
        role={currentRole} 
        userName={userName}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isMobile={isMobile}
      />
      <div style={contentWrapperStyles}>
        <Sidebar 
          role={currentRole}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          isMobile={isMobile}
        />
        <main style={mainStyles} className="main-content">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default LayoutBase;