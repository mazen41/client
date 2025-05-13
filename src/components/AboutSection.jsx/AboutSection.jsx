// src/components/AboutSection.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, Grid, Paper, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { keyframes } from '@emotion/react';
import { motion } from 'framer-motion';
import { AttentionSeeker } from 'react-awesome-reveal';

// Glowing animation
const loopingGlow = keyframes`
  0% { text-shadow: 0 0 0px rgba(0, 195, 255, 0.4); transform: scale(1); }
  50% { text-shadow: 0 0 12px rgba(0, 195, 255, 0.8); transform: scale(1.02); }
  100% { text-shadow: 0 0 0px rgba(0, 195, 255, 0.4); transform: scale(1); }
`;

// Stat card
const StatCard = styled(motion(Paper))(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 20,
  textAlign: 'center',
  backgroundColor: theme.palette.background.paper,
  transition: '0.3s',
  '&:hover': {
    boxShadow: theme.shadows[6],
    transform: 'translateY(-5px)',
  },
}));

// Payment logos
const PaymentIcons = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(6),
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(4),
  img: {
    width: 60,
    height: 'auto',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
}));

const AboutSection = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const stats = [
    { value: '100K+', label: t('about.transactions') },
    { value: '99.9%', label: t('about.uptime') },
    { value: '24/7', label: t('about.support') },
    { value: '50+', label: t('about.countries') },
  ];

  return (
    <Box
      id="about-section"
      sx={{
        backgroundColor: '#F4FAFD',
        py: { xs: 6, md: 10 },
        px: { xs: 2, md: 8 },
        textAlign: 'center',
      }}
    >
      <AttentionSeeker effect="pulse" triggerOnce>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 'bold',
              background: 'linear-gradient(90deg, #1976D2, #00BCD4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: `${loopingGlow} 3s ease-in-out infinite`,
              mb: 6,
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
              <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>
                {stat.value}
              </Typography>
              <Typography color="text.secondary">{stat.label}</Typography>
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
