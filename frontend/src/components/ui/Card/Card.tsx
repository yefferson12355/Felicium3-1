import React from 'react';
import theme from '../../../core/styles/theme';

/**
 * Card Component - Contenedor con elevación y bordes
 * 
 * Props:
 * - variant: 'default' | 'elevated' | 'outlined' | 'flat'
 * - padding: 'none' | 'small' | 'medium' | 'large'
 * - title: string (opcional)
 * - subtitle: string (opcional)
 * - hoverable: boolean - aplica efecto hover
 * - onClick: function (opcional)
 */
const Card = ({ 
  children, 
  title,
  subtitle,
  variant = 'default',
  padding = 'medium',
  hoverable = false,
  onClick,
  style = {},
  ...props 
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const variants = {
    default: {
      backgroundColor: theme.colors.background.paper,
      borderRadius: theme.borders.radius.lg,
      border: `${theme.borders.width.thin} solid ${theme.colors.border.default}`,
      boxShadow: theme.shadows.sm,
    },
    elevated: {
      backgroundColor: theme.colors.background.paper,
      borderRadius: theme.borders.radius.lg,
      border: 'none',
      boxShadow: theme.shadows.md,
    },
    outlined: {
      backgroundColor: theme.colors.background.paper,
      borderRadius: theme.borders.radius.lg,
      border: `${theme.borders.width.thin} solid ${theme.colors.border.default}`,
      boxShadow: 'none',
    },
    flat: {
      backgroundColor: theme.colors.background.paper,
      borderRadius: theme.borders.radius.lg,
      border: 'none',
      boxShadow: 'none',
    },
  };

  const paddings = {
    none: '0',
    small: theme.spacing[4],
    medium: theme.spacing[6],
    large: theme.spacing[8],
  };

  const cardStyles = {
    ...variants[variant],
    overflow: 'hidden' as const,
    transition: `all ${theme.transitions.duration.normal} ${theme.transitions.easing.easeOut}`,
    cursor: onClick ? 'pointer' : 'default',
    ...(hoverable && isHovered ? {
      transform: 'translateY(-2px)',
      boxShadow: theme.shadows.md,
    } : {}),
    ...style,
  };

  const headerStyles = {
    padding: `${theme.spacing[4]} ${paddings[padding]}`,
    backgroundColor: theme.colors.neutral[50],
    borderBottom: `${theme.borders.width.thin} solid ${theme.colors.border.light}`,
  };

  const titleStyles = {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    margin: 0,
  };

  const subtitleStyles = {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing[1],
  };

  const contentStyles = {
    padding: paddings[padding],
  };

  return (
    <div 
      style={cardStyles} 
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {(title || subtitle) && (
        <div style={headerStyles}>
          {title && <h3 style={titleStyles}>{title}</h3>}
          {subtitle && <p style={subtitleStyles}>{subtitle}</p>}
        </div>
      )}
      <div style={contentStyles}>
        {children}
      </div>
    </div>
  );
};

export default Card;