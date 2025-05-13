import React, { useState } from 'react';
import { 
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TextField, Typography, Button, Pagination, Paper, Checkbox 
} from '@mui/material';
import { Search, FilterList } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const MakeRefund = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const rowsPerPage = 5;

  // Sample data
  const transactions = [
    { id: 1, date: '2023-05-15', invoiceRef: 'INV-2001', invoiceId: '2001', 
      customer: 'Ahmed Ali', amount: 500, currency: 'SAR' },
    // Add more sample data...
  ];

  const handlePageChange = (event, value) => setPage(value);

  const filteredTransactions = transactions.filter(txn => 
    txn.invoiceRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
    txn.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedTransactions = filteredTransactions.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        {t('refund.makeRefund')}
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
          <Button startIcon={<FilterList />} variant="outlined">
            {t('common.filter')}
          </Button>
        </Box>
      </Paper>

      {/* Table */}
      <TableContainer component={Paper} sx={{ borderRadius: '12px' }}>
        <Table>
          <TableHead sx={{ bgcolor: 'background.default' }}>
            <TableRow>
              <TableCell></TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('common.date')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('refund.invoiceRef')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('refund.invoiceId')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('common.customer')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="right">{t('common.amount')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('common.currency')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('common.actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTransactions.map((txn) => (
              <TableRow key={txn.id} hover>
                <TableCell><Checkbox /></TableCell>
                <TableCell>{txn.date}</TableCell>
                <TableCell>{txn.invoiceRef}</TableCell>
                <TableCell>{txn.invoiceId}</TableCell>
                <TableCell>{txn.customer}</TableCell>
                <TableCell align="right">{txn.amount}</TableCell>
                <TableCell>{txn.currency}</TableCell>
                <TableCell>
                  <Button variant="outlined" size="small">
                    {t('refund.makeRefund')}
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
          {t('common.showing')} {(page - 1) * rowsPerPage + 1}-{Math.min(page * rowsPerPage, filteredTransactions.length)} 
          {t('common.of')} {filteredTransactions.length}
        </Typography>
        <Pagination 
          count={Math.ceil(filteredTransactions.length / rowsPerPage)} 
          page={page} 
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};

export default MakeRefund;