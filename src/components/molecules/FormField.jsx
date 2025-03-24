import React from 'react';
import '../../styles/molecules/form-field.scss';
import Label from '../atoms/Label';
import Input from '../atoms/Input';

const FormField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  required = false,
  className = '',
  helperText
}) => {
  return (
    <div className={`form-field ${className}`}>
      <Label htmlFor={name} required={required}>
        {label}
      </Label>
      <Input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        error={error}
        required={required}
      />
      {helperText && !error && (
        <span className="helper-text">{helperText}</span>
      )}
    </div>
  );
};

export default FormField; 