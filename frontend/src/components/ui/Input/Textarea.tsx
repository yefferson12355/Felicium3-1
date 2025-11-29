import React from 'react';
import theme from '../../../core/styles/theme';

/**
 * Textarea Component - Área de texto multilinea
 */
const Textarea = ({ 
  label, 
  id, 
  value, 
  onChange,
  onFocus,
  onBlur,
  placeholder,
  helperText,
  error,
  size = 'medium',
  fullWidth = true,
  required = false, 
  disabled = false, 
  rows = 4,
  maxLength,
  showCharCount = false,
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

  const getBoxShadow = () => {
    if (error && isFocused) return theme.shadows.focusError;
    if (isFocused) return theme.shadows.focus;
    return 'none';
  };

  const textareaStyles = {
    width: '100%',
    ...sizes[size],
    border: `${theme.borders.width.thin} solid ${getBorderColor()}`,
    borderRadius: theme.borders.radius.base,
    fontSize: theme.typography.fontSize.base,
    fontFamily: theme.typography.fontFamily.primary,
    backgroundColor: disabled ? theme.colors.background.disabled : theme.colors.background.paper,
    color: disabled ? theme.colors.text.disabled : theme.colors.text.primary,
    resize: 'vertical',
    boxSizing: 'border-box',
    outline: 'none',
    transition: `all ${theme.transitions.duration.normal} ${theme.transitions.easing.easeOut}`,
    boxShadow: getBoxShadow(),
    lineHeight: theme.typography.lineHeight.normal,
  };

  const helperStyles = {
    display: 'flex',
    justifyContent: 'space-between',
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
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        rows={rows}
        maxLength={maxLength}
        style={textareaStyles}
        {...props}
      />
      {((helperText || error) || (showCharCount && maxLength)) && (
        <div style={helperStyles}>
          <span>{error || helperText || ''}</span>
          {showCharCount && maxLength && (
            <span style={{ color: theme.colors.text.tertiary }}>
              {value?.length || 0}/{maxLength}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Textarea;