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

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const statisticsRef = useRef(null);
  const solutionsBoxRef = useRef(null);
  const solutionsWhiteBoxTopRef = useRef(null);
  const solutionsWhiteBoxBottomRef = useRef(null);
  const solutionsContentRef = useRef(null);
  const containerRef = useRef(null);
  const audioRef = useRef(null);
  
  const aboutBoxRef = useRef(null);
  const aboutWhiteBoxTopRef = useRef(null);
  const aboutWhiteBoxBottomRef = useRef(null);
  const aboutContentRef = useRef(null);
  
  // Create refs for each stat item
  const statItemsRef = useRef([]);
  const taglineRef = useRef([]);
  
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    // Set initial states
    gsap.set(statisticsRef.current, { opacity: 1 });
    gsap.set(solutionsBoxRef.current, { opacity: 0 });
    
    gsap.set(solutionsWhiteBoxTopRef.current, { y: "-100%", opacity: 0 }); 
    gsap.set(solutionsWhiteBoxBottomRef.current, { y: "100%", opacity: 0 }); 
    
    gsap.set(solutionsContentRef.current, { x: "100%", opacity: 0 });

    // Position aboutBox at the bottom
    gsap.set(aboutBoxRef.current, { opacity: 0, y: "100%", x: 0 });
    gsap.set(aboutWhiteBoxTopRef.current, { y: "0%", opacity: 1 });
    gsap.set(aboutWhiteBoxBottomRef.current, { y: "0%", opacity: 1 });
    gsap.set(aboutContentRef.current, { x: "0%", opacity: 1 });
    
    // Set initial state for statistics items - hide them initially
    gsap.set(statItemsRef.current, { y: 50, opacity: 0 });
    gsap.set(taglineRef.current, { y: 30, opacity: 0 });

    // Animate statistics items in with a staggered effect
    gsap.to(statItemsRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      delay: 0.5
    });

    // Animate taglines after statistics
    gsap.to(taglineRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.3,
      ease: "power2.out",
      delay: 1.5
    });

    let currentView = 1;
    let isAnimating = false;
    
    const handleScroll = (e) => {
      e.preventDefault();
      
      if (isAnimating) return;

      if (e.deltaY > 0) {
        if (currentView === 1) {
          isAnimating = true;
          
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

          gsap.to(solutionsWhiteBoxTopRef.current, {
            y: "0%",
            opacity: 1,
            duration: 0.8,
            ease: "power2.inOut",
          });

          gsap.to(solutionsWhiteBoxBottomRef.current, {
            y: "0%",
            opacity: 1,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.to(solutionsContentRef.current, {
                x: "0%",
                opacity: 1,
                duration: 0.6,
                ease: "power2.inOut",
                onComplete: () => {
                  currentView = 2;
                  isAnimating = false;
                }
              });
            }
          });
        } 
        else if (currentView === 2) {
          isAnimating = true;
          
          gsap.to(solutionsBoxRef.current, {
            x: "-100%",
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(solutionsBoxRef.current, { opacity: 0, x: 0 });
              
              gsap.to(aboutBoxRef.current, {
                opacity: 1,
                y: "0%", 
                duration: 0.8,
                ease: "power2.inOut",
                onComplete: () => {
                  currentView = 3;
                  isAnimating = false;
                }
              });
            }
          });
        }
      } else if (e.deltaY < 0) {
        if (currentView === 2) {
          isAnimating = true;
          
          gsap.to(solutionsContentRef.current, {
            x: "100%",
            opacity: 0,
            duration: 0.6,
            ease: "power2.inOut",
            onComplete: () => {
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
              
              gsap.to(solutionsBoxRef.current, {
                opacity: 0,
                duration: 0.8,
                ease: "power2.inOut",
              });
              
              gsap.to(statisticsRef.current, {
                x: "0%",
                opacity: 1,
                duration: 0.8,
                ease: "power2.inOut",
                onComplete: () => {
                  // Reset and replay statistics animations when returning
                  // gsap.set(statItemsRef.current, { y: 50, opacity: 0 });
                  // gsap.set(taglineRef.current, { y: 30, opacity: 0 });
                  
                  // gsap.to(statItemsRef.current, {
                  //   y: 0,
                  //   opacity: 1,
                  //   duration: 0.8,
                  //   stagger: 0.2,
                  //   ease: "power3.out"
                  // });
                  
                  // gsap.to(taglineRef.current, {
                  //   y: 0,
                  //   opacity: 1,
                  //   duration: 0.8,
                  //   stagger: 0.3,
                  //   ease: "power2.out",
                  //   delay: 0.8
                  // });
                  
                  currentView = 1;
                  isAnimating = false;
                }
              });
            }
          });
        }
        else if (currentView === 3) {
          isAnimating = true;
          
          gsap.to(aboutBoxRef.current, {
            y: "100%",
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(aboutBoxRef.current, { opacity: 0, y: "100%" });
              
              gsap.set(solutionsWhiteBoxTopRef.current, { y: "0%", opacity: 1 });
              gsap.set(solutionsWhiteBoxBottomRef.current, { y: "0%", opacity: 1 });
              gsap.set(solutionsContentRef.current, { x: "0%", opacity: 1 });
              
              gsap.to(solutionsBoxRef.current, {
                opacity: 1,
                x: "0%",
                duration: 0.8,
                ease: "power2.inOut",
                onComplete: () => {
                  currentView = 2;
                  isAnimating = false;
                }
              });
            }
          });
        }
      }
    };

    const container = containerRef.current;
    container.addEventListener("wheel", handleScroll, { passive: false });

    const audio = audioRef.current;
    
    audio.play().catch(err => {
      console.log("Audio autoplay was prevented by the browser:", err);
      
      const startAudioOnInteraction = () => {
        audio.play().catch(e => console.log("Audio still couldn't play:", e));
        document.removeEventListener('click', startAudioOnInteraction);
      };
      
      document.addEventListener('click', startAudioOnInteraction);
    });

    return () => {
      container.removeEventListener("wheel", handleScroll);
      if (audio) {
        audio.pause();
      }
    };
  }, []);

  return (
    <div className="home-container" ref={containerRef}>
      <video className="background-video" autoPlay loop muted playsInline>
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <audio ref={audioRef} src={backgroundMusic} loop autoPlay />

      <div className="logo home-logo">
        <img src={logo} alt="GKSYAPI Logo" />
      </div>

      <div className="content-overlay">
        <div className="statistics-container" ref={statisticsRef}>
          <div className="statistics">
            {/* Use refs to animate each statistic item */}
            <div className="stat-item" ref={el => statItemsRef.current[0] = el}>
              <h2>1994</h2>
              <p>{t.homePage.establishedIn}</p>
            </div>
            <div className="stat-item" ref={el => statItemsRef.current[1] = el}>
              <h2>25+</h2>
              <p>{t.homePage.yearsInConstruction}</p>
            </div>
            <div className="stat-item" ref={el => statItemsRef.current[2] = el}>
              <h2>100+</h2>
              <p>{t.homePage.completedProjects}</p>
            </div>
            <div className="stat-item" ref={el => statItemsRef.current[3] = el}>
              <h2>20+</h2>
              <p>{t.homePage.ongoingProjects}</p>
            </div>
          </div>

          <div className="tagline">
            <h1 ref={el => taglineRef.current[0] = el}>{t.homePage.tagline1}</h1>
            <h1 ref={el => taglineRef.current[1] = el}>{t.homePage.tagline2}</h1>
          </div>
        </div>

        <div className="solutions-container" ref={solutionsBoxRef}>
          <div className="solutions-white-box-wrapper">
            <div className="solutions-white-box-top" ref={solutionsWhiteBoxTopRef}></div>
            
            <div className="solutions-white-box-bottom" ref={solutionsWhiteBoxBottomRef}></div>
            
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

        <div className="about-container" ref={aboutBoxRef}>
          <div className="about-white-box-wrapper">
            <div className="about-white-box-top" ref={aboutWhiteBoxTopRef}></div>
            
            <div className="about-white-box-bottom" ref={aboutWhiteBoxBottomRef}></div>
            
            <div className="about-content" ref={aboutContentRef}>
              <div className="about-tag">KENTSEL</div>
              <h1 className="about-title">
                Confidence in Housing: Secure, Stylish, & Smart Investments
              </h1>
              <p className="about-description">
                We deliver modern, high-quality, and aesthetically refined homes that are 
                more than just living spaces—they are future-proof investments. Our expertise 
                in housing sales and production ensures that every residence meets the 
                evolving needs of urban life while providing unmatched comfort and security.
              </p>
              <div className="about-cta">
                <Link to="/contact" className="cta-button">Your dream home is ready—invest in the future today!</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="vertical-text right">
        <div className="line"></div>
        <span className="left-text">{t.projects.bespokeInEverySense}</span>
        <span className="large-text-primary">{t.projects.the}</span>
        <span className="large-text-secondary">{t.projects.projects}</span>
      </div>

      <Navigation />
    </div>
  );
};

export default Home;
