import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Fade,
  Slide,
  useScrollTrigger,
  styled
} from '@mui/material';
import {
  Language,
  Login,
  PersonAdd,
  Menu as MenuIcon,
  Close
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const StyledAppBar = styled(AppBar)(({ theme, scrolled }) => ({
  backgroundColor: scrolled ? theme.palette.background.paper : 'transparent',
  boxShadow: scrolled ? theme.shadows[8] : 'none',
  transition: 'all 0.5s ease',
  backdropFilter: scrolled ? 'blur(12px)' : 'none',
  borderBottom: scrolled ? `1px solid ${theme.palette.divider}` : 'none',
  padding: scrolled ? theme.spacing(1, 0) : theme.spacing(2, 0),
  zIndex: theme.zIndex.appBar + 1,
}));

const NavButton = styled(motion(Button))(({ theme, active }) => ({
  color: active ? theme.palette.primary.main : theme.palette.text.primary,
  fontWeight: active ? 700 : 500,
  position: 'relative',
  textTransform: 'none',
  fontSize: '1rem',
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: 4,
    left: 0,
    width: active ? '100%' : 0,
    height: 3,
    backgroundColor: theme.palette.primary.main,
    borderRadius: 2,
    transition: 'width 0.3s ease',
  },
  '&:hover:after': {
    width: '100%',
  },
  '&:hover': {
    backgroundColor: 'transparent',
  },
}));

const LanguageButton = styled(motion(IconButton))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  marginLeft: theme.spacing(1),
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    transform: 'rotate(20deg)',
  },
}));

const AuthButton = styled(motion(Button))(({ theme }) => ({
  borderRadius: '20px',
  textTransform: 'none',
  px: 3,
  py: 1,
  fontWeight: 600,
  fontSize: '0.9rem',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: theme.shadows[6],
  },
}));

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const isArabic = i18n.language === 'ar';
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const scrolled = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.body.dir = lng === 'ar' ? 'rtl' : 'ltr';
    setAnchorEl(null);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navItems = [
    { key: 'home', path: '/' },
    { key: 'about', path: '/about' },
    { key: 'services', path: '/services' },
    { key: 'why', path: '/why' },
  ];

  return (
    <StyledAppBar position="fixed" scrolled={scrolled ? 1 : 0} elevation={scrolled ? 8 : 0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {/* Logo with stronger animation */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, x: -40, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            sx={{ flexGrow: 1, cursor: 'pointer' }}
          >
            <RouterLink to="/">
              <motion.img
                src="./new-logo.png"
                alt="NadaPay Logo"
                whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
                transition={{ duration: 0.6 }}
                style={{ width: '120px', height: '40px', objectFit: 'contain' }}
              />
            </RouterLink>
          </Box>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
            {navItems.map((item, i) => (
              <NavButton
                key={item.key}
                component={RouterLink}
                to={item.path}
                active={location.pathname === item.path ? 1 : 0}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.4, ease: 'easeOut' }}
                whileHover={{ scale: 1.1 }}
              >
                {t(`navbar.${item.key}`)}
              </NavButton>
            ))}
          </Box>

          {/* Auth Buttons */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              gap: 2,
              ml: 3,
            }}
          >
            <AuthButton
              component={RouterLink}
              to="/login"
              variant="outlined"
              startIcon={<Login />}
              whileHover={{ y: -3, boxShadow: '0px 8px 15px rgba(0,0,0,0.2)' }}
            >
              {t('navbar.login')}
            </AuthButton>
            <AuthButton
              component={RouterLink}
              to="/register"
              variant="contained"
              startIcon={<PersonAdd />}
              whileHover={{ y: -3, boxShadow: '0px 8px 20px rgba(25,118,210,0.5)' }}
            >
              {t('navbar.register')}
            </AuthButton>

            <LanguageButton
              aria-label="change language"
              onClick={handleMenuOpen}
              size="small"
              whileHover={{ rotate: 25 }}
              whileTap={{ rotate: 0 }}
            >
              <Language />
            </LanguageButton>
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            size="large"
            aria-label="menu"
            onClick={() => setMobileOpen(!mobileOpen)}
            sx={{ display: { md: 'none' }, ml: 2 }}
          >
            <motion.div
              key={mobileOpen ? 'close' : 'menu'}
              initial={{ rotate: 0, opacity: 0 }}
              animate={{ rotate: mobileOpen ? 180 : 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {mobileOpen ? <Close /> : <MenuIcon />}
            </motion.div>
          </IconButton>
        </Toolbar>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <Box
                sx={{
                  display: { xs: 'flex', md: 'none' },
                  flexDirection: 'column',
                  py: 2,
                  gap: 1,
                  backgroundColor: 'background.paper',
                  borderRadius: 2,
                  boxShadow: 3,
                  mt: 1,
                }}
              >
                {navItems.map((item) => (
                  <NavButton
                    key={item.key}
                    component={RouterLink}
                    to={item.path}
                    active={location.pathname === item.path ? 1 : 0}
                    fullWidth
                    sx={{ justifyContent: 'flex-start', px: 3, py: 1.5 }}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {t(`navbar.${item.key}`)}
                  </NavButton>
                ))}

                <Box
                  sx={{
                    display: 'flex',
                    gap: 1,
                    px: 2,
                    pt: 1,
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <AuthButton
                    component={RouterLink}
                    to="/login"
                    variant="outlined"
                    startIcon={<Login />}
                    sx={{ flex: '1 1 auto', minWidth: '120px' }}
                    onClick={() => setMobileOpen(false)}
                    whileHover={{ y: -3, boxShadow: '0px 8px 15px rgba(0,0,0,0.2)' }}
                  >
                    {t('navbar.login')}
                  </AuthButton>
                  <AuthButton
                    component={RouterLink}
                    to="/register"
                    variant="contained"
                    startIcon={<PersonAdd />}
                    sx={{ flex: '1 1 auto', minWidth: '120px' }}
                    onClick={() => setMobileOpen(false)}
                    whileHover={{ y: -3, boxShadow: '0px 8px 20px rgba(25,118,210,0.5)' }}
                  >
                    {t('navbar.register')}
                  </AuthButton>

                  <LanguageButton
                    aria-label="change language"
                    onClick={handleMenuOpen}
                    size="small"
                    sx={{ ml: 0, mt: 1 }}
                    whileHover={{ rotate: 25 }}
                    whileTap={{ rotate: 0 }}
                  >
                    <Language />
                  </LanguageButton>
                </Box>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Language Menu */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          TransitionComponent={Fade}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem
            onClick={() => changeLanguage('en')}
            selected={!isArabic}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'primary.light',
              },
              fontWeight: 'bold',
            }}
          >
            English
          </MenuItem>
          <MenuItem
            onClick={() => changeLanguage('ar')}
            selected={isArabic}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'primary.light',
              },
              fontWeight: 'bold',
            }}
          >
            العربية
          </MenuItem>
        </Menu>
      </Container>
    </StyledAppBar>
  );
};

export default Navbar;
