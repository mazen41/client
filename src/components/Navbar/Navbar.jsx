import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box, IconButton, useMediaQuery } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const isArabic = i18n.language === 'ar';
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const [hasShadow, setHasShadow] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.body.dir = lng === 'ar' ? 'rtl' : 'ltr';
  };

  useEffect(() => {
    const handleScroll = () => {
      // Get the about section element
      const aboutSection = document.getElementById('about-section');
      if (aboutSection) {
        // Calculate when to add shadow (100px before reaching about section)
        const triggerPoint = aboutSection.offsetTop - 100;
        setHasShadow(window.scrollY > triggerPoint);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { key: 'home', path: '/' },
    { key: 'about', path: '/about' },
    { key: 'services', path: '/services' },
    { key: 'why', path: '/why' }
  ];

  return (
    <AppBar 
      position="sticky"
      elevation={hasShadow ? 4 : 0}
      sx={{ 
        backgroundColor: 'background.paper',
        color: 'text.primary',
        borderBottom: hasShadow ? 'none' : '1px solid',
        borderColor: 'divider',
        py: 1,
        transition: 'all 0.3s ease',
        boxShadow: hasShadow ? '0px 2px 10px rgba(0, 0, 0, 0.1)' : 'none'
      }}
    >
      <Toolbar sx={{ 
        maxWidth: '1280px',
        width: '100%',
        mx: 'auto',
        px: { xs: 2, md: 4 },
      }}>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: '120px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <img 
              src="./logo2.png" 
              alt="NadaPay Logo"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain'
              }}
            />
          </motion.div>

          {!isMobile && (
            <Box sx={{ display: 'flex', ml: 4 }}>
              {navItems.map((item) => (
                <Button
                  key={item.key}
                  component={RouterLink}
                  to={item.path}
                  sx={{
                    mx: 1,
                    color: location.pathname === item.path ? 'primary.main' : 'text.primary',
                    fontWeight: location.pathname === item.path ? 600 : 400,
                  }}
                >
                  {t(`navbar.${item.key}`)}
                </Button>
              ))}
            </Box>
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            component={RouterLink}
            to="/login"
            variant="outlined"
            sx={{
              borderColor: 'primary.main',
              color: 'primary.main',
              '&:hover': {
                backgroundColor: 'primary.light',
                borderColor: 'primary.dark',
              },
            }}
          >
            {t('navbar.login')}
          </Button>
          
          <Button
            component={RouterLink}
            to="/register"
            variant="contained"
          >
            {t('navbar.register')}
          </Button>

          <IconButton
            onClick={() => changeLanguage(isArabic ? 'en' : 'ar')}
            sx={{
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <LanguageIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;