import React from 'react';

// Quick action icons (left side)
const GalleryIcon = () => (
  <svg 
    className="icon" 
    viewBox="0 0 24 24" 
    width="24" 
    height="24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21 15 16 10 5 21"/>
  </svg>
);

const PlanIcon = () => (
  <svg 
    className="icon" 
    viewBox="0 0 24 24" 
    width="24" 
    height="24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
  </svg>
);

const ThreeDIcon = () => (
  <svg 
    className="icon" 
    viewBox="0 0 24 24" 
    width="24" 
    height="24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M12 3L2 12l10 9 10-9-10-9z"/>
    <path d="M12 21V12"/>
    <path d="M12 12L2 3"/>
    <path d="M12 12l10-9"/>
  </svg>
);

const VideoIcon = () => (
  <svg 
    className="icon" 
    viewBox="0 0 24 24" 
    width="24" 
    height="24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"/>
    <polygon points="10 8 16 12 10 16 10 8"/>
  </svg>
);

// Feature icons (bottom)
const features = [
  {
    icon: "window",
    label: "Витражные окна"
  },
  {
    icon: "balcony",
    label: "Большой балкон"
  },
  {
    icon: "terrace",
    label: "Большая терраса"
  },
  {
    icon: "fireplace",
    label: "Каминный зал"
  },
  {
    icon: "sauna",
    label: "Сауна и баня"
  }
];

const ResidentialProjects = () => {
  const project = {
    name: 'Альбатрос',
    type: 'Жилой дом из клееного бруса',
    specs: {
      area: '584 м2',
      floors: '3',
      material: 'Сибирский кедр от 380 мм в вершине',
      technology: 'Усадочная технология, Post&Beam',
      connection: 'Бриллиантовая канадская чаша (Diamond notch)'
    },
    prices: {
      turnkey: '17 500 000 ₽',
      frame: '2 250 000 ₽'
    }
  };

  // Set the background image
  React.useEffect(() => {
    document.documentElement.style.setProperty(
      '--bg-image',
      `url("https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2549&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`
    );

    return () => {
      document.documentElement.style.removeProperty('--bg-image');
    };
  }, []);

  return (
    <div className="project-viewer">
      <div className="project-card">
        <div className="project-main">
          <div className="quick-actions">
            <button><GalleryIcon /></button>
            <button><PlanIcon /></button>
            <button><ThreeDIcon /></button>
            <button><VideoIcon /></button>
          </div>
          
          <img 
            src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2549&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt={project.name} 
            className="main-image"
          />

          <div className="feature-icons">
            {features.map((feature, index) => (
              <div key={index} className="feature-item">
                <img src={`/icons/${feature.icon}.svg`} alt={feature.label} />
                <span>{feature.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="project-details">
          <h1>{project.name}</h1>
          <p className="project-type">{project.type}</p>

          <div className="specs-grid">
            <div className="spec-row">
              <span className="label">Площадь строения</span>
              <span className="value">{project.specs.area}</span>
            </div>
            <div className="spec-row">
              <span className="label">Этажей</span>
              <span className="value">{project.specs.floors}</span>
            </div>
            <div className="spec-row">
              <span className="label">Стеновой материал</span>
              <span className="value">{project.specs.material}</span>
            </div>
            <div className="spec-row">
              <span className="label">Технология</span>
              <span className="value">{project.specs.technology}</span>
            </div>
            <div className="spec-row">
              <span className="label">Угловое соединение</span>
              <span className="value">{project.specs.connection}</span>
            </div>
          </div>

          <div className="pricing-section">
            <div className="price-row">
              <span className="label">Под ключ</span>
              <span className="price">{project.prices.turnkey}</span>
              <button className="info-link">Что входит в цену?</button>
            </div>
            <div className="price-row">
              <span className="label">Сруб</span>
              <span className="price">{project.prices.frame}</span>
              <button className="info-link">Что входит в цену?</button>
            </div>
          </div>

          <div className="action-buttons">
            <button className="primary-button">Оставить заявку</button>
            <button className="share-button">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                <polyline points="16 6 12 2 8 6"/>
                <line x1="12" y1="2" x2="12" y2="15"/>
              </svg>
            </button>
            <button className="call-button">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResidentialProjects; 