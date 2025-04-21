import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../translations";
import { Select, Radio, Slider, TextInput, Button, Checkbox } from '@mantine/core';
import "../styles/pages/_contaxxx.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Contaxxx = ({ onClose }) => {
  // Get translations
  const { language } = useLanguage();
  const t = translations[language];

  // Form states
  const [userType, setUserType] = useState(null);
  const [portfolioFile, setPortfolioFile] = useState(null);
  const [certificationFile, setCertificationFile] = useState(null);
  const [catalogueFile, setCatalogueFile] = useState(null);
  const [registrationFile, setRegistrationFile] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { ...formData, userType });
    // Add your form submission logic here
    
    // Optional: Close form after submission
    if (onClose) onClose();
  };

  // Add rendering function for conditional fields
  const renderConditionalFields = () => {
    switch(userType) {
      case 'individual':
        return (
          <>
            <div className="form-group property-card-form-ele">
              <p className="form-label">Property Type</p>
              <Radio.Group name="propertyType">
                <div className="radio-container">
                  <Radio value="villa" label="Villa" />
                  <Radio value="apartment" label="Apartment" />
                  <Radio value="rowhouse" label="Rowhouse" />
                  <Radio value="farmhouse" label="Farmhouse" />
                  <Radio value="custom" label="Custom Build" />
                </div>
              </Radio.Group>
            </div>
            
            <div className="form-group property-card-form-ele">
              <p className="form-label">Budget Range</p>
              <Slider
                min={100000}
                max={10000000}
                step={100000}
                label={(value) => `$${value.toLocaleString()}`}
                defaultValue={1000000}
                marks={[
                  { value: 1000000, label: '$1M' },
                  { value: 5000000, label: '$5M' },
                  { value: 10000000, label: '$10M' },
                ]}
              />
            </div>
            
            <div className="form-group property-card-form-ele">
              <p className="form-label">Location Preference</p>
              <TextInput placeholder="Enter your preferred location" />
            </div>
          </>
        );
        
      case 'investor':
        return (
          <>
            <div className="form-group property-card-form-ele">
              <p className="form-label">Investment Type</p>
              <Radio.Group name="investmentType">
                <div className="radio-container">
                  <Radio value="residential" label="Residential" />
                  <Radio value="commercial" label="Commercial" />
                  <Radio value="mixed" label="Mixed-Use" />
                </div>
              </Radio.Group>
            </div>
            
            <div className="form-group property-card-form-ele">
              <p className="form-label">Investment Range</p>
              <Slider
                min={500000}
                max={50000000}
                step={500000}
                label={(value) => `$${value.toLocaleString()}`}
                defaultValue={5000000}
                marks={[
                  { value: 5000000, label: '$5M' },
                  { value: 25000000, label: '$25M' },
                  { value: 50000000, label: '$50M' },
                ]}
              />
            </div>
            
            <div className="form-group property-card-form-ele">
              <p className="form-label">Partnership Opportunity</p>
              <Radio.Group name="partnership">
                <div className="radio-container">
                  <Radio value="yes" label="Yes" />
                  <Radio value="no" label="No" />
                </div>
              </Radio.Group>
            </div>
          </>
        );
        
      case 'architect':
        return (
          <>
            <div className="form-group property-card-form-ele">
              <p className="form-label">Area of Expertise</p>
              <TextInput placeholder="Enter your area of expertise" />
            </div>
            
            <div className="form-group property-card-form-ele">
              <p className="form-label">Portfolio Upload</p>
              <div className="file-upload-container">
                <input
                  type="file"
                  id="portfolio-upload"
                  accept="application/pdf,image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => setPortfolioFile(e.target.files[0]?.name)}
                />
                <Button 
                  component="label" 
                  htmlFor="portfolio-upload"
                  variant="outline"
                  style={{ marginRight: '10px' }}
                >
                  Upload File
                </Button>
                {portfolioFile && <span className="file-name">{portfolioFile}</span>}
              </div>
            </div>
            
            <div className="form-group property-card-form-ele">
              <p className="form-label">Interested in</p>
              <Radio.Group name="interest">
                <div className="radio-container">
                  <Radio value="partnership" label="Partnership" />
                  <Radio value="tender" label="Tender" />
                  <Radio value="collaboration" label="Collaboration" />
                </div>
              </Radio.Group>
            </div>
            
            <div className="form-group property-card-form-ele">
              <p className="form-label">Availability for Meeting</p>
              <input 
                type="date" 
                className="form-control" 
                name="meetingDate"
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '4px',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  fontSize: '14px'
                }}
              />
            </div>
          </>
        );
        
      case 'contractor':
        return (
          <>
            <div className="form-group property-card-form-ele">
              <p className="form-label">Type of Work</p>
              <Checkbox.Group>
                <div className="checkbox-container">
                  <Checkbox value="civil" label="Civil" />
                  <Checkbox value="electrical" label="Electrical" />
                  <Checkbox value="plumbing" label="Plumbing" />
                  <Checkbox value="interior" label="Interior" />
                </div>
              </Checkbox.Group>
            </div>
            
            <div className="form-group property-card-form-ele">
              <p className="form-label">Past Project References</p>
              <TextInput 
                placeholder="Enter references or descriptions" 
                name="projectReferences"
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group property-card-form-ele">
              <p className="form-label">License/Certification Upload</p>
              <div className="file-upload-container">
                <input
                  type="file"
                  id="certification-upload"
                  accept="application/pdf,image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => setCertificationFile(e.target.files[0]?.name)}
                />
                <Button 
                  component="label" 
                  htmlFor="certification-upload"
                  variant="outline"
                  style={{ marginRight: '10px' }}
                >
                  Upload File
                </Button>
                {certificationFile && <span className="file-name">{certificationFile}</span>}
              </div>
            </div>
            
            <div className="form-group property-card-form-ele">
              <p className="form-label">Team Strength</p>
              <input 
                type="number" 
                min="1" 
                name="teamStrength"
                placeholder="Enter number of team members"
                className="form-control"
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '4px',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  fontSize: '14px'
                }}
              />
            </div>
          </>
        );
        
      case 'vendor':
        return (
          <>
            <div className="form-group property-card-form-ele">
              <p className="form-label">Type of Supply</p>
              <Radio.Group name="supplyType">
                <div className="radio-container">
                  <Radio value="materials" label="Materials" />
                  <Radio value="equipment" label="Equipment" />
                  <Radio value="services" label="Services" />
                </div>
              </Radio.Group>
            </div>
            
            <div className="form-group property-card-form-ele">
              <p className="form-label">Product Catalogue Upload</p>
              <div className="file-upload-container">
                <input
                  type="file"
                  id="catalogue-upload"
                  accept="application/pdf,image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => setCatalogueFile(e.target.files[0]?.name)}
                />
                <Button 
                  component="label" 
                  htmlFor="catalogue-upload"
                  variant="outline"
                  style={{ marginRight: '10px' }}
                >
                  Upload File
                </Button>
                {catalogueFile && <span className="file-name">{catalogueFile}</span>}
              </div>
            </div>
            
            <div className="form-group property-card-form-ele">
              <p className="form-label">Company Registration Upload</p>
              <div className="file-upload-container">
                <input
                  type="file"
                  id="registration-upload"
                  accept="application/pdf,image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => setRegistrationFile(e.target.files[0]?.name)}
                />
                <Button 
                  component="label" 
                  htmlFor="registration-upload"
                  variant="outline"
                  style={{ marginRight: '10px' }}
                >
                  Upload File
                </Button>
                {registrationFile && <span className="file-name">{registrationFile}</span>}
              </div>
            </div>
            
            <div className="form-group property-card-form-ele">
              <p className="form-label">Delivery Capabilities</p>
              <TextInput 
                placeholder="Describe your delivery capabilities" 
                name="deliveryCapabilities"
                onChange={handleInputChange}
              />
            </div>
          </>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="contact-form-wrapper">
      {onClose && (
        <button 
          className="back-to-property-button"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Back
        </button>
      )}
      
      <div className="contact-form-container">
        <div className="contact-form-columns">
          {/* Left Column */}
          <div className="contact-info-column">
            <div className="info-item">
              <div className="info-content">
                <p className="info-label">{t.projects?.contactForm?.emailSection?.label || "Email"}</p>
                <p className="info-value">{t.projects?.contactForm?.emailSection?.value || "info@gksyapi.com"}</p>
              </div>
              <a href={`mailto:${t.projects?.contactForm?.emailSection?.value || "info@gksyapi.com"}`} className="info-arrow">
                →
              </a>
            </div>
            
            <div className="info-item">
              <div className="info-content">
                <p className="info-label">{t.projects?.contactForm?.phoneSection?.label || "Phone"}</p>
                <p className="info-value">{t.projects?.contactForm?.phoneSection?.value || "+90 212 555 1234"}</p>
              </div>
              <a href={`tel:${(t.projects?.contactForm?.phoneSection?.value || "+90 212 555 1234").replace(/\s+/g, '')}`} className="info-arrow">
                →
              </a>
            </div>
            
            <div className="info-item">
              <div className="info-content">
                <p className="info-label">{t.projects?.contactForm?.locationSection?.label || "Location"}</p>
                <p className="info-value">{t.projects?.contactForm?.locationSection?.value || "Istanbul, Turkey"}</p>
              </div>
              <a href="#" className="info-arrow">
                →
              </a>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="contact-form-column" >
            <form className="contact-form" onSubmit={handleSubmit} style={{ paddingBottom: userType === null ? '0.5rem' : '3rem' }}>
              <div className="form-row property-card-form-ele">
                <input 
                  type="text" 
                  name="firstName"
                  placeholder={t.projects?.contactForm?.form?.firstName || "First Name"} 
                  className="form-input" 
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                <input 
                  type="text" 
                  name="lastName"
                  placeholder={t.projects?.contactForm?.form?.lastName || "Last Name"} 
                  className="form-input" 
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-row property-card-form-ele">
                <input 
                  type="email" 
                  name="email"
                  placeholder={t.projects?.contactForm?.form?.email || "Email"} 
                  className="form-input" 
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <input 
                  type="tel" 
                  name="phone"
                  placeholder={t.projects?.contactForm?.form?.phone || "Phone"} 
                  className="form-input" 
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group property-card-form-ele">
                <p className="form-label">{t.projects?.contactForm?.form?.reasonTitle || "I am a"}</p>
                <Select
                  placeholder={t.projects?.contactForm?.form?.selectOption || "Select an option"}
                  data={[
                    { value: 'individual', label: 'Individual Buyer/Owner' },
                    { value: 'investor', label: 'Real Estate Investor' },
                    { value: 'architect', label: 'Architect/Consultant' },
                    { value: 'contractor', label: 'Contractor/Subcontractor' },
                    { value: 'vendor', label: 'Vendor/Supplier' }
                  ]}
                  searchable
                  clearable
                  value={userType}
                  onChange={setUserType}
                  styles={{
                    root: { width: '100%' },
                    input: { 
                      padding: '10px 14px',
                      borderColor: 'rgba(0, 0, 0, 0.1)',
                      fontSize: '14px',
                      color: '#333'
                    },
                    dropdown: {
                      borderRadius: '4px',
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
                    }
                  }}
                />
              </div>
              
              {renderConditionalFields()}
              
              <div className="form-group property-card-form-ele">
                <textarea 
                  name="message"
                  placeholder={t.projects?.contactForm?.form?.message || "Message"} 
                  className="form-textarea"
                  value={formData.message}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              
              <button type="submit" className="send-button">
                {t.projects?.contactForm?.form?.sendButton || "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contaxxx; 