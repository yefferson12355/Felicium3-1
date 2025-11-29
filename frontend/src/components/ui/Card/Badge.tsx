import React from 'react';
import theme from '../../../core/styles/theme';

/**
 * Badge Component - Etiquetas y badges de estado
 * 
 * Props:
 * - variant: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
 * - size: 'small' | 'medium' | 'large'
 * - dot: boolean (mostrar punto indicador)
 * - removable: boolean (mostrar bot\u00f3n X para remover)
 * - onRemove: function
 */
const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'medium',
  dot = false,
  removable = false,
  onRemove,
  style = {},
  ...props 
}) => {
  const variants = {
    default: { 
      color: theme.colors.text.primary, 
      backgroundColor: theme.colors.neutral[100],
      border: `1px solid ${theme.colors.border.light}`,
    },
    primary: { 
      color: theme.colors.primary[700], 
      backgroundColor: theme.colors.primary[50],
      border: `1px solid ${theme.colors.primary[200]}`,
    },
    success: { 
      color: theme.colors.success[800], 
      backgroundColor: theme.colors.success[50],
      border: `1px solid ${theme.colors.success[200]}`,
    },
    warning: { 
      color: theme.colors.warning[800], 
      backgroundColor: theme.colors.warning[50],
      border: `1px solid ${theme.colors.warning[200]}`,
    },
    danger: { 
      color: theme.colors.error[700], 
      backgroundColor: theme.colors.error[50],
      border: `1px solid ${theme.colors.error[200]}`,
    },
    info: { 
      color: theme.colors.info[700], 
      backgroundColor: theme.colors.info[50],
      border: `1px solid ${theme.colors.info[200]}`,
    },
    neutral: { 
      color: theme.colors.text.secondary, 
      backgroundColor: theme.colors.neutral[200],
      border: `1px solid ${theme.colors.neutral[300]}`,
    },
  };

  const sizes = {
    small: { 
      fontSize: theme.typography.fontSize.xs, 
      padding: `${theme.spacing[1]} ${theme.spacing[2]}`,
      gap: theme.spacing[1],
    },
    medium: { 
      fontSize: theme.typography.fontSize.sm, 
      padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
      gap: theme.spacing[2],
    },
    large: { 
      fontSize: theme.typography.fontSize.base, 
      padding: `${theme.spacing[2]} ${theme.spacing[4]}`,
      gap: theme.spacing[2],
    },
  };

  const badgeStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: theme.borders.radius.base,
    fontWeight: theme.typography.fontWeight.medium,
    fontFamily: theme.typography.fontFamily.primary,
    whiteSpace: 'nowrap',
    ...variants[variant],
    ...sizes[size],
    ...style,
  };

  const dotStyles = {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  };

  const removeButtonStyles = {
    background: 'none',
    border: 'none',
    padding: 0,
    marginLeft: theme.spacing[1],
    cursor: 'pointer',
    color: 'currentColor',
    opacity: 0.7,
    fontSize: '14px',
    lineHeight: 1,
    display: 'flex',
    alignItems: 'center',
    transition: `opacity ${theme.transitions.duration.fast} ${theme.transitions.easing.easeOut}`,
  };

  const [removeHovered, setRemoveHovered] = React.useState(false);

  return (
    <span style={badgeStyles} {...props}>
      {dot && <span style={dotStyles} />}
      {children}
      {removable && onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          style={{
            ...removeButtonStyles,
            opacity: removeHovered ? 1 : 0.7,
          }}
          onMouseEnter={() => setRemoveHovered(true)}
          onMouseLeave={() => setRemoveHovered(false)}
          aria-label="Remover"
        >
          ×
        </button>
      )}
    </span>
  );
};

export { Badge };
export default Badge;