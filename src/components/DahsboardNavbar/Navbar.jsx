import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Typography,
  Divider,
  ListItemIcon,
  ListItemText,
  styled,
  useTheme
} from '@mui/material';
import {
  Add,
  Language,
  Logout,
  Settings,
  AccountCircle
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const NavbarContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
//   margin: theme.spacing(2),
  padding: theme.spacing(2),
  height: '65px',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  zIndex: "1400",
}));

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const [createAnchorEl, setCreateAnchorEl] = useState(null);
  const [languageAnchorEl, setLanguageAnchorEl] = useState(null);
  const [userAnchorEl, setUserAnchorEl] = useState(null);
 const navigate = useNavigate()
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    setLanguageAnchorEl(null);
  };

  const handleCreateMenuOpen = (event) => setCreateAnchorEl(event.currentTarget);
  const handleLanguageMenuOpen = (event) => setLanguageAnchorEl(event.currentTarget);
  const handleUserMenuOpen = (event) => setUserAnchorEl(event.currentTarget);
  const handleMenuClose = () => {
    setCreateAnchorEl(null);
    setLanguageAnchorEl(null);
    setUserAnchorEl(null);
  };

  return (
    <NavbarContainer>
      {/* Logo */}
      <Box>
        <img src="/new-logo.png" alt="Logo" width={115} onClick={() => navigate('/dashboard')} style={{cursor: "pointer"}}/>
      </Box>

      {/* Right Side Actions */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {/* Create Menu */}
        <IconButton onClick={handleCreateMenuOpen} sx={{ mx: 1 }}>
          <Add />
          <Typography variant="body2" sx={{ ml: 1 }}>
            {t('navbar.create')}
          </Typography>
        </IconButton>
        <Menu
          anchorEl={createAnchorEl}
          open={Boolean(createAnchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>{t('navbar.createInvoice')}</MenuItem>
          <MenuItem onClick={handleMenuClose}>{t('navbar.quickInvoice')}</MenuItem>
          <MenuItem onClick={handleMenuClose}>{t('navbar.batchInvoice')}</MenuItem>
          <MenuItem onClick={handleMenuClose}>{t('navbar.paymentLink')}</MenuItem>
        </Menu>

        {/* Language Menu */}
        <IconButton onClick={handleLanguageMenuOpen} sx={{ mx: 1 }}>
          <Language />
          <Typography variant="body2" sx={{ ml: 1 }}>
            {i18n.language === 'en' ? 'English' : 'العربية'}
          </Typography>
        </IconButton>
        <Menu
          anchorEl={languageAnchorEl}
          open={Boolean(languageAnchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem
            onClick={() => {
              i18n.changeLanguage('en');
              document.documentElement.dir = 'ltr';
              handleMenuClose();
            }}
            selected={i18n.language === 'en'}
          >
            English
          </MenuItem>
          <MenuItem
            onClick={() => {
              i18n.changeLanguage('ar');
              document.documentElement.dir = 'rtl';
              handleMenuClose();
            }}
            selected={i18n.language === 'ar'}
          >
            العربية
          </MenuItem>
        </Menu>

        {/* User Menu */}
        <IconButton onClick={handleUserMenuOpen} sx={{ ml: 1 }}>
          <Avatar src="/user-icon.png" alt="User" />
        </IconButton>
        <Menu
          anchorEl={userAnchorEl}
          open={Boolean(userAnchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <AccountCircle fontSize="small" />
            </ListItemIcon>
            <ListItemText>{t('navbar.profile')}</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            <ListItemText>{t('navbar.settings')}</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            <ListItemText>{t('navbar.logout')}</ListItemText>
          </MenuItem>
        </Menu>
      </Box>
    </NavbarContainer>
  );
};

export default Navbar;
