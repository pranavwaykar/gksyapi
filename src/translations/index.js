// Import JSON files
import enTranslations from './en.json';
import trTranslations from './tr.json';

// Export translations object with imported JSON
export const translations = {
  en: enTranslations,
  tr: trTranslations
};

// Helper function to access nested translation keys
export const getTranslation = (language, key) => {
  // Split the key by dots to access nested properties
  const keys = key.split('.');
  let result = translations[language];
  
  // Navigate through the nested object
  for (const k of keys) {
    if (result && result[k] !== undefined) {
      result = result[k];
    } else {
      // Return the key if translation not found
      return key;
    }
  }
  
  return result;
}; 