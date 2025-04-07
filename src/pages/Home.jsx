import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import backgroundVideo from "../assets/GKSYAPI Video.mp4";
import logo from "../assets/GKSYAPI Logo.png";
import backgroundMusic from "../assets/relaxing-piano-310597.mp3";
import Navigation from "../components/Navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../translations";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  // Create refs for elements we want to animate
  const statisticsRef = useRef(null);
  const solutionsBoxRef = useRef(null);
  const solutionsWhiteBoxTopRef = useRef(null); // Top half of the box
  const solutionsWhiteBoxBottomRef = useRef(null); // Bottom half of the box
  const solutionsContentRef = useRef(null);
  const containerRef = useRef(null);
  const audioRef = useRef(null);
  
  // Get current language
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    // Set up initial state
    gsap.set(statisticsRef.current, { x: 0, opacity: 1 });
    gsap.set(solutionsBoxRef.current, { opacity: 0 });
    
    // Set initial positions for box halves
    gsap.set(solutionsWhiteBoxTopRef.current, { y: "-100%", opacity: 0 }); // Top half starts above
    gsap.set(solutionsWhiteBoxBottomRef.current, { y: "100%", opacity: 0 }); // Bottom half starts below
    
    // Content starts from right and is invisible
    gsap.set(solutionsContentRef.current, { x: "100%", opacity: 0 });

    // Create a scroll event listener
    const handleScroll = (e) => {
      // Prevent default scroll behavior
      e.preventDefault();

      if (e.deltaY > 0) {
        // Scrolling down
        gsap.to(statisticsRef.current, {
          x: "-100%",
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
        });

        gsap.to(solutionsBoxRef.current, {
          opacity: 1,
          duration: 0.8,
          ease: "power2.inOut",
        });

        // Animate top half down
        gsap.to(solutionsWhiteBoxTopRef.current, {
          y: "0%",
          opacity: 1,
          duration: 0.8,
          ease: "power2.inOut",
        });

        // Animate bottom half up
        gsap.to(solutionsWhiteBoxBottomRef.current, {
          y: "0%",
          opacity: 1,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: () => {
            // Only animate content after box halves have merged
            gsap.to(solutionsContentRef.current, {
              x: "0%",
              opacity: 1,
              duration: 0.6,
              ease: "power2.inOut",
            });
          }
        });
      } else if (e.deltaY < 0) {
        // Scrolling up - reverse the sequence
        
        // First hide the content
        gsap.to(solutionsContentRef.current, {
          x: "100%",
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut",
          onComplete: () => {
            // Then split the box halves
            gsap.to(solutionsWhiteBoxTopRef.current, {
              y: "-100%",
              opacity: 0,
              duration: 0.8,
              ease: "power2.inOut",
            });
            
            gsap.to(solutionsWhiteBoxBottomRef.current, {
              y: "100%",
              opacity: 0,
              duration: 0.8,
              ease: "power2.inOut",
            });
            
            // And fade out the container
            gsap.to(solutionsBoxRef.current, {
              opacity: 0,
              duration: 0.8,
              ease: "power2.inOut",
            });
            
            // Show statistics again
            gsap.to(statisticsRef.current, {
              x: "0%",
              opacity: 1,
              duration: 0.8,
              ease: "power2.inOut",
            });
          }
        });
      }
    };

    // Add the scroll event listener
    const container = containerRef.current;
    container.addEventListener("wheel", handleScroll, { passive: false });

    // Audio setup - attempt autoplay
    const audio = audioRef.current;
    
    // Try to play the audio automatically
    audio.play().catch(err => {
      console.log("Audio autoplay was prevented by the browser:", err);
      
      // Add a one-time click listener to the document to start audio after user interaction
      const startAudioOnInteraction = () => {
        audio.play().catch(e => console.log("Audio still couldn't play:", e));
        document.removeEventListener('click', startAudioOnInteraction);
      };
      
      document.addEventListener('click', startAudioOnInteraction);
    });

    return () => {
      // Clean up event listener
      container.removeEventListener("wheel", handleScroll);
      // Clean up
      if (audio) {
        audio.pause();
      }
    };
  }, []);

  return (
    <div className="home-container" ref={containerRef}>
      {/* Video Background */}
      <video className="background-video" autoPlay loop muted playsInline>
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Background Music - autoplay attribute added */}
      <audio ref={audioRef} src={backgroundMusic} loop autoPlay />

      {/* Logo in top left - only shown on home page */}
      <div className="logo home-logo">
        <img src={logo} alt="GKSYAPI Logo" />
      </div>

      {/* Overlay content */}
      <div className="content-overlay">
        {/* Statistics - initially visible */}
        <div className="statistics-container" ref={statisticsRef}>
          <div className="statistics">
            <div className="stat-item">
              <h2>1994</h2>
              <p>{t.homePage.establishedIn}</p>
            </div>
            <div className="stat-item">
              <h2>25+</h2>
              <p>{t.homePage.yearsInConstruction}</p>
            </div>
            <div className="stat-item">
              <h2>100+</h2>
              <p>{t.homePage.completedProjects}</p>
            </div>
            <div className="stat-item">
              <h2>20+</h2>
              <p>{t.homePage.ongoingProjects}</p>
            </div>
          </div>

          {/* Tagline - now translatable */}
          <div className="tagline">
            <h1>{t.homePage.tagline1}</h1>
            <h1>{t.homePage.tagline2}</h1>
          </div>
        </div>

        {/* Solutions Box */}
        <div className="solutions-container" ref={solutionsBoxRef}>
          <div className="solutions-white-box-wrapper">
            {/* Top half of the white box */}
            <div className="solutions-white-box-top" ref={solutionsWhiteBoxTopRef}></div>
            
            {/* Bottom half of the white box */}
            <div className="solutions-white-box-bottom" ref={solutionsWhiteBoxBottomRef}></div>
            
            {/* Content inside the box - positioned absolutely */}
            <div className="solutions-content" ref={solutionsContentRef}>
              <div className="solutions-tag">{t.solutions.title}</div>
              <h1 className="solutions-title">
                {t.solutions.solutionsTitle}
              </h1>
              <p className="solutions-description">
                {t.solutions.solutionsDescription}
              </p>
              <div className="solutions-links">
                <Link to="/projects/kentsel">{t.projects.kentsel}</Link> | 
                <Link to="/projects/ozel-projeler">{t.projects.ozelProjeler}</Link> | 
                <Link to="/projects/konut-uretimi">{t.projects.konutUretimi}</Link> | 
                <Link to="/projects/satisi-diger-projeler">{t.projects.satisiDigerProjeler}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vertical "THE PROJECTS" text */}
      <div className="vertical-text right">
        <div className="line"></div>
        <span className="left-text">{t.projects.bespokeInEverySense}</span>
        <span className="large-text-primary">{t.projects.the}</span>
        <span className="large-text-secondary">{t.projects.projects}</span>
      </div>

      {/* Use the Navigation component */}
      <Navigation />
    </div>
  );
};

export default Home;
