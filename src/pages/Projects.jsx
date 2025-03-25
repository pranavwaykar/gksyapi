import React from 'react';
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

const Projects = () => {
  const projects = [
    {
      name: 'Альбатрос',
      description: 'Жилой дом из клееного бруса',
      image: '/path/to/project-image.jpg',
      area: '584',
      floors: '3',
      material: 'Сибирский кедр от 380 мм в вершине',
      technology: 'Усадочная технология, Post&Beam',
      jointType: 'Бриллиантовая канадская чаша (Diamond notch)',
      turnkeyPrice: '17 500 000',
      framePrice: '2 250 000',
      features: [
        { name: 'Витражные окна', icon: '/icons/window.svg' },
        { name: 'Большой балкон', icon: '/icons/balcony.svg' },
        { name: 'Большая терраса', icon: '/icons/terrace.svg' },
        { name: 'Каминный зал', icon: '/icons/fireplace.svg' },
        { name: 'Сауна и баня', icon: '/icons/sauna.svg' },
      ]
    },
    // Add more projects here
  ];

  return (
    <div className="projects-page">
      <div className="projects-grid">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects; 