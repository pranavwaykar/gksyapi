import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import backgroundVideo from "../assets/Background Videos/GKSYAPI Video 1.mp4";
import backgroundVideo2 from "../assets/Background Videos/GKSYAPI Video 2.mp4";
import backgroundVideo3 from "../assets/Background Videos/GKSYAPI Video 3.mp4";
import backgroundVideo4 from "../assets/Background Videos/GKSYAPI Video 4.mp4";
import backgroundVideo5 from "../assets/Background Videos/GKSYAPI Video 5.mp4";
import backgroundVideo6 from "../assets/Background Videos/GKSYAPI Video 6.mp4";
import backgroundVideo7 from "../assets/Background Videos/GKSYAPI Video 7.mp4";
import backgroundMusic from "../assets/Audio Files/bg_music.mp3";
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
  
  const [currentVolume, setCurrentVolume] = useState(0);
  const targetVolume = 0.025;
  
  
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [animationState, setAnimationState] = useState('idle');
  const [isLoading, setIsLoading] = useState(true);
  
  const { language } = useLanguage();
  const t = translations[language];
  const statsRowRef = useRef(null);
  const sloganRef = useRef(null);
  const swipeDownRef = useRef(null);
  const bluePlaceholderRef = useRef(null);
  const secondBluePlaceholderRef = useRef(null);

  const cardContents = [
    { 
      customRender: () => (
        <div className="stats-overview">
          <div className="stats-row" ref={statsRowRef}>
            <div className="stat-item">
              <div className="stat-number">1994</div>
              <div className="stat-label">{t.homePage.establishedIn}</div>
            </div>
            
            <div className="stat-item">
              <div className="stat-number">25+</div>
              <div className="stat-label">{t.homePage.yearsInConstruction}</div>
            </div>
            
            <div className="stat-item">
              <div className="stat-number">100+</div>
              <div className="stat-label">{t.homePage.completedProjects}</div>
            </div>
            
            <div className="stat-item">
              <div className="stat-number">20+</div>
              <div className="stat-label">{t.homePage.ongoingProjects}</div>
            </div>
          </div>
          
          <div className="company-slogan" ref={sloganRef}>
            <h1>{t.homePage.tagline1}</h1>
            <h1>{t.homePage.tagline2}</h1>
          </div>

          <div className="swipe-down-text" ref={swipeDownRef}>
            {t.homePage.scroll}
            <FontAwesomeIcon icon={faArrowDown} style={{height:"20px"}} />
          </div>
        </div>
      )
    },
    { 
      customRender: () => (
        <div className="about-us-container">
          <div className="about-header">
            <span className="section-label">{t.homePage.aboutUs.sectionLabel}</span>
            <h1 className="about-title">
              {t.homePage.aboutUs.title1} <br />
              {t.homePage.aboutUs.title2}
            </h1>
          </div>
          
          <div className="about-description">
            <p>{t.homePage.aboutUs.paragraph1}</p>
            <p>{t.homePage.aboutUs.paragraph2}</p>
          </div>
          
          <div className="about-blue-placeholder" 
               ref={bluePlaceholderRef}
              >          
          </div>
        </div>
      )
    },
    { 
      customRender: () => (
        <div className="solutions-container">
          <div className="solutions-header">
            <span className="section-label">{t.homePage.solutions.sectionLabel}</span>
            <h1 className="solutions-title">
              {t.homePage.solutions.title1} <br />
              {t.homePage.solutions.title2}
            </h1>
          </div>
          
          <div className="solutions-description">
            <p>
              {t.homePage.solutions.description}
            </p>
          </div>
          
          <div className="solutions-categories">
            <span className="category-item">{t.homePage.solutions.category1}</span>
            <span className="category-divider">|</span>
            <span className="category-item">{t.homePage.solutions.category2}</span>
            <span className="category-divider">|</span>
            <span className="category-item">{t.homePage.solutions.category3}</span>
            <span className="category-divider">|</span>
            <span className="category-item">{t.homePage.solutions.category4}</span>
          </div>

          <div className="solutions-blue-placeholder" 
               ref={secondBluePlaceholderRef}
>          
          </div>
        </div>
      )
    },
    { 
      customRender: () => (
        <div className="housing-container">
          <div className="blue-accent-right">
            <div className="page-indicator">1/5</div>
          </div>
          
          <div className="housing-header">
            <span className="section-label">{t.homePage.housing.sectionLabel}</span>
            <h1 className="housing-title">
              {t.homePage.housing.title1} <br />
              {t.homePage.housing.title2}
            </h1>
          </div>
          
          <div className="housing-description">
            <p>
              {t.homePage.housing.description}
            </p>
          </div>
          
          <div className="housing-cta">
            <button className="cta-button">
              {t.homePage.housing.ctaButton}
            </button>
          </div>
        </div>
      )
    },
    { 
      customRender: () => (
        <div className="housing-container">
          <div className="blue-accent-right">
            <div className="page-indicator">2/5</div>
          </div>
          
          <div className="housing-header">
            <span className="section-label">{t.homePage.services.sectionLabel}</span>
            <h1 className="housing-title">
              {t.homePage.customBuilt.title1} <br />
              {t.homePage.customBuilt.title2}
            </h1>
          </div>
          
          <div className="housing-description">
            <p>
              {t.homePage.customBuilt.description}
            </p>
          </div>
          
          <div className="housing-cta">
            <button className="cta-button">
              {t.homePage.customBuilt.ctaButton}
            </button>
          </div>
        </div>
      )
    },
    { 
      customRender: () => (
        <div className="housing-container">
          <div className="blue-accent-right">
            <div className="page-indicator">3/5</div>
          </div>
          
          <div className="housing-header">
            <span className="section-label">{t.homePage.services.sectionLabel}</span>
            <h1 className="housing-title">
              {t.homePage.buildingFuture.title1} <br />
              {t.homePage.buildingFuture.title2}
            </h1>
          </div>
          
          <div className="housing-description">
            <p>
              {t.homePage.buildingFuture.description}
            </p>
          </div>
          
          <div className="housing-cta">
            <button className="cta-button">
              {t.homePage.buildingFuture.ctaButton}
            </button>
          </div>
        </div>
      )
    },
    { 
      customRender: () => (
        <div className="housing-container">
          <div className="blue-accent-right">
            <div className="page-indicator">4/5</div>
          </div>
          
          <div className="housing-header">
            <span className="section-label">{t.homePage.services.sectionLabel}</span>
            <h1 className="housing-title">
              {t.homePage.urbanTransformation.title1} <br />
              {t.homePage.urbanTransformation.title2}
            </h1>
          </div>
          
          <div className="housing-description">
            <p>
              {t.homePage.urbanTransformation.description}
            </p>
          </div>
          
          <div className="housing-cta">
            <button className="cta-button">
              {t.homePage.urbanTransformation.ctaButton}
            </button>
          </div>
        </div>
      )
    },
    { 
      customRender: () => (
        <div className="housing-container">
          <div className="blue-accent-right">
            <div className="page-indicator">5/5</div>
          </div>
          
          <div className="housing-header">
            <span className="section-label">{t.homePage.services.sectionLabel}</span>
            <h1 className="housing-title">
              {t.homePage.sustainableLiving.title1} <br />
              {t.homePage.sustainableLiving.title2}
            </h1>
          </div>
          
          <div className="housing-description">
            <p>
              {t.homePage.sustainableLiving.description}
            </p>
          </div>
          
          <div className="housing-cta">
            <button className="cta-button">
              {t.homePage.sustainableLiving.ctaButton}
            </button>
          </div>
        </div>
      )
    }
  ];

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

  const transitionLineRef = useRef(null);
  const transitionCircleRef = useRef(null);
  const transitionBoxRef = useRef(null);
  
  const changeBackgroundVideo = (newCardIndex, newDirection) => {
    if (!videoRef.current) return;
    
    const video = videoRef.current;
    const currentSrc = video.querySelector('source').getAttribute('src');
    const newVideoSrc = getVideoForCard(newCardIndex);
    
    const getCurrentVideoName = (path) => {
      return path.split('/').pop();
    };
    
    const currentVideoName = getCurrentVideoName(currentSrc);
    const newVideoName = getCurrentVideoName(newVideoSrc);
    
    if (currentVideoName === newVideoName) {
      return;
    }
    
    const tl = gsap.timeline({
      onUpdate: function() {
      }
    });
    
    const forwardSequence = [1, 5, 4, 6, 0, 2, 3];
    const reverseSequence = [3, 2, 0, 6, 4, 5, 1];
    
    let transitionType;
    if (newDirection >= 0) {
      const forwardIndex = currentCardIndex % forwardSequence.length;
      transitionType = forwardSequence[forwardIndex];
    } else {
      const reverseIndex = currentCardIndex % reverseSequence.length;
      transitionType = reverseSequence[reverseIndex];
    }
    
    switch(transitionType) {
      case 0:
        const cardsContainer = document.createElement('div');
        cardsContainer.style.position = 'absolute';
        cardsContainer.style.width = '100%';
        cardsContainer.style.height = '100%';
        cardsContainer.style.zIndex = '10';
        cardsContainer.style.overflow = 'hidden';
        containerRef.current.appendChild(cardsContainer);
        
        const leftCard = document.createElement('div');
        leftCard.style.position = 'absolute';
        leftCard.style.top = '0';
        leftCard.style.left = '-50%';
        leftCard.style.width = '50%';
        leftCard.style.height = '100%';
        leftCard.style.backgroundColor = 'white';
        
        const rightCard = document.createElement('div');
        rightCard.style.position = 'absolute';
        rightCard.style.top = '0';
        rightCard.style.left = '100%';
        rightCard.style.width = '50%';
        rightCard.style.height = '100%';
        rightCard.style.backgroundColor = 'white';
        
        cardsContainer.appendChild(leftCard);
        cardsContainer.appendChild(rightCard);
        
        tl.to(leftCard, {
          left: '0%',
          duration: 1.2,
          ease: 'power2.out',
          onStart: () => {
            video.querySelector('source').src = newVideoSrc;
            video.load();
            video.play();
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
          const containerWidth = containerRef.current.offsetWidth;
          const containerHeight = containerRef.current.offsetHeight;
          const borderHeightRatio = containerHeight < 1900 ? 0.37 : 0.40;
          const borderWidthTop = `${containerHeight * borderHeightRatio}px`;

          const borderWidthRatio = containerWidth < 1900 ? 0.29 : 0.279;
          const borderWidthRight = `${containerWidth * borderWidthRatio}px`;
          const rectangleContainer = document.createElement('div');
          rectangleContainer.className = 'rectangle-zoom-container';
          rectangleContainer.style.position = 'absolute';
          rectangleContainer.style.top = '0';
          rectangleContainer.style.left = '0';
          rectangleContainer.style.width = '100%';
          rectangleContainer.style.height = '100%';
          rectangleContainer.style.zIndex = '10';
          rectangleContainer.style.opacity = '0';
          
          const horizontalPiece = document.createElement('div');
          horizontalPiece.className = 'rectangle-zoom-horizontal';
          horizontalPiece.style.position = 'absolute';
          horizontalPiece.style.top = '0';
          horizontalPiece.style.left = '0';
          horizontalPiece.style.width = '100%';
          horizontalPiece.style.height = borderWidthTop;
          horizontalPiece.style.backgroundColor = 'white';
          horizontalPiece.style.zIndex = '11';
          
          const verticalPiece = document.createElement('div');
          verticalPiece.className = 'rectangle-zoom-vertical';
          verticalPiece.style.position = 'absolute';
          verticalPiece.style.top = '0';
          verticalPiece.style.right = '0';
          verticalPiece.style.width = borderWidthRight;
          verticalPiece.style.height = '100%';
          verticalPiece.style.backgroundColor = 'white';
          verticalPiece.style.zIndex = '11';
          
          rectangleContainer.appendChild(horizontalPiece);
          rectangleContainer.appendChild(verticalPiece);
          
          containerRef.current.style.perspective = '1000px';
          containerRef.current.appendChild(rectangleContainer);
          
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
        const linesContainer = document.createElement('div');
        linesContainer.style.position = 'absolute';
        linesContainer.style.top = '0';
        linesContainer.style.left = '0';
        linesContainer.style.width = '100%';
        linesContainer.style.height = '100%';
        linesContainer.style.zIndex = '10';
        linesContainer.style.overflow = 'hidden';
        containerRef.current.appendChild(linesContainer);
        
        const lineHeight = containerRef.current.offsetHeight / 3;
        
        const line1 = document.createElement('div');
        line1.style.position = 'absolute';
        line1.style.top = '0';
        line1.style.left = '-100%';
        line1.style.width = '100%';
        line1.style.height = `${lineHeight}px`;
        line1.style.backgroundColor = 'white';
        
        const line2 = document.createElement('div');
        line2.style.position = 'absolute';
        line2.style.top = `${lineHeight}px`;
        line2.style.left = '100%';
        line2.style.width = '100%';
        line2.style.height = `${lineHeight}px`;
        line2.style.backgroundColor = 'white';
        
        const line3 = document.createElement('div');
        line3.style.position = 'absolute';
        line3.style.top = `${lineHeight * 2}px`;
        line3.style.left = '100%';
        line3.style.width = '100%';
        line3.style.height = `${lineHeight}px`;
        line3.style.backgroundColor = 'white';
        
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
        const slidingContainer = document.createElement('div');
        slidingContainer.style.position = 'absolute';
        slidingContainer.style.width = '100%';
        slidingContainer.style.height = '100%';
        slidingContainer.style.zIndex = '10';
        slidingContainer.style.overflow = 'hidden';
        containerRef.current.appendChild(slidingContainer);
        
        const largeRectangle = document.createElement('div');
        largeRectangle.style.position = 'absolute';
        largeRectangle.style.left = '0';
        largeRectangle.style.width = '70%';
        largeRectangle.style.height = '100%';
        largeRectangle.style.backgroundColor = 'white';
        largeRectangle.style.top = '100%';
        
        const smallRectangle = document.createElement('div');
        smallRectangle.style.position = 'absolute';
        smallRectangle.style.right = '0';
        smallRectangle.style.width = '30%';
        smallRectangle.style.height = '100%';
        smallRectangle.style.backgroundColor = 'white';
        smallRectangle.style.bottom = '100%';
        
        slidingContainer.appendChild(largeRectangle);
        slidingContainer.appendChild(smallRectangle);
        
        // Animate the entrance of both rectangles
        tl.to(largeRectangle, {
          top: '0%', // Slide up to position
          duration: 1.2,
          ease: 'power2.out',
          onStart: () => {
            // Change video source
            video.querySelector('source').src = newVideoSrc;
            video.load();
            video.play();
            
            // Fade in card content with consistent timing
            fadeInCurrentCard('bottom', 1.6, 1.4);
          }
        }, 'slidingIn')
        .to(smallRectangle, {
          bottom: '0%', // Slide down to position
          duration: 1.2,
          ease: 'power2.out'
        }, 'slidingIn') // Use same label to animate together
        .set(video, { opacity: 0 })
        // Animate the exit - back the way they came
        .to(largeRectangle, {
          top: '100%', // Slide back down
          duration: 1.2,
          ease: 'power2.in'
        }, 'slidingOut')
        .to(smallRectangle, {
          bottom: '100%', // Slide back up
          duration: 1.2,
          ease: 'power2.in',
          onComplete: () => {
            // Clean up
            if (slidingContainer.parentNode) {
              slidingContainer.parentNode.removeChild(slidingContainer);
            }
          }
        }, 'slidingOut') // Use same label to animate together
        .set(video, { opacity: 1 });
        break;
        
      case 4:
        const sectionsContainer = document.createElement('div');
        sectionsContainer.style.position = 'absolute';
        sectionsContainer.style.width = '100%';
        sectionsContainer.style.height = '100%';
        sectionsContainer.style.zIndex = '10';
        sectionsContainer.style.display = 'flex';
        sectionsContainer.style.left = '-100%';
        sectionsContainer.style.overflow = 'hidden';
        containerRef.current.appendChild(sectionsContainer);
        
        const leftSection = document.createElement('div');
        leftSection.style.width = containerRef.current.offsetWidth < 1900 ? '67.7%' : '68.5%';
        leftSection.style.height = '100%';
        leftSection.style.backgroundColor = 'white';
        
        const middleSectionContainer = document.createElement('div');
        middleSectionContainer.style.width = '3.8rem';
        middleSectionContainer.style.height = '100%';
        middleSectionContainer.style.position = 'relative';
        middleSectionContainer.style.overflow = 'hidden';
        
        const middleWhiteVisible = document.createElement('div');
        middleWhiteVisible.style.position = 'absolute';
        middleWhiteVisible.style.width = '100%';
        middleWhiteVisible.style.height = '100%';
        middleWhiteVisible.style.backgroundColor = 'white';
        middleWhiteVisible.style.top = '0';
        
        const middleBlueHidden = document.createElement('div');
        middleBlueHidden.style.position = 'absolute';
        middleBlueHidden.style.width = '100%';
        middleBlueHidden.style.height = '100%';
        middleBlueHidden.style.backgroundColor = '#0038b3';
        middleBlueHidden.style.top = '-100%';
        
        middleSectionContainer.appendChild(middleWhiteVisible);
        middleSectionContainer.appendChild(middleBlueHidden);
        
        const rightSection = document.createElement('div');
        rightSection.style.width = '25%';
        rightSection.style.height = '100%';
        rightSection.style.backgroundColor = 'white';
        
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
        const leftHalf = document.createElement('div');
        const rightHalf = document.createElement('div');
        
        [leftHalf, rightHalf].forEach(half => {
          half.style.position = 'absolute';
          half.style.height = '100%';
          half.style.width = '80%';
          half.style.backgroundColor = 'white';
          half.style.zIndex = '10';
        });
        
        leftHalf.style.left = '0';
        leftHalf.style.top = '100%';
        
        rightHalf.style.right = '0';
        rightHalf.style.bottom = '100%';
        
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
        const bars = [];
        const barCount = 4;
        const containersssHeight = containerRef.current.offsetHeight;
        const barHeight = containersssHeight / barCount;
        
        for (let i = 0; i < barCount; i++) {
          const bar = document.createElement('div');
          bar.className = 'staircase-bar';
          bar.style.position = 'absolute';
          bar.style.width = '0';
          bar.style.height = `${barHeight}px`;
          bar.style.left = '-10%';
          bar.style.top = `${i * barHeight}px`;
          bar.style.backgroundColor = 'white';
          bar.style.zIndex = '10';
          
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
        const slideContainer = document.createElement('div');
        slideContainer.style.position = 'absolute';
        slideContainer.style.width = '100%';
        slideContainer.style.height = '100%';
        slideContainer.style.zIndex = '10';
        slideContainer.style.overflow = 'hidden';
        containerRef.current.appendChild(slideContainer);
        
        const slidingPanel = document.createElement('div');
        slidingPanel.style.position = 'absolute';
        slidingPanel.style.left = '0';
        slidingPanel.style.width = '100%';
        slidingPanel.style.height = '100%';
        slidingPanel.style.backgroundColor = 'white';
        slidingPanel.style.transform = 'translateY(100%)';
        
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
    const audio = audioRef.current;
    audio.volume = 0;
    
    setTimeout(() => {
      audio.play().catch((err) => {
        const startAudioOnInteraction = () => {
          audio.volume = 0;
          audio.play().catch((e) => console.log("Audio still couldn't play:", e));
          document.removeEventListener("click", startAudioOnInteraction);
        };

        document.addEventListener("click", startAudioOnInteraction);
      });
    }, 4800);
    
    const fadeInAudio = () => {
      let volume = 0;
      const fadeInterval = setInterval(() => {
        // Increase volume gradually
        volume += 0.01;
        
        if (volume >= targetVolume) {
          volume = targetVolume;
          clearInterval(fadeInterval);
        }
        
        // Apply new volume
        if (audio) {
          audio.volume = volume;
          setCurrentVolume(volume);
        }
      }, 100);
      
      return () => clearInterval(fadeInterval);
    };
    
    const fadeInCleanup = fadeInAudio();
    const container = containerRef.current;
    container.addEventListener('wheel', handleWheel, { passive: false });
    
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => {
      container.removeEventListener('wheel', handleWheel);
      if (audio) {
        audio.pause();
      }
      clearTimeout(loadingTimer);
      fadeInCleanup();
    };
  }, [currentCardIndex, animationState]);

  useEffect(() => {
    if (!isLoading && currentCardIndex === 0) {
      
      if (statsRowRef.current && sloganRef.current && swipeDownRef.current) {
        gsap.set([statsRowRef.current, sloganRef.current, swipeDownRef.current], { 
          y: 30, 
          opacity: 0 
        });
        
        gsap.to([statsRowRef.current, sloganRef.current, swipeDownRef.current], {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.3,
          ease: "power2.out",
          delay: 2.5
        });
        
        const statItems = statsRowRef.current.querySelectorAll('.stat-item');
        gsap.from(statItems, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "back.out(1.2)",
          delay: 0.7 
        });
      }
    }
  }, [isLoading, currentCardIndex]);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isMusicPlaying) {
        audio.pause();
      } else {
        audio.volume = targetVolume;
        audio.play().catch(err => {
          console.log("Could not play audio:", err);
        });
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };
  
  
  const getCardClasses = () => {
    const baseClass = 'card';
    
    if (animationState === 'idle') return baseClass;
    if (animationState === 'entering') return `${baseClass} ${direction > 0 ? 'slide-in-up' : 'slide-in-down'}`;
    if (animationState === 'exiting') return `${baseClass} ${direction > 0 ? 'slide-out-up' : 'slide-out-down'}`;
    
    return baseClass;
  };

  const fadeInCurrentCard = (direction = 'bottom', delay = 0, duration = 0.4) => {
    if (!containerRef.current) return;
  
    const cardInner = containerRef.current.querySelector('.card-inner');
    if (!cardInner) return;
    
    let initialX = 0;
    let initialY = 0;
    
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
      case 'none':
        initialX = 0;
        initialY = 0;
        break;
      default:
        initialY = 100;
    }
    
    gsap.set(cardInner, { 
      opacity: 0, 
      x: initialX, 
      y: initialY 
    });
    
    gsap.to(cardInner, {
      opacity: 1,
      x: 0,
      y: 0,
      duration: duration,
      delay: delay,
      ease: 'sine'
    });
  };

  useEffect(() => {
    console.log("Card changed to:", currentCardIndex);
    
    if (bluePlaceholderRef.current) {
      console.log("Blue placeholder found:", bluePlaceholderRef.current);
      
      if (currentCardIndex === 1) {
        gsap.set(bluePlaceholderRef.current, {
          x: 700,
          opacity: 0,
          immediateRender: true
        });
        
        console.log("Starting blue placeholder animation");
        
        gsap.to(bluePlaceholderRef.current, {
          x: 0,
          opacity: 1,
          duration: 2.2,
          delay: 1,
          ease: "back.out(1.7)",
          onStart: () => console.log("Animation started"),
          onComplete: () => console.log("Animation completed")
        });
      } else {
        gsap.set(bluePlaceholderRef.current, {
          x: 300,
          opacity: 0
        });
      }
    } else {
      console.log("Blue placeholder ref not found");
    }
  }, [currentCardIndex]);

  useEffect(() => {
    if (secondBluePlaceholderRef.current) {
      gsap.set(secondBluePlaceholderRef.current, {
        y: -100,
        opacity: 0,
        immediateRender: true,
        overwrite: "auto"
      });
      
      if (currentCardIndex === 2) {
        gsap.to(secondBluePlaceholderRef.current, {
          y: 0,
          rotation: 0,
          opacity: 1,
          duration: 0.8,
          delay: 2,
          ease: "power2.out"
        });
      }
    }
  }, [currentCardIndex]);

  return (
    <div className="home-container" ref={containerRef}>
      {isLoading && (
        <div className="loading-screen">
          <div className="loader"></div>
          <div className="loading-text">Loading GKS YAPI...</div>
        </div>
      )}

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

      <div className="transition-line" ref={transitionLineRef}></div>
      <div className="transition-circle" ref={transitionCircleRef}></div>
      <div className="transition-box" ref={transitionBoxRef}></div>

      <audio ref={audioRef} src={backgroundMusic} loop autoPlay />

      {!isLoading && (
        <>
          <div className="content-overlay">
            <div className="cards-container">
              <div className={getCardClasses()}>
                <div className="card-inner">
                  {cardContents[currentCardIndex].customRender ? 
                    cardContents[currentCardIndex].customRender() : 
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
            <span 
              className="left-text" 
              style={{ 
                bottom: language === 'tr' ? '-1.4rem' : '-2.4rem' 
              }}
            >
              {t.projects.bespokeInEverySense}
            </span>
            <div className="project-title-container">
              <Link to="/projects">
                <span className="large-text-primary">{t.projects.the}</span>
                <span className="large-text-secondary">{t.projects.projects}</span>
              </Link>
            </div>
          </div>

          <div className="music-control">
            <button onClick={toggleMusic} title={isMusicPlaying ? "Mute music" : "Play music"}>
              <FontAwesomeIcon 
                icon={isMusicPlaying ? faVolumeUp : faVolumeMute} 
                size="sm" 
              />
            </button>
          </div>

          <Navigation onHomePage={true} />
        </>
      )}
    </div>
  );
};

export default Home;
