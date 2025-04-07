import React, { createContext, useState, useContext, useEffect } from 'react';

// Create language context
const LanguageContext = createContext();

// Available languages
export const languages = {
  EN: 'en',
  TR: 'tr'
};

// Language provider component
export const LanguageProvider = ({ children }) => {
  // Initialize language from localStorage or default to English
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || languages.EN;
  });

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
    // You could also update document lang attribute if needed
    document.documentElement.lang = language;
  }, [language]);

  // Toggle between languages
  const toggleLanguage = () => {
    setLanguage(prevLang => 
      prevLang === languages.EN ? languages.TR : languages.EN
    );
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 