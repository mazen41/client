import React, { useState } from 'react';
import { 
  Box, Typography, TextField, Button, Paper, Divider, 
  FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Save } from '@mui/icons-material';

const ContactManagement = () => {
  const { t } = useTranslation();
  const [supportType, setSupportType] = useState('');
  const [message, setMessage] = useState('');

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        {t('contact.title')}
      </Typography>

      <Paper sx={{ p: 3, mb: 3, borderRadius: '12px' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>{t('contact.contactDetails')}</Typography>
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>{t('contact.sales')}</Typography>
            <Typography>Email: sales@example.com</Typography>
            <Typography>Phone: +966 12 345 6789</Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>{t('contact.support')}</Typography>
            <Typography>Email: support@example.com</Typography>
            <Typography>Phone: +966 98 765 4321</Typography>
          </Box>
        </Box>
      </Paper>

      <Paper sx={{ p: 3, mb: 3, borderRadius: '12px' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>{t('contact.complaintsAddresses')}</Typography>
        <Typography sx={{ mb: 2 }}>Head Office: 123 Business Street, Riyadh, Saudi Arabia</Typography>
        <Typography>Branch Office: 456 Commercial Road, Jeddah, Saudi Arabia</Typography>
      </Paper>

      <Paper sx={{ p: 3, borderRadius: '12px' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>{t('contact.leaveMessage')}</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label={t('contact.fullName')} fullWidth />
            <TextField label={t('contact.mobile')} fullWidth />
          </Box>
          <TextField label={t('contact.email')} fullWidth type="email" />
          <FormControl fullWidth>
            <InputLabel>{t('contact.supportType')}</InputLabel>
            <Select
              value={supportType}
              onChange={(e) => setSupportType(e.target.value)}
              label={t('contact.supportType')}
            >
              <MenuItem value="account">{t('contact.accountVerification')}</MenuItem>
              <MenuItem value="inquiry">{t('contact.inquiryRequest')}</MenuItem>
              <MenuItem value="financial">{t('contact.financial')}</MenuItem>
              <MenuItem value="technical">{t('contact.technical')}</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label={t('contact.message')}
            multiline
            rows={4}
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button variant="contained" sx={{ width: 'fit-content' }}>
            {t('contact.submit')}
          </Button>
        </Box>
      </Paper>

      <Paper sx={{ p: 3, mt: 3, borderRadius: '12px' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>{t('contact.bankDetails')}</Typography>
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          <Box sx={{ flex: 1 }}>
            <TextField label={t('contact.accountHolder')} fullWidth sx={{ mb: 2 }} />
            <TextField label={t('contact.accountNumber')} fullWidth sx={{ mb: 2 }} />
            <TextField label={t('contact.iban')} fullWidth />
          </Box>
          <Box sx={{ flex: 1 }}>
            <TextField label={t('contact.bankName')} fullWidth sx={{ mb: 2 }} />
            <Button variant="contained" component="label" sx={{ mb: 2 }}>
              {t('contact.uploadImage')}
              <input type="file" hidden />
            </Button>
            <Button variant="contained" startIcon={<Save />}>
              {t('common.save')}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default ContactManagement;