import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Divider,
  IconButton,
  InputAdornment
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
  Business as BusinessIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';

const AnimatedCircle = styled(motion.div)({
  position: 'absolute',
  borderRadius: '50%',
  opacity: 0.2,
  zIndex: 1,
});

const RegisterPage = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    company: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Box
      className={`min-h-screen flex items-center justify-center relative bg-gray-50 ${isArabic ? 'text-right' : 'text-left'}`}
      sx={{ position: 'relative', overflow: 'hidden', left: "90%" }}
    >
      {/* Background animated circles */}
      <AnimatedCircle
        animate={{ x: [0, 40, -40, 0], y: [0, 30, -30, 0] }}
        transition={{ repeat: Infinity, duration: 10 }}
        sx={{
          width: 300,
          height: 300,
          backgroundColor: 'primary.main',
          top: -50,
          left: -50,
        }}
      />
      <AnimatedCircle
        animate={{ x: [0, -30, 30, 0], y: [0, -20, 20, 0] }}
        transition={{ repeat: Infinity, duration: 12 }}
        sx={{
          width: 200,
          height: 200,
          backgroundColor: 'secondary.main',
          bottom: -30,
          right: -30,
        }}
      />

      {/* Registration Form Box */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        sx={{
          zIndex: 2,
          width: '100%',
          maxWidth: 500,
          bgcolor: 'white',
          boxShadow: 6,
          borderRadius: 3,
          p: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {/* Logo placeholder */}
        <img
          style={{width: "100px"}}
          src='./logo2.png'
        />

        <Typography
          variant="h4"
          fontWeight={700}
          color="primary"
          gutterBottom
          textAlign="center"
        >
          {t('register.title')}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 4, textAlign: 'center' }}
        >
          {t('register.subtitle')}
        </Typography>

        {/* Form */}
        <Box component="form" sx={{ width: '100%' }}>
          <TextField
            fullWidth
            margin="normal"
            label={t('register.fullName')}
            name="name"
            value={formData.name}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon color="primary" />
                </InputAdornment>
              )
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            label={t('register.email')}
            name="email"
            value={formData.email}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="primary" />
                </InputAdornment>
              )
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            label={t('register.password')}
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="primary" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            label={t('register.company')}
            name="company"
            value={formData.company}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BusinessIcon color="primary" />
                </InputAdornment>
              )
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, py: 1.5, borderRadius: 2 }}
          >
            {t('register.createAccount')}
          </Button>

          <Divider sx={{ my: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {t('register.or')}
            </Typography>
          </Divider>

          <Typography variant="body2" textAlign="center" color="text.secondary">
            {t('register.haveAccount')}{' '}
            <Link component={RouterLink} to="/login" sx={{ color: 'primary.main' }}>
              {t('register.signIn')}
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterPage;
