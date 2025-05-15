import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, TextField, Button, Paper, Divider, 
  FormControl, InputLabel, Select, MenuItem, Switch, IconButton,
  Snackbar, Alert
} from '@mui/material';
import { Save, Add, Delete } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const UpdateProfile = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    company_name: '',
    country: '',
    password: '',
    password_confirmation: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [socialAccounts, setSocialAccounts] = useState([
    { platform: 'facebook', accountName: '' },
  ]);

  useEffect(() => {
    // Load user data from localStorage or API
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setFormData({
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        address: userData.address || '',
        company_name: userData.company_name || '',
        country: userData.country || '',
        password: '',
        password_confirmation: ''
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/update-profile', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      // Update localStorage with new user data
      const updatedUser = { ...JSON.parse(localStorage.getItem('user')), ...response.data.user };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      setSuccess(true);
      setFormData(prev => ({
        ...prev,
        password: '',
        password_confirmation: ''
      }));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const addSocialAccount = () => {
    setSocialAccounts([...socialAccounts, { platform: 'facebook', accountName: '' }]);
  };

  const removeSocialAccount = (index) => {
    const updated = [...socialAccounts];
    updated.splice(index, 1);
    setSocialAccounts(updated);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        {t('profile.updateProfile')}
      </Typography>

      {error && (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        </Snackbar>
      )}

      {success && (
        <Snackbar open={success} autoHideDuration={6000} onClose={() => setSuccess(false)}>
          <Alert severity="success" onClose={() => setSuccess(false)}>
            Profile updated successfully!
          </Alert>
        </Snackbar>
      )}

      <Paper component="form" onSubmit={handleSubmit} sx={{ p: 3, mb: 3, borderRadius: '12px' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Personal Information</Typography>
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
            <TextField 
              label="Full Name" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth 
              required
            />
            <TextField 
              label="Email" 
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth 
              required
            />
            <TextField 
              label="Phone" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              fullWidth 
              required
            />
            <TextField 
              label="Address" 
              name="address"
              value={formData.address}
              onChange={handleChange}
              fullWidth 
              multiline
              rows={2}
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
            <TextField 
              label="Company Name" 
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              fullWidth 
            />
            <TextField 
              label="Country" 
              name="country"
              value={formData.country}
              onChange={handleChange}
              fullWidth 
            />
            <TextField 
              label="New Password" 
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth 
            />
            <TextField 
              label="Confirm Password" 
              name="password_confirmation"
              type="password"
              value={formData.password_confirmation}
              onChange={handleChange}
              fullWidth 
            />
          </Box>
        </Box>
        <Button 
          type="submit"
          variant="contained" 
          startIcon={<Save />} 
          sx={{ mt: 3 }}
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Save Changes'}
        </Button>
      </Paper>

      {/* Rest of your existing social media and other sections */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: '12px' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>{t('profile.socialMedia')}</Typography>
        {socialAccounts.map((account, index) => (
          <Box key={index} sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>{t('profile.platform')}</InputLabel>
              <Select
                value={account.platform}
                onChange={(e) => {
                  const updated = [...socialAccounts];
                  updated[index].platform = e.target.value;
                  setSocialAccounts(updated);
                }}
                label={t('profile.platform')}
              >
                <MenuItem value="facebook">Facebook</MenuItem>
                <MenuItem value="twitter">Twitter</MenuItem>
                <MenuItem value="instagram">Instagram</MenuItem>
                <MenuItem value="linkedin">LinkedIn</MenuItem>
              </Select>
            </FormControl>
            <TextField 
              label={t('profile.accountName')} 
              value={account.accountName}
              onChange={(e) => {
                const updated = [...socialAccounts];
                updated[index].accountName = e.target.value;
                setSocialAccounts(updated);
              }}
              sx={{ flex: 1 }} 
            />
            {socialAccounts.length > 1 && (
              <IconButton onClick={() => removeSocialAccount(index)} color="error">
                <Delete />
              </IconButton>
            )}
          </Box>
        ))}
        <Button 
          variant="outlined" 
          startIcon={<Add />} 
          onClick={addSocialAccount}
          sx={{ mt: 1 }}
        >
          {t('profile.addAccount')}
        </Button>
      </Paper>
    </Box>
  );
};

export default UpdateProfile;