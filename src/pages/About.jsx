import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/pages/_about.scss';

const About = () => {
  const [activeTimelineItem, setActiveTimelineItem] = useState(null);
  
  // Timeline data - replace with your company's actual milestones
  const timelineData = [
    {
      id: 1,
      date: "2014",
      title: "Company Founded",
      description: "GKS YAPI was established with a vision to transform urban landscapes"
    },
    {
      id: 2,
      date: "2016",
      title: "First Major Project",
      description: "Completed our first landmark residential tower in Istanbul"
    },
    {
      id: 3,
      date: "2018",
      title: "International Expansion",
      description: "Expanded operations into European and Middle Eastern markets"
    },
    {
      id: 4,
      date: "2020",
      title: "Sustainability Initiative",
      description: "Launched eco-friendly building practices across all projects"
    },
    {
      id: 5,
      date: "2022",
      title: "Design Excellence Award",
      description: "Received international recognition for architectural innovation"
    },
    {
      id: 6,
      date: "2023",
      title: "Future Vision",
      description: "Pioneering smart building technology integration in all new developments"
    }
  ];
  
  // Activate first timeline item on load
  useEffect(() => {
    setActiveTimelineItem(timelineData[0].id);
  }, []);
  
  // Activate timeline item on click
  const handleTimelineClick = (id) => {
    setActiveTimelineItem(id);
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
            <React.Fragment key={item.id}>
              {/* Timeline item */}
              <div 
                className={`timeline-item ${index % 2 === 0 ? 'top' : 'bottom'} ${activeTimelineItem === item.id ? 'active' : ''}`}
                onClick={() => handleTimelineClick(item.id)}
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