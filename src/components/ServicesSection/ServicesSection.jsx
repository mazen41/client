import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Grid,
  Typography,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  Box,
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { motion } from 'framer-motion';

const MotionCard = motion(Card);

const ServicesSection = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const services = [
    {
      icon: <CreditCardIcon fontSize="large" color="primary" />,
      title: t('services.items.0.title'),
      description:
        t('services.items.0.description') +
        ' Our seamless payment solutions guarantee top-tier security and real-time processing.',
    },
    {
      icon: <CreditCardIcon fontSize="large" color="primary" />,
      title: t('services.items.1.title'),
      description:
        t('services.items.1.description') +
        ' Link your platform with industry-leading gateways with a single click.',
    },
    {
      icon: <CreditCardIcon fontSize="large" color="primary" />,
      title: t('services.items.2.title'),
      description:
        t('services.items.2.description') +
        ' Accept all major cards and alternative payment methods easily.',
    },
    {
      icon: <CreditCardIcon fontSize="large" color="primary" />,
      title: t('services.items.3.title'),
      description:
        t('services.items.3.description') +
        ' Get visual dashboards and deep insights for every transaction.',
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: '#f5f7fa',
        py: 8,
        direction: isArabic ? 'rtl' : 'ltr',
      }}
    >
      <Box textAlign="center" mb={6}>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              background: 'linear-gradient(90deg, #0062E6, #33AEFF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {t('services.title')}
          </Typography>
        </motion.div>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {services.map((service, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={index}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <MotionCard
              elevation={3}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              sx={{
                width: '100%',
                maxWidth: 300,
                textAlign: 'center',
                p: 2,
              }}
            >
              <CardContent>
                <Box mb={2}>{service.icon}</Box>
                <Typography variant="h6" gutterBottom>
                  {service.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ fontSize: isMobile ? '0.9rem' : '1rem' }}
                >
                  {service.description}
                </Typography>
              </CardContent>
            </MotionCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ServicesSection;
