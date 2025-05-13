import React, { useState } from 'react';
import { 
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TextField, Typography, Button, Pagination, Paper, Chip, Tooltip,
  IconButton, InputAdornment, MenuItem, Select, FormControl 
} from '@mui/material';
import { Search, Print, FileCopy, Download, FilterList, Refresh } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const RefundList = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const rowsPerPage = 5;

  // Sample data
  const refunds = [
    { id: 1, refundRef: 'REF-1001', invoiceRef: 'INV-2001', txnRef: 'TXN-3001', 
      date: '2023-05-15', customer: 'Ahmed Ali', vendorPays: 150, customerReceives: 135 },
    // Add more sample data...
  ];

  const handlePageChange = (event, value) => setPage(value);

  const filteredRefunds = refunds.filter(refund => 
    refund.refundRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
    refund.invoiceRef.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedRefunds = filteredRefunds.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        {t('refund.refundList')}
      </Typography>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3, borderRadius: '12px' }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            size="small"
            placeholder={t('common.search')}
            InputProps={{ startAdornment: <Search /> }}
            sx={{ minWidth: 250 }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="all">{t('common.allStatuses')}</MenuItem>
              <MenuItem value="pending">{t('common.pending')}</MenuItem>
              <MenuItem value="completed">{t('common.completed')}</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ display: 'flex', gap: 1, ml: 'auto' }}>
            <Tooltip title={t('common.print')}>
              <IconButton><Print /></IconButton>
            </Tooltip>
            <Tooltip title={t('common.copy')}>
              <IconButton><FileCopy /></IconButton>
            </Tooltip>
            <Tooltip title={t('common.export')}>
              <IconButton><Download /></IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Paper>

      {/* Table */}
      <TableContainer component={Paper} sx={{ borderRadius: '12px' }}>
        <Table>
          <TableHead sx={{ bgcolor: 'background.default' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>{t('refund.refundRef')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('refund.invoiceRef')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('refund.txnRef')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('common.date')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('common.customer')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="right">{t('refund.vendorPays')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="right">{t('refund.customerReceives')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRefunds.map((refund) => (
              <TableRow key={refund.id} hover>
                <TableCell>{refund.refundRef}</TableCell>
                <TableCell>{refund.invoiceRef}</TableCell>
                <TableCell>{refund.txnRef}</TableCell>
                <TableCell>{refund.date}</TableCell>
                <TableCell>{refund.customer}</TableCell>
                <TableCell align="right">{refund.vendorPays} SAR</TableCell>
                <TableCell align="right">{refund.customerReceives} SAR</TableCell>
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

export default RefundList;