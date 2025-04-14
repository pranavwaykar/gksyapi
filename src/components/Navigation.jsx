import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../assets/Logos/GKSYAPI Logo.png';
import gsap from 'gsap';
import { useLanguage, languages } from '../contexts/LanguageContext';
import { translations } from '../translations';

const Navigation = ({ onHomePage }) => {
  // Get location first
  const location = useLocation();
  
  // Check if this component should render BEFORE using other hooks
  // If we're on home page and this is not the home page instance, don't render
  if (location.pathname === '/' && onHomePage === false) {
    return null;
  }

  // Create refs for elements we want to animate - after conditional return
  const logoRef = useRef(null);
  const navItemsRef = useRef([]);
  
  // Get language context
  const { language, setLanguage } = useLanguage();
  
  // Track previous location to prevent animation on initial load
  const [prevLocation, setPrevLocation] = useState(null);

  // Function to run the navigation animation
  const runNavAnimation = () => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    // Reset elements first
    gsap.set([logoRef.current, ...navItemsRef.current], { opacity: 0, y: -20, scale: 0.95 });
    
    // Animate logo first
    tl.to(logoRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8
    });
    
    // Then animate each nav item sequentially
    tl.to(navItemsRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      delay: 1.5,
      duration: 0.5,
      stagger: 0.15
    });
    
    return tl;
  };

  // Initial animation on component mount
  useEffect(() => {
    // Add hover animations for nav items
    navItemsRef.current.forEach(item => {
      if (item) {
        gsap.set(item, { transformOrigin: 'center' });
        
        item.addEventListener('mouseenter', () => {
          gsap.to(item, { y: -3, scale: 1.05, duration: 0.3 });
        });
        
        item.addEventListener('mouseleave', () => {
          gsap.to(item, { y: 0, scale: 1, duration: 0.3 });
        });
      }
    });
    
    const tl = runNavAnimation();
    
    return () => {
      // Clean up animation on unmount
      tl.kill();
      
      // Remove event listeners
      navItemsRef.current.forEach(item => {
        if (item) {
          item.removeEventListener('mouseenter', () => {});
          item.removeEventListener('mouseleave', () => {});
        }
      });
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

  // Toggle language handler
  const handleLanguageToggle = () => {
    setLanguage(language === languages.EN ? languages.TR : languages.EN);
  };

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
          <span className={language === languages.EN ? "active" : ""}>EN</span>
          <label className="switch">
            <input 
              type="checkbox" 
              checked={language === languages.TR}
              onChange={handleLanguageToggle}
            />
            <span className="slider round"></span>
          </label>
          <span className={language === languages.TR ? "active" : ""}>TR</span>
        </li>
      </ul>
    </nav>
  );
};

Navigation.defaultProps = {
  onHomePage: false
};

export default Navigation; 