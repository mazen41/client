import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { motion, useAnimation } from 'framer-motion';

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

// تأثير glitch بسيط
const glitchVariants = {
  animate: {
    textShadow: [
      '2px 0 red, -2px 0 cyan',
      '-2px 0 red, 2px 0 cyan',
      '2px 2px red, -2px -2px cyan',
      '-2px -2px red, 2px 2px cyan',
      '2px 0 red, -2px 0 cyan',
      'none'
    ],
    transition: {
      repeat: Infinity,
      repeatType: 'loop',
      duration: 1,
      ease: 'easeInOut',
    }
  }
};

// تأثير الطيران مع دوران واهتزاز
const cardVariants = {
  offscreen: {
    y: 300,
    rotate: 45,
    opacity: 0,
  },
  onscreen: (i) => ({
    y: 0,
    rotate: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 1,
      delay: i * 0.3,
    }
  }),
  hover: {
    scale: 1.1,
    rotate: [0, 5, -5, 5, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      repeatType: 'mirror',
      ease: 'easeInOut',
    }
  }
};

const OffersSection = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const offers = [
    {
      name: 'light',
      title: t('offers.light.title'),
      price: t('offers.light.price'),
      period: t('offers.light.period'),
      features: [
        t('offers.light.features.0'),
        t('offers.light.features.1'),
        t('offers.light.features.2'),
        t('offers.light.features.3'),
      ],
      featured: false,
      color: 'primary',
    },
    {
      name: 'medium',
      title: t('offers.medium.title'),
      price: t('offers.medium.price'),
      period: t('offers.medium.period'),
      features: [
        t('offers.medium.features.0'),
        t('offers.medium.features.1'),
        t('offers.medium.features.2'),
        t('offers.medium.features.3'),
        t('offers.medium.features.4'),
      ],
      featured: true,
      color: 'secondary',
    },
    {
      name: 'premium',
      title: t('offers.premium.title'),
      price: t('offers.premium.price'),
      period: t('offers.premium.period'),
      features: [
        t('offers.premium.features.0'),
        t('offers.premium.features.1'),
        t('offers.premium.features.2'),
        t('offers.premium.features.3'),
        t('offers.premium.features.4'),
        t('offers.premium.features.5'),
      ],
      featured: false,
      color: 'primary',
    },
  ];

  return (
    <Box
      sx={{
        py: 8,
        px: 2,
        background: 'linear-gradient(to bottom right, #f5f7fa, #e4ecf5)',
        direction: isArabic ? 'rtl' : 'ltr',
      }}
    >
      <Box textAlign="center" mb={6}>
        <MotionTypography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          variants={glitchVariants}
          animate="animate"
          sx={{ userSelect: 'none' }}
        >
          {t('offersTitle')}
        </MotionTypography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {offers.map((offer, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <MotionBox
              component={Paper}
              elevation={offer.featured ? 8 : 3}
              custom={index}
              initial="offscreen"
              whileInView="onscreen"
              whileHover="hover"
              viewport={{ once: true, amount: 0.8 }}
              variants={cardVariants}
              sx={{
                p: 4,
                borderRadius: 3,
                position: 'relative',
                bgcolor: offer.featured ? 'background.paper' : 'white',
                height: '100%',
                cursor: 'pointer',
              }}
            >
              {offer.featured && (
                <Chip
                  label={t('offers.popular')}
                  color={offer.color}
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    fontWeight: 'bold',
                  }}
                />
              )}

              <Box textAlign="center" mb={2}>
                <Typography variant="h6" color={offer.featured ? 'secondary.main' : 'primary.main'} fontWeight="bold">
                  {offer.title}
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  {offer.price}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  {offer.period}
                </Typography>
              </Box>

              <List dense>
                {offer.features.map((feature, i) => (
                  <ListItem key={i}>
                    <ListItemIcon>
                      <CheckCircle color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={feature} />
                  </ListItem>
                ))}
              </List>

              <Box mt={3}>
                <Button
                  fullWidth
                  variant="contained"
                  color={offer.color}
                  component={RouterLink}
                  to="/register"
                >
                  {t('offers.getStarted')}
                </Button>
              </Box>
            </MotionBox>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OffersSection;
