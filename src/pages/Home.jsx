import React from "react";
import { Link } from "react-router-dom";
import backgroundVideo from '../assets/GKSYAPI Video.mp4';
import logo from '../assets/GKSYAPI Logo.png';
import Navigation from "../components/Navigation";

const Home = () => {
  return (
    <div className="home-container">
      {/* Video Background */}
      <video className="background-video" autoPlay loop muted playsInline>
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Logo in top left - only shown on home page */}
      <div className="logo home-logo">
        <img src={logo} alt="GKSYAPI Logo" />
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
          <h1>Dünya fikirler üzerine inşa edilir Dünyayı, </h1>
          <h1>her seferinde bir fikirle şekillendiriyoruz</h1>
        </div>
      </div>
      
      {/* Vertical "THE PROJECTS" text */}
      <div className="vertical-text right">
        <div className="line"></div>
        <span className="left-text">Bespoke in Every Sense</span>
        <span className="large-text-primary">
          THE 
          </span>
          <span className="large-text-secondary">
          PROJECTS
          </span>
      </div>
      
      {/* Use the Navigation component */}
      <Navigation />
    </div>
  );
}

export default Home;
