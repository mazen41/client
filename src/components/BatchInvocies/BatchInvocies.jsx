import React, { useState } from 'react';
import {
  Box, Typography, TextField, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, TablePagination
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

const batchData = [...Array(20).keys()].map(i => ({
  name: `Batch ${i + 1}`,
  createdAt: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
  expiryDate: new Date(Date.now() + Math.random() * 10000000000).toLocaleDateString(),
  status: ['Paid', 'Pending', 'Overdue'][i % 3],
  invoiceCount: Math.floor(Math.random() * 10) + 1
}));

const BatchInvoices = () => {
  const { t, i18n } = useTranslation();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const filtered = batchData.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ padding: 3, direction: i18n.language === 'ar' ? 'rtl' : 'ltr' }}>
      <Typography variant="h5" gutterBottom>
        {t('batchInvoices.title', 'Batch Invoices')}
      </Typography>

      <TextField
        label={t('search', 'Search')}
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('name', 'Name')}</TableCell>
              <TableCell>{t('createdAt', 'Created At')}</TableCell>
              <TableCell>{t('expiryDate', 'Expiry Date')}</TableCell>
              <TableCell>{t('invoiceStatus', 'Invoice Status')}</TableCell>
              <TableCell>{t('numInvoices', 'Number of Invoices')}</TableCell>
              <TableCell>{t('actions', 'Actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => (
              <TableRow key={i}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.createdAt}</TableCell>
                <TableCell>{row.expiryDate}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.invoiceCount}</TableCell>
                <TableCell>
                  <IconButton><VisibilityIcon /></IconButton>
                  <IconButton><EditIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={filtered.length}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[]}
        />
      </TableContainer>
    </Box>
  );
};

export default BatchInvoices;
