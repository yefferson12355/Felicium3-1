import React from 'react';

const SelectInput = ({ 
  label, 
  name, 
  value, 
  onChange, 
  options, 
  required = false,
  defaultValue = ""
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
      <select
        name={name}
        value={value}
        onChange={onChange}
        style={{
          width: '100%',
          padding: '8px',
          border: '1px solid #DFE1E6',
          borderRadius: '3px',
          fontSize: '14px'
        }}
        required={required}
      >
        <option value={defaultValue}>Seleccionar {label.toLowerCase()}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;