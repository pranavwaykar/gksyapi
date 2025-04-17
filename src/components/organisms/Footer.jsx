import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../translations';
import '../../styles/components/footer.scss';

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-top">
          <div className="footer-logo-section">
            <div className="logo">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" fill="white" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="logo-text">GKSYAPI</span>
            </div>
            <p className="newsletter-text">
              {t.footer?.newsletter?.text || "Stay in the loop and sign up for the Wardiere newsletter:"}
            </p>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder={t.footer?.newsletter?.placeholder || "Enter your email"}
                className="newsletter-input"
              />
            </div>
          </div>
          
          <div className="footer-nav-section">
            <h3>{t.footer?.navigation?.title || "NAVIGATION"}</h3>
            <ul>
              <li><Link to="/">{t.footer?.navigation?.home || "Home"}</Link></li>
              <li><Link to="/about">{t.footer?.navigation?.about || "About"}</Link></li>
              <li><Link to="/solutions">{t.footer?.navigation?.solutions || "Solutions"}</Link></li>
              <li><Link to="/contact">{t.footer?.navigation?.contactUs || "Contact Us"}</Link></li>
              <li><Link to="/career">{t.footer?.navigation?.career || "Career"}</Link></li>
            </ul>
          </div>
          
          <div className="footer-social-section">
            <h3>{t.footer?.followUs?.title || "FOLLOW US"}</h3>
            <ul>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">{t.footer?.followUs?.instagram || "Instagram"}</a></li>
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">{t.footer?.followUs?.facebook || "Facebook"}</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">{t.footer?.followUs?.twitter || "Twitter"}</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">{t.footer?.followUs?.linkedin || "Linkedin"}</a></li>
            </ul>
          </div>
          
          <div className="footer-utility-section">
            <h3>{t.footer?.utilityPages?.title || "UTILITY PAGES"}</h3>
            <ul>
              <li><Link to="/licenses">{t.footer?.utilityPages?.licenses || "Licenses"}</Link></li>
            </ul>
          </div>
        </div>
        
        {/* <div className="footer-divider"></div> */}
        
        <div className="footer-bottom">
          <div className="large-logo">GKSYAPI</div>
          <div className="copyright">{t.footer?.copyright || "@2025 All Rights Reserved"}</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 