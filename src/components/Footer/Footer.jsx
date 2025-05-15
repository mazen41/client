import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
  Stack,
  useTheme,
} from '@mui/material';
import { Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material';

const MotionBox = motion(Box);

const Footer = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const theme = useTheme();

  const footerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        when: 'beforeChildren',
        staggerChildren: 0.25,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  const socialIcons = [
    { icon: <Facebook />, name: 'facebook', color: '#1877F2' },
    { icon: <Twitter />, name: 'twitter', color: '#1DA1F2' },
    { icon: <LinkedIn />, name: 'linkedin', color: '#0077B5' },
    { icon: <Instagram />, name: 'instagram', color: '#E4405F' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(135deg, #f0f4ff 0%, #d9e2ff 100%)',
        py: 8,
        direction: isArabic ? 'rtl' : 'ltr',
        borderTop: `4px solid ${theme.palette.primary.main}`,
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={footerVariants}
        >
          <Grid container spacing={5}>
            {/* About */}
            <Grid item xs={12} md={4}>
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontWeight: 'bold', mb: 2, color: theme.palette.primary.main }}
                >
                  {t('footer.about.title')}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {t('footer.about.description')}
                </Typography>
              </motion.div>
            </Grid>

            {/* Links */}
            <Grid item xs={6} md={2}>
              <motion.div variants={itemVariants}>
                <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                  {t('footer.links.title')}
                </Typography>
                <Stack spacing={1}>
                  {['home', 'about', 'services', 'contact'].map((item) => (
                    <MotionBox
                      key={item}
                      whileHover={{ x: 5, color: theme.palette.primary.main }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Link
                        href={`#${item}`}
                        color="text.secondary"
                        underline="hover"
                        variant="body2"
                      >
                        {t(`footer.links.${item}`)}
                      </Link>
                    </MotionBox>
                  ))}
                </Stack>
              </motion.div>
            </Grid>

            {/* Legal */}
            <Grid item xs={6} md={2}>
              <motion.div variants={itemVariants}>
                <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                  {t('footer.legal.title')}
                </Typography>
                <Stack spacing={1}>
                  {['terms', 'privacy', 'cookies'].map((item) => (
                    <MotionBox
                      key={item}
                      whileHover={{ x: 5, color: theme.palette.primary.main }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Link
                        href={`#${item}`}
                        color="text.secondary"
                        underline="hover"
                        variant="body2"
                      >
                        {t(`footer.legal.${item}`)}
                      </Link>
                    </MotionBox>
                  ))}
                </Stack>
              </motion.div>
            </Grid>

            {/* Social */}
            <Grid item xs={12} md={4}>
              <motion.div variants={itemVariants}>
                <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                  {t('footer.social.title')}
                </Typography>
                <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                  {socialIcons.map(({ icon, name, color }) => (
                    <MotionBox
                      key={name}
                      whileHover={{ scale: 1.3, boxShadow: `0 0 12px ${color}` }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <IconButton
                        component="a"
                        href={`https://${name}.com/yourpage`}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          borderRadius: '50%',
                          border: `2px solid ${color}`,
                          color,
                          backgroundColor: 'white',
                          '&:hover': {
                            backgroundColor: color,
                            color: 'white',
                          },
                        }}
                        aria-label={name}
                      >
                        {icon}
                      </IconButton>
                    </MotionBox>
                  ))}
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  {t('footer.newsletter')}
                </Typography>
              </motion.div>
            </Grid>
          </Grid>

          <Divider sx={{ my: 5 }} />

          <motion.div variants={itemVariants}>
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ fontStyle: 'italic' }}
            >
              {t('footer.copyright', {
                year: new Date().getFullYear(),
              })}
            </Typography>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Footer;
