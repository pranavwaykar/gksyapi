import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import About from './pages/About';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import CircularCursor from './components/CircularCursor';
import './styles/main.scss';
import { LanguageProvider } from './contexts/LanguageContext';
import PageTransition from './components/PageTransition';

function App() {
  return (
    <LanguageProvider>
      <CircularCursor />
      <BrowserRouter>
        <PageTransition>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </PageTransition>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
