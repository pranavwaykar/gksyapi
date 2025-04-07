import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';
import '../styles/pages/_about.scss';

const About = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const { language } = useLanguage();
  const t = translations[language];
  
  const timelineData = t.aboutPage.timeline.map((item, index) => ({
    id: index + 1,
    date: item.date,
    title: item.title,
    description: item.description
  }));
  
  const handleTimelineClick = (index) => {
    setActiveIndex(index);
  };
  
  return (
    <div className="about-page">
      
      <div className="timeline-container">
        <div className="timeline-line"></div>
        
        <div className="timeline-items">
          {timelineData.map((item, index) => (
            <React.Fragment key={index}>
              <div 
                className={`timeline-item ${index % 2 === 0 ? 'top' : 'bottom'} ${activeIndex === index ? 'active' : ''}`}
                onClick={() => handleTimelineClick(index)}
              >
                <div className="timeline-date">{item.date}</div>
                
                <div className="timeline-content">
                  <h3 className="timeline-item-title">{item.title}</h3>
                  <p className="timeline-item-description">{item.description}</p>
                </div>
                
                <div className="timeline-line-beside-dot"></div>
                
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