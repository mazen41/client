// src/components/HeroSection.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Box, Typography, Button, useMediaQuery } from '@mui/material';
import { useTheme, styled, keyframes } from '@mui/material/styles';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import startupAnimation from '../../animation.json';
import { useNavigate } from 'react-router-dom';
// حركة ناعمة للدوائر الخلفية
const moveAround = keyframes`
  0%, 100% { transform: translateY(0) translateX(0); }
  50% { transform: translateY(15px) translateX(15px); }
`;

const BackgroundCircle = styled(Box)(({ theme, size, top, bottom, left, right, bg }) => ({
  width: size,
  height: size,
  position: 'absolute',
  top,
  bottom,
  left,
  right,
  backgroundColor: bg,
  borderRadius: '50%',
  animation: `${moveAround} 12s ease-in-out infinite alternate`,
  zIndex: 0,
  opacity: 0.2,
  filter: 'blur(30px)',
}));

const glow = keyframes`
  0%, 100% { text-shadow: 0 0 10px rgba(0, 209, 178, 0.7); }
  50% { text-shadow: 0 0 20px rgba(0, 209, 178, 1); }
`;

const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        background: 'radial-gradient(circle at top left, #00D1B2, #1976D2 70%)',
        px: { xs: 2, md: 6 },
        py: { xs: 8, md: 12 },
        display: 'flex',
        alignItems: 'center',
        color: '#fff',
      }}
    >
      {/* دوائر متحركة من الخلفية */}
      <BackgroundCircle size="260px" top="5%" left={!isArabic ? '5%' : undefined} right={isArabic ? '5%' : undefined} bg="#00D1B2" />
      <BackgroundCircle size="180px" bottom="5%" left={!isArabic ? '5%' : undefined} right={isArabic ? '5%' : undefined} bg="#FFDD57" />
      <BackgroundCircle size="100px" top="30%" left={!isArabic ? '10%' : undefined} right={isArabic ? '10%' : undefined} bg="#1976D2" />

      {/* المحتوى */}
      <Grid container spacing={6} alignItems="center" justifyContent="center" zIndex={1}>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Typography
              variant="h2"
              fontWeight="bold"
              textAlign={isMobile ? 'center' : isArabic ? 'right' : 'left'}
              gutterBottom
              maxWidth={'620px'}
              sx={{
                animation: `${glow} 3s ease-in-out infinite`,
                fontWeight: 900,
              }}
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
                color: 'rgba(255,255,255,0.85)',
                fontSize: '1.1rem',
              }}
            >
              {t('hero.subtitle')}
            </Typography>
            <Box mt={4} display="flex" justifyContent={isMobile ? 'center' : isArabic ? 'flex-end' : 'flex-start'} gap={3}>
              <motion.div
                whileHover={{ scale: 1.1, boxShadow: '0 0 15px #00D1B2' }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Button variant="contained" size="large" color="secondary" sx={{ fontWeight: 'bold' }}>
                  {t('hero.cta1')}
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1, boxShadow: '0 0 15px #fff' }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Button variant="outlined" size="large" color="inherit" sx={{ borderColor: '#fff', color: '#fff', fontWeight: 'bold' }} onClick={() => navigate('/contact-us')}>
                  {t('hero.cta2')}
                </Button>
              </motion.div>
            </Box>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.3, type: 'spring', stiffness: 80 }}
          >
            <Box
              sx={{
                height: 450,
                backgroundColor: 'rgba(255,255,255,0.15)',
                borderRadius: '24px',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                style={{ width: '100%', height: '100%' }}
              >
                <Lottie animationData={startupAnimation} loop style={{ width: '100%', height: '100%' }} />
              </motion.div>
            </Box>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HeroSection;
