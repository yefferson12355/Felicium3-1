import React from 'react';
import theme from '../../../core/styles/theme';

/**
 * Input Component - Campo de texto con estilos consistentes
 * 
 * Props:
 * - label: string
 * - helperText: string (texto de ayuda)
 * - error: string (mensaje de error)
 * - success: boolean (estado exitoso)
 * - size: 'small' | 'medium' | 'large'
 * - fullWidth: boolean
 */
const Input = ({ 
  label, 
  id, 
  type = 'text', 
  placeholder, 
  value, 
  onChange,
  onFocus,
  onBlur,
  helperText,
  error, 
  success = false,
  size = 'medium',
  fullWidth = true,
  required = false, 
  disabled = false, 
  style = {},
  ...restProps 
}) => {
  const [isFocused, setIsFocused] = React.useState(false);

  // Eliminar fullWidth de las props que se pasan al input DOM
  const { fullWidth: _, ...domProps } = restProps;

  const sizes = {
    small: {
      padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
      fontSize: theme.typography.fontSize.sm,
    },
    medium: {
      padding: `${theme.spacing[3]} ${theme.spacing[4]}`,
      fontSize: theme.typography.fontSize.base,
    },
    large: {
      padding: `${theme.spacing[4]} ${theme.spacing[5]}`,
      fontSize: theme.typography.fontSize.md,
    },
  };

  const containerStyles = {
    marginBottom: theme.spacing[5],
    width: fullWidth ? '100%' : 'auto',
  };

  const labelStyles = {
    display: 'block',
    marginBottom: theme.spacing[2],
    color: theme.colors.text.primary,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
  };

  const getBorderColor = () => {
    if (error) return theme.colors.border.error;
    if (success) return theme.colors.border.success;
    if (isFocused) return theme.colors.border.focus;
    return theme.colors.border.default;
  };

  const getBoxShadow = () => {
    if (error && isFocused) return theme.shadows.focusError;
    if (isFocused) return theme.shadows.focus;
    return 'none';
  };

  const inputStyles = {
    width: '100%',
    ...sizes[size],
    border: `${theme.borders.width.thin} solid ${getBorderColor()}`,
    borderRadius: theme.borders.radius.base,
    fontSize: theme.typography.fontSize.base,
    fontFamily: theme.typography.fontFamily.primary,
    backgroundColor: disabled ? theme.colors.background.disabled : theme.colors.background.paper,
    color: disabled ? theme.colors.text.disabled : theme.colors.text.primary,
    boxSizing: 'border-box',
    outline: 'none',
    transition: `all ${theme.transitions.duration.normal} ${theme.transitions.easing.easeOut}`,
    boxShadow: getBoxShadow(),
  };

  const helperStyles = {
    display: 'block',
    fontSize: theme.typography.fontSize.xs,
    marginTop: theme.spacing[2],
    color: error 
      ? theme.colors.error[500] 
      : success 
        ? theme.colors.success[500] 
        : theme.colors.text.tertiary,
  };

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <div style={{...containerStyles, ...style}}>
      {label && (
        <label htmlFor={id} style={labelStyles}>
          {label} {required && <span style={{ color: theme.colors.error[500] }}>*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        required={required}
        style={inputStyles}
        {...domProps}
      />
      {(helperText || error) && (
        <span style={helperStyles}>{error || helperText}</span>
      )}
    </div>
  );
};

export default Input;