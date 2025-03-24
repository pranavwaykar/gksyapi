import React from 'react';
import '../../styles/organisms/header.scss';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';

const Header = ({
  logo,
  navigation = [],
  actions = [],
  className = ''
}) => {
  return (
    <header className={`header ${className}`}>
      <div className="header-left">
        {logo && (
          <a href="/" className="header-logo">
            {logo}
          </a>
        )}
      </div>
      
      <nav className="header-nav">
        {navigation.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className={`header-nav-item ${item.active ? 'active' : ''}`}
          >
            {item.icon && <Icon name={item.icon} />}
            {item.label}
          </a>
        ))}
      </nav>
      
      <div className="header-actions">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant={action.variant || 'ghost'}
            size="small"
            onClick={action.onClick}
          >
            {action.icon && <Icon name={action.icon} />}
            {action.label}
          </Button>
        ))}
      </div>
    </header>
  );
};

export default Header; 