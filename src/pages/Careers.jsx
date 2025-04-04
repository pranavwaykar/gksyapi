import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/pages/_careers.scss";

const Careers = () => {
  const jobListings = [
    {
      id: 1,
      title: "Construction Manager",
      description:
        "Lead and oversee construction projects from inception to completion. Manage timelines, budgets, and team coordination.",
      image:
        "https://plus.unsplash.com/premium_photo-1682126848758-ac1c68fa0059?q=80&w=2083&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "/jobs/construction-manager",
    },
    {
      id: 2,
      title: "Architectural Designer",
      description:
        "Create innovative architectural designs for residential and commercial properties. Collaborate with clients and contractors.",
      image:
        "https://plus.unsplash.com/premium_photo-1663047346199-9516fe33fce1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "/jobs/architect",
    },
    {
      id: 3,
      title: "Project Engineer",
      description:
        "Manage technical aspects of construction projects. Ensure compliance with building codes and safety regulations.",
      image:
        "https://plus.unsplash.com/premium_photo-1723914155810-96d1edbaf4d7?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "/jobs/engineer",
    },
    {
      id: 4,
      title: "Real Estate Analyst",
      description:
        "Analyze market trends, property valuations, and investment opportunities. Prepare detailed financial reports and forecasts.",
      image:
        "https://plus.unsplash.com/premium_photo-1661768654229-5a2eeeca1857?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "/jobs/analyst",
    },
    {
      id: 5,
      title: "Interior Designer",
      description:
        "Design and coordinate interior spaces for residential and commercial properties. Work with clients to realize their vision.",
      image:
        "https://plus.unsplash.com/premium_photo-1723629708893-ba90c0cb24e5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "/jobs/interior-designer",
    },
  ];

  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [sliderScrollLeft, setSliderScrollLeft] = useState(0);

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

  return (
    <div className="careers-container">
      <div className="careers-content">
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
                    <Link to={job.link}>
                      <button className="apply-btn">APPLY NOW</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="nav-button next" onClick={handleScrollRight}>
          <span>&#8250;</span>
        </button>
      </div>

      <div className="vertical-text left">
        <div className="line"></div>
        <span className="left-text">Join Our Team</span>
        <span className="large-text-primary">Explore</span>
        <span className="large-text-secondary">Career</span>
      </div>
    </div>
  );
};

export default Careers;
