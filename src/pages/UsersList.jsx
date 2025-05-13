import React, { useState } from 'react';
import { 
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TextField, Typography, Button, Pagination, Paper, Switch, IconButton
} from '@mui/material';
import { Search, Add, Edit, Delete } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const UsersList = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const rowsPerPage = 5;

  const users = [
    { id: 1, fullName: 'Ahmed Mohammed', email: 'ahmed@example.com', 
      phone: '+966501234567', country: 'Saudi Arabia', isEnabled: true },
    // Add more users...
  ];

  const handlePageChange = (event, value) => setPage(value);

  const filteredUsers = users.filter(user => 
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          {t('users.title')}
        </Typography>
        <Button variant="contained" startIcon={<Add />}>
          {t('users.addUser')}
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
              <TableCell sx={{ fontWeight: 600 }}>{t('users.fullName')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('users.email')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('users.phone')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('users.country')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('users.isEnabled')}</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>{t('common.actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.country}</TableCell>
                <TableCell>
                  <Switch checked={user.isEnabled} color="success" />
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
          {t('common.showing')} {(page - 1) * rowsPerPage + 1}-{Math.min(page * rowsPerPage, filteredUsers.length)} 
          {t('common.of')} {filteredUsers.length}
        </Typography>
        <Pagination 
          count={Math.ceil(filteredUsers.length / rowsPerPage)} 
          page={page} 
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};

export default UsersList;