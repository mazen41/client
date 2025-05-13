import React, { useState } from 'react';
import {
  Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TablePagination, TextField, IconButton, Box, Typography, Stack
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

const columns = [
  { id: 'date', labelKey: 'accountStatement.date', minWidth: 100 },
  { id: 'reference', labelKey: 'accountStatement.reference', minWidth: 100 },
  { id: 'description', labelKey: 'accountStatement.description', minWidth: 150 },
  { id: 'debit', labelKey: 'accountStatement.debit', minWidth: 100 },
  { id: 'credit', labelKey: 'accountStatement.credit', minWidth: 100 },
  { id: 'balance', labelKey: 'accountStatement.balance', minWidth: 100 },
];

// Sample data
const createData = (date, reference, description, debit, credit, balance) => ({
  date, reference, description, debit, credit, balance
});

const sampleRows = [
  createData('2025-05-01', 'REF1234', 'Payment Received', '', '500.00', '1500.00'),
  createData('2025-05-02', 'REF1235', 'Invoice Payment', '300.00', '', '1200.00'),
  createData('2025-05-03', 'REF1236', 'Bank Transfer', '', '200.00', '1400.00'),
];

const AccountStatement = () => {
  const { t, i18n } = useTranslation();
  const [rows, setRows] = useState(sampleRows);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = useState('');

  const filteredRows = rows.filter(row =>
    Object.values(row).some(value => value.toString().toLowerCase().includes(searchText.toLowerCase()))
  );

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'AccountStatement');
    XLSX.writeFile(workbook, 'AccountStatement.xlsx');
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [columns.map(col => t(col.labelKey))],
      body: filteredRows.map(row => columns.map(col => row[col.id])),
    });
    doc.save('AccountStatement.pdf');
  };

  const copyToClipboard = () => {
    const text = filteredRows.map(row => columns.map(col => row[col.id]).join('\t')).join('\n');
    navigator.clipboard.writeText(text);
    alert(t('accountStatement.copied'));
  };

  return (
    <Box p={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">{t('accountStatement.title')}</Typography>
        <Stack direction="row" spacing={1}>
          <IconButton onClick={exportToExcel}><FileDownloadIcon /></IconButton>
          <IconButton onClick={exportToPDF}><FileDownloadIcon /></IconButton>
          <IconButton onClick={copyToClipboard}><ContentCopyIcon /></IconButton>
        </Stack>
      </Stack>

      <TextField
        fullWidth
        variant="outlined"
        placeholder={t('accountStatement.search')}
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
                      <TableCell key={column.id}>{row[column.id]}</TableCell>
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
    </Box>
  );
};

export default AccountStatement;
