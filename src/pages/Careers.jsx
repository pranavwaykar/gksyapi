import React, { useState, useRef, useEffect } from "react";
import "../styles/pages/_careers.scss";
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';
import Footer from '../components/organisms/Footer';

// Import ContactForm component - adjust the path as needed
import Contaxxx from '../components/ContactForm';
import { setupVerticalTextAnimations } from '../utils/animations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faArrowLeft, faArrowRight, faLink } from '@fortawesome/free-solid-svg-icons';

const Careers = () => {
  const { language } = useLanguage();
  const t = translations[language];
  
  const [showForm, setShowForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  
  const jobListingsData = t.careersPage.jobListings;
  
  const jobImages = {
    1: "https://plus.unsplash.com/premium_photo-1682126848758-ac1c68fa0059?q=80&w=2083&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    2: "https://plus.unsplash.com/premium_photo-1663047346199-9516fe33fce1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    3: "https://plus.unsplash.com/premium_photo-1723914155810-96d1edbaf4d7?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    4: "https://plus.unsplash.com/premium_photo-1661768654229-5a2eeeca1857?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    5: "https://plus.unsplash.com/premium_photo-1723629708893-ba90c0cb24e5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  };
  
  // Combine translation data with images
  const jobListings = jobListingsData.map(job => ({
    ...job,
    image: jobImages[job.id]
  }));

  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [sliderScrollLeft, setSliderScrollLeft] = useState(0);

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setShowForm(true);
  };

  const handleBackToJobs = () => {
    setShowForm(false);
    setSelectedJob(null);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setSliderScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = sliderScrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleScrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -400,
        behavior: "smooth",
      });
    }
  };

  const handleScrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: 400,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    setupVerticalTextAnimations();
  }, []);

  return (
    <div className="careers-page">
      <div className="careers-container">
        <div className="careers-content">
          {!showForm ? (
            <>
              <button className="nav-button prev" onClick={handleScrollLeft}>
                <FontAwesomeIcon icon={faChevronLeft} style={{color: 'white', width: '1.5rem', height: '1.5rem'}}/>
              </button>

              <div
                className="careers-slider"
                ref={sliderRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                {jobListings.map((job) => (
                  <div className="job-card" key={job.id}>
                    <div className="job-content">
                      <div className="job-image-container">
                        <img src={job.image} alt={job.title} className="job-image" />
                        <div className="job-overlay">
                          <h3>{job.title}</h3>
                          
                          <div className="link-icon">
                            <FontAwesomeIcon icon={faLink} />
                          </div>
                          
                          <button 
                            className="apply-btn" 
                            onClick={() => handleApplyClick(job)}
                          >
                            APPLY NOW
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="nav-button next" onClick={handleScrollRight}>
                <FontAwesomeIcon icon={faChevronRight} style={{color: 'white', width: '1.5rem', height: '1.5rem'}}  />
              </button>
            </>
          ) : (
            <div className="career-application-form">
              {/* <div className="form-header">
                <button className="back-button" onClick={handleBackToJobs}>
                  <FontAwesomeIcon icon={faArrowLeft} /> 
                  Back to Jobs
                </button>
              </div> */}
              <Contaxxx onClose={handleBackToJobs} />
            </div>
          )}
        </div>

        <div className="vertical-text left">
          <div className="line"></div>
          <span className="left-text">{t.careers.joinOurTeam}</span>
          <span className="large-text-primary">{t.careers.exploreText}</span>
          <span className="large-text-secondary">{t.careers.careerText}</span>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Careers;
