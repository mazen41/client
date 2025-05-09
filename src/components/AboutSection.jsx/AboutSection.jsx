import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Box, Typography, Grid, Paper, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { keyframes } from '@emotion/react';
import { AttentionSeeker } from 'react-awesome-reveal';

const StatCard = styled(motion(Paper))(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '24px',
  height: '100%',
  textAlign: 'center',
  background: '#fff',
  border: `1px solid ${theme.palette.divider}`,
  transition: 'transform 0.4s ease, box-shadow 0.4s ease',
  '&:hover': {
    transform: 'translateY(-10px) scale(1.02)',
    boxShadow: theme.shadows[8],
    borderColor: theme.palette.primary.main,
  },
}));

const PaymentIcons = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.spacing(4),
  marginTop: theme.spacing(4),
  img: {
    width: 60,
    height: 'auto',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.1)',
    }
  }
}));

const loopingGlow = keyframes`
  0% {
    text-shadow: 0 0 0px rgba(0, 195, 255, 0.4);
    transform: scale(1);
  }
  50% {
    text-shadow: 0 0 12px rgba(0, 195, 255, 0.8);
    transform: scale(1.02);
  }
  100% {
    text-shadow: 0 0 0px rgba(0, 195, 255, 0.4);
    transform: scale(1);
  }
`;

const AboutSection = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const isMobile = useMediaQuery(useTheme().breakpoints.down('sm'));

  const stats = [
    { value: '100K+', label: t('about.transactions') },
    { value: '99.9%', label: t('about.uptime') },
    { value: '24/7', label: t('about.support') },
    { value: '50+', label: t('about.countries') },
  ];

  return (
    <Box 
      id="about-section" // Added this ID for the navbar scroll detection
      sx={{ 
        px: { xs: 2, md: 6 }, 
        py: { xs: 6, md: 10 }, 
        textAlign: 'center', 
        backgroundColor: '#f9f9f9',
        scrollMarginTop: '100px' // Ensures proper scroll positioning
      }}
    >
      <AttentionSeeker effect="pulse" triggerOnce>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h2"
            sx={{
              mb: 6,
              textAlign: 'center',
              fontWeight: 'bold',
              background: 'linear-gradient(90deg, #007cf0, #00dfd8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: `${loopingGlow} 3s ease-in-out infinite`,
            }}
          >
            {t('about.title')}
          </Typography>
        </motion.div>
      </AttentionSeeker>

      <Grid container spacing={4} justifyContent="center">
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard
              elevation={0}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Typography
                variant="h3"
                color="primary"
                sx={{ fontWeight: 'bold', mb: 1 }}
              >
                {stat.value}
              </Typography>
              <Typography color="text.secondary" fontSize="1rem">
                {stat.label}
              </Typography>
            </StatCard>
          </Grid>
        ))}
      </Grid>

      <PaymentIcons>
        <img src="./icons/applepay.png" alt="Apple Pay" />
        <img src="./icons/visa.png" alt="Visa" />
        <img src="./icons/mastercard.png" alt="MasterCard" />
        <img src="./icons/stc.png" alt="STC Pay" />
      </PaymentIcons>
    </Box>
  );
};

export default AboutSection;