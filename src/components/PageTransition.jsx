import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';

const PageTransition = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  
  // Trigger loading screen on route change
  useEffect(() => {
    setIsLoading(true);
  }, [location.pathname]);
  
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