import React from 'react';
import theme from '../../../core/styles/theme';

/**
 * Button Component - Sistema de diseño profesional
 * 
 * Props:
 * - variant: 'primary' | 'secondary' | 'danger' | 'warning' | 'success' | 'ghost' | 'link'
 * - size: 'small' | 'medium' | 'large' | 'full'
 * - disabled: boolean
 * - loading: boolean
 * - icon: ReactNode (opcional)
 * - iconPosition: 'left' | 'right'
 */
const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium',
  fullWidth = false,
  disabled = false,
  loading = false,
  icon = null,
  iconPosition = 'left',
  type = 'button',
  style = {},
  ...restProps 
}) => {
  const isDisabled = disabled || loading;
  
  // Si fullWidth es true, usar size 'full'
  const actualSize = fullWidth ? 'full' : size;
  
  // Validar props
  const validVariant = ['primary', 'secondary', 'danger', 'warning', 'success', 'ghost', 'link'].includes(variant) ? variant : 'primary';
  const validSize = ['small', 'medium', 'large', 'full'].includes(actualSize) ? actualSize : 'medium';

  const buttonStyles: React.CSSProperties = {
    // Base styles (usando theme)
    base: {
      border: 'none',
      borderRadius: theme.borders.radius.base,
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      fontSize: theme.typography.fontSize.base,
      fontWeight: theme.typography.fontWeight.medium,
      fontFamily: theme.typography.fontFamily.primary,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      outline: 'none',
      transition: `all ${theme.transitions.duration.normal} ${theme.transitions.easing.easeOut}`,
      opacity: isDisabled ? theme.opacity.disabled : 1,
      position: 'relative' as const,
    },
    
    // Size variants
    sizes: {
      small: {
        padding: `${theme.spacing[2]} ${theme.spacing[4]}`,
        fontSize: theme.typography.fontSize.sm,
        gap: theme.spacing[2],
      },
      medium: {
        padding: `${theme.spacing[3]} ${theme.spacing[5]}`,
        fontSize: theme.typography.fontSize.base,
        gap: theme.spacing[3],
      },
      large: {
        padding: `${theme.spacing[4]} ${theme.spacing[6]}`,
        fontSize: theme.typography.fontSize.md,
        gap: theme.spacing[3],
      },
      full: {
        width: '100%',
        padding: `${theme.spacing[4]} ${theme.spacing[6]}`,
        fontSize: theme.typography.fontSize.base,
        gap: theme.spacing[3],
      }
    },
    
    // Variant styles
    variants: {
      primary: {
        backgroundColor: theme.colors.primary[500],
        color: theme.colors.text.inverse,
        boxShadow: theme.shadows.sm,
      },
      secondary: {
        backgroundColor: 'transparent',
        color: theme.colors.primary[500],
        border: `${theme.borders.width.thin} solid ${theme.colors.primary[500]}`,
      },
      danger: {
        backgroundColor: theme.colors.error[500],
        color: theme.colors.text.inverse,
        boxShadow: theme.shadows.sm,
      },
      warning: {
        backgroundColor: theme.colors.warning[500],
        color: theme.colors.neutral[1600],
        boxShadow: theme.shadows.sm,
      },
      success: {
        backgroundColor: theme.colors.success[500],
        color: theme.colors.text.inverse,
        boxShadow: theme.shadows.sm,
      },
      ghost: {
        backgroundColor: 'transparent',
        color: theme.colors.text.primary,
      },
      link: {
        backgroundColor: 'transparent',
        color: theme.colors.text.link,
        padding: 0,
      },
    },

    // Hover states (no aplicar si está disabled)
    hover: !isDisabled ? {
      primary: {
        backgroundColor: theme.colors.primary[600],
        transform: 'translateY(-1px)',
        boxShadow: theme.shadows.md,
      },
      secondary: {
        backgroundColor: theme.colors.primary[50],
        borderColor: theme.colors.primary[600],
      },
      danger: {
        backgroundColor: theme.colors.error[600],
        transform: 'translateY(-1px)',
        boxShadow: theme.shadows.md,
      },
      warning: {
        backgroundColor: theme.colors.warning[600],
        transform: 'translateY(-1px)',
        boxShadow: theme.shadows.md,
      },
      success: {
        backgroundColor: theme.colors.success[600],
        transform: 'translateY(-1px)',
        boxShadow: theme.shadows.md,
      },
      ghost: {
        backgroundColor: theme.colors.background.hover,
      },
      link: {
        textDecoration: 'underline',
        color: theme.colors.text.linkHover,
      },
    } : {},
  };

  const finalStyles: React.CSSProperties = {
    ...buttonStyles.base,
    ...buttonStyles.sizes[validSize],
    ...buttonStyles.variants[validVariant],
    ...style,
  };

  // Handler con hover effect
  const [isHovered, setIsHovered] = React.useState(false);

  const hoverStyles = isHovered && !isDisabled 
    ? buttonStyles.hover[validVariant] 
    : {};

  return (
    <button
      type={type}
      style={{ ...finalStyles, ...hoverStyles }}
      onClick={!isDisabled ? onClick : undefined}
      disabled={isDisabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...restProps}
    >
      {loading && (
        <span style={{
          width: '14px',
          height: '14px',
          border: '2px solid transparent',
          borderTopColor: 'currentColor',
          borderRadius: '50%',
          animation: 'spin 0.6s linear infinite',
        }} />
      )}
      
      {!loading && icon && iconPosition === 'left' && (
        <span style={{ display: 'flex', alignItems: 'center' }}>
          {icon}
        </span>
      )}
      
      {children}
      
      {!loading && icon && iconPosition === 'right' && (
        <span style={{ display: 'flex', alignItems: 'center' }}>
          {icon}
        </span>
      )}
    </button>
  );
};

export default Button;