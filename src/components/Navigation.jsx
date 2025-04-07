import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../assets/GKSYAPI Logo.png';
import gsap from 'gsap';
import { useLanguage, languages } from '../contexts/LanguageContext';
import { translations } from '../translations';

const Navigation = () => {
  // Create refs for elements we want to animate
  const logoRef = useRef(null);
  const navItemsRef = useRef([]);
  const location = useLocation();
  
  // Get language context
  const { language, setLanguage } = useLanguage();
  
  // Track previous location to prevent animation on initial load
  const [prevLocation, setPrevLocation] = useState(null);

  // Function to run the navigation animation
  const runNavAnimation = () => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    // Reset elements first
    gsap.set([logoRef.current, ...navItemsRef.current], { opacity: 0, y: -20 });
    
    // Animate logo first
    tl.to(logoRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6
    });
    
    // Then animate each nav item sequentially
    tl.to(navItemsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      stagger: 0.1 // Each item appears 0.1s after the previous one
    });
    
    return tl;
  };

  // Initial animation on component mount
  useEffect(() => {
    const tl = runNavAnimation();
    
    return () => {
      // Clean up animation on unmount
      tl.kill();
    };
  }, []);
  
  // Run animation when location changes (a navigation link was clicked)
  useEffect(() => {
    // Skip the initial render
    if (prevLocation !== null) {
      runNavAnimation();
    }
    setPrevLocation(location);
  }, [location.pathname]);

  const t = translations[language]; // Get current language translations

  return (
    <nav className="nav">
      {/* Logo with ref */}
      <div className="nav-logo" ref={logoRef}>
        <NavLink to="/">
          <img src={logo} alt="GKSYAPI Logo" />
        </NavLink>
      </div>
      
      <ul className="nav-list">
        <li className="nav-item" ref={el => navItemsRef.current[0] = el}>
          <NavLink to="/" end>
            {t.navigation.home}
          </NavLink>
        </li>
        <li className="nav-item" ref={el => navItemsRef.current[1] = el}>
          <NavLink to="/about">
            {t.navigation.aboutUs}
          </NavLink>
        </li>
        <li className="nav-item" ref={el => navItemsRef.current[2] = el}>
          <NavLink to="/projects">
            {t.navigation.projects}
          </NavLink>
        </li>
        <li className="nav-item" ref={el => navItemsRef.current[3] = el}> 
          <NavLink to="/careers">
            {t.navigation.careers}
          </NavLink>
        </li>
        <li className="nav-item" ref={el => navItemsRef.current[4] = el}>
          <NavLink to="/contact">
            {t.navigation.contactUs}
          </NavLink>
        </li>
        <li className="nav-item lang-selector" ref={el => navItemsRef.current[5] = el}>
          <button 
            className={language === languages.EN ? "active" : ""} 
            onClick={() => setLanguage(languages.EN)}
          >
            EN
          </button>
          <div className="lang-selector-divider"></div>
          <button 
            className={language === languages.TR ? "active" : ""} 
            onClick={() => setLanguage(languages.TR)}
          >
            TR
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation; 