import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Container, Grid, Typography, Link, Divider, IconButton } from '@mui/material';
import { Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material';
import { motion } from 'framer-motion';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Box 
      component="footer"
      sx={{
        py: 6,
        backgroundColor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        direction: isArabic ? 'rtl' : 'ltr'
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
            <Grid item xs={12} md={4}>
              <motion.div variants={itemVariants}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                  {t('footer.about.title')}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {t('footer.about.description')}
                </Typography>
              </motion.div>
            </Grid>

            <Grid item xs={6} md={2}>
              <motion.div variants={itemVariants}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                  {t('footer.links.title')}
                </Typography>
                <Box component="ul" sx={{ listStyle: 'none', p: 0 }}>
                  {['home', 'about', 'services', 'contact'].map((item) => (
                    <li key={item}>
                      <Link href={`#${item}`} color="text.secondary" underline="hover">
                        {t(`footer.links.${item}`)}
                      </Link>
                    </li>
                  ))}
                </Box>
              </motion.div>
            </Grid>

            <Grid item xs={6} md={2}>
              <motion.div variants={itemVariants}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                  {t('footer.legal.title')}
                </Typography>
                <Box component="ul" sx={{ listStyle: 'none', p: 0 }}>
                  {['terms', 'privacy', 'cookies'].map((item) => (
                    <li key={item}>
                      <Link href={`#${item}`} color="text.secondary" underline="hover">
                        {t(`footer.legal.${item}`)}
                      </Link>
                    </li>
                  ))}
                </Box>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={4}>
              <motion.div variants={itemVariants}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                  {t('footer.social.title')}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  {[
                    { icon: <Facebook />, name: 'facebook' },
                    { icon: <Twitter />, name: 'twitter' },
                    { icon: <LinkedIn />, name: 'linkedin' },
                    { icon: <Instagram />, name: 'instagram' }
                  ].map((social) => (
                    <IconButton 
                      key={social.name}
                      color="primary"
                      aria-label={social.name}
                      component="a"
                      href={`https://${social.name}.com/yourpage`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {social.icon}
                    </IconButton>
                  ))}
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {t('footer.newsletter')}
                </Typography>
              </motion.div>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <motion.div variants={itemVariants}>
            <Typography variant="body2" color="text.secondary" align="center">
              {t('footer.copyright', { year: new Date().getFullYear() })}
            </Typography>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Footer;