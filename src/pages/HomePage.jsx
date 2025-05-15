import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import HeroSection from '../components/HeroSection/HeroSection';
import AboutSection from '../components/AboutSection/AboutSection';
import ServicesSection from '../components/ServicesSection/ServicesSection';
import WhyChooseUs from '../components/WhyChooseUs/WhyChooseUs';
import Footer from '../components/Footer/Footer';
import OffersSection from '../components/Offers/OffersSection';

const HomePage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  
  // Create refs for each section
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const offersRef = useRef(null);
  const whyChooseUsRef = useRef(null);
  
  // Check authentication
  useEffect(() => {
    if (token) {
      navigate('/dashboard'); // Corrected typo from 'dahsboard' to 'dashboard'
    }
  }, [token, navigate]);

  // Scroll to section handler with navbar offset
  const scrollToSection = (sectionId) => {
    const refs = {
      'hero': heroRef,
      'about': aboutRef,
      'services': servicesRef,
      'offers': offersRef,
      'why': whyChooseUsRef
    };
    
    const sectionRef = refs[sectionId];
    if (sectionRef?.current) {
      const yOffset = -80; // Adjust this value based on your navbar height
      const y = sectionRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Navbar scrollToSection={scrollToSection} />

      <Box component="main" sx={{
        width: '98.80vw',
        mx: 'auto',
        px: { xs: 2, md: 4 },
        scrollMarginTop: '80px' // Ensures content isn't hidden behind fixed navbar
      }}>
        {/* Hero Section */}
        <Box ref={heroRef} id="hero-section">
          <HeroSection />
        </Box>

        {/* About Section */}
        <Box ref={aboutRef} id="about-section" sx={{ py: { xs: 8, md: 12 } }}>
          <AboutSection />
        </Box>

        {/* Services Section */}
        <Box ref={servicesRef} id="services-section" sx={{ 
          py: { xs: 8, md: 12 }, 
          backgroundColor: 'background.paper' 
        }}>
          <ServicesSection />
        </Box>

        {/* Offers Section */}
        <Box ref={offersRef} id="offers-section" sx={{ py: { xs: 8, md: 12 } }}>
          <OffersSection />
        </Box>

        {/* Why Choose Us Section */}
        <Box ref={whyChooseUsRef} id="why-section" sx={{ py: { xs: 8, md: 12 } }}>
          <WhyChooseUs />
        </Box>

        {/* Footer */}
        <Box sx={{ py: { xs: 8, md: 12 } }}>
          <Footer />
        </Box>
      </Box>
    </motion.div>
  );
};

export default HomePage;