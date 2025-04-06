import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import backgroundVideo from "../assets/GKSYAPI Video.mp4";
import logo from "../assets/GKSYAPI Logo.png";
import Navigation from "../components/Navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

    return () => {
      // Clean up event listener
      container.removeEventListener("wheel", handleScroll);
    };
  }, []);

  return (
    <div className="home-container" ref={containerRef}>
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
        {/* Statistics - initially visible */}
        <div className="statistics-container" ref={statisticsRef}>
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

          {/* Turkish tagline - always visible */}
          <div className="tagline">
            <h1>Dünya fikirler üzerine inşa edilir Dünyayı, </h1>
            <h1>her seferinde bir fikirle şekillendiriyoruz</h1>
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
              <div className="solutions-tag">SOLUTIONS</div>
              <h1 className="solutions-title">
                Building the Future of Türkiye,<br />One Landmark at a Time
              </h1>
              <p className="solutions-description">
                At <strong>GKS Yapı</strong>, we don't just build structures—we shape modern, sustainable, and 
                high-quality living spaces that redefine city life. As a trusted leader in 
                İstanbul's construction and real estate sector, we are committed to innovation, 
                excellence, and long-term value for homeowners and investors alike.
              </p>
              <div className="solutions-links">
                <Link to="/projects/kentsel">Kentsel</Link> | <Link to="/projects/ozel-projeler">Özel Projeler</Link> | <Link to="/projects/konut-uretimi">Konut üretimi</Link> | <Link to="/projects/satisi-diger-projeler">Satışı Diğer Projeler & Şehir Estetiği</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vertical "THE PROJECTS" text */}
      <div className="vertical-text right">
        <div className="line"></div>
        <span className="left-text">Bespoke in Every Sense</span>
        <span className="large-text-primary">THE</span>
        <span className="large-text-secondary">PROJECTS</span>
      </div>

      {/* Use the Navigation component */}
      <Navigation />
    </div>
  );
};

export default Home;
