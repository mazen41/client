import React, { useState, useEffect } from 'react';
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
import { motion } from 'framer-motion';

const StyledAppBar = styled(AppBar)(({ theme, scrolled }) => ({
  backgroundColor: scrolled ? theme.palette.background.paper : 'transparent',
  boxShadow: scrolled ? theme.shadows[4] : 'none',
  transition: 'all 0.5s ease',
  backdropFilter: scrolled ? 'blur(10px)' : 'none',
  borderBottom: scrolled ? `1px solid ${theme.palette.divider}` : 'none',
  padding: scrolled ? theme.spacing(1, 0) : theme.spacing(2, 0),
}));

const NavButton = styled(Button)(({ theme, active }) => ({
  color: active ? theme.palette.primary.main : theme.palette.text.primary,
  fontWeight: active ? 600 : 400,
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: 4,
    left: 0,
    width: active ? '100%' : 0,
    height: 2,
    backgroundColor: theme.palette.primary.main,
    transition: 'width 0.3s ease',
  },
  '&:hover:after': {
    width: '100%',
  },
  '&:hover': {
    backgroundColor: 'transparent',
  },
}));

const LanguageButton = styled(IconButton)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  marginLeft: theme.spacing(1),
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    transform: 'rotate(15deg)',
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
    { key: 'dashboard', path: '/dashboard' },
  ];

  return (
    <StyledAppBar position="fixed" scrolled={scrolled ? 1 : 0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo with animation */}
          <Box 
            component={motion.div}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            sx={{ flexGrow: 1 }}
          >
            <RouterLink to="/">
              <img 
                src="./new-logo.png" 
                alt="NadaPay Logo"
                style={{
                  width: '120px',
                  height: '40px',
                  objectFit: 'contain',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)'
                  }
                }}
              />
            </RouterLink>
          </Box>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {navItems.map((item) => (
              <NavButton
                key={item.key}
                component={RouterLink}
                to={item.path}
                active={location.pathname === item.path ? 1 : 0}
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
              gap: 1,
              ml: 3
            }}
          >
            <Button
              component={RouterLink}
              to="/login"
              variant="outlined"
              startIcon={<Login />}
              sx={{
                borderRadius: '20px',
                textTransform: 'none',
                px: 3,
                py: 1,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)'
                }
              }}
            >
              {t('navbar.login')}
            </Button>
            <Button
              component={RouterLink}
              to="/register"
              variant="contained"
              startIcon={<PersonAdd />}
              sx={{
                borderRadius: '20px',
                textTransform: 'none',
                px: 3,
                py: 1,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 3
                }
              }}
            >
              {t('navbar.register')}
            </Button>
            <LanguageButton
              aria-label="change language"
              onClick={handleMenuOpen}
              size="small"
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
            {mobileOpen ? (
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <Close />
              </motion.div>
            ) : (
              <MenuIcon />
            )}
          </IconButton>
        </Toolbar>

        {/* Mobile Menu */}
        <Slide direction="down" in={mobileOpen} mountOnEnter unmountOnExit>
          <Box sx={{ 
            display: { xs: 'flex', md: 'none' }, 
            flexDirection: 'column',
            py: 2,
            gap: 1,
            backgroundColor: 'background.paper',
            borderRadius: 2,
            boxShadow: 3,
            mt: 1
          }}>
            {navItems.map((item) => (
              <NavButton
                key={item.key}
                component={RouterLink}
                to={item.path}
                active={location.pathname === item.path ? 1 : 0}
                fullWidth
                sx={{ 
                  justifyContent: 'flex-start',
                  px: 3,
                  py: 1.5
                }}
                onClick={() => setMobileOpen(false)}
              >
                {t(`navbar.${item.key}`)}
              </NavButton>
            ))}
            <Box sx={{ 
              display: 'flex', 
              gap: 1, 
              px: 2, 
              pt: 1,
              borderTop: '1px solid',
              borderColor: 'divider'
            }}>
              <Button
                component={RouterLink}
                to="/login"
                variant="outlined"
                startIcon={<Login />}
                fullWidth
                sx={{ borderRadius: '20px' }}
                onClick={() => setMobileOpen(false)}
              >
                {t('navbar.login')}
              </Button>
              <Button
                component={RouterLink}
                to="/register"
                variant="contained"
                startIcon={<PersonAdd />}
                fullWidth
                sx={{ borderRadius: '20px' }}
                onClick={() => setMobileOpen(false)}
              >
                {t('navbar.register')}
              </Button>
            </Box>
          </Box>
        </Slide>

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
              }
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
              }
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