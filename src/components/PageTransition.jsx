import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';
import { triggerAnimationsAfterTransition } from '../utils/animations';

const PageTransition = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  
  // Trigger loading screen on route change
  useEffect(() => {
    setIsLoading(true);
  }, [location.pathname]);
  
  // Notify when loading is complete
  useEffect(() => {
    if (!isLoading) {
      // First dispatch custom events
      const loadEvent = new CustomEvent('loadingScreenComplete');
      document.dispatchEvent(loadEvent);
      
      // Then trigger animations after a short delay to ensure DOM is ready
      setTimeout(() => {
        triggerAnimationsAfterTransition();
      }, 300);
    }
  }, [isLoading]);
  
  return (
    <>
      <LoadingScreen isLoading={isLoading} setIsLoading={setIsLoading} />
      <main className={isLoading ? 'content-hidden' : ''}>
        {children}
      </main>
    </>
  );
};

export default PageTransition;