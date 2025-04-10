import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import backgroundVideo from "../assets/GKSYAPI Video 1.mp4";
import backgroundVideo2 from "../assets/GKSYAPI Video 2.mp4";
import backgroundVideo3 from "../assets/GKSYAPI Video 3.mp4";
import backgroundVideo4 from "../assets/GKSYAPI Video 4.mp4";
import backgroundVideo5 from "../assets/GKSYAPI Video 5.mp4";
import backgroundVideo6 from "../assets/GKSYAPI Video 6.mp4";
import backgroundVideo7 from "../assets/GKSYAPI Video 7.mp4";
import logo from "../assets/GKSYAPI Logo.png";
import backgroundMusic from "../assets/relaxing-piano-310597.mp3";
import Navigation from "../components/Navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../translations";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const containerRef = useRef(null);
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  
  // Store the current card index
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  // Track animation direction (1: down, -1: up)
  const [direction, setDirection] = useState(0);
  // Track if card is entering or exiting
  const [animationState, setAnimationState] = useState('idle'); // 'idle', 'entering', 'exiting'
  
  const { language } = useLanguage();
  const t = translations[language];

  // Card content
  const cardContents = [
    { 
      // Card 1 with stats UI
      customRender: () => (
        <div className="stats-overview">
          <div className="stats-row">
            <div className="stat-item">
              <div className="stat-number">1994</div>
              <div className="stat-label">Established in</div>
            </div>
            
            <div className="stat-item">
              <div className="stat-number">25+</div>
              <div className="stat-label">Years in construction</div>
            </div>
            
            <div className="stat-item">
              <div className="stat-number">100+</div>
              <div className="stat-label">Completed Projects</div>
            </div>
            
            <div className="stat-item">
              <div className="stat-number">20+</div>
              <div className="stat-label">On going Projects</div>
            </div>
          </div>
          
          <div className="company-slogan">
            <h1>Dünya fikirler üzerine inşa edilir Dünyayı,</h1>
            <h1>her seferinde bir fikirle şekillendiriyoruz</h1>
          </div>
        </div>
      )
    },
    { 
      // Card 2 - About Us UI
      customRender: () => (
        <div className="about-us-container">
          <div className="about-header">
            <span className="section-label">ABOUT US</span>
            <h1 className="about-title">
              The World is Built on IDEAS, <br />
              GKSYAPI Brings Your Ideas into Reality
            </h1>
          </div>
          
          <div className="about-description">
            <p>With diverse backgrounds and expertise, we collaborate seamlessly to turn ideas 
            into reality, crafting architectural masterpieces that inspire and endure.</p>
            <p>We believe in construction that enhances the human experience, providing clarity 
            in form while maintaining an effortless elegance.</p>
          </div>
          
        </div>
      )
    },
    { 
      // Card 3 - Solutions UI
      customRender: () => (
        <div className="solutions-container">
          <div className="solutions-header">
            <span className="section-label">SOLUTIONS</span>
            <h1 className="solutions-title">
              Building the Future of Türkiye, <br />
              One Landmark at a Time
            </h1>
          </div>
          
          <div className="solutions-description">
            <p>
              At <strong>GKS Yapı</strong>, we don't just build structures—we shape modern, sustainable, and 
              high-quality living spaces that redefine city life. As a trusted leader in 
              Istanbul's construction and real estate sector, we are committed to innovation, 
              excellence, and long-term value for homeowners and investors alike.
            </p>
          </div>
          
          <div className="solutions-categories">
            <span className="category-item">Kentsel</span>
            <span className="category-divider">|</span>
            <span className="category-item">Özel Projeler</span>
            <span className="category-divider">|</span>
            <span className="category-item">Konut uretimi</span>
            <span className="category-divider">|</span>
            <span className="category-item">Satisi Diger Projeler & Sehir Estetigi</span>
          </div>
        </div>
      )
    },
    { 
      // Card 4 - Housing UI (KENTSEL)
      customRender: () => (
        <div className="housing-container">
          {/* Update the blue accent right div */}
          <div className="blue-accent-right">
            <div className="page-indicator">1/5</div>
          </div>
          
          <div className="housing-header">
            <span className="section-label">KENTSEL</span>
            <h1 className="housing-title">
              Confidence in Housing: <br />
              Secure, Stylish, & Smart Investments
            </h1>
          </div>
          
          <div className="housing-description">
            <p>
              We deliver modern, high-quality, and aesthetically refined homes that are 
              more than just living spaces—they are future-proof investments. Our expertise 
              in housing sales and production ensures that every residence meets the 
              evolving needs of urban life while providing unmatched comfort and security.
            </p>
          </div>
          
          <div className="housing-cta">
            <button className="cta-button">
              Your dream home is ready—invest in the future today!
            </button>
          </div>
        </div>
      )
    },
    { 
      // Card 5 - Custom-Built Excellence
      customRender: () => (
        <div className="housing-container">
          <div className="blue-accent-right">
            <div className="page-indicator">2/5</div>
          </div>
          
          <div className="housing-header">
            <span className="section-label">Services</span>
            <h1 className="housing-title">
              Custom-Built Excellence: <br />
              From Homes to Corporate Spaces
            </h1>
          </div>
          
          <div className="housing-description">
            <p>
              From residences and workspaces to large-scale corporate and private projects, we tailor 
              every build with precision. GKS Yapı integrates cutting-edge construction technologies 
              with a meticulous quality approach, ensuring that every project is a benchmark of excellence.
            </p>
          </div>
          
          <div className="housing-cta">
            <button className="cta-button">
              Crafted with precision, built for legacy.
            </button>
          </div>
        </div>
      )
    },
    { 
      // Card 6 - Building the Future
      customRender: () => (
        <div className="housing-container">
          <div className="blue-accent-right">
            <div className="page-indicator">3/5</div>
          </div>
          
          <div className="housing-header">
            <span className="section-label">Services</span>
            <h1 className="housing-title">
              Building the Future of Türkiye, <br />
              One Landmark at a Time
            </h1>
          </div>
          
          <div className="housing-description">
            <p>
              At GKS Yapı, we don't just build structures—we shape modern, sustainable, and 
              high-quality living spaces that redefine city life. As a trusted leader in 
              İstanbul's construction and real estate sector, we are committed to innovation, 
              excellence, and long-term value for homeowners and investors alike.
            </p>
          </div>
          
          <div className="housing-cta">
            <button className="cta-button">
              Let's build your vision together—contact us now!
            </button>
          </div>
        </div>
      )
    },
    { 
      // Card 7 - Urban Transformation
      customRender: () => (
        <div className="housing-container">
          <div className="blue-accent-right">
            <div className="page-indicator">4/5</div>
          </div>
          
          <div className="housing-header">
            <span className="section-label">Services</span>
            <h1 className="housing-title">
              Urban Transformation: <br />
              Rebuilding Cities, Restoring Confidence
            </h1>
          </div>
          
          <div className="housing-description">
            <p>
              With a focus on earthquake-resistant, energy-efficient, and sustainable urban 
              renewal, we are reshaping İstanbul's skyline. Our expertise in fast project 
              execution and strategic planning ensures that urban transformation is smooth, 
              safe, and economically viable.
            </p>
          </div>
          
          <div className="housing-cta">
            <button className="cta-button">
              Be part of the new era of modern cities—partner with us!
            </button>
          </div>
        </div>
      )
    },
    { 
      // Card 8 - Sustainable Living
      customRender: () => (
        <div className="housing-container">
          <div className="blue-accent-right">
            <div className="page-indicator">5/5</div>
          </div>
          
          <div className="housing-header">
            <span className="section-label">Services</span>
            <h1 className="housing-title">
              Sustainable Living: <br />
              Nature & Innovation in Harmony
            </h1>
          </div>
          
          <div className="housing-description">
            <p>
              We integrate green spaces, eco-friendly materials, and smart energy solutions 
              into our projects, creating cities that thrive both today and in the future. 
              Sustainability isn't an afterthought—it's at the core of our design philosophy.
            </p>
          </div>
          
          <div className="housing-cta">
            <button className="cta-button">
              Sustainable cities, better living—join the movement!
            </button>
          </div>
        </div>
      )
    }
  ];

  // Map cards to videos - one unique video per card
  const getVideoForCard = (cardIndex) => {
    switch (cardIndex) {
      case 0:
        return backgroundVideo;
      case 1:
        return backgroundVideo2;
      case 2:
        return backgroundVideo3;
      case 3:
        return backgroundVideo4;
      case 4:
        return backgroundVideo5;
      case 5:
        return backgroundVideo6;
      case 6:
        return backgroundVideo7;
      case 7:
        return backgroundVideo4;
      default:
        return backgroundVideo3;
    }
  };

  // Add refs for transition elements
  const transitionLineRef = useRef(null);
  const transitionCircleRef = useRef(null);
  const transitionBoxRef = useRef(null);
  
  // Change the background video with a cool transition effect
  const changeBackgroundVideo = (newCardIndex) => {
    if (!videoRef.current) return;
    
    const video = videoRef.current;
    const currentSrc = video.querySelector('source').getAttribute('src');
    const newVideoSrc = getVideoForCard(newCardIndex);
    
    // Simple way to compare the video files - get just the filename
    const getCurrentVideoName = (path) => {
      return path.split('/').pop();
    };
    
    const currentVideoName = getCurrentVideoName(currentSrc);
    const newVideoName = getCurrentVideoName(newVideoSrc);
    
    if (currentVideoName === newVideoName) {
      return;
    }
    
    // Store the new index to update content later
    const nextCardIndex = newCardIndex;
    
    // Perform cool transition effects
    const tl = gsap.timeline({
      onUpdate: function() {
        // You can use this to track progress if needed
        // const progress = this.progress();
        // console.log("Animation progress:", progress);
      }
    });
    
    // Use our fixed sequence instead of random calculation
    // Map the card index to the specific transition types in the requested order
    let transitionType;
    
    // This ensures we cycle through our sequence repeatedly
    const transitionIndex = currentCardIndex % 7;
    
    // Define our specific sequence
    switch(transitionIndex) {
      case 0: transitionType = 5; break; // Split Vertical Swipe (Left up, Right down)
      case 1: transitionType = 6; break; // Staircase Wipe
      case 2: transitionType = 1; break; // Thick Border Rectangle Zoom
      case 3: transitionType = 0; break; // Corner Swipes
      case 4: transitionType = 4; break; // Simultaneous Horizontal Lines Wipe
      case 5: transitionType = 2; break; // Venetian Blinds Effect
      case 6: transitionType = 3; break; // Domino Fall Effect
      default: transitionType = 5; break; // Default to Split Vertical Swipe
    }
    
    switch(transitionType) {
      case 0:
        // Corner Swipes
        const corners = [];
        const cornerPositions = [
          { top: 0, left: 0, rotation: 0 },            // Top-left
          { top: 0, right: 0, rotation: 90 },          // Top-right
          { bottom: 0, right: 0, rotation: 180 },      // Bottom-right
          { bottom: 0, left: 0, rotation: 270 }        // Bottom-left
        ];
        
        // Create corner elements
        cornerPositions.forEach(pos => {
          const corner = document.createElement('div');
          corner.className = 'corner-wipe';
          corner.style.position = 'absolute';
          corner.style.width = '100%';
          corner.style.height = '100%';
          
          // Position each corner
          Object.keys(pos).forEach(key => {
            if (key !== 'rotation') {
              corner.style[key] = pos[key] + 'px';
            }
          });
          
          corner.style.background = 'white';
          corner.style.clipPath = 'polygon(0 0, 0% 0, 0% 0%)'; // Start with nothing showing
          corner.style.zIndex = '10';
          
          containerRef.current.appendChild(corner);
          corners.push(corner);
        });
        
        // Define clip paths for each corner
        const clipPaths = [
          'polygon(0 0, 100% 0, 0% 100%)',        // Top-left
          'polygon(100% 0, 100% 100%, 0% 0)',     // Top-right
          'polygon(100% 100%, 0% 100%, 100% 0%)', // Bottom-right
          'polygon(0 100%, 0% 0%, 100% 100%)'     // Bottom-left
        ];
        
        // Animate corners to swipe in
        tl.to(corners, {
          clipPath: (i) => clipPaths[i],
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.inOut'
        })
        .set(video, { opacity: 0 }, 0.6)
        .call(() => {
          // Change video source
          video.querySelector('source').src = newVideoSrc;
          video.load();
          video.play();
          
          // CARD CONTENT CHANGE TIMING - change here at midpoint of transition
          setCurrentCardIndex(nextCardIndex);
        })
        // Animate corners to swipe out
        .to(corners, {
          clipPath: 'polygon(0 0, 0% 0, 0% 0%)',
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.inOut',
          onComplete: () => {
            // Clean up
            corners.forEach(corner => {
              if (corner.parentNode) {
                corner.parentNode.removeChild(corner);
              }
            });
          }
        })
        .set(video, { opacity: 1 });
        break;
        
      case 1:
        // Thick Border Rectangle Zoom
        const containerWidth = containerRef.current.offsetWidth;
        const containerHeight = containerRef.current.offsetHeight;
        const borderWidth = 150; // Thick border width in pixels
        
        // Create the rectangle with thick border
        const rectangle = document.createElement('div');
        rectangle.className = 'rectangle-zoom';
        rectangle.style.position = 'absolute';
        rectangle.style.top = '50%';
        rectangle.style.left = '50%';
        rectangle.style.transform = 'translate(-50%, -50%) scale(0.001)'; // Start even smaller
        rectangle.style.width = `${containerWidth}px`;
        rectangle.style.height = `${containerHeight}px`;
        rectangle.style.boxSizing = 'border-box';
        rectangle.style.border = `${borderWidth}px solid white`;
        rectangle.style.boxShadow = '0 0 40px rgba(255, 255, 255, 0.6)';
        rectangle.style.backgroundColor = 'transparent';
        rectangle.style.zIndex = '10';
        rectangle.style.opacity = '0'; // Start invisible
        
        // Add perspective to container for 3D effect
        containerRef.current.style.perspective = '1000px';
        containerRef.current.appendChild(rectangle);
        
        // Animation: zoom from a large size outside view toward the viewer
        tl.set(rectangle, { opacity: 1 })
          .fromTo(rectangle, 
            { 
              scale: 5, // Start much larger (outside view)
              z: -1000 // Start far behind
            },
            {
              scale: 1,
              z: 0,
              duration: 1,
              ease: 'sine.out'
            }
          )
          .set(video, { opacity: 0 })
          .call(() => {
            // Change video source
            video.querySelector('source').src = newVideoSrc;
            video.load();
            video.play();
            
            // CARD CONTENT CHANGE TIMING
            setCurrentCardIndex(nextCardIndex);
          })
          // Animation: zoom back in while sliding to the left
          .to(rectangle, {
            scale: 0.01,
            y: 0,
            xPercent: -200, // Use xPercent for straight horizontal movement
            duration: 1,
            ease: 'back.in(1.2)',
            onComplete: () => {
              if (rectangle.parentNode) {
                rectangle.parentNode.removeChild(rectangle);
                // Remove perspective when done
                containerRef.current.style.perspective = 'none';
              }
            }
          })
          .set(video, { opacity: 1 });
        break;

      case 2:
        // Venetian Blinds Effect
        const blindCount = 10; // Number of blinds
        const blinds = [];
        const blindsContainerWidth = containerRef.current.offsetWidth;
        const blindWidth = blindsContainerWidth / blindCount;
        
        // Create all blinds
        for (let i = 0; i < blindCount; i++) {
          const blind = document.createElement('div');
          blind.className = 'venetian-blind';
          blind.style.position = 'absolute';
          blind.style.top = '0';
          blind.style.left = `${i * blindWidth}px`;
          blind.style.width = `${blindWidth}px`;
          blind.style.height = '100%';
          blind.style.backgroundColor = 'white';
          blind.style.transformOrigin = 'left center';
          blind.style.transform = 'scaleX(0)';
          blind.style.zIndex = '10';
          
          containerRef.current.appendChild(blind);
          blinds.push(blind);
        }
        
        // Animate blinds to open
        tl.to(blinds, {
          scaleX: 1,
          stagger: 0.05,
          duration: 0.5,
          ease: 'power2.inOut'
        })
        .set(video, { opacity: 0 })
        .call(() => {
          // Change video source
          video.querySelector('source').src = newVideoSrc;
          video.load();
          video.play();
          
          // CARD CONTENT CHANGE TIMING
          setCurrentCardIndex(nextCardIndex);
        })
        // Animate blinds to close
        .to(blinds, {
          scaleX: 0,
          stagger: 0.05,
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete: () => {
            // Clean up
            blinds.forEach(blind => {
              if (blind.parentNode) {
                blind.parentNode.removeChild(blind);
              }
            });
          }
        })
        .set(video, { opacity: 1 });
        break;
        
      case 3:
        // Domino Fall Effect
        const numDominoes = 10; // Number of domino pieces
        const dominoElements = [];
        const containersWidth = containerRef.current.offsetWidth;
        const dominoWidth = containersWidth / numDominoes;
        const containersHeight = containerRef.current.offsetHeight;
        
        // Create domino elements
        for (let i = 0; i < numDominoes; i++) {
          const domino = document.createElement('div');
          domino.className = 'domino-piece';
          domino.style.position = 'absolute';
          domino.style.right = `${i * dominoWidth}px`;
          domino.style.top = '0';
          domino.style.width = `${dominoWidth}px`;
          domino.style.height = '0'; // Start with no height
          domino.style.backgroundColor = 'white';
          domino.style.zIndex = '10';
          domino.style.transformOrigin = 'top center'; // For the falling effect
          
          containerRef.current.appendChild(domino);
          dominoElements.push(domino);
        }
        
        // Animate dominoes falling in sequence from right to left
        const staggerDelay = 0.08; // Delay between each domino falling
        
        // First, make all dominoes appear at full height
        dominoElements.forEach((domino, index) => {
          tl.to(domino, {
            height: `${containersHeight}px`,
            duration: 0.7,
            ease: 'power1.out',
          }, index > 0 ? '<+' + (staggerDelay/2) : 0);
        });
        
        // Then make them fall like dominoes
        dominoElements.forEach((domino, index) => {
          tl.to(domino, {
            rotateX: 90, // Fall forward
            duration: 0.9,
            ease: 'power2.in',
          }, index > 0 ? '<+' + staggerDelay : 0.2); // Start after all appear
        });
        
        // Change video
        tl.set(video, { opacity: 0 })
          .call(() => {
            // Change video source
            video.querySelector('source').src = newVideoSrc;
            video.load();
            video.play();
            
            // Reset dominoes for exit animation
            dominoElements.forEach(domino => {
              domino.style.rotateX = '0deg';
              domino.style.right = ''; 
              domino.style.left = domino.style.right;
              domino.style.right = '';
            });
            
            // CARD CONTENT CHANGE TIMING
            setCurrentCardIndex(nextCardIndex);
          });
        
        // Animate dominoes out with a different effect - slide out to bottom
        tl.to(dominoElements, {
          top: '100%',
          duration: 0.5,
          ease: 'power2.in',
          stagger: staggerDelay,
          onComplete: () => {
            // Clean up
            dominoElements.forEach(domino => {
              if (domino.parentNode) {
                domino.parentNode.removeChild(domino);
              }
            });
          }
        });
        
        // Show new video
        tl.set(video, { opacity: 1 });
        break;
        
      case 4:
        // Simultaneous Horizontal Lines Wipe
        const lines = [
          document.createElement('div'),
          document.createElement('div'),
          document.createElement('div'),
          document.createElement('div')
        ];
        
        // Set up common styles for all lines
        lines.forEach((line, index) => {
          line.className = 'wipe-line';
          line.style.position = 'absolute';
          line.style.height = '25%'; // Each line takes exactly 1/4 of the screen height
          line.style.width = '100%';
          line.style.backgroundColor = 'white';
          line.style.zIndex = '10';
          line.style.top = `${index * 25}%`; // Position at 0%, 25%, 50%, 75%
          
          // Set initial positions (alternating right/left)
          if (index % 2 === 0) {
            // Even index lines start from right
            line.style.left = '100%';
          } else {
            // Odd index lines start from left
            line.style.left = '-100%';
          }
          
          containerRef.current.appendChild(line);
        });
        
        // Animate all lines together in one direction only
        tl
          // All lines move simultaneously
          .to(lines.filter((_, i) => i % 2 === 0), { 
            left: '-100%', // Even lines move from right to left
            duration: 0.6, 
            ease: 'power2.inOut'
          })
          .to(lines.filter((_, i) => i % 2 === 1), { 
            left: '100%',  // Odd lines move from left to right
            duration: 0.6, 
            ease: 'power2.inOut'
          }, '<') // The '<' makes this animation start at the same time as the previous one
          
          // Change video
          .set(video, { opacity: 0 })
          .call(() => {
            // Change video source
            video.querySelector('source').src = newVideoSrc;
            video.load();
            video.play();
            
            // CARD CONTENT CHANGE TIMING
            setCurrentCardIndex(nextCardIndex);
          })
          
          // Show new video
          .set(video, { opacity: 1 })
          // Clean up
          .call(() => {
            lines.forEach(line => {
              if (line.parentNode) {
                line.parentNode.removeChild(line);
              }
            });
          });
        break;
        
      case 5:
        // Split Vertical Swipe (Left up, Right down)
        const leftHalf = document.createElement('div');
        const rightHalf = document.createElement('div');
        
        // Common styles for both halves
        [leftHalf, rightHalf].forEach(half => {
          half.style.position = 'absolute';
          half.style.height = '100%';
          half.style.width = '80%';
          half.style.backgroundColor = 'white';
          half.style.zIndex = '10';
        });
        
        // Position the halves
        leftHalf.style.left = '0';
        leftHalf.style.top = '100%'; // Start from bottom, will move up
        
        rightHalf.style.right = '0';
        rightHalf.style.bottom = '100%'; // Start from top, will move down
        
        containerRef.current.appendChild(leftHalf);
        containerRef.current.appendChild(rightHalf);
        
        // Animate left half from bottom to top, right half from top to bottom
        tl.to(leftHalf, {
          top: '0%',
          duration: 0.7,
          ease: 'power2.inOut'
        })
        .to(rightHalf, {
          bottom: '0%',
          duration: 0.7,
          ease: 'power2.inOut'
        }, '<') // Start at the same time as left half
        .set(video, { opacity: 0 })
        .call(() => {
          // Change video source
          video.querySelector('source').src = newVideoSrc;
          video.load();
          video.play();
          
          // CARD CONTENT CHANGE TIMING
          setCurrentCardIndex(nextCardIndex);
        })
        // Animate out: left half continues up, right half continues down
        .to(leftHalf, {
          top: '-100%',
          duration: 0.7,
          ease: 'power2.inOut'
        })
        .to(rightHalf, {
          bottom: '-100%',
          duration: 0.7,
          ease: 'power2.inOut',
          onComplete: () => {
            // Clean up
            [leftHalf, rightHalf].forEach(el => {
              if (el.parentNode) {
                el.parentNode.removeChild(el);
              }
            });
          }
        }, '<') // Start at the same time as left half
        .set(video, { opacity: 1 });
        break;
      
      case 6:
        // Staircase Wipe
        const bars = [];
        const barCount = 4;
        const containersssHeight = containerRef.current.offsetHeight;
        const barHeight = containersssHeight / barCount;
        
        // Create staircase bars
        for (let i = 0; i < barCount; i++) {
          const bar = document.createElement('div');
          bar.className = 'staircase-bar';
          bar.style.position = 'absolute';
          bar.style.width = '0';
          bar.style.height = `${barHeight}px`;
          bar.style.left = '-10%'; // Start off-screen
          bar.style.top = `${i * barHeight}px`;
          bar.style.backgroundColor = 'white';
          bar.style.zIndex = '10';
          
          // Make bars thicker in the middle
          if (i === 1 || i === 2) {
            bar.style.height = `${barHeight * 1.2}px`;
          }
          
          containerRef.current.appendChild(bar);
          bars.push(bar);
        }
        
        // First animate bars from left to right
        tl.to(bars, {
          width: '120%', // Extra width to ensure it covers the screen
          left: '0%',
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.inOut'
        })
        .set(video, { opacity: 0 }, 0.3)
        .call(() => {
          // Change video source
          video.querySelector('source').src = newVideoSrc;
          video.load();
          video.play();
          
          // CARD CONTENT CHANGE TIMING
          setCurrentCardIndex(nextCardIndex);
        })
        // Then animate bars continuing off-screen to the right
        .to(bars, {
          left: '100%',
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.inOut',
          onComplete: () => {
            // Clean up
            bars.forEach(bar => {
              if (bar.parentNode) {
                bar.parentNode.removeChild(bar);
              }
            });
          }
        })
        .set(video, { opacity: 1 });
        break;
    }
  };

  // Handle wheel events
  const handleWheel = (e) => {
    e.preventDefault();
    
    // Don't process if a video transition is in progress
    if (animationState !== 'idle') return;
    
    // Determine direction
    const scrollDirection = e.deltaY > 0 ? 1 : -1;
    
    // Calculate new index with boundary checks
    const newIndex = Math.min(
      Math.max(0, currentCardIndex + scrollDirection),
      cardContents.length - 1
    );
    
    // Only update if the index actually changes
    if (newIndex !== currentCardIndex) {
      // Set direction for tracking purposes
      setDirection(scrollDirection);
      
      // Set to processing state to prevent multiple wheel events
      setAnimationState('processing');
      
      // Change the video with transition - card content change happens inside this function now
      changeBackgroundVideo(newIndex);
      
      // Note: We no longer update currentCardIndex here
      // setCurrentCardIndex(newIndex); - REMOVED
      
      // Reset to idle state after video transition completes
      setTimeout(() => {
        setAnimationState('idle');
      }, 1500);
    }
  };

  useEffect(() => {
    // Audio setup
    const audio = audioRef.current;
    audio.play().catch((err) => {
      console.log("Audio autoplay was prevented by the browser:", err);

      const startAudioOnInteraction = () => {
        audio.play().catch((e) => console.log("Audio still couldn't play:", e));
        document.removeEventListener("click", startAudioOnInteraction);
      };

      document.addEventListener("click", startAudioOnInteraction);
    });
    
    // Add wheel event listener
    const container = containerRef.current;
    container.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      container.removeEventListener('wheel', handleWheel);
      if (audio) {
        audio.pause();
      }
    };
  }, [currentCardIndex, animationState]); // Dependencies include animation state

  // Determine animation classes
  const getCardClasses = () => {
    const baseClass = 'card';
    
    if (animationState === 'idle') return baseClass;
    if (animationState === 'entering') return `${baseClass} ${direction > 0 ? 'slide-in-up' : 'slide-in-down'}`;
    if (animationState === 'exiting') return `${baseClass} ${direction > 0 ? 'slide-out-up' : 'slide-out-down'}`;
    
    return baseClass;
  };

  return (
    <div className="home-container" ref={containerRef}>
      <video 
        className="background-video" 
        autoPlay 
        loop 
        muted 
        playsInline
        ref={videoRef}
      >
        <source src={getVideoForCard(currentCardIndex)} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Add transition elements */}
      <div className="transition-line" ref={transitionLineRef}></div>
      <div className="transition-circle" ref={transitionCircleRef}></div>
      <div className="transition-box" ref={transitionBoxRef}></div>

      <audio ref={audioRef} src={backgroundMusic} loop autoPlay />

      <div className="content-overlay">
        <div className="cards-container">
          <div className={getCardClasses()}>
            <div className="card-inner">
              {cardContents[currentCardIndex].customRender ? 
                // Use custom rendering if available
                cardContents[currentCardIndex].customRender() : 
                // Otherwise use standard title/text rendering
                <>
                  <h2>{cardContents[currentCardIndex].title}</h2>
                  <p>{cardContents[currentCardIndex].text}</p>
                </>
              }
            </div>
          </div>
        </div>
      </div>

      <div className="vertical-text right">
        <div className="vertical-line"></div>
        <span className="left-text">{t.projects.bespokeInEverySense}</span>
        <div className="project-title-container">
          <span className="large-text-primary">{t.projects.the}</span>
          <span className="large-text-secondary">{t.projects.projects}</span>
        </div>
      </div>

      <Navigation />
    </div>
  );
};

export default Home;
