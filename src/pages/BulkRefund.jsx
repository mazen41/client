import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { AttachFile } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const BulkRefunds = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        {t('refund.bulkRefunds')}
      </Typography>

      <Paper sx={{ 
        p: 4, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        borderRadius: '12px',
        textAlign: 'center'
      }}>
        <AttachFile fontSize="large" color="action" sx={{ mb: 2 }} />
        <Typography variant="h6" sx={{ mb: 1 }}>
          {t('refund.uploadRefundFile')}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
          {t('refund.uploadInstructions')}
        </Typography>
        <Button variant="contained" component="label">
          {t('common.selectFile')}
          <input type="file" hidden />
        </Button>
      </Paper>
    </Box>
  );
};

export default BulkRefunds;