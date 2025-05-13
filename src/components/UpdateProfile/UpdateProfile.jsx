import React, { useState } from 'react';
import { 
  Box, Typography, TextField, Button, Paper, Divider, 
  FormControl, InputLabel, Select, MenuItem, Switch, IconButton
} from '@mui/material';
import { Save, Add, Delete } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const UpdateProfile = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);
  const [socialAccounts, setSocialAccounts] = useState([
    { platform: 'facebook', accountName: '' },
  ]);

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

      <Paper sx={{ p: 3, mb: 3, borderRadius: '12px' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>{t('profile.businessDetails')}</Typography>
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
            <Button variant="contained" component="label" sx={{ width: 'fit-content' }}>
              {t('profile.updateImage')}
              <input type="file" hidden />
            </Button>
            <TextField label={t('profile.companyName')} fullWidth />
            <FormControl fullWidth>
              <InputLabel>{t('profile.category')}</InputLabel>
              <Select label={t('profile.category')}>
                <MenuItem value="retail">Retail</MenuItem>
                <MenuItem value="wholesale">Wholesale</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>{t('profile.defaultLanguage')}</InputLabel>
              <Select label={t('profile.defaultLanguage')}>
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="ar">Arabic</MenuItem>
              </Select>
            </FormControl>
            <TextField label={t('profile.workPhone')} fullWidth />
            <TextField label={t('profile.workEmail')} fullWidth />
            <TextField label={t('profile.websiteUrl')} fullWidth />
            <TextField label={t('profile.deliveryFees')} fullWidth type="number" />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
            <Typography variant="subtitle1">{t('profile.invoiceExpiry')}</Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField label={t('profile.hours')} type="number" fullWidth />
              <TextField label={t('profile.days')} type="number" fullWidth />
              <TextField label={t('profile.minutes')} type="number" fullWidth />
            </Box>
            <TextField 
              label={t('profile.customSmsText')} 
              multiline 
              rows={4} 
              fullWidth 
            />
            <TextField 
              label={t('profile.termsConditions')} 
              multiline 
              rows={4} 
              fullWidth 
            />
          </Box>
        </Box>
        <Button variant="contained" startIcon={<Save />} sx={{ mt: 3 }}>
          {t('common.save')}
        </Button>
      </Paper>

      <Paper sx={{ p: 3, mb: 3, borderRadius: '12px' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>{t('profile.bankDetails')}</Typography>
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          <Box sx={{ flex: 1 }}>
            <TextField 
              label={t('profile.bankAccountHolder')} 
              fullWidth 
              sx={{ mb: 2 }} 
            />
            <TextField 
              label={t('profile.bankAccountNumber')} 
              fullWidth 
              sx={{ mb: 2 }} 
            />
            <TextField 
              label={t('profile.iban')} 
              fullWidth 
              sx={{ mb: 2 }} 
            />
            <TextField 
              label={t('profile.bankName')} 
              fullWidth 
            />
          </Box>
        </Box>
        <Button variant="contained" startIcon={<Save />} sx={{ mt: 3 }}>
          {t('common.save')}
        </Button>
      </Paper>

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
        <Button variant="contained" startIcon={<Save />} sx={{ mt: 3, ml: 2 }}>
          {t('common.save')}
        </Button>
      </Paper>

      <Paper sx={{ p: 3, borderRadius: '12px' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>{t('profile.invoiceSettings')}</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography>{t('profile.enableDetailedInvoice')}</Typography>
            <Switch color="primary" defaultChecked />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography>{t('profile.enableSimpleCheckout')}</Typography>
            <Switch color="primary" />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography>{t('profile.showAllCurrencies')}</Typography>
            <Switch color="primary" defaultChecked />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography>{t('profile.enableCardView')}</Typography>
            <Switch color="primary" />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography>{t('profile.displayVatDetails')}</Typography>
            <Switch color="primary" defaultChecked />
          </Box>
        </Box>
        <Button variant="contained" startIcon={<Save />} sx={{ mt: 3 }}>
          {t('common.save')}
        </Button>
      </Paper>
    </Box>
  );
};

export default UpdateProfile;