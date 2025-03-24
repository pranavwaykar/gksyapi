import React from 'react';
import '../../styles/molecules/button-group.scss';
import Button from '../atoms/Button';

const ButtonGroup = ({
  buttons = [],
  variant = 'primary',
  size = 'medium',
  className = '',
  fullWidth = false
}) => {
  return (
    <div className={`button-group ${fullWidth ? 'button-group-full-width' : ''} ${className}`}>
      {buttons.map((button, index) => (
        <Button
          key={index}
          {...button}
          variant={button.variant || variant}
          size={button.size || size}
        />
      ))}
    </div>
  );
};

export default ButtonGroup; 