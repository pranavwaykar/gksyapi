import React, { useState } from 'react';
import '../styles/components/contactForm.scss';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

const ContactForm = () => {
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
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <div className="contact-form-container">
      <div className="contact-info">
        <div className="info-item">
          <div className="info-content">
            <p className="info-label">You can Email Me Here</p>
            <p className="info-value">jefferycannon@gmail.com</p>
          </div>
          <div className="info-arrow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        
        <div className="info-item">
          <div className="info-content">
            <p className="info-label">Give Me a Call on</p>
            <p className="info-value">+91 91813 23 2309</p>
          </div>
          <div className="info-arrow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        
        <div className="info-item">
          <div className="info-content">
            <p className="info-label">Location</p>
            <p className="info-value">Somewhere in the World</p>
          </div>
          <div className="info-arrow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        

      </div>
      
      <div className="contact-form">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <input 
                type="text" 
                id="firstName" 
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <input 
                type="text" 
                id="lastName" 
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <input 
                type="email" 
                id="email" 
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <input 
                type="tel" 
                id="phone" 
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <div className="form-group">
            <p className="checkbox-label">Why are you contacting us?</p>
            <div className="checkbox-group">
              <div className="checkbox-row">
                <div className="checkbox-item">
                  <input 
                    type="checkbox" 
                    id="webDesign" 
                    name="webDesign"
                    checked={formData.contactReason.webDesign}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="webDesign">Web Design</label>
                </div>
                <div className="checkbox-item">
                  <input 
                    type="checkbox" 
                    id="collaboration" 
                    name="collaboration"
                    checked={formData.contactReason.collaboration}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="collaboration">Collaboration</label>
                </div>
              </div>
              <div className="checkbox-row">
                <div className="checkbox-item">
                  <input 
                    type="checkbox" 
                    id="mobileAppDesign" 
                    name="mobileAppDesign"
                    checked={formData.contactReason.mobileAppDesign}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="mobileAppDesign">Mobile App Design</label>
                </div>
                <div className="checkbox-item">
                  <input 
                    type="checkbox" 
                    id="others" 
                    name="others"
                    checked={formData.contactReason.others}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="others">Others</label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="form-group">
            <textarea 
              id="message" 
              name="message"
              placeholder="Your Message here..."
              value={formData.message}
              onChange={handleInputChange}
              rows="6"
              required
            ></textarea>
          </div>
          
          <div className="form-group">
            <button type="submit" className="send-button">Send</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm; 