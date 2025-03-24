import React from 'react';
import '../../styles/atoms/icon.scss';

const Icon = ({
  name,
  size = 'md',
  color = 'inherit',
  className = '',
  onClick
}) => {
  return (
    <span
      className={`icon icon-${name} icon-${size} ${className}`}
      style={{ color }}
      onClick={onClick}
      role="img"
      aria-label={name}
    />
  );
};

export default Icon; 