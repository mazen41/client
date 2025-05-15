import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import axios from 'axios';
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Divider,
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
  Phone as PhoneIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const AnimatedCircle = styled(motion.div)({
  position: 'absolute',
  borderRadius: '50%',
  opacity: 0.2,
  zIndex: 1,
});

const RegisterPage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isArabic = i18n.language === 'ar';
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    country: '',
    profileType: 'individual',
    companyName: '',
    address: '',
    agreeToTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    setError(null);
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.phone || 
        !formData.password || !formData.confirmPassword || !formData.agreeToTerms) {
      setError(t('register.fillAllRequiredFields'));
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError(t('register.passwordsDontMatch'));
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    try {
      if (!validateForm()) return;
      
      setLoading(true);
      
      const response = await axios.post('http://127.0.0.1:8000/api/register', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
        country: formData.country,
        profile_type: formData.profileType,
        company_name: formData.companyName,
        address: formData.address
      });
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user))
      navigate('/dashboard');
      
    } catch (err) {
      setError(err.response?.data?.message || t('register.registrationFailed'));
      console.log(err);
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box 
      className={`min-h-screen flex items-center justify-center relative bg-gray-50`}
      dir={isArabic ? 'rtl' : 'ltr'}
    >
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

      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        sx={{
          zIndex: 2,
          width: '100%',
          maxWidth: 600,
          bgcolor: 'white',
          boxShadow: 6,
          borderRadius: 3,
          p: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <img style={{ width: '100px' }} src='./new-logo.png' alt="Logo" />
        <Typography variant="h4" fontWeight={700} color="primary" gutterBottom>
          {t('register.title')}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
          {t('register.subtitle')}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ width: '100%' }}>
          {/* Required Fields */}
          <TextField
            fullWidth
            margin="normal"
            label={t('register.fullName')}
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
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
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
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
            label={t('register.phone')}
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon color="primary" />
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
            required
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
            label={t('register.confirmPassword')}
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="primary" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          
          {/* Optional Fields */}
          <TextField
            fullWidth
            margin="normal"
            label={t('register.country')}
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
          
          <TextField
            fullWidth
            margin="normal"
            label={t('register.companyName')}
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
          />
          
          <TextField
            fullWidth
            margin="normal"
            label={t('register.address')}
            name="address"
            value={formData.address}
            onChange={handleChange}
            multiline
            rows={2}
          />
          
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.agreeToTerms}
                onChange={handleChange}
                name="agreeToTerms"
                color="primary"
                required
              />
            }
            label={t('register.agreeToTerms')}
            sx={{ mt: 2 }}
          />
          
          <Button
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            disabled={loading || !formData.agreeToTerms}
            sx={{ py: 1.5, mt: 2 }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              t('register.completeRegistration')
            )}
          </Button>
        </Box>

        <Divider sx={{ my: 2, width: '100%' }}>
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
  );
};

export default RegisterPage;