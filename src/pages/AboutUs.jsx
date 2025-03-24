import React from 'react';

// SVG Icons as components
const TreeIcon = () => (
  <svg 
    className="icon" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M12 22v-5" />
    <path d="M9 6.82C9 4.71 10.34 3 12 3s3 1.71 3 3.82c0 1.56-.75 2.94-1.9 3.68" />
    <path d="M9 13c-1.15-.74-1.9-2.12-1.9-3.68C7.1 7.21 8.44 5.5 10.1 5.5c1.66 0 3 1.71 3 3.82 0 1.56-.75 2.94-1.9 3.68" />
    <path d="M9 19c-1.15-.74-1.9-2.12-1.9-3.68C7.1 13.21 8.44 11.5 10.1 11.5c1.66 0 3 1.71 3 3.82 0 1.56-.75 2.94-1.9 3.68" />
  </svg>
);

const UsersIcon = () => (
  <svg 
    className="icon" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const AwardIcon = () => (
  <svg 
    className="icon" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <circle cx="12" cy="8" r="7"></circle>
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
  </svg>
);

const LeafIcon = () => (
  <svg 
    className="icon" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M2 22c1.25-.987 2.27-1.975 3.9-2.2a5.56 5.56 0 0 1 3.8.7c1.4.984 2.3 1.975 3.8 2.2 1.5.225 2.7-.3 3.8-.7 1.1-.4 2.2-1.3 3.8-1.2.8.1 1.3.4 1.9.8"></path>
    <path d="M2 17c1.25-.987 2.27-1.975 3.9-2.2a5.56 5.56 0 0 1 3.8.7c1.4.984 2.3 1.975 3.8 2.2 1.5.225 2.7-.3 3.8-.7 1.1-.4 2.2-1.3 3.8-1.2.8.1 1.3.4 1.9.8"></path>
    <path d="M2 12c1.25-.987 2.27-1.975 3.9-2.2a5.56 5.56 0 0 1 3.8.7c1.4.984 2.3 1.975 3.8 2.2 1.5.225 2.7-.3 3.8-.7 1.1-.4 2.2-1.3 3.8-1.2.8.1 1.3.4 1.9.8"></path>
  </svg>
);

function AboutUs() {
  return (
    <div className="page">
      {/* Hero Section */}
      <div 
        className="hero-section"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1535916707207-35f97e715e1c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`
        }}
      >
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>Our Story</h1>
        </div>
      </div>

      <div className="about-container">
        {/* Mission Statement */}
        <div className="mission-statement">
          <h2>Crafting Natural Living Spaces</h2>
          <p>
            At Woodland, we believe in creating homes that harmoniously blend with nature. 
            For over two decades, we've been pioneering sustainable architecture that 
            brings the serenity of the forest into modern living spaces.
          </p>
        </div>

        {/* Stats Section */}
        <div className="stats-grid">
          {[
            { number: '20+', label: 'Years Experience' },
            { number: '150+', label: 'Projects Completed' },
            { number: '45+', label: 'Design Awards' },
            { number: '98%', label: 'Client Satisfaction' },
          ].map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="features-grid">
          <div className="features-column">
            <div className="feature-item">
              <div className="feature-icon">
                <TreeIcon />
              </div>
              <div className="feature-content">
                <h3>Sustainable Design</h3>
                <p>Every project is crafted with environmental consciousness at its core, 
                   utilizing sustainable materials and energy-efficient solutions.</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <UsersIcon />
              </div>
              <div className="feature-content">
                <h3>Expert Team</h3>
                <p>Our team of architects, designers, and craftsmen brings decades of 
                   combined experience in creating exceptional living spaces.</p>
              </div>
            </div>
          </div>

          <div className="features-column">
            <div className="feature-item">
              <div className="feature-icon">
                <AwardIcon />
              </div>
              <div className="feature-content">
                <h3>Award-Winning Designs</h3>
                <p>Our innovative approach to architectural design has earned us 
                   recognition and numerous awards in the industry.</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <LeafIcon />
              </div>
              <div className="feature-content">
                <h3>Natural Integration</h3>
                <p>We specialize in creating homes that seamlessly integrate with their 
                   natural surroundings while providing modern comfort.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="team-section">
          <h2>Our Leadership Team</h2>
          <div className="team-grid">
            {[
              {
                image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
                name: 'David Anderson',
                role: 'Founder & Principal Architect',
              },
              {
                image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
                name: 'Sarah Mitchell',
                role: 'Design Director',
              },
              {
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
                name: 'Michael Chen',
                role: 'Sustainability Expert',
              },
            ].map((member, index) => (
              <div key={index} className="team-member">
                <div 
                  className="member-image"
                  style={{ backgroundImage: `url(${member.image})` }}
                />
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Vision Section */}
        <div 
          className="vision-section"
          style={{
            backgroundImage: 'url("https://plus.unsplash.com/premium_photo-1661964045454-67814c3e7d01?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")'
          }}
        >
          <div className="vision-content">
            <h2>Our Vision</h2>
            <p>
              We envision a future where sustainable architecture becomes the standard, 
              not the exception. Our commitment is to continue pioneering innovative 
              designs that respect both nature and human needs, creating spaces that 
              inspire and nurture for generations to come.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;