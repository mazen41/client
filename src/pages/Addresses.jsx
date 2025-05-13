import React, { useState } from 'react';
import { 
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TextField, Typography, Button, Pagination, Paper, IconButton
} from '@mui/material';
import { Search, Add, Edit, Delete } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const AddressManagement = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const rowsPerPage = 5;

  const addresses = [
    { id: 1, type: 'Home', city: 'Riyadh', area: 'Al Olaya', 
      street: 'King Fahd Road', details: 'Building 12, Apartment 5', 
      instructions: 'Ring the bell twice' },
    // Add more addresses...
  ];

  const handlePageChange = (event, value) => setPage(value);

  const filteredAddresses = addresses.filter(address => 
    address.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    address.area.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedAddresses = filteredAddresses.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          {t('address.title')}
        </Typography>
        <Button variant="contained" startIcon={<Add />}>
          {t('address.addAddress')}
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
              <TableCell sx={{ fontWeight: 600 }}>{t('address.type')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('address.city')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('address.area')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('address.street')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('address.details')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('address.instructions')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('common.actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedAddresses.map((address) => (
              <TableRow key={address.id} hover>
                <TableCell>{address.type}</TableCell>
                <TableCell>{address.city}</TableCell>
                <TableCell>{address.area}</TableCell>
                <TableCell>{address.street}</TableCell>
                <TableCell>{address.details}</TableCell>
                <TableCell>{address.instructions}</TableCell>
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
          {t('common.showing')} {(page - 1) * rowsPerPage + 1}-{Math.min(page * rowsPerPage, filteredAddresses.length)} 
          {t('common.of')} {filteredAddresses.length}
        </Typography>
        <Pagination 
          count={Math.ceil(filteredAddresses.length / rowsPerPage)} 
          page={page} 
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};

export default AddressManagement;