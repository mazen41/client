import React from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { useTheme, styled, keyframes } from '@mui/material/styles';
import { motion } from 'framer-motion';

// حركة توهج العنوان (looping glow)
const loopingGlow = keyframes`
  0% { text-shadow: 0 0 0px rgba(0, 195, 255, 0.4); transform: scale(1); }
  50% { text-shadow: 0 0 12px rgba(0, 195, 255, 0.8); transform: scale(1.02); }
  100% { text-shadow: 0 0 0px rgba(0, 195, 255, 0.4); transform: scale(1); }
`;

// الحاوية لآيقونات الدفع
const PaymentIcons = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(6),
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(4),
  img: {
    width: 60,
    height: 'auto',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
}));

const AboutSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // كلمة الكلمة لتطبيق الحركة على كل كلمة على حدة
  const titleWords = "About MeedaPay".split('');

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
      <Typography
        variant={isMobile ? 'h4' : 'h3'}
        component="h2"
        sx={{
          fontWeight: 'bold',
          mb: 4,
          display: 'inline-flex',
          justifyContent: 'center',
          background: 'linear-gradient(90deg, #1976D2, #00BCD4)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: `${loopingGlow} 3s ease-in-out infinite`,
          gap: 1,
        }}
      >
        {titleWords.map((word, index) => (
          <motion.span
            key={index}
            style={{ display: 'inline-block' }}
            initial={{ y: -30, opacity: 0 }}
            animate={{
              y: [0, -20, 0],
              opacity: 1,
            }}
            transition={{
              repeat: Infinity,
              repeatType: 'reverse',
              duration: 2,
              delay: index * 0.4,
              ease: 'easeInOut',
            }}
          >
            {word}
          </motion.span>
        ))}
      </Typography>

      <Typography
        variant={isMobile ? 'body1' : 'h6'}
        color="text.secondary"
        maxWidth={700}
        mx="auto"
        sx={{ lineHeight: 1.6, mb: 6 }}
      >
        MeedaPay is your reliable payment partner, providing fast and secure payment solutions.
      </Typography>

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
