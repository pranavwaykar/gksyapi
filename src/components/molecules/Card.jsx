import React from 'react';
import '../../styles/molecules/card.scss';

const Card = ({
  title,
  children,
  className = '',
  variant = 'default',
  onClick
}) => {
  return (
    <div
      className={`card card-${variant} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : 'article'}
      tabIndex={onClick ? 0 : undefined}
    >
      {title && <h3 className="card-title">{title}</h3>}
      <div className="card-content">{children}</div>
    </div>
  );
};

export default Card; 