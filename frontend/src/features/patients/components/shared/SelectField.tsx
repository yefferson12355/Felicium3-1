import React, { CSSProperties, ReactNode } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  options?: SelectOption[];
  placeholder?: string;
  required?: boolean;
  style?: CSSProperties;
  children?: ReactNode;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  value,
  onChange,
  error,
  options = [],
  placeholder = '',
  required = false,
  style,
  children
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
      <select
        name={name}
        value={value}
        onChange={onChange}
        style={{
          width: '100%',
          padding: '8px',
          border: error ? '1px solid #DE350B' : '1px solid #DFE1E6',
          borderRadius: '3px',
          fontSize: '14px'
        }}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.length > 0
          ? options.map((option, index) => (
              <option key={option.value || index} value={option.value}>
                {option.label}
              </option>
            ))
          : children
        }
      </select>
      {error && <div style={{ color: '#DE350B', fontSize: '12px', marginTop: '4px' }}>{error}</div>}
    </div>
  );
};

export default SelectField;