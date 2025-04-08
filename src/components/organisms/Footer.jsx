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
              Stay in the loop and sign up for the Wardiere newsletter:
            </p>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="newsletter-input"
              />
            </div>
          </div>
          
          <div className="footer-nav-section">
            <h3>NAVIGATION</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/solutions">Solutions</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/career">Career</Link></li>
            </ul>
          </div>
          
          <div className="footer-social-section">
            <h3>FOLLOW US</h3>
            <ul>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">Linkedin</a></li>
            </ul>
          </div>
          
          <div className="footer-utility-section">
            <h3>UTILITY PAGES</h3>
            <ul>
              <li><Link to="/licenses">Licenses</Link></li>
            </ul>
          </div>
        </div>
        
        {/* <div className="footer-divider"></div> */}
        
        <div className="footer-bottom">
          <div className="large-logo">GKSYAPI</div>
          <div className="copyright">@2025 All Rights Reserved</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 