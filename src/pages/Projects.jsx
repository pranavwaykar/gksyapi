import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';

// Icon components
const GalleryIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21 15 16 10 5 21"/>
  </svg>
);

const PlanIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="12" y1="18" x2="12" y2="12"/>
    <line x1="9" y1="15" x2="15" y2="15"/>
  </svg>
);

const ThreeDIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3L2 12l10 9 10-9-10-9z"/>
    <path d="M12 21V12"/>
    <path d="M12 12L2 3"/>
    <path d="M12 12l10-9"/>
  </svg>
);

const VideoIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <polygon points="10 8 16 12 10 16 10 8"/>
  </svg>
);

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      <div className="project-image">
        <img src={project.image} alt={project.name} />
        
        {/* Quick action buttons */}
        <div className="quick-actions">
          <button title="Gallery"><GalleryIcon /></button>
          <button title="Floor Plans"><PlanIcon /></button>
          <button title="3D Tour"><ThreeDIcon /></button>
          <button title="Video"><VideoIcon /></button>
        </div>
      </div>

      <div className="project-info">
        <h2>{project.name}</h2>
        <p className="project-type">{project.description}</p>

        <div className="project-details">
          <div className="detail-item">
            <span className="label">Площадь строения</span>
            <span className="value">{project.area} м2</span>
          </div>
          <div className="detail-item">
            <span className="label">Этажей</span>
            <span className="value">{project.floors}</span>
          </div>
          <div className="detail-item">
            <span className="label">Стеновой материал</span>
            <span className="value">{project.material}</span>
          </div>
          <div className="detail-item">
            <span className="label">Технология</span>
            <span className="value">{project.technology}</span>
          </div>
          <div className="detail-item">
            <span className="label">Угловое соединение</span>
            <span className="value">{project.jointType}</span>
          </div>
        </div>

        <div className="project-features">
          {project.features.map((feature, index) => (
            <div key={index} className="feature">
              <img src={feature.icon} alt={feature.name} />
              <span>{feature.name}</span>
            </div>
          ))}
        </div>

        <div className="project-pricing">
          <div className="price-item">
            <span className="price">{project.turnkeyPrice} ₽</span>
            <span className="label">Под ключ</span>
            <button className="info-button">Что входит в цену?</button>
          </div>
          <div className="price-item">
            <span className="price">{project.framePrice} ₽</span>
            <span className="label">Сруб</span>
            <button className="info-button">Что входит в цену?</button>
          </div>
        </div>

        <div className="project-actions">
          <button className="primary-button">Оставить заявку</button>
          <button className="share-button">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
              <polyline points="16 6 12 2 8 6"/>
              <line x1="12" y1="2" x2="12" y2="15"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const projects = [
  {
    id: 1,
    title: 'Kvartet',
    subtitle: 'Where Alp view meet urban vibe',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 2,
    title: 'Dúbravka',
    subtitle: 'Nature-inspired living spaces',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2940&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'Forest Retreat',
    subtitle: 'Escape into the wild',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 4,
    title: 'Mountain Haven',
    subtitle: 'Serenity in the peaks',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }
];

const Projects = () => {
  const [[currentIndex, direction], setPage] = useState([0, 0]);
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const controls = useAnimation();
  const dragStartX = useRef(0);
  
  // Apply animations when currentIndex changes
  useEffect(() => {
    controls.start("center");
  }, [currentIndex, controls]);

  // Auto-play timer
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        paginate(1);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex]);

  const paginate = (newDirection) => {
    setPage(([current]) => {
      const newIndex = (current + newDirection + projects.length) % projects.length;
      return [newIndex, newDirection];
    });
  };

  const handleDragStart = (event, info) => {
    dragStartX.current = info.point.x;
    setIsDragging(true);
    setIsAutoPlaying(false);
  };

  const handleDragEnd = (event, info) => {
    const dragDistance = info.point.x - dragStartX.current;
    const threshold = 80; // Lower threshold to make dragging more responsive
    
    if (Math.abs(dragDistance) > threshold) {
      if (dragDistance > 0) {
        paginate(-1);
      } else {
        paginate(1);
      }
    }
    
    setIsDragging(false);
    setTimeout(() => setIsAutoPlaying(true), 500);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { 
          type: "tween", 
          duration: 0.3, 
          ease: "easeOut" 
        },
        opacity: { duration: 0.2 }
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      transition: {
        x: { 
          type: "tween", 
          duration: 0.3, 
          ease: "easeIn" 
        },
        opacity: { duration: 0.2 }
      }
    })
  };

  const handleButtonClick = (newDirection) => {
    setIsAutoPlaying(false);
    paginate(newDirection);
    setTimeout(() => setIsAutoPlaying(true), 500);
  };

  return (
    <div className="projects-container">
      <motion.div 
        className="background-blur" 
        animate={{ opacity: 0.3 }}
        initial={{ opacity: 0 }}
        style={{ 
          backgroundImage: `url(${projects[currentIndex].image})`,
          willChange: "transform, opacity"
        }} 
        transition={{ duration: 0.5 }}
      />
      
      <div className="project-card">
        <div className="navigation">
          <button 
            className="nav-button prev" 
            onClick={() => handleButtonClick(-1)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button 
            className="nav-button next" 
            onClick={() => handleButtonClick(1)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            className="project-content-wrapper"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.4}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            style={{ 
              backgroundImage: `url(${projects[currentIndex].image})`,
              touchAction: "none"
            }}
          >
            <div className="project-content">
              <div className="project-type">S/O HOMES</div>
              <motion.h1 
                className="project-title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {projects[currentIndex].title}
              </motion.h1>
              <motion.p 
                className="project-subtitle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {projects[currentIndex].subtitle}
              </motion.p>
            </div>

            {isDragging && (
              <motion.div 
                className="drag-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Slide to navigate
              </motion.div>
            )}

            <motion.div 
              className="show-more"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <button className="show-more-button">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M8 12h8"/>
                  <path d="M12 8l4 4-4 4"/>
                </svg>
                Show more
              </button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Projects; 