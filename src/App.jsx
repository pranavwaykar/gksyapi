import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Careers from './pages/Careers';
import ContactUs from './pages/ContactUs';
import Solutions from './pages/Solutions';
import ResidentialProjects from './pages/ResidentialProjects';
import CommercialProjects from './pages/CommercialProjects';
import './styles/main.scss';

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/projects/residential" element={<ResidentialProjects />} />
          <Route path="/projects/commercial" element={<CommercialProjects />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
