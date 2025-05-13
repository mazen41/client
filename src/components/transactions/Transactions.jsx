import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TablePagination
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterAlt as FilterIcon,
  FileDownload as ExportIcon,
  Print as PrintIcon,
  ContentCopy as CopyIcon,
  ReceiptLong as ReceiptLongIcon,
  Person as CustomerIcon,
  SwapHoriz as TransactionIcon,
  CreditCard as PaymentIcon,
  AttachMoney as AmountIcon
} from '@mui/icons-material';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Transactions = () => {
  const transactionsData = [
    {
      invoiceNumber: 'INV-2023-1001',
      invoiceDate: '2023-05-15',
      customerName: 'Ahmed Ali',
      customerEmail: 'ahmed.ali@example.com',
      customerPhone: '+966501234567',
      transactionId: 'TXN-1001',
      transactionDate: '2023-05-15 14:30',
      transactionType: 'sale',
      paymentReference: 'PAY-REF-1001',
      paymentMethod: 'mada',
      amount: 450,
      tax: 45,
      discount: 0,
      total: 495,
      status: 'completed'
    },
    {
      invoiceNumber: 'INV-2023-1002',
      invoiceDate: '2023-05-16',
      customerName: 'Mohammed Omar',
      customerEmail: 'm.omar@example.com',
      customerPhone: '+966502345678',
      transactionId: 'TXN-1002',
      transactionDate: '2023-05-16 10:15',
      transactionType: 'sale',
      paymentReference: 'PAY-REF-1002',
      paymentMethod: 'visa',
      amount: 320,
      tax: 32,
      discount: 20,
      total: 332,
      status: 'completed'
    },
    {
      invoiceNumber: 'INV-2023-1003',
      invoiceDate: '2023-05-17',
      customerName: 'Sarah Ahmed',
      customerEmail: 's.ahmed@example.com',
      customerPhone: '+966503456789',
      transactionId: 'TXN-1003',
      transactionDate: '2023-05-17 16:45',
      transactionType: 'refund',
      paymentReference: 'PAY-REF-1003',
      paymentMethod: 'mastercard',
      amount: 680,
      tax: 0,
      discount: 0,
      total: 680,
      status: 'refunded'
    },
    {
      invoiceNumber: 'INV-2023-1004',
      invoiceDate: '2023-05-18',
      customerName: 'Fatima Khalid',
      customerEmail: 'f.khalid@example.com',
      customerPhone: '+966504567890',
      transactionId: 'TXN-1004',
      transactionDate: '2023-05-18 11:20',
      transactionType: 'sale',
      paymentReference: 'PAY-REF-1004',
      paymentMethod: 'applepay',
      amount: 210,
      tax: 21,
      discount: 10,
      total: 221,
      status: 'failed'
    }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filteredTransactions = transactionsData.filter(transaction => {
    const matchesSearch =
      transaction.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.transactionId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    const matchesType = typeFilter === 'all' || transaction.transactionType === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredTransactions);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Transactions');
    XLSX.writeFile(workbook, 'transactions.xlsx');
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['Invoice', 'Customer', 'Transaction', 'Payment', 'Amount']],
      body: filteredTransactions.map(t => [
        t.invoiceNumber,
        t.customerName,
        t.transactionId,
        t.paymentReference,
        t.total
      ]),
    });
    doc.save('transactions.pdf');
  };

  const copyToClipboard = () => {
    const dataString = filteredTransactions
      .map(t => `${t.invoiceNumber}, ${t.customerName}, ${t.transactionId}, ${t.paymentReference}, ${t.total}`)
      .join('\n');
    navigator.clipboard.writeText(dataString);
    alert('Data copied to clipboard!');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'refunded': return 'info';
      case 'failed': return 'error';
      default: return 'default';
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ p: 3, backgroundColor: 'white' }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: 'black !important' }}>
        Transactions Management
      </Typography>

      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3,
        gap: 2,
        flexWrap: 'wrap'
      }}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search transactions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            sx: { borderRadius: 1, backgroundColor: 'white' }
          }}
          sx={{
            minWidth: 300,
            '& .MuiOutlinedInput-root': {
              borderRadius: 1
            }
          }}
        />

        <Stack direction="row" spacing={2} alignItems="center">
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => setStatusFilter(e.target.value)}
              sx={{ borderRadius: 1 }}
            >
              <MenuItem value="all">All Statuses</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="refunded">Refunded</MenuItem>
              <MenuItem value="failed">Failed</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Type</InputLabel>
            <Select
              value={typeFilter}
              label="Type"
              onChange={(e) => setTypeFilter(e.target.value)}
              sx={{ borderRadius: 1 }}
            >
              <MenuItem value="all">All Types</MenuItem>
              <MenuItem value="sale">Sale</MenuItem>
              <MenuItem value="refund">Refund</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <Stack direction="row" spacing={1}>
          <Button variant="outlined" startIcon={<ExportIcon />} onClick={exportToExcel}
            sx={{ borderColor: 'black', color: 'black', '&:hover': { backgroundColor: '#f5f5f5', borderColor: 'black' } }}>
            Export
          </Button>
          <Button variant="outlined" startIcon={<PrintIcon />} onClick={exportToPDF}
            sx={{ borderColor: 'black', color: 'black', '&:hover': { backgroundColor: '#f5f5f5', borderColor: 'black' } }}>
            Print
          </Button>
          <Button variant="outlined" startIcon={<CopyIcon />} onClick={copyToClipboard}
            sx={{ borderColor: 'black', color: 'black', '&:hover': { backgroundColor: '#f5f5f5', borderColor: 'black' } }}>
            Copy
          </Button>
        </Stack>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0' }}>
        <Table sx={{ minWidth: 1200 }}>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              {[
                ['Invoice Details', <ReceiptLongIcon />],
                ['Customer Details', <CustomerIcon />],
                ['Transaction Details', <TransactionIcon />],
                ['Payment Method', <PaymentIcon />],
                ['Total Amount', <AmountIcon />],
                ['Status', <ReceiptLongIcon />]
              ].map(([label, icon]) => (
                <TableCell
                  key={label}
                  sx={{ fontWeight: 700, color: 'black !important' }}
                >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    {icon}
                    <span>{label}</span>
                  </Stack>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((transaction) => (
                <TableRow key={transaction.transactionId}>
                  <TableCell>{transaction.invoiceNumber} - {transaction.invoiceDate}</TableCell>
                  <TableCell>{transaction.customerName}<br />{transaction.customerEmail}<br />{transaction.customerPhone}</TableCell>
                  <TableCell>{transaction.transactionId}<br />{transaction.transactionDate}</TableCell>
                  <TableCell>{transaction.paymentMethod}</TableCell>
                  <TableCell>{transaction.total}</TableCell>
                  <TableCell>
                    <Chip label={transaction.status} color={getStatusColor(transaction.status)} size="small" variant="outlined" />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={filteredTransactions.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </TableContainer>
    </Box>
  );
};

export default Transactions;
