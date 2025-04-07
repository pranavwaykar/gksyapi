import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';
import '../styles/pages/_about.scss';

const About = () => {
  // Track active index instead of ID
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Get current language
  const { language } = useLanguage();
  const t = translations[language];
  
  // Get timeline data from translations
  const timelineData = t.aboutPage.timeline.map((item, index) => ({
    id: index + 1,
    date: item.date,
    title: item.title,
    description: item.description
  }));
  
  // Activate timeline item on click using index
  const handleTimelineClick = (index) => {
    setActiveIndex(index);
  };
  
  return (
    <div className="about-page">
      
      {/* Timeline section */}
      <div className="timeline-container">
        {/* Timeline line */}
        <div className="timeline-line"></div>
        
        {/* Timeline items */}
        <div className="timeline-items">
          {timelineData.map((item, index) => (
            <React.Fragment key={index}>
              {/* Timeline item */}
              <div 
                className={`timeline-item ${index % 2 === 0 ? 'top' : 'bottom'} ${activeIndex === index ? 'active' : ''}`}
                onClick={() => handleTimelineClick(index)}
              >
                {/* Date */}
                <div className="timeline-date">{item.date}</div>
                
                {/* Content */}
                <div className="timeline-content">
                  <h3 className="timeline-item-title">{item.title}</h3>
                  <p className="timeline-item-description">{item.description}</p>
                </div>
                
                <div className="timeline-line-beside-dot"></div>
                
                {/* Dot */}
                <div className="timeline-dot"></div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default About; 