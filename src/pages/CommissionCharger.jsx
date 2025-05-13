import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Switch,
  Paper,
  Divider,
  useTheme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const InfoItem = ({ label, value }) => (
  <Grid item xs={12} sm={6} md={4}>
    <Typography variant="subtitle2" color="text.secondary" fontWeight={500}>
      {label}
    </Typography>
    <Typography variant="body1" fontWeight={600}>
      {value}
    </Typography>
  </Grid>
);

const CommissionCharger = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const isRTL = i18n.dir() === 'rtl';
  const [isActive, setIsActive] = useState(true);

  const bankDetails = {
    accountHolderName: 'John Doe',
    bankAccount: '1234567890',
    iban: 'DE89370400440532013000',
    bankName: 'Bank of Example',
    debitEnabled: true,
    creditEnabled: false,
  };

  const paymentMethod = {
    method: t('bankTransfer'),
    commissionFrom: t('sender'),
    note: t('bankNote'),
  };

  return (
    <Box
      p={4}
      sx={{
        direction: isRTL ? 'rtl' : 'ltr',
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 3,
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Typography variant="h5" fontWeight={700} gutterBottom>
          {t('commissionCharger')}
        </Typography>

        {/* Bank Details */}
        <Typography variant="h6" mt={4} mb={2} fontWeight={600}>
          {t('bankDetails')}
        </Typography>
        <Grid container spacing={3}>
          <InfoItem label={t('accountHolderName')} value={bankDetails.accountHolderName} />
          <InfoItem label={t('bankAccount')} value={bankDetails.bankAccount} />
          <InfoItem label={t('iban')} value={bankDetails.iban} />
          <InfoItem label={t('bankName')} value={bankDetails.bankName} />
          <InfoItem label={t('debitEnabled')} value={bankDetails.debitEnabled ? t('yes') : t('no')} />
          <InfoItem label={t('creditEnabled')} value={bankDetails.creditEnabled ? t('yes') : t('no')} />
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Payment Method */}
        <Typography variant="h6" mb={2} fontWeight={600}>
          {t('paymentMethod')}
        </Typography>
        <Grid container spacing={3} alignItems="center">
          <InfoItem label={t('method')} value={paymentMethod.method} />
          <InfoItem label={t('commissionFrom')} value={paymentMethod.commissionFrom} />
          <InfoItem label={t('note')} value={paymentMethod.note} />
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle2" color="text.secondary" fontWeight={500}>
              {t('isActive')}
            </Typography>
            <Switch
              checked={isActive}
              onChange={() => setIsActive(!isActive)}
              inputProps={{ 'aria-label': 'Is Active' }}
              sx={{ mt: 1 }}
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default CommissionCharger;
