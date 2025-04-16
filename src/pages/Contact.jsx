import React, { useEffect } from 'react';
// import { motion } from 'framer-motion';
import '../styles/pages/_contact.scss';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';
import ContactForm from '../components/ContactForm';
import Footer from '../components/organisms/Footer';
import { setupVerticalTextAnimations } from '../utils/animations';

const Contact = () => {
  const { language } = useLanguage();
  const t = translations[language];

  // Initialize vertical text animations
  useEffect(() => {
    setupVerticalTextAnimations();
  }, []);

  return (
    <div className="contact-page">
      {/* Hero headline section */}
      <div className="hero-section">
        {/* <motion.h1 
          className="hero-headline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        > */}
          {t.contact.heroHeadline}
        {/* </motion.h1> */}
      </div>

      <div className="vertical-text">
        <div className="line"></div>
        <span className="left-text">{t.contact.verticalPunchline}</span>
        <span className="large-text-primary">{t.contact.contactsAndDetails}</span>
        {/* <span className="large-text-secondary">{t.contact.howToReachUs}</span> */}
      </div>

            {/* Contact section */}
            <div className="contact-section">
        <div className="contact-label">{t.contact.heroHeadlineSecond}</div>
        <h2 className="contact-title">{t.contact.heroHeadlineThird}</h2>
        
        <div className="contact-details">
          <div className="contact-item">
            <div className="contact-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <div className="contact-text">
              {t.contact.location.title}<br />
              {t.contact.location.subtitle}
            </div>
          </div>
          
          <div className="contact-item">
            <div className="contact-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </div>
            <div className="contact-text">
              {t.contact.emailInquiry.text}<br />
              {t.contact.emailInquiry.email}
            </div>
          </div>
          
          <div className="contact-item">
            <div className="contact-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            <div className="contact-text">
              {t.contact.phoneInquiry?.text || 'Telephone'}<br />
              0532 343 18 18
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact form section */}
      <div className="contact-container" style={{ display: 'flex', backgroundColor: '#f5f2ef', overflow: 'hidden', margin: '1rem 10rem', boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)' }}>
        <ContactForm />
      </div>
      

      
      {/* Google Maps section - Central Istanbul with blue tint */}
      <div className="map-section">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48169.684212778025!2d28.932603960644526!3d41.03746977473201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7650656bd63%3A0x8ca058b28c20b6c3!2sBeyo%C4%9Flu%2F%C4%B0stanbul%2C%20Turkey!5e0!3m2!1sen!2sus!4v1685373782761!5m2!1sen!2sus" 
          width="100%" 
          height="450" 
          style={{ border: 0 }}
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Central Istanbul, Turkey Map"
        ></iframe>
      </div>
      
      
      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default Contact; 