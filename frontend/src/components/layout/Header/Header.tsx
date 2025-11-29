import React, { useState, useEffect } from 'react';
import theme from '../../../core/styles/theme';
import { useAuth } from '../../../core/contexts/AuthContext';
import { getRoleLabel, getInitials } from '../../../core/utils/roleMapper';

/**
 * Header - Barra superior de navegación
 * 
 * Incluye:
 * - Logo y nombre de la clínica
 * - Información del usuario y rol
 * - Menú desplegable de perfil
 * - Botón para toggle del sidebar (móvil)
 */
const Header = ({ 
  role = 'paciente', 
  userName = 'Usuario',
  isSidebarOpen = true,
  onToggleSidebar,
  isMobile = false
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { logout } = useAuth();

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.user-dropdown')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isDropdownOpen]);

  // Handle logout
  const handleLogout = () => {
    console.log('🚪 Cerrando sesión...');
    logout();
    setIsDropdownOpen(false);
    window.location.hash = '#/login';
  };

  const headerStyles: React.CSSProperties = {
    backgroundColor: theme.colors.background.paper,
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    padding: `0 ${theme.spacing[6]}`,
    justifyContent: 'space-between',
    boxShadow: theme.shadows.sm,
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    zIndex: theme.zIndex.sticky,
    borderBottom: `${theme.borders.width.thin} solid ${theme.colors.border.light}`,
  };

  const logoSectionStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing[4],
  };

  const logoStyles: React.CSSProperties = {
    width: '40px',
    height: '40px',
    backgroundColor: theme.colors.primary[500],
    borderRadius: theme.borders.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: theme.shadows.sm,
  };

  const logoTextStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.inverse,
    letterSpacing: '1px',
  };

  const brandTextStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    display: isMobile ? 'none' : 'block',
  };

  const roleInfoStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing[2],
    padding: `${theme.spacing[2]} ${theme.spacing[4]}`,
    backgroundColor: theme.colors.background.selected,
    borderRadius: theme.borders.radius.base,
    border: `${theme.borders.width.thin} solid ${theme.colors.primary[200]}`,
  };

  const roleTextStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.primary[700],
  };

  const userSectionStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing[4],
  };

  const toggleButtonStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    borderRadius: theme.borders.radius.base,
    color: theme.colors.text.secondary,
    transition: `all ${theme.transitions.duration.fast} ${theme.transitions.easing.easeOut}`,
  };

  const [toggleHovered, setToggleHovered] = useState(false);

  const userButtonStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing[3],
    padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    borderRadius: theme.borders.radius.base,
    transition: `all ${theme.transitions.duration.fast} ${theme.transitions.easing.easeOut}`,
  };

  const [userHovered, setUserHovered] = useState(false);

  const avatarStyles: React.CSSProperties = {
    width: '36px',
    height: '36px',
    borderRadius: theme.borders.radius.full,
    backgroundColor: theme.colors.primary[500],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colors.text.inverse,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.bold,
    border: `2px solid ${theme.colors.primary[200]}`,
  };

  const userNameStyles: React.CSSProperties = {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.primary,
    display: isMobile ? 'none' : 'block',
  };

  const dropdownStyles: React.CSSProperties = {
    position: 'absolute' as const as const,
    top: 'calc(100% + 8px)',
    right: 0,
    backgroundColor: theme.colors.background.paper,
    borderRadius: theme.borders.radius.md,
    boxShadow: theme.shadows.lg,
    minWidth: '220px',
    zIndex: theme.zIndex.dropdown,
    border: `${theme.borders.width.thin} solid ${theme.colors.border.light}`,
    overflow: 'hidden' as const as const,
    animation: 'slideInFromTop 0.2s ease-out',
  };

  const menuItemStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing[3],
    width: '100%',
    padding: `${theme.spacing[3]} ${theme.spacing[4]}`,
    textAlign: 'left',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.primary,
    transition: `background-color ${theme.transitions.duration.fast} ${theme.transitions.easing.easeOut}`,
  };

  const logoutItemStyles: React.CSSProperties = {
    ...menuItemStyles,
    color: theme.colors.error[600],
    fontWeight: theme.typography.fontWeight.medium,
    borderTop: `${theme.borders.width.thin} solid ${theme.colors.border.light}`,
  };

  return (
    <header style={headerStyles}>
      {/* Left section: Toggle + Logo */}
      <div style={logoSectionStyles}>
        {isMobile && (
          <button
            onClick={onToggleSidebar}
            style={{
              ...toggleButtonStyles,
              backgroundColor: toggleHovered ? theme.colors.background.hover : 'transparent',
            }}
            onMouseEnter={() => setToggleHovered(true)}
            onMouseLeave={() => setToggleHovered(false)}
            aria-label="Toggle sidebar"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="currentColor"/>
            </svg>
          </button>
        )}
        
        <div style={logoStyles}>
          <span style={logoTextStyles}>CD</span>
        </div>
        
        <span style={brandTextStyles}>Clínica Dental Felicium</span>
        
        {!isMobile && (
          <div style={roleInfoStyles}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 8a3 3 0 100-6 3 3 0 000 6zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            <span style={roleTextStyles}>{getRoleLabel(role)}</span>
          </div>
        )}
      </div>

      {/* Right section: User menu */}
      <div style={userSectionStyles}>
        <div style={{ position: 'relative' as const }} className="user-dropdown">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            style={{
              ...userButtonStyles,
              backgroundColor: userHovered || isDropdownOpen 
                ? theme.colors.background.hover 
                : 'transparent',
            }}
            onMouseEnter={() => setUserHovered(true)}
            onMouseLeave={() => setUserHovered(false)}
          >
            <div style={avatarStyles}>
              {getInitials(userName)}
            </div>
            <span style={userNameStyles}>{userName}</span>
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 20 20" 
              fill="none"
              style={{
                transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0)',
                transition: `transform ${theme.transitions.duration.normal} ${theme.transitions.easing.easeOut}`,
              }}
            >
              <path d="M5 7l5 5 5-5H5z" fill={theme.colors.text.tertiary}/>
            </svg>
          </button>

          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div style={dropdownStyles}>
              <button
                onClick={() => {
                  window.location.hash = `#${role}/perfil`;
                  setIsDropdownOpen(false);
                }}
                style={menuItemStyles}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.colors.background.hover}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                  <path d="M9 9c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                <span>Mi perfil</span>
              </button>
              
              <button
                onClick={handleLogout}
                style={logoutItemStyles}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.colors.error[50]}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                  <path d="M7 13l-4-4 4-4v3h8v2H7v3zm10-9v12c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2z"/>
                </svg>
                <span>Cerrar sesión</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
