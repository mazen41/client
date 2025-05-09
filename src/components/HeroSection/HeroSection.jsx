import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Box, Typography, Button, Grid, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import Lottie from 'lottie-react';
import startupAnimation from '../../animation.json'; // Place your animation file here

const AnimatedCircle = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  borderRadius: '50%',
  opacity: 0.15,
  zIndex: 1,
}));

const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        py: { xs: 10, md: 16 },
        pl: { xs: 2, md: 4 },
        pr: { xs: 2, md: 4 },
        backgroundColor: '#f9fafb',
      }}
    >
      {/* Background Animated Circles */}
      <AnimatedCircle
        animate={{ x: [0, 40, -40, 0], y: [0, 30, -30, 0] }}
        transition={{ repeat: Infinity, duration: 18 }}
        sx={{
          width: 280,
          height: 280,
          backgroundColor: 'primary.main',
          top: 0,
          [isArabic ? 'right' : 'left']: '5%',
        }}
      />
      <AnimatedCircle
        animate={{ x: [0, -30, 30, 0], y: [0, -20, 20, 0] }}
        transition={{ repeat: Infinity, duration: 20 }}
        sx={{
          width: 180,
          height: 180,
          backgroundColor: 'secondary.main',
          bottom: 0,
          [isArabic ? 'left' : 'right']: '5%',
        }}
      />
      <AnimatedCircle
        animate={{ scale: [1, 1.2, 1], rotate: [0, 20, -20, 0] }}
        transition={{ repeat: Infinity, duration: 16 }}
        sx={{
          width: 100,
          height: 100,
          backgroundColor: 'info.main',
          top: '30%',
          [isArabic ? 'left' : 'right']: '10%',
        }}
      />

      {/* Hero Content */}
      <Grid container spacing={6} alignItems="center" direction={isMobile ? 'column-reverse' : 'row'}>
        {/* Left Side */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Typography
              variant="h1"
              sx={{
                mb: 3,
                fontWeight: 'bold',
                fontSize: { xs: '2rem', md: '3rem' },
                textAlign: isMobile ? 'center' : isArabic ? 'right' : 'left',
              }}
            >
              {t('hero.title')}
            </Typography>

            <Typography
              variant="h5"
              color="text.secondary"
              sx={{
                mb: 4,
                textAlign: isMobile ? 'center' : isArabic ? 'right' : 'left',
                lineHeight: 1.6,
                maxWidth: '620px',
                mx: isMobile ? 'auto' : 0,
              }}
            >
              {t('hero.subtitle')}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                gap: 3,
                justifyContent: isMobile ? 'center' : isArabic ? 'flex-end' : 'flex-start',
              }}
            >
              <Button
                variant="contained"
                size="large"
                component={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {t('hero.cta1')}
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                  },
                }}
                component={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {t('hero.cta2')}
              </Button>
            </Box>
          </motion.div>
        </Grid>

        {/* Right Side Lottie Animation */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Box
              sx={{
                height: 450,
                width: '100%',
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 4,
                backgroundColor: '#ffffff',
              }}
            >
              <Lottie
                animationData={startupAnimation}
                loop
                style={{ width: '100%', height: '100%' }}
              />
            </Box>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HeroSection;
