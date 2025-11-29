import React from 'react';

const TextareaInput = ({ 
  label, 
  name, 
  value, 
  onChange, 
  placeholder, 
  required = false,
  minHeight = '80px',
  style = {}
}) => {
  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{
        display: 'block',
        marginBottom: '4px',
        color: '#172B4D',
        fontSize: '14px',
        fontWeight: 500
      }}>
        {label} {required && <span style={{ color: '#FF5630' }}>*</span>}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '8px',
          border: '1px solid #DFE1E6',
          borderRadius: '3px',
          fontSize: '14px',
          minHeight: minHeight,
          resize: 'vertical',
          ...style
        }}
        required={required}
      />
    </div>
  );
};

export default TextareaInput;