import React, { useState, useEffect } from 'react';
import theme from '../../../core/styles/theme';
import Icon from '../../Icon';

/**
 * Sidebar - Menú lateral de navegación
 * 
 * Características:
 * - Menú contextual por rol
 * - Estados activo/hover
 * - Responsive (colapsable en móvil)
 * - Overlay en móvil
 */
const Sidebar = ({ 
  role = 'paciente',
  isOpen = true,
  onClose,
  isMobile = false
}) => {
  const [activeItem, setActiveItem] = useState('panel');
  const [hoveredItem, setHoveredItem] = useState(null);

  // Detectar item activo basado en la URL
  useEffect(() => {
    const detectActiveItem = () => {
      const hash = window.location.hash.replace('#', '');
      const parts = hash.split('/');
      
      if (parts.length > 1) {
        const section = parts[1];
        setActiveItem(section || 'panel');
      } else {
        setActiveItem('panel');
      }
    };

    detectActiveItem();
    window.addEventListener('hashchange', detectActiveItem);
    return () => window.removeEventListener('hashchange', detectActiveItem);
  }, []);

  // Role-based menu options
  const getMenuOptions = () => {
    const commonOptions = [];

    // Add 'panel' and 'citas' options for non-admin roles only
    if (role !== 'admin') {
      commonOptions.push({ id: 'panel', text: 'Panel', icon: 'dashboard' });
      commonOptions.push({ id: 'citas', text: 'Citas', icon: 'citas' });
    }

    // Role-specific options
    let roleSpecificOptions = [];
    switch (role) {
      case 'paciente':
        roleSpecificOptions = [
          { id: 'pagos', text: 'Pagos', icon: 'ibm--bluepay' }
        ];
        break;
      case 'recepcionista':
        roleSpecificOptions = [
          { id: 'pacientes', text: 'Pacientes', icon: 'pacientes' }
        ];
        break;
      case 'dentista':
        roleSpecificOptions = [
          { id: 'pacientes', text: 'Mis Pacientes', icon: 'pacientes' },
          { id: 'odontograma', text: 'Odontograma', icon: 'ibm--lpa' }
        ];
        break;
      case 'admin':
        roleSpecificOptions = [
          { id: 'dashboard', text: 'Dashboard', icon: 'dashboard' },
          { id: 'reportes', text: 'Reportes', icon: 'reports' },
          { id: 'staff', text: 'Gestión Staff', icon: 'staf' },
          { id: 'configuracion', text: 'Configuración', icon: 'settings' }
        ];
        break;
      default:
        roleSpecificOptions = [];
    }

    return [...commonOptions, ...roleSpecificOptions];
  };

  const menuOptions = getMenuOptions();

  const handleItemClick = (id) => {
    setActiveItem(id);
    if (isMobile && onClose) {
      onClose();
    }

    // Navigate to the selected view
    const currentHash = window.location.hash;
    let rolePrefix = role;

    // Special handling for dentista/doctor
    if (role === 'dentista') {
      rolePrefix = currentHash.startsWith('#doctor') ? 'doctor' : 'dentista';
    }

    let targetHash;
    if (id === 'panel' || id === 'dashboard') {
      targetHash = `#${rolePrefix}`;
    } else if (id === 'mis_pacientes') {
      targetHash = `#${rolePrefix}/pacientes`;
    } else {
      targetHash = `#${rolePrefix}/${id}`;
    }

    window.location.hash = targetHash;
  };

  const SIDEBAR_WIDTH = '260px';

  const sidebarStyles: React.CSSProperties = {
    position: 'fixed' as const,
    top: '60px',
    left: 0,
    bottom: 0,
    width: SIDEBAR_WIDTH,
    backgroundColor: theme.colors.background.paper,
    borderRight: `${theme.borders.width.thin} solid ${theme.colors.border.light}`,
    display: 'flex',
    flexDirection: 'column',
    zIndex: theme.zIndex.fixed,
    transform: isMobile && !isOpen ? `translateX(-${SIDEBAR_WIDTH})` : 'translateX(0)',
    transition: `transform ${theme.transitions.duration.normal} ${theme.transitions.easing.easeOut}`,
    boxShadow: isMobile && isOpen ? theme.shadows.lg : 'none',
  };

  const navStyles: React.CSSProperties = {
    padding: `${theme.spacing[4]} 0`,
    flex: 1,
    overflowY: 'auto',
  };

  const menuListStyles: React.CSSProperties = {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  };

  const getItemStyles = (id) => {
    const isActive = activeItem === id;
    const isHovered = hoveredItem === id;

    return {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing[3],
      padding: `${theme.spacing[3]} ${theme.spacing[5]}`,
      margin: `0 ${theme.spacing[3]}`,
      textDecoration: 'none',
      color: isActive ? theme.colors.primary[600] : theme.colors.text.primary,
      backgroundColor: isActive 
        ? theme.colors.primary[50] 
        : isHovered 
          ? theme.colors.background.hover 
          : 'transparent',
      borderRadius: theme.borders.radius.base,
      fontSize: theme.typography.fontSize.base,
      fontWeight: isActive 
        ? theme.typography.fontWeight.semibold 
        : theme.typography.fontWeight.normal,
      cursor: 'pointer',
      transition: `all ${theme.transitions.duration.fast} ${theme.transitions.easing.easeOut}`,
      border: isActive 
        ? `${theme.borders.width.thin} solid ${theme.colors.primary[200]}` 
        : `${theme.borders.width.thin} solid transparent`,
    };
  };

  const iconWrapperStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
  };

  const overlayStyles: React.CSSProperties = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.background.overlay,
    zIndex: theme.zIndex.modalBackdrop,
    display: isMobile && isOpen ? 'block' : 'none',
  };

  return (
    <>
      {/* Sidebar */}
      <aside style={sidebarStyles} className="sidebar">
        <nav style={navStyles}>
          <ul style={menuListStyles}>
            {menuOptions.map((option) => (
              <li key={option.id} style={{ marginBottom: theme.spacing[1] }}>
                <div
                  onClick={() => handleItemClick(option.id)}
                  onMouseEnter={() => setHoveredItem(option.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  style={getItemStyles(option.id)}
                >
                  <span style={iconWrapperStyles}>
                    <Icon name={option.icon} size={20} />
                  </span>
                  <span>{option.text}</span>
                </div>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer info */}
        <div style={{
          padding: theme.spacing[5],
          borderTop: `${theme.borders.width.thin} solid ${theme.colors.border.light}`,
          fontSize: theme.typography.fontSize.xs,
          color: theme.colors.text.tertiary,
          textAlign: 'center',
        }}>
          <p style={{ margin: 0 }}>Felicium v3.0</p>
          <p style={{ margin: `${theme.spacing[1]} 0 0` }}>© 2025</p>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div 
          style={overlayStyles} 
          onClick={onClose}
          className="sidebar-overlay"
        />
      )}
    </>
  );
};

export default Sidebar;
