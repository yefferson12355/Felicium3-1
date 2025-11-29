import React from 'react';
import theme from '../../../core/styles/theme';

/**
 * Footer - Pie de página de la aplicación
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerStyles: React.CSSProperties = {
    backgroundColor: theme.colors.background.paper,
    padding: `${theme.spacing[5]} ${theme.spacing[7]}`,
    borderTop: `${theme.borders.width.thin} solid ${theme.colors.border.light}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.tertiary,
    flexShrink: 0,
    gap: theme.spacing[5],
    flexWrap: 'wrap',
  };

  const linkStyles: React.CSSProperties = {
    color: theme.colors.text.link,
    textDecoration: 'none',
    transition: `color ${theme.transitions.duration.fast} ${theme.transitions.easing.easeOut}`,
  };

  return (
    <footer style={footerStyles} className="footer">
      <div style={{ display: 'flex', gap: theme.spacing[3], alignItems: 'center' }}>
        <span>Clínica Dental Felicium © {currentYear}</span>
        <span style={{ color: theme.colors.border.default }}>|</span>
        <a 
          href="#/privacidad" 
          style={linkStyles}
          onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.color = theme.colors.text.linkHover}
          onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.color = theme.colors.text.link}
        >
          Privacidad
        </a>
        <span style={{ color: theme.colors.border.default }}>|</span>
        <a 
          href="#/terminos" 
          style={linkStyles}
          onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.color = theme.colors.text.linkHover}
          onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.color = theme.colors.text.link}
        >
          Términos
        </a>
      </div>
      <div>
        <span>📍 Av. Los Dientes 123, Lima</span>
        <span style={{ marginLeft: theme.spacing[4] }}>📞 (01) 234-5678</span>
      </div>
    </footer>
  );
};

export default Footer;