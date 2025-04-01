import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
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
          <NavLink to="/contact-us">
            Contact Us
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation; 