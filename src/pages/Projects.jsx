import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Demo projects data
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

// Detailed project data for filters
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
            All
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

// const PropertyCard = ({ property }) => {
//   return (
//     <div className="property-card">
//       <div className="property-image">
//         <img src={property.image} alt={property.title} />
//         <button className="fullscreen-btn">
//           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//             <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
//           </svg>
//         </button>
//       </div>
//       <div className="property-details">
//         {/* <img src="/gksyyapi-logo.png" alt="GKS YAPI" className="company-logo" /> */}

//         <div className="detail-row">
//           <span className="label">Status</span>
//           <span className="value completed">{property.status}</span>
//         </div>

//         <div className="detail-row">
//           <span className="label">Project Start Date/End Date</span>
//           <span className="value">{property.startDate}-{property.endDate}</span>
//         </div>

//         <div className="detail-row">
//           <span className="label">Price</span>
//           <span className="value">€{property.price}</span>
//         </div>

//         <div className="detail-row">
//           <span className="label">Amenities</span>
//           <span className="value">{property.amenities.join(' | ')}</span>
//         </div>

//         <div className="detail-row">
//           <span className="label">Details</span>
//           <div className="value">
//             <p>No of Floors: {property.details.floors}</p>
//             {property.details.bhkTypes && (
//               <>
//                 <p>No of 2BHK Flats</p>
//                 <p>No of 3BHK Flats</p>
//               </>
//             )}
//           </div>
//         </div>

//         <div className="action-buttons">
//           <button className="primary-btn">
//             Watch Video
//             <svg
//               width="20"
//               height="20"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               style={{ marginLeft: '8px' }}
//             >
//               <line x1="5" y1="12" x2="19" y2="12"></line>
//               <polyline points="12 5 19 12 12 19"></polyline>
//             </svg>
//           </button>
//           <div className="secondary-buttons">
//             <button className="secondary-btn">View Catalog</button>
//             <button className="secondary-btn">Enquire Now</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // Start with the 1st item for better demo
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragX, setDragX] = useState(0);
  const projectRef = useRef(null);

  // State for filtered view
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [currentPropertyIndex, setCurrentPropertyIndex] = useState(0);
  const [filters, setFilters] = useState({
    status: "",
    location: "",
    type: "",
  });

  // Get unique options for each filter
  const filterOptions = {
    status: [...new Set(propertyData.map((p) => p.status))],
    location: [...new Set(propertyData.map((p) => p.location))],
    type: [...new Set(propertyData.map((p) => p.type))],
  };

  const filteredProperties = propertyData.filter((property) => {
    return (
      (!filters.status || property.status === filters.status) &&
      (!filters.location || property.location === filters.location) &&
      (!filters.type || property.type === filters.type)
    );
  });

  const nextProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + projects.length) % projects.length
    );
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    setDragStart(e.clientX || e.touches?.[0].clientX || 0);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;

    const clientX = e.clientX || e.touches?.[0].clientX || 0;
    const delta = clientX - dragStart;
    setDragX(delta);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;

    if (dragX > 100) {
      prevProject();
    } else if (dragX < -100) {
      nextProject();
    }

    setIsDragging(false);
    setDragX(0);
  };

  const handleViewAllProjects = () => {
    setShowAllProjects(true);
    setCurrentPropertyIndex(0);
  };

  const handleNextProperty = () => {
    setCurrentPropertyIndex((prev) =>
      prev === filteredProperties.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevProperty = () => {
    setCurrentPropertyIndex((prev) =>
      prev === 0 ? filteredProperties.length - 1 : prev - 1
    );
  };

  // Reset currentIndex when filters change
  useEffect(() => {
    setCurrentPropertyIndex(0);
  }, [filters]);

  if (showAllProjects) {
    return (
      <div className="project-list-page">
        <div className="filters-bar">
          <div className="filter-group">
            <FilterDropdown
              label="Property Status"
              options={filterOptions.status}
              value={filters.status}
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, status: value }))
              }
            />
            <FilterDropdown
              label="Location"
              options={filterOptions.location}
              value={filters.location}
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, location: value }))
              }
            />
            <FilterDropdown
              label="Type"
              options={filterOptions.type}
              value={filters.type}
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, type: value }))
              }
            />
          </div>
        </div>

        <div className="project-viewer">
          <AnimatePresence mode="wait">
            {filteredProperties.length > 0 ? (
              <motion.div
                key={currentPropertyIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="card-container"
              >
                <div className="property-card">
                  <div className="property-image">
                    <img
                      src={filteredProperties[currentPropertyIndex].image}
                      alt={filteredProperties[currentPropertyIndex].title}
                    />
                    <button className="fullscreen-btn">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                      </svg>
                    </button>
                  </div>
                  <div className="property-details">
                    {/* <img src="/gksyyapi-logo.png" alt="GKS YAPI" className="company-logo" /> */}

                    <div className="detail-row">
                      <span className="label">Status</span>
                      <span className="value completed">
                        {filteredProperties[currentPropertyIndex].status}
                      </span>
                    </div>

                    <div className="detail-row">
                      <span className="label">
                        Project Start Date/ End Date
                      </span>
                      <span className="value">
                        {filteredProperties[currentPropertyIndex].startDate}-
                        {filteredProperties[currentPropertyIndex].endDate}
                      </span>
                    </div>

                    <div className="detail-row">
                      <span className="label">Price</span>
                      <span className="value">
                        €{filteredProperties[currentPropertyIndex].price}
                      </span>
                    </div>

                    <div className="detail-row">
                      <span className="label">Amenities</span>
                      <span className="value">
                        {filteredProperties[
                          currentPropertyIndex
                        ].amenities.join(" | ")}
                      </span>
                    </div>

                    <div className="detail-row">
                      <span className="label">Details</span>
                      <div className="value">
                        <p>
                          No of Floors:{" "}
                          {
                            filteredProperties[currentPropertyIndex].details
                              .floors
                          }
                        </p>
                        {filteredProperties[currentPropertyIndex].details
                          .bhkTypes && (
                          <>
                            <p>No of 2BHK Flats</p>
                            <p>No of 3 BHK Flats</p>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="action-buttons">
                      <button className="primary-btn">Watch Video</button>
                      <div className="secondary-buttons">
                        <button className="secondary-btn">View Catalog</button>
                        <button className="secondary-btn">Enquire Now</button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="no-results"
              >
                No properties match the selected filters
              </motion.div>
            )}
          </AnimatePresence>

          {filteredProperties.length > 1 && (
            <>
              <button className="nav-btn prev" onClick={handlePrevProperty}>
                <svg
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
              <button className="nav-btn next" onClick={handleNextProperty}>
                <svg
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
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="project-showcase-container">
      <div
        className="project-showcase"
        ref={projectRef}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
        onMouseMove={handleDragMove}
        onTouchMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onTouchEnd={handleDragEnd}
        onMouseLeave={handleDragEnd}
      >
        <div className="project-counter">
          {currentIndex + 1}/{projects.length} {projects[currentIndex].type}
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

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="project-content"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              x: isDragging ? dragX : 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              backgroundImage: `linear-gradient(to right, 
              rgba(26, 60, 114, 1) 0%, 
              rgba(26, 60, 114, 0.95) 20%,
              rgba(26, 60, 114, 0.85) 40%, 
              rgba(26, 60, 114, 0.6) 60%, 
              rgba(26, 60, 114, 0.4) 80%, 
              rgba(26, 60, 114, 0.2) 100%), 
              url(${projects[currentIndex].image})`,
            }}
          >
            <div className="content-wrapper">
              <h1 className="project-title">{projects[currentIndex].title}</h1>
              <p className="project-subtitle">
                {projects[currentIndex].subtitle}
              </p>

              <button
                className="show-more-button"
                onClick={handleViewAllProjects}
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
                  Show more
                </span>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Projects;
