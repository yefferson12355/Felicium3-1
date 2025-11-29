import React from 'react';
import theme from '../../../core/styles/theme';

/**
 * Select Component - Dropdown con estilos consistentes
 */
const Select = ({ 
  label, 
  id, 
  value, 
  onChange,
  onFocus,
  onBlur,
  options = [], 
  placeholder = 'Seleccionar...',
  helperText,
  error,
  size = 'medium',
  fullWidth = true,
  required = false, 
  disabled = false, 
  style = {},
  ...props 
}) => {
  const [isFocused, setIsFocused] = React.useState(false);

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
    if (isFocused) return theme.colors.border.focus;
    return theme.colors.border.default;
  };

  const selectStyles = {
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
    cursor: disabled ? 'not-allowed' : 'pointer',
  };

  const helperStyles = {
    display: 'block',
    fontSize: theme.typography.fontSize.xs,
    marginTop: theme.spacing[2],
    color: error ? theme.colors.error[500] : theme.colors.text.tertiary,
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
      <select
        id={id}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        required={required}
        style={selectStyles}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option, index) => (
          <option key={index} value={option.value || option}>
            {option.label || option}
          </option>
        ))}
      </select>
      {(helperText || error) && (
        <span style={helperStyles}>{error || helperText}</span>
      )}
    </div>
  );
};

export default Select;