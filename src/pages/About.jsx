import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';
import '../styles/pages/_about.scss';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { setupVerticalTextAnimations } from '../utils/animations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Footer from '../components/organisms/Footer';

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
  
  // Add scroll animation for content sections
  useEffect(() => {
    const sections = document.querySelectorAll('.about-section');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });
    
    sections.forEach(section => {
      observer.observe(section);
    });
    
    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);
  
  // Setup vertical text animations when component mounts
  useEffect(() => {
    setupVerticalTextAnimations();
    
    // ... your existing code for other animations ...
  }, []);
  
  // Add GSAP animations for service cards
  useEffect(() => {
    const serviceCards = document.querySelectorAll('.service-card');
    
    // Set all cards and their contents to be initially invisible
    serviceCards.forEach((card, index) => {
      // Hide cards initially - alternating directions
      gsap.set(card, { 
        autoAlpha: 0, 
        x: index % 2 === 0 ? -50 : 50 
      });
      
      // Hide all content elements initially
      const title = card.querySelector('h2');
      const paragraph = card.querySelector('p');
      const button = card.querySelector('.apply-button');
      
      // Set initial gradient for buttons
      if (button) {
        gsap.set(button, {
          backgroundImage: 'linear-gradient(to right, #2b5876 0%, #4e4376 51%, #2b5876 100%)',
          backgroundSize: '200% auto',
          backgroundPosition: '0% center',
          color: '#ffffff',
          border: 'none',
          autoAlpha: 0,
          y: 20
        });
      } else {
        gsap.set([title, paragraph], { 
          autoAlpha: 0, 
          y: 20 
        });
      }
      
      // Create scroll trigger for each card
      ScrollTrigger.create({
        trigger: card,
        start: "top 85%", // Trigger when top of card reaches 85% of viewport height
        onEnter: () => {
          // Animate card when it enters the viewport
          gsap.to(card, {
            duration: 0.8,
            autoAlpha: 1,
            x: 0,
            ease: "power3.out"
          });
          
          // Animate inner elements with delay - sequential reveal
          gsap.to(title, {
            duration: 0.6,
            autoAlpha: 1,
            y: 0,
            ease: "back.out(1.4)",
            delay: 0.2
          });
          
          gsap.to(paragraph, {
            duration: 0.6,
            autoAlpha: 1,
            y: 0,
            ease: "back.out(1.2)",
            delay: 0.4
          });
          
          gsap.to(button, {
            duration: 0.6,
            autoAlpha: 1,
            y: 0,
            ease: "back.out(1.7)",
            delay: 0.6
          });
        },
        once: true // Animation only plays once
      });
      
      // Create hover animation for cards and buttons
      card.addEventListener('mouseenter', () => {
        // Card hover effect
        gsap.to(card, {
          y: -5,
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
          duration: 0.3
        });
        
        // Button gradient animation
        if (button) {
          gsap.to(button, {
            backgroundPosition: '100% center',
            duration: 0.6,
            ease: "power1.inOut"
          });
        }
      });
      
      card.addEventListener('mouseleave', () => {
        // Reset card hover effect
        gsap.to(card, {
          y: 0,
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
          duration: 0.3
        });
        
        // Reset button gradient
        if (button) {
          gsap.to(button, {
            backgroundPosition: '0% center',
            duration: 0.6,
            ease: "power1.inOut"
          });
        }
      });
    });
    
    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(st => st.kill());
      
      // Remove event listeners
      serviceCards.forEach(card => {
        card.removeEventListener('mouseenter', () => {});
        card.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);
  
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

      <div className="swipe-container">
        <span>Swipe</span>
        <FontAwesomeIcon icon={faArrowRight} />
      </div>

      <div className="vertical-text-about">
        <div className="line"></div>
        <span className="left-text">{t.aboutPage.verticalText.leftText}</span>
        <span className="large-text-primary">{t.aboutPage.verticalText.primary}</span>
        <span className="large-text-secondary">{t.aboutPage.verticalText.secondary}</span>
      </div>
      
      <div className="about-content-sections">
        <div className="service-grid">
          <div className="service-card">
            <h2>{t.aboutPage?.sections?.[0]?.title || "Building the Future of Türkiye, One Landmark at a Time"}</h2>
            <p>
              {t.aboutPage?.sections?.[0]?.description || "At GKS Yapı, we don't just build structures—we shape modern, sustainable, and high-quality living spaces that redefine city life. As a trusted leader in İstanbul's construction and real estate sector, we are committed to innovation, excellence, and long-term value for homeowners and investors alike."}
            </p>
            <button className="apply-button">Know More!</button>
          </div>

          <div className="service-card">
            <h2>{t.aboutPage?.sections?.[1]?.title || "Urban Transformation"}</h2>
            <p>
              {t.aboutPage?.sections?.[1]?.description || "With a focus on earthquake-resistant, energy-efficient, and sustainable urban renewal, we are reshaping İstanbul's skyline. Our expertise in fast project execution and strategic planning ensures that urban transformation is smooth, safe, and economically viable."}
            </p>
            <button className="apply-button">Know More!</button>
          </div>

          <div className="service-card">
            <h2>{t.aboutPage?.sections?.[2]?.title || "Sustainable Living"}</h2>
            <p>
              {t.aboutPage?.sections?.[2]?.description || "We integrate green spaces, eco-friendly materials, and smart energy solutions into our projects, creating cities that thrive both today and in the future. Sustainability isn't an afterthought—it's at the core of our design philosophy."}
            </p>
            <button className="apply-button">Know More!</button>
          </div>

          <div className="service-card">
            <h2>{t.aboutPage?.sections?.[3]?.title || "Confidence in Housing"}</h2>
            <p>
              {t.aboutPage?.sections?.[3]?.description || "We deliver modern, high-quality, and aesthetically refined homes that are more than just living spaces—they are future-proof investments. Our expertise in housing sales and production ensures that every residence meets the evolving needs of urban life while providing unmatched comfort and security."}
            </p>
            <button className="apply-button">Know More!</button>
          </div>
        </div>
      </div>

      <Footer />

      
    </div>
  );
};

export default About; 