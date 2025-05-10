import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemIcon,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/CheckCircleOutline';
import StarIcon from '@mui/icons-material/Star';
import { styled } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const AnimatedCircle = styled(motion.div)({
  position: 'absolute',
  borderRadius: '50%',
  opacity: 0.2,
  zIndex: 1,
});

const OfferCard = styled(Paper)(({ theme, featured }) => ({
  position: 'relative',
  padding: theme.spacing(4),
  borderRadius: 16,
  boxShadow: featured ? theme.shadows[8] : theme.shadows[4],
  border: featured ? `2px solid ${theme.palette.secondary.main}` : 'none',
  transform: featured ? 'scale(1.02)' : 'scale(1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: featured ? 'scale(1.05)' : 'scale(1.03)',
    boxShadow: featured ? theme.shadows[12] : theme.shadows[6]
  },
  zIndex: 2,
  overflow: 'hidden',
  backgroundColor: theme.palette.background.paper,
}));

const OfferBadge = styled('div')(({ theme, featured }) => ({
  position: 'absolute',
  top: 16,
  right: -30,
  backgroundColor: featured ? theme.palette.secondary.main : theme.palette.primary.main,
  color: theme.palette.common.white,
  padding: theme.spacing(0.5, 4),
  transform: 'rotate(45deg)',
  fontSize: 12,
  fontWeight: 'bold',
  width: 120,
  textAlign: 'center',
  boxShadow: theme.shadows[2]
}));

const OffersSection = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const navigate = useNavigate();
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
        t('offers.light.features.3')
      ],
      featured: false,
      color: 'primary'
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
        t('offers.medium.features.4')
      ],
      featured: true,
      color: 'secondary'
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
        t('offers.premium.features.5')
      ],
      featured: false,
      color: 'primary'
    }
  ];

  return (
    <Box 
      sx={{ 
        py: 8,
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'background.default'
      }}
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* Background animated circles */}
      <AnimatedCircle
        animate={{ x: [0, 40, -40, 0], y: [0, 30, -30, 0] }}
        transition={{ repeat: Infinity, duration: 10 }}
        sx={{
          width: 300,
          height: 300,
          backgroundColor: 'primary.main',
          top: 100,
          [isArabic ? 'right' : 'left']: -50,
        }}
      />
      <AnimatedCircle
        animate={{ x: [0, -30, 30, 0], y: [0, -20, 20, 0] }}
        transition={{ repeat: Infinity, duration: 12 }}
        sx={{
          width: 200,
          height: 200,
          backgroundColor: 'secondary.main',
          bottom: 100,
          [isArabic ? 'left' : 'right']: -30,
        }}
      />

      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3 }}>
        <Typography 
          variant="h3" 
          align="center" 
          gutterBottom 
          sx={{ 
            fontWeight: 700,
            color: 'primary.main',
            mb: 1
          }}
        >
          {t('offers.title')}
        </Typography>
        <Typography 
          variant="h6" 
          align="center" 
          sx={{ 
            color: 'text.secondary',
            mb: 6,
            maxWidth: 600,
            mx: 'auto'
          }}
        >
          {t('offers.subtitle')}
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {offers.map((offer, index) => (
            <Grid item xs={12} md={4} key={index}>
              <OfferCard featured={offer.featured}>
                {offer.featured && (
                  <OfferBadge featured={offer.featured}>
                    {t('offers.popular')}
                  </OfferBadge>
                )}
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <StarIcon 
                    color={offer.featured ? 'secondary' : 'disabled'} 
                    sx={{ fontSize: 40, mb: 1 }} 
                  />
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    sx={{ 
                      fontWeight: 700,
                      color: `${offer.color}.main`
                    }}
                  >
                    {offer.title}
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 800, my: 2 }}>
                    {offer.price}
                  </Typography>
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      color: 'text.secondary',
                      mb: 2
                    }}
                  >
                    {offer.period}
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <List>
                  {offer.features.map((feature, i) => (
                    <ListItem key={i} sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckIcon color={offer.color} />
                      </ListItemIcon>
                      <Typography variant="body1">
                        {feature}
                      </Typography>
                    </ListItem>
                  ))}
                </List>

                <Button
                  fullWidth
                  variant={offer.featured ? 'contained' : 'outlined'}
                  color={offer.color}
                  size="large"
                  component={RouterLink}
                  to="/register"
                  sx={{ 
                    mt: 3,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 700
                  }}
                  onClick={() => navigate('/register')}
                >
                  {t('offers.getStarted')}
                </Button>
              </OfferCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default OffersSection;   