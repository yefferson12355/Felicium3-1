import React from 'react';
import theme from '../../../core/styles/theme';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'spinner' | 'dots' | 'pulse';
  color?: string;
  fullscreen?: boolean;
  text?: string;
  style?: React.CSSProperties;
  [key: string]: any;
}

/**
 * Loader Component - Indicador de carga
 * 
 * Props:
 * - size: 'small' | 'medium' | 'large'
 * - variant: 'spinner' | 'dots' | 'pulse'
 * - color: string (default: primary)
 * - fullscreen: boolean (cubre toda la pantalla)
 * - text: string (mensaje opcional)
 */
const Loader: React.FC<LoaderProps> = ({ 
  size = 'medium',
  variant = 'spinner',
  color = theme.colors.primary,
  fullscreen = false,
  text,
  style = {},
  ...props 
}) => {
  // Validar size
  const validSize = ['small', 'medium', 'large'].includes(size) ? size : 'medium';
  
  const sizes = {
    small: { width: '20px', height: '20px', borderWidth: '2px' },
    medium: { width: '40px', height: '40px', borderWidth: '3px' },
    large: { width: '60px', height: '60px', borderWidth: '4px' },
  };

  const loaderColor = color || theme.colors.primary[500];

  // Asegurar que la animación esté definida
  React.useEffect(() => {
    if (!document.querySelector('#loader-animations')) {
      const styleSheet = document.createElement('style');
      styleSheet.id = 'loader-animations';
      styleSheet.textContent = `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        @keyframes dotFlashing {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `;
      document.head.appendChild(styleSheet);
    }
  }, []);

  const spinnerStyles: React.CSSProperties = {
    width: sizes[validSize].width,
    height: sizes[validSize].height,
    border: `${sizes[validSize].borderWidth} solid ${loaderColor}20`,
    borderTop: `${sizes[validSize].borderWidth} solid ${loaderColor}`,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  };

  const pulseStyles: React.CSSProperties = {
    width: sizes[validSize].width,
    height: sizes[validSize].height,
    backgroundColor: loaderColor,
    borderRadius: '50%',
    animation: 'pulse 1.5s ease-in-out infinite',
  };

  const dotsContainerStyles: React.CSSProperties = {
    display: 'flex',
    gap: theme.spacing[2],
    alignItems: 'center',
  };

  const dotStyles: React.CSSProperties = {
    width: `calc(${sizes[validSize].width} / 3)`,
    height: `calc(${sizes[validSize].width} / 3)`,
    backgroundColor: loaderColor,
    borderRadius: '50%',
    animation: 'dotFlashing 1.4s infinite',
  };

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing[4],
    ...(fullscreen ? {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: theme.colors.background.overlay,
      zIndex: theme.zIndex.modal,
    } : {}),
    ...style,
  };

  const textStyles: React.CSSProperties = {
    color: fullscreen ? theme.colors.text.inverse : theme.colors.text.secondary,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
  };

  const renderLoader = () => {
    switch (variant) {
      case 'dots':
        return (
          <div style={dotsContainerStyles}>
            <div style={dotStyles} />
            <div style={{ ...dotStyles, animationDelay: '0.2s' }} />
            <div style={{ ...dotStyles, animationDelay: '0.4s' }} />
          </div>
        );
      case 'pulse':
        return <div style={pulseStyles} />;
      case 'spinner':
      default:
        return <div style={spinnerStyles} />;
    }
  };

  return (
    <div style={containerStyles} {...props}>
      {renderLoader()}
      {text && <p style={textStyles}>{text}</p>}
    </div>
  );
};

export { Loader };
export default Loader;