import React, { useEffect } from 'react';
import theme from '../../../core/styles/theme';

/**
 * Modal Component - Ventana modal con overlay
 * 
 * Props:
 * - isOpen: boolean
 * - onClose: function
 * - title: string
 * - footer: ReactNode (opcional)
 * - size: 'small' | 'medium' | 'large' | 'full'
 * - closeOnOverlayClick: boolean (default: true)
 * - showCloseButton: boolean (default: true)
 */
const Modal = ({ 
  isOpen, 
  onClose, 
  title,
  footer,
  children, 
  size = 'medium',
  closeOnOverlayClick = true,
  showCloseButton = true,
  style = {},
  ...props 
}) => {
  // Bloquear scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Cerrar con tecla ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen && onClose) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const overlayStyles = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.background.overlay,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: theme.zIndex.modal,
    padding: theme.spacing[5],
    animation: 'fadeIn 0.2s ease-out',
  };

  const sizes = {
    small: { width: '400px', maxWidth: '95vw' },
    medium: { width: '600px', maxWidth: '95vw' },
    large: { width: '800px', maxWidth: '95vw' },
    full: { width: '95vw', maxWidth: '1200px' },
  };

  const contentStyles = {
    backgroundColor: theme.colors.background.paper,
    borderRadius: theme.borders.radius.lg,
    ...sizes[size],
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: theme.shadows.overlay,
    animation: 'slideInFromTop 0.3s ease-out',
    ...style,
  };

  const headerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${theme.spacing[6]} ${theme.spacing[6]} ${theme.spacing[4]}`,
    borderBottom: `${theme.borders.width.thin} solid ${theme.colors.border.light}`,
  };

  const titleStyles = {
    margin: 0,
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
  };

  const closeBtnStyles = {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: theme.colors.text.tertiary,
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borders.radius.base,
    transition: `all ${theme.transitions.duration.fast} ${theme.transitions.easing.easeOut}`,
  };

  const [closeHovered, setCloseHovered] = React.useState(false);

  const bodyStyles = {
    padding: theme.spacing[6],
    overflowY: 'auto',
    flex: 1,
  };

  const footerStyles = {
    padding: `${theme.spacing[4]} ${theme.spacing[6]} ${theme.spacing[6]}`,
    borderTop: `${theme.borders.width.thin} solid ${theme.colors.border.light}`,
    display: 'flex',
    justifyContent: 'flex-end',
    gap: theme.spacing[3],
  };

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  return (
    <div style={overlayStyles} onClick={handleOverlayClick}>
      <div style={contentStyles} {...props}>
        {(title || showCloseButton) && (
          <div style={headerStyles}>
            {title && <h3 style={titleStyles}>{title}</h3>}
            {showCloseButton && onClose && (
              <button 
                onClick={onClose} 
                style={{
                  ...closeBtnStyles,
                  backgroundColor: closeHovered ? theme.colors.background.hover : 'transparent',
                }}
                onMouseEnter={() => setCloseHovered(true)}
                onMouseLeave={() => setCloseHovered(false)}
                aria-label="Cerrar modal"
              >
                ×
              </button>
            )}
          </div>
        )}
        <div style={bodyStyles}>
          {children}
        </div>
        {footer && (
          <div style={footerStyles}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;