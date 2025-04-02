import React from "react";
import { Link } from "react-router-dom";
import backgroundVideo from '../assets/GKSYAPI Video.mp4';

const Home = () => {
  return (
    <div className="home-container">
      {/* Video Background */}
      <video className="background-video" autoPlay loop muted playsInline>
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Logo in top left */}
      <div className="logo">
        <svg width="78" height="23" viewBox="0 0 78 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.5 5L14 14.5H23L18.5 5Z" fill="#4285F4"/>
          <path d="M14 14.5L9.5 5L5 14.5H14Z" fill="#4285F4"/>
          <path d="M32.5781 5.78125V17H30.5156V5.78125H32.5781ZM40.1562 14.0781C40.1562 13.6406 40.0156 13.3125 39.7344 13.0938C39.4531 12.8698 38.9375 12.6458 38.1875 12.4219C37.4427 12.1927 36.8698 11.9583 36.4688 11.7188C35.6094 11.1562 35.1797 10.4349 35.1797 9.55469C35.1797 8.80469 35.4844 8.18229 36.0938 7.6875C36.7083 7.19271 37.5078 6.94531 38.4922 6.94531C39.1797 6.94531 39.7813 7.08333 40.2969 7.35938C40.8177 7.63542 41.224 8.02604 41.5156 8.53125C41.8073 9.03125 41.9531 9.58333 41.9531 10.1875H40.1562C40.1562 9.72917 40.0104 9.36979 39.7188 9.10938C39.4271 8.84375 39.0104 8.71094 38.4688 8.71094C37.9688 8.71094 37.5833 8.82031 37.3125 9.03906C37.0469 9.2526 36.9141 9.55208 36.9141 9.9375C36.9141 10.2708 37.0703 10.5417 37.3828 10.75C37.6953 10.9583 38.2135 11.1667 38.9375 11.375C39.6615 11.5833 40.2396 11.8151 40.6719 12.0703C41.1094 12.3203 41.4323 12.6146 41.6406 12.9531C41.849 13.2865 41.9531 13.6953 41.9531 14.1797C41.9531 14.9505 41.6562 15.5599 41.0625 16.0078C40.4688 16.4557 39.6719 16.6797 38.6719 16.6797C38.0052 16.6797 37.3906 16.5365 36.8281 16.25C36.2656 15.9583 35.8333 15.5625 35.5312 15.0625C35.2344 14.5625 35.0859 13.9932 35.0859 13.3547H36.8906C36.8906 13.8443 37.0417 14.224 37.3438 14.4938C37.651 14.7635 38.099 14.8984 38.6875 14.8984C39.2188 14.8984 39.6094 14.7917 39.8594 14.5781C40.1094 14.3594 40.2344 14.0677 40.2344 13.7031L40.1562 14.0781ZM47.4531 11.8281H43.6953V10.1172H47.4531V11.8281ZM59.9219 17H57.8516L52.6406 9.08594V17H50.5703V5.78125H52.6406L57.8594 13.7109V5.78125H59.9219V17ZM62.8672 5.78125V17H60.8047V5.78125H62.8672ZM76.0234 17H74.1562L69.9141 9.45312V17H67.9609V5.78125H69.9141L74.1484 13.3125V5.78125H76.0938L76.0234 17Z" fill="white"/>
        </svg>
      </div>

      {/* Overlay content */}
      <div className="content-overlay">
        {/* Statistics */}
        <div className="statistics">
          <div className="stat-item">
            <h2>1994</h2>
            <p>Established in</p>
          </div>
          <div className="stat-item">
            <h2>25+</h2>
            <p>Years in construction</p>
          </div>
          <div className="stat-item">
            <h2>100+</h2>
            <p>Completed Projects</p>
          </div>
          <div className="stat-item">
            <h2>20+</h2>
            <p>On-going Projects</p>
          </div>
        </div>
        
        {/* Turkish tagline */}
        <div className="tagline">
          <h1>Building innovative spaces that inspire,</h1>
          <h1>transforming ideas into lasting landmarks</h1>
        </div>
      </div>
      
      {/* Vertical "THE PROJECTS" text */}
      <div className="vertical-text right">
        <div className="line"></div>
        <span className="left-text">Bespoke in Every Sense</span>
        <span className="large-text">THE PROJECTS</span>
      </div>
      
      {/* Navigation */}
      <nav className="main-nav">
        <ul>
          <li><Link to="/" className="active">Home</Link></li>
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/career">Career</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li className="lang-selector">
            <Link to="/" className="active">EN</Link>
            <Link to="/">TR</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;
