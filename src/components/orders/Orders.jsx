import React, { useState } from 'react';
import {
  Box, Tabs, Tab, TextField, InputAdornment, IconButton, MenuItem, Button,
  Table, TableHead, TableBody, TableRow, TableCell, TablePagination,
  useTheme
} from '@mui/material';
import { Search, Print, GetApp, LocalShipping } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

const Orders = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const isArabic = i18n.language === 'ar';

  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const orders = [
    { id: 1, customer: 'John Doe', status: 'Pending', total: 120, createdAt: '2025-05-11' },
    { id: 2, customer: 'Ali Ahmad', status: 'Completed', total: 85, createdAt: '2025-05-10' },
    { id: 3, customer: 'Maryam', status: 'Pending', total: 50, createdAt: '2025-05-09' },
    { id: 4, customer: 'Fatima', status: 'Shipped', total: 210, createdAt: '2025-05-08' },
    { id: 5, customer: 'Khalid', status: 'Completed', total: 145, createdAt: '2025-05-07' },
    // ...add more
  ];

  const filteredOrders = orders
    .filter(order =>
      (!statusFilter || order.status === statusFilter) &&
      (order.customer.toLowerCase().includes(search.toLowerCase()) || String(order.id).includes(search))
    )
    .filter(order => {
      if (tab === 0) return true;
      if (tab === 1) return order.status === 'Pending';
      if (tab === 2) return order.status === 'Completed';
      return true;
    });

  const handleExportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [[t('Order ID'), t('Customer'), t('Status'), t('Total'), t('Created At')]],
      body: filteredOrders.map(o => [o.id, o.customer, o.status, `$${o.total}`, o.createdAt]),
    });
    doc.save('orders.pdf');
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredOrders);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');
    XLSX.writeFile(workbook, 'orders.xlsx');
  };

  const handleRequestPickup = () => {
    const orderIds = filteredOrders.map(order => order.id);
    alert(`${t('Pickup requested for orders')}: ${orderIds.join(', ')}`);
  };

  return (
    <Box dir={isArabic ? 'rtl' : 'ltr'} sx={{ p: 2, bgcolor: 'white', borderRadius: 2, boxShadow: 2 }}>
      <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} variant="scrollable">
        <Tab label={t('All Orders')} />
        <Tab label={t('Pending')} />
        <Tab label={t('Completed')} />
      </Tabs>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, my: 2, alignItems: 'center' }}>
        <TextField
          label={t('Search')}
          value={search}
          onChange={e => setSearch(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton><Search /></IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          select
          label={t('Filter by Status')}
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">{t('All')}</MenuItem>
          <MenuItem value="Pending">{t('Pending')}</MenuItem>
          <MenuItem value="Completed">{t('Completed')}</MenuItem>
          <MenuItem value="Shipped">{t('Shipped')}</MenuItem>
        </TextField>
        <Button startIcon={<GetApp />} onClick={handleExportExcel}>{t('Export Excel')}</Button>
        <Button startIcon={<Print />} onClick={handleExportPDF}>{t('Export PDF')}</Button>
        <Button
          startIcon={<LocalShipping />}
          onClick={handleRequestPickup}
          variant="contained"
          color="primary"
        >
          {t('Request Pickup')}
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('Order ID')}</TableCell>
            <TableCell>{t('Customer')}</TableCell>
            <TableCell>{t('Status')}</TableCell>
            <TableCell>{t('Total')}</TableCell>
            <TableCell>{t('Created At')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(order => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{t(order.status)}</TableCell>
              <TableCell>${order.total}</TableCell>
              <TableCell>{order.createdAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={filteredOrders.length}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={e => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Box>
  );
};

export default Orders;
