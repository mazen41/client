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
  MoreVert
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const Categories = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const rowsPerPage = 5;

  // Sample data - replace with your actual data
  const categories = [
    { id: 1, nameEn: 'Electronics', nameAr: 'إلكترونيات', productsCount: 42, status: 'active' },
    { id: 2, nameEn: 'Clothing', nameAr: 'ملابس', productsCount: 28, status: 'active' },
    { id: 3, nameEn: 'Furniture', nameAr: 'أثاث', productsCount: 15, status: 'inactive' },
    { id: 4, nameEn: 'Groceries', nameAr: 'بقالة', productsCount: 76, status: 'active' },
    { id: 5, nameEn: 'Books', nameAr: 'كتب', productsCount: 33, status: 'active' },
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

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         category.nameAr.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || category.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const paginatedCategories = filteredCategories.slice(
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
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          {t('title')}
        </Typography>
        
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
            {t('createCategory')}
          </Button>
          
          <Tooltip title={t('refresh')}>
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
            placeholder={t('searchPlaceholder')}
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
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              displayEmpty
              sx={{ borderRadius: '8px' }}
            >
              <MenuItem value="all">{t('allStatuses')}</MenuItem>
              <MenuItem value="active">{t('active')}</MenuItem>
              <MenuItem value="inactive">{t('inactive')}</MenuItem>
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
            {t('moreFilters')}
          </Button>
        </Box>
      </Paper>

      {/* Categories Table */}
      <Paper sx={{ 
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
      }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: 'background.default' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>{t('nameEnglish')}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{t('nameArabic')}</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="right">{t('noOfProducts')}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{t('status')}</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="center">{t('actions')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCategories.length > 0 ? (
                paginatedCategories.map((category) => (
                  <TableRow key={category.id} hover>
                    <TableCell>{category.nameEn}</TableCell>
                    <TableCell>{category.nameAr}</TableCell>
                    <TableCell align="right">
                      <Chip 
                        label={category.productsCount} 
                        size="small"
                        sx={{ 
                          bgcolor: 'primary.light', 
                          color: 'primary.contrastText',
                          fontWeight: 500
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={t(`${category.status}`)}
                        color={category.status === 'active' ? 'success' : 'error'}
                        size="small"
                        avatar={
                          <Avatar>
                            {category.status === 'active' ? (
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
                        <Tooltip title={t('edit')}>
                          <IconButton size="small" color="primary">
                            <Edit fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={t('delete')}>
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
                  <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                    <Typography color="textSecondary">
                      {t('noCategories')}
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
          {t('showing')} {(page - 1) * rowsPerPage + 1}-{Math.min(page * rowsPerPage, filteredCategories.length)} {t('of')} {filteredCategories.length} {t('categories')}
        </Typography>
        <Pagination
          count={Math.ceil(filteredCategories.length / rowsPerPage)}
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

      {/* Create Category Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ 
          borderBottom: '1px solid #eee',
          pb: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography variant="h6">{t('createCategory')}</Typography>
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              fullWidth
              label={t('nameEnglish')}
              variant="outlined"
              size="small"
            />
            <TextField
              fullWidth
              label={t('nameArabic')}
              variant="outlined"
              size="small"
              dir="rtl"
            />
            <FormControl fullWidth size="small">
              <Select
                label={t('status')}
                defaultValue="active"
              >
                <MenuItem value="active">{t('active')}</MenuItem>
                <MenuItem value="inactive">{t('inactive')}</MenuItem>
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
            {t('cancel')}
          </Button>
          <Button 
            variant="contained"
            color="primary"
            sx={{ borderRadius: '6px' }}
          >
            {t('create')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Categories;