// src/components/HeroSection.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Box, Typography, Button, useMediaQuery } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import startupAnimation from '../../animation.json';

const BackgroundCircle = styled(Box)(({ theme, size, top, left, right, bg }) => ({
  width: size,
  height: size,
  position: 'absolute',
  top,
  left,
  right,
  backgroundColor: bg,
  borderRadius: '50%',
  animation: 'move 18s infinite ease-in-out',
  zIndex: 0,
  opacity: 0.2,
}));

const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #E3F2FD, #E1F5FE)',
        px: { xs: 2, md: 6 },
        py: { xs: 8, md: 12 },
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Animated Circles */}
      <BackgroundCircle size="260px" top="5%" left={!isArabic ? '5%' : undefined} right={isArabic ? '5%' : undefined} bg="#00D1B2" />
      <BackgroundCircle size="180px" bottom="5%" left={!isArabic ? '5%' : undefined} right={isArabic ? '5%' : undefined} bg="#FFDD57" />
      <BackgroundCircle size="100px" top="30%" left={!isArabic ? '10%' : undefined} right={isArabic ? '10%' : undefined} bg="#1976D2" />

      {/* Content */}
      <Grid container spacing={6} alignItems="center" justifyContent="center" zIndex={1}>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Typography
              variant="h2"
              fontWeight="bold"
              textAlign={isMobile ? 'center' : isArabic ? 'right' : 'left'}
              gutterBottom
              maxWidth={'620px'}
            >
              {t('hero.title')}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                textAlign: isMobile ? 'center' : isArabic ? 'right' : 'left',
                maxWidth: 600,
                mx: isMobile ? 'auto' : 0,
                lineHeight: 1.7,
                color: 'text.secondary',
              }}
            >
              {t('hero.subtitle')}
            </Typography>
            <Box mt={4} display="flex" justifyContent={isMobile ? 'center' : isArabic ? 'flex-end' : 'flex-start'} gap={2}>
              <Button variant="contained" size="large">
                {t('hero.cta1')}
              </Button>
              <Button variant="outlined" size="large" color="primary">
                {t('hero.cta2')}
              </Button>
            </Box>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Box
              sx={{
                height: 450,
                backgroundColor: '#fff',
                borderRadius: '24px',
                boxShadow: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Lottie animationData={startupAnimation} loop style={{ width: '100%', height: '100%' }} />
            </Box>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HeroSection;
