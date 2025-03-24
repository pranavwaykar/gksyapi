import React from 'react';
import '../../styles/organisms/footer.scss';
import Icon from '../atoms/Icon';

const Footer = ({
  logo,
  sections = [],
  socialLinks = [],
  copyright = '© 2024 Your Company. All rights reserved.',
  className = ''
}) => {
  return (
    <footer className={`footer ${className}`}>
      <div className="footer-content">
        <div className="footer-brand">
          {logo && (
            <a href="/" className="footer-logo">
              {logo}
            </a>
          )}
        </div>

        <div className="footer-sections">
          {sections.map((section, index) => (
            <div key={index} className="footer-section">
              <h3 className="footer-section-title">{section.title}</h3>
              <ul className="footer-section-links">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-social">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="footer-social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name={link.icon} />
            </a>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">{copyright}</p>
      </div>
    </footer>
  );
}; 