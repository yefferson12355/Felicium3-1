import React from 'react';

const TextInput = ({ 
  label, 
  name, 
  value, 
  onChange, 
  placeholder, 
  required = false, 
  type = 'text',
  style = {} 
}) => {
  return (
    <div>
      <label style={{
        display: 'block',
        marginBottom: '4px',
        color: '#172B4D',
        fontSize: '14px',
        fontWeight: 500
      }}>
        {label} {required && <span style={{ color: '#FF5630' }}>*</span>}
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
          border: '1px solid #DFE1E6',
          borderRadius: '3px',
          fontSize: '14px',
          ...style
        }}
        required={required}
      />
    </div>
  );
};

export default TextInput;