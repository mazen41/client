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

const Footer = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const theme = useTheme();

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: 'beforeChildren',
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.grey[100],
        py: 6,
        direction: isArabic ? 'rtl' : 'ltr',
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={footerVariants}
        >
          <Grid container spacing={4}>
            {/* About */}
            <Grid item xs={12} md={4}>
              <motion.div variants={itemVariants}>
                <Typography variant="h6" gutterBottom>
                  {t('footer.about.title')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('footer.about.description')}
                </Typography>
              </motion.div>
            </Grid>

            {/* Links */}
            <Grid item xs={6} md={2}>
              <motion.div variants={itemVariants}>
                <Typography variant="h6" gutterBottom>
                  {t('footer.links.title')}
                </Typography>
                <Stack spacing={1}>
                  {['home', 'about', 'services', 'contact'].map((item) => (
                    <Link
                      href={`#${item}`}
                      key={item}
                      color="text.secondary"
                      underline="hover"
                      variant="body2"
                    >
                      {t(`footer.links.${item}`)}
                    </Link>
                  ))}
                </Stack>
              </motion.div>
            </Grid>

            {/* Legal */}
            <Grid item xs={6} md={2}>
              <motion.div variants={itemVariants}>
                <Typography variant="h6" gutterBottom>
                  {t('footer.legal.title')}
                </Typography>
                <Stack spacing={1}>
                  {['terms', 'privacy', 'cookies'].map((item) => (
                    <Link
                      href={`#${item}`}
                      key={item}
                      color="text.secondary"
                      underline="hover"
                      variant="body2"
                    >
                      {t(`footer.legal.${item}`)}
                    </Link>
                  ))}
                </Stack>
              </motion.div>
            </Grid>

            {/* Social */}
            <Grid item xs={12} md={4}>
              <motion.div variants={itemVariants}>
                <Typography variant="h6" gutterBottom>
                  {t('footer.social.title')}
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                  {[
                    { icon: <Facebook />, name: 'facebook' },
                    { icon: <Twitter />, name: 'twitter' },
                    { icon: <LinkedIn />, name: 'linkedin' },
                    { icon: <Instagram />, name: 'instagram' },
                  ].map((social) => (
                    <IconButton
                      key={social.name}
                      component="a"
                      href={`https://${social.name}.com/yourpage`}
                      target="_blank"
                      rel="noopener noreferrer"
                      color="primary"
                      size="small"
                      aria-label={social.name}
                      sx={{ border: '1px solid', borderRadius: '50%' }}
                    >
                      {social.icon}
                    </IconButton>
                  ))}
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  {t('footer.newsletter')}
                </Typography>
              </motion.div>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <motion.div variants={itemVariants}>
            <Typography variant="body2" color="text.secondary" align="center">
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
