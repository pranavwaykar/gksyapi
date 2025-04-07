import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';
import '../styles/pages/_about.scss';

const About = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const timelineItemsRef = useRef([]);
  const timelineContainerRef = useRef(null);
  
  const { language } = useLanguage();
  const t = translations[language];
  
  const timelineData = t.aboutPage.timeline.map((item, index) => ({
    id: index + 1,
    date: item.date,
    title: item.title,
    description: item.description
  }));
  
  // Initialize refs array when timeline data changes
  useEffect(() => {
    timelineItemsRef.current = timelineItemsRef.current.slice(0, timelineData.length);
  }, [timelineData]);
  
  // Detect which item is most visible during scroll
  useEffect(() => {
    if (!timelineContainerRef.current) return;
    
    const timelineItems = timelineContainerRef.current.querySelector('.timeline-items');
    
    const handleScroll = () => {
      if (!timelineItemsRef.current.length) return;
      
      const containerRect = timelineItems.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;
      
      // Find which timeline item is closest to the center of the container
      let closestIndex = 0;
      let closestDistance = Infinity;
      
      timelineItemsRef.current.forEach((item, index) => {
        if (!item) return;
        
        const itemRect = item.getBoundingClientRect();
        const itemCenter = itemRect.left + itemRect.width / 2;
        const distance = Math.abs(containerCenter - itemCenter);
        
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });
      
      if (closestIndex !== activeIndex) {
        setActiveIndex(closestIndex);
      }
    };
    
    timelineItems.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => timelineItems.removeEventListener('scroll', handleScroll);
  }, [activeIndex]);
  
  // Allow navigation with hover and click
  const handleMouseEnter = (index) => {
    setActiveIndex(index);
  };
  
  // Scroll active item into view when it changes
  useEffect(() => {
    if (timelineItemsRef.current[activeIndex]) {
      timelineItemsRef.current[activeIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [activeIndex]);
  
  return (
    <div className="about-page">
      
      <div className="timeline-container" ref={timelineContainerRef}>
        <div className="timeline-line"></div>
        
        <div className="timeline-items">
          {timelineData.map((item, index) => (
            <React.Fragment key={index}>
              <div 
                ref={el => timelineItemsRef.current[index] = el}
                className={`timeline-item ${index % 2 === 0 ? 'top' : 'bottom'} ${activeIndex === index ? 'active' : ''}`}
                onMouseEnter={() => handleMouseEnter(index)}
                onClick={() => setActiveIndex(index)}
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