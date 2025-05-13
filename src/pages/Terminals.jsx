import React, { useState } from 'react';
import { 
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TextField, Typography, Button, Pagination, Paper, Chip, IconButton, Switch
} from '@mui/material';
import { Search, Print, FileCopy, Download, FilterList, Edit, Delete } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const Terminals = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const rowsPerPage = 5;

  const terminals = [
    { id: 1, terminalNo: 'TERM-1001', name: 'Main Terminal', rentType: 'Monthly', 
      rentValue: 500, startDate: '2023-01-01', endDate: '2023-12-31', isActive: true },
    // Add more terminals...
  ];

  const handlePageChange = (event, value) => setPage(value);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        {t('terminals.title')}
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

      {/* Table */}
      <TableContainer component={Paper} sx={{ borderRadius: '12px' }}>
        <Table>
          <TableHead sx={{ bgcolor: 'background.default' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>{t('terminals.terminalNo')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('terminals.name')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('terminals.rentType')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="right">{t('terminals.rentValue')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('terminals.startDate')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('terminals.endDate')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('common.status')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('common.actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {terminals.map((terminal) => (
              <TableRow key={terminal.id} hover>
                <TableCell>{terminal.terminalNo}</TableCell>
                <TableCell>{terminal.name}</TableCell>
                <TableCell>{terminal.rentType}</TableCell>
                <TableCell align="right">{terminal.rentValue} SAR</TableCell>
                <TableCell>{terminal.startDate}</TableCell>
                <TableCell>{terminal.endDate}</TableCell>
                <TableCell>
                  <Switch checked={terminal.isActive} color="success" />
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

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Typography variant="body2">
          {t('common.showing')} {(page - 1) * rowsPerPage + 1}-{Math.min(page * rowsPerPage, terminals.length)} 
          {t('common.of')} {terminals.length}
        </Typography>
        <Pagination 
          count={Math.ceil(terminals.length / rowsPerPage)} 
          page={page} 
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};

export default Terminals;