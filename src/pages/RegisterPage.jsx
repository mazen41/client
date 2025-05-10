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
  FormControl,
  FormLabel,
  Stepper,
  Step,
  StepLabel,
  Select,
  MenuItem,
  InputLabel,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
  Business as BusinessIcon,
  AccountBalance,
  AccountBalanceWallet
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const AnimatedCircle = styled(motion.div)({
  position: 'absolute',
  borderRadius: '50%',
  opacity: 0.2,
  zIndex: 1,
  // overflow: "scroll"
});

const RegisterPage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isArabic = i18n.language === 'ar';
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'individual',
    // Individual bank details
    bankAccountName: '',
    bankName: '',
    accountNumber: '',
    iban: '',
    // Company details
    companyName: '',
    companyEmail: '',
    companyNumber: '',
    companyType: 'llc'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const validateStep1 = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError(t('register.fillAllFields'));
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError(t('register.passwordsDontMatch'));
      return false;
    }
    if (formData.userType === 'individual' && 
        (!formData.bankAccountName || !formData.bankName || !formData.accountNumber || !formData.iban)) {
      setError(t('register.fillAllFields'));
      return false;
    }
    return true;
  };

  const validateCompanyDetails = () => {
    if (!formData.companyName || !formData.companyEmail || !formData.companyNumber) {
      setError(t('register.fillAllFields'));
      return false;
    }
    return true;
  };

  const validateBankDetails = () => {
    if (!formData.bankAccountName || !formData.bankName || !formData.accountNumber || !formData.iban) {
      setError(t('register.fillAllFields'));
      return false;
    }
    return true;
  };

  const handleNext = async () => {
    try {
      setLoading(true);

      if (formData.userType === 'individual') {
        // Individual user - single step registration
        if (!validateStep1()) return;
        
        const response = await axios.post('http://127.0.0.1:8000/api/register', {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.confirmPassword,
          user_type: formData.userType,
          bank_account_name: formData.bankAccountName,
          bank_name: formData.bankName,
          account_number: formData.accountNumber,
          iban: formData.iban
        });

        setAuthToken(response.data.token);
        navigate('/dashboard');
      } else {
        // Company user - multi-step registration
        if (activeStep === 0) {
          if (!validateStep1()) return;
          setActiveStep(1);
        } else if (activeStep === 1) {
          if (!validateCompanyDetails()) return;
          const response = await axios.post('http://127.0.0.1:8000/api/register', {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            password_confirmation: formData.confirmPassword,
            user_type: formData.userType,
            company_name: formData.companyName,
            company_email: formData.companyEmail,
            company_number: formData.companyNumber,
            company_type: formData.companyType
          });
          setAuthToken(response.data.token);
          setActiveStep(2);
        } else if (activeStep === 2) {
          if (!validateBankDetails()) return;
          
          await axios.post('http://127.0.0.1:8000/api/register/company', {
            bank_account_name: formData.bankAccountName,
            bank_name: formData.bankName,
            account_number: formData.accountNumber,
            iban: formData.iban
          }, {
            headers: {
              Authorization: `Bearer ${authToken}`
            }
          });

          navigate('/dashboard');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || t('register.registrationFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  // Determine steps based on user type
  const steps = formData.userType === 'individual' 
    ? [t('register.accountInfo')]
    : [
        t('register.accountInfo'),
        t('register.companyDetails'),
        t('register.bankDetails')
      ];

  const renderStepContent = (step) => {
    if (formData.userType === 'individual') {
      // Individual user - all fields in one step
      return (
        <Box sx={{ width: '100%'}}>
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
            label={t('register.confirmPassword')}
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={handleChange}
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
          
          <FormControl fullWidth margin="normal">
            <InputLabel>{t('register.userType')}</InputLabel>
            <Select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              label={t('register.userType')}
            >
              <MenuItem value="individual">{t('register.individual')}</MenuItem>
              <MenuItem value="company">{t('register.company')}</MenuItem>
            </Select>
          </FormControl>

          {/* Bank details for individuals */}
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            {t('register.bankDetails')}
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label={t('register.bankAccountName')}
            name="bankAccountName"
            value={formData.bankAccountName}
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
            label={t('register.bankName')}
            name="bankName"
            value={formData.bankName}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountBalance color="primary" />
                </InputAdornment>
              )
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            label={t('register.accountNumber')}
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountBalanceWallet color="primary" />
                </InputAdornment>
              )
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            label={t('register.iban')}
            name="iban"
            value={formData.iban}
            onChange={handleChange}
            helperText={t('register.ibanHelper')}
          />
        </Box>
      );
    } else {
      // Company user - multi-step
      switch (step) {
        case 0:
          return (
            <Box sx={{ width: '100%' }}>
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
                label={t('register.confirmPassword')}
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
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
              
              <FormControl fullWidth margin="normal">
                <InputLabel>{t('register.userType')}</InputLabel>
                <Select
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  label={t('register.userType')}
                >
                  <MenuItem value="individual">{t('register.individual')}</MenuItem>
                  <MenuItem value="company">{t('register.company')}</MenuItem>
                </Select>
              </FormControl>
            </Box>
          );
        case 1:
          return (
            <Box sx={{ width: '100%' }}>
              <TextField
                fullWidth
                margin="normal"
                label={t('register.companyName')}
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BusinessIcon color="primary" />
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                fullWidth
                margin="normal"
                label={t('register.companyEmail')}
                name="companyEmail"
                type="email"
                value={formData.companyEmail}
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
                label={t('register.companyNumber')}
                name="companyNumber"
                value={formData.companyNumber}
                onChange={handleChange}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>{t('register.companyType')}</InputLabel>
                <Select
                  name="companyType"
                  value={formData.companyType}
                  onChange={handleChange}
                  label={t('register.companyType')}
                >
                  <MenuItem value="llc">{t('register.llc')}</MenuItem>
                  <MenuItem value="soleEstablishment">{t('register.soleEstablishment')}</MenuItem>
                  <MenuItem value="jointStock">{t('register.jointStock')}</MenuItem>
                </Select>
              </FormControl>
            </Box>
          );
        case 2:
          return (
            <Box sx={{ width: '100%' }}>
              <TextField
                fullWidth
                margin="normal"
                label={t('register.bankAccountName')}
                name="bankAccountName"
                value={formData.bankAccountName}
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
                label={t('register.bankName')}
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountBalance color="primary" />
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                fullWidth
                margin="normal"
                label={t('register.accountNumber')}
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountBalanceWallet color="primary" />
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                fullWidth
                margin="normal"
                label={t('register.iban')}
                name="iban"
                value={formData.iban}
                onChange={handleChange}
                helperText={t('register.ibanHelper')}
              />
            </Box>
          );
        default:
          return null;
      }
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
        <img style={{ width: '100px' }} src='./logo2.png' alt="Logo" />
        <Typography variant="h4" fontWeight={700} color="primary" gutterBottom>
          {t('register.title')}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
          {t('register.subtitle')}
        </Typography>

        <Stepper activeStep={activeStep} alternativeLabel sx={{ width: '100%', mb: 4 }}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {error}
          </Alert>
        )}

        {renderStepContent(activeStep)}

        <Box sx={{ width: '100%', mt: 2 }}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleNext}
            disabled={loading}
            sx={{ py: 1.5 }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : activeStep === steps.length - 1 || formData.userType === 'individual' ? (
              t('register.completeRegistration')
            ) : (
              t('register.next')
            )}
          </Button>

          {activeStep > 0 && formData.userType === 'company' && (
            <Button
              fullWidth
              variant="outlined"
              onClick={handleBack}
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {t('register.back')}
            </Button>
          )}
        </Box>

        {activeStep === 0 && (
          <>
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
          </>
        )}
      </Box>
    </Box>
  );
};

export default RegisterPage;