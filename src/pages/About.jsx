import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';
import '../styles/pages/_about.scss';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const { language } = useLanguage();
  const t = translations[language];
  
  const [activeIndex, setActiveIndex] = useState(0);
  const timelineItemsRef = useRef([]);
  const timelineContainerRef = useRef(null);
  const timelineItemsContainerRef = useRef(null);
  const scrollTween = useRef(null);
  
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
  
  // Initialize GSAP animations
  useEffect(() => {
    // Set up timeline item animations
    timelineItemsRef.current.forEach((item, index) => {
      if (!item) return;
      
      // Set initial opacity and scale for non-active items
      if (index !== activeIndex) {
        gsap.set(item, { 
          opacity: 0.7,
          scale: 0.95
        });
      }
    });
    
    return () => {
      // Clean up any lingering animations
      if (scrollTween.current) {
        scrollTween.current.kill();
      }
    };
  }, []);
  
  // Handle scroll detection with debounce
  useEffect(() => {
    if (!timelineContainerRef.current) return;
    
    const timelineItems = timelineContainerRef.current.querySelector('.timeline-items');
    timelineItemsContainerRef.current = timelineItems;
    
    if (!timelineItems) return;
    
    let scrollTimeout;
    let isScrolling = false;
    
    const handleScroll = () => {
      if (isScrolling) return;
      
      // Clear the timeout if it's set
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      
      // Set a timeout to run after scrolling ends
      scrollTimeout = setTimeout(() => {
        if (!timelineItemsRef.current.length) return;
        
        const containerRect = timelineItems.getBoundingClientRect();
        const containerCenter = containerRect.left + containerRect.width / 2;
        
        // Check if we're at the beginning of the scroll area
        if (timelineItems.scrollLeft < 50) {
          if (activeIndex !== 0) {
            setActiveIndex(0);
          }
          return;
        }
        
        // Check if we're at the end of the scroll area
        const maxScroll = timelineItems.scrollWidth - timelineItems.clientWidth;
        if (maxScroll - timelineItems.scrollLeft < 50) {
          const lastIndex = timelineItemsRef.current.length - 1;
          if (activeIndex !== lastIndex) {
            setActiveIndex(lastIndex);
          }
          return;
        }
        
        // Regular case - find which timeline item is closest to the center
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
      }, 100);
    };
    
    timelineItems.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      if (timelineItems) {
        timelineItems.removeEventListener('scroll', handleScroll);
        clearTimeout(scrollTimeout);
      }
    };
  }, [activeIndex]);
  
  // Animate active item changes
  useEffect(() => {
    // Animate all items to update their appearance
    timelineItemsRef.current.forEach((item, index) => {
      if (!item) return;
      
      if (index === activeIndex) {
        // Animate active item
        gsap.to(item, {
          duration: 0.5,
          opacity: 1,
          scale: 1,
          ease: "power2.out"
        });
        
        // Animate the dot
        const dot = item.querySelector('.timeline-dot');
        if (dot) {
          gsap.to(dot, {
            duration: 0.5,
            scale: 1.5,
            backgroundColor: 'var(--primary-color)',
            ease: "power2.out"
          });
        }
        
        // Animate content
        const content = item.querySelector('.timeline-content');
        if (content) {
          gsap.to(content, {
            duration: 0.5,
            boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
            borderColor: 'var(--primary-color)',
            ease: "power2.out"
          });
        }
      } else {
        // Animate non-active items
        gsap.to(item, {
          duration: 0.5,
          opacity: 0.7,
          scale: 0.95,
          ease: "power2.out"
        });
        
        // Reset the dot
        const dot = item.querySelector('.timeline-dot');
        if (dot) {
          gsap.to(dot, {
            duration: 0.5,
            scale: 1,
            backgroundColor: 'var(--background-color)',
            ease: "power2.out"
          });
        }
        
        // Reset content
        const content = item.querySelector('.timeline-content');
        if (content) {
          gsap.to(content, {
            duration: 0.5,
            boxShadow: '0 0 5px rgba(0, 0, 0, 0.05)',
            borderColor: 'var(--border-color)',
            ease: "power2.out"
          });
        }
      }
    });
    
    // Scroll to the active item using GSAP
    if (timelineItemsRef.current[activeIndex] && timelineItemsContainerRef.current) {
      const container = timelineItemsContainerRef.current;
      const item = timelineItemsRef.current[activeIndex];
      
      // Calculate where to scroll
      const itemRect = item.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const targetScroll = container.scrollLeft + (itemRect.left - containerRect.left) - (containerRect.width / 2) + (itemRect.width / 2);
      
      // Kill any existing scroll animation
      if (scrollTween.current) {
        scrollTween.current.kill();
      }
      
      // Create new scroll animation
      scrollTween.current = gsap.to(container, {
        scrollLeft: targetScroll,
        duration: 1,
        ease: "power3.out"
      });
    }
  }, [activeIndex]);
  
  // Handle hover and click
  const handleMouseEnter = (index) => {
    setActiveIndex(index);
  };
  
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