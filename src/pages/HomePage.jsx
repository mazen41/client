import React from 'react';
import { motion } from 'framer-motion';
import { Box } from '@mui/material';
// import Navbar from '../components/Navbar';
// import HeroSection from '../components/HeroSection';
// import AboutSection from '../components/AboutSection';
// import ServicesSection from '../components/ServicesSection';
// import WhyChooseUs from '../components/WhyChooseUs';
import Navbar from '../components/Navbar/Navbar';
import HeroSection from '../components/HeroSection/HeroSection';
import AboutSection from '../components/AboutSection.jsx/AboutSection';
import ServicesSection from '../components/ServicesSection/ServicesSection';
import WhyChooseUs from '../components/WhyChooseUs/WhyChooseUs';
import Footer from '../components/Footer/Footer';
import OffersSection from '../components/Offers/OffersSection';
const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Navbar />
      
      <Box component="main" sx={{
        // maxWidth: '1280px',
        width: '98.80vw',
        mx: 'auto',
        px: { xs: 2, md: 4 },
      }}>
        <HeroSection />
        <Box sx={{ py: { xs: 8, md: 12 } }}>
          <AboutSection />
        </Box>
        <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: 'background.paper' }}>
          <ServicesSection />
        </Box>
        <Box sx={{ py: { xs: 8, md: 12 }}}>
          <OffersSection />
        </Box>
        <Box sx={{ py: { xs: 8, md: 12 } }}>
          <WhyChooseUs />
        </Box>
              <Box sx={{ py: { xs: 8, md: 12 } }}>
          <Footer />
        </Box>
      </Box>
    </motion.div>
  );
};

export default HomePage;