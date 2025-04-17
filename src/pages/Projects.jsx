import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../translations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPlay,
  faFileAlt,
  faPhone,
  faAngleRight,
  faAngleLeft,
  faLiraSign,
  faUmbrellaBeach,
  faBuilding,
  faChevronDown
} from "@fortawesome/free-solid-svg-icons";
import gsap from "gsap";
import { setupVerticalTextAnimations } from '../utils/animations';

// Demo projects data - keeping as a fallback
const projects = [
  {
    id: 1,
    title: "Blumental Residence",
    subtitle: "The city life on your doorstep",
    type: "HOMES",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1400&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Azure Heights",
    subtitle: "Luxury redefined above the skyline",
    type: "HOMES",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Park Avenue",
    subtitle: "Modern living in the heart of nature",
    type: "HOMES",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Marina Bay",
    subtitle: "Waterfront luxury apartments",
    type: "HOMES",
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1400&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Sunset Tower",
    subtitle: "Where elegance meets the horizon",
    type: "HOMES",
    image:
      "https://images.unsplash.com/photo-1577495508326-19a1a3cf65b7?w=1400&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Golden Gate Residences",
    subtitle: "Premium living with breathtaking views",
    type: "HOMES",
    image:
      "https://images.unsplash.com/photo-1594484208280-efa00f96fc21?w=1400&auto=format&fit=crop",
  },
  {
    id: 7,
    title: "Urban Oasis",
    subtitle: "A sanctuary in the urban jungle",
    type: "HOMES",
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1400&auto=format&fit=crop",
  },
  {
    id: 8,
    title: "Pinnacle Heights",
    subtitle: "Living at the peak of excellence",
    type: "HOMES",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&auto=format&fit=crop",
  },
];

// Detailed project data for filters - keeping as a fallback
const propertyData = [
  {
    id: 1,
    title: "Casa Refugio - Fazenda Boa Vista - Renan Mendes",
    location: "São Paulo",
    status: "Completed",
    type: "Residential Villa",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    images: [
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs/a9494b87161211.5daf85b4234eb.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/323b2d87161211.5daf85b420faf.png",
      "https://i.pinimg.com/736x/0f/46/63/0f4663334390a62b6b9e8b47d0e40bfb.jpg"
    ],
    startDate: "June 2021",
    endDate: "July 2023",
    price: "R$ 3,500,000",
    amenities: ["Infinity Pool", "Private Garden", "Spa", "Home Theatre", "Solar Panels"],
    videoUrl: "https://www.youtube.com/watch?v=yaWHEh0R1yo",
    brochureUrl: "",
    details: {
      floors: 2,
      bhkTypes: ["3 BHK", "4 BHK"],
      totalUnits: 1
    }
  },
  {
    id: 2,
    title: "Keturah Villa",
    location: "Dubai",
    status: "In-Progress",
    type: "Luxury Residential",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    images: [
      "https://api.archvoyage.ae/uploads/227_Keturah_0040004_kopiya_9a8b3ef352.jpg",
      "https://api.archvoyage.ae/uploads/227_Keturah_0060006_kopiya_6b906d07f7.jpg",
      "https://api.archvoyage.ae/uploads/227_Keturah_0060006_kopiya_6b906d07f7.jpg"
    ],
    startDate: "June 2023",
    endDate: "December 2025",
    price: "AED 15,000,000",
    amenities: ["Private Beach", "Infinity Pool", "Spa", "Home Automation", "Rooftop Garden"],
    videoUrl: "https://www.youtube.com/watch?v=xBA7RFnYwSA",
    brochureUrl: "",
    details: {
      floors: 4,
      bhkTypes: ["6 BHK", "7 BHK"],
      totalUnits: 5
    }
  },
  {
    id: 3,
    title: "Castle Cove - Arkhaus",
    location: "Sydney",
    status: "In-Progress",
    type: "Luxury Residential",
    image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    images: [
      "https://arkhaus.com.au/wp-content/uploads/2024/07/Willis-02-1.webp",
      "https://arkhaus.com.au/wp-content/uploads/2024/07/Willis-03.webp"
    ],
    startDate: "January 2023",
    endDate: "December 2024",
    price: "AUD 4,200,000",
    amenities: ["Private Beach", "Helipad", "Wine Cellar", "Smart Home Technology", "Infinity Pool"],
    videoUrl: "https://www.youtube.com/watch?v=DojiLWPfZOA",
    brochureUrl: "",
    details: {
      floors: 3,
      bhkTypes: ["5 BHK", "6 BHK"],
      totalUnits: 10
    }
  },
  {
    id: 4,
    title: "Bahcekoy House - Habif Mimarlik",
    location: "Istanbul",
    status: "Completed",
    type: "Residential Villa",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    images: [
      "https://images.adsttc.com/media/images/5b72/36f9/f197/cc6f/ff00/0029/large_jpg/bhc13_7810b_rvz2.jpg?1534211822",
      "https://www.habifmimarlik.com/wp-content/uploads/2024/01/20181213_Habif_Mimarlik_Bahcekoy_Evi13551_52.jpg",
      "https://f7e5m2b4.delivery.rocketcdn.me/wp-content/uploads/2019/10/Bahcekoy-House-25.jpg"
    ],
    startDate: "March 2020",
    endDate: "August 2022",
    price: "TRY 5,000,000",
    amenities: ["Private Garden", "Swimming Pool", "Gym", "Sauna", "Smart Home Technology"],
    videoUrl: "https://www.youtube.com/watch?v=yD27GevbIVs",
    brochureUrl: "",
    details: {
      floors: 2,
      bhkTypes: ["4 BHK", "5 BHK"],
      totalUnits: 1
    }
  },

  {
    id: 5,
    title: "GÖKSU YAŞAM",
    location: "Downtown",
    status: "Completed",
    type: "Residential",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    "images": [
      "https://www.gksyapi.com/Panel/upload/projeler/KAMERA12_GUNDUZ_9800.jpg",
      "https://www.gksyapi.com/Panel/upload/projeler/KAMERA9_GECE_6648.jpg",
      "https://www.gksyapi.com/Panel/upload/projeler/KAMERA1_GUNDUZ_7053.jpg",
      "https://www.gksyapi.com/Panel/upload/projeler/KAMERA9_GUNDUZ_8692.jpg",
      "https://www.gksyapi.com/Panel/upload/projeler/kapak_PSYKAMERA_GUNDUZ_3387.jpg"
    ],
    startDate: "Mar 2020",
    endDate: "Apr 2023",
    price: "690,000",
    amenities: [
      "Swimming pools",
      "Gyms",
      "Play areas",
      "Landscaped gardens",
      "Concierge services",
      "Parking",
    ],
    videoUrl: "https://www.youtube.com/watch?v=tX7cDYqxTCI&t=1s",
    brochureUrl: "https://www.gksyapi.com/Panel/upload/katalog/goksu_yasam_katalog.pdf",
    details: {
      floors: 20,
      bhkTypes: ["2 BHK", "3 BHK"],
      totalUnits: 120,
    },
  },
  {
    id: 6,
    title: "GÖKSU SARAY",
    location: "Sisli",
    status: "In-Progress",
    type: "Commercial",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
    images: [
      "https://www.gksyapi.com/Panel/upload/projeler/kapak_5-goksaray_5105.jpg",
      "https://www.gksyapi.com/Panel/upload/projeler/3-goksaray_1948.jpg",
      "https://www.gksyapi.com/Panel/upload/projeler/3-goksaray_1948.jpg",
      "https://www.gksyapi.com/Panel/upload/projeler/2-goksaray_4741.jpg"
    ],
    startDate: "Jan 2023",
    endDate: "Dec 2024",
    price: "890,000",
    amenities: ["Office spaces", "Meeting rooms", "Parking", "Security"],
    videoUrl: "",
    brochureUrl: "https://www.gksyapi.com/Panel/upload/katalog/Goksu_saray_katalog.pdf",
    details: {
      floors: 15,
      officeTypes: ["Small", "Medium", "Large"],
      totalUnits: 80,
    },
  },
  {
    id: 7,
    title: "ERDEMLI MANSIONS",
    location: "Eyüp",
    status: "Completed",
    type: "Residential",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    images: [
      "https://www.gksyapi.com/Panel/upload/projeler/Erdemli_5_3533.jpg",
      "https://www.gksyapi.com/Panel/upload/projeler/erdemli-3_4482.jpg",
      "https://www.gksyapi.com/Panel/upload/projeler/Erdemli_3_9039.jpg"
    ],
    startDate: "Jun 2021",
    endDate: "Jul 2023",
    price: "550,000",
    amenities: ["Gardens", "Gym", "Pool", "Parking"],
    videoUrl: "https://www.youtube.com/watch?v=yaWHEh0R1yo",
    brochureUrl: "",
    details: {
      floors: 12,
      bhkTypes: ["1 BHK", "2 BHK"],
      totalUnits: 60,
    },
  },
];

// Filter dropdown component
const FilterDropdown = ({ label, options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const labelRef = useRef(null);
  const { language } = useLanguage();
  const t = translations[language];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        labelRef.current &&
        !labelRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="filter-dropdown">
      <div
        ref={labelRef}
        className="filter-label"
        onClick={() => setIsOpen(!isOpen)}
      >
        {label}
        <FontAwesomeIcon icon={faChevronDown} style={{ width: "0.3rem", height: "1rem", background: "white", padding: "0rem 0.4rem", color: "black", borderRadius: "50%" }} />
      </div>

      {isOpen && (
        <div ref={dropdownRef} className="dropdown-content">
          <div
            className={`dropdown-item ${!value ? "selected" : ""}`}
            onClick={() => {
              onChange("");
              setIsOpen(false);
            }}
          >
            {t.projects.filterBy.all || "All"}
          </div>
          {options.map((option) => (
            <div
              key={option}
              className={`dropdown-item ${value === option ? "selected" : ""}`}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const projectRef = useRef(null);
  const cardRef = useRef(null);
  const containerRef = useRef(null);
  const filtersBarRef = useRef(null);
  
  const [isAnimating, setIsAnimating] = useState(false);
  const animationDirection = useRef("down");

  const [showAllProjects, setShowAllProjects] = useState(true);
  const [currentPropertyIndex, setCurrentPropertyIndex] = useState(0);
  const [filters, setFilters] = useState({
    status: "",
    location: "",
    type: "",
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const { language } = useLanguage();
  const t = translations[language];

  const translatedProjects = t.projects.data.projects;
  const translatedPropertyData = t.projects.data.propertyData;

  const filterOptions = {
    status: [...new Set(translatedPropertyData.map((p) => p.status))],
    location: [...new Set(translatedPropertyData.map((p) => p.location))],
    type: [...new Set(translatedPropertyData.map((p) => p.type))],
  };

  const filteredProperties = translatedPropertyData.filter((property) => {
    return (
      (!filters.status || property.status === filters.status) &&
      (!filters.location || property.location === filters.location) &&
      (!filters.type || property.type === filters.type)
    );
  });

  const nextProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % translatedProjects.length);
  };

  const prevProject = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + translatedProjects.length) % translatedProjects.length
    );
  };

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [currentPropertyIndex]);

  const handleWatchVideo = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const currentProperty = filteredProperties[currentPropertyIndex];
    const originalProperty = propertyData.find(p => p.id === currentProperty.id);
    
    if (originalProperty?.videoUrl) {
      console.log("Setting showVideo to true");
      setShowVideo(true);
    } else {
      console.log("No video URL available for this property");
    }
  };

  const handleViewCatalog = (e) => {
    e.stopPropagation();
    
    const currentProperty = filteredProperties[currentPropertyIndex];
    const originalProperty = propertyData.find(p => p.id === currentProperty.id);
    
    if (originalProperty?.brochureUrl) {
      window.open(originalProperty.brochureUrl, '_blank');
    } else {
      console.log("No brochure available for this property");
    }
  };
  

  // Update these functions with more detailed logic and debugging
  const handlePrevousImage = (e) => {
    if (e) e.stopPropagation();
    
    const currentProperty = filteredProperties[currentPropertyIndex];
    // Get original property that has the images
    const originalProperty = propertyData.find(p => p.id === currentProperty.id);
    
    // Use images array from the original property data
    if (!originalProperty?.images || originalProperty.images.length <= 1) {
      return;
    }
    
    setCurrentImageIndex(prevIndex => 
      prevIndex <= 0 ? originalProperty.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = (e) => {
    if (e) e.stopPropagation();
    
    const currentProperty = filteredProperties[currentPropertyIndex];
    // Get original property that has the images
    const originalProperty = propertyData.find(p => p.id === currentProperty.id);
    
    // Use images array from the original property data
    if (!originalProperty?.images || originalProperty.images.length <= 1) {
      return;
    }
    
    setCurrentImageIndex(prevIndex => 
      prevIndex >= originalProperty.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevProperty = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    animationDirection.current = "up";

    // Animate out current card
    gsap.to(cardRef.current, {
      duration: 0.3,
      y: 50,
      opacity: 0,
      ease: "power1.out",
      onComplete: () => {
        // Update index after animation completes
        setCurrentPropertyIndex((prevIndex) =>
          prevIndex <= 0 ? filteredProperties.length - 1 : prevIndex - 1
        );
      },
    });
  };

  const handleNextProperty = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    animationDirection.current = "down";

    // Animate out current card
    gsap.to(cardRef.current, {
      duration: 0.3,
      y: -50,
      opacity: 0,
      ease: "power1.out",
      onComplete: () => {
        // Update index after animation completes
        setCurrentPropertyIndex((prevIndex) =>
          prevIndex >= filteredProperties.length - 1 ? 0 : prevIndex + 1
        );
      },
    });
  };

  // Animate new card in when currentPropertyIndex changes
  useEffect(() => {
    if (cardRef.current && showAllProjects) {
      // Set initial position based on animation direction
      gsap.set(cardRef.current, {
        y: animationDirection.current === "down" ? 50 : -50,
        opacity: 0,
      });

      // Animate in
      gsap.to(cardRef.current, {
        duration: 0.3,
        y: 0,
        opacity: 1,
        ease: "power1.out",
        onComplete: () => {
          setIsAnimating(false);
        },
      });
    }
  }, [currentPropertyIndex, showAllProjects]);

  // Use a simpler debounce/throttle approach
  const lastScrollTime = useRef(0);
  const scrollDelay = 1000; // ms between allowed scrolls
  
  // Simplified scroll handler
  const handleScroll = (e) => {
    
    const now = Date.now();
    
    // Check if we're already animating or if not enough time has passed since last scroll
    if (isAnimating || now - lastScrollTime.current < scrollDelay) {
      console.log("Ignoring scroll: animation in progress or cooling down");
      return;
    }
    
    // Add a higher threshold for scroll detection - only proceed if scroll is significant
    const scrollThreshold = 20; // Increase this value to decrease sensitivity
    
    if (Math.abs(e.deltaY) < scrollThreshold) {
      console.log("Scroll below threshold, ignoring");
      return;}
    
    // Update the last scroll time
    lastScrollTime.current = now;
    
    // Set animating flag
    setIsAnimating(true);
    
    if (e.deltaY > scrollThreshold) {
      // Scrolling down
      console.log("Scrolling DOWN detected");
      animationDirection.current = "down";
      
      gsap.to([cardRef.current, filtersBarRef.current], {
        duration: 0.5,
        y: -50,
        opacity: 0,
        ease: "power1.out",
        onComplete: () => {
          setCurrentPropertyIndex((prevIndex) =>
            prevIndex >= filteredProperties.length - 1 ? 0 : prevIndex + 1
          );
        },
      });
    } else if (e.deltaY < -scrollThreshold) {
      // Scrolling up
      console.log("Scrolling UP detected");
      animationDirection.current = "up";
      
      gsap.to([cardRef.current, filtersBarRef.current], {
        duration: 0.5,
        y: 50,
        opacity: 0,
        ease: "power1.out",
        onComplete: () => {
          setCurrentPropertyIndex((prevIndex) =>
            prevIndex <= 0 ? filteredProperties.length - 1 : prevIndex - 1
          );
        },
      });
    } else {
      // Reset if somehow we get here
      setIsAnimating(false);
    }
  };

  // Update the animation-in effect
  useEffect(() => {
    if (cardRef.current && filtersBarRef.current && showAllProjects) {
      
      // Position based on animation direction
      gsap.set([cardRef.current, filtersBarRef.current], {
        y: animationDirection.current === "down" ? 50 : -50,
        opacity: 0,
      });

      // Animate in
      gsap.to([cardRef.current, filtersBarRef.current], {
        duration: 0.5,
        y: 0,
        opacity: 1,
        ease: "power1.out",
        onComplete: () => {
          console.log("Animation in complete, resetting flag");
          setIsAnimating(false);
        },
      });
    }
  }, [currentPropertyIndex, showAllProjects]);

  // Similar simplification for project showcase scroll
  const handleProjectScroll = (e) => {
    e.preventDefault();
    
    const now = Date.now();
    
    if (isAnimating || now - lastScrollTime.current < scrollDelay) {
      return;
    }
    
    lastScrollTime.current = now;
    setIsAnimating(true);
    
    if (e.deltaY > 0) {
      // Scroll down code
      // ...
    } else {
      // Scroll up code
      // ...
    }
  };
  
  // Reset currentIndex when filters change
  useEffect(() => {
    setCurrentPropertyIndex(0);
  }, [filters]);

  // Create refs for the info boxes
  const infoBoxesRef = useRef(null);
  const infoBoxesArray = useRef([]);
  
  // Set up GSAP animation for info boxes
  useEffect(() => {
    if (showAllProjects) {
      // Reset the array when view changes
      infoBoxesArray.current = [];
      
      // Find all info-box elements
      const boxes = document.querySelectorAll('.info-box');
      if (boxes.length > 0) {
        // Create animation timeline
        const tl = gsap.timeline();
        
        // Initial state - invisible and offset
        gsap.set(boxes, { 
          y: 50, 
          opacity: 0 
        });
        
        // Animate each box with a stagger
        tl.to(boxes, {
          duration: 0.8,
          y: 0,
          opacity: 1,
          ease: "power3.out",
          stagger: 0.15
        });
      }
    }
  }, [showAllProjects, currentPropertyIndex]); // Re-run when project changes

  // Initialize vertical text animations
  useEffect(() => {
    setupVerticalTextAnimations();
    
    // ... your existing code ...
  }, []);

  // Extract YouTube video ID function
  const extractYoutubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  if (showAllProjects) {
    return (
      <div
        className="project-list-page"
        style={{
          // backgroundImage:
          //   filteredProperties.length > 0
          //     ? `linear-gradient(rgba(26, 60, 114, 0.85), rgba(12, 45, 98, 0.9)), 
          //      url(${
          //        filteredProperties[currentPropertyIndex].image ||
          //        propertyData.find(
          //          (p) => p.id === filteredProperties[currentPropertyIndex].id
          //        )?.image
          //      })`
          //     : "linear-gradient(120deg, #1a3c72 0%, #0c2d62 100%)",
          // backgroundSize: "cover",
          // backgroundPosition: "center",
          // backgroundAttachment: "fixed",
        }}
        onWheel={handleScroll}
      >
        <div className="filters-bar" ref={filtersBarRef}>
          <div className="filter-group">
            <FilterDropdown
              label={t.projects.filterBy.propertyStatus || "Property Status"}
              options={filterOptions.status}
              value={filters.status}
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, status: value }))
              }
            />
            <FilterDropdown
              label={t.projects.filterBy.location || "Location"}
              options={filterOptions.location}
              value={filters.location}
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, location: value }))
              }
            />
            <FilterDropdown
              label={t.projects.filterBy.propertyType || "Type"}
              options={filterOptions.type}
              value={filters.type}
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, type: value }))
              }
            />
          </div>
        </div>

        <div className="project-viewer">
          {filteredProperties.length > 0 ? (
            <div
              key={`property-${currentPropertyIndex}`}
              className="card-container"
              ref={cardRef}
            >
              <div className="property-card">
                {showVideo ? (
                  // Video player with inline styles
                  <div 
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'rgba(0, 0, 0, 0.95)',
                      zIndex: 100,
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '16px'
                    }}
                  >
                    <button 
                      onClick={() => setShowVideo(false)}
                      style={{
                        alignSelf: 'flex-start',
                        marginBottom: '16px',
                        padding: '8px 16px',
                        backgroundColor: '#1c3b8a',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                      }}
                    >
                      ← Back to property
                    </button>
                    
                    <div 
                      style={{
                        flex: 1,
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {(() => {
                        const currentProperty = filteredProperties[currentPropertyIndex];
                        const originalProperty = propertyData.find(p => p.id === currentProperty.id);
                        const videoId = extractYoutubeId(originalProperty?.videoUrl);
                        
                        console.log("Video ID:", videoId);
                        
                        return videoId ? (
                          <iframe
                            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{
                              width: '100%',
                              height: '100%',
                              border: 'none'
                            }}
                          ></iframe>
                        ) : (
                          <div style={{ color: 'white', textAlign: 'center' }}>
                            Video cannot be displayed
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                ) : showContactForm ? (
                  // Contact form directly inside the property card
                  <div className="contact-form-wrapper">
                    <button 
                      className="back-to-property-button"
                      onClick={() => setShowContactForm(false)}
                    >
                      ← Back to property
                    </button>
                    
                    <div className="contact-form-container">
                      <div className="contact-form-columns">
                        {/* Left Column */}
                        <div className="contact-info-column">
                          <div className="info-item">
                            <div className="info-content">
                              <p className="info-label">You can Email Me Here</p>
                              <p className="info-value">jefferrycannon@gmail.com</p>
                            </div>
                            <a href="mailto:jefferrycannon@gmail.com" className="info-arrow">
                              →
                            </a>
                          </div>
                          
                          <div className="info-item">
                            <div className="info-content">
                              <p className="info-label">Give Me a Call on</p>
                              <p className="info-value">+91 91813 23 2309</p>
                            </div>
                            <a href="tel:+919181323209" className="info-arrow">
                              →
                            </a>
                          </div>
                          
                          <div className="info-item">
                            <div className="info-content">
                              <p className="info-label">Location</p>
                              <p className="info-value">Somewhere in the World</p>
                            </div>
                            <a href="#" className="info-arrow">
                              →
                            </a>
                          </div>
                          
                        </div>
                        
                        {/* Right Column */}
                        <div className="contact-form-column">
                          <form className="contact-form">
                            <div className="form-row property-card-form-ele">
                              <input type="text" placeholder="First Name" className="form-input" />
                              <input type="text" placeholder="Last Name" className="form-input" />
                            </div>
                            
                            <div className="form-row property-card-form-ele">
                              <input type="email" placeholder="Email" className="form-input" />
                              <input type="tel" placeholder="Phone Number" className="form-input" />
                            </div>
                            
                            <div className="form-group property-card-form-ele">
                              <p className="form-label">Why are you contacting us?</p>
                              <div className="checkbox-container">
                                <div className="checkbox-row">
                                  <label className="checkbox-item">
                                    <input type="checkbox" />
                                    <span>Web Design</span>
                                  </label>
                                  <label className="checkbox-item">
                                    <input type="checkbox" />
                                    <span>Collaboration</span>
                                  </label>
                                </div>
                                <div className="checkbox-row">
                                  <label className="checkbox-item">
                                    <input type="checkbox" />
                                    <span>Mobile App Design</span>
                                  </label>
                                  <label className="checkbox-item">
                                    <input type="checkbox" />
                                    <span>Others</span>
                                  </label>
                                </div>
                              </div>
                            </div>
                            
                            <div className="form-group property-card-form-ele">
                              <textarea placeholder="Your Message here..." className="form-textarea"></textarea>
                            </div>
                            
                            <button type="submit" className="send-button">Send</button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Regular property card content
                  <div className="property-image">
                    <img
                      src={
                        (() => {
                          const property = filteredProperties[currentPropertyIndex];
                          // Get the original property from propertyData using the ID
                          const originalProp = propertyData.find(p => p?.id === property?.id);
                          
                          // Use image/images from the original propertyData
                          const imageUrl = originalProp?.images?.[currentImageIndex] || originalProp?.image;
                          return imageUrl;
                        })()
                      }
                      alt={filteredProperties[currentPropertyIndex]?.title}
                      className="w-full h-full object-cover transition-all duration-500 ease-in-out transform rounded-sm"
                    />

                    {/* Location information */}
                    {/* <div className="location-info">
                      <div className="location-icon">
                        <FontAwesomeIcon
                          icon={faMapMarkerAlt}
                          style={{ width: "20px", height: "20px" }}
                        />
                      </div>
                      <span className="location-text">
                        {filteredProperties[currentPropertyIndex].location}
                      </span>
                    </div> */}

                    {/* Action buttons at top */}
                    <div className="action-buttons-top">
                      <div className="location-info">
                        <button className="location-icon">
                          <FontAwesomeIcon
                            icon={faMapMarkerAlt}
                            style={{ width: "15px", height: "15px" }}
                          />
                        </button>
                        <span className="location-text">
                          {filteredProperties[currentPropertyIndex]?.location}
                        </span>
                      </div>

                      {/* Watch Video button - disabled if no videoUrl */}
                      {(() => {
                        const currentProperty = filteredProperties[currentPropertyIndex];
                        const originalProperty = propertyData.find(p => p.id === currentProperty.id);
                        const hasVideo = originalProperty?.videoUrl && originalProperty.videoUrl.trim() !== '';
                        
                        return (
                          <button 
                            className={`action-button ${hasVideo ? '' : 'disabled'}`} 
                            onClick={hasVideo ? handleWatchVideo : null}
                            disabled={!hasVideo}
                            title={hasVideo ? 'Watch video' : 'No video available'}
                          >
                            <FontAwesomeIcon 
                              icon={faPlay} 
                              style={{ opacity: hasVideo ? 1 : 0.5, width: "15px", height: "15px" }}
                            />
                            {t.projects.buttons.watchVideo}
                          </button>
                        );
                      })()}

                      {/* View Catalog button - disabled if no brochureUrl */}
                      {(() => {
                        const currentProperty = filteredProperties[currentPropertyIndex];
                        const originalProperty = propertyData.find(p => p.id === currentProperty.id);
                        const hasBrochure = originalProperty?.brochureUrl && originalProperty.brochureUrl.trim() !== '';
                        
                        return (
                          <button 
                            className={`action-button ${hasBrochure ? '' : 'disabled'}`} 
                            onClick={hasBrochure ? handleViewCatalog : null}
                            disabled={!hasBrochure}
                            title={hasBrochure ? 'View catalog' : 'No catalog available'}
                          >
                            <FontAwesomeIcon 
                              icon={faFileAlt} 
                              style={{ opacity: hasBrochure ? 1 : 0.5, width: "15px", height: "15px" }}
                            />
                            {t.projects.buttons.viewCatalog}
                          </button>
                        );
                      })()}

                      <button 
                        className="action-button" 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setShowContactForm(true);
                        }}
                      >
                        <FontAwesomeIcon icon={faPhone} style={{ width: "15px", height: "15px" }} />
                        {t.projects.buttons.enquireNow}
                      </button>
                    </div>

                    {/* Information boxes at bottom */}
                    <div className="info-boxes" ref={infoBoxesRef}>
                      <div className="info-box" ref={el => infoBoxesArray.current.push(el)}>
                        <div className="info-title" style={{ color: "rgba(80, 125, 250, 0.9)" }}>
                          {t.projects.projectDetails.startDate}
                        </div>
                        <div className="info-value" >
                          {filteredProperties[
                            currentPropertyIndex
                          ].startDate?.split(" ")[1] || "2020"}
                        </div>
                      </div>

                      <div className="info-box" ref={el => infoBoxesArray.current.push(el)}>
                        <div className="info-title" style={{ color: "rgba(80, 125, 250, 0.9)" }}>
                          {t.projects.projectDetails.endDate}
                        </div>
                        <div className="info-value" >
                          {filteredProperties[
                            currentPropertyIndex
                          ].endDate?.split(" ")[1] || "2025"}
                        </div>
                      </div>

                      <div className="info-box" ref={el => infoBoxesArray.current.push(el)}>
                        <div className="info-title" style={{ color: "rgba(80, 125, 250, 0.9)" }}>
                          {t.projects.propertyCard.price}
                        </div>
                        <div className="info-value flex" >
                          From
                          <FontAwesomeIcon icon={faLiraSign} style={{ width: "15px", height: "15px" }} />
                        </div>
                      </div>

                      <div className="info-box" ref={el => infoBoxesArray.current.push(el)}>
                        <div className="info-title" style={{ color: "rgba(80, 125, 250, 0.9)" }}>
                          {t.projects.propertyCard.amenities}
                        </div>
                        <div className="info-value" >
                          <div className="amenity-icons">
                            <FontAwesomeIcon
                              icon={faUmbrellaBeach}
                              style={{ width: "20px", height: "20px" }}
                            />
                            <FontAwesomeIcon
                              icon={faBuilding}
                              style={{ width: "20px", height: "20px"}}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="info-box" ref={el => infoBoxesArray.current.push(el)}>
                        <div className="info-title" style={{ color: "rgba(80, 125, 250, 0.9)" }}>
                          {t.projects.propertyCard.details}
                        </div>
                        <div className="info-value" style={{ background: "rgba(0, 56, 179, 0.1)", padding: "0rem 0.4rem" }}>More Info</div>
                      </div>
                    </div>

                    {/* Navigation arrows for horizontal image sliding */}
                    {filteredProperties.length > 1 && (
                      <div className="navigation-controls">
                        <button
                          className="nav-arrow prev"
                          onClick={handlePrevousImage}
                          style={{ cursor: 'pointer' }}
                        >
                          <FontAwesomeIcon icon={faAngleLeft} style={{ color: "white" }} />
                        </button>
                        <button
                          className="nav-arrow next"
                          onClick={handleNextImage}
                          style={{ cursor: 'pointer' }}
                        >
                          <FontAwesomeIcon icon={faAngleRight} style={{ color: "white" }} />
                        </button>
                      </div>
                    )}

                    {/* Pagination dots - Dynamic based on number of images */}
                    <div className="pagination-dots flex justify-center space-x-2 mt-4">
                      {(() => {
                        const currentProperty = filteredProperties[currentPropertyIndex];
                        // Get original property that has the images
                        const originalProperty = propertyData.find(p => p.id === currentProperty.id);
                        
                        // If no images array or only one image, don't show dots
                        if (!originalProperty?.images || originalProperty.images.length <= 1) {
                          return null;
                        }
                        
                        // Create array of dots based on number of images
                        return originalProperty.images.map((_, index) => (
                          <div 
                            key={index}
                            className={`dot w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
                              currentImageIndex === index ? 'highlighted scale-125' : 'bg-gray-300'
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentImageIndex(index);
                            }}
                            aria-label={`Image ${index + 1}`}
                          ></div>
                        ));
                      })()}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="no-results">
              {t.projects.messages.noResults ||
                "No properties match the selected filters"}
            </div>
          )}
        </div>

        <div className="vertical-text-left">
          <div className="line"></div>
          <span className="left-text">{t.projects.buildingExpertise}</span>
          <span className="large-text-primary">{t.projects.explore}</span>
          <span className="large-text-secondary">{t.projects.projects}</span>
        </div>

        <div className="vertical-text-right">
          <div className="icon">
            <svg
              width="24"
              height="100"
              viewBox="0 0 24 100"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="0" x2="12" y2="80" />
              <polyline points="6 74 12 80 18 74" />
            </svg>
          </div>
          <span className="large-text-primary">{t.projects?.moreProjects?.more || "MORE"}</span>
          <span className="left-text">{t.projects?.moreProjects?.swipeUpToSee || "SWIPE UP TO SEE"}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="project-showcase-container"
      style={{
        backgroundImage: `linear-gradient(to right, 
        rgba(26, 60, 114, 1) 0%, 
        rgba(26, 60, 114, 0.95) 20%,
        rgba(26, 60, 114, 0.85) 40%, 
        rgba(26, 60, 114, 0.6) 60%, 
        rgba(26, 60, 114, 0.4) 80%, 
        rgba(26, 60, 114, 0.2) 100%), 
        url(${
          translatedProjects[currentIndex].image || projects[currentIndex].image
        })`,
      }}
      onWheel={handleProjectScroll}
    >
      <div className="project-showcase" ref={projectRef}>
        <div className="project-counter">
          {currentIndex + 1}/{translatedProjects.length}{" "}
          {translatedProjects[currentIndex].type}
        </div>

        <div className="navigation-arrows">
          <button className="nav-arrow prev" onClick={prevProject}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button className="nav-arrow next" onClick={nextProject}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        <div key={currentIndex} className="project-content">
          <div className="content-wrapper">
            <h1 className="project-title">
              {translatedProjects[currentIndex].title}
            </h1>
            <p className="project-subtitle">
              {translatedProjects[currentIndex].subtitle}
            </p>

            <button
              className="show-more-button"
              onClick={() => setShowAllProjects(true)}
            >
              <span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 22 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
                {t.projects.buttons.showMore || "Show more"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
