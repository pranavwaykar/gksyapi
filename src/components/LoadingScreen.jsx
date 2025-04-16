import React, { useEffect, useRef } from 'react';
import logo from '../assets/Logos/GKSYAPI Logo.png';
import gsap from 'gsap';

const LoadingScreen = ({ isLoading, setIsLoading }) => {
  const screenRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    if (isLoading) {
      // Show loading screen with animation
      gsap.set(screenRef.current, { opacity: 1, display: 'flex' });
      
      // Check if this is a page reload
      const isReload = performance.navigation && 
                      (performance.navigation.type === 1 || 
                       window.performance.getEntriesByType('navigation')[0]?.type === 'reload');
      
      // Animate logo
      const tl = gsap.timeline();
      
      if (isReload) {
        // COOLER RELOAD ANIMATION
        // Reset logo
        gsap.set(logoRef.current, { 
          rotationY: 0, 
          scale: 0, 
          opacity: 0,
          transformStyle: "preserve-3d",
          filter: 'drop-shadow(0 0 0 rgba(255, 255, 255, 0))'
        });
        
        // Coin flip animation for reload with fixed ending scale
        tl.to(logoRef.current, { 
          opacity: 1, 
          scale: 0.5, 
          duration: 0.7, 
          ease: "elastic.out(1, 0.3)",
          delay: 0.5
        })
        .to(logoRef.current, { 
          rotationY: 1080, // Multiple flips (3 complete flips)
          scale: 1, // Setting final scale directly to 1
          duration: 1.8, 
          ease: "power2.inOut" 
        })
        .to(logoRef.current, { 
          filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.7))', 
          duration: 0.8,
          ease: "power2.inOut" 
        }, "-=1.4")
        .to(logoRef.current, {
          rotationY: "+=20", // Small wobble at the end
          duration: 0.6,
          ease: "power3.out" // Changed from back.out to avoid scale overshoot
        });
      } else {
        // REGULAR NAVIGATION ANIMATION
        gsap.set(logoRef.current, { 
          transformStyle: "preserve-3d",
          opacity: 0, 
          scale: 0.8 
        });
        
        tl.to(logoRef.current, 
          { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }
        )
        .to(logoRef.current, { 
          rotationY: 360, // Full flip
          duration: 1.4,
          ease: "power2.inOut",
          scale: 1 // Explicitly maintain scale
        })
        .to(logoRef.current, {
          rotationY: "+=10", // Small wobble at the end
          duration: 0.2,
          ease: "power1.out",
          scale: 1 // Reinforce final scale
        });
      }
      
      // Final fade out for both animations
      tl.to(screenRef.current, {
        opacity: 0,
        duration: 0.5,
        delay: 0.3,
        onComplete: () => {
          gsap.set(screenRef.current, { display: 'none' });
          setIsLoading(false);
        }
      });
      
      return () => {
        tl.kill();
      };
    }
  }, [isLoading, setIsLoading]);

  return (
    <div ref={screenRef} className="loading-screen">
      <div className="loading-logo" ref={logoRef}>
        <img src={logo} alt="GKSYAPI Logo" />
      </div>
    </div>
  );
};

export default LoadingScreen; 