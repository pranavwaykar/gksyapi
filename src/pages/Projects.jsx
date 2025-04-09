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
  faArrowUpLong
} from "@fortawesome/free-solid-svg-icons";
import gsap from "gsap";

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
    title: "The Projects",
    location: "Eyup Sultan",
    status: "Completed",
    type: "Residential",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
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
    details: {
      floors: 20,
      bhkTypes: ["2 BHK", "3 BHK"],
      totalUnits: 120,
    },
  },
  {
    id: 2,
    title: "Urban Heights",
    location: "Sisli",
    status: "In-Progress",
    type: "Commercial",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
    startDate: "Jan 2023",
    endDate: "Dec 2024",
    price: "890,000",
    amenities: ["Office spaces", "Meeting rooms", "Parking", "Security"],
    details: {
      floors: 15,
      officeTypes: ["Small", "Medium", "Large"],
      totalUnits: 80,
    },
  },
  {
    id: 3,
    title: "Garden Residences",
    location: "Kadikoy",
    status: "Completed",
    type: "Residential",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    startDate: "Jun 2021",
    endDate: "Jul 2023",
    price: "550,000",
    amenities: ["Gardens", "Gym", "Pool", "Parking"],
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            marginLeft: "8px",
            transform: isOpen ? "rotate(180deg)" : "none",
            transition: "transform 0.2s ease",
          }}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
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
  const [isAnimating, setIsAnimating] = useState(false);
  const animationDirection = useRef("down");

  // State for filtered view - changed initial value to true
  const [showAllProjects, setShowAllProjects] = useState(true);
  const [currentPropertyIndex, setCurrentPropertyIndex] = useState(0);
  const [filters, setFilters] = useState({
    status: "",
    location: "",
    type: "",
  });

  // Get current language
  const { language } = useLanguage();
  const t = translations[language];

  // Use translated project data
  const translatedProjects = t.projects.data.projects;
  const translatedPropertyData = t.projects.data.propertyData;

  // Get unique options for each filter from translated data
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

  // Simple scroll handler for property cards
  const handleScroll = (e) => {
    e.preventDefault(); // Prevent default scroll behavior

    if (isAnimating) return;

    if (e.deltaY > 0) {
      // Scrolling down
      handleNextProperty();
    } else if (e.deltaY < 0) {
      // Scrolling up
      handlePrevProperty();
    }
  };

  // Simpler scroll handler for project showcase
  const handleProjectScroll = (e) => {
    e.preventDefault(); // Prevent default scroll behavior

    if (isAnimating) return;

    if (e.deltaY > 0) {
      // Scrolling down - animate out then change index
      setIsAnimating(true);
      gsap.to(projectRef.current, {
        duration: 0.3,
        y: -50,
        opacity: 0,
        ease: "power1.out",
        onComplete: () => {
          nextProject();
          // Animate in the new content
          gsap.fromTo(
            projectRef.current,
            { y: 50, opacity: 0 },
            {
              duration: 0.3,
              y: 0,
              opacity: 1,
              ease: "power1.out",
              onComplete: () => setIsAnimating(false),
            }
          );
        },
      });
    } else if (e.deltaY < 0) {
      // Scrolling up - animate out then change index
      setIsAnimating(true);
      gsap.to(projectRef.current, {
        duration: 0.3,
        y: 50,
        opacity: 0,
        ease: "power1.out",
        onComplete: () => {
          prevProject();
          // Animate in the new content
          gsap.fromTo(
            projectRef.current,
            { y: -50, opacity: 0 },
            {
              duration: 0.3,
              y: 0,
              opacity: 1,
              ease: "power1.out",
              onComplete: () => setIsAnimating(false),
            }
          );
        },
      });
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

  if (showAllProjects) {
    return (
      <div
        className="project-list-page"
        style={{
          backgroundImage:
            filteredProperties.length > 0
              ? `linear-gradient(rgba(26, 60, 114, 0.85), rgba(12, 45, 98, 0.9)), 
               url(${
                 filteredProperties[currentPropertyIndex].image ||
                 propertyData.find(
                   (p) => p.id === filteredProperties[currentPropertyIndex].id
                 )?.image
               })`
              : "linear-gradient(120deg, #1a3c72 0%, #0c2d62 100%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
        onWheel={handleScroll}
      >
        <div className="filters-bar">
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
                <div className="property-image">
                  <img
                    src={
                      filteredProperties[currentPropertyIndex].image ||
                      propertyData.find(
                        (p) =>
                          p.id === filteredProperties[currentPropertyIndex].id
                      )?.image
                    }
                    alt={filteredProperties[currentPropertyIndex].title}
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
                      <div className="location-icon">
                        <FontAwesomeIcon
                          icon={faMapMarkerAlt}
                          style={{ width: "20px", height: "20px" }}
                        />
                      </div>
                      <span className="location-text">
                        {filteredProperties[currentPropertyIndex].location}
                      </span>
                    </div>

                    <button className="action-button">
                      <FontAwesomeIcon icon={faPlay} />
                      {t.projects.buttons.watchVideo}
                    </button>
                    <button className="action-button">
                      <FontAwesomeIcon icon={faFileAlt} />
                      {t.projects.buttons.viewCatalog}
                    </button>
                    <button className="action-button">
                      <FontAwesomeIcon icon={faPhone} />
                      {t.projects.buttons.enquireNow}
                    </button>
                  </div>

                  {/* Information boxes at bottom */}
                  <div className="info-boxes" ref={infoBoxesRef}>
                    <div className="info-box" ref={el => infoBoxesArray.current.push(el)}>
                      <div className="info-title">
                        {t.projects.projectDetails.startDate}
                      </div>
                      <div className="info-value">
                        {filteredProperties[
                          currentPropertyIndex
                        ].startDate?.split(" ")[1] || "2020"}
                      </div>
                    </div>

                    <div className="info-box" ref={el => infoBoxesArray.current.push(el)}>
                      <div className="info-title">
                        {t.projects.projectDetails.endDate}
                      </div>
                      <div className="info-value">
                        {filteredProperties[
                          currentPropertyIndex
                        ].endDate?.split(" ")[1] || "2025"}
                      </div>
                    </div>

                    <div className="info-box" ref={el => infoBoxesArray.current.push(el)}>
                      <div className="info-title">
                        {t.projects.propertyCard.price}
                      </div>
                      <div className="info-value flex">
                        From
                        <svg
                          className="currency-icon"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="12" y1="1" x2="12" y2="23"></line>
                          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                        </svg>
                      </div>
                    </div>

                    <div className="info-box" ref={el => infoBoxesArray.current.push(el)}>
                      <div className="info-title">
                        {t.projects.propertyCard.amenities}
                      </div>
                      <div className="info-value">
                        <div className="amenity-icons">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                          </svg>
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect
                              x="2"
                              y="7"
                              width="20"
                              height="14"
                              rx="2"
                              ry="2"
                            ></rect>
                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="info-box" ref={el => infoBoxesArray.current.push(el)}>
                      <div className="info-title">
                        {t.projects.propertyCard.details}
                      </div>
                      <div className="info-value">More Info</div>
                    </div>
                  </div>

                  {/* Navigation arrows for horizontal image sliding */}
                  {filteredProperties.length > 1 && (
                    <div className="navigation-controls">
                      <button
                        className="nav-arrow prev"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent event bubbling
                          handlePrevProperty();
                        }}
                      >
                        <FontAwesomeIcon icon={faAngleLeft} style={{ color: "white" }} />
                      </button>
                      <button
                        className="nav-arrow next"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent event bubbling
                          handleNextProperty();
                        }}
                      >
                        <FontAwesomeIcon icon={faAngleRight} style={{ color: "white" }} />
                      </button>
                    </div>
                  )}

                  {/* Pagination dots */}
                  <div className="pagination-dots">
                    <div className="dot active"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </div>
                </div>
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
          <span className="large-text-primary">{t.projects.exploreProject}</span>
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
          <span className="large-text-primary">{t.projects.top}</span>
          <span className="left-text">{t.projects.backToTop}</span>
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
