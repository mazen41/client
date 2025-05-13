import React, { useState } from 'react';
import {
  Box, Button, IconButton, Stack, TextField, Typography,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

const columns = [
  { id: 'link', labelKey: 'paymentLinks.link', minWidth: 200 },
  { id: 'createdAt', labelKey: 'paymentLinks.createdAt', minWidth: 150 },
  { id: 'amount', labelKey: 'paymentLinks.amount', minWidth: 100 },
  { id: 'currency', labelKey: 'paymentLinks.currency', minWidth: 100 },
  { id: 'isOpen', labelKey: 'paymentLinks.isOpen', minWidth: 100 },
  { id: 'language', labelKey: 'paymentLinks.language', minWidth: 100 },
  { id: 'views', labelKey: 'paymentLinks.views', minWidth: 80 },
];

const createData = (link, createdAt, amount, currency, isOpen, language, views) => ({
  link, createdAt, amount, currency, isOpen, language, views
});

const sampleRows = [
  createData('https://pay.example.com/abc123', '2025-05-10', '100.00', 'USD', true, 'en', 12),
  createData('https://pay.example.com/def456', '2025-05-11', '200.00', 'EUR', false, 'ar', 8),
  // Add more sample data as needed
];

const PaymentLinks = () => {
  const { t } = useTranslation();
  const [rows, setRows] = useState(sampleRows);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filteredRows = rows.filter(row =>
    Object.values(row).some(value =>
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'PaymentLinks');
    XLSX.writeFile(workbook, 'PaymentLinks.xlsx');
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [columns.map(col => t(col.labelKey))],
      body: filteredRows.map(row => columns.map(col => {
        if (col.id === 'link') {
          return row[col.id];
        }
        return row[col.id];
      })),
    });
    doc.save('PaymentLinks.pdf');
  };

  const copyToClipboard = () => {
    const text = filteredRows.map(row =>
      columns.map(col => row[col.id]).join('\t')
    ).join('\n');
    navigator.clipboard.writeText(text);
    alert(t('paymentLinks.copied'));
  };

  return (
    <Box p={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">{t('paymentLinks.title')}</Typography>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined">{t('paymentLinks.customizeInvoice')}</Button>
          <Button variant="contained" color="primary">{t('paymentLinks.createPaymentLink')}</Button>
        </Stack>
      </Stack>

      <TextField
        fullWidth
        variant="outlined"
        placeholder={t('paymentLinks.search')}
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
                    {t(column.labelKey)}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, idx) => (
                  <TableRow hover key={idx}>
                    {columns.map(column => (
                      <TableCell key={column.id}>
                        {column.id === 'link' ? (
                          <a href={row[column.id]} target="_blank" rel="noopener noreferrer">
                            {row[column.id]} <OpenInNewIcon fontSize="small" />
                          </a>
                        ) : column.id === 'isOpen' ? (
                          row[column.id] ? t('paymentLinks.yes') : t('paymentLinks.no')
                        ) : (
                          row[column.id]
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Stack direction="row" spacing={1} mt={2}>
        <IconButton onClick={exportToExcel}><FileDownloadIcon /></IconButton>
        <IconButton onClick={exportToPDF}><FileDownloadIcon /></IconButton>
        <IconButton onClick={copyToClipboard}><ContentCopyIcon /></IconButton>
      </Stack>
    </Box>
  );
};

export default PaymentLinks;
