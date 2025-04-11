import React, { useState, useRef, useEffect } from "react";
import "../styles/pages/_careers.scss";
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';
import Footer from '../components/organisms/Footer';

// Import ContactForm component - adjust the path as needed
import ContactForm from '../components/ContactForm';
import { setupVerticalTextAnimations } from '../utils/animations';

const Careers = () => {
  const { language } = useLanguage();
  const t = translations[language];
  
  // Add state for showing the form and selected job
  const [showForm, setShowForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  
  // Get job listings text content from translations
  const jobListingsData = t.careersPage.jobListings;
  
  // Keep image URLs in the component
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

  // Handle Apply Now button click
  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setShowForm(true);
  };

  // Handle back to jobs listing
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

  // Initialize vertical text animations
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
                <span>&#8249;</span>
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
                          <p>{job.description}</p>
                          <div className="link-icon">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
                                stroke="currentColor"
                                strokeWidth="2"
                              />
                              <path
                                d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
                                stroke="currentColor"
                                strokeWidth="2"
                              />
                            </svg>
                          </div>
                          {/* Replace Link with button */}
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
                <span>&#8250;</span>
              </button>
            </>
          ) : (
            <div className="career-application-form">
              <div className="form-header">
                <button className="back-button" onClick={handleBackToJobs}>
                  ← Back to Jobs
                </button>
                <h3>Apply for: {selectedJob?.title}</h3>
              </div>
              <ContactForm jobTitle={selectedJob?.title} />
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
