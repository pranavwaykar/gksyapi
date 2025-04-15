import React, { useState } from 'react';
import '../styles/components/contactForm.scss';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const ContactForm = ({ jobTitle }) => {
  const { language } = useLanguage();
  const t = translations[language];
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    contactReason: {
      webDesign: false,
      mobileAppDesign: false,
      collaboration: false,
      others: false
    },
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      contactReason: {
        ...formData.contactReason,
        [name]: checked
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="contact-form-container">
      <div className="contact-info">
        <div className="info-item">
          <div className="info-content">
            <p className="info-label">Email</p>
            <p className="info-value">info@gksyapi.com</p>
          </div>
          <a href="mailto:hello@company.com" className="info-arrow">
            <FontAwesomeIcon icon={faArrowRight} />
          </a>
        </div>
        
        <div className="info-item">
          <div className="info-content">
            <p className="info-label">Phone</p>
            <p className="info-value">0532 343 18 18</p>
          </div>
          <a href="tel:+15550000000" className="info-arrow">
          <FontAwesomeIcon icon={faArrowRight} />
          </a>
        </div>
        
        <div className="info-item">
          <div className="info-content">
            <p className="info-label">Location</p>
            <p className="info-value">Yavuz Selim District 1000. Street Bagcilar, Istanbul</p>
          </div>
          <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="info-arrow">
          <FontAwesomeIcon icon={faArrowRight} />
          </a>
        </div>
        
      </div>
      
      <div className="contact-form">
        <form onSubmit={handleSubmit}>
          {jobTitle && (
            <div className="form-group">
              <input type="text" name="position" value={`Position: ${jobTitle}`} readOnly />
            </div>
          )}
          
          <div className="form-row">
            <div className="form-group">
              <input type="text" name="firstName" placeholder="First Name" required />
            </div>
            <div className="form-group">
              <input type="text" name="lastName" placeholder="Last Name" required />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <input type="email" name="email" placeholder="Email Address" required />
            </div>
            <div className="form-group">
              <input type="tel" name="phone" placeholder="Phone Number" />
            </div>
          </div>
          
          <div className="form-group">
            <textarea name="message" placeholder="Tell us about your experience and why you're interested in this position" required></textarea>
          </div>
          
          <div className="form-group">
            <p className="checkbox-label">Upload your CV/Resume:</p>
            <input type="file" name="resume" accept=".pdf,.doc,.docx" required />
          </div>
          
          <button type="submit" className="send-button">Apply</button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm; 