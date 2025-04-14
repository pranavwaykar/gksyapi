import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import backgroundVideo from "../assets/Background Videos/GKSYAPI Video 1.mp4";
import backgroundVideo2 from "../assets/Background Videos/GKSYAPI Video 2.mp4";
import backgroundVideo3 from "../assets/Background Videos/GKSYAPI Video 3.mp4";
import backgroundVideo4 from "../assets/Background Videos/GKSYAPI Video 4.mp4";
import backgroundVideo5 from "../assets/Background Videos/GKSYAPI Video 5.mp4";
import backgroundVideo6 from "../assets/Background Videos/GKSYAPI Video 6.mp4";
import backgroundVideo7 from "../assets/Background Videos/GKSYAPI Video 7.mp4";
// import logo from "../assets/GKSYAPI Logo.png";
import backgroundMusic from "../assets/Audio Files/relaxing-piano-310597.mp3";
import Navigation from "../components/Navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../translations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faVolumeUp, faVolumeMute } from "@fortawesome/free-solid-svg-icons";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const containerRef = useRef(null);
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  
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

          <div className="swipe-down-text">
            Scroll Down to Continue
            <FontAwesomeIcon icon={faArrowDown} style={{height:"20px"}} />
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
  const changeBackgroundVideo = (newCardIndex, newDirection) => {
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
    
    // Perform cool transition effects
    const tl = gsap.timeline({
      onUpdate: function() {
        // You can use this to track progress if needed
        // const progress = this.progress();
        // console.log("Animation progress:", progress);
      }
    });
    
    // Add debugging
    console.log("Direction:", newDirection);
    console.log("Current Card Index:", currentCardIndex);
    
    // Define forward and reverse transition sequences
    const forwardSequence = [1, 5, 4, 6, 0, 2, 3];
    const reverseSequence = [3, 2, 0, 6, 4, 5, 1]; // Reverse order of forward sequence
    
    // Choose sequence based on direction
    let transitionType;
    if (newDirection >= 0) {
      // Going down - use forward sequence
      const forwardIndex = currentCardIndex % forwardSequence.length;
      transitionType = forwardSequence[forwardIndex];
      console.log("Using forward sequence, index:", forwardIndex, "transition type:", transitionType);
    } else {
      // Going up - use reverse sequence
      const reverseIndex = currentCardIndex % reverseSequence.length;
      transitionType = reverseSequence[reverseIndex];
      console.log("Using reverse sequence, index:", reverseIndex, "transition type:", transitionType);
    }
    
    // Rest of transition code remains the same
    switch(transitionType) {
      case 0:
        // Horizontal Cards Split Vertically
        const cardsContainer = document.createElement('div');
        cardsContainer.style.position = 'absolute';
        cardsContainer.style.width = '100%';
        cardsContainer.style.height = '100%';
        cardsContainer.style.zIndex = '10';
        cardsContainer.style.overflow = 'hidden';
        containerRef.current.appendChild(cardsContainer);
        
        // Create left and right cards
        const leftCard = document.createElement('div');
        leftCard.style.position = 'absolute';
        leftCard.style.top = '0';
        leftCard.style.left = '-50%'; // Start off-screen left
        leftCard.style.width = '50%'; // Half width
        leftCard.style.height = '100%'; // Full height
        leftCard.style.backgroundColor = 'white';
        
        const rightCard = document.createElement('div');
        rightCard.style.position = 'absolute';
        rightCard.style.top = '0';
        rightCard.style.left = '100%'; // Start off-screen right
        rightCard.style.width = '50%'; // Half width
        rightCard.style.height = '100%'; // Full height
        rightCard.style.backgroundColor = 'white';
        
        cardsContainer.appendChild(leftCard);
        cardsContainer.appendChild(rightCard);
        
        // Use the timeline as it was working before
        tl.to(leftCard, {
          left: '0%', // Move to center
          duration: 1.2, // Increased from 0.7
          ease: 'power2.out',
          onStart: () => {
            // Change video source
            video.querySelector('source').src = newVideoSrc;
            video.load();
            video.play();
            
            // Keep the timing pattern from case 1
            fadeInCurrentCard('bottom', 1.8, 0.8);
          }
        }, 'moveIn')
        .to(rightCard, {
          left: '50%', // Move to center
          duration: 1.2, // Increased from 0.7
          ease: 'power2.out'
        }, 'moveIn') // Same label to animate simultaneously
        .set(video, { opacity: 0 })
        // Split vertically
        .to(leftCard, {
          top: '-100%', // Left card moves UP
          duration: 1.2, // Increased from 0.7
          ease: 'power2.in'
        }, 'moveOut')
        .to(rightCard, {
          top: '100%', // Right card moves DOWN
          duration: 1.2, // Increased from 0.7
          ease: 'power2.in',
          onComplete: () => {
            if (cardsContainer.parentNode) {
              cardsContainer.parentNode.removeChild(cardsContainer);
            }
          }
        }, 'moveOut') // Same label to animate simultaneously
        .set(video, { opacity: 1 });
        break;
        
        case 1:
          // Thick Border Rectangle Zoom - Split L Shape
          const containerWidth = containerRef.current.offsetWidth;
          const containerHeight = containerRef.current.offsetHeight;
          const borderWidthTop = `${containerHeight * 0.40}px`; // 40% border top
          const borderWidthRight = `${containerWidth * 0.30}px`; // 40% border right
          
          // Create container for both pieces
          const rectangleContainer = document.createElement('div');
          rectangleContainer.className = 'rectangle-zoom-container';
          rectangleContainer.style.position = 'absolute';
          rectangleContainer.style.top = '0';
          rectangleContainer.style.left = '0';
          rectangleContainer.style.width = '100%';
          rectangleContainer.style.height = '100%';
          rectangleContainer.style.zIndex = '10';
          rectangleContainer.style.opacity = '0'; // Start invisible
          
          // Create horizontal piece (top of the L)
          const horizontalPiece = document.createElement('div');
          horizontalPiece.className = 'rectangle-zoom-horizontal';
          horizontalPiece.style.position = 'absolute';
          horizontalPiece.style.top = '0';
          horizontalPiece.style.left = '0';
          horizontalPiece.style.width = '100%';
          horizontalPiece.style.height = borderWidthTop;
          horizontalPiece.style.backgroundColor = 'white';
          horizontalPiece.style.zIndex = '11';
          
          // Create vertical piece (right side of the L)
          const verticalPiece = document.createElement('div');
          verticalPiece.className = 'rectangle-zoom-vertical';
          verticalPiece.style.position = 'absolute';
          verticalPiece.style.top = '0';
          verticalPiece.style.right = '0';
          verticalPiece.style.width = borderWidthRight;
          verticalPiece.style.height = '100%';
          verticalPiece.style.backgroundColor = 'white';
          verticalPiece.style.zIndex = '11';
          
          // Add pieces to container
          rectangleContainer.appendChild(horizontalPiece);
          rectangleContainer.appendChild(verticalPiece);
          
          // Add perspective to container for 3D effect
          containerRef.current.style.perspective = '1000px';
          containerRef.current.appendChild(rectangleContainer);
          
          // Animation: zoom from a large size outside view toward the viewer
          tl.set(rectangleContainer, { opacity: 1 })
            .fromTo([horizontalPiece, verticalPiece], 
              { 
                scale: 5, // Start much larger (outside view)
                z: -1000 // Start far behind
              },
              {
                scale: 1,
                z: 0,
                duration: 1.5, // Increased from 1.0
                ease: 'sine.out',
                onStart: () => {
                  // Change video source
                  video.querySelector('source').src = newVideoSrc;
                  video.load();
                  video.play();
                  
                  // Keep the successful timing
                  fadeInCurrentCard('bottom', 0.4, 1);
                }
              }
            )
            .set(video, { opacity: 0 })
            // Different exit animations for horizontal and vertical pieces
            .to(horizontalPiece, {
              x: '-100%', // Horizontal piece slides left
              duration: 1.5, // Increased from 1.0
              ease: 'back.in(1.2)'
            }, 'exitPieces')
            .to(verticalPiece, {
              y: '100%', // Vertical piece slides down
              duration: 1.5, // Increased from 1.0
              ease: 'back.in(1.2)',
              onComplete: () => {
                if (rectangleContainer.parentNode) {
                  rectangleContainer.parentNode.removeChild(rectangleContainer);
                  // Remove perspective when done
                  containerRef.current.style.perspective = 'none';
                }
              }
            }, 'exitPieces') // Same label to start at the same time
            .set(video, { opacity: 1 });
          break;

      case 2:
        // Horizontal Lines Meeting Effect
        const linesContainer = document.createElement('div');
        linesContainer.style.position = 'absolute';
        linesContainer.style.top = '0';
        linesContainer.style.left = '0';
        linesContainer.style.width = '100%';
        linesContainer.style.height = '100%';
        linesContainer.style.zIndex = '10';
        linesContainer.style.overflow = 'hidden';
        containerRef.current.appendChild(linesContainer);
        
        // Create 3 horizontal lines
        const lineHeight = containerRef.current.offsetHeight / 3;
        
        // First line - comes from left
        const line1 = document.createElement('div');
        line1.style.position = 'absolute';
        line1.style.top = '0';
        line1.style.left = '-100%';  // Start off-screen left
        line1.style.width = '100%';
        line1.style.height = `${lineHeight}px`;
        line1.style.backgroundColor = 'white';
        
        // Second line - comes from right
        const line2 = document.createElement('div');
        line2.style.position = 'absolute';
        line2.style.top = `${lineHeight}px`;
        line2.style.left = '100%';  // Start off-screen right
        line2.style.width = '100%';
        line2.style.height = `${lineHeight}px`;
        line2.style.backgroundColor = 'white';
        
        // Third line - comes from right
        const line3 = document.createElement('div');
        line3.style.position = 'absolute';
        line3.style.top = `${lineHeight * 2}px`;
        line3.style.left = '100%';  // Start off-screen right
        line3.style.width = '100%';
        line3.style.height = `${lineHeight}px`;
        line3.style.backgroundColor = 'white';
        
        // Add lines to container
        linesContainer.appendChild(line1);
        linesContainer.appendChild(line2);
        linesContainer.appendChild(line3);
        
        // Animate lines to meet in the middle
        tl.to(line1, {
          left: '0%',
          duration: 1.0, // Increased from 0.6
          ease: 'power2.out',
          onStart: () => {
            // Change video source
            video.querySelector('source').src = newVideoSrc;
            video.load();
            video.play();
            
            // Keep consistent timing
            fadeInCurrentCard('bottom', 1.2, 1.4);
          }
        }, 'linesIn')
        .to([line2, line3], {
          left: '0%',
          duration: 1.0, // Increased from 0.6
          stagger: 0.15, // Increased from 0.1
          ease: 'power2.out'
        }, 'linesIn') // Use same label to animate together
        .set(video, { opacity: 0 })
        // Animate the entire container up out of view
        .to(linesContainer, {
          y: '-100%',
          duration: 1.2, // Increased from 0.7
          ease: 'power2.in',
          onComplete: () => {
            // Clean up
            if (linesContainer.parentNode) {
              linesContainer.parentNode.removeChild(linesContainer);
            }
          }
        })
        .set(video, { opacity: 1 });
        break;
        
      case 3:
        // Domino Fall Effect
        const dominoContainer = document.createElement('div');
        dominoContainer.style.position = 'absolute';
        dominoContainer.style.width = '100%';
        dominoContainer.style.height = '100%';
        dominoContainer.style.zIndex = '10';
        dominoContainer.style.overflow = 'hidden';
        containerRef.current.appendChild(dominoContainer);
        
        // Create dominos - REDUCED COUNT FOR BIGGER DOMINOS
        const dominoCount = 12; // Reduced from 20 to make dominos bigger
        const dominoWidth = 100 / dominoCount;
        const dominos = [];
        
        for (let i = 0; i < dominoCount; i++) {
          const domino = document.createElement('div');
          domino.style.position = 'absolute';
          domino.style.top = '0';
          domino.style.left = `${i * dominoWidth}%`;
          domino.style.width = `${dominoWidth}%`;
          domino.style.height = '100%';
          domino.style.backgroundColor = 'white';
          domino.style.transformOrigin = 'center top';
          domino.style.transform = 'rotateX(90deg)';
          
          dominoContainer.appendChild(domino);
          dominos.push(domino);
        }
        
        // Track if this transition is in progress
        let dominoTransitionActive = true;
        
        // Ensure cleanup happens if the component unmounts or transition is interrupted
        const cleanupDominos = () => {
          if (dominoContainer.parentNode) {
            dominoContainer.parentNode.removeChild(dominoContainer);
          }
          dominoTransitionActive = false;
        };
        
        // Add domino fall animation - SLOWED DOWN FURTHER
        tl.to(dominos, {
          rotateX: 0,
          stagger: 0.08, // Increased from 0.05
          duration: 0.9, // Increased from 0.6
          ease: 'power1.inOut',
          onStart: () => {
            // Change video source
            video.querySelector('source').src = newVideoSrc;
            video.load();
            video.play();
            
            // Keep consistent timing
            fadeInCurrentCard('bottom', 1.6, 1.4);
          }
        })
        .set(video, { opacity: 0 })
        // Fall down the other way
        .to(dominos, {
          rotateX: -90,
          stagger: 0.08, // Increased from 0.05
          duration: 0.9, // Increased from 0.6
          ease: 'power1.inOut',
          onComplete: cleanupDominos,
          // Add cleanup to each domino's animation for redundancy
          onInterrupt: cleanupDominos
        })
        // Add cleanup call earlier in the timeline as well
        .call(() => {
          if (dominoTransitionActive) {
            cleanupDominos();
          }
        }, null, "-=0.5")
        .set(video, { opacity: 1 });
        
        // Safety timeout to ensure cleanup happens even if animation is interrupted
        setTimeout(cleanupDominos, 5000); // Increased from 4000 to match slower animation
        break;
        
        case 4:
          // Vertical Sections Slide with Special Middle Section
          const sectionsContainer = document.createElement('div');
          sectionsContainer.style.position = 'absolute';
          sectionsContainer.style.width = '100%';
          sectionsContainer.style.height = '100%';
          sectionsContainer.style.zIndex = '10';
          sectionsContainer.style.display = 'flex';
          sectionsContainer.style.left = '-100%'; // Start off-screen left
          sectionsContainer.style.overflow = 'hidden'; // Hide overflow
          containerRef.current.appendChild(sectionsContainer);
          
          // Create three vertical sections - all white initially
          // Left section (60% width)
          const leftSection = document.createElement('div');
          leftSection.style.width = '67.5%';
          leftSection.style.height = '100%';
          leftSection.style.backgroundColor = 'white';
          
          // Middle section container (10% width)
          const middleSectionContainer = document.createElement('div');
          middleSectionContainer.style.width = '3.8rem';
          middleSectionContainer.style.height = '100%';
          middleSectionContainer.style.position = 'relative';
          middleSectionContainer.style.overflow = 'hidden'; // Hide overflow
          
          // For the middle section, create a white visible part and a blue hidden part
          const middleWhiteVisible = document.createElement('div');
          middleWhiteVisible.style.position = 'absolute';
          middleWhiteVisible.style.width = '100%';
          middleWhiteVisible.style.height = '100%';
          middleWhiteVisible.style.backgroundColor = 'white';
          middleWhiteVisible.style.top = '0';
          
          // Blue part that will slide in from the top - initially hidden
          const middleBlueHidden = document.createElement('div');
          middleBlueHidden.style.position = 'absolute';
          middleBlueHidden.style.width = '100%';
          middleBlueHidden.style.height = '100%';
          middleBlueHidden.style.backgroundColor = '#0038b3';
          middleBlueHidden.style.top = '-100%'; // Hidden above
          
          middleSectionContainer.appendChild(middleWhiteVisible);
          middleSectionContainer.appendChild(middleBlueHidden);
          
          // Right section (30% width)
          const rightSection = document.createElement('div');
          rightSection.style.width = '25%';
          rightSection.style.height = '100%';
          rightSection.style.backgroundColor = 'white';
          
          // Add sections to container
          sectionsContainer.appendChild(leftSection);
          sectionsContainer.appendChild(middleSectionContainer);
          sectionsContainer.appendChild(rightSection);
          
          // First animate whole container from left to cover viewport - all white
          tl.to(sectionsContainer, {
            left: '0%',
            duration: 1.2, // Increased from 0.7
            ease: 'power2.out',
            onStart: () => {
              // Change video source
              video.querySelector('source').src = newVideoSrc;
              video.load();
              video.play();
              
              // Keep consistent timing
              fadeInCurrentCard('bottom', 1.6, 0.5);
            }
          })
          .set(video, { opacity: 0 })
          // Animate side sections up
          .to([leftSection, rightSection], {
            y: '-100%', // White sections slide up
            duration: 1.2, // Increased from 0.7
            ease: 'power2.in'
          }, 'sectionsOut')
          // First move blue section into view
          .to(middleBlueHidden, {
            top: '0%', // Bring blue part into view
            duration: 1.2, // Increased from 0.7
            ease: 'power2.in'
          }, 'sectionsOut')
          // Then move white section out of view
          .to(middleWhiteVisible, {
            top: '100%', // Move white part down out of view
            duration: 1.2, // Increased from 0.7
            ease: 'power2.in'
          }, 'sectionsOut+=0.3') // Slightly delayed (increased from 0.2)
          // Continue moving the whole middle section down
          .to(middleSectionContainer, {
            top: '100%', // Move entire container down out of view
            duration: 1.2, // Increased from 0.7
            ease: 'power2.in',
            onComplete: () => {
              if (sectionsContainer.parentNode) {
                sectionsContainer.parentNode.removeChild(sectionsContainer);
              }
            }
          }, 'sectionsOut+=1.0') // Start after white has moved out (increased from 0.7)
          .set(video, { opacity: 1 });
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
          duration: 1.2, // Increased from 0.7
          ease: 'power2.inOut',
          onStart: () => {
            // Change video source
            video.querySelector('source').src = newVideoSrc;
            video.load();
            video.play();
            
            // Keep consistent timing
            fadeInCurrentCard('bottom', 1.4, 1);
          }
        })
        .to(rightHalf, {
          bottom: '0%',
          duration: 1.2, // Increased from 0.7
          ease: 'power2.inOut'
        }, '<') // Start at the same time as left half
        .set(video, { opacity: 0 })
        // Animate out: left half continues up, right half continues down
        .to(leftHalf, {
          top: '-100%',
          duration: 1.2, // Increased from 0.7
          ease: 'power2.inOut'
        })
        .to(rightHalf, {
          bottom: '-100%',
          duration: 1.2, // Increased from 0.7
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
          duration: 1.2, // Increased from 0.7
          stagger: 0.15, // Increased from 0.1
          ease: 'power2.inOut',
          onStart: () => {
            // Change video source
            video.querySelector('source').src = newVideoSrc;
            video.load();
            video.play();
            
            // Keep consistent timing
            fadeInCurrentCard('left', 2.6, 1.2);
          }
        })
        .set(video, { opacity: 0 }, 0.5) // Increased from 0.3
        // Then animate bars continuing off-screen to the right
        .to(bars, {
          left: '100%',
          duration: 1.2, // Increased from 0.7
          stagger: 0.15, // Increased from 0.1
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

      case 7:
        // Slide Up Transition
        const slideContainer = document.createElement('div');
        slideContainer.style.position = 'absolute';
        slideContainer.style.width = '100%';
        slideContainer.style.height = '100%';
        slideContainer.style.zIndex = '10';
        slideContainer.style.overflow = 'hidden';
        containerRef.current.appendChild(slideContainer);
        
        // Create sliding panel
        const slidingPanel = document.createElement('div');
        slidingPanel.style.position = 'absolute';
        slidingPanel.style.left = '0';
        slidingPanel.style.width = '100%';
        slidingPanel.style.height = '100%';
        slidingPanel.style.backgroundColor = 'white';
        slidingPanel.style.transform = 'translateY(100%)'; // Start below the screen
        
        slideContainer.appendChild(slidingPanel);
        
        // Animate panel sliding up from bottom
        tl.to(slidingPanel, {
          y: '0%', // Move to cover screen
          duration: 1.0, // Increased from 0.6
          ease: 'power2.out',
          onStart: () => {
            // Change video source
            video.querySelector('source').src = newVideoSrc;
            video.load();
            video.play();
            
            // Keep consistent timing
            fadeInCurrentCard('bottom', 0.2, 0.5);
          }
        })
        .set(video, { opacity: 0 })
        // Continue sliding up to exit the screen
        .to(slidingPanel, {
          y: '-100%', // Move up off screen
          duration: 1.0, // Increased from 0.6
          ease: 'power2.in',
          onComplete: () => {
            if (slideContainer.parentNode) {
              slideContainer.parentNode.removeChild(slideContainer);
            }
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
    
    // Debug the actual index change
    console.log("Current index:", currentCardIndex, "New index:", newIndex, "Direction:", scrollDirection);
    
    // Only update if the index actually changes
    if (newIndex !== currentCardIndex) {
      // Set to processing state to prevent multiple wheel events
      setAnimationState('processing');
      
      // Update current card index immediately to ensure proper next transition calculation
      setCurrentCardIndex(newIndex);
      
      // Pass the direction directly instead of relying on state
      changeBackgroundVideo(newIndex, scrollDirection);
      
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


  // Function to toggle music play/pause
  const toggleMusic = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isMusicPlaying) {
        audio.pause();
      } else {
        audio.play().catch(err => {
          console.log("Could not play audio:", err);
        });
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };
  
  
  // Determine animation classes
  const getCardClasses = () => {
    const baseClass = 'card';
    
    if (animationState === 'idle') return baseClass;
    if (animationState === 'entering') return `${baseClass} ${direction > 0 ? 'slide-in-up' : 'slide-in-down'}`;
    if (animationState === 'exiting') return `${baseClass} ${direction > 0 ? 'slide-out-up' : 'slide-out-down'}`;
    
    return baseClass;
  };

  const fadeInCurrentCard = (direction = 'bottom', delay = 0, duration = 0.4) => {
    if (!containerRef.current) return;
    
    // Find the current card inner content
    const cardInner = containerRef.current.querySelector('.card-inner');
    if (!cardInner) return;
    
    // Define the initial position based on direction
    let initialX = 0;
    let initialY = 0;
    
    // Set initial position based on specified direction
    switch (direction) {
      case 'top':
        initialY = -100;
        break;
      case 'bottom':
        initialY = 100;
        break;
      case 'left':
        initialX = -100;
        break;
      case 'right':
        initialX = 100;
        break;
      case 'none': // No slide, just fade
        initialX = 0;
        initialY = 0;
        break;
      default:
        initialY = 100; // Default to bottom
    }
    
    // Reset position and opacity first
    gsap.set(cardInner, { 
      opacity: 0, 
      x: initialX, 
      y: initialY 
    });
    
    // Animate fade in with slide from the determined direction
    gsap.to(cardInner, {
      opacity: 1,
      x: 0,
      y: 0,
      duration: duration,
      delay: delay,
      ease: 'sine'
    });
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

            {/* Add music control button */}
            <div className="music-control">
        <button onClick={toggleMusic} title={isMusicPlaying ? "Mute music" : "Play music"}>
          <FontAwesomeIcon 
            icon={isMusicPlaying ? faVolumeUp : faVolumeMute} 
            size="sm" 
          />
        </button>
      </div>

      <Navigation />
    </div>
  );
};

export default Home;
