import React, { useState } from 'react';
import { 
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TextField, Typography, Button, Pagination, Paper, Chip, IconButton 
} from '@mui/material';
import { Search, Print, FileCopy, Download, FilterList } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const RefundApproval = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const rowsPerPage = 5;

  // Sample data
  const refunds = [
    { id: 1, invoiceId: 'INV-2001', date: '2023-05-15', createdBy: 'Admin', 
      customer: 'Ahmed Ali', amount: 150, vendorPays: 135, status: 'pending' },
    // Add more sample data...
  ];

  const handlePageChange = (event, value) => setPage(value);

  const filteredRefunds = refunds.filter(refund => 
    refund.invoiceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    refund.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedRefunds = filteredRefunds.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        {t('refund.refundApproval')}
      </Typography>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3, borderRadius: '12px' }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            size="small"
            placeholder={t('common.search')}
            InputProps={{ startAdornment: <Search /> }}
            sx={{ flex: 1 }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton><Print /></IconButton>
            <IconButton><FileCopy /></IconButton>
            <IconButton><Download /></IconButton>
            <Button startIcon={<FilterList />} variant="outlined">
              {t('common.filter')}
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Table */}
      <TableContainer component={Paper} sx={{ borderRadius: '12px' }}>
        <Table>
          <TableHead sx={{ bgcolor: 'background.default' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>{t('refund.invoiceId')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('common.date')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('refund.createdBy')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('common.customer')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="right">{t('common.amount')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="right">{t('refund.vendorPays')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('common.status')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('common.actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRefunds.map((refund) => (
              <TableRow key={refund.id} hover>
                <TableCell>{refund.invoiceId}</TableCell>
                <TableCell>{refund.date}</TableCell>
                <TableCell>{refund.createdBy}</TableCell>
                <TableCell>{refund.customer}</TableCell>
                <TableCell align="right">{refund.amount} SAR</TableCell>
                <TableCell align="right">{refund.vendorPays} SAR</TableCell>
                <TableCell>
                  <Chip 
                    label={t(`common.${refund.status}`)} 
                    color={refund.status === 'pending' ? 'warning' : 'success'}
                  />
                </TableCell>
                <TableCell>
                  <Button variant="outlined" size="small" sx={{ mr: 1 }}>
                    {t('common.approve')}
                  </Button>
                  <Button variant="outlined" size="small" color="error">
                    {t('common.reject')}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Typography variant="body2">
          {t('common.showing')} {(page - 1) * rowsPerPage + 1}-{Math.min(page * rowsPerPage, filteredRefunds.length)} 
          {t('common.of')} {filteredRefunds.length}
        </Typography>
        <Pagination 
          count={Math.ceil(filteredRefunds.length / rowsPerPage)} 
          page={page} 
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};

export default RefundApproval;