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
  LocalShipping
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const DeliveryAreas = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [cityFilter, setCityFilter] = useState('all');
  const rowsPerPage = 5;

  // Sample data - replace with your actual data
  const deliveryAreas = [
    { id: 1, city: 'Riyadh', areaName: 'Al Olaya', deliveryFee: 15, minOrders: 3, status: 'active' },
    { id: 2, city: 'Jeddah', areaName: 'Al Hamra', deliveryFee: 20, minOrders: 5, status: 'active' },
    { id: 3, city: 'Dammam', areaName: 'Al Khobar', deliveryFee: 25, minOrders: 4, status: 'inactive' },
    { id: 4, city: 'Riyadh', areaName: 'Al Malaz', deliveryFee: 12, minOrders: 2, status: 'active' },
    { id: 5, city: 'Jeddah', areaName: 'Al Rawdah', deliveryFee: 18, minOrders: 3, status: 'active' },
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

  const filteredAreas = deliveryAreas.filter(area => {
    const matchesSearch = area.city.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         area.areaName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = cityFilter === 'all' || area.city === cityFilter;
    return matchesSearch && matchesCity;
  });

  const paginatedAreas = filteredAreas.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // Get unique cities for filter dropdown
  const cities = [...new Set(deliveryAreas.map(area => area.city))];

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
          <LocalShipping fontSize="large" color="primary" />
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            {t('deliveryAreasPage.title')}
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
            {t('deliveryAreasPage.createDeliveryArea')}
          </Button>
          
          <Tooltip title={t('deliveryAreasPage.refresh')}>
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
            placeholder={t('deliveryAreasPage.searchPlaceholder')}
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
            sx={{ minWidth: 250 }}
          />
          
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <Select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              displayEmpty
              sx={{ borderRadius: '8px' }}
            >
              <MenuItem value="all">{t('deliveryAreasPage.allCities')}</MenuItem>
              {cities.map(city => (
                <MenuItem key={city} value={city}>{city}</MenuItem>
              ))}
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
            {t('deliveryAreasPage.moreFilters')}
          </Button>
        </Box>
      </Paper>

      {/* Delivery Areas Table */}
      <Paper sx={{ 
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
      }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: 'background.default' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>{t('city')}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{t('areaName')}</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="right">{t('deliveryFee')}</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="right">{t('minOrders')}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{t('status')}</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="center">{t('actions')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedAreas.length > 0 ? (
                paginatedAreas.map((area) => (
                  <TableRow key={area.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {area.city}
                      </Box>
                    </TableCell>
                    <TableCell>{area.areaName}</TableCell>
                    <TableCell align="right">
                      <Chip 
                        label={`${area.deliveryFee} ${t('deliveryAreasPage.currency')}`}
                        size="small"
                        sx={{ 
                          bgcolor: 'primary.light', 
                          color: 'primary.contrastText',
                          fontWeight: 500
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Chip 
                        label={area.minOrders}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={t(`deliveryAreasPage.${area.status}`)}
                        color={area.status === 'active' ? 'success' : 'error'}
                        size="small"
                        avatar={
                          <Avatar>
                            {area.status === 'active' ? (
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
                        <Tooltip title={t('deliveryAreasPage.edit')}>
                          <IconButton size="small" color="primary">
                            <Edit fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={t('deliveryAreasPage.delete')}>
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
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    <Typography color="textSecondary">
                      {t('deliveryAreasPage.noAreasFound')}
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
          {t('deliveryAreasPage.showing')} {(page - 1) * rowsPerPage + 1}-{Math.min(page * rowsPerPage, filteredAreas.length)} {t('deliveryAreasPage.of')} {filteredAreas.length} {t('deliveryAreasPage.deliveryAreas')}
        </Typography>
        <Pagination
          count={Math.ceil(filteredAreas.length / rowsPerPage)}
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

      {/* Create Delivery Area Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ 
          borderBottom: '1px solid #eee',
          pb: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography variant="h6">{t('deliveryAreasPage.createDeliveryArea')}</Typography>
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <FormControl fullWidth size="small">
              <Select
                label={t('city')}
                defaultValue=""
              >
                {cities.map(city => (
                  <MenuItem key={city} value={city}>{city}</MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <TextField
              fullWidth
              label={t('areaName')}
              variant="outlined"
              size="small"
            />
            
            <TextField
              fullWidth
              label={t('deliveryFee')}
              variant="outlined"
              size="small"
              type="number"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {t('deliveryAreasPage.currency')}
                  </InputAdornment>
                ),
              }}
            />
            
            <TextField
              fullWidth
              label={t('minOrders')}
              variant="outlined"
              size="small"
              type="number"
            />
            
            <FormControl fullWidth size="small">
              <Select
                label={t('status')}
                defaultValue="active"
              >
                <MenuItem value="active">{t('deliveryAreasPage.active')}</MenuItem>
                <MenuItem value="inactive">{t('deliveryAreasPage.inactive')}</MenuItem>
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
            {t('deliveryAreasPage.cancel')}
          </Button>
          <Button 
            variant="contained"
            color="primary"
            sx={{ borderRadius: '6px' }}
          >
            {t('deliveryAreasPage.create')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DeliveryAreas;