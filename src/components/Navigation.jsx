import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../assets/GKSYAPI Logo.png';
import gsap from 'gsap';

const Navigation = () => {
  // Create refs for elements we want to animate
  const logoRef = useRef(null);
  const navItemsRef = useRef([]);
  const location = useLocation();
  
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
            HOME
          </NavLink>
        </li>
        <li className="nav-item" ref={el => navItemsRef.current[1] = el}>
          <NavLink to="/about">
            ABOUT US
          </NavLink>
        </li>
        <li className="nav-item" ref={el => navItemsRef.current[2] = el}>
          <NavLink to="/projects">
            PROJECTS
          </NavLink>
        </li>
        <li className="nav-item" ref={el => navItemsRef.current[3] = el}> 
          <NavLink to="/careers">
            CAREERS
          </NavLink>
        </li>
        <li className="nav-item" ref={el => navItemsRef.current[4] = el}>
          <NavLink to="/contact">
            CONTACT US
          </NavLink>
        </li>
        <li className="nav-item lang-selector" ref={el => navItemsRef.current[5] = el}>
          <NavLink to="/" className="active">EN</NavLink>
          <NavLink to="/">TR</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation; 