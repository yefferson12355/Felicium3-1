import React from 'react';

const InputField = ({
  label,
  name,
  value,
  onChange,
  error,
  type = 'text',
  placeholder = '',
  required = false,
  style,
  ...props
}) => {
  const isRequired = required || label.includes('*');

  return (
    <div style={style}>
      <label style={{
        display: 'block',
        marginBottom: '4px',
        color: '#172B4D',
        fontSize: '14px',
        fontWeight: 500
      }}>
        {label} {isRequired && '*'}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '8px',
          border: error ? '1px solid #DE350B' : '1px solid #DFE1E6',
          borderRadius: '3px',
          fontSize: '14px',
          boxSizing: 'border-box'
        }}
        {...props}
      />
      {error && <div style={{ color: '#DE350B', fontSize: '12px', marginTop: '4px' }}>{error}</div>}
    </div>
  );
};

export default InputField;