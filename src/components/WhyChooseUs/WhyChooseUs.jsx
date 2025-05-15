import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Box,
  Typography,
  Grid,
  Paper,
  useTheme,
} from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

const MotionBox = motion(Box);
const MotionPaper = motion(Paper);
const MotionTypography = motion(Typography);

const glitchTextVariants = {
  animate: {
    textShadow: [
      '2px 0 #6e7fff, -2px 0 #a5b3ff',
      '-2px 0 #6e7fff, 2px 0 #a5b3ff',
      '2px 2px #6e7fff, -2px -2px #a5b3ff',
      '-2px -2px #6e7fff, 2px 2px #a5b3ff',
      '2px 0 #6e7fff, -2px 0 #a5b3ff',
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

const cardVariants = {
  offscreen: {
    y: 100,
    rotate: 15,
    opacity: 0,
  },
  onscreen: (i) => ({
    y: 0,
    rotate: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      bounce: 0.3,
      duration: 0.8,
      delay: i * 0.3,
    }
  }),
  hover: {
    y: -10,
    scale: 1.05,
    boxShadow: '0 15px 25px rgba(110, 127, 255, 0.5)',
    backgroundColor: 'rgba(110, 127, 255, 0.1)',
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    }
  }
};

const iconVariants = {
  animate: {
    scale: [1, 1.3, 1],
    rotate: [0, 10, -10, 0],
    transition: {
      duration: 1.6,
      repeat: Infinity,
      repeatType: 'mirror',
      ease: 'easeInOut',
    }
  }
};

const WhyChooseUs = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const theme = useTheme();

  const items = t('why.items', { returnObjects: true });

  return (
    <Box
      sx={{
        py: 8,
        px: 2,
        background: 'linear-gradient(to bottom right, #f8f9fc, #e4eaf4)',
        direction: isArabic ? 'rtl' : 'ltr',
      }}
      id={'why-section'}
    >
      <MotionTypography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        gutterBottom
        variants={glitchTextVariants}
        animate="animate"
        sx={{
          background: 'linear-gradient(45deg, #6e7fff, #a5b3ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: { xs: '2rem', md: '2.5rem' },
          userSelect: 'none',
          mb: 4,
        }}
      >
        {t('why.title')}
      </MotionTypography>

      <Grid container spacing={4} justifyContent="center">
        {items.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <MotionPaper
              elevation={3}
              variants={cardVariants}
              initial="offscreen"
              whileInView="onscreen"
              whileHover="hover"
              viewport={{ once: true, amount: 0.8 }}
              custom={index}
              sx={{
                p: 4,
                textAlign: 'center',
                borderRadius: 3,
                cursor: 'pointer',
              }}
            >
              <MotionBox
                variants={iconVariants}
                animate="animate"
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: 2,
                  backgroundColor: '#6e7fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                  color: '#fff',
                  boxShadow: '0 0 15px rgba(110, 127, 255, 0.7)',
                  mx: 'auto',
                }}
              >
                <CheckCircle sx={{ fontSize: 32 }} />
              </MotionBox>

              <Typography
                variant="subtitle1"
                fontWeight={500}
                sx={{
                  lineHeight: 1.6,
                  fontSize: '1.1rem',
                  transition: 'color 0.3s ease',
                  '&:hover': {
                    color: '#6e7fff',
                  },
                  userSelect: 'none',
                }}
              >
                {item}
              </Typography>
            </MotionPaper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WhyChooseUs;
