import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navigation = () => {
  const location = useLocation();
  const isProjectsActive = location.pathname.includes('/projects');
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);

  // Close dropdown when clicking outside
  const handleClickOutside = (e) => {
    if (!e.target.closest('.dropdown')) {
      setIsProjectsOpen(false);
    }
  };

  // Add event listener for clicks outside
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Handle category click
  const handleCategoryClick = () => {
    setIsProjectsOpen(false); // Close dropdown when category is clicked
  };

  return (
    <nav className="nav">
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink to="/" end>
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/about-us">
            About Us
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/solutions">
            Solutions
          </NavLink>
        </li>
        <li className="nav-item dropdown">
          <button 
            className={`dropdown-trigger ${isProjectsActive ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              setIsProjectsOpen(!isProjectsOpen);
            }}
          >
            Projects
            <span className={`dropdown-arrow ${isProjectsOpen ? 'open' : ''}`}>▼</span>
          </button>
          {isProjectsOpen && (
            <ul className="dropdown-menu">
              <li className="dropdown-item">
                <NavLink 
                  to="/projects/residential"
                  onClick={handleCategoryClick}
                >
                  Residential
                </NavLink>
              </li>
              <li className="dropdown-item">
                <NavLink 
                  to="/projects/commercial"
                  onClick={handleCategoryClick}
                >
                  Commercial
                </NavLink>
              </li>
            </ul>
          )}
        </li>
        <li className="nav-item">
          <NavLink to="/careers">
            Careers
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/contact-us">
            Contact Us
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation; 