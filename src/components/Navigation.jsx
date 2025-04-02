import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/GKSYAPI Logo.png';

const Navigation = () => {
  return (
    <nav className="nav">
      {/* Logo */}
      <div className="nav-logo">
        <NavLink to="/">
          <img src={logo} alt="GKSYAPI Logo" />
        </NavLink>
      </div>
      
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
          <NavLink to="/projects">
            Projects
          </NavLink>
        </li>
        <li className="nav-item"> 
          <NavLink to="/careers">
            Careers
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/contact">
            Contact Us
          </NavLink>
        </li>
        <li className="nav-item lang-selector">
          <NavLink to="/" className="active">EN</NavLink>
          <NavLink to="/">TR</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation; 