import React, { useState } from 'react';
import { 
  Box, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  TextField, 
  Typography, 
  Button, 
  Pagination,
  Paper,
  Chip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  Tooltip,
  IconButton
} from '@mui/material';
import { 
  Add, 
  Search, 
  Edit, 
  Delete, 
  CheckCircle, 
  Cancel,
  FilterList,
  Refresh,
  MoreVert,
  Person,
  Phone,
  Email,
  AccountBalance
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const Customers = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const rowsPerPage = 5;

  // Sample data - replace with your actual data
  const customers = [
    { 
      id: 1, 
      fullName: 'Ahmed Mohammed', 
      mobile: '+966501234567', 
      reference: 'CUST-1001', 
      email: 'ahmed@example.com', 
      bankDetails: 'SA0380000000608010167519', 
      status: 'active' 
    },
    { 
      id: 2, 
      fullName: 'Sarah Ali', 
      mobile: '+966502345678', 
      reference: 'CUST-1002', 
      email: 'sarah@example.com', 
      bankDetails: 'SA0380000000608010167520', 
      status: 'active' 
    },
    { 
      id: 3, 
      fullName: 'Mohammed Hassan', 
      mobile: '+966503456789', 
      reference: 'CUST-1003', 
      email: 'mohammed@example.com', 
      bankDetails: 'SA0380000000608010167521', 
      status: 'inactive' 
    },
    { 
      id: 4, 
      fullName: 'Layla Abdullah', 
      mobile: '+966504567890', 
      reference: 'CUST-1004', 
      email: 'layla@example.com', 
      bankDetails: 'SA0380000000608010167522', 
      status: 'active' 
    },
    { 
      id: 5, 
      fullName: 'Khalid Omar', 
      mobile: '+966505678901', 
      reference: 'CUST-1005', 
      email: 'khalid@example.com', 
      bankDetails: 'SA0380000000608010167523', 
      status: 'active' 
    },
  ];

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      customer.mobile.includes(searchTerm) ||
      customer.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const paginatedCustomers = filteredCustomers.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Section */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3,
        flexWrap: 'wrap',
        gap: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Person fontSize="large" color="primary" />
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            {t('customersPage.title')}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleOpenDialog}
            sx={{
              borderRadius: '8px',
              textTransform: 'none',
              px: 3,
              py: 1,
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
              }
            }}
          >
            {t('customersPage.createCustomer')}
          </Button>
          
          <Tooltip title={t('customersPage.refresh')}>
            <IconButton sx={{ 
              border: '1px solid #ddd',
              borderRadius: '8px',
              bgcolor: 'background.paper'
            }}>
              <Refresh />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Filters and Search Section */}
      <Paper sx={{ 
        p: 2, 
        mb: 3, 
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
      }}>
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <TextField
            size="small"
            placeholder={t('customersPage.searchPlaceholder')}
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
              sx: { borderRadius: '8px' }
            }}
            sx={{ minWidth: 300 }}
          />
          
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              displayEmpty
              sx={{ borderRadius: '8px' }}
            >
              <MenuItem value="all">{t('customersPage.allStatuses')}</MenuItem>
              <MenuItem value="active">{t('customersPage.active')}</MenuItem>
              <MenuItem value="inactive">{t('customersPage.inactive')}</MenuItem>
            </Select>
          </FormControl>
          
          <Button
            variant="outlined"
            startIcon={<FilterList />}
            sx={{ 
              borderRadius: '8px',
              textTransform: 'none',
              ml: 'auto'
            }}
          >
            {t('customersPage.moreFilters')}
          </Button>
        </Box>
      </Paper>

      {/* Customers Table */}
      <Paper sx={{ 
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
      }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: 'background.default' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>{t('customersPage.fullName')}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{t('customersPage.mobile')}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{t('customersPage.reference')}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{t('customersPage.email')}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{t('customersPage.bankDetails')}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{t('status')}</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="center">{t('actions')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCustomers.length > 0 ? (
                paginatedCustomers.map((customer) => (
                  <TableRow key={customer.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                          {customer.fullName.charAt(0)}
                        </Avatar>
                        {customer.fullName}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Phone color="action" fontSize="small" />
                        {customer.mobile}
                      </Box>
                    </TableCell>
                    <TableCell>{customer.reference}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Email color="action" fontSize="small" />
                        {customer.email}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AccountBalance color="action" fontSize="small" />
                        {customer.bankDetails}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={t(`customersPage.${customer.status}`)}
                        color={customer.status === 'active' ? 'success' : 'error'}
                        size="small"
                        avatar={
                          <Avatar>
                            {customer.status === 'active' ? (
                              <CheckCircle fontSize="small" />
                            ) : (
                              <Cancel fontSize="small" />
                            )}
                          </Avatar>
                        }
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                        <Tooltip title={t('customersPage.edit')}>
                          <IconButton size="small" color="primary">
                            <Edit fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={t('customersPage.delete')}>
                          <IconButton size="small" color="error">
                            <Delete fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <IconButton size="small">
                          <MoreVert fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                    <Typography color="textSecondary">
                      {t('customersPage.noCustomersFound')}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Pagination */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mt: 3,
        flexWrap: 'wrap',
        gap: 2
      }}>
        <Typography variant="body2" color="textSecondary">
          {t('customersPage.showing')} {(page - 1) * rowsPerPage + 1}-{Math.min(page * rowsPerPage, filteredCustomers.length)} {t('customersPage.of')} {filteredCustomers.length} {t('customersPage.customers')}
        </Typography>
        <Pagination
          count={Math.ceil(filteredCustomers.length / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
          shape="rounded"
          showFirstButton
          showLastButton
          sx={{
            '& .MuiPaginationItem-root': {
              borderRadius: '6px'
            }
          }}
        />
      </Box>

      {/* Create Customer Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ 
          borderBottom: '1px solid #eee',
          pb: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography variant="h6">{t('customersPage.createCustomer')}</Typography>
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              fullWidth
              label={t('customersPage.fullName')}
              variant="outlined"
              size="small"
            />
            
            <TextField
              fullWidth
              label={t('customersPage.mobile')}
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    +966
                  </InputAdornment>
                ),
              }}
            />
            
            <TextField
              fullWidth
              label={t('customersPage.reference')}
              variant="outlined"
              size="small"
              disabled
              value={`CUST-${Math.floor(1000 + Math.random() * 9000)}`}
            />
            
            <TextField
              fullWidth
              label={t('customersPage.email')}
              variant="outlined"
              size="small"
              type="email"
            />
            
            <TextField
              fullWidth
              label={t('customersPage.bankDetails')}
              variant="outlined"
              size="small"
              placeholder="IBAN or Account Number"
            />
            
            <FormControl fullWidth size="small">
              <Select
                label={t('status')}
                defaultValue="active"
              >
                <MenuItem value="active">{t('customersPage.active')}</MenuItem>
                <MenuItem value="inactive">{t('customersPage.inactive')}</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ 
          borderTop: '1px solid #eee',
          pt: 2,
          px: 3,
          pb: 3
        }}>
          <Button 
            onClick={handleCloseDialog}
            variant="outlined"
            sx={{ borderRadius: '6px' }}
          >
            {t('customersPage.cancel')}
          </Button>
          <Button 
            variant="contained"
            color="primary"
            sx={{ borderRadius: '6px' }}
          >
            {t('customersPage.create')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Customers;