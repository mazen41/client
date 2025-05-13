import React, { useState } from 'react';
import { 
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TextField, Typography, Button, Pagination, Paper, Chip, IconButton
} from '@mui/material';
import { Search, Add, Edit, Delete } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const SuppliersList = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const rowsPerPage = 5;

  const suppliers = [
    { id: 1, code: 'SUP-1001', name: 'ABC Suppliers', commission: 500, 
      commissionPercent: 10, depositTerms: '30 days', approvalStatus: 'approved', status: 'active' },
    // Add more suppliers...
  ];

  const handlePageChange = (event, value) => setPage(value);

  const filteredSuppliers = suppliers.filter(supplier => 
    supplier.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedSuppliers = filteredSuppliers.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          {t('suppliers.title')}
        </Typography>
        <Button variant="contained" startIcon={<Add />}>
          {t('suppliers.addSupplier')}
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3, borderRadius: '12px' }}>
        <TextField
          size="small"
          placeholder={t('common.search')}
          InputProps={{ startAdornment: <Search /> }}
          sx={{ width: 300 }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Paper>

      <TableContainer component={Paper} sx={{ borderRadius: '12px' }}>
        <Table>
          <TableHead sx={{ bgcolor: 'background.default' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>{t('suppliers.code')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('suppliers.name')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="right">{t('suppliers.commission')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="right">{t('suppliers.commissionPercent')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('suppliers.depositTerms')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('suppliers.approvalStatus')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('common.status')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('common.actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedSuppliers.map((supplier) => (
              <TableRow key={supplier.id} hover>
                <TableCell>{supplier.code}</TableCell>
                <TableCell>{supplier.name}</TableCell>
                <TableCell align="right">{supplier.commission} SAR</TableCell>
                <TableCell align="right">{supplier.commissionPercent}%</TableCell>
                <TableCell>{supplier.depositTerms}</TableCell>
                <TableCell>
                  <Chip 
                    label={t(`suppliers.${supplier.approvalStatus}`)} 
                    color={supplier.approvalStatus === 'approved' ? 'success' : 'warning'}
                  />
                </TableCell>
                <TableCell>
                  <Chip 
                    label={t(`common.${supplier.status}`)} 
                    color={supplier.status === 'active' ? 'success' : 'error'}
                  />
                </TableCell>
                <TableCell>
                  <IconButton color="primary"><Edit /></IconButton>
                  <IconButton color="error"><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Typography variant="body2">
          {t('common.showing')} {(page - 1) * rowsPerPage + 1}-{Math.min(page * rowsPerPage, filteredSuppliers.length)} 
          {t('common.of')} {filteredSuppliers.length}
        </Typography>
        <Pagination 
          count={Math.ceil(filteredSuppliers.length / rowsPerPage)} 
          page={page} 
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};

export default SuppliersList;