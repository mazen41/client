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
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
          sx={{
            background: 'linear-gradient(45deg, #6e7fff, #a5b3ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: { xs: '2rem', md: '2.5rem' },
          }}
        >
          {t('why.title')}
        </Typography>
      </motion.div>

      <Grid container spacing={4} justifyContent="center" mt={4}>
        {items.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                textAlign: 'center',
                borderRadius: 3,
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-6px) scale(1.03)',
                  boxShadow: theme.shadows[6],
                },
              }}
            >
              <MotionBox
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
                  boxShadow: '0 0 10px rgba(110, 127, 255, 0.6)',
                  mx: 'auto',
                }}
              >
                <CheckCircle sx={{ fontSize: 30 }} />
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
                }}
              >
                {item}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WhyChooseUs;
