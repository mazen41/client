import React, { useState } from 'react';
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
  InputAdornment,
  CircularProgress
} from '@mui/material';
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const AnimatedCircle = styled(motion.div)({
  position: 'absolute',
  borderRadius: '50%',
  opacity: 0.2,
  zIndex: 1,
});

const LoginPage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isArabic = i18n.language === 'ar';
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/dashboard');
    } catch (err) {
      setError(t('login.loginFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box 
      className={`flex items-center justify-center relative bg-gray-50`}
      dir={isArabic ? 'rtl' : 'ltr'}
      style={{Height: "100vh"}}

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
          [isArabic ? 'right' : 'left']: -50,
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
          [isArabic ? 'left' : 'right']: -30,
        }}
      />

      {/* Login Form Box */}
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
          style={{ width: '100px' }}
          src='./logo2.png'
          alt="Logo"
        />

        <Typography
          variant="h4"
          fontWeight={700}
          color="primary"
          gutterBottom
          textAlign="center"
        >
          {t('login.title')}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 4, textAlign: 'center' }}
        >
          {t('login.subtitle')}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            fullWidth
            margin="normal"
            label={t('login.email')}
            name="email"
            type="email"
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
            label={t('login.password')}
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
                  <IconButton 
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <Box sx={{ textAlign: 'right', mt: 1 }}>
            <Link 
              component={RouterLink} 
              to="/forgot-password" 
              sx={{ color: 'text.secondary', fontSize: 14 }}
            >
              {t('login.forgotPassword')}
            </Link>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ 
              mt: 3, 
              mb: 2, 
              py: 1.5, 
              borderRadius: 2,
              fontWeight: 600
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              t('login.signIn')
            )}
          </Button>

          <Divider sx={{ my: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {t('login.or')}
            </Typography>
          </Divider>

          <Typography 
            variant="body2" 
            textAlign="center" 
            color="text.secondary"
            sx={{ mt: 2 }}
          >
            {t('login.dontHaveAccount')}{' '}
            <Link 
              component={RouterLink} 
              to="/register" 
              sx={{ 
                color: 'primary.main',
                fontWeight: 600
              }}
            >
              {t('login.createAccount')}
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;