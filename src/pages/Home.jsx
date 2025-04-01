import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      {/* Top Navigation */}
      {/* <nav className="top-nav">
        <div className="logo">ONE</div>
        <ul>
          <li><Link to="/">HOME</Link></li>
          <li><Link to="/virtual-tour">THE VIRTUAL TOUR</Link></li>
          <li><Link to="/gallery">THE GALLERY</Link></li>
          <li><Link to="/video">THE VIDEO</Link></li>
          <li><Link to="/details">THE DETAILS</Link></li>
          <li><Link to="/press">THE PRESS</Link></li>
          <li><Link to="/contact">THE CONTACT</Link></li>
        </ul>
      </nav> */}

      {/* Main Content */}
      <div className="main-content">
        {/* Left Title Section */}
        <div className="title-section">
          <h1>
            THE<br />
            PALMS<br />
            MOST<br />
            LUXURIOUS<br />
            VILLA<br />
            TO<br />
            RENT
          </h1>
          <p className="copyright">COPYRIGHT © 2022. ALL RIGHTS RESERVED.</p>
        </div>

        {/* Center Line with Text */}
        <div className="vertical-text center">
          <span className="small-text">ONE 100 PALM</span>
          <div className="line"></div>
          <span className="large-text">THE GALLERY</span>
        </div>

        {/* Right Line with Text */}
        <div className="vertical-text right">
          <span className="small-text">CLICK HERE FOR</span>
          <div className="line"></div>
          <span className="large-text">THE DETAILS</span>
        </div>
      </div>
    </div>
  );
};

export default Home; 