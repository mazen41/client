import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Box, Typography, Grid, Card, CardContent, useMediaQuery } from '@mui/material';
import {
  Payments as PaymentsIcon,
  Link as LinkIcon,
  CreditCard as CreditCardIcon,
  Analytics as AnalyticsIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const ServiceCard = styled(motion(Card))(({ theme }) => ({
  height: '100%',
  borderRadius: '20px',
  textAlign: 'center',
  transition: 'transform 0.4s, box-shadow 0.4s, border 0.4s',
  border: `1px solid ${theme.palette.divider}`,
  background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
  '&:hover': {
    transform: 'translateY(-10px) scale(1.03)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
    border: `1px solid ${theme.palette.primary.main}`,
  },
}));

const IconContainer = styled(motion.div)(({ theme }) => ({
  width: '80px',
  height: '80px',
  borderRadius: '20px',
  backgroundColor: theme.palette.primary.light,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.main,
  boxShadow: `0 0 20px ${theme.palette.primary.light}`,
  animation: 'pulse 2s infinite',
  '@keyframes pulse': {
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.1)' },
    '100%': { transform: 'scale(1)' },
  },
}));

const ServicesSection = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const services = [
    {
      title: t('services.items.0.title'),
      description: t('services.items.0.description') +
        ' Our seamless payment solutions guarantee top-tier security and real-time processing.',
    },
    {
      title: t('services.items.1.title'),
      description: t('services.items.1.description') +
        ' Link your platform with industry-leading gateways with a single click.',
    },
    {
      title: t('services.items.2.title'),
      description: t('services.items.2.description') +
        ' Accept all major cards and alternative payment methods easily.',
    },
    {
      title: t('services.items.3.title'),
      description: t('services.items.3.description') +
        ' Get visual dashboards and deep insights for every transaction.',
    },
  ];

  const icons = [PaymentsIcon, LinkIcon, CreditCardIcon, AnalyticsIcon];

  return (
    <Box sx={{ py: { xs: 10, md: 14 }, px: { xs: 2, md: 6 }, backgroundColor: '#fafafa' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, type: 'spring' }}
      >
        <Typography
          variant="h2"
          component="h2"
          sx={{
            mb: 10,
            textAlign: 'center',
            background: 'linear-gradient(90deg, #0062E6, #33AEFF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 800,
          }}
        >
          {t('services.title')}
        </Typography>
      </motion.div>

      <Grid container spacing={6} justifyContent="center">
        {services.map((service, index) => {
          const Icon = icons[index];
          return (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <ServiceCard
                elevation={4}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
              >
                <CardContent sx={{ p: 5 }}>
                  <IconContainer
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.2 }}
                  >
                    <Icon fontSize="large" />
                  </IconContainer>
                  <Typography
                    variant="h5"
                    component="h3"
                    gutterBottom
                    sx={{ fontWeight: 700 }}
                  >
                    {service.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ lineHeight: 1.7 }}
                  >
                    {service.description}
                  </Typography>
                </CardContent>
              </ServiceCard>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ServicesSection;
