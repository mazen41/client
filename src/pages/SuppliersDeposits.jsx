import React, { useState } from 'react';
import { 
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TextField, Typography, Pagination, Paper, IconButton,
  Button
} from '@mui/material';
import { Search, Print, FileCopy, Download, FilterList } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const SuppliersDeposits = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const rowsPerPage = 5;

  const deposits = [
    { id: 1, supplierName: 'ABC Suppliers', depositRef: 'DEP-1001', 
      totalValue: 5000, depositDate: '2023-05-15', bankDetails: 'Al Rajhi Bank ****1234' },
    // Add more deposits...
  ];

  const handlePageChange = (event, value) => setPage(value);

  const filteredDeposits = deposits.filter(deposit => 
    deposit.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deposit.depositRef.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedDeposits = filteredDeposits.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        {t('suppliers.depositsTitle')}
      </Typography>

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

      <TableContainer component={Paper} sx={{ borderRadius: '12px' }}>
        <Table>
          <TableHead sx={{ bgcolor: 'background.default' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>{t('suppliers.supplierName')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('suppliers.depositRef')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="right">{t('suppliers.totalValue')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('suppliers.depositDate')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('suppliers.bankDetails')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedDeposits.map((deposit) => (
              <TableRow key={deposit.id} hover>
                <TableCell>{deposit.supplierName}</TableCell>
                <TableCell>{deposit.depositRef}</TableCell>
                <TableCell align="right">{deposit.totalValue} SAR</TableCell>
                <TableCell>{deposit.depositDate}</TableCell>
                <TableCell>{deposit.bankDetails}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Typography variant="body2">
          {t('common.showing')} {(page - 1) * rowsPerPage + 1}-{Math.min(page * rowsPerPage, filteredDeposits.length)} 
          {t('common.of')} {filteredDeposits.length}
        </Typography>
        <Pagination 
          count={Math.ceil(filteredDeposits.length / rowsPerPage)} 
          page={page} 
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};

export default SuppliersDeposits;