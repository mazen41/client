import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Box, Typography, Grid, Paper, useMediaQuery } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { styled } from '@mui/material/styles';

const FeatureCard = styled(motion(Paper))(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '16px',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: theme.palette.background.default,
  border: `1px solid ${theme.palette.divider}`,
  transition: 'transform 0.3s, box-shadow 0.3s, border 0.3s',
  '&:hover': {
    transform: 'translateY(-6px) scale(1.05)',
    boxShadow: theme.shadows[8],
    borderColor: theme.palette.primary.main,
  },
}));

const IconWrapper = styled(motion.div)(({ theme }) => ({
  width: '60px',
  height: '60px',
  minWidth: '60px',
  borderRadius: '12px',
  backgroundColor: theme.palette.primary.light,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: theme.spacing(2),
  color: theme.palette.primary.main,
  boxShadow: `0 0 10px ${theme.palette.primary.light}`,
  animation: 'bounce 1s infinite alternate',
  '@keyframes bounce': {
    '0%': {
      transform: 'translateY(0)',
    },
    '100%': {
      transform: 'translateY(-10px)',
    },
  },
}));

const WhyChooseUs = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: 'background.paper' }}>
      <Box sx={{ maxWidth: '1280px', mx: 'auto', px: { xs: 2, md: 4 } }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h2"
            component="h2"
            sx={{
              mb: 8,
              textAlign: 'center',
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #6e7fff, #a5b3ff)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontSize: '2.5rem',
            }}
          >
            {t('why.title')}
          </Typography>
        </motion.div>

        <Grid container direction="column" spacing={4}>
          {t('why.items', { returnObjects: true }).map((item, index) => (
            <Grid item key={index}>
              <FeatureCard
                elevation={3}
                initial={{ opacity: 0, x: isArabic ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <IconWrapper
                  animate={{
                    scale: [1, 1.15, 1],
                    rotate: [0, 6, -6, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: 'mirror',
                    delay: index * 0.2,
                  }}
                  style={{
                    marginLeft: isArabic ? '16px' : 0,
                    marginRight: isArabic ? 0 : '16px',
                  }}
                >
                  <CheckCircleIcon fontSize="medium" />
                </IconWrapper>
                <Typography
                  variant="h6"
                  component="p"
                  sx={{
                    fontWeight: 500,
                    lineHeight: 1.6,
                    fontSize: '1.1rem',
                    transition: 'color 0.3s ease',
                    '&:hover': {
                      color: 'primary.main',
                    },
                    mt: 2,
                  }}
                >
                  {item}
                </Typography>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default WhyChooseUs;
