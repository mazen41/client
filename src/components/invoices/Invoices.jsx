import React, { useState } from 'react';
import {
  Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Button, Typography, IconButton, TextField, InputAdornment, MenuItem,
  Chip, Stack, TablePagination
} from '@mui/material';
import {
  Visibility as ViewIcon,
  Print as PrintIcon,
  Receipt as InvoiceIcon,
  FileDownload as ExportIcon,
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const Invoices = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(5);

  const invoicesData = [
    { id: 'INV-1001', date: '2023-05-15', customer: 'Ahmed Ali', amount: 450, status: 'completed', paymentMethod: 'mada', dueDate: '2023-05-30' },
    { id: 'INV-1002', date: '2023-05-16', customer: 'Mohammed Omar', amount: 320, status: 'pending', paymentMethod: 'visa', dueDate: '2023-05-31' },
    { id: 'INV-1003', date: '2023-05-17', customer: 'Sarah Ahmed', amount: 680, status: 'pending', paymentMethod: 'mastercard', dueDate: '2023-06-01' },
    { id: 'INV-1004', date: '2023-05-18', customer: 'Fatima Khalid', amount: 210, status: 'failed', paymentMethod: 'applepay', dueDate: '2023-06-02' },
    { id: 'INV-1005', date: '2023-05-19', customer: 'Khalid Hassan', amount: 890, status: 'completed', paymentMethod: 'stcpay', dueDate: '2023-06-03' }
  ];

  const filteredInvoices = invoicesData.filter(invoice => {
    const matchesSearch = invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const paginatedInvoices = filteredInvoices.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const statusOptions = [
    { value: 'all', label: t('allStatuses') },
    { value: 'completed', label: t('statuses.completed') },
    { value: 'pending', label: t('statuses.pending') },
    { value: 'failed', label: t('statuses.failed') }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'failed': return 'error';
      default: return 'default';
    }
  };

  const columns = [
    { field: 'id', headerName: t('id'), width: '120px' },
    { field: 'date', headerName: t('date'), width: '100px' },
    { field: 'customer', headerName: t('customer'), width: '150px' },
    { field: 'amount', headerName: t('amount'), width: '100px' },
    { field: 'status', headerName: t('status'), width: '120px' },
    { field: 'paymentMethod', headerName: t('paymentMethod'), width: '120px' },
    { field: 'dueDate', headerName: t('dueDate'), width: '100px' },
    { field: 'actions', headerName: t('actions'), width: '150px' }
  ];

  return (
    <Box sx={{ width: '100%', fontFamily: '"Segoe UI", Roboto, sans-serif' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4, alignItems: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 700, fontSize: '1.75rem' }}>
          {t('invoices')}
        </Typography>
        <Box>
          <Button variant="contained" startIcon={<AddIcon />} sx={{ mr: 1, borderRadius: 2, fontSize: '0.95rem', py: 1, px: 2 }}>
            {t('createInvoice')}
          </Button>
          <Button variant="outlined" startIcon={<ExportIcon />} sx={{ borderRadius: 2, fontSize: '0.95rem', py: 1, px: 2 }}>
            {t('export')}
          </Button>
        </Box>
      </Box>

      {/* Table */}
      <TableContainer
        component={Paper}
        elevation={4}
        sx={{
          borderRadius: 3,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}
      >
        <Table sx={{ minWidth: 900 }}>
          <TableHead>
            <TableRow>
              {columns.map(col => (
                <TableCell key={col.field} sx={{ fontWeight: 600, fontSize: '1rem', py: 2 }}>
                  {col.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedInvoices.map(row => (
              <TableRow key={row.id} hover>
                <TableCell sx={{ fontSize: '0.95rem', py: 1.5 }}>{row.id}</TableCell>
                <TableCell sx={{ fontSize: '0.95rem', py: 1.5 }}>{row.date}</TableCell>
                <TableCell sx={{ fontSize: '0.95rem', py: 1.5 }}>{row.customer}</TableCell>
                <TableCell sx={{ fontSize: '0.95rem', py: 1.5 }}>{row.amount} SAR</TableCell>
                <TableCell sx={{ py: 1.5 }}>
                  <Chip
                    label={t(`statuses.${row.status}`)}
                    color={getStatusColor(row.status)}
                    size="small"
                    sx={{ fontWeight: 500, fontSize: '0.85rem' }}
                  />
                </TableCell>
                <TableCell sx={{ fontSize: '0.95rem', py: 1.5 }}>{t(`paymentMethods.${row.paymentMethod}`)}</TableCell>
                <TableCell sx={{ fontSize: '0.95rem', py: 1.5 }}>{row.dueDate}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <IconButton size="small" color="info">
                      <ViewIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="primary">
                      <PrintIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="secondary">
                      <InvoiceIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={filteredInvoices.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5]}
          sx={{ px: 2 }}
        />
      </TableContainer>
    </Box>

  );
};

export default Invoices;
